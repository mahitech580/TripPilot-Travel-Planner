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

Open-Meteo documents continuously updated forecast data and current conditions based on 15-minute weather model data. Location search is provided by its geocoding endpoint. citeturn954473search5turn954473search9turn954473search1

Leaflet provides the interactive map, while OSRM's route service provides route geometry, distance and duration from coordinates. citeturn652387search0turn652387search2

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

Destination cards use remote Unsplash imagery for a richer travel-site presentation. Unsplash publishes free-to-use photography under its Unsplash License. citeturn609828search0turn609828search4

Images are lazy loaded on destination cards.

## Maps and service policies

TripPilot uses OpenStreetMap tiles and displays attribution in the map control. OpenStreetMap states that its public tile servers are best-effort and subject to usage requirements. citeturn954473search4

The implementation deliberately does not use the public Nominatim client-side autocomplete endpoint. Nominatim's published policy forbids client-side autocomplete and asks applications to respect request limits and caching requirements. citeturn954473search0

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

TripPilot now includes a dedicated Travel Desk inspired by modern online travel marketplace patterns while keeping its own branding and planning workflow.

The Travel Desk groups multiple travel categories into one interface:
- Flights
- Hotels
- Trains
- Buses
- Cabs
- Activities
- Holiday packages
- Travel insurance
- Currency conversion

MakeMyTrip's current product surface similarly spans flights, hotels, villas/homestays, holiday packages, trains, buses, cabs, tours & attractions, visa, cruise, forex and travel insurance. Its flight flow also exposes one-way, round-trip and multi-city search choices, while its flight pages describe fare-calendar and filtering features.

References: https://partner.makemytrip.com/ · https://www.makemytrip.com/flights/ · https://www.makemytrip.com/activities/

TripPilot does **not** copy MakeMyTrip's branding, assets or proprietary interface. The reference is used only for high-level product patterns such as category navigation, search forms, provider hand-offs and travel-service breadth.

### Live hand-off model

For booking categories, TripPilot prepares a realistic search context and then opens the relevant provider's live page. This keeps the static GitHub Pages architecture while avoiding fake live inventory or embedded checkout.

### Live currency

Travel Desk currency conversion uses Frankfurter's public exchange-rate API. Frankfurter documents a no-API-key HTTPS API and daily exchange-rate data from official sources.

Reference: https://frankfurter.dev/

### Live air quality

Live Travel can also use Open-Meteo air-quality data for US AQI and particulate matter variables. Open-Meteo documents current air-quality conditions and five-day forecasts for these variables.

Reference: https://open-meteo.com/en/docs/air-quality-api
