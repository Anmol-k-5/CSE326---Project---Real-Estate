# ACADEMIC PROJECT REPORT

## **DREAMNEST: VERIFIED REAL ESTATE LISTING & FINANCIAL MORTGAGE PLATFORM**

* **Course Code:** CSE326 — Web Development  
* **Academic Program:** Bachelor of Technology (B.Tech) in Computer Science & Engineering  
* **Technology Stack:** Pure HTML5, Modular CSS3 (Custom Properties & Grid), Vanilla JavaScript (ES6+)  
* **Repository:** [https://github.com/Anmol-k-5/CSE326---Project---Real-Estate](https://github.com/Anmol-k-5/CSE326---Project---Real-Estate)  
* **Live Deployment:** [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/)

---

### **TEAM MEMBER CONTRIBUTIONS & DETAILS**

| Team Member | Project Role | GitHub Profile | Primary Files Owned |
| :--- | :--- | :--- | :--- |
| **Anmol** | **Developer 1 (Lead):** Data Architect, Search Engine & State Logic | [`@Anmol-k-5`](https://github.com/Anmol-k-5) | `js/properties-data.js`<br>`js/storage-state.js`<br>`js/search-filter.js` |
| **Mukesh** | **Developer 2:** UI/UX Architect & Responsive Design System | [`@mukeshkashyap-cse`](https://github.com/mukeshkashyap-cse) | `index.html`<br>`css/main.css`<br>`css/responsive.css` |
| **Kunal** | **Developer 3:** Interactive Tools, Modals & Client-Side Forms | [`@kp4339536-netizen`](https://github.com/kp4339536-netizen) | `js/calculator.js`<br>`js/modal-contact.js`<br>`css/components.css` |

---

## 1. ABSTRACT

Modern real estate portals often overwhelm home seekers with intrusive advertisements, fraudulent listings, unverified carpet areas, and hidden middleman commissions. **DreamNest** was conceptualized and developed as a transparent, high-performance web platform designed to streamline real estate discovery and investment decision-making. 

The project was engineered using pure web standards—Semantic HTML5, CSS3 Custom Properties (Variables), CSS Grid/Flexbox, and Vanilla ECMAScript 6+—without relying on heavy frameworks or external runtime dependencies. The system demonstrates a modular 3-tier architecture separating the Data/State layer, the UI/Design System, and Client-Side Interactive Tools. Key innovations include real-time multi-criteria filtering with debouncing, zero-backend `localStorage` persistence for bookmarks and comparison queues, a real-time mathematical Home Loan / EMI amortization calculator, and a Quick-View property modal equipped with client-side regex input validation.

---

## 2. OBJECTIVES & SYSTEM REQUIREMENTS

### 2.1 Project Objectives
1. **Zero-Framework Architecture:** Deliver a reactive single-page real estate experience using foundational web technologies.
2. **Separation of Concerns:** Partition code responsibilities across 3 team members to enable simultaneous feature development and independent version control.
3. **Responsive Visual Experience:** Provide fluid layout adaptation across desktop (1920px), tablet (768px–1024px), and mobile viewports (down to 360px).
4. **Client-Side Financial Analytics:** Integrate an interactive banking EMI calculator to eliminate guesswork for prospective buyers.
5. **Stateful Offline Persistence:** Retain user saved favorites and recently inspected listings across browser sessions using HTML5 LocalStorage.

### 2.2 System Specifications
* **Client Environment:** Modern Web Browser (Google Chrome 90+, Mozilla Firefox 88+, MS Edge 90+, Safari 14+).
* **Development Environment:** Visual Studio Code / Modern IDE, Git CLI Version 2.30+.
* **Hardware Requirements:** Any device capable of running a modern browser (Min 2GB RAM, 1GHz Processor).

---

## 3. SYSTEM ARCHITECTURE & DATA FLOW

The application follows a decoupled model-view-controller (MVC) inspired client-side design pattern:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT-SIDE APPLICATION                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
 ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
 │   DATA LAYER (DEV 1) │   │  UI/UX SYSTEM (DEV 2)│   │INTERACTION HUB (DEV 3│
 │        [Anmol]       │   │       [Mukesh]       │   │        [Kunal]       │
 ├──────────────────────┤   ├──────────────────────┤   ├──────────────────────┤
 │• PROPERTIES_CATALOG  │   │• Semantic HTML5 Wire │   │• Mathematical EMI    │
 │• Immutability Getters│   │• CSS Variables Theme │   │• Quick-View Modal    │
 │• Filter Pipeline     │   │• Responsive Breakpts │   │• Regex Form Validate │
 │• LocalStorage Bus    │   │• Property Cards Grid │   │• Floating Toast Pill │
 └──────────────────────┘   └──────────────────────┘   └──────────────────────┘
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       ▼
                       ┌────────────────────────────────┐
                       │   UNIFIED BROWSER INTERFACE    │
                       │   (DOM Tree & Event Dispatch)  │
                       └────────────────────────────────┘
```

---

## 4. MODULE BREAKDOWN & INDIVIDUAL CONTRIBUTIONS

### 4.1 Developer 1 (Anmol): Data Layer, Filter Pipeline & Storage State
* **`js/properties-data.js`:**
  - Built an immutable mock database of 12 verified listings across 8 Indian metropolitan zones (Mumbai, Bengaluru, Delhi NCR, Pune, Hyderabad, Goa, Kolkata, Chennai).
  - Defined rigid JSDoc schemas incorporating specifications (Beds, Baths, Area Sq.Ft, Furnishing, Vastu Facing, Floor, Parking, RERA ID, and Gallery Assets).
  - Provided defensive query methods (`getAllProperties`, `getPropertyById`, `getFeaturedProperties`, `getAvailableCities`).
* **`js/storage-state.js`:**
  - Implemented a LocalStorage management system with defensive `try/catch` wrappers.
  - Features: Saved Favorites (Wishlist), Recently Viewed Tracker (deduplicated FIFO array of last 4 items), 3-property Comparison Queue, and Theme preference.
  - Implemented a custom Publish/Subscribe (Pub/Sub) event bus (`subscribe`, `emit`) allowing other modules to listen for state changes.
* **`js/search-filter.js`:**
  - Designed an instant search engine equipped with a 180ms debounce listener to minimize computation during rapid typing.
  - Multi-criteria filter engine evaluating Keyword, City, Property Type, Transaction Intent (Buy vs Rent), Price Slider, BHK count, and Furnishing status simultaneously.
  - Developed 5 sorting algorithms and an Active Filter Chips generator with one-click individual chip dismissal.

### 4.2 Developer 2 (Mukesh): UI/UX Architecture & Responsive Layout
* **`index.html`:**
  - Engineered the master application layout using semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) and ARIA landmarks.
* **`css/main.css`:**
  - Established a centralized design system utilizing CSS Custom Properties (`:root` variables) for color hierarchies, font families, shadows, and radii.
  - Designed a sticky glassmorphic navigation bar (`backdrop-filter: blur(12px)`), an engaging hero search banner, and a 3-column auto-fill property card grid (`grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))`).
  - Added smooth card lift animations (`transform: translateY(-6px)`) and interactive badge pills.
* **`css/responsive.css`:**
  - Engineered responsive media queries for desktop, tablet, and mobile viewports.
  - Implemented an animated mobile hamburger navigation drawer (`transform: translateY(-150%)` to `0`).
  - Included a clean `@media print` stylesheet optimizing property listings for physical paper and PDF documentation.

### 4.3 Developer 3 (Kunal): Interactive Financial Tools & Form Modules
* **`js/calculator.js`:**
  - Developed an interactive Home Loan / EMI calculator with sliders for Down Payment (10%–60%), Loan Tenure (5–30 Years), and Interest Rates (6.5%–14%).
  - Integrated shortcut hooks (`prefillPrice`) allowing users to click "Calculate EMI" on any property card to instantly populate that property's price into the calculator.
* **`js/modal-contact.js`:**
  - Built a lightweight Quick-View modal popup with photo gallery thumbnail switching and backdrop blur dismissals.
  - Engineered a site-visit appointment form with strict client-side validation:
    * 10-digit Indian mobile regex: `^[6-9]\d{9}$`
    * RFC 5322 compliant email regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
    * Dynamic past-date blocker setting `min` attribute on HTML5 date picker.
* **`css/components.css`:**
  - Engineered component-specific styles for the mortgage calculator card, modal dialog overlay, validation error messages, floating toast notification banners, 2D floor plan blueprints, and comparison tables.

---

### 4.4 Complete 7-Webpage Application Architecture

| # | Webpage | File Name | Key Features & Functional Modules |
| :---: | :--- | :--- | :--- |
| **1** | **Home** | `index.html` | Hero spotlight banner with instant search redirect, verified property carousel, popular city discovery grid, platform value pillars, customer testimonials, and universal header/footer. |
| **2** | **All Properties** | `properties.html` | Master catalog of 12 verified listings, debounced search bar, multi-criteria filter panel (City, Type, Intent, Budget slider, BHK checkboxes), active filter chips, sort engine, and quick modal preview. |
| **3** | **Property Detail** | `property-detail.html` | Deep-dive specs page accepting dynamic URL query (`?id=...`), high-resolution photo gallery with thumbnail switcher, 2D floor blueprint schematic illustration, neighborhood transit distance radar (Metro, Airport, Hospital, School, Mall), certified relationship manager card with direct WhatsApp/Call triggers, and embedded site visit booking form. |
| **4** | **EMI & Finance** | `calculator.html` | 3-in-1 Financial Hub: (1) Interactive Mortgage EMI Calculator with sliders & amortization breakdown; (2) State Stamp Duty & Registration Estimator (Maharashtra, Karnataka, Delhi, Telangana, Goa, West Bengal); (3) Gross Rental Yield & Capital Payback Calculator; plus a live Q4 2026 Bank Interest Rates Comparison Table (SBI, HDFC, ICICI, Axis, BoB) and Financial FAQ accordion. |
| **5** | **Wishlist & Compare** | `saved.html` | Dual-tab personal dashboard: (1) Saved Wishlist persisted via LocalStorage with dynamic badge counter and clear options; (2) Side-by-Side Property Comparison Matrix comparing up to 3 properties across 15+ architectural parameters, price per sq.ft, and verified amenities checklist. |
| **6** | **Book a Visit** | `contact.html` | Private property walkthrough appointment scheduling form with regex validation, 3 metro experience center physical office cards (Bengaluru Flagship, Mumbai South, Gurugram CyberCity), and Customer Support FAQ accordion. |
| **7** | **About & Team** | `about.html` | Platform vision, academic CSE326 project submission documentation, complete 3-member team responsibility breakdown matrix (Anmol, Mukesh, Kunal), technology stack badges, and modular architecture overview. |

---

## 5. MATHEMATICAL FORMULATIONS

### 5.1 Equated Monthly Installment (EMI) Formula
The mortgage calculator executes standard banking amortization math:

$$\text{EMI} = \frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}$$

Where:
* $P = \text{Principal Loan Amount} = \text{Property Price} - \text{Down Payment}$
* $r = \text{Monthly Interest Rate} = \frac{\text{Annual Interest Rate}}{12 \times 100}$
* $n = \text{Total Installments in Months} = \text{Tenure in Years} \times 12$

### 5.2 Gross Annual Rental Yield
$$\text{Rental Yield (\%)} = \left( \frac{\text{Monthly Rent} \times 12}{\text{Total Property Acquisition Cost}} \right) \times 100$$

---

## 6. VERIFICATION & TESTING

| Test Case | Test Description | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :---: |
| **TC-01** | Input search query "Worli" in filter bar | Only Worli listings appear; count badge updates | Successfully shows 1 matching property | **PASS** |
| **TC-02** | Adjust price slider to ₹2.00 Cr | Excludes properties priced above ₹2.00 Cr | Properties filtered in real-time | **PASS** |
| **TC-03** | Click Heart icon on property card | Property saved; counter badge increments | Stored in `localStorage` & survives reload | **PASS** |
| **TC-04** | Input invalid phone "12345" in booking form | Validation blocks submission & highlights input | Displays inline error message | **PASS** |
| **TC-05** | Select yesterday's date in visit date picker | Native calendar disables past dates | Past dates disabled via `min` attribute | **PASS** |
| **TC-06** | Test screen resize to 375px (Mobile viewport) | Layout shifts to 1 column; hamburger activates | Menu toggles cleanly without layout shift | **PASS** |

---

## 7. LAB VIVA VOCE DEFENSE QUESTIONS & ANSWERS

### 7.1 Questions for Anmol (Dev 1 - Data & State)
1. **Q: Why did you implement debouncing on the search input?**  
   *A:* In JavaScript, keyboard input events fire on every character stroke. Without debouncing, searching through data on every keydown wastes CPU cycles. Debouncing delays execution until the user pauses typing for 180ms, improving responsiveness.
2. **Q: How does LocalStorage compare to SessionStorage and Cookies?**  
   *A:* LocalStorage persists data indefinitely until explicitly cleared, providing up to 5MB of storage without being transmitted over HTTP headers (unlike Cookies, which are limited to 4KB and sent with every network request). SessionStorage expires as soon as the tab closes.

### 7.2 Questions for Mukesh (Dev 2 - UI/UX & Layout)
1. **Q: What is the benefit of using CSS Custom Properties (`:root`) over hardcoded hex values?**  
   *A:* CSS variables allow centralized design token management. By changing `--primary-color` in one place, the entire color palette updates across navigation, cards, badges, and buttons instantly.
2. **Q: Explain how your property cards wrap automatically without media queries.**  
   *A:* We used CSS Grid with `repeat(auto-fill, minmax(350px, 1fr))`. The browser calculates available width and packs as many 350px columns as fit, expanding each card proportionally to fill remaining space.

### 7.3 Questions for Kunal (Dev 3 - Interactive Tools)
1. **Q: How did you implement client-side input validation on the booking form?**  
   *A:* We intercepted form submission using `event.preventDefault()`, parsed the values, and tested them against regular expressions (`^[6-9]\d{9}$` for 10-digit Indian phone numbers and email patterns). We also dynamically bound today's date to `dateInput.min` to eliminate past dates.
2. **Q: How does your toast notification system operate?**  
   *A:* When triggered, JavaScript dynamically creates a DOM element with slide-in CSS keyframe animations, appends it to a fixed container, and schedules automatic dismissal using `setTimeout` after 3.5 seconds.

---

## 8. CONCLUSION & FUTURE ENHANCEMENTS

The **DreamNest** project successfully fulfills all curriculum requirements for CSE326 Web Development by showcasing a clean, decoupled architecture built with modern HTML5, CSS3, and ES6 JavaScript. The codebase demonstrates clear git collaboration among three distinct developer personas without code duplication or merge conflicts.

### Future Enhancements:
1. Integration of Leaflet.js / OpenStreetMap API for interactive map view coordinates.
2. Node.js / Express backend with MongoDB persistence for authenticated user accounts.
3. Razorpay / UPI payment gateway integration for advance token booking deposits.
