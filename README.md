# ✈️ TripPilot — Travel Planning OS

TripPilot is a polished, responsive travel planning web product built with HTML, CSS and vanilla JavaScript.

It combines destination discovery, trip planning, route visualization, live weather context, transport planning, itineraries, stays, budgets, packing and a local trip library in one travel-focused experience.

**Live demo:** https://mahitech580.github.io/TripPilot-Travel-Planner/

---

## Product experience

TripPilot is organized as a focused eight-section product experience:

```text
Home → Explore → Plan → Travel → Itinerary → Budget & Pack → Trips → Settings
```

The home experience acts as the visual entry point and dashboard. Related tools are grouped into focused product areas instead of scattering the workspace across many standalone pages.

The visual direction combines cinematic travel photography, smoke/charcoal surfaces, readable black/white theme text, controlled rainbow accents, deep red and green actions, image motion, hover depth and soft transitions.

## Live Travel Intelligence

The Live Travel section adds real external travel context:

- Current destination weather
- Apparent temperature
- Humidity
- Wind
- Precipitation
- Destination local time
- Five-day outlook
- Rain probability
- City/location lookup
- Interactive map
- Origin and destination markers
- Road-route geometry
- Approximate road distance
- Approximate road routing duration

Open-Meteo documents continuously updated forecast data and current conditions based on 15-minute weather model data. Location search is provided by its geocoding endpoint.

Leaflet provides the interactive map, while OSRM's route service provides route geometry, distance and duration from coordinates.

## Live data vs booking data

Live:

- Weather
- Local time
- Geocoding
- Road-route geometry
- Road distance and route duration

Not live:

- Flight seat inventory
- Railway seat inventory
- Bus seat inventory
- Hotel room inventory
- Live hotel pricing
- Payment processing

Transport and accommodation amounts elsewhere in the app remain planning estimates unless a licensed live provider API is added.

## Visual system

The production redesign intentionally moves away from a teal-heavy generic dashboard.

Primary palette:

~~~text
Smoke black / charcoal
Deep red
Travel green
Soft white
Muted gray
~~~

The colors are used across the hero, section titles, cards, CTA buttons, active states, live indicators, progress UI and map markers.

## Features

### 🌍 Discover
- Search and filter destinations
- Remote travel imagery
- Destination context
- One-click planning

### 🗺️ Planner
- Origin and destination
- Dates
- Travelers
- Transport
- Stay style
- Trip style
- Indicative budget estimate

### 📊 Command Center
- Trip route
- Countdown
- Budget
- Transport
- Readiness
- Itinerary progress
- Packing progress
- Next action
- Summary export

### 🚆 Transport Hub
Flight, Train, Bus, Cab, Metro, Auto, Ferry, Mixed and Self Drive.

### 📅 Itinerary Studio
Destination templates plus custom activities with day, activity, time and spend.

### 🏨 Stay Finder
Sample accommodation cards searchable by destination and stay style.

### 💰 Budget Studio
Visual categories for transportation, stay, food, local transport and activities with adjustable reserves.

### 🎒 Packing Studio
Checklist completion and reset support.

### 🧳 My Trips
Local saved trip library with load/delete actions and statistics.

### ⚙️ Settings
Workspace preferences, theme switching, JSON export and local reset.

## Remote imagery

Destination cards use remote Unsplash imagery for a richer travel-site presentation. Unsplash publishes free-to-use photography under its Unsplash License.

Images are lazy loaded on destination cards.

## Maps and service policies

TripPilot uses OpenStreetMap tiles and displays attribution in the map control. OpenStreetMap states that its public tile servers are best-effort and subject to usage requirements.

The implementation deliberately does not use the public Nominatim client-side autocomplete endpoint. Nominatim's published policy forbids client-side autocomplete and asks applications to respect request limits and caching requirements.

Live responses are cached in sessionStorage for ten minutes to reduce repeated calls.

## Local-first architecture

Core application state is stored in browser LocalStorage under:

~~~text
trippilot_v2
~~~

Live API responses use a separate sessionStorage cache.

## Responsive design

TripPilot is tuned for desktop, laptop, tablet and mobile layouts, including the live weather panel and interactive map.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- SessionStorage
- Leaflet 1.9.4
- Open-Meteo
- OSRM
- OpenStreetMap tiles
- Boxicons
- Google Fonts — Poppins
- Unsplash imagery

## Project structure

~~~text
TripPilot-Travel-Planner/
├── index.html
├── style.css
├── script.js
└── README.md
~~~

## GitHub Pages

Recommended setup:

~~~text
Repository → Settings → Pages → Deploy from branch → main
~~~

## Data and privacy

The main planning state remains inside the browser. Live features make external requests for the searched destination and geographic coordinates.

Do not enter confidential or personal information into the live destination search field.

## Travel-data disclaimer

Live weather and route information can change. Road routing is a map-routing reference, not live traffic intelligence.

Before making actual travel arrangements, verify current schedules, fares, availability, weather warnings and provider policies with the relevant official provider.

## Future product directions

- Licensed live flight and rail APIs
- Hotel availability and pricing
- Currency conversion
- Attractions and nearby places
- Weather alerts
- Calendar integration
- Cloud accounts
- Authentication
- PDF itinerary generation
- AI itinerary generation
- Notifications and reminders

## Author

### K. Sai Mahendra

GitHub: https://github.com/mahitech580

LinkedIn: https://www.linkedin.com/in/mahendra-sai-kondaveeti-93438b279/

## License

This project is intended for learning, personal development and portfolio demonstration. Third-party libraries, imagery, map data and external services remain subject to their respective licenses and terms.

## ⭐ Project summary

~~~text
🌍 Destination Discovery
✈️ Trip Planner
🔴🟢 Live Travel Intelligence
🌦️ Current Weather
🕒 Destination Local Time
🗺️ Interactive Route Map
🚆 Transport Hub
📅 Itinerary Studio
🏨 Stay Finder
💰 Budget Studio
🎒 Packing Studio
🧳 My Trips
⚙️ Settings
🌙 Dark / Light Theme
💾 Local Persistence
📤 Trip Summary Export
📦 JSON Data Export
📱 Responsive UI
~~~

**Plan smarter. Travel better. ✈️**

## 🧳 Travel Desk

TripPilot includes a dedicated Travel Desk for planning across:
- Flights
- Hotels
- Trains
- Buses
- Cabs
- Activities
- Holiday packages
- Travel insurance
- Currency conversion

The experience uses familiar online travel-planning patterns: service tabs, structured search forms, recent searches, realistic provider hand-offs and a clear separation between planning data and actual booking inventory.

### Live hand-off model

For booking categories, TripPilot prepares the search context and opens a current external provider surface. TripPilot does not simulate live seat or room inventory and does not collect payment details.

### Live currency

Travel Desk currency conversion uses Frankfurter's public exchange-rate API.

Reference: https://frankfurter.dev/

### Live air quality

Live Travel can also use Open-Meteo air-quality data for US AQI and particulate matter variables.

Reference: https://open-meteo.com/en/docs/air-quality-api

## 🖼️ Travel Inspiration

A visual inspiration layer has been added to make destination discovery feel closer to a modern travel product:

- Large destination hero cards
- Smaller visual destination cards
- One-click planning from inspiration
- Local saved-idea state
- Saved-idea counter
- Image hover motion and cinematic overlays

Destination imagery is loaded remotely and lazily.

## 🔁 Search persistence

Travel Desk searches can now retain their form values locally. Selecting a recent search can restore its search fields so the user can continue planning without rebuilding the form.

## 🖼️ Final visual layer

The visual system uses destination photography, hospitality photography and a cinematic home image to create a more realistic travel-product presentation. Images are responsive, lazy-loaded and animated on hover, with theme-aware contrast layers for both dark and light modes.

Featured city imagery covers Hyderabad, Mumbai and Bengaluru, while Stay Finder uses a broader mix of resort and hotel-room photography. The visual cards retain their planning actions instead of acting as static decoration.

### Visual asset sources

The featured Hyderabad, Mumbai and Bengaluru photographs and the selected hospitality photographs were checked against their corresponding Unsplash photo pages. The selected source pages describe the images as free to use under the Unsplash License. citeturn437790view0turn202947view0turn202947view1turn263471view1turn263471view2turn979196view0turn979196view1turn979196view2turn979196view3

## ✅ Final theme and reliability pass

The production visual system uses readable black/white theme text with smoke/charcoal surfaces and controlled rainbow editorial accents for travel-inspired motion. Rainbow color is used as a decorative and interactive layer rather than replacing primary text contrast.

Dark mode stays white-on-smoke. Light mode stays black-on-white. Hover states add animated rainbow edges, image lift/zoom, subtle glow and smooth motion while core actions retain clear red/green semantics.

The home hero keeps the travel photography visible while a theme-aware contrast layer protects headline and paragraph readability.

Remote destination photography is requested at high resolution, the inspiration gallery contains additional travel scenes, and image fallbacks prevent a failed remote image from breaking the layout.

The Travel Desk, live travel context, planner, itinerary, stays, budget, packing, saved trips, settings, theme switching and local reset remain part of the same GitHub Pages-friendly HTML/CSS/JavaScript application.


## 🖼️ 2026 Visual Refresh — Destination Studio & Stay Finder

Destination Studio now includes a dedicated featured-city presentation for **Hyderabad, Mumbai and Bengaluru**, with large destination photographs, city context and one-click planning actions. The normal destination grid remains available underneath for all supported places and filters.

Stay Finder now begins with a hospitality-focused visual rail showing coastal resort, city-view, calm interior and premium-room moods before the searchable stay cards.

The final hero has also been corrected for light mode: the travel photograph remains clearly visible instead of being washed out by a near-white overlay. Dark mode keeps a deeper cinematic layer, while light mode uses a lighter contrast veil and dark typography.

Remote photography is requested at high resolution and loaded lazily. A client-side image fallback prevents failed remote requests from breaking the visual layout.

