# ✈️ TripPilot — Travel Planning OS

TripPilot is a polished, responsive travel planning web product built with HTML, CSS and vanilla JavaScript.

It combines destination discovery, trip planning, route visualization, live weather context, transport planning, itineraries, stays, budgets, packing and a local trip library in one travel-focused experience.

**Live demo:** https://mahitech580.github.io/TripPilot-Travel-Planner/

---

## Product experience

TripPilot is designed around:

~~~text
Discover → Plan → Check live conditions → Map the route → Stay → Budget → Pack → Save
~~~

The current visual direction uses deep smoke/charcoal surfaces with red and travel-green accents, editorial destination photography, layered cards and responsive product controls.

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

The finished interface now uses a larger set of travel photographs across destination discovery, inspiration cards, stays and the home experience. Remote images are lazy-loaded and have a graceful visual fallback so a failed image request does not break the card layout.

The final interaction pass adds smoother press states, tactile ripple feedback, richer live-weather context and a more editorial travel presentation.

## ✅ Final theme and reliability pass

The final release standardizes the visual system around smoke/charcoal, deep red and travel green with neutral black/white text for readability.

Dark and light themes now use their own explicit text, border, input, button, card, navigation and footer contrast rules.

The Travel Desk recent-search flow also persists and restores its input values, and the global Clear Data action clears the additional Travel Desk, inspiration and live-session stores introduced by the later product features.
