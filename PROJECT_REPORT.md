# SOFTWARE REQUIREMENTS SPECIFICATION (IEEE 830 STANDARD)
## **DREAMNEST: VERIFIED REAL ESTATE LISTING & FINANCIAL MORTGAGE SUITE**

**Course Code:** CSE326 — Internet Programming / Web Development  
**Academic Task:** Continuous Assessment 3 (CA3) & CA1  
**Institution:** Lovely Professional University, Punjab  
**Academic Term:** Spring 2026  

---

### **TEAM MEMBER CONTRIBUTIONS & DETAILS**

| Member Name | Registration No. | GitHub Handle & Persona | Assigned Project Role |
| :--- | :---: | :--- | :--- |
| **Anmol (Lead)** | `[Enter Reg No 1]` | `@Anmol-k-5` (`2anmol2021@gmail.com`) | Data Layer, 64 Properties, Multi-Filter Pipeline & Storage State |
| **Mukesh** | `[Enter Reg No 2]` | `@mukeshkashyap-cse` (`316958400+mukeshkashyap-cse@users.noreply.github.com`) | UI/UX Architecture, Dark Mode Theming, Design Tokens & Responsive Layout |
| **Kunal** | `[Enter Reg No 3]` | `@kp4339536-netizen` (`345467714+kp4339536-netizen@users.noreply.github.com`) | 3-in-1 Financial Mortgage Hub, Customer Review Engine & Modals |

---

### **REVISION HISTORY**

| Version | Release Date | Description of Changes | Primary Author |
| :---: | :---: | :--- | :--- |
| **v1.0** | 10-Nov-2026 | Initial conceptual layout, SRS requirements specification, wireframing | Anmol |
| **v1.1** | 12-Nov-2026 | Responsive design system, CSS custom properties, multi-viewport layout | Mukesh |
| **v1.2** | 14-Nov-2026 | Interactive mortgage loan calculator, validation engine, toast alerts | Kunal |
| **v2.0** | 15-Nov-2026 | Expanded to 64 verified properties, dark mode engine, review engine, final IEEE SRS | All Members |

---

### **TABLE OF CONTENTS**

- **Revision History**
- **1. Introduction**
  - 1.1 Purpose
  - 1.2 Scope
  - 1.3 Definitions, Acronyms, and Abbreviations
  - 1.4 References
  - 1.5 Overview
- **2. General Description**
  - 2.1 Product Perspective
  - 2.2 Product Functions
  - 2.3 User Characteristics
  - 2.4 General Constraints
  - 2.5 Assumptions and Dependencies
- **3. Specific Requirements**
  - 3.1 External Interface Requirements
    - 3.1.1 User Interfaces
    - 3.1.2 Hardware Interfaces
    - 3.1.3 Software Interfaces
    - 3.1.4 Communications Interfaces
  - 3.2 Functional Requirements
    - 3.2.1 Feature #1: Multi-Criteria Catalog & Debounced Search Filtering
    - 3.2.2 Feature #2: Property Deep Dive, Blueprint & Transit Proximity Radar
    - 3.2.3 Feature #3: 3-in-1 Financial Hub (Mortgage EMI, Stamp Duty, Rental Yield)
    - 3.2.4 Feature #4: Wishlist & 3-Property Comparison Matrix
    - 3.2.5 Feature #5: Universal Dark Mode Theming Engine
    - 3.2.6 Feature #6: Community Review Submission Engine with 5-Star Rating
    - 3.2.7 Feature #7: Private Walkthrough Booking with Strict Regex Validation
  - 3.5 Non-Functional Requirements
    - 3.5.1 Performance
    - 3.5.2 Reliability & Fault Tolerance
    - 3.5.3 Availability
    - 3.5.4 Security & Data Sanitization
    - 3.5.5 Maintainability & Modularity
    - 3.5.6 Portability & Cross-Browser Consistency
  - 3.7 Design Constraints
  - 3.9 Other Requirements (RERA Compliance across 8 Metros)
- **4. Analysis Models**
  - 4.1 Data Flow Diagrams (Level 0 Context DFD & Level 1 Process DFD)
- **5. Github link**
- **6. DEPLOYED LINK**
- **A. Appendices**
  - A.1 System Verification & Test Suite (TC-01 through TC-08)
  - A.2 Lab Viva Voce Defense Guide for Team Members

*(Note: Items 7, 8, 9, 10, and 11 from commercial templates—Client Approval Proof, Client Location Proof, Transaction ID Proof, Email Acknowledgement, and GST No.—have been omitted as this project is an academic software development assessment).*

---

## 1. INTRODUCTION

### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a rigorous, formal specification of the requirements for **DreamNest**: a verified real estate listing and financial mortgage analysis web platform. The primary intended audience comprises the course faculty, academic evaluators, and project contributors. It details the complete functional scope, non-functional quality constraints, behavioral data models, and client-side architectural mechanics adhering strictly to the **IEEE 830 standard** for software requirement documentation.

### 1.2 Scope
The software product is officially designated as **"DreamNest: Real Estate Platform" (Release 2.0)**. DreamNest is engineered to resolve critical friction points in contemporary Indian real estate discovery: fraudulent listings, inflated carpet areas, hidden brokerage fees, and confusing home loan calculations.

The application provides:
- A catalog of **64 verified properties** across 8 tier-1 metropolitan zones (Mumbai, Bengaluru, Delhi NCR, Pune, Hyderabad, Goa, Chennai, and Kolkata).
- Real-time debounced multi-criteria searching (180ms delay).
- An interactive **3-in-1 mortgage EMI calculator** with live amortization schedules, state-wise stamp duty estimations, and gross rental yield calculations.
- Zero-latency bookmarking and comparison matrices via HTML5 LocalStorage.
- An accessible flicker-free **Dark Mode theme switcher** with zero white flash on page load.
- An interactive **Community Review Submission Engine** with 5-star rating selection.
- Client-side regex-validated private site visit booking forms.

**What the software will NOT do:** The system explicitly avoids heavy backend database frameworks (e.g., MySQL, MongoDB, Node.js server runtimes) to adhere to CSE326 course constraints, operating 100% within the browser via vanilla ECMAScript 6+ and browser storage.

### 1.3 Definitions, Acronyms, and Abbreviations

| Term / Acronym | Definition & Academic Explanation |
| :--- | :--- |
| **SRS** | Software Requirements Specification (IEEE 830 Standard) |
| **IEEE** | Institute of Electrical and Electronics Engineers |
| **RERA** | Real Estate Regulatory Authority (statutory body governing Indian real estate) |
| **EMI** | Equated Monthly Installment |
| **BHK** | Bedroom, Hall, Kitchen (standard residential room typology) |
| **FOUC** | Flash of Unstyled Content / Screen Flicker during page load |
| **DOM** | Document Object Model |
| **DFD** | Data Flow Diagram |
| **LocalStorage** | W3C standard client-side persistent key-value web storage mechanism (5MB quota) |
| **Debouncing** | Programming pattern ensuring heavy search computations only execute after user pauses input for 180ms |

### 1.4 References
1. IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications.
2. W3C HTML5 Specification (W3C Recommendation 2021) — Semantic Elements & ARIA Landmarks.
3. W3C CSS Cascading Style Sheets Level 3 & CSS Custom Properties for Theming.
4. ECMA-262 14th Edition / ECMAScript 2023 Language Specification.
5. Lovely Professional University CSE326 Internet Programming Assessment Guidelines.

### 1.5 Overview
The remainder of this specification is organized into functional sections: Section 2 describes general product perspectives, user characteristics, and design constraints; Section 3 establishes the detailed functional and non-functional engineering specifications; Section 4 illustrates the Data Flow Diagrams (DFDs); Section 5 and 6 present verified GitHub and Deployed links; and the Appendices contain verification test suites and viva voce defense scripts for all team members.

---

## 2. GENERAL DESCRIPTION

### 2.1 Product Perspective
DreamNest is an independent, self-contained client-side web application running completely within modern web browsers. It acts as a digital bridge between prospective homebuyers/tenants and verified residential properties. Unlike commercial portals cluttered with advertising and paywalled contact info, DreamNest provides instantaneous RERA-verified data access, transparent financial forecasting tools, and private site visit scheduling.

### 2.2 Product Functions
The core functionality provided by DreamNest includes:
1. **Dynamic Multi-Criteria Property Filtering:** Filter 64 properties by City (8 zones), Price Slider (up to ₹10 Cr), BHK Typology (1 to 5 BHK), Property Type (Apartment, Villa, Penthouse, Studio), and Transaction Mode (Buy/Rent).
2. **Real-Time Debounced Keyword Search:** Search across titles, builder names, micro-locations, and amenities with 180ms debouncing.
3. **3-in-1 Financial Mortgage Suite:** Interactive slider-driven loan EMI calculator, state-wise stamp duty estimator, and gross rental yield calculator.
4. **Wishlist & Comparison Matrix:** Client-side storage of favorite properties with side-by-side technical specification comparison.
5. **Persistent Dark/Light Theming:** Universal theme switcher with inline synchronous loader to eliminate screen flicker (FOUC).
6. **Community Review Engine:** 5-star rating picker, client-side input validation, and dynamic testimonial persistence.
7. **Site Walkthrough Booking:** Tour booking modal with 10-digit mobile regex, email pattern check, and past-date disabling.

### 2.3 User Characteristics
The target user personas include:
- **Prospective Homebuyers:** Seeking verified carpet areas, RERA certificates, and monthly EMI estimates.
- **Real Estate Investors:** Analyzing gross rental yields, price appreciation potential, and metro transit distances.
- **Academic Evaluators:** Reviewing source code modularity, semantic markup, responsive design tokens, and git commit history.

### 2.4 General Constraints
- **Technology Stack Constraint:** Development is restricted to pure native HTML5, CSS3, and Vanilla JavaScript (ES6+).
- **Zero Backend Constraint:** No centralized relational or non-relational database is permitted; all persistence leverages HTML5 Web Storage.
- **Git Persona Attribution:** Clear commit attribution across Anmol (Lead), Mukesh (UI/UX), and Kunal (Interactive Tools).
- **Zero Commercial Client Requirement:** As an academic assessment, commercial client contracts, GST invoices, and paid transaction IDs are not required and are explicitly excluded.

### 2.5 Assumptions and Dependencies
- **Client Browser:** The user possesses an ECMAScript 6+ compliant browser (Google Chrome 90+, Mozilla Firefox 88+, Safari 14+, MS Edge 90+).
- **LocalStorage Enabled:** Client browser has LocalStorage enabled with at least 5MB available space.
- **Network Connectivity:** Initial load requires an active Internet connection to retrieve Unsplash CDN photography and FontAwesome icons.

---

## 3. SPECIFIC REQUIREMENTS

### 3.1 External Interface Requirements
- **3.1.1 User Interfaces:** Clean, modern, glassmorphic UI adhering to 8px spatial grid systems. Responsive typography, smooth micro-interactions, and accessible color contrasts in both light and dark themes (WCAG AA compliant).
- **3.1.2 Hardware Interfaces:** Responsive viewport rendering across desktop workstations (1920x1080), laptops (1366x768), tablets (768x1024), and mobile devices (375x812, 360x640).
- **3.1.3 Software Interfaces:** W3C DOM API, Window.localStorage, JSON serialization / deserialization, and CSS Custom Properties API.
- **3.1.4 Communications Interfaces:** Standard HTTPS over port 443 via GitHub Pages edge CDN.

### 3.2 Functional Requirements (7 Core Features)

#### 3.2.1 Feature #1: Multi-Criteria Catalog & Debounced Search Filtering
- **Inputs:** Search query string, City dropdown, Property Type dropdown, BHK buttons, Price Range slider (₹10L - ₹10Cr), Sort selector.
- **Processing:** Keyup events trigger a 180ms debouncer. The filter pipeline iterates through the 64-listing catalog array in `js/properties-data.js`, evaluating predicate functions. Sorters reorder the array by price, area, or date.
- **Outputs:** Dynamic re-rendering of property card DOM nodes into the grid. Zero results triggers an empty-state illustration.
- **Error Handling:** Invalid characters are sanitized; search handles case-insensitive substring matching.

#### 3.2.2 Feature #2: Property Deep Dive, Blueprint & Transit Proximity Radar
- **Inputs:** URL query parameter (`?id=xxx`).
- **Processing:** `js/properties-data.js` parses the ID, fetches the property object, dynamically injects title, price, carpet area, verified RERA ID, and photo gallery thumbnails.
- **Outputs:** Full property hero showcase, 2D architectural blueprint layout, transit proximity radar (distances to Metro, Airport, Hospital, School), and verified Relationship Manager contact card.
- **Error Handling:** If an invalid ID is supplied, the view displays a 'Property Not Found' banner with a link returning to `properties.html`.

#### 3.2.3 Feature #3: 3-in-1 Financial Mortgage Suite (`calculator.html`)
- **Inputs:** Property price slider, down payment slider (10% - 60%), loan tenure slider (5 - 30 yrs), interest rate slider (6.5% - 14%), state selector, monthly rental estimate.
- **Processing:** Mathematical calculation of EMI:
  $$\text{EMI} = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$
  Computes state stamp duty (Maharashtra 6%, Karnataka 5.6%, etc.) and gross rental yield:
  $$\text{Gross Yield (\%)} = \left( \frac{\text{Monthly Rent} \times 12}{\text{Total Cost}} \right) \times 100$$
- **Outputs:** Real-time updated monthly payment figure, principal vs interest visual breakdown bar, total statutory tax estimate, and rental yield payback metrics.
- **Error Handling:** Sliders prevent divide-by-zero errors through strict min/max attribute enforcement.

#### 3.2.4 Feature #4: Wishlist & 3-Property Comparison Matrix (`saved.html`)
- **Inputs:** Click on Heart icon (Bookmark) or Scale icon (Compare) on any card.
- **Processing:** StorageState module checks existence in localStorage arrays. If present, it removes it (toggle); if absent, it appends it (max 3 for comparison). Dispatches custom DOM events.
- **Outputs:** Updates navbar badge counter; dynamically constructs side-by-side technical comparison table across Price, Carpet Area, BHK, City, RERA, and Amenities.
- **Error Handling:** Attempting to compare more than 3 properties triggers a toast alert: *"You can compare up to 3 properties at a time."*

#### 3.2.5 Feature #5: Universal Dark Mode Theming Engine
- **Inputs:** Click on Sun/Moon theme switcher button in navigation header.
- **Processing:** Toggles `data-theme` attribute on `<html>` element between 'light' and 'dark'. Persists state to localStorage key `dreamnest_user_theme_pref`. An inline script in `<head>` executes before DOM paint to prevent screen flicker (FOUC).
- **Outputs:** Seamless CSS variables switch: background shifts to deep slate (`#0b1120`), cards to `#1e293b`, text to ivory (`#f8fafc`), with illuminated focus rings.
- **Error Handling:** Defaults gracefully to user's OS preference via `matchMedia('(prefers-color-scheme: dark)')` if no localStorage preference exists.

#### 3.2.6 Feature #6: Community Review Submission Engine with 5-Star Rating
- **Inputs:** Reviewer name, user role (Buyer / Investor / Tenant), city, star rating (1 to 5), and review comment.
- **Processing:** Validates comment length (min 15 chars). Generates initials avatar, builds review object, prepends to reviews grid, and serializes into localStorage under `dreamnest_user_reviews`.
- **Outputs:** Instantaneous visual card injection into the customer review grid; survives page reloads and browser restarts.
- **Error Handling:** Submitting with less than 15 characters highlights the input field in red with an inline error message.

#### 3.2.7 Feature #7: Private Walkthrough Booking with Strict Regex Validation
- **Inputs:** Visitor full name, 10-digit Indian phone number, email address, preferred date, slot time, and message.
- **Processing:** Validates phone against regex: `^[6-9]\d{9}$`. Validates email against standard RFC regex. Date picker dynamically disables past dates by binding `dateInput.min` to today's ISO date string.
- **Outputs:** Green confirmation toast pill: *"Appointment Scheduled Successfully!"*, form auto-reset, and simulated relationship manager assignment.
- **Error Handling:** Invalid phone or email displays clear red error labels beneath the respective inputs.

### 3.5 Non-Functional Requirements
- **3.5.1 Performance:** Search query debouncing ensures catalog filtering executes in <15ms. Initial page load completes in <1.2 seconds on standard 4G connections. Dark mode theme loader executes in <2ms with zero screen flicker.
- **3.5.2 Reliability & Fault Tolerance:** The application utilizes robust try-catch wrappers around all localStorage read/write operations. In private/incognito browsing modes with storage blocked, state falls back gracefully to in-memory dictionaries.
- **3.5.3 Availability:** Hosted on GitHub Pages edge network, delivering 99.99% global availability with automated HTTPS SSL encryption.
- **3.5.4 Security:** All user inputs entered in reviews or booking forms are sanitized via Node.textContent DOM bindings, strictly preventing Cross-Site Scripting (XSS) injection attacks.
- **3.5.5 Maintainability:** Adheres to decoupled modular JavaScript architecture: `properties-data.js` (Data layer), `storage-state.js` (State layer), `search-filter.js` (Catalog pipeline), `calculator.js` (Financial tools), and `modal-contact.js` (Forms & reviews).
- **3.5.6 Portability:** 100% standards-compliant CSS3 and HTML5 ensure identical layout fidelity across Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Opera.

### 3.7 Design Constraints
- Implementation is strictly vanilla web standards: no external runtime dependencies, no npm dependencies, no jQuery, and no Node.js server.
- Total project assets (excluding cached Unsplash image CDNs) remain under 500KB for maximum lightweight execution.

### 3.9 Other Requirements: Regulatory RERA Compliance
All 64 properties represented across the 8 metropolitan areas feature verified state real estate regulatory numbers: MahaRERA (Maharashtra), Karnataka RERA, Delhi RERA / HRERA (Haryana), Telangana RERA, Goa RERA, TNRERA (Tamil Nadu), and WBRERA (West Bengal), ensuring realistic compliance modeling.

---

## 4. ANALYSIS MODELS

### 4.1 Data Flow Diagrams (DFD)

#### 4.1.1 Level 0 Context DFD
```
                   +-------------------------------------------------------+
                   |                    END USER                           |
                   |   (Prospective Homebuyer / Investor / Academic)       |
                   +-------------------------------------------------------+
                            |                                       ^
       User Interaction Data|                                       | Real-Time Dynamic Views
       (Filters, Bookmarks, |                                       | (Cards, Blueprints,
        Reviews, Dark Mode) |                                       |  EMI, Comparison)
                            v                                       |
                   +-------------------------------------------------------+
                   |              [ PROCESS 0: DREAMNEST ]                 |
                   |    Client-Side Real Estate Discovery & Mortgage Hub   |
                   +-------------------------------------------------------+
                            |                                       ^
               Write State  |                                       | Read Catalog Data
               (Favorites,  |                                       | (64 Listings, RERA,
                Reviews)    v                                       |  Pricing, Amenities)
                   +-----------------+                     +-----------------+
                   |  LOCALSTORAGE   |                     | PROPERTIES DATA |
                   |  (Browser Store)|                     | (Static Array)  |
                   +-----------------+                     +-----------------+
```

#### 4.1.2 Level 1 Process Decomposition DFD
- **Process 1.0 (Filter & Search Pipeline - Anmol):**  
  `User Input` $\rightarrow$ `Debounce Buffer (180ms)` $\rightarrow$ `Filter Predicate Evaluator` $\rightarrow$ `Sorter` $\rightarrow$ `Filtered DOM Card Grid`.
- **Process 2.0 (State & Storage Engine - Anmol):**  
  `User Bookmark / Compare Action` $\rightarrow$ `StorageState Engine` $\rightarrow$ `LocalStorage Serialization` $\rightarrow$ `PubSub Event` $\rightarrow$ `UI Badge Synchronization`.
- **Process 3.0 (Financial Computation Hub - Kunal):**  
  `User Loan Sliders` $\rightarrow$ `EMI Amortization Algorithm` $\rightarrow$ `Stamp Duty Estimator` $\rightarrow$ `Rental Yield Matrix` $\rightarrow$ `Visual Chart Breakdown`.
- **Process 4.0 (Community Review Engine - Kunal):**  
  `User Star Rating & Feedback` $\rightarrow$ `Length Validator` $\rightarrow$ `Initials Generator` $\rightarrow$ `Prepend DOM Card` $\rightarrow$ `LocalStorage Write`.
- **Process 5.0 (Form Validation & Walkthrough Scheduling - Kunal):**  
  `Booking Form Submission` $\rightarrow$ `Regex Validation (Phone/Email)` $\rightarrow$ `Date Constraint Checker` $\rightarrow$ `Confirmation Toast`.

---

## 5. GITHUB LINK

The entire source code repository, version history, and individual developer branch commits are publicly maintained at:

**GitHub Repository:** [https://github.com/Anmol-k-5/CSE326---Project---Real-Estate](https://github.com/Anmol-k-5/CSE326---Project---Real-Estate)

| Member Name | Git Identity & Email | Key Repositories & Modules Authored |
| :--- | :--- | :--- |
| **Anmol (Lead)** | `Anmol <2anmol2021@gmail.com>` | `js/properties-data.js` (64 items), `js/storage-state.js`, `js/search-filter.js` |
| **Mukesh** | `Mukesh <316958400+mukeshkashyap-cse@users.noreply.github.com>` | `css/main.css` (Tokens & Dark Mode), `css/responsive.css`, HTML page layouts |
| **Kunal** | `Kunal <345467714+kp4339536-netizen@users.noreply.github.com>` | `js/calculator.js` (EMI & Yield), `js/modal-contact.js` (Reviews & Validations), `css/components.css` |

---

## 6. DEPLOYED LINK

The project is compiled, production-ready, and deployed live to GitHub Pages with automated continuous deployment:

**Live URL:** [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/)

| Webpage File | Live URL Route | Deployment Status |
| :--- | :--- | :---: |
| `index.html` | [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/) | **HTTP 200 OK (Active)** |
| `properties.html` | [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/properties.html](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/properties.html) | **HTTP 200 OK (Active)** |
| `property-detail.html` | [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/property-detail.html?id=101](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/property-detail.html?id=101) | **HTTP 200 OK (Active)** |
| `calculator.html` | [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/calculator.html](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/calculator.html) | **HTTP 200 OK (Active)** |
| `saved.html` | [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/saved.html](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/saved.html) | **HTTP 200 OK (Active)** |
| `contact.html` | [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/contact.html](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/contact.html) | **HTTP 200 OK (Active)** |
| `about.html` | [https://anmol-k-5.github.io/CSE326---Project---Real-Estate/about.html](https://anmol-k-5.github.io/CSE326---Project---Real-Estate/about.html) | **HTTP 200 OK (Active)** |

---

## A. APPENDICES

### A.1 Appendix 1: System Verification & Test Suite

| Test ID | Test Scenario | Input / Action | Expected Result | Status |
| :---: | :--- | :--- | :--- | :---: |
| **TC-01** | Debounced Search | Type 'Worli' in search input | Cards filter dynamically after 180ms pause | **PASS** |
| **TC-02** | Multi-Filter Pipeline | Select City 'Bengaluru' + BHK '3 BHK' | Grid displays only 3 BHK homes in Bengaluru | **PASS** |
| **TC-03** | Loan EMI Computation | Price: ₹1 Cr, Down: 20%, Rate: 8.5%, 20Y | Calculates exact monthly EMI of ₹69,426 | **PASS** |
| **TC-04** | Invalid Phone Validation | Enter '12345' in tour booking form | Submission blocked; displays red error alert | **PASS** |
| **TC-05** | Past Date Disabled | Attempt to pick yesterday's date in picker | Past dates are unclickable via `dateInput.min` | **PASS** |
| **TC-06** | Responsive Viewport | Resize browser window down to 375px width | Layout shifts to 1-col; hamburger menu active | **PASS** |
| **TC-07** | Customer Review Engine | Submit 5-star review with comment | Prepends review card to grid; persists in storage | **PASS** |
| **TC-08** | Dark Theme Switcher | Click theme toggle button (moon icon) | Inverts theme tokens to dark; zero screen flicker | **PASS** |

### A.2 Appendix 2: Lab Viva Voce Defense Guide for Team Members

#### Questions for Anmol (Developer 1 - Data Layer & State Management)
1. **Q: Why did you implement debouncing on the search input?**  
   *A:* In vanilla JavaScript, keyboard input events fire on every single keystroke. Without debouncing, iterating through all 64 property objects on every keypress wastes CPU cycles and induces UI lag. Debouncing delays calculation by 180ms until the user pauses typing, boosting responsiveness.
2. **Q: How does LocalStorage compare to SessionStorage and Cookies?**  
   *A:* LocalStorage persists data indefinitely until explicitly cleared, providing up to 5MB of storage without being transmitted over HTTP headers (unlike Cookies, which are limited to 4KB and transmitted on every request). SessionStorage expires automatically as soon as the browser tab is closed.

#### Questions for Mukesh (Developer 2 - UI/UX Architecture & Layout)
1. **Q: What are the benefits of CSS Custom Properties (`:root` variables) over hardcoded values?**  
   *A:* CSS variables provide centralized design token management. Instead of hardcoding hex codes across hundreds of selectors, changing `--primary-color` in `:root` or overriding tokens under `[data-theme='dark']` updates the entire site palette instantly.
2. **Q: How does your Dark Mode prevent the white screen flash (FOUC) on page reload?**  
   *A:* We execute a synchronous inline `<script>` in the `<head>` of each HTML document before the DOM renders. It reads `dreamnest_user_theme_pref` from localStorage and sets `data-theme='dark'` on `document.documentElement` before the browser paints the body, ensuring zero white flash.

#### Questions for Kunal (Developer 3 - Interactive Tools & Modals)
1. **Q: How did you implement client-side input validation on the booking form?**  
   *A:* We intercepted form submission using `event.preventDefault()`, parsed the values, and tested them against regular expressions (`^[6-9]\d{9}$` for 10-digit Indian phone numbers and RFC-compliant email regex). We also dynamically bound today's date to `dateInput.min` to eliminate past dates.
2. **Q: How does the customer review engine persist and render new reviews?**  
   *A:* When a homebuyer submits a review, JavaScript validates the comment length, extracts initials for a circular avatar, generates the star rating display, prepends the DOM card to the reviews grid, and serializes the array into localStorage under key `dreamnest_user_reviews` so it re-renders automatically on subsequent visits.
