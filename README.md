# ✈️ TripPilot — Travel Planner

TripPilot is a modern, interactive **travel planning web application** built with **HTML5, CSS3, and JavaScript**.

It provides a complete browser-based workspace for discovering destinations, planning trips, choosing transportation, building day-by-day itineraries, exploring stays, managing travel budgets, preparing packing lists, and saving trips locally.

The application is designed as a **professional SaaS-style frontend experience** while remaining completely client-side, responsive, and deployable through GitHub Pages without a backend.

---

## 🌍 Live Demo

🔗 **https://mahitech580.github.io/TripPilot-Travel-Planner/**

---

## ✨ Features

### 🌎 Destination Discovery

TripPilot provides an interactive destination discovery experience for exploring travel destinations.

Users can:

* Browse destination cards
* Search destinations
* Filter destinations by travel style
* View destination descriptions
* View approximate route-distance information
* Instantly send a destination into the Trip Builder

Current destination categories include:

* 🏖️ Beach
* 🏔️ Mountains
* 🏰 Heritage
* 🌴 Backwaters
* 🏙️ City

Featured destinations include:

* 🇮🇳 Goa
* 🏔️ Manali
* 🏰 Jaipur
* 🌴 Alappuzha
* 🌆 Mumbai
* 💻 Bengaluru
* 🏛️ Delhi
* 🌊 Kochi
* 🏞️ Udaipur
* 🧗 Rishikesh
* 🍃 Munnar
* 🏛️ Hampi

---

# 🏠 Product-Style Home Experience

The TripPilot home page is designed like a modern travel SaaS workspace instead of a traditional static portfolio landing page.

The home experience includes:

* Interactive travel hero section
* Animated travel phrases
* Current trip overview
* Trip readiness percentage
* Saved trip count
* Upcoming trip count
* Product-style trip workspace preview
* Route visualization
* Estimated budget preview
* Trip duration
* Traveler count
* Quick navigation shortcuts
* Browser-local product indicators

The home dashboard is connected to the same application state used throughout TripPilot.

---

# 📊 Trip Command Center

The **Trip Command Center** provides a centralized overview of the current trip.

It combines important planning information into a single dashboard.

### 🗓️ Trip Countdown

The application calculates trip status from the selected dates.

Possible states include:

* `X days to go`
* `Day X of Y`
* `Completed`
* `Planning`

### 📍 Route Overview

The Command Center displays:

```text
Origin → Destination
```

along with:

* Trip duration
* Travelers
* Transport
* Estimated budget
* Current trip status

### ✅ Trip Readiness

Trip readiness is a planning indicator calculated from the existing application state.

It considers:

* Trip setup
* Itinerary coverage
* Budget configuration
* Packing completion

The result is displayed as a percentage.

> Trip readiness is an application-generated planning indicator and does not represent a real-world measurement of travel preparedness.

### 📋 Itinerary Progress

The dashboard estimates itinerary coverage using:

* Destination itinerary days
* Custom activities
* Current trip duration

### 🎒 Packing Progress

Packing completion is automatically reflected in the Command Center.

For example:

```text
6 / 9 items packed
67%
```

### 💰 Budget Overview

The Command Center displays the current estimated travel budget using the existing TripPilot budget state.

### 🧭 Next Action

TripPilot automatically suggests the next planning action based on the current state.

Examples include:

* Complete your trip setup
* Build the itinerary
* Set your budget
* Finish packing
* Your trip is ready

The Continue action navigates directly to the relevant section.

### 📤 Export Summary

The Command Center can export a local trip summary containing information such as:

* Route
* Dates
* Duration
* Travelers
* Transport
* Stay style
* Trip style
* Estimated budget
* Readiness
* Itinerary coverage
* Packing progress
* Custom activities

The summary is generated entirely in the browser.

---

# 🗺️ Trip Planner

The Trip Builder allows users to configure a complete trip.

Users can select:

* Origin
* Destination
* Start date
* End date
* Number of travelers
* Primary transport
* Stay style
* Trip style

### Available Transport Preferences

* ✈️ Flight
* 🚆 Train
* 🚌 Bus
* 🚕 Cab
* 🚗 Self Drive
* 🔄 Mixed

### Available Stay Styles

* Budget
* Comfort
* Premium

### Available Trip Styles

* Balanced
* Relaxed
* Adventure
* Culture
* Food

The planner dynamically calculates:

* Trip duration
* Transportation estimate
* Accommodation estimate
* Food estimate
* Local transportation estimate
* Activity estimate
* Overall estimated trip cost

The trip preview updates as the user changes planner values.

---

# 🚆 Transportation Hub

TripPilot includes a dedicated transport planning interface.

Supported transportation modes:

* ✈️ Flight
* 🚆 Train
* 🚌 Bus
* 🚕 Cab
* 🚇 Metro
* 🛺 Auto
* ⛴️ Ferry
* 🔄 Mixed

Each transport mode provides:

* Transport description
* Travel considerations
* Sample options
* Approximate duration
* Planning estimate

### Mixed Transport

The Mixed option is designed for routes that combine multiple travel methods.

Examples include:

* Train + road
* Flight + local transfer
* Intercity travel + metro
* Intercity travel + cab

> Transportation values are planning estimates and are not live booking or fare information.

---

# 📅 Itinerary Studio

TripPilot includes destination-based itinerary templates and custom activity planning.

Suggested itinerary information can include:

* Arrival plans
* Sightseeing circuits
* Food routes
* Scenic stops
* Adventure days
* Culture-focused days
* Departure plans

Users can add custom activities using:

* Day
* Activity name
* Time
* Estimated spend

Custom activities are stored locally and displayed alongside the destination suggestions.

The itinerary can be refreshed to clear custom activities and return to the destination template.

---

# 🏨 Stay Finder

The Stay Finder provides sample accommodation options for travel planning.

Users can:

* Search stays
* Search destinations
* Filter by stay style
* Apply a stay to the current trip

Available stay styles:

* Budget
* Comfort
* Premium

Stay cards can display:

* Stay name
* Destination
* Stay style
* Approximate price per night
* Rating
* Location/theme tag

> Stay information is sample planning data and is not connected to a live hotel booking service.

---

# 💰 Budget Studio

The Budget Studio provides a visual representation of estimated trip spending.

Current budget categories:

* Transportation
* Stay
* Food
* Local transportation
* Activities

Users can independently adjust:

* Transport reserve
* Stay reserve
* Food reserve

Interactive controls automatically update:

* Total budget
* Category values
* Budget bars
* Planner estimate
* Dashboard information

Budget adjustments are persisted locally using LocalStorage.

---

# 🎒 Packing Studio

TripPilot includes a travel packing checklist for common trip essentials.

Current checklist items include:

* ID and travel documents
* Wallet and cards
* Phone charger
* Clothes
* Comfortable footwear
* Toiletries
* Personal medicines
* Weather protection
* Camera/accessories

Users can:

* Mark items as packed
* Unmark items
* View completion percentage
* View packed-item count
* Reset the checklist

Packing state is saved locally in the browser.

---

# 🧳 My Trips

The My Trips section acts as a local trip library.

Saved trips can contain:

* Origin
* Destination
* Dates
* Duration
* Travelers
* Transport
* Stay style
* Trip style
* Estimated budget
* Creation time

Users can:

* Save trips
* View saved trips
* Open saved trips
* Load saved trips back into the planner
* Delete saved trips

The dashboard also provides:

* Saved trip count
* Upcoming trip count
* Planned traveler count
* Combined estimated spend

---

# ⚙️ Settings

TripPilot provides a workspace settings area for personal preferences.

Users can configure:

* Name
* Home city
* Preferred stay style
* Default transportation

Additional settings features include:

* Save preferences
* Switch between dark and light themes
* Export application data
* Clear local data

The settings are persisted locally.

---

# 🌙 Theme System

TripPilot includes a built-in appearance switcher.

Available themes:

* Dark
* Light

The selected theme is stored locally and restored when the application is reopened.

---

# 📤 Data Export

TripPilot supports two browser-based export capabilities.

### Trip Summary Export

Exports a readable `.txt` travel summary.

### Application Data Export

Exports the stored TripPilot state as a `.json` file.

This can include:

* Settings
* Current trip
* Budget
* Saved trips
* Activities
* Packing state

No server is required for either export.

---

# 💾 LocalStorage

TripPilot uses the browser's **LocalStorage API** for client-side persistence.

The current application storage key is:

```text
trippilot_v2
```

Stored information can include:

* Traveler preferences
* Theme preference
* Current trip
* Budget values
* Saved trips
* Custom activities
* Packing progress

This allows TripPilot to preserve its application state across browser refreshes without requiring:

* A backend
* A database
* User accounts
* Server-side sessions

### Important

LocalStorage is browser-specific.

Clearing browser/site data can remove locally stored TripPilot information.

---

# 📱 Responsive Design

TripPilot is designed to provide a responsive experience across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

Responsive behavior includes:

* Mobile navigation
* Responsive grids
* Adaptive forms
* Responsive dashboard layouts
* Mobile-friendly transport controls
* Flexible destination cards
* Responsive saved-trip layouts
* Mobile-friendly settings
* Adaptive footer layout

---

# 🎨 UI & UX

TripPilot uses a modern SaaS-inspired visual system with:

* Glass-style panels
* Rounded cards
* Teal accent system
* Dark/light themes
* Responsive layouts
* Animated interactions
* Scroll-reveal effects
* Dashboard metrics
* Product-style UI components
* Visual progress indicators
* Interactive navigation
* Status indicators
* Toast notifications

The interface is designed to feel like a **travel operating workspace**, rather than a simple static webpage.

---

# 🛠️ Technologies

TripPilot is built using standard frontend technologies:

* **HTML5**
* **CSS3**
* **JavaScript**
* **LocalStorage API**
* **Boxicons**
* **Google Fonts — Poppins**
* **Unsplash Images**

No frontend framework is required.

No backend framework is required.

No database is required.

---

# 📁 Project Structure

The production application uses three main source files:

```text
TripPilot-Travel-Planner/
│
├── index.html
├── style.css
├── script.js
│
└── README.md
```

---

## `index.html`

Contains the complete application structure, including:

* Application header
* SaaS-style navigation
* Home dashboard
* Trip Command Center
* Destination discovery
* Trip Builder
* Transport Hub
* Itinerary Studio
* Stay Finder
* Budget Studio
* Packing Studio
* My Trips
* Settings
* Footer
* Toast notifications

---

## `style.css`

Contains the application's visual system, including:

* Theme variables
* Dark mode
* Light mode
* Responsive layouts
* Navigation
* SaaS-style cards
* Dashboard components
* Buttons
* Forms
* Destination cards
* Transport UI
* Itinerary timeline
* Stay cards
* Budget visualization
* Packing interface
* Saved trips
* Footer
* Animations
* Scroll-reveal effects
* Mobile layouts

---

## `script.js`

Contains the main application logic, including:

* Application state
* LocalStorage
* Destination data
* Transport data
* Stay data
* Itinerary templates
* Packing data
* Trip calculations
* Planner state
* Budget calculations
* Saved trip management
* Packing interactions
* Settings
* Theme switching
* Search and filtering
* Navigation
* Scroll effects
* Command Center
* Trip readiness
* Trip countdown
* Export functions

---

# 🌐 GitHub Pages

TripPilot is fully compatible with **GitHub Pages**.

Because the application uses static files, it does not require a server runtime.

### Deploying TripPilot

### 1. Create a repository

Example:

```text
TripPilot-Travel-Planner
```

### 2. Upload the files

```text
index.html
style.css
script.js
README.md
```

### 3. Enable GitHub Pages

Open:

```text
Repository → Settings → Pages
```

Select the branch containing the project.

GitHub Pages will generate the public project URL.

---

# 🚫 No Live Booking APIs

TripPilot is currently a **travel planning application**, not a live booking platform.

It does not currently connect to:

* ✈️ Airline booking APIs
* 🚆 Railway booking APIs
* 🚌 Bus booking APIs
* 🏨 Hotel booking APIs
* 🚕 Cab booking APIs
* 💳 Payment gateways
* 🎟️ Live ticket inventory
* 💰 Live fare systems

Transportation and accommodation values shown in the application are **planning estimates**.

Users should independently verify:

* Current prices
* Travel schedules
* Availability
* Booking rules
* Cancellation policies
* Travel requirements

with the relevant provider before making actual travel arrangements.

---

# 🧮 Budget Disclaimer

TripPilot's budget calculator is intended for planning purposes.

Estimated costs are generated using predefined values influenced by factors such as:

* Destination
* Number of travelers
* Trip duration
* Transportation mode
* Stay style

Actual travel costs can differ significantly.

---

# 🔒 Data & Privacy

TripPilot is currently a **client-side application**.

The application does not require:

* User registration
* Backend accounts
* Database storage
* Payment information
* Booking credentials

Current trip-planning data is stored locally in the user's browser.

TripPilot does not currently provide a TripPilot-operated backend for storing travel plans.

Third-party resources such as Google Fonts, Boxicons, and Unsplash imagery are loaded from their respective external services.

---

# 🎯 Project Goals

TripPilot was created to demonstrate how a realistic frontend product can be built using standard web technologies.

The project demonstrates:

* Semantic HTML
* Responsive CSS
* Modern product UI design
* JavaScript application logic
* DOM manipulation
* Event handling
* LocalStorage persistence
* Client-side state management
* Dynamic rendering
* Form processing
* Interactive calculations
* Search and filtering
* Dashboard interfaces
* Responsive navigation
* Data export
* Theme management
* Component-style frontend organization

---

# 🚀 Future Improvements

Potential future versions may add:

* 🌦️ Live weather integration
* 🗺️ Interactive maps
* 📍 Nearby attractions
* ✈️ Live flight search
* 🚆 Railway information
* 🚌 Bus search
* 🏨 Live hotel availability
* 💱 Live currency conversion
* 🍽️ Restaurant discovery
* 🌐 Multi-language support
* ☁️ Cloud synchronization
* 🔐 Authentication
* 📤 PDF itinerary export
* 📆 Calendar integration
* 🔔 Trip reminders
* 📊 Advanced analytics
* 🧭 Route optimization
* 🤖 AI-powered itinerary generation
* 🗣️ Travel phrase assistance

These capabilities would require external APIs, backend services, authentication, or other integrations.

---

# 📌 Important Notes

TripPilot is currently a **browser-based travel planning workspace**.

It should not be treated as:

* A live booking engine
* A ticket marketplace
* A hotel reservation platform
* A payment platform
* A source of guaranteed live prices

Unless future live integrations are added, transportation, accommodation, and budget values should be considered **sample or estimated planning information**.

---

# 👨‍💻 Author

## K. Sai Mahendra

### GitHub

🔗 https://github.com/mahitech580

### LinkedIn

🔗 https://www.linkedin.com/in/mahendra-sai-kondaveeti-93438b279/

---

# 📜 License

This project is available for **learning, personal development, and portfolio demonstration**.

You may modify the project for your own learning and development.

Third-party libraries, imagery, fonts, icons, and external services remain subject to their respective licenses and terms.

---

# ⭐ Project Summary

**TripPilot — Travel Planner** is a professional, responsive, client-side travel planning workspace that brings together:

```text
🌎 Destination Discovery
🏠 SaaS-Style Home Dashboard
📊 Trip Command Center
🗺️ Trip Planning
🚆 Transport Planning
📅 Itinerary Studio
🏨 Stay Finder
💰 Budget Studio
🎒 Packing Studio
🧳 Saved Trips
⚙️ Workspace Settings
🌙 Dark / Light Theme
💾 LocalStorage Persistence
📤 Trip Summary Export
📦 JSON Data Export
📱 Responsive UI
```

Built with:

```text
HTML5
CSS3
JavaScript
LocalStorage
Boxicons
Google Fonts
Unsplash Images
```

🌍 **Plan smarter. Travel better.**

✈️ **TripPilot**
