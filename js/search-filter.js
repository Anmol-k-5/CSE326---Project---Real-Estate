/**
 * @file search-filter.js
 * @author Anmol (Dev 1 - Data Layer & State Management)
 * @module FilterEngine
 * @description Master search pipeline, multi-criteria filtering algorithms,
 *              financial estimators (Stamp Duty & Rental Yield), active filter chips,
 *              and DOM rendering coordination.
 */

window.FilterEngine = window.FilterEngine || {};

(function () {
  "use strict";

  // Reactive state store managed by Anmol
  const filterState = {
    keyword: "",
    city: "all",
    propertyType: "all",
    purpose: "all",
    maxPrice: 50000000, // ₹5.00 Cr
    minBedrooms: 0,
    furnishing: "all",
    sortBy: "featured",
    favoritesOnly: false
  };

  /**
   * Currency formatter transforming raw integers into Indian localized currency
   * @param {number} amount - Numerical value in INR
   * @returns {string} e.g. "₹1.85 Cr", "₹98 Lakh", or "₹42,000"
   */
  const formatIndianCurrency = (amount) => {
    if (isNaN(amount) || amount === null) return "₹0";
    const numeric = Math.abs(Number(amount));

    if (numeric >= 10000000) {
      return `₹${(numeric / 10000000).toFixed(2)} Cr`;
    } else if (numeric >= 100000) {
      return `₹${(numeric / 100000).toFixed(2)} Lakh`;
    }
    return `₹${numeric.toLocaleString("en-IN")}`;
  };

  /**
   * Financial Utility: Calculates estimated stamp duty and registration fees across Indian states
   * @param {number} propertyPrice - Total agreement value of property
   * @param {string} [stateName="Maharashtra"] - Destination state jurisdiction
   * @returns {{ stampDutyAmount: number, registrationFee: number, totalGovtCharges: number, ratePercent: number }}
   */
  const calculateStampDuty = (propertyPrice, stateName = "Maharashtra") => {
    const price = Math.max(0, Number(propertyPrice) || 0);

    // State stamp duty rate estimates
    const stateRates = {
      Maharashtra: 0.06, // 6% (inclusive of metro cess)
      Karnataka: 0.056,  // 5.6%
      Delhi: 0.06,       // 6%
      Telangana: 0.075,  // 7.5%
      "West Bengal": 0.06,
      Goa: 0.045
    };

    const rate = stateRates[stateName] || 0.06;
    const stampDutyAmount = Math.round(price * rate);
    // Standard registration cap in most Indian states: 1% capped at ₹30,000 for residential
    const registrationFee = Math.min(30000, Math.round(price * 0.01));
    const totalGovtCharges = stampDutyAmount + registrationFee;

    return {
      stampDutyAmount,
      registrationFee,
      totalGovtCharges,
      ratePercent: Number((rate * 100).toFixed(1))
    };
  };

  /**
   * Financial Utility: Computes gross annual rental yield
   * Formula: ((Monthly Rent * 12) / Total Property Cost) * 100
   * @param {number} propertyPrice - Total acquisition price
   * @param {number} monthlyRentalIncome - Anticipated or actual monthly rental yield
   * @returns {number} Percentage yield rounded to two decimal places
   */
  const calculateRentalYield = (propertyPrice, monthlyRentalIncome) => {
    const price = Number(propertyPrice);
    const rent = Number(monthlyRentalIncome);
    if (!price || price <= 0 || !rent || rent <= 0) return 0;

    const annualRent = rent * 12;
    const grossYield = (annualRent / price) * 100;
    return Number(grossYield.toFixed(2));
  };

  /**
   * Debounce helper to prevent excessive calculations during continuous keyboard input
   * @param {Function} func - Callback function to debounce
   * @param {number} wait - Milliseconds threshold
   * @returns {Function}
   */
  const debounce = (func, wait = 150) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), wait);
    };
  };

  /**
   * Multi-Criteria Filtering Engine
   * Executes pure array pipeline across all active criteria
   * @returns {Property[]} Filtered and sorted listings
   */
  const executeFilterPipeline = () => {
    if (!window.RealEstateData || typeof window.RealEstateData.getAllProperties !== "function") {
      console.warn("[FilterEngine] RealEstateData source not available.");
      return [];
    }

    const masterDataset = window.RealEstateData.getAllProperties();
    const savedFavorites = window.StorageState ? window.StorageState.getFavorites() : [];

    const filtered = masterDataset.filter((item) => {
      // 1. Keyword search (title, city, neighborhood, amenities, address)
      if (filterState.keyword.trim().length > 0) {
        const query = filterState.keyword.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(query);
        const inCity = item.city.toLowerCase().includes(query);
        const inNeighborhood = item.neighborhood.toLowerCase().includes(query);
        const inAddress = item.address.toLowerCase().includes(query);
        const inType = item.type.toLowerCase().includes(query);
        const inAmenities = item.amenities.some((a) => a.toLowerCase().includes(query));

        if (!inTitle && !inCity && !inNeighborhood && !inAddress && !inType && !inAmenities) {
          return false;
        }
      }

      // 2. City filter
      if (filterState.city !== "all" && item.city.toLowerCase() !== filterState.city.toLowerCase()) {
        return false;
      }

      // 3. Property Type filter
      if (filterState.propertyType !== "all" && item.type.toLowerCase() !== filterState.propertyType.toLowerCase()) {
        return false;
      }

      // 4. Purpose (Buy / Rent)
      if (filterState.purpose !== "all" && item.purpose.toLowerCase() !== filterState.purpose.toLowerCase()) {
        return false;
      }

      // 5. Maximum Price threshold
      if (item.price > filterState.maxPrice) {
        return false;
      }

      // 6. Minimum Bedrooms count
      if (filterState.minBedrooms > 0 && item.bedrooms < filterState.minBedrooms) {
        return false;
      }

      // 7. Furnishing Status
      if (filterState.furnishing !== "all" && item.furnishing !== filterState.furnishing) {
        return false;
      }

      // 8. Bookmarked / Favorites Only toggle
      if (filterState.favoritesOnly && !savedFavorites.includes(item.id)) {
        return false;
      }

      return true;
    });

    // Apply Sorting Algorithms
    return filtered.sort((a, b) => {
      switch (filterState.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "area-desc":
          return b.areaSqFt - a.areaSqFt;
        case "newest":
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case "featured":
        default:
          if (b.isFeatured !== a.isFeatured) {
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
          }
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      }
    });
  };

  /**
   * Generates active filter chips (e.g. "[Worli ✕] [₹2 Cr Max ✕]")
   * allowing users to visually see and remove active constraints
   */
  const renderActiveFilterChips = () => {
    const chipsContainer = document.getElementById("activeFilterChips");
    if (!chipsContainer) return;

    const chips = [];

    if (filterState.keyword.trim().length > 0) {
      chips.push({ label: `"${filterState.keyword}"`, key: "keyword" });
    }
    if (filterState.city !== "all") {
      chips.push({ label: `City: ${filterState.city}`, key: "city" });
    }
    if (filterState.propertyType !== "all") {
      chips.push({ label: `Type: ${filterState.propertyType}`, key: "propertyType" });
    }
    if (filterState.purpose !== "all") {
      chips.push({ label: `For ${filterState.purpose}`, key: "purpose" });
    }
    if (filterState.maxPrice < 50000000) {
      chips.push({ label: `Max: ${formatIndianCurrency(filterState.maxPrice)}`, key: "maxPrice" });
    }
    if (filterState.minBedrooms > 0) {
      chips.push({ label: `${filterState.minBedrooms}+ BHK`, key: "minBedrooms" });
    }
    if (filterState.furnishing !== "all") {
      chips.push({ label: filterState.furnishing, key: "furnishing" });
    }
    if (filterState.favoritesOnly) {
      chips.push({ label: "★ Saved Favorites Only", key: "favoritesOnly" });
    }

    if (chips.length === 0) {
      chipsContainer.innerHTML = "";
      chipsContainer.style.display = "none";
      return;
    }

    chipsContainer.style.display = "flex";
    chipsContainer.innerHTML = chips
      .map(
        (chip) => `
        <span class="filter-chip" data-chip-key="${chip.key}">
          ${chip.label}
          <button type="button" class="filter-chip__remove" aria-label="Remove filter ${chip.label}">&times;</button>
        </span>
      `
      )
      .join("");

    // Attach chip removal click handlers
    chipsContainer.querySelectorAll(".filter-chip").forEach((el) => {
      el.addEventListener("click", () => {
        const key = el.getAttribute("data-chip-key");
        removeSpecificFilter(key);
      });
    });
  };

  /**
   * Resets an individual filter criterion
   * @param {string} key 
   */
  const removeSpecificFilter = (key) => {
    switch (key) {
      case "keyword":
        filterState.keyword = "";
        const searchInput = document.getElementById("filterSearchInput");
        if (searchInput) searchInput.value = "";
        break;
      case "city":
        filterState.city = "all";
        const citySelect = document.getElementById("filterCity");
        if (citySelect) citySelect.value = "all";
        break;
      case "propertyType":
        filterState.propertyType = "all";
        const typeSelect = document.getElementById("filterPropertyType");
        if (typeSelect) typeSelect.value = "all";
        break;
      case "purpose":
        filterState.purpose = "all";
        const allRadio = document.querySelector('input[name="purposeFilter"][value="all"]');
        if (allRadio) allRadio.checked = true;
        break;
      case "maxPrice":
        filterState.maxPrice = 50000000;
        const slider = document.getElementById("filterPriceRange");
        const priceLabel = document.getElementById("priceSliderValueDisplay");
        if (slider) slider.value = 50000000;
        if (priceLabel) priceLabel.textContent = "₹5.00 Cr (Max)";
        break;
      case "minBedrooms":
        filterState.minBedrooms = 0;
        const bedPills = document.querySelectorAll("[data-bhk-val]");
        bedPills.forEach((p) => p.classList.toggle("is-active", p.getAttribute("data-bhk-val") === "0"));
        break;
      case "furnishing":
        filterState.furnishing = "all";
        const furnSelect = document.getElementById("filterFurnishing");
        if (furnSelect) furnSelect.value = "all";
        break;
      case "favoritesOnly":
        filterState.favoritesOnly = false;
        const favBtn = document.getElementById("toggleFavoritesViewBtn");
        if (favBtn) {
          favBtn.classList.remove("is-active");
          favBtn.textContent = "View Saved Favorites";
        }
        break;
      default:
        break;
    }
    applyFilters();
  };

  /**
   * Renders the current filtered subset into the DOM
   * @param {Property[]} properties 
   */
  const renderPropertyListings = (properties) => {
    const container = document.getElementById("propertiesContainer");
    const countBadge = document.getElementById("resultsCountBadge");

    if (!container) return;

    const totalAvailable = window.RealEstateData ? window.RealEstateData.getAllProperties().length : 0;
    if (countBadge) {
      countBadge.textContent = `Showing ${properties.length} of ${totalAvailable} verified properties`;
    }

    renderActiveFilterChips();

    // Empty state fallback
    if (properties.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🏠</div>
          <h3 class="empty-state__title">No matching properties found</h3>
          <p class="empty-state__desc">We couldn't find any listings matching all of your active filter selections. Try broadening your criteria or clearing filters.</p>
          <button type="button" class="btn btn--primary" id="emptyStateResetBtn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("emptyStateResetBtn");
      if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
      return;
    }

    const savedFavIds = window.StorageState ? window.StorageState.getFavorites() : [];
    const compareIds = window.StorageState ? window.StorageState.getCompareList() : [];

    const cardsHtml = properties
      .map((prop) => {
        const isSaved = savedFavIds.includes(prop.id);
        const isInCompare = compareIds.includes(prop.id);
        const purposeBadgeClass = prop.purpose.toLowerCase() === "sale" ? "badge--sale" : "badge--rent";

        return `
          <article class="property-card" data-id="${prop.id}">
            <div class="property-card__media">
              <img 
                src="${prop.mainImage}" 
                alt="${prop.title}" 
                loading="lazy" 
                class="property-card__img" 
              />
              <div class="property-card__badges">
                <span class="badge ${purposeBadgeClass}">For ${prop.purpose}</span>
                ${prop.isFeatured ? '<span class="badge badge--featured">Featured</span>' : ""}
              </div>

              <!-- Anmol's Favorite Toggle Button -->
              <button 
                type="button" 
                class="property-card__fav-btn ${isSaved ? "is-active" : ""}" 
                data-fav-id="${prop.id}" 
                title="${isSaved ? "Remove from wishlist" : "Save to wishlist"}"
                aria-label="Save ${prop.title}"
              >
                <svg viewBox="0 0 24 24" class="heart-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>

              <div class="property-card__price-banner">${prop.formattedPrice}</div>
            </div>

            <div class="property-card__content">
              <div class="property-card__header-meta">
                <span class="property-card__tag">${prop.type}</span>
                <span class="property-card__city">📍 ${prop.neighborhood}, ${prop.city}</span>
              </div>

              <h3 class="property-card__title" title="${prop.title}">${prop.title}</h3>

              <div class="property-card__specs-row">
                <span class="spec-pill"><strong>${prop.bedrooms}</strong> BHK</span>
                <span class="spec-pill"><strong>${prop.bathrooms}</strong> Baths</span>
                <span class="spec-pill"><strong>${prop.areaSqFt}</strong> sq.ft</span>
                <span class="spec-pill">${prop.furnishing}</span>
              </div>

              <p class="property-card__short-desc">${prop.description.substring(0, 110)}...</p>

              <div class="property-card__actions" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <a 
                  href="property-detail.html?id=${prop.id}" 
                  class="btn btn--primary btn--sm" 
                  style="flex: 1; text-align: center; text-decoration: none;"
                  title="Open full architectural specs page"
                >
                  Full Specs
                </a>

                <button 
                  type="button" 
                  class="btn btn--outline btn--sm view-details-trigger" 
                  data-prop-id="${prop.id}"
                  title="Quick preview modal"
                >
                  Quick View
                </button>

                <button 
                  type="button" 
                  class="btn btn--outline btn--sm compare-trigger ${isInCompare ? "is-active" : ""}" 
                  data-compare-id="${prop.id}"
                  title="Compare with other properties"
                >
                  ${isInCompare ? "✓ Compare" : "+ Compare"}
                </button>

                <a 
                  href="calculator.html?price=${prop.price}&title=${encodeURIComponent(prop.title)}" 
                  class="btn btn--text btn--sm" 
                  style="text-decoration: none;"
                  title="Estimate monthly loan EMI"
                >
                  EMI
                </a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    container.innerHTML = cardsHtml;
    attachCardActionHandlers();
  };

  /**
   * Binds click handlers to interactive controls on freshly generated cards
   */
  const attachCardActionHandlers = () => {
    // 1. Wishlist / Favorite button clicks
    document.querySelectorAll("[data-fav-id]").forEach((btn) => {
      btn.addEventListener("click", (evt) => {
        evt.stopPropagation();
        const id = btn.getAttribute("data-fav-id");
        if (window.StorageState) {
          const result = window.StorageState.toggleFavorite(id);
          btn.classList.toggle("is-active", result.isSaved);
          btn.title = result.isSaved ? "Remove from wishlist" : "Save to wishlist";
          updateHeaderBadgeCounters();

          // Trigger Kunal's toast alert if available
          if (window.UIUtils && typeof window.UIUtils.showToast === "function") {
            window.UIUtils.showToast(
              result.isSaved ? "Property added to your Saved Wishlist" : "Property removed from Wishlist",
              result.isSaved ? "success" : "info"
            );
          }
        }
      });
    });

    // 2. Compare button clicks
    document.querySelectorAll("[data-compare-id]").forEach((btn) => {
      btn.addEventListener("click", (evt) => {
        evt.stopPropagation();
        const id = btn.getAttribute("data-compare-id");
        if (window.StorageState) {
          if (window.StorageState.isInCompare(id)) {
            window.StorageState.removeFromCompare(id);
            btn.classList.remove("is-active");
            btn.textContent = "+ Compare";
          } else {
            const addResult = window.StorageState.addToCompare(id);
            if (addResult.success) {
              btn.classList.add("is-active");
              btn.textContent = "✓ In Compare";
              if (window.UIUtils && typeof window.UIUtils.showToast === "function") {
                window.UIUtils.showToast("Added to compare! View under 'Wishlist & Compare'", "success");
              }
            } else if (window.UIUtils && typeof window.UIUtils.showToast === "function") {
              window.UIUtils.showToast(addResult.reason, "warning");
            }
          }
          updateHeaderBadgeCounters();
        }
      });
    });

    // 3. View Details trigger (Delegates to Kunal's Modal and tracks view in Anmol's recent tracker)
    document.querySelectorAll(".view-details-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-prop-id");
        if (window.StorageState) {
          window.StorageState.recordPropertyView(id);
        }
        if (window.ModalManager && typeof window.ModalManager.openModal === "function") {
          window.ModalManager.openModal(id);
        }
      });
    });

    // 4. EMI Shortcut trigger (Delegates to Kunal's mortgage calculator)
    document.querySelectorAll(".emi-shortcut-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const price = btn.getAttribute("data-prop-price");
        const title = btn.getAttribute("data-prop-title");
        if (window.MortgageCalculator && typeof window.MortgageCalculator.prefillPrice === "function") {
          window.MortgageCalculator.prefillPrice(price, title);
        }
      });
    });
  };

  /**
   * Updates count indicators on header badges
   */
  const updateHeaderBadgeCounters = () => {
    if (!window.StorageState) return;

    const favBadge = document.getElementById("favoritesCountBadge");
    if (favBadge) {
      const favCount = window.StorageState.getFavorites().length;
      favBadge.textContent = favCount;
      favBadge.style.display = favCount > 0 ? "inline-block" : "none";
    }

    const compareBadge = document.getElementById("compareCountBadge");
    if (compareBadge) {
      const compareCount = window.StorageState.getCompareList().length;
      compareBadge.textContent = compareCount;
      compareBadge.style.display = compareCount > 0 ? "inline-block" : "none";
    }
  };

  /**
   * Re-evaluates criteria and updates UI
   */
  const applyFilters = () => {
    const results = executeFilterPipeline();
    renderPropertyListings(results);
    updateHeaderBadgeCounters();
  };

  /**
   * Restores all search controls back to initial unconstrained states
   */
  const resetAllFilters = () => {
    filterState.keyword = "";
    filterState.city = "all";
    filterState.propertyType = "all";
    filterState.purpose = "all";
    filterState.maxPrice = 50000000;
    filterState.minBedrooms = 0;
    filterState.furnishing = "all";
    filterState.sortBy = "featured";
    filterState.favoritesOnly = false;

    // Reset UI Inputs
    const searchInput = document.getElementById("filterSearchInput");
    if (searchInput) searchInput.value = "";

    const citySelect = document.getElementById("filterCity");
    if (citySelect) citySelect.value = "all";

    const typeSelect = document.getElementById("filterPropertyType");
    if (typeSelect) typeSelect.value = "all";

    const purposeAll = document.querySelector('input[name="purposeFilter"][value="all"]');
    if (purposeAll) purposeAll.checked = true;

    const slider = document.getElementById("filterPriceRange");
    const priceDisplay = document.getElementById("priceSliderValueDisplay");
    if (slider) slider.value = 50000000;
    if (priceDisplay) priceDisplay.textContent = "₹5.00 Cr (Max)";

    document.querySelectorAll("[data-bhk-val]").forEach((p) => {
      p.classList.toggle("is-active", p.getAttribute("data-bhk-val") === "0");
    });

    const furnSelect = document.getElementById("filterFurnishing");
    if (furnSelect) furnSelect.value = "all";

    const sortSelect = document.getElementById("filterSortBy");
    if (sortSelect) sortSelect.value = "featured";

    const favToggleBtn = document.getElementById("toggleFavoritesViewBtn");
    if (favToggleBtn) {
      favToggleBtn.classList.remove("is-active");
      favToggleBtn.textContent = "View Saved Favorites";
    }

    applyFilters();
  };

  /**
   * Dynamically populates city dropdown options from Anmol's dataset
   */
  const populateCityDropdown = () => {
    const citySelect = document.getElementById("filterCity");
    if (!citySelect || !window.RealEstateData) return;

    const cities = window.RealEstateData.getAvailableCities();
    // Preserve "All Cities" default option
    citySelect.innerHTML = '<option value="all">All Cities</option>' +
      cities.map((city) => `<option value="${city}">${city}</option>`).join("");
  };

  /**
   * Initializes event listeners on controls
   */
  const initEventListeners = () => {
    // 1. Debounced Keyword search
    const searchInput = document.getElementById("filterSearchInput");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        debounce((e) => {
          filterState.keyword = e.target.value;
          applyFilters();
        }, 180)
      );
    }

    // 2. City select
    const citySelect = document.getElementById("filterCity");
    if (citySelect) {
      citySelect.addEventListener("change", (e) => {
        filterState.city = e.target.value;
        applyFilters();
      });
    }

    // 3. Property Type select
    const typeSelect = document.getElementById("filterPropertyType");
    if (typeSelect) {
      typeSelect.addEventListener("change", (e) => {
        filterState.propertyType = e.target.value;
        applyFilters();
      });
    }

    // 4. Purpose (Buy / Rent) radios
    document.querySelectorAll('input[name="purposeFilter"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        filterState.purpose = e.target.value;
        applyFilters();
      });
    });

    // 5. Price Range Slider
    const priceSlider = document.getElementById("filterPriceRange");
    const priceDisplay = document.getElementById("priceSliderValueDisplay");
    if (priceSlider) {
      priceSlider.addEventListener("input", (e) => {
        const val = Number(e.target.value);
        filterState.maxPrice = val;
        if (priceDisplay) {
          priceDisplay.textContent = val >= 50000000 ? "₹5.00 Cr (Max)" : formatIndianCurrency(val);
        }
        applyFilters();
      });
    }

    // 6. Bedroom (BHK) filter pills
    document.querySelectorAll("[data-bhk-val]").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("[data-bhk-val]").forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");
        filterState.minBedrooms = Number(pill.getAttribute("data-bhk-val")) || 0;
        applyFilters();
      });
    });

    // 7. Furnishing select
    const furnSelect = document.getElementById("filterFurnishing");
    if (furnSelect) {
      furnSelect.addEventListener("change", (e) => {
        filterState.furnishing = e.target.value;
        applyFilters();
      });
    }

    // 8. Sort selector
    const sortSelect = document.getElementById("filterSortBy");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        filterState.sortBy = e.target.value;
        applyFilters();
      });
    }

    // 9. Favorites Only view toggle
    const favToggleBtn = document.getElementById("toggleFavoritesViewBtn");
    if (favToggleBtn) {
      favToggleBtn.addEventListener("click", () => {
        filterState.favoritesOnly = !filterState.favoritesOnly;
        favToggleBtn.classList.toggle("is-active", filterState.favoritesOnly);
        favToggleBtn.textContent = filterState.favoritesOnly
          ? "Showing Saved Favorites (Reset)"
          : "View Saved Favorites";
        applyFilters();
      });
    }

    // 10. Global Reset button
    const resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", resetAllFilters);
    }
  };

  /**
   * Module bootstrap initializer
   */
  const init = () => {
    populateCityDropdown();
    initEventListeners();
    applyFilters();
    updateHeaderBadgeCounters();

    // Listen to StorageState pub/sub events to keep UI in sync
    if (window.StorageState && typeof window.StorageState.subscribe === "function") {
      window.StorageState.subscribe("favoritesChanged", () => {
        updateHeaderBadgeCounters();
        if (filterState.favoritesOnly) {
          applyFilters();
        }
      });
      window.StorageState.subscribe("compareChanged", () => {
        updateHeaderBadgeCounters();
      });
    }
  };

  // Expose API under Developer 1's namespace
  window.FilterEngine = {
    init,
    applyFilters,
    resetAllFilters,
    formatIndianCurrency,
    calculateStampDuty,
    calculateRentalYield
  };

  // Auto-boot on DOM ready
  document.addEventListener("DOMContentLoaded", init);

})();
