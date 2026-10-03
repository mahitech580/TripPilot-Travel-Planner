# ✈️ TripPilot — Travel Planning OS

TripPilot is a polished, client-side travel planning product built with **HTML, CSS and vanilla JavaScript**. It is designed to feel like a real travel SaaS workspace rather than a static portfolio page.

**Live demo:** https://mahitech580.github.io/TripPilot-Travel-Planner/

---

## Product vision

TripPilot brings the practical pieces of a trip into one focused workspace:

`Discover → Plan → Move → Stay → Budget → Pack → Save`

The current release is intentionally **static and local-first**. It requires no backend, database, login system or booking account.

---

## What is included

### 🌍 Discover
Search and filter destinations by travel style, inspect destination cards, and send a destination directly into the planner.

### 🗺️ Trip Planner
Create a trip with:
- Origin and destination
- Start and end dates
- Travelers
- Primary transport
- Stay style
- Trip style

The planner calculates an indicative trip estimate from destination, duration, travelers and preferences.

### 📊 Command Center
A product-style operational dashboard for the current trip:
- Route overview
- Countdown / trip status
- Estimated budget
- Primary transport
- Readiness indicator
- Itinerary progress
- Packing progress
- Suggested next action
- Exportable trip summary

### 🚆 Transport Hub
Planning views for:
- Flight
- Train
- Bus
- Cab
- Metro
- Auto
- Ferry
- Mixed

Transport values are planning estimates, not live inventory.

### 📅 Itinerary Studio
Destination templates provide suggested day coverage while the user can add custom activities with:
- Day
- Activity
- Time
- Estimated spend

### 🏨 Stay Finder
Search sample stays by destination and stay style, then apply a stay style to the current plan.

### 💰 Budget Studio
Visual budget planning across:
- Transportation
- Stay
- Food
- Local transportation
- Activities

Transport, stay and food reserves can be adjusted interactively.

### 🎒 Packing Studio
A reusable travel checklist with completion tracking and reset support.

### 🧳 My Trips
A local trip library with saved-trip statistics, open/load actions and deletion.

### ⚙️ Settings
Workspace preferences include:
- Name
- Home city
- Preferred stay style
- Default transport
- Dark/light appearance
- JSON data export
- Local data reset

---

## Production UI system

The latest UI pass adds a stronger product identity instead of relying on generic cards:

- Premium dark/light theme system
- Glass and layered surface treatment
- Teal / aqua travel accent palette
- Responsive SaaS navigation
- Product-style hero workspace preview
- Elevated command-center panels
- Progress rings and data bars
- Stronger typography hierarchy
- Hover lift and depth states
- Destination image zoom states
- Scroll progress indicator
- Back-to-top control
- Cursor ambient glow on pointer devices
- Active section navigation
- Reduced-motion support
- Mobile-specific layout tuning
- Keyboard shortcut: press **G** outside an input to jump to the Trip Planner

The project remains framework-free and GitHub Pages compatible.

---

## Technical architecture

### `index.html`
Semantic product structure, navigation, forms, cards, dashboards, planner controls, trip sections and footer.

### `style.css`
Design tokens, responsive layouts, dark/light themes, glass surfaces, gradients, motion, component states and mobile behavior.

### `script.js`
Application state, rendering, LocalStorage, trip calculations, search/filtering, transport switching, itinerary management, packing state, settings, exports and UX enhancements.

### `README.md`
Product documentation, deployment notes, scope and architecture.

---

## Local-first data model

TripPilot stores application state in browser LocalStorage under:

```text
trippilot_v2
```

The stored client-side state can include:
- Workspace preferences
- Current trip
- Budget
- Saved trips
- Custom itinerary activities
- Packing progress
- Theme preference

Because this data is browser-local, clearing site/browser storage can remove saved TripPilot state.

---

## No live booking or guaranteed pricing

TripPilot is a **planning product**, not a booking engine.

It does not currently provide live:
- Flight inventory
- Railway inventory
- Bus inventory
- Hotel availability
- Cab availability
- Payment processing
- Ticket purchases
- Guaranteed travel prices

Displayed transport, stay and budget figures are sample/estimated planning values. Users should verify current availability, schedules, prices, policies and travel requirements with the relevant provider before booking.

External assets such as fonts, icons and imagery are loaded from their respective third-party services.

---

## Responsive experience

TripPilot is tuned for:
- Desktop
- Laptop
- Tablet
- Mobile

The layout adapts navigation, grids, forms, cards, dashboards and action controls instead of simply shrinking the desktop UI.

---

## GitHub Pages

The application is static and can be deployed directly through GitHub Pages.

Repository structure:

```text
TripPilot-Travel-Planner/
├── index.html
├── style.css
├── script.js
└── README.md
```

Recommended GitHub Pages setup:

`Repository → Settings → Pages → Deploy from branch → main`

---

## Scope of the project

TripPilot demonstrates:
- Semantic HTML
- Responsive CSS
- Modern product UI
- Vanilla JavaScript application architecture
- DOM rendering
- Event-driven interactions
- LocalStorage persistence
- Client-side calculations
- Search and filtering
- Interactive budget controls
- Dashboard composition
- Theme management
- Data export
- Responsive navigation

---

## Future product directions

Potential future versions can add real services such as:
- Weather
- Maps
- Places / attractions
- Live transport search
- Live hotel search
- Currency conversion
- Calendar sync
- Cloud accounts
- Authentication
- PDF itineraries
- Notifications
- AI itinerary generation

Those features would require external APIs, service integrations and/or backend infrastructure.

---

## Author

### K. Sai Mahendra

GitHub: https://github.com/mahitech580

LinkedIn: https://www.linkedin.com/in/mahendra-sai-kondaveeti-93438b279/

---

## License

This repository is intended for learning, personal development and portfolio demonstration. Third-party assets remain subject to their respective licenses and terms.

---

## Release note

This production pass focuses on **product presentation + usability + visual hierarchy** while retaining the existing TripPilot planning model and GitHub Pages constraints.

**Plan smarter. Travel better. ✈️**
