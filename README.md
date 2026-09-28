# ✈️ TripPilot — Smart Travel Planner

> **Plan the journey. Organize every detail. Travel with confidence.**

TripPilot is a modern, interactive travel planning web application built with **HTML, CSS, and JavaScript**. It helps users organize trips, compare transportation options, build itineraries, estimate expenses, manage packing lists, and save multiple travel plans — all from one beautiful interface.

The project is completely **frontend-based**, requires **no backend**, and is designed to work directly on **GitHub Pages**.

---

## 🌍 Live Demo

**GitHub Pages:**
`https://YOUR-USERNAME.github.io/TripPilot/`

Replace `YOUR-USERNAME` with your GitHub username after deployment.

---

## ✨ Features

### 🏠 Home

* Interactive travel-focused hero section
* Animated rotating travel phrases
* Dynamic route visualization
* Trip distance and destination preview
* Floating travel information cards
* Smooth scroll animations

### 🔎 Discover

Explore popular destinations with visual destination cards.

Currently includes examples such as:

* 🏖️ Goa
* 🏔️ Manali
* 🏰 Jaipur
* 🌊 Alappuzha

Destination filtering allows users to browse different travel categories.

### 🗺️ Plan Trip

Create a complete trip plan by entering:

* Starting location
* Destination
* Start date
* End date
* Number of travelers
* Primary transport
* Stay preference
* Trip style

TripPilot automatically generates a trip preview and estimated budget.

### 🚆 Transport

Transportation planning supports:

* ✈️ Flights
* 🚆 Trains
* 🚌 Buses
* 🚕 Cabs
* 🚇 Metro
* 🛺 Auto
* ⛴️ Ferry

Each transport mode includes route-oriented planning information and estimated costs.

> Transport prices shown in the application are planning estimates, not live booking quotations.

### 📅 Itinerary Builder

Create a day-by-day travel itinerary.

The system provides destination-based sample itineraries and allows users to add custom activities.

Users can organize:

* Morning activities
* Afternoon activities
* Evening activities
* Custom activities
* Multiple travel days

### 🏨 Stays

Browse accommodation options using:

* Destination
* Stay type
* Price
* Rating
* Style

Examples include:

* Hotels
* Resorts
* Hostels
* Boutique stays
* Budget accommodation

Users can select a stay and add it to their travel plan.

### 💰 Budget Planner

TripPilot provides an estimated travel budget covering:

* 🚗 Transport
* 🏨 Accommodation
* 🍔 Food
* 🎯 Activities
* 💳 Additional spending

Interactive budget controls allow users to adjust their expected spending.

The application dynamically updates:

* Total estimated budget
* Category breakdown
* Spending bars
* Per-traveler estimates

### 🎒 Packing Checklist

Create and manage a travel packing checklist.

Features include:

* Item completion tracking
* Progress percentage
* Visual completion indicator
* Reset checklist functionality

### 🧳 My Trips

Saved trips are displayed in one place.

Users can:

* View saved trips
* Open a trip
* Delete trips
* Track upcoming trips
* See traveler count
* View estimated trip spending

### ⚙️ Settings

Customize TripPilot with:

* Traveler name
* Home city
* Preferred stay type
* Default transportation
* Local application preferences

All settings are stored locally.

---

## 🎨 UI & Design

TripPilot uses a modern travel-tech visual identity rather than a traditional travel website.

### Design elements

* Dark teal / blue interface
* Cyan and green highlights
* Coral and gold accents
* Glassmorphism cards
* Gradient backgrounds
* Animated route graphics
* Floating elements
* Smooth hover interactions
* Scroll reveal animations
* Responsive navigation
* Mobile-friendly layout

The interface is designed to feel closer to a modern travel product than a basic CRUD application.

---

## 🛠️ Technologies Used

| Technology   | Purpose                               |
| ------------ | ------------------------------------- |
| HTML5        | Application structure                 |
| CSS3         | Styling, responsive UI and animations |
| JavaScript   | Application logic and interactions    |
| LocalStorage | Persistent trip and settings data     |
| Boxicons     | UI icons                              |
| Google Fonts | Typography                            |
| Unsplash     | Destination imagery                   |

---

## 💾 Data Storage

TripPilot does not require a database.

Application data is stored inside the browser using:

```javascript
localStorage
```

The application stores information such as:

* Saved trips
* Traveler settings
* Packing progress
* User preferences

The primary storage key is:

```text
trippilot_v1
```

This makes the application simple to deploy and ideal for a static hosting environment such as GitHub Pages.

---

## 📁 Project Structure

```text
TripPilot/
│
├── index.html
├── style.css
└── script.js
```

Everything required for the application is contained within these three files.

---

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/TripPilot.git
```

Open the project folder:

```bash
cd TripPilot
```

Then open:

```text
index.html
```

You can also use the **Live Server** extension in VS Code for a smoother development experience.

---

## 🌐 Deploy on GitHub Pages

### 1. Create a repository

Create a GitHub repository named:

```text
TripPilot
```

### 2. Add the files

Upload:

```text
index.html
style.css
script.js
```

### 3. Enable GitHub Pages

Go to:

```text
Settings → Pages
```

Select:

```text
Deploy from a branch
```

Choose:

```text
main
```

and:

```text
/root
```

Save the settings.

Your project will then be available through your GitHub Pages URL.

---

## 📱 Responsive Design

TripPilot is designed to work across:

* 💻 Desktop
* 🖥️ Large screens
* 📱 Mobile devices
* 📟 Tablets

Navigation, cards, forms and planning sections automatically adapt to smaller screens.

---

## 🔐 Authentication

TripPilot intentionally does **not** use:

* Login
* Signup
* Passwords
* Authentication servers

The application opens directly into the travel planner.

---

## 🔌 APIs & Booking

TripPilot currently functions as a **travel planning application**, not a live booking platform.

It does not directly book:

* Flights
* Trains
* Buses
* Hotels
* Cabs

Prices and transport information are intended for planning and demonstration purposes.

---

## 🧠 Future Improvements

Possible future versions could include:

* 🗺️ Google Maps / Mapbox integration
* 🌦️ Live weather data
* ✈️ Live flight search
* 🚆 Railway API integration
* 🏨 Hotel API integration
* 💱 Currency conversion
* 📍 GPS-based trip planning
* 🤖 AI itinerary generation
* 🧠 AI travel recommendations
* 🗣️ Voice travel assistant
* 📤 PDF itinerary export
* 📱 PWA / installable mobile version
* ☁️ Cloud synchronization
* 👥 Shared trips
* 🔔 Travel reminders
* 🌎 International destinations

---

## 📸 Screens & Experience

TripPilot focuses on creating a complete product-style experience rather than simply displaying travel information.

Core experience:

```text
Discover
   ↓
Plan Trip
   ↓
Choose Transport
   ↓
Select Stay
   ↓
Build Itinerary
   ↓
Calculate Budget
   ↓
Prepare Packing List
   ↓
Save Trip
```

---

## 🎯 Project Goals

TripPilot was designed to demonstrate practical frontend development skills including:

* DOM manipulation
* JavaScript state management
* LocalStorage
* Dynamic rendering
* Form handling
* Filtering
* Interactive UI components
* Responsive design
* CSS animations
* Component-like UI organization
* Client-side data persistence

It also demonstrates how a static frontend application can provide a realistic product experience without requiring a backend.

---

## 👨‍💻 Author

**K. Sai Mahendra**

GitHub:
`https://github.com/mahitech580`

LinkedIn:
`https://www.linkedin.com/in/mahendra-sai-kondaveeti-93438b279/`

---

## 📄 License

This project is available under the **MIT License**.

You are free to use, modify and improve the project with appropriate attribution.

---

## ⭐ Support

If you found TripPilot useful or interesting, consider giving the repository a ⭐ on GitHub.
