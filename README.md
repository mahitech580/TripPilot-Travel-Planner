# ✈️ TripPilot — Travel Planner

TripPilot is a modern, interactive **travel planning website** built using **HTML, CSS, and JavaScript**.

It provides a complete browser-based workspace for discovering destinations, planning trips, organizing itineraries, comparing transportation options, finding stays, managing budgets, preparing packing lists, and saving trips locally.

The project is designed to be **simple, responsive, visually polished, and completely usable without a backend**.

---

## 🌍 Live Demo

🔗 **https://mahitech580.github.io/TripPilot-Travel-Planner/**

---

## ✨ Features

### 🌎 Destination Discovery

* Explore popular travel destinations
* Destination cards with images
* Destination information and highlights
* Quick access to trip planning
* Responsive destination browsing

### 🗺️ Trip Planner

Create and manage a complete trip using:

* Origin
* Destination
* Start date
* End date
* Number of travelers
* Trip preferences
* Transportation preferences

The planner automatically calculates trip duration and uses the saved trip information throughout the application.

### 🚆 Transportation Planner

TripPilot supports planning for multiple transportation types:

* ✈️ Flight
* 🚆 Train
* 🚌 Bus
* 🚕 Cab
* 🚇 Metro
* 🛺 Auto
* ⛴️ Ferry

Transportation information is intended for **planning purposes only** and does not represent live availability or booking data.

### 📅 Day-by-Day Itinerary

Build a personalized itinerary for your trip.

Users can organize activities by day and manage:

* Activity name
* Location
* Time
* Category
* Notes
* Activity status

This makes it easier to structure sightseeing, food stops, travel, and other activities throughout the trip.

### 🏨 Stay Finder

Plan accommodation requirements with the Stay Finder section.

Users can consider:

* Hotel / stay options
* Location
* Stay type
* Estimated price
* Number of nights
* Accommodation preferences

Stay information is for **planning and estimation**, not live hotel booking.

### 💰 Trip Budget Calculator

Track estimated trip expenses in one place.

Budget categories can include:

* Transportation
* Accommodation
* Food
* Activities
* Shopping
* Other expenses

The application calculates the estimated total and helps users understand the overall expected trip cost.

### 🎒 Packing Checklist

Create and manage a personalized packing list.

Users can:

* Add items
* Remove items
* Mark items as packed
* Track packing completion
* View packing progress

This helps make sure important items are ready before departure.

### 🧳 Saved Trips

Trips can be saved directly in the browser.

Users can:

* Save trips
* View saved trips
* Reopen trip details
* Manage multiple trips
* Remove saved trips

No account or server is required.

### 📊 Trip Command Center

The latest TripPilot update adds a centralized trip-readiness dashboard.

It can display:

* 🗓️ Trip countdown
* 📍 Route summary
* 👥 Traveler count
* 📅 Trip duration
* 💰 Planned budget
* 🎒 Packing progress
* 📋 Itinerary progress
* ✅ Overall trip-readiness percentage

The dashboard uses the existing TripPilot data rather than creating a separate planning system.

### ⚙️ Travel Preferences & Settings

Manage personal travel preferences and application settings from the settings area.

The application is designed so important planner information can remain available between browser sessions.

### 💾 LocalStorage

TripPilot uses the browser's **LocalStorage API** to save application data locally.

Saved information may include:

* Trip details
* Saved trips
* Budget information
* Itinerary activities
* Packing checklist
* User preferences
* Application settings

This allows the application to work without a traditional backend or database.

### 📱 Responsive Design

TripPilot is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The interface adapts to different screen sizes for a smoother travel-planning experience.

---

# 🆕 Latest Update — Trip Command Center

TripPilot has been upgraded with a **Trip Command Center** that provides a quick overview of the current trip.

### Trip Countdown

The application calculates the status of the trip based on the selected dates.

Possible states include:

* `X days to go`
* `Trip starts today`
* `Day X of Y`
* `Trip completed`

### Trip Readiness

Trip readiness provides a quick view of how prepared the trip is.

The progress can consider:

* Trip details
* Itinerary planning
* Budget setup
* Packing completion

### Budget Overview

The dashboard reads the existing trip budget and displays the planned spending information.

### Packing Overview

Packing progress is displayed using the existing checklist data.

### Itinerary Overview

The dashboard can show itinerary completion based on the activities already created in TripPilot.

### Quick Actions

The Command Center provides fast access to major areas such as:

* Planner
* Itinerary
* Budget
* Packing

This reduces the need to navigate through multiple screens when preparing a trip.

---

# 🛠️ Technologies

TripPilot is built with standard web technologies:

* **HTML5** — application structure
* **CSS3** — responsive styling and UI
* **JavaScript** — application logic and interactivity
* **LocalStorage API** — browser-based data persistence
* **Unsplash** — travel imagery

No backend framework is required.

---

# 📁 Project Structure

```text
TripPilot-Travel-Planner/
│
├── index.html
├── style.css
├── script.js
├── trip-dashboard-update.js
│
└── README.md
```

### Main Files

#### `index.html`

Contains the main TripPilot interface and application layout.

#### `style.css`

Contains:

* Layout styles
* Responsive design
* Cards
* Buttons
* Forms
* Navigation
* Dashboard styling
* Theme styling

#### `script.js`

Contains the main application logic, including:

* Trip planning
* Itinerary management
* Budget calculations
* Packing checklist
* Saved trips
* Settings
* LocalStorage handling
* UI interactions

#### `trip-dashboard-update.js`

Adds the latest Trip Command Center functionality, including:

* Trip countdown
* Trip readiness
* Budget summary
* Packing progress
* Itinerary progress
* Trip summary
* Quick navigation

---

# 💾 Data & Privacy

TripPilot is a **client-side application**.

The project does not require:

* User accounts
* Backend servers
* Databases
* Payment gateways
* Booking accounts

Trip information is stored locally in the user's browser using LocalStorage.

Because the data is browser-local, clearing browser/site storage can remove saved TripPilot information.

---

# 🌐 GitHub Pages

TripPilot is designed to work with **GitHub Pages**.

The project uses static files and does not require a server-side runtime.

To deploy your own copy:

### 1. Create a GitHub repository

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
trip-dashboard-update.js
README.md
```

### 3. Enable GitHub Pages

Open:

```text
Repository → Settings → Pages
```

Choose the branch containing your project files.

GitHub Pages will generate a public website URL.

---

# 🚫 No Live Booking APIs

TripPilot is a **travel planning application**, not a live booking platform.

It does **not** currently connect to:

* Airline booking APIs
* Railway booking APIs
* Bus booking APIs
* Hotel booking APIs
* Cab booking APIs
* Payment gateways
* Live ticket inventory
* Live fare systems

Transportation and accommodation prices shown by the application are **planning estimates**.

Users should verify actual prices, schedules, availability, and booking conditions directly with the relevant provider before making travel arrangements.

---

# 🎯 Project Goals

TripPilot was created to demonstrate how a modern travel-planning experience can be built using front-end web technologies.

The project focuses on:

* Practical JavaScript development
* DOM manipulation
* Responsive UI design
* LocalStorage data management
* Dynamic content rendering
* Form handling
* State management
* Travel planning workflows
* Interactive dashboards
* Front-end project architecture

---

# 🚀 Future Improvements

Potential future versions could add:

* 🌦️ Live weather integration
* 🗺️ Interactive maps
* 📍 Nearby attractions
* 🏨 Live hotel APIs
* ✈️ Flight search APIs
* 🚆 Railway information
* 💱 Live currency conversion
* 🌐 Multi-language support
* 🔐 Optional user authentication
* ☁️ Cloud synchronization
* 📤 Export itinerary to PDF
* 📆 Calendar integration
* 🔔 Trip reminders
* 📊 Advanced trip analytics
* 🧭 Route optimization
* 🤖 AI-powered itinerary generation
* 🍽️ Restaurant discovery
* 🗣️ Travel phrase assistance

These features would require external APIs, backend services, or additional integrations.

---

# 📌 Important Notes

TripPilot currently operates completely in the browser.

All planning information should be considered **estimated or user-entered data** unless explicitly connected to a future live API.

The project is intended for:

* Learning
* Portfolio demonstration
* Travel planning
* Front-end development practice
* GitHub project showcasing

---

# 👨‍💻 Author

## K. Sai Mahendra

GitHub:

🔗 https://github.com/mahitech580

LinkedIn:

🔗 https://www.linkedin.com/in/mahendra-sai-kondaveeti-93438b279/

---

# 📜 License

This project is available for learning and personal portfolio use.

You may modify the project for your own learning and development.

Third-party assets, libraries, imagery, and services remain subject to their respective licenses and terms.

---

# ⭐ Project Summary

**TripPilot — Travel Planner** is a complete client-side travel planning application that brings trip discovery, planning, transportation, itinerary creation, accommodation planning, budgeting, packing, saved trips, and trip-readiness tracking into one responsive web application.

Built with:

```text
HTML5
CSS3
JavaScript
LocalStorage
Unsplash Images
```

🌍 **Plan smarter. Travel better.**

✈️ **TripPilot**
