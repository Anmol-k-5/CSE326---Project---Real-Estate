# 🏰 DreamNest Real Estate Listing & Mortgage Platform

> **Course / Academic Submission:** CSE326 - Web Development Project  
> **Tech Stack:** Semantic HTML5, Modular CSS3 (Grid & Flexbox), and Vanilla JavaScript (ES6+)  
> **Team Size:** 3 Members (Collaborative Git Workflow with Separation of Concerns)

---

## 📖 Project Overview

**DreamNest** is a full-featured real estate discovery portal and financial planning application built without external frameworks or dependencies. It allows homebuyers and renters to search across 12 verified residential listings in 8 Indian metropolitan zones, apply real-time multi-criteria filters, calculate monthly home loan EMIs, preview architectural blueprints and photo galleries via a Quick-View modal, and book scheduled site walkthrough appointments with client-side form validation.

---

## 👥 3-Member Engineering Team & Workload Division

```
                      ┌────────────────────────────────────────┐
                      │        DreamNest Realty Portal         │
                      └────────────────────────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         │                                 │                                 │
         ▼                                 ▼                                 ▼
┌──────────────────┐             ┌──────────────────┐             ┌──────────────────┐
│   Anmol (Dev 1)  │             │  Mukesh (Dev 2)  │             │   Kunal (Dev 3)  │
│  @Anmol-k-5      │             │@mukeshkashyap-cse│             │@kp4339536-netizen│
├──────────────────┤             ├──────────────────┤             ├──────────────────┤
│• properties-data │             │• index.html      │             │• calculator.js   │
│• storage-state   │             │• main.css        │             │• modal-contact.js│
│• search-filter   │             │• responsive.css  │             │• components.css  │
└──────────────────┘             └──────────────────┘             └──────────────────┘
```

| Member | Role & Module | Files Owned | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **Anmol**<br>`@Anmol-k-5` | **Data Layer & Search Engine** | `js/properties-data.js`<br>`js/storage-state.js`<br>`js/search-filter.js` | • Master catalog of 12 verified listings with RERA numbers.<br>• Reactive multi-criteria filter pipeline (city, budget, BHK, purpose).<br>• 5 sorting algorithms & dynamic active filter chips.<br>• Client-side `localStorage` state for Wishlist, Comparison, and History. |
| **Mukesh**<br>`@mukeshkashyap-cse` | **UI/UX Architecture & Responsive Layout** | `index.html`<br>`css/main.css`<br>`css/responsive.css` | • Semantic HTML5 document architecture & accessible ARIA labels.<br>• CSS variables design tokens (colors, typography, elevation).<br>• Mobile hamburger drawer navigation & fluid breakpoints.<br>• Property card grid, hover transitions, and sticky glassmorphic header. |
| **Kunal**<br>`@kp4339536-netizen` | **Interactive Tools & Utilities** | `js/calculator.js`<br>`js/modal-contact.js`<br>`css/components.css` | • Real-time mathematical Home Loan / EMI calculator.<br>• Quick-View Property Modal with thumbnail gallery switcher.<br>• "Schedule a Site Visit" booking form with 10-digit mobile & email validation.<br>• Floating toast notification system and FAQ accordions. |

---

## 📂 Multi-Page File & Directory Architecture

```text
CSE326---Project---Real-Estate/
│
├── index.html                  <-- Home: Hero spotlight, city discovery, testimonials
├── properties.html             <-- Catalog: Live search, multi-filter pipeline, sort
├── property-detail.html        <-- Deep Dive: High-res gallery, 2D blueprint, transit radar
├── calculator.html             <-- Financial Hub: EMI calculator, stamp duty, rental yield, bank rates
├── saved.html                  <-- Saved Hub: LocalStorage wishlist & side-by-side comparison matrix
├── contact.html                <-- Scheduling: Private tour booking with validation, office hubs
├── about.html                  <-- Project Team: Academic workload breakdown & architecture
├── README.md                   <-- Team: Project documentation & viva defense guide
├── .gitignore                  <-- Clean repo hygiene
│
├── css/
│   ├── main.css                <-- Mukesh: Design system tokens, layout, cards, navbar
│   ├── responsive.css          <-- Mukesh: Breakpoints for desktop, tablet, mobile, and print
│   └── components.css          <-- Kunal: Modal, 3-in-1 calculator, toast, compare matrix styles
│
└── js/
    ├── properties-data.js      <-- Anmol: 12 verified real estate listings dataset & query API
    ├── storage-state.js        <-- Anmol: LocalStorage persistence & Pub/Sub event bus
    ├── search-filter.js        <-- Anmol: Live search, filter pipeline, sorting, active chips
    ├── calculator.js           <-- Kunal: Mortgage EMI & financial calculation engine
    └── modal-contact.js        <-- Kunal: Quick-view modal, gallery switcher, form validation
```

---

## 🚀 Key Features

1. **Instant Real-Time Search & Filtering:** Debounced search matching against title, locality, address, or amenities without reloading the page.
2. **Multi-Constraint Pipeline:** Filter simultaneously by City, Property Type, Transaction Intent (Buy vs Rent), Price Slider, and Bedroom count.
3. **Active Filter Chips:** Visual removable chips allowing users to individually dismiss applied constraints.
4. **Persistent Wishlist (Favorites):** Save properties to local storage; bookmarks remain saved even when the browser is closed or refreshed.
5. **Interactive EMI Calculator:** Computes monthly installments, total loan interest, and down payment breakdowns using standard amortization formulas.
6. **Property Quick-View Modal:** Open comprehensive details, specifications tables, verified amenities checklists, and multi-perspective photo galleries.
7. **Site Walkthrough Booking with Regex Validation:** Validates Indian 10-digit phone numbers (`^[6-9]\d{9}$`), email format, and blocks past dates on the date picker.
8. **Fully Responsive:** Seamless layout transition from 4K desktop screens down to 360px mobile viewports with an off-canvas navigation menu.
9. **Persistent Dark / Light Theme System:** One-click theme switcher (🌙 / ☀️) persisted in LocalStorage across all 7 pages with zero screen-flicker on reload. Dynamically adapts CSS variables for midnight slate backgrounds (`#0b1120`, `#1e293b`), card borders, typography, and form inputs.

---

## 🎓 Viva Voce & Evaluation Defense Guide

### 👤 Anmol (Developer 1)
* **Viva Script:**
  > *"My responsibility was the data layer, search algorithms, and client-side persistence. I designed the structured dataset representing 12 verified Indian properties with complete architectural specs and RERA registration codes. I developed the multi-criteria filter pipeline using pure functional JavaScript (`.filter()`, `.map()`, `.reduce()`). To persist user bookmarks without a backend database, I implemented a LocalStorage state engine with a publish/subscribe event listener pattern."*
* **Key Viva Q&A:**
  - **Q:** *Why use `localStorage` instead of cookies?*  
    **A:** LocalStorage provides up to 5MB of client-side key-value storage that persists across sessions and is never transmitted over HTTP headers, reducing network overhead.
  - **Q:** *Why debounce the keyword search input?*  
    **A:** Debouncing delays execution until the user stops typing for 180ms, preventing wasteful array filtering calculations on every single keystroke.

---

### 👤 Mukesh (Developer 2)
* **Viva Script:**
  > *"My focus was the UI/UX architecture, responsive design system, and semantic HTML5 structuring. In `css/main.css`, I established design tokens using CSS Custom Properties (`:root` variables) for consistent typography, elevation shadows, and color palettes. I engineered the layout using CSS Grid and Flexbox for fluid property card distribution. In `css/responsive.css`, I designed media queries for mobile and tablet screens, featuring an animated off-canvas drawer navigation."*
* **Key Viva Q&A:**
  - **Q:** *What is the advantage of using CSS Variables (`:root`)?*  
    **A:** They allow centralized theme management and reuse. Changing a single variable dynamically updates colors and spacing across the entire stylesheet.
  - **Q:** *Why choose CSS Grid over classic floats for the card catalog?*  
    **A:** CSS Grid is inherently two-dimensional, allowing dynamic column wrapping (`repeat(auto-fill, minmax(350px, 1fr))`) without requiring clearfix hacks or float clearing.

---

### 👤 Kunal (Developer 3)
* **Viva Script:**
  > *"My module covered the interactive client-side tools and user booking workflows. I built the Home Loan / EMI calculator using standard banking mathematics: $\text{EMI} = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$. I developed the Quick-View property modal with an interactive thumbnail gallery switcher, and implemented the site-visit booking form with strict client-side regex validation to check 10-digit mobile numbers and block past dates."*
* **Key Viva Q&A:**
  - **Q:** *How did you block past dates in the visit booking date picker?*  
    **A:** In JavaScript, I dynamically generated today's ISO date string (`new Date().toISOString().split('T')[0]`) and bound it to the date input's `min` attribute.
  - **Q:** *How does your custom toast notification system work?*  
    **A:** When an action occurs (like saving a favorite or booking a tour), JavaScript creates a lightweight DOM toast pill element, appends it to a fixed container with slide-in CSS keyframes, and automatically removes it via `setTimeout` after 3.5 seconds.

---

## 💻 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Anmol-k-5/CSE326---Project---Real-Estate.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CSE326---Project---Real-Estate
   ```
3. Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari). No npm install or backend server required!
