/**
 * @file properties-data.js
 * @author Anmol (Dev 1 - Data Layer & State Management)
 * @module RealEstateData
 * @description Centralized data catalog representing verified real estate listings.
 *              Provides immutable query helpers, category extractors, and mock property records.
 */

window.RealEstateData = window.RealEstateData || {};

(function () {
  "use strict";

  /**
   * @typedef {Object} Property
   * @property {number} id - Unique primary key for property listing
   * @property {string} title - Marketing listing title
   * @property {string} type - Property classification ("Apartment" | "Villa" | "Penthouse" | "Studio")
   * @property {string} purpose - Listing transaction intent ("Sale" | "Rent")
   * @property {number} price - Numerical value in INR (e.g. 14500000 = ₹1.45 Cr)
   * @property {string} formattedPrice - Human-readable formatted currency representation
   * @property {string} city - Metropolitan city name
   * @property {string} neighborhood - Local sub-locality / neighborhood name
   * @property {string} address - Full verifiable physical address
   * @property {number} bedrooms - Number of residential bedrooms (BHK count)
   * @property {number} bathrooms - Number of bathrooms
   * @property {number} areaSqFt - Total carpet area in square feet
   * @property {string} furnishing - Furnishing state ("Fully-Furnished" | "Semi-Furnished" | "Unfurnished")
   * @property {string} facing - Directional orientation (e.g. "East", "North-East")
   * @property {number} floorNumber - Floor position (e.g. 14)
   * @property {number} totalFloors - Total building height in floors
   * @property {number} parkingSpots - Number of reserved covered parking spaces
   * @property {string} mainImage - High-resolution primary preview asset
   * @property {string[]} gallery - Array of auxiliary photographic angles
   * @property {string[]} amenities - List of verified luxury amenities
   * @property {boolean} isFeatured - Highlight priority flag
   * @property {string} reraId - Real Estate Regulatory Authority approval number
   * @property {string} description - Comprehensive architectural and lifestyle overview
   * @property {string} postedDate - ISO date string of publication (YYYY-MM-DD)
   */

  /** @type {Property[]} */
  const PROPERTIES_CATALOG = [
    {
      id: 101,
      title: "Skyline Heights Luxury Sea-Facing Residence",
      type: "Apartment",
      purpose: "Sale",
      price: 18500000,
      formattedPrice: "₹1.85 Cr",
      city: "Mumbai",
      neighborhood: "Worli",
      address: "Tower 2 - Flat 1402, Worli Seaface, South Mumbai - 400018",
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1850,
      furnishing: "Fully-Furnished",
      facing: "West",
      floorNumber: 14,
      totalFloors: 42,
      parkingSpots: 2,
      mainImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Unobstructed Sea View",
        "Infinity Rooftop Pool",
        "Italian Marble Floors",
        "2 Reserved Car Parks",
        "Acoustic Double-Glazed Windows",
        "High-Speed Smart Elevators",
        "24/7 Multi-Tier Security"
      ],
      isFeatured: true,
      reraId: "P51900001234",
      description: "An exceptional ultra-premium 3 BHK apartment situated on the 14th floor overlooking the Arabian Sea. Meticulously designed with imported marble finishes, automated climate control, and German kitchen appliances.",
      postedDate: "2026-10-12"
    },
    {
      id: 102,
      title: "Greenwood Serenity Duplex Villa",
      type: "Villa",
      purpose: "Sale",
      price: 26000000,
      formattedPrice: "₹2.60 Cr",
      city: "Bengaluru",
      neighborhood: "Whitefield",
      address: "Plot 42, Palm Meadows Phase 2, Whitefield, Bengaluru - 560066",
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3450,
      furnishing: "Semi-Furnished",
      facing: "East",
      floorNumber: 1,
      totalFloors: 2,
      parkingSpots: 3,
      mainImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Private Landscaped Lawn",
        "Solar Grid Power Generation",
        "Rainwater Harvesting System",
        "EV Car Charging Station",
        "Private Terrace Barbecue Deck",
        "Gated Elite Clubhouse Access"
      ],
      isFeatured: true,
      reraId: "PRM/KA/RERA/1251/446/PR/171015/000456",
      description: "Contemporary architectural masterpiece enveloped in tranquil green surroundings. Features a double-height living room ceiling, private home-theatre den, and energy-efficient solar energy backup.",
      postedDate: "2026-10-20"
    },
    {
      id: 103,
      title: "Urban Minimalist Techie Studio",
      type: "Studio",
      purpose: "Rent",
      price: 34000,
      formattedPrice: "₹34,000/mo",
      city: "Pune",
      neighborhood: "Koregaon Park",
      address: "Flat 402, Clover Heights, Lane 7, Koregaon Park, Pune - 411001",
      bedrooms: 1,
      bathrooms: 1,
      areaSqFt: 620,
      furnishing: "Fully-Furnished",
      facing: "North-East",
      floorNumber: 4,
      totalFloors: 8,
      parkingSpots: 1,
      mainImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "High-Speed Optical Fiber WiFi",
        "Modular Work-from-Home Desk",
        "Washer-Dryer In-Unit",
        "Smart Digital Keycard Lock",
        "Gym & Yoga Studio Access"
      ],
      isFeatured: false,
      reraId: "P52100007890",
      description: "Curated modern studio designed for IT professionals and creative founders. Ergonomic layout with convertible Scandinavian fold-out furnishings, high ceiling, and walking distance to prime cafes.",
      postedDate: "2026-11-01"
    },
    {
      id: 104,
      title: "The Royal Oak Presidential Penthouse",
      type: "Penthouse",
      purpose: "Sale",
      price: 45000000,
      formattedPrice: "₹4.50 Cr",
      city: "Delhi NCR",
      neighborhood: "Golf Course Road",
      address: "Tower Alpha - Penthouse 01, Golf Course Extension Rd, Gurugram - 122002",
      bedrooms: 5,
      bathrooms: 6,
      areaSqFt: 5400,
      furnishing: "Fully-Furnished",
      facing: "North",
      floorNumber: 28,
      totalFloors: 28,
      parkingSpots: 4,
      mainImage: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Private Rooftop Heated Plunge Pool",
        "360-Degree Panoramic Golf Views",
        "Dedicated Private Elevator Access",
        "Temperature-Controlled Wine Cellar",
        "Separate Butler / Maid Quarters",
        "Smart Home Automation System"
      ],
      isFeatured: true,
      reraId: "HRERA-PKL-GGM-1092-2022",
      description: "Palatial penthouse standing at the summit of Gurugram's skyline. Unobstructed views of the championship 18-hole golf course, private sky terrace with temperature-controlled plunge pool, and grand entertaining foyer.",
      postedDate: "2026-09-28"
    },
    {
      id: 105,
      title: "CyberCity Executive Corporate Flat",
      type: "Apartment",
      purpose: "Rent",
      price: 58000,
      formattedPrice: "₹58,000/mo",
      city: "Hyderabad",
      neighborhood: "Gachibowli",
      address: "Wing C - Flat 804, Financial District Road, Gachibowli, Hyderabad - 500032",
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1350,
      furnishing: "Semi-Furnished",
      facing: "East",
      floorNumber: 8,
      totalFloors: 22,
      parkingSpots: 1,
      mainImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502005229762-ee1c8d504535?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "100% Full Power Generator Backup",
        "Piped PNG Gas Pipeline",
        "Tennis & Badminton Courts",
        "Supermarket Inside Society",
        "Jogging Track & Skating Rink"
      ],
      isFeatured: false,
      reraId: "P02400003412",
      description: "Ideally positioned five minutes away from Amazon and Microsoft APAC campuses. Features premium vitrified tiling, east-facing sunlit morning balcony, and modular kitchen chimney.",
      postedDate: "2026-11-05"
    },
    {
      id: 106,
      title: "Assagao Heritage Portuguese Villa",
      type: "Villa",
      purpose: "Sale",
      price: 21000000,
      formattedPrice: "₹2.10 Cr",
      city: "Goa",
      neighborhood: "Assagao",
      address: "Boutique Lane 4, Badem Junction, Assagao, North Goa - 403507",
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 2800,
      furnishing: "Fully-Furnished",
      facing: "South-East",
      floorNumber: 1,
      totalFloors: 1,
      parkingSpots: 2,
      mainImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Restored Teak Timber Ceiling",
        "Private Internal Courtyard (Balcão)",
        "Organic Citrus & Mango Garden",
        "Antique Brass Bathroom Fixtures",
        "Independent Deep Artesian Well"
      ],
      isFeatured: false,
      reraId: "PRGO08180421",
      description: "Authentically restored Portuguese villa in the fashionable village of Assagao. Retains signature high Mangalore-tiled pitched roofs, ornate masonry pillars, and a tranquil tropical garden retreat.",
      postedDate: "2026-10-18"
    },
    {
      id: 107,
      title: "Indiranagar Central Metro Residence",
      type: "Apartment",
      purpose: "Rent",
      price: 52000,
      formattedPrice: "₹52,000/mo",
      city: "Bengaluru",
      neighborhood: "Indiranagar",
      address: "Tower B - Flat 601, 100 Feet Road, Indiranagar, Bengaluru - 560038",
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1380,
      furnishing: "Semi-Furnished",
      facing: "East",
      floorNumber: 6,
      totalFloors: 14,
      parkingSpots: 1,
      mainImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "150m Walk to Namma Metro Station",
        "Landscaped Terrace Green Walkway",
        "Biometric Building Access",
        "Multi-Purpose Community Banquet",
        "Covered Underground Parking"
      ],
      isFeatured: true,
      reraId: "PRM/KA/RERA/1251/310/PR/180212/001122",
      description: "Prime address in Bangalore's premier shopping and dining avenue. Bright open layout with large east-facing balcony, custom teak wardrobes, and close proximity to premier international schools.",
      postedDate: "2026-11-09"
    },
    {
      id: 108,
      title: "Oxford Valley Panoramic Golf Bungalow",
      type: "Villa",
      purpose: "Sale",
      price: 19500000,
      formattedPrice: "₹1.95 Cr",
      city: "Pune",
      neighborhood: "Bavdhan",
      address: "Bungalow 24, Oxford Greens Estate, Bavdhan, Pune - 411021",
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3100,
      furnishing: "Unfurnished",
      facing: "North-East",
      floorNumber: 1,
      totalFloors: 2,
      parkingSpots: 2,
      mainImage: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Unobstructed Valley & Hillside Views",
        "Dedicated Private Garden",
        "Children's Play Park",
        "Paved Private Driveway",
        "24-Hour Municipal Water Connection"
      ],
      isFeatured: false,
      reraId: "P52100015678",
      description: "Serene suburban retreat nestled at the foothills of the NDA hills. Clean air, generous open floor plan waiting for custom interior styling, and fast expressway connection to Hinjewadi Phase 1.",
      postedDate: "2026-10-04"
    },
    {
      id: 109,
      title: "Alipore Grand Heritage Penthouse",
      type: "Penthouse",
      purpose: "Sale",
      price: 39000000,
      formattedPrice: "₹3.90 Cr",
      city: "Kolkata",
      neighborhood: "Alipore",
      address: "Tower 1 - Penthouse A, Judges Court Road, Alipore, Kolkata - 700027",
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 4600,
      furnishing: "Fully-Furnished",
      facing: "South",
      floorNumber: 21,
      totalFloors: 21,
      parkingSpots: 3,
      mainImage: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Private Sky Gazebo",
        "Solid Burma Teak Paneling",
        "Temperature-Regulated Jacuzzi",
        "Separate Driver Rest Dormitory",
        "Centralized VRV Air Conditioning"
      ],
      isFeatured: true,
      reraId: "HIRA/P/KOL/2019/000621",
      description: "Distinguished luxury penthouse in Kolkata's most prestigious VIP boulevard. Enjoys sweeping views over the National Library greenery, private rooftop gazebo, and master suite with double walk-in closets.",
      postedDate: "2026-09-14"
    },
    {
      id: 110,
      title: "ECR Coastal Tranquility Villa",
      type: "Villa",
      purpose: "Rent",
      price: 95000,
      formattedPrice: "₹95,000/mo",
      city: "Chennai",
      neighborhood: "ECR Road",
      address: "Villa 9, Golden Beach Enclave, Injambakkam, ECR, Chennai - 600115",
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3600,
      furnishing: "Fully-Furnished",
      facing: "East",
      floorNumber: 1,
      totalFloors: 2,
      parkingSpots: 3,
      mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Private Swimming Pool",
        "Direct Private Beach Access Gate",
        "Reverse Osmosis Water Plant",
        "Caretaker Outpost",
        "Lush Coconut Palm Grove"
      ],
      isFeatured: false,
      reraId: "TN/01/Building/0198/2021",
      description: "Picturesque beach house property situated directly along the East Coast Road. Features an open deck private swimming pool, coconut tree grove, and sea breeze ventilation across all bedroom wings.",
      postedDate: "2026-10-30"
    },
    {
      id: 111,
      title: "Khar Modernist Compact Studio",
      type: "Studio",
      purpose: "Rent",
      price: 42000,
      formattedPrice: "₹42,000/mo",
      city: "Mumbai",
      neighborhood: "Khar West",
      address: "Flat 203, Casa Bella, 14th Road, Khar West, Mumbai - 400052",
      bedrooms: 1,
      bathrooms: 1,
      areaSqFt: 540,
      furnishing: "Fully-Furnished",
      facing: "South",
      floorNumber: 2,
      totalFloors: 7,
      parkingSpots: 1,
      mainImage: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Soundproof Studio Glass",
        "Concealed LED Strip Lighting",
        "Dishwasher & Microwave Included",
        "Secure Video Door Phone",
        "Prime Bandstand Proximity"
      ],
      isFeatured: false,
      reraId: "P51800004921",
      description: "Smart and chic studio apartment optimized for creative living. Features concealed soundproof acoustic windows, smart ambient lighting profiles, and immediate proximity to Bandra's best cultural venues.",
      postedDate: "2026-11-06"
    },
    {
      id: 112,
      title: "Noida Sector 150 Eco-Park Apartment",
      type: "Apartment",
      purpose: "Sale",
      price: 9800000,
      formattedPrice: "₹98 Lakh",
      city: "Delhi NCR",
      neighborhood: "Noida Sector 150",
      address: "Tower 5 - Flat 1104, Sports City, Sector 150, Noida - 201310",
      bedrooms: 3,
      bathrooms: 2,
      areaSqFt: 1650,
      furnishing: "Semi-Furnished",
      facing: "North-East",
      floorNumber: 11,
      totalFloors: 26,
      parkingSpots: 1,
      mainImage: "https://images.unsplash.com/photo-1502005229762-ee1c8d504535?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502005229762-ee1c8d504535?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "80% Dedicated Green Open Land",
        "Cricket Academy & Pitch Access",
        "Olympic-Length 50m Pool",
        "Expressway Direct Flyover Entry",
        "Earthquake Resistant RCC Frame"
      ],
      isFeatured: true,
      reraId: "UPRERAPRJ8741",
      description: "Priced under 1 Crore, this sunlit 3 BHK in NCR's greenest low-density sector overlooks a 42-acre park. Complete with Olympic-size swimming pool, cricket training academy, and direct Noida-Greater Noida expressway connectivity.",
      postedDate: "2026-10-15"
    }
  ];

  /**
   * Retrieves an immutable clone of all property records.
   * Defensive clone prevents external mutations to internal state.
   * @returns {Property[]}
   */
  const getAllProperties = () => {
    return PROPERTIES_CATALOG.map((item) => ({ ...item }));
  };

  /**
   * Locates a single property by its unique primary ID.
   * @param {number|string} id 
   * @returns {Property|null}
   */
  const getPropertyById = (id) => {
    const numericId = parseInt(id, 10);
    const found = PROPERTIES_CATALOG.find((item) => item.id === numericId);
    return found ? { ...found } : null;
  };

  /**
   * Returns listings marked with `isFeatured: true`.
   * @returns {Property[]}
   */
  const getFeaturedProperties = () => {
    return PROPERTIES_CATALOG
      .filter((item) => item.isFeatured)
      .map((item) => ({ ...item }));
  };

  /**
   * Returns unique list of city names available in the catalog.
   * @returns {string[]}
   */
  const getAvailableCities = () => {
    const citySet = new Set(PROPERTIES_CATALOG.map((item) => item.city));
    return Array.from(citySet).sort();
  };

  /**
   * Returns unique property classifications available.
   * @returns {string[]}
   */
  const getAvailablePropertyTypes = () => {
    const typeSet = new Set(PROPERTIES_CATALOG.map((item) => item.type));
    return Array.from(typeSet).sort();
  };

  /**
   * Computes catalog metadata analytics
   * @returns {{ totalCount: number, forSaleCount: number, forRentCount: number, minPrice: number, maxPrice: number }}
   */
  const getCatalogStats = () => {
    const prices = PROPERTIES_CATALOG.map((item) => item.price);
    return {
      totalCount: PROPERTIES_CATALOG.length,
      forSaleCount: PROPERTIES_CATALOG.filter((item) => item.purpose === "Sale").length,
      forRentCount: PROPERTIES_CATALOG.filter((item) => item.purpose === "Rent").length,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  };

  // Expose API under Developer 1 namespace
  window.RealEstateData = {
    getAllProperties,
    getPropertyById,
    getFeaturedProperties,
    getAvailableCities,
    getAvailablePropertyTypes,
    getCatalogStats
  };

})();
