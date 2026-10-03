# ✈️ TripPilot — Travel Planner

TripPilot is a modern, interactive **travel planning website** built with **HTML5, CSS3, and JavaScript**.

It provides a complete browser-based workspace for discovering destinations, planning trips, choosing transportation, building day-by-day itineraries, exploring stay options, managing travel budgets, preparing packing lists, and saving trips locally.

The application is designed as a **responsive, portfolio-ready frontend project** that works directly in the browser without a backend or database.

---

## 🌍 Live Demo

🔗 **https://mahitech580.github.io/TripPilot-Travel-Planner/**

---

## ✨ Features

### 🌎 Destination Discovery

TripPilot includes a destination discovery section for exploring sample Indian travel destinations.

Currently featured:

* 🇮🇳 Goa
* 🏔️ Manali
* 🏰 Jaipur
* 🌴 Alappuzha

Users can filter destinations by:

* All
* Beach
* Mountains
* Heritage
* Backwaters

Each destination includes imagery, a short description, trip-duration guidance, destination type, and a **Plan** action that automatically sends the destination into the trip planner.

---

### 🗺️ Trip Planner

The Trip Builder allows users to create a complete trip plan using:

* Origin
* Destination
* Start date
* End date
* Number of travelers
* Primary transportation
* Stay style
* Trip style

Available trip styles include:

* Balanced
* Relaxed
* Adventure
* Culture
* Food

Available stay styles include:

* Budget
* Comfort
* Premium

The planner automatically calculates:

* Trip duration
* Estimated transportation cost
* Estimated accommodation cost
* Estimated food cost
* Estimated local transportation cost
* Estimated activity cost
* Total estimated trip budget

The selected trip is stored locally and can be reopened later.

---

### 🚆 Transportation Planner

TripPilot provides a transportation hub with planning information for:

* ✈️ Flight
* 🚆 Train
* 🚌 Bus
* 🚕 Cab
* 🚇 Metro
* 🛺 Auto
* ⛴️ Ferry
* 🔄 Mixed

Each transport mode includes:

* Description
* Key travel considerations
* Sample route options
* Approximate travel time
* Planning price estimates

The transport section is designed for **travel planning and comparison**, not real-time ticket booking.

---

### 📅 Smart Itinerary

TripPilot includes destination-based itinerary templates for supported destinations.

The itinerary provides day-by-day suggestions such as:

* Arrival plans
* Sightseeing circuits
* Food routes
* Scenic stops
* Adventure or nature days
* Departure plans

Users can also add custom activities with:

* Day
* Activity name
* Time
* Estimated spend

Custom activities are saved locally and displayed together with the destination itinerary.

The itinerary can also be regenerated to clear the currently saved custom activities.

---

### 🏨 Stay Finder

The Stay Finder provides sample accommodation options that can be filtered and searched.

Users can search by:

* Destination
* Stay name
* Stay style

Available stay categories include:

* Budget
* Comfort
* Premium

Each stay option includes:

* Stay name
* Destination
* Stay style
* Estimated nightly price
* Rating
* Short description/tag

The **Use in plan** action can apply the selected destination and stay style to the active trip.

> Stay information is sample planning data and is not connected to a live hotel booking service.

---

### 💰 Trip Budget

The Trip Budget section provides an interactive estimate of travel spending.

Current budget categories include:

* Transportation
* Stay
* Food
* Local transportation
* Activities

Users can adjust:

* Transport reserve
* Stay reserve
* Food reserve

using interactive sliders.

The application automatically updates:

* Total estimated budget
* Category values
* Category percentage bars
* Planner budget estimate

Budget changes are saved automatically using LocalStorage.

---

### 🎒 Packing Studio

TripPilot includes a built-in packing checklist containing common travel essentials such as:

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
* View completion percentage
* View packed-item count
* Reset the checklist

Packing progress is persisted using LocalStorage.

---

### 🧳 My Trips

Saved trips are displayed in the **My Trips** section.

Each saved trip can show:

* Destination
* Origin
* Start date
* Number of travelers
* Transport
* Estimated budget
* Upcoming/Past status

Users can:

* Save trips
* Open saved trips
* Load a trip back into the planner
* Delete saved trips

The My Trips dashboard also displays:

* Total saved trips
* Upcoming trips
* Total planned travelers
* Combined estimated spend

---

# 📊 Trip Command Center

The latest version includes a centralized **Trip Command Center** for monitoring the current trip.

The Command Center brings the major planning information into one place.

### 🗓️ Trip Countdown

The dashboard calculates the current trip status based on the selected dates.

Possible states include:

* `X days to go`
* `Day X of Y`
* `Trip completed`
* `Dates not set`

---

### 📍 Route Summary

The Command Center shows the currently selected route:

```text
Origin → Destination
```

It also displays:

* Trip duration
* Traveler count
* Primary transport
* Current estimated budget

---

### ✅ Trip Readiness

Trip readiness is calculated from the existing TripPilot planning state.

The readiness system considers:

* Trip setup
* Itinerary coverage
* Budget configuration
* Packing completion

The result is presented as an overall percentage.

This percentage is a **planning indicator created by the application**, not a measurement of actual travel readiness.

---

### 📋 Itinerary Progress

The Command Center calculates itinerary coverage based on the number of planned trip days represented by the current itinerary and custom activities.

---

### 🎒 Packing Progress

Packing completion is automatically reflected in the Command Center.

For example:

```text
6 / 9 items packed
67%
```

---

### 💰 Budget Summary

The dashboard reads the existing budget values from the TripPilot LocalStorage state and displays the current planning reserve.

---

### 🧭 Next Action

The Command Center provides a context-based next-step suggestion, such as:

* Complete your trip setup
* Finish the itinerary
* Set your budget
* Finish packing
* Trip is ready

The **Continue Planning** action takes the user directly to the relevant section.

---

### 📤 Export Trip Summary

TripPilot can export the current trip information as a local `.txt` summary.

The exported summary can include:

* Route
* Dates
* Duration
* Travelers
* Transport
* Stay style
* Trip style
* Readiness
* Packing progress
* Itinerary coverage
* Budget
* Custom activities

No server is required for the export.

---

## ⚙️ Settings

The Settings section provides a simple traveler profile and application preferences.

Users can configure:

* Name
* Home city
* Preferred stay style
* Default transport

The application also provides:

* Save Preferences
* Clear Local Data
* Quick navigation links

---

# 💾 LocalStorage

TripPilot uses the browser's **LocalStorage API** for client-side persistence.

The application stores its main state under:

```text
trippilot_v1
```

Saved information can include:

* Traveler settings
* Current trip
* Budget values
* Saved trips
* Custom activities
* Packing progress

This means the application can preserve data across browser refreshes without requiring a database or backend.

### Important

LocalStorage is browser-specific.

Clearing the browser's site data or LocalStorage can remove saved TripPilot information.

---

# 📱 Responsive Design

TripPilot is designed to adapt to different screen sizes.

Supported layouts include:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

The interface includes responsive:

* Navigation
* Cards
* Forms
* Grids
* Transport controls
* Budget controls
* Command Center
* Saved-trip layouts

---

# 🛠️ Technologies

TripPilot is built using:

* **HTML5**
* **CSS3**
* **JavaScript**
* **LocalStorage API**
* **Boxicons**
* **Google Fonts — Poppins**
* **Unsplash Images**

No frontend framework is required.

No backend framework is required.

---

# 📁 Project Structure

The current production version uses three main application files:

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

Contains the application's structure and user interface, including:

* Navigation
* Home section
* Trip Command Center
* Destination discovery
* Trip planner
* Transport hub
* Itinerary
* Stay Finder
* Budget
* Packing Studio
* My Trips
* Settings
* Footer
* Toast notifications

---

## `style.css`

Contains the complete visual system, including:

* Global layout
* Theme variables
* Navigation
* Buttons
* Cards
* Forms
* Destination cards
* Transport interface
* Itinerary timeline
* Stay cards
* Budget interface
* Packing interface
* Command Center
* Responsive breakpoints
* Animations
* Scroll-reveal styling

---

## `script.js`

Contains the main application logic, including:

* Application state
* LocalStorage
* Destination data
* Transport data
* Stay data
* Packing data
* Itinerary templates
* Trip calculations
* Planner logic
* Budget calculations
* Packing interactions
* Saved trips
* Settings
* Navigation
* Responsive menu
* Scroll reveal
* Hero text animation
* Trip Command Center
* Trip readiness calculation
* Trip countdown
* Trip summary export

---

# 🌐 GitHub Pages

TripPilot is designed to run directly from **GitHub Pages**.

Because the application is made from static frontend files, no server runtime is required.

### Deploying your own copy

### 1. Create a repository

Example:

```text
TripPilot-Travel-Planner
```

### 2. Upload the project files

Upload:

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

Select the appropriate branch and deployment source.

GitHub Pages will then generate the public website URL.

---

# 🚫 No Live Booking APIs

TripPilot is a **travel planning and portfolio project**.

It does not currently connect to live:

* ✈️ Flight booking APIs
* 🚆 Railway booking APIs
* 🚌 Bus booking APIs
* 🏨 Hotel booking APIs
* 🚕 Cab booking APIs
* 💳 Payment gateways
* 🎟️ Live ticket inventory
* 💰 Live fare systems

Transportation and accommodation prices shown by the application are **sample planning estimates**.

Users should verify current:

* Prices
* Schedules
* Availability
* Booking conditions
* Travel restrictions

with the relevant provider before making real travel arrangements.

---

# 🧮 Trip Budget Disclaimer

The budget calculator is intended to help users build a rough travel plan.

The displayed estimates are generated from predefined values based on factors such as:

* Destination
* Number of travelers
* Trip duration
* Transport mode
* Stay style

Actual travel costs may differ substantially.

---

# 🎯 Project Goals

TripPilot was built to demonstrate practical frontend development through a realistic application rather than a static landing page.

The project demonstrates:

* Semantic HTML
* Responsive CSS
* Modern UI design
* JavaScript DOM manipulation
* Event handling
* LocalStorage persistence
* Dynamic rendering
* Form processing
* State management
* Interactive calculations
* Client-side data handling
* Reusable application functions
* Responsive navigation
* Dashboard-style interfaces

---

# 🚀 Future Improvements

Potential future versions could add optional integrations such as:

* 🌦️ Live weather
* 🗺️ Interactive maps
* 📍 Nearby attractions
* ✈️ Live flight search
* 🚆 Live railway information
* 🚌 Live bus search
* 🏨 Live hotel availability
* 💱 Currency conversion
* 🍽️ Restaurant discovery
* 🌐 Multi-language support
* ☁️ Cloud synchronization
* 🔐 User authentication
* 📤 PDF itinerary export
* 📆 Calendar integration
* 🔔 Travel reminders
* 📊 Advanced trip analytics
* 🧭 Route optimization
* 🤖 AI itinerary generation
* 🗣️ Travel phrase assistance

These additions would require external APIs, backend services, authentication, or other integrations.

---

# 🔒 Data & Privacy

TripPilot is currently a **client-side application**.

The application does not require:

* User accounts
* Backend servers
* Database storage
* Payment information
* Booking accounts

Trip information is stored in the user's browser.

The project does not currently transmit trip-planning data to a TripPilot backend.

Third-party resources such as Google Fonts, Boxicons, and Unsplash images are loaded from external services.

---

# 📌 Important Notes

TripPilot is a **planning tool**, not a live travel-booking service.

The application should be considered:

* A frontend portfolio project
* A travel-planning prototype
* A browser-based planning workspace
* A demonstration of JavaScript and LocalStorage development

All transportation, accommodation, and budget values should be treated as estimates unless a future version connects the application to verified live data sources.

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

Third-party assets and services used by the project remain subject to their respective licenses and terms.

---

# ⭐ Project Summary

**TripPilot — Travel Planner** is a responsive, client-side travel planning application that combines:

```text
🌎 Destination Discovery
🗺️ Trip Planning
🚆 Transportation Planning
📅 Smart Itineraries
🏨 Stay Finder
💰 Budget Planning
🎒 Packing Checklist
🧳 Saved Trips
📊 Trip Command Center
⚙️ Travel Preferences
💾 LocalStorage Persistence
📤 Trip Summary Export
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
