/**
 * @file storage-state.js
 * @author Anmol (Dev 1 - Data Layer & State Management)
 * @module StorageState
 * @description LocalStorage persistence engine and pub/sub state manager for:
 *              - User Bookmarks / Favorites Wishlist
 *              - Recently Viewed Properties Tracker
 *              - Side-by-Side Comparison Queue (Max 3 properties)
 *              - Dark / Light Theme Preference Persistence
 */

window.StorageState = window.StorageState || {};

(function () {
  "use strict";

  // Storage key constants
  const KEYS = {
    FAVORITES: "dreamnest_saved_favorites_v2",
    RECENTLY_VIEWED: "dreamnest_recent_views_v2",
    COMPARE: "dreamnest_compare_list_v2",
    THEME: "dreamnest_user_theme_pref"
  };

  const MAX_COMPARE_ITEMS = 3;
  const MAX_RECENT_ITEMS = 4;

  // Internal subscriber store for reactive event broadcasting
  const listeners = {
    favoritesChanged: [],
    recentlyViewedChanged: [],
    compareChanged: [],
    themeChanged: []
  };

  /**
   * Safe reader for localStorage to guard against browser security exceptions
   * @param {string} key 
   * @param {*} fallbackDefault 
   * @returns {*} Parsed value or fallback
   */
  const safeGetItem = (key, fallbackDefault) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallbackDefault;
    } catch (err) {
      console.warn(`[StorageState] Failed to read "${key}" from localStorage:`, err);
      return fallbackDefault;
    }
  };

  /**
   * Safe writer for localStorage
   * @param {string} key 
   * @param {*} value 
   * @returns {boolean} Success status
   */
  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[StorageState] Failed to write "${key}" to localStorage:`, err);
      return false;
    }
  };

  /**
   * Broadcasts state change events to subscribed UI controllers
   * @param {string} eventName 
   * @param {*} payload 
   */
  const emit = (eventName, payload) => {
    if (listeners[eventName] && Array.isArray(listeners[eventName])) {
      listeners[eventName].forEach((callback) => {
        try {
          callback(payload);
        } catch (cbErr) {
          console.error(`[StorageState] Error executing subscriber for ${eventName}:`, cbErr);
        }
      });
    }
  };

  // =========================================================================
  // 1. FAVORITES / WISHLIST STATE
  // =========================================================================

  /**
   * Retrieves array of bookmarked property IDs
   * @returns {number[]}
   */
  const getFavorites = () => {
    return safeGetItem(KEYS.FAVORITES, []);
  };

  /**
   * Checks if a property ID is currently bookmarked
   * @param {number|string} propertyId 
   * @returns {boolean}
   */
  const isFavorite = (propertyId) => {
    const id = parseInt(propertyId, 10);
    return getFavorites().includes(id);
  };

  /**
   * Toggles bookmark status for a property ID
   * @param {number|string} propertyId 
   * @returns {{ isSaved: boolean, count: number }}
   */
  const toggleFavorite = (propertyId) => {
    const id = parseInt(propertyId, 10);
    const favs = getFavorites();
    const index = favs.indexOf(id);
    let isSaved = false;

    if (index > -1) {
      favs.splice(index, 1);
      isSaved = false;
    } else {
      favs.push(id);
      isSaved = true;
    }

    safeSetItem(KEYS.FAVORITES, favs);
    emit("favoritesChanged", { id, isSaved, favorites: [...favs] });

    return { isSaved, count: favs.length };
  };

  /**
   * Returns full property objects corresponding to all saved IDs
   * @returns {Property[]}
   */
  const getFavoriteProperties = () => {
    const favIds = getFavorites();
    if (!window.RealEstateData || typeof window.RealEstateData.getAllProperties !== "function") {
      return [];
    }
    return window.RealEstateData.getAllProperties().filter((prop) => favIds.includes(prop.id));
  };

  /**
   * Clears all saved favorites
   */
  const clearFavorites = () => {
    safeSetItem(KEYS.FAVORITES, []);
    emit("favoritesChanged", { id: null, isSaved: false, favorites: [] });
  };

  // =========================================================================
  // 2. RECENTLY VIEWED PROPERTIES TRACKER
  // =========================================================================

  /**
   * Retrieves list of recently inspected property IDs (most recent first)
   * @returns {number[]}
   */
  const getRecentlyViewed = () => {
    return safeGetItem(KEYS.RECENTLY_VIEWED, []);
  };

  /**
   * Records a user view event on a property, deduplicating and keeping the latest
   * @param {number|string} propertyId 
   */
  const recordPropertyView = (propertyId) => {
    const id = parseInt(propertyId, 10);
    if (isNaN(id)) return;

    let recents = getRecentlyViewed().filter((item) => item !== id);
    recents.unshift(id); // Place at head

    if (recents.length > MAX_RECENT_ITEMS) {
      recents = recents.slice(0, MAX_RECENT_ITEMS);
    }

    safeSetItem(KEYS.RECENTLY_VIEWED, recents);
    emit("recentlyViewedChanged", { recentlyViewed: [...recents] });
  };

  /**
   * Returns full property objects for recently viewed IDs
   * @returns {Property[]}
   */
  const getRecentlyViewedProperties = () => {
    const ids = getRecentlyViewed();
    if (!window.RealEstateData || typeof window.RealEstateData.getAllProperties !== "function") {
      return [];
    }
    const all = window.RealEstateData.getAllProperties();
    // Maintain chronological order of recently viewed list
    return ids
      .map((id) => all.find((p) => p.id === id))
      .filter((p) => Boolean(p));
  };

  // =========================================================================
  // 3. PROPERTY COMPARISON QUEUE (Max 3 Items)
  // =========================================================================

  /**
   * Retrieves active comparison queue
   * @returns {number[]} Array of property IDs (up to 3)
   */
  const getCompareList = () => {
    return safeGetItem(KEYS.COMPARE, []);
  };

  /**
   * Checks if an ID is present in the comparison queue
   * @param {number|string} propertyId 
   * @returns {boolean}
   */
  const isInCompare = (propertyId) => {
    const id = parseInt(propertyId, 10);
    return getCompareList().includes(id);
  };

  /**
   * Adds a property to the comparison queue if capacity allows
   * @param {number|string} propertyId 
   * @returns {{ success: boolean, reason?: string, compareList: number[] }}
   */
  const addToCompare = (propertyId) => {
    const id = parseInt(propertyId, 10);
    const list = getCompareList();

    if (list.includes(id)) {
      return { success: false, reason: "Property already in comparison queue.", compareList: list };
    }

    if (list.length >= MAX_COMPARE_ITEMS) {
      return {
        success: false,
        reason: `Maximum of ${MAX_COMPARE_ITEMS} properties can be compared simultaneously.`,
        compareList: list
      };
    }

    list.push(id);
    safeSetItem(KEYS.COMPARE, list);
    emit("compareChanged", { compareList: [...list] });

    return { success: true, compareList: list };
  };

  /**
   * Removes a property from the comparison queue
   * @param {number|string} propertyId 
   * @returns {number[]} Updated compare list
   */
  const removeFromCompare = (propertyId) => {
    const id = parseInt(propertyId, 10);
    const list = getCompareList().filter((item) => item !== id);
    safeSetItem(KEYS.COMPARE, list);
    emit("compareChanged", { compareList: [...list] });
    return list;
  };

  /**
   * Clears the comparison list
   */
  const clearCompare = () => {
    safeSetItem(KEYS.COMPARE, []);
    emit("compareChanged", { compareList: [] });
  };

  /**
   * Returns full property objects for comparison queue
   * @returns {Property[]}
   */
  const getCompareProperties = () => {
    const ids = getCompareList();
    if (!window.RealEstateData || typeof window.RealEstateData.getAllProperties !== "function") {
      return [];
    }
    const all = window.RealEstateData.getAllProperties();
    return ids.map((id) => all.find((p) => p.id === id)).filter(Boolean);
  };

  // =========================================================================
  // 4. THEME PREFERENCE (Dark / Light Mode)
  // =========================================================================

  /**
   * Retrieves user's persisted theme preference
   * @returns {"dark"|"light"|"auto"}
   */
  const getSavedTheme = () => {
    return safeGetItem(KEYS.THEME, "light");
  };

  /**
   * Persists theme choice to storage
   * @param {"dark"|"light"} theme 
   */
  const saveTheme = (theme) => {
    const validTheme = theme === "dark" ? "dark" : "light";
    safeSetItem(KEYS.THEME, validTheme);
    emit("themeChanged", { theme: validTheme });
  };

  // =========================================================================
  // 5. EVENT SUBSCRIPTION (PUB/SUB)
  // =========================================================================

  /**
   * Subscribes to storage state changes
   * @param {"favoritesChanged"|"recentlyViewedChanged"|"compareChanged"|"themeChanged"} eventName 
   * @param {Function} callback 
   * @returns {Function} Unsubscribe hook
   */
  const subscribe = (eventName, callback) => {
    if (listeners[eventName] && typeof callback === "function") {
      listeners[eventName].push(callback);
      return () => {
        listeners[eventName] = listeners[eventName].filter((fn) => fn !== callback);
      };
    }
    return () => {};
  };

  // Expose API under Developer 1's namespace
  window.StorageState = {
    // Favorites API
    getFavorites,
    isFavorite,
    toggleFavorite,
    getFavoriteProperties,
    clearFavorites,

    // Recently Viewed API
    getRecentlyViewed,
    recordPropertyView,
    getRecentlyViewedProperties,

    // Comparison API
    getCompareList,
    isInCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    getCompareProperties,

    // Theme API
    getSavedTheme,
    saveTheme,

    // Subscription
    subscribe
  };

})();
