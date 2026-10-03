/* =========================================================
   TripPilot — JavaScript
   ========================================================= */


/* =========================================================
   01. STATE
   ========================================================= */

const STORAGE_KEY = "trippilot_v1";

const state = {

  settings:{
    name:"Mahi",
    home:"Hyderabad",
    stay:"Comfort",
    transport:"Flight"
  },

  trip:{
    from:"Hyderabad",
    destination:"Goa",
    start:"",
    end:"",
    travelers:2,
    transport:"Flight",
    stay:"Comfort",
    style:"Balanced"
  },

  budget:{
    transport:6000,
    stay:5600,
    food:3200,
    local:1600,
    activities:2100
  },

  trips:[],

  activities:[],

  packing:{}

};

let activeTransportMode = "Flight";
let toastTimer;


/* =========================================================
   02. DESTINATION DATA
   ========================================================= */

const destinationData = {

  Goa:{
    kind:"Beach",
    subtitle:"Beach + local food + sunset route",
    distance:660
  },

  Manali:{
    kind:"Mountain",
    subtitle:"Mountain roads + cafés + viewpoints",
    distance:1900
  },

  Jaipur:{
    kind:"Heritage",
    subtitle:"Fort + market + food circuit",
    distance:1580
  },

  Alappuzha:{
    kind:"Backwaters",
    subtitle:"Houseboat + backwaters + slow travel",
    distance:1250
  },

  Mumbai:{
    kind:"City",
    subtitle:"Coastal city + food + culture",
    distance:710
  },

  Bengaluru:{
    kind:"City",
    subtitle:"Cafés + tech districts + day escapes",
    distance:570
  },

  Delhi:{
    kind:"Heritage",
    subtitle:"Old Delhi + museums + monuments",
    distance:1570
  },

  Kochi:{
    kind:"Backwaters",
    subtitle:"Fort Kochi + cafés + coastal culture",
    distance:1090
  }

};


/* =========================================================
   03. TRANSPORT DATA
   ========================================================= */

const transportData = {

  Flight:{
    icon:"bx-paper-plane",
    kicker:"INTERCITY AIR",
    title:"Flights for longer routes",
    text:"Best for longer city-to-city movement when time matters more than road comfort.",
    facts:[
      "Fastest intercity option",
      "Airport transfer needed",
      "Price varies by date"
    ],
    options:[
      {
        name:"Early morning economy",
        sub:"Simple one-way planning option",
        time:"1h 25m + airport",
        price:4800
      },
      {
        name:"Flexible economy",
        sub:"Midday / evening style",
        time:"1h 35m + airport",
        price:6100
      },
      {
        name:"Premium economy",
        sub:"Extra comfort buffer",
        time:"1h 30m + airport",
        price:8200
      }
    ]
  },

  Train:{
    icon:"bx-train",
    kicker:"RAIL ROUTE",
    title:"Train for slower, richer journeys",
    text:"A practical option for overnight movement and long-distance routes with more room to settle in.",
    facts:[
      "Sleeper & AC classes",
      "Good overnight choice",
      "Station-to-city transfer"
    ],
    options:[
      {
        name:"Sleeper",
        sub:"Overnight budget route",
        time:"10–14h",
        price:850
      },
      {
        name:"3A",
        sub:"Air-conditioned overnight",
        time:"10–14h",
        price:1650
      },
      {
        name:"2A",
        sub:"More space and privacy",
        time:"10–14h",
        price:2350
      }
    ]
  },

  Bus:{
    icon:"bx-bus",
    kicker:"ROAD COACH",
    title:"Bus for flexible road access",
    text:"Useful for hill stations, regional routes and places where rail connections do not line up cleanly.",
    facts:[
      "Day & overnight services",
      "Often reaches smaller towns",
      "Good route flexibility"
    ],
    options:[
      {
        name:"AC Seater",
        sub:"Day route",
        time:"8–12h",
        price:650
      },
      {
        name:"AC Sleeper",
        sub:"Overnight route",
        time:"8–12h",
        price:1100
      },
      {
        name:"Premium Sleeper",
        sub:"More comfort",
        time:"8–12h",
        price:1750
      }
    ]
  },

  Cab:{
    icon:"bx-car",
    kicker:"PRIVATE ROAD",
    title:"Cab for door-to-door movement",
    text:"Useful for station or airport transfers, city circuits, family travel and flexible road days.",
    facts:[
      "Door-to-door",
      "Flexible stop planning",
      "Best for local circuits"
    ],
    options:[
      {
        name:"Sedan",
        sub:"4 seats",
        time:"On-demand",
        price:1600
      },
      {
        name:"SUV",
        sub:"6 seats",
        time:"On-demand",
        price:2400
      },
      {
        name:"Outstation cab",
        sub:"Full-day route",
        time:"8–10h",
        price:3200
      }
    ]
  },

  Metro:{
    icon:"bx-subway",
    kicker:"CITY TRANSIT",
    title:"Metro for city movement",
    text:"A practical first-mile and last-mile layer inside metro cities and around major transit zones.",
    facts:[
      "Fast in-city hops",
      "Avoids road traffic",
      "Works with station transfers"
    ],
    options:[
      {
        name:"Single city hop",
        sub:"One urban connection",
        time:"20–45m",
        price:50
      },
      {
        name:"Multi-hop pass",
        sub:"Several city segments",
        time:"1 day",
        price:180
      },
      {
        name:"Metro + cab",
        sub:"Hybrid last-mile",
        time:"45–90m",
        price:260
      }
    ]
  },

  Auto:{
    icon:"bx-car",
    kicker:"LAST MILE",
    title:"Auto for short city hops",
    text:"Useful around railway stations, bus stands, markets and neighborhoods where short trips matter.",
    facts:[
      "Short-distance",
      "Easy local access",
      "Best for quick hops"
    ],
    options:[
      {
        name:"Short hop",
        sub:"Neighborhood transfer",
        time:"10–20m",
        price:120
      },
      {
        name:"Station transfer",
        sub:"Station → stay",
        time:"15–30m",
        price:180
      },
      {
        name:"Local circuit",
        sub:"Several nearby stops",
        time:"1–2h",
        price:450
      }
    ]
  },

  Ferry:{
    icon:"bx-water",
    kicker:"WATER ROUTE",
    title:"Ferry and boat for coastal legs",
    text:"A useful travel layer for waterfront cities, islands and backwater experiences.",
    facts:[
      "Scenic movement",
      "Route availability varies",
      "Good experience layer"
    ],
    options:[
      {
        name:"Local ferry",
        sub:"Short crossing",
        time:"20–40m",
        price:80
      },
      {
        name:"Scenic boat",
        sub:"Leisure route",
        time:"1–2h",
        price:450
      },
      {
        name:"Private boat",
        sub:"Small-group experience",
        time:"2–4h",
        price:2400
      }
    ]
  },

  Mixed:{
    icon:"bx-transfer-alt",
    kicker:"MULTI-MODAL",
    title:"Mixed transport for flexible routes",
    text:"Combine flight, train, bus, cab or metro legs when one transport mode does not cover the whole journey cleanly.",
    facts:[
      "Best for multi-leg routes",
      "Transfer time matters",
      "Useful for city + local movement"
    ],
    options:[
      {
        name:"Main + local transfer",
        sub:"Intercity + cab / metro",
        time:"Varies by route",
        price:1800
      },
      {
        name:"Rail + road combo",
        sub:"Train + cab / bus",
        time:"Varies by route",
        price:2400
      },
      {
        name:"Air + local combo",
        sub:"Flight + city transfer",
        time:"Varies by route",
        price:6200
      }
    ]
  }

};


/* =========================================================
   04. STAY DATA
   ========================================================= */

const stayData = [

  {
    id:"stay-1",
    name:"Palm Route Studio",
    city:"Goa",
    style:"Comfort",
    price:3200,
    rating:4.7,
    tag:"Near beach",
    image:"https://images.unsplash.com/photo-1749753484185-30347b75988d?auto=format&fit=crop&q=82&w=900"
  },

  {
    id:"stay-2",
    name:"Coastline Budget Rooms",
    city:"Goa",
    style:"Budget",
    price:1600,
    rating:4.4,
    tag:"For short stays",
    image:"https://images.unsplash.com/photo-1749753484185-30347b75988d?auto=format&fit=crop&q=78&w=900"
  },

  {
    id:"stay-3",
    name:"Mountain View Lodge",
    city:"Manali",
    style:"Comfort",
    price:2900,
    rating:4.6,
    tag:"Valley view",
    image:"https://images.unsplash.com/photo-1752563269976-52342808d1ba?auto=format&fit=crop&q=82&w=900"
  },

  {
    id:"stay-4",
    name:"Pink City Courtyard",
    city:"Jaipur",
    style:"Premium",
    price:4800,
    rating:4.8,
    tag:"Heritage feel",
    image:"https://images.unsplash.com/photo-1729448148484-da3ca27685b3?auto=format&fit=crop&q=82&w=900"
  },

  {
    id:"stay-5",
    name:"Backwater House Stay",
    city:"Alappuzha",
    style:"Comfort",
    price:3600,
    rating:4.8,
    tag:"Waterfront",
    image:"https://images.unsplash.com/photo-1686890365648-f6dcfe922942?auto=format&fit=crop&q=82&w=900"
  },

  {
    id:"stay-6",
    name:"Airport Link Hotel",
    city:"Hyderabad",
    style:"Budget",
    price:2200,
    rating:4.3,
    tag:"Transit-friendly",
    image:"https://images.unsplash.com/photo-1632162935151-92afb3bf941b?auto=format&fit=crop&q=80&w=900"
  }

];


/* =========================================================
   05. PACKING
   ========================================================= */

const packingBase = [

  {
    id:"documents",
    name:"ID & travel documents",
    note:"ID, ticket references, booking confirmations"
  },

  {
    id:"wallet",
    name:"Wallet & cards",
    note:"Cash, cards and emergency payment method"
  },

  {
    id:"charger",
    name:"Phone charger",
    note:"Cable + adapter + power bank"
  },

  {
    id:"clothes",
    name:"Clothes",
    note:"Build around number of days and weather"
  },

  {
    id:"shoes",
    name:"Comfortable footwear",
    note:"One primary pair + optional second pair"
  },

  {
    id:"toiletries",
    name:"Toiletries",
    note:"Travel-size essentials"
  },

  {
    id:"meds",
    name:"Personal medicines",
    note:"Regular medication and compact first-aid"
  },

  {
    id:"weather",
    name:"Weather layer",
    note:"Umbrella / light jacket / sun protection"
  },

  {
    id:"camera",
    name:"Camera / accessories",
    note:"Optional for photography-focused trips"
  }

];


/* =========================================================
   06. ITINERARY TEMPLATES
   ========================================================= */

const itineraryTemplates = {

  Goa:[
    {
      day:1,
      title:"Arrival + beach reset",
      desc:"Check in, settle down, explore the nearest beach and catch sunset.",
      time:"Afternoon → Evening",
      cost:900
    },
    {
      day:2,
      title:"North Goa circuit",
      desc:"Cafés, local markets and two coastal stops without rushing the route.",
      time:"09:00 → 20:00",
      cost:1800
    },
    {
      day:3,
      title:"Slow morning + South Goa",
      desc:"Keep the morning flexible, then move toward quieter coastal stretches.",
      time:"10:00 → 20:00",
      cost:2100
    },
    {
      day:4,
      title:"Breakfast + departure",
      desc:"Breakfast, checkout and return journey with a local-food stop.",
      time:"08:00 → Departure",
      cost:1000
    }
  ],

  Manali:[
    {
      day:1,
      title:"Arrival + Old Manali",
      desc:"Check in, café stop and relaxed evening around Old Manali.",
      time:"Afternoon → Evening",
      cost:850
    },
    {
      day:2,
      title:"Mountain viewpoint day",
      desc:"Use a cab route to combine scenic stops without overpacking the day.",
      time:"08:00 → 18:00",
      cost:2200
    },
    {
      day:3,
      title:"Adventure / nature day",
      desc:"Reserve time for an outdoor experience or longer valley drive.",
      time:"08:00 → 18:00",
      cost:2500
    },
    {
      day:4,
      title:"Slow morning + local food",
      desc:"Breakfast, market walk and flexible café time.",
      time:"09:00 → 16:00",
      cost:1100
    }
  ],

  Jaipur:[
    {
      day:1,
      title:"Pink City arrival",
      desc:"Check in, old-city walk and evening food route.",
      time:"14:00 → 21:00",
      cost:900
    },
    {
      day:2,
      title:"Fort + palace circuit",
      desc:"Build the core heritage loop with enough time for photography.",
      time:"08:00 → 18:00",
      cost:1600
    },
    {
      day:3,
      title:"Markets + culture",
      desc:"Markets, local crafts, cafés and a slower city walk.",
      time:"10:00 → 20:00",
      cost:1300
    },
    {
      day:4,
      title:"Breakfast + departure",
      desc:"Final shopping, breakfast and return route.",
      time:"08:00 → Departure",
      cost:700
    }
  ],

  Alappuzha:[
    {
      day:1,
      title:"Arrive + backwater evening",
      desc:"Check in and take a relaxed waterfront walk before sunset.",
      time:"15:00 → 20:00",
      cost:900
    },
    {
      day:2,
      title:"Houseboat day",
      desc:"Spend the main day on the water with meals and scenic movement.",
      time:"08:00 → 18:00",
      cost:2800
    },
    {
      day:3,
      title:"Village route + local food",
      desc:"Short road circuit, cafés and relaxed time around the water.",
      time:"09:00 → 18:00",
      cost:1400
    },
    {
      day:4,
      title:"Breakfast + onward journey",
      desc:"Breakfast, checkout and a flexible transfer onward.",
      time:"08:00 → Departure",
      cost:700
    }
  ]

};


/* =========================================================
   07. HELPERS
   ========================================================= */

function $(id){
  return document.getElementById(id);
}

function uid(prefix="id"){
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}

function todayISO(){

  const now = new Date();

  const local = new Date(
    now.getTime() -
    now.getTimezoneOffset() * 60000
  );

  return local.toISOString().slice(0,10);
}

function addDays(date,count){

  const result = new Date(date);

  result.setDate(
    result.getDate() + count
  );

  return result;
}

function toISODate(date){

  const local = new Date(
    date.getTime() -
    date.getTimezoneOffset() * 60000
  );

  return local.toISOString().slice(0,10);
}


/* IMPORTANT:
   Inclusive day count.
   Example:
   10 Oct → 13 Oct = 4 days.
*/

function dateDiffInDays(start,end){

  const a = new Date(start);
  const b = new Date(end);

  if(
    Number.isNaN(a.getTime()) ||
    Number.isNaN(b.getTime())
  ){
    return 1;
  }

  return Math.max(
    Math.floor(
      (b.getTime() - a.getTime()) /
      86400000
    ) + 1,
    1
  );
}

function formatDate(value){

  const date = new Date(value);

  if(Number.isNaN(date.getTime())){
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day:"2-digit",
      month:"short",
      year:"numeric"
    }
  ).format(date);
}

function rupee(value){

  return (
    "₹" +
    Number(value || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits:0
      }
    )
  );
}

function escapeHTML(value){

  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}


/* =========================================================
   08. LOCAL STORAGE
   ========================================================= */

function saveState(){

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}

function loadState(){

  const saved =
    localStorage.getItem(STORAGE_KEY);

  if(!saved){
    setDefaultDates();
    return;
  }

  try{

    const parsed = JSON.parse(saved);

    state.settings = {
      ...state.settings,
      ...(parsed.settings || {})
    };

    state.trip = {
      ...state.trip,
      ...(parsed.trip || {})
    };

    state.budget = {
      ...state.budget,
      ...(parsed.budget || {})
    };

    state.trips =
      Array.isArray(parsed.trips)
        ? parsed.trips
        : [];

    state.activities =
      Array.isArray(parsed.activities)
        ? parsed.activities
        : [];

    state.packing =
      parsed.packing || {};

  }catch(error){

    console.warn(
      "TripPilot storage reset:",
      error
    );

    setDefaultDates();
  }
}

function setDefaultDates(){

  const start =
    addDays(new Date(),14);

  const end =
    addDays(start,3);

  state.trip.start =
    toISODate(start);

  state.trip.end =
    toISODate(end);
}

function ensureDateRange(){

  if(
    !state.trip.start ||
    !state.trip.end
  ){
    setDefaultDates();
  }

  if(
    new Date(state.trip.end) <
    new Date(state.trip.start)
  ){

    state.trip.end =
      toISODate(
        addDays(
          new Date(state.trip.start),
          3
        )
      );
  }
}


/* =========================================================
   09. HOME
   ========================================================= */

function renderHome(){

  const destination =
    state.trip.destination;

  const data =
    destinationData[destination] ||
    destinationData.Goa;

  $("homeDestination").textContent =
    destination.toUpperCase();

  $("homeDistance").textContent =
    `${data.distance.toLocaleString("en-IN")} km planned`;

  $("homeSavedTrips").textContent =
    state.trips.length;

  const upcoming =
    getUpcomingTrips();

  if(upcoming.length){

    $("homeNextTrip").textContent =
      upcoming[0].destination;

    $("homeTripBudget").textContent =
      rupee(upcoming[0].estimatedBudget);

  }else{

    $("homeNextTrip").textContent =
      `${destination} Escape`;

    $("homeTripBudget").textContent =
      rupee(calculateTripBudget());
  }
}


/* =========================================================
   10. DESTINATION FILTERS
   ========================================================= */

function initDestinationFilters(){

  document
    .querySelectorAll("[data-destination-filter]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              "[data-destination-filter]"
            )
            .forEach(
              item =>
                item.classList.remove("active")
            );

          button.classList.add("active");

          const filter =
            button.dataset.destinationFilter;

          document
            .querySelectorAll(
              "[data-destination-card]"
            )
            .forEach(card => {

              card.classList.toggle(
                "hide",
                filter !== "all" &&
                filter !== card.dataset.type
              );

            });

        }
      );

    });


  document
    .querySelectorAll(
      "[data-plan-destination]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          state.trip.destination =
            button.dataset.planDestination;

          syncPlannerForm();

          saveState();

          renderAll();

          navigateTo("planner");

          showToast(
            `${state.trip.destination} selected.`
          );

        }
      );

    });

}


/* =========================================================
   11. PLANNER
   ========================================================= */

function syncPlannerForm(){

  ensureDateRange();

  $("tripFrom").value =
    state.trip.from ||
    state.settings.home ||
    "Hyderabad";

  $("tripDestination").value =
    state.trip.destination;

  $("tripStart").value =
    state.trip.start;

  $("tripEnd").value =
    state.trip.end;

  $("tripTravelers").value =
    state.trip.travelers;

  $("tripTransport").value =
    state.trip.transport;

  $("tripStay").value =
    state.trip.stay;

  $("tripStyle").value =
    state.trip.style;
}

function readPlannerForm(){

  state.trip.from =
    $("tripFrom").value.trim() ||
    "Hyderabad";

  state.trip.destination =
    $("tripDestination").value;

  state.trip.start =
    $("tripStart").value;

  state.trip.end =
    $("tripEnd").value;

  state.trip.travelers =
    Math.max(
      Number($("tripTravelers").value) || 1,
      1
    );

  state.trip.transport =
    $("tripTransport").value;

  state.trip.stay =
    $("tripStay").value;

  state.trip.style =
    $("tripStyle").value;

  ensureDateRange();
}

function calculateTripBudget(){

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  const travelers =
    Math.max(
      Number(state.trip.travelers) || 1,
      1
    );

  const transportMultiplier = {

    Flight:1.25,
    Train:.82,
    Bus:.70,
    Cab:1.12,
    "Self Drive":1,
    Mixed:1.05

  }[state.trip.transport] || 1;

  const stayMultiplier = {

    Budget:.72,
    Comfort:1,
    Premium:1.55

  }[state.trip.stay] || 1;

  const destinationBase = {

    Goa:3200,
    Manali:3500,
    Jaipur:2900,
    Alappuzha:3000,
    Mumbai:3500,
    Bengaluru:2600,
    Delhi:3200,
    Kochi:3000

  }[state.trip.destination] || 3000;

  const transport =
    Math.round(
      destinationBase *
      transportMultiplier *
      travelers
    );

  const stay =
    Math.round(
      days *
      1400 *
      stayMultiplier
    );

  const food =
    Math.round(
      days *
      850 *
      travelers
    );

  const local =
    Math.round(
      days *
      420 *
      travelers
    );

  const activities =
    Math.round(
      days *
      480 *
      travelers
    );

  return (
    transport +
    stay +
    food +
    local +
    activities
  );
}

function renderPlanner(){

  ensureDateRange();

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  $("previewTitle").textContent =
    `${state.trip.from} → ${state.trip.destination}`;

  $("previewDates").textContent =
    `${formatDate(state.trip.start)} → ${formatDate(state.trip.end)}`;

  $("previewFrom").textContent =
    state.trip.from;

  $("previewDestination").textContent =
    state.trip.destination;

  $("previewTransport").textContent =
    state.trip.transport;

  $("previewDays").textContent =
    days;

  $("previewTravelers").textContent =
    state.trip.travelers;

  $("previewBudget").textContent =
    rupee(calculateTripBudget());
}


/* =========================================================
   12. TRANSPORT
   ========================================================= */

function setTransportMode(mode){

  activeTransportMode = mode;

  document
    .querySelectorAll(".transport-tab")
    .forEach(tab =>
      tab.classList.toggle(
        "active",
        tab.dataset.mode === mode
      )
    );

  renderTransport();
}

function renderTransport(){

  const data =
    transportData[activeTransportMode];

  if(!data){
    return;
  }

  $("transportHeroIcon").className =
    `bx ${data.icon}`;

  $("transportHeroKicker").textContent =
    data.kicker;

  $("transportHeroTitle").textContent =
    data.title;

  $("transportHeroText").textContent =
    data.text;

  $("transportHeroFacts").innerHTML =
    data.facts
      .map(
        fact =>
          `<span>${escapeHTML(fact)}</span>`
      )
      .join("");

  $("transportOptions").innerHTML =
    data.options
      .map(
        option => `

          <div class="transport-option">

            <div class="transport-option-title">

              ${escapeHTML(option.name)}

              <small>
                ${escapeHTML(option.sub)}
              </small>

            </div>

            <div class="transport-time">
              ${escapeHTML(option.time)}
            </div>

            <div class="transport-price">

              ${rupee(option.price)}

              <small>
                planning estimate
              </small>

            </div>

          </div>

        `
      )
      .join("");
}

function initTransportTabs(){

  document
    .querySelectorAll(".transport-tab")
    .forEach(tab =>
      tab.addEventListener(
        "click",
        () => {

          state.trip.transport =
            tab.dataset.mode;

          activeTransportMode =
            tab.dataset.mode;

          saveState();

          setTransportMode(
            tab.dataset.mode
          );

          renderAll();

        }
      )
    );
}


/* =========================================================
   13. ITINERARY
   ========================================================= */

function itineraryForCurrentDestination(){

  return (
    itineraryTemplates[state.trip.destination] ||
    itineraryTemplates.Goa
  );
}

function renderItinerary(){

  const template =
    itineraryForCurrentDestination();

  const tripDays =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  const visibleTemplate =
    template.filter(
      item =>
        Number(item.day) <= tripDays
    );

  $("itineraryTitle").textContent =
    `${state.trip.destination} · ${visibleTemplate.length} day plan`;

  $("itinerarySubtitle").textContent =
    destinationData[state.trip.destination]?.subtitle ||
    "Flexible route";

  $("itineraryTimeline").innerHTML =
    visibleTemplate
      .map(item => {

        const custom =
          state.activities.filter(
            activity =>
              Number(activity.day) ===
              Number(item.day)
          );

        return `

          <div class="day-row">

            <div class="day-row-top">

              <h4>
                Day ${item.day}
                ·
                ${escapeHTML(item.title)}
              </h4>

              <span class="day-badge">
                ${escapeHTML(item.time)}
              </span>

            </div>

            <p>
              ${escapeHTML(item.desc)}
            </p>

            <div class="day-details">

              <span>
                Suggested spend
                ${rupee(item.cost)}
              </span>

              ${custom
                .map(
                  activity =>
                    `

                    <span class="user-activity">

                      ${escapeHTML(activity.time)}

                      ·

                      ${escapeHTML(activity.name)}

                      ·

                      ${rupee(activity.cost)}

                    </span>

                    `
                )
                .join("")}

            </div>

          </div>

        `;
      })
      .join("");

  if(!visibleTemplate.length){

    $("itineraryTimeline").innerHTML = `
      <div class="command-empty">
        No itinerary template is available for the selected dates.
        Add your own activities below.
      </div>
    `;
  }
}

function addActivity(event){

  event.preventDefault();

  const activity = {

    id:uid("activity"),

    day:
      Number($("activityDay").value),

    name:
      $("activityName").value.trim(),

    time:
      $("activityTime").value,

    cost:
      Number($("activityCost").value) || 0

  };

  if(!activity.name){
    return;
  }

  state.activities.push(activity);

  saveState();

  event.target.reset();

  $("activityDay").value = "1";
  $("activityTime").value = "18:00";
  $("activityCost").value = 500;

  renderItinerary();
  renderCommandCenter();

  showToast("Activity added.");
}

function regenerateItinerary(){

  state.activities = [];

  saveState();

  renderItinerary();
  renderCommandCenter();

  showToast(
    `${state.trip.destination} itinerary refreshed.`
  );
}


/* =========================================================
   14. STAYS
   ========================================================= */

function renderStays(){

  const search =
    $("staySearch")
      .value
      .trim()
      .toLowerCase();

  const style =
    $("stayStyleFilter").value;

  const filtered =
    stayData.filter(stay => {

      const matchesSearch =
        !search ||
        `${stay.name} ${stay.city} ${stay.style}`
          .toLowerCase()
          .includes(search);

      const matchesStyle =
        style === "all" ||
        stay.style === style;

      return (
        matchesSearch &&
        matchesStyle
      );
    });

  $("stayGrid").innerHTML =
    filtered.length

      ? filtered
          .map(
            stay => `

              <article class="panel stay-card">

                <div
                  class="stay-image"
                  style="
                    background-image:
                      url('${stay.image}');
                  "
                ></div>

                <div class="stay-content">

                  <span class="stay-tag">
                    ${escapeHTML(stay.style)}
                  </span>

                  <h3>
                    ${escapeHTML(stay.name)}
                  </h3>

                  <div class="stay-sub">
                    ${escapeHTML(stay.city)}
                    ·
                    ${escapeHTML(stay.tag)}
                  </div>

                  <div class="stay-meta">

                    <span class="stay-price">
                      ${rupee(stay.price)}
                      <small>/ night</small>
                    </span>

                    <span class="stay-rating">
                      ★ ${stay.rating}
                    </span>

                  </div>

                  <div class="stay-actions">

                    <button
                      class="btn small"
                      type="button"
                      data-stay-city="${escapeHTML(stay.city)}"
                      data-stay-style="${escapeHTML(stay.style)}"
                    >
                      Use in plan
                    </button>

                    <span class="stay-tag">
                      Estimate
                    </span>

                  </div>

                </div>

              </article>

            `
          )
          .join("")

      : `

          <div
            class="panel"
            style="
              grid-column:1/-1;
              text-align:center;
            "
          >
            No stays match the current filter.
          </div>

        `;

  document
    .querySelectorAll("[data-stay-city]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          chooseStay(
            button.dataset.stayCity,
            button.dataset.stayStyle
          );

        }
      );

    });
}

function chooseStay(city,style){

  const validDestination =
    Object.prototype.hasOwnProperty.call(
      destinationData,
      city
    )
      ? city
      : state.trip.destination;

  state.trip.destination =
    validDestination;

  state.trip.stay =
    style;

  syncPlannerForm();

  saveState();

  renderAll();

  navigateTo("planner");

  showToast(
    `${city} stay selected.`
  );
}


/* =========================================================
   15. BUDGET
   ========================================================= */

function renderBudget(){

  const total =
    Object.values(state.budget)
      .reduce(
        (sum,value) =>
          sum + Number(value),
        0
      );

  $("budgetTotal").textContent =
    rupee(total);

  $("budgetDestination").textContent =
    `${state.trip.from} → ${state.trip.destination}`;

  $("budgetDays").textContent =
    `${dateDiffInDays(
      state.trip.start,
      state.trip.end
    )} days`;

  const fields = [

    ["Transport",state.budget.transport],
    ["Stay",state.budget.stay],
    ["Food",state.budget.food],
    ["Local",state.budget.local],
    ["Activities",state.budget.activities]

  ];

  fields.forEach(([name,value]) => {

    const output =
      $(`budget${name}`);

    const bar =
      $(`budget${name}Bar`);

    if(output){
      output.textContent =
        rupee(value);
    }

    if(bar){

      bar.style.width =
        `${
          total
            ? value / total * 100
            : 0
        }%`;

    }

  });

  syncBudgetInputs();
}

function syncBudgetInputs(){

  const values = [

    [
      "transportBudgetInput",
      "transportBudgetOutput",
      "transport"
    ],

    [
      "stayBudgetInput",
      "stayBudgetOutput",
      "stay"
    ],

    [
      "foodBudgetInput",
      "foodBudgetOutput",
      "food"
    ]

  ];

  values.forEach(
    ([inputId,outputId,key]) => {

      $(inputId).value =
        state.budget[key];

      $(outputId).textContent =
        rupee(state.budget[key]);

    }
  );
}

function bindBudgetSlider(
  key,
  inputId,
  outputId
){

  $(inputId)
    .addEventListener(
      "input",
      event => {

        state.budget[key] =
          Number(event.target.value);

        $(outputId).textContent =
          rupee(state.budget[key]);

        saveState();

        renderBudget();
        renderCommandCenter();

      }
    );
}


/* =========================================================
   16. PACKING
   ========================================================= */

function renderPacking(){

  const items =
    packingBase.map(item => ({
      ...item,
      done:!!state.packing[item.id]
    }));

  const completed =
    items.filter(item => item.done).length;

  const percent =
    Math.round(
      completed / items.length * 100
    );

  $("packingTitle").textContent =
    `${state.trip.destination} · ${
      dateDiffInDays(
        state.trip.start,
        state.trip.end
      )
    } day packing list`;

  $("packingPercent").textContent =
    `${percent}%`;

  $("packingMeter").style.width =
    `${percent}%`;

  $("packingSummaryText").textContent =
    percent === 100
      ? "Everything on your checklist is packed."
      : `${completed} of ${items.length} items packed.`;

  $("packingList").innerHTML =
    items
      .map(
        item => `

          <div
            class="
              pack-item
              ${item.done ? "done" : ""}
            "
            data-pack-id="${escapeHTML(item.id)}"
          >

            <div class="pack-check">
              <i class="bx bx-check"></i>
            </div>

            <div class="pack-copy">

              <b>
                ${escapeHTML(item.name)}
              </b>

              <small>
                ${escapeHTML(item.note)}
              </small>

            </div>

          </div>

        `
      )
      .join("");

  document
    .querySelectorAll("[data-pack-id]")
    .forEach(item => {

      item.addEventListener(
        "click",
        () => {

          togglePacking(
            item.dataset.packId
          );

        }
      );

    });
}

function togglePacking(id){

  state.packing[id] =
    !state.packing[id];

  saveState();

  renderPacking();
  renderCommandCenter();
}

function resetPacking(){

  state.packing = {};

  saveState();

  renderPacking();
  renderCommandCenter();

  showToast(
    "Packing list reset."
  );
}


/* =========================================================
   17. TRIPS
   ========================================================= */

function getUpcomingTrips(){

  const today =
    new Date(todayISO());

  return state.trips
    .filter(
      trip =>
        new Date(trip.start) >= today
    )
    .sort(
      (a,b) =>
        new Date(a.start) -
        new Date(b.start)
    );
}

function saveCurrentTrip(){

  ensureDateRange();

  const trip = {

    id:uid("trip"),

    from:state.trip.from,

    destination:
      state.trip.destination,

    start:state.trip.start,

    end:state.trip.end,

    travelers:
      state.trip.travelers,

    transport:
      state.trip.transport,

    stay:
      state.trip.stay,

    style:
      state.trip.style,

    estimatedBudget:
      calculateTripBudget(),

    createdAt:
      new Date().toISOString()

  };

  state.trips.push(trip);

  saveState();

  renderAll();

  showToast(
    `${trip.destination} trip saved.`
  );
}

function openSavedTrip(id){

  const trip =
    state.trips.find(
      item => item.id === id
    );

  if(!trip){
    return;
  }

  state.trip = {

    ...state.trip,

    from:trip.from,
    destination:trip.destination,
    start:trip.start,
    end:trip.end,
    travelers:trip.travelers,
    transport:trip.transport,
    stay:trip.stay,
    style:trip.style

  };

  syncPlannerForm();

  saveState();

  renderAll();

  navigateTo("planner");

  showToast(
    `${trip.destination} trip loaded.`
  );
}

function deleteTrip(id){

  const trip =
    state.trips.find(
      item => item.id === id
    );

  if(!trip){
    return;
  }

  if(
    !confirm(
      `Delete ${trip.destination} trip?`
    )
  ){
    return;
  }

  state.trips =
    state.trips.filter(
      item => item.id !== id
    );

  saveState();

  renderAll();

  showToast(
    "Saved trip deleted."
  );
}

function renderTrips(){

  const upcoming =
    getUpcomingTrips();

  const totalTravelers =
    state.trips.reduce(
      (sum,trip) =>
        sum + Number(trip.travelers || 0),
      0
    );

  const spend =
    state.trips.reduce(
      (sum,trip) =>
        sum + Number(trip.estimatedBudget || 0),
      0
    );

  $("savedTripCount").textContent =
    state.trips.length;

  $("upcomingTripCount").textContent =
    upcoming.length;

  $("plannedTravelerCount").textContent =
    totalTravelers;

  $("plannedSpend").textContent =
    rupee(spend);

  if(!state.trips.length){

    $("savedTripsGrid").innerHTML = `

      <div
        class="panel"
        style="
          grid-column:1/-1;
          text-align:center;
        "
      >

        <h3>
          No saved trips yet.
        </h3>

        <p style="margin-top:8px">
          Build a trip and save it here.
        </p>

        <div
          class="btn-box"
          style="
            justify-content:center;
            margin-top:17px;
          "
        >

          <a
            href="#planner"
            class="btn"
          >
            Start Planning
          </a>

        </div>

      </div>

    `;

    return;
  }

  $("savedTripsGrid").innerHTML =

    [...state.trips]
      .sort(
        (a,b) =>
          new Date(a.start) -
          new Date(b.start)
      )
      .map(
        trip => `

          <article class="panel saved-trip">

            <div class="saved-trip-top">

              <div>

                <span class="trip-status">

                  ${
                    new Date(trip.start) >=
                    new Date(todayISO())
                      ? "Upcoming"
                      : "Past"
                  }

                </span>

                <h3>
                  ${escapeHTML(trip.destination)}
                </h3>

                <div class="saved-route">

                  ${escapeHTML(trip.from)}
                  →
                  ${escapeHTML(trip.destination)}

                </div>

              </div>

            </div>


            <div class="saved-trip-info">

              <div>

                <small>
                  Date
                </small>

                <b>
                  ${formatDate(trip.start)}
                </b>

              </div>


              <div>

                <small>
                  Travelers
                </small>

                <b>
                  ${trip.travelers}
                </b>

              </div>


              <div>

                <small>
                  Transport
                </small>

                <b>
                  ${escapeHTML(trip.transport)}
                </b>

              </div>


              <div>

                <small>
                  Budget
                </small>

                <b>
                  ${rupee(trip.estimatedBudget)}
                </b>

              </div>

            </div>


            <div class="saved-trip-actions">

              <button
                class="btn small"
                type="button"
                data-open-trip="${escapeHTML(trip.id)}"
              >
                Open Trip
              </button>

              <button
                class="btn danger small"
                type="button"
                data-delete-trip="${escapeHTML(trip.id)}"
              >
                Delete
              </button>

            </div>

          </article>

        `
      )
      .join("");

  document
    .querySelectorAll("[data-open-trip]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () =>
          openSavedTrip(
            button.dataset.openTrip
          )
      );

    });

  document
    .querySelectorAll("[data-delete-trip]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () =>
          deleteTrip(
            button.dataset.deleteTrip
          )
      );

    });
}


/* =========================================================
   18. SETTINGS
   ========================================================= */

function syncSettingsForm(){

  $("settingsName").value =
    state.settings.name;

  $("settingsHome").value =
    state.settings.home;

  $("settingsStay").value =
    state.settings.stay;

  $("settingsTransport").value =
    state.settings.transport;
}

function saveSettings(){

  state.settings = {

    name:
      $("settingsName").value.trim() ||
      "Mahi",

    home:
      $("settingsHome").value.trim() ||
      "Hyderabad",

    stay:
      $("settingsStay").value,

    transport:
      $("settingsTransport").value

  };

  state.trip.from =
    state.settings.home;

  state.trip.stay =
    state.settings.stay;

  state.trip.transport =
    state.settings.transport;

  saveState();

  syncPlannerForm();

  renderAll();

  showToast(
    "Travel preferences saved."
  );
}

function clearData(){

  if(
    !confirm(
      "Clear all TripPilot local data?"
    )
  ){
    return;
  }

  localStorage.removeItem(
    STORAGE_KEY
  );

  location.reload();
}


/* =========================================================
   19. COMMAND CENTER
   ========================================================= */

function getPackingPercent(){

  const total =
    packingBase.length;

  if(!total){
    return 0;
  }

  const completed =
    packingBase.filter(
      item => !!state.packing[item.id]
    ).length;

  return Math.round(
    completed / total * 100
  );
}


function getItineraryProgress(){

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  if(days <= 0){
    return 0;
  }

  const plannedDays =
    new Set();

  const template =
    itineraryForCurrentDestination();

  template.forEach(
    item => {

      if(
        Number(item.day) <= days
      ){
        plannedDays.add(
          Number(item.day)
        );
      }

    }
  );

  state.activities.forEach(
    activity => {

      if(
        Number(activity.day) >= 1 &&
        Number(activity.day) <= days
      ){
        plannedDays.add(
          Number(activity.day)
        );
      }

    }
  );

  return Math.min(
    100,
    Math.round(
      plannedDays.size /
      days *
      100
    )
  );
}


function getBudgetTotal(){

  return Object.values(
    state.budget
  ).reduce(
    (sum,value) =>
      sum + Number(value || 0),
    0
  );
}


function isTripSetupComplete(){

  return !!(
    state.trip.from &&
    state.trip.destination &&
    state.trip.start &&
    state.trip.end &&
    Number(state.trip.travelers) > 0
  );
}


function isBudgetConfigured(){

  return getBudgetTotal() > 0;
}


function getTripStatus(){

  const today =
    new Date(todayISO());

  const start =
    new Date(state.trip.start);

  const end =
    new Date(state.trip.end);

  if(
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ){

    return {

      label:"Dates not set",

      detail:
        "Choose valid trip dates in Plan Trip.",

      icon:"bx-calendar"

    };

  }


  if(today < start){

    const daysToGo =
      Math.max(
        Math.ceil(
          (start.getTime() -
          today.getTime()) /
          86400000
        ),
        0
      );

    return {

      label:
        `${daysToGo} day${
          daysToGo === 1 ? "" : "s"
        } to go`,

      detail:
        `${formatDate(state.trip.start)} is your departure date.`,

      icon:"bx-time-five"

    };

  }


  if(
    today >= start &&
    today <= end
  ){

    const dayNumber =
      Math.floor(
        (today.getTime() -
        start.getTime()) /
        86400000
      ) + 1;

    const totalDays =
      dateDiffInDays(
        state.trip.start,
        state.trip.end
      );

    return {

      label:
        `Day ${Math.min(dayNumber,totalDays)} of ${totalDays}`,

      detail:
        "Your trip is currently active.",

      icon:"bx-map-pin"

    };

  }


  return {

    label:"Trip completed",

    detail:
      `This trip ended on ${formatDate(state.trip.end)}.`,

    icon:"bx-check-circle"

  };
}


function calculateReadiness(){

  const planner =
    isTripSetupComplete()
      ? 25
      : 0;

  const itineraryProgress =
    getItineraryProgress();

  let itinerary = 0;

  if(itineraryProgress >= 75){
    itinerary = 25;
  }else if(itineraryProgress >= 50){
    itinerary = 18;
  }else if(itineraryProgress > 0){
    itinerary = 10;
  }

  const budget =
    isBudgetConfigured()
      ? 20
      : 0;

  const packing =
    Math.round(
      getPackingPercent() * .30
    );

  return {

    total:
      Math.min(
        planner +
        itinerary +
        budget +
        packing,
        100
      ),

    planner,
    itinerary,
    budget,
    packing

  };
}


function getNextCommandAction(){

  const readiness =
    calculateReadiness();

  const itinerary =
    getItineraryProgress();

  const packing =
    getPackingPercent();


  if(!isTripSetupComplete()){

    return {

      title:
        "Complete your trip setup",

      detail:
        "Add your route, dates and travelers in the Trip Builder.",

      target:"planner",

      icon:"bx-map"

    };

  }


  if(itinerary < 75){

    return {

      title:
        "Finish the itinerary",

      detail:
        "Review the day plan and add activities for your route.",

      target:"itinerary",

      icon:"bx-list-check"

    };

  }


  if(!isBudgetConfigured()){

    return {

      title:
        "Set your budget",

      detail:
        "Adjust the travel, stay and food reserves.",

      target:"budget",

      icon:"bx-wallet"

    };

  }


  if(packing < 100){

    return {

      title:
        "Finish packing",

      detail:
        `${packing}% of your checklist is complete.`,

      target:"packing",

      icon:"bx-suitcase"

    };

  }


  return {

    title:
      "Trip is ready",

    detail:
      "Your planner, itinerary, budget and packing list are ready.",

    target:"trips",

    icon:"bx-check-shield"

  };
}


function renderCommandCenter(){

  const section =
    $("command-center");

  if(!section){
    return;
  }

  const status =
    getTripStatus();

  const readiness =
    calculateReadiness();

  const next =
    getNextCommandAction();

  const itinerary =
    getItineraryProgress();

  const packing =
    getPackingPercent();

  const budget =
    getBudgetTotal();

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );


  $("ccHeroTitle").innerHTML =
    `
      Your
      <span>
        ${escapeHTML(
          state.trip.destination ||
          "next trip"
        )}
      </span>
      command center
    `;


  $("ccStatus").innerHTML =
    `
      <i class="bx ${escapeHTML(status.icon)}"></i>
      ${escapeHTML(status.label)}
    `;

  $("ccStatusNote").textContent =
    status.detail;


  $("ccRoute").textContent =
    `${state.trip.from || "Start"} → ${
      state.trip.destination || "Destination"
    }`;


  $("ccDays").textContent =
    days;


  $("ccTravelers").textContent =
    state.trip.travelers || 0;


  $("ccTransport").textContent =
    state.trip.transport || "Not set";


  $("ccReadinessText").textContent =
    `${readiness.total}%`;

  $("ccReadinessRing")
    .style.setProperty(
      "--readiness",
      `${readiness.total}%`
    );


  updateCommandCheck(
    "ccPlannerCheck",
    isTripSetupComplete(),
    isTripSetupComplete()
      ? "Ready"
      : "Missing"
  );


  updateCommandCheck(
    "ccItineraryCheck",
    itinerary >= 75,
    `${itinerary}%`
  );


  updateCommandCheck(
    "ccBudgetCheck",
    isBudgetConfigured(),
    isBudgetConfigured()
      ? rupee(budget)
      : "Not set"
  );


  updateCommandCheck(
    "ccPackingCheck",
    packing >= 100,
    `${packing}%`
  );


  $("ccSnapshotRoute").textContent =
    `${state.trip.from || "Start"} → ${
      state.trip.destination || "Destination"
    }`;

  $("ccSnapshotBudget").textContent =
    rupee(budget);

  $("ccSnapshotTransport").textContent =
    state.trip.transport || "Transport";

  $("ccSnapshotDays").textContent =
    `${days} day${days === 1 ? "" : "s"}`;


  $("ccItineraryValue").textContent =
    `${itinerary}%`;

  $("ccItineraryBar").style.width =
    `${itinerary}%`;


  $("ccPackingValue").textContent =
    `${packing}%`;

  $("ccPackingBar").style.width =
    `${packing}%`;


  $("ccBudgetValue").textContent =
    isBudgetConfigured()
      ? rupee(budget)
      : "Not set";

  $("ccBudgetBar").style.width =
    isBudgetConfigured()
      ? "100%"
      : "0%";


  $("ccNextIcon").className =
    `bx ${next.icon}`;

  $("ccNextTitle").textContent =
    next.title;

  $("ccNextDetail").textContent =
    next.detail;


  $("ccNextButton").dataset.target =
    next.target;
}


function updateCommandCheck(
  id,
  done,
  value
){

  const element =
    $(id);

  if(!element){
    return;
  }

  element.classList.toggle(
    "done",
    done
  );

  const valueElement =
    element.querySelector(
      ".command-check-value"
    );

  if(valueElement){
    valueElement.textContent =
      value;
  }
}


function exportTripSummary(){

  const readiness =
    calculateReadiness();

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  const budget =
    getBudgetTotal();

  const activities =
    state.activities.length

      ? state.activities
          .slice()
          .sort(
            (a,b) =>
              Number(a.day) -
              Number(b.day)
          )
          .map(
            item =>
              `Day ${item.day} — ${
                item.time
              } — ${
                item.name
              } (${rupee(item.cost)})`
          )
          .join("\n")

      : "No custom activities added.";


  const content = [

    "TRIPPILOT — TRIP SUMMARY",
    "========================================",

    `Route: ${state.trip.from} → ${state.trip.destination}`,

    `Dates: ${
      formatDate(state.trip.start)
    } → ${
      formatDate(state.trip.end)
    }`,

    `Duration: ${days} day(s)`,

    `Travelers: ${state.trip.travelers}`,

    `Transport: ${state.trip.transport}`,

    `Stay style: ${state.trip.stay}`,

    `Trip style: ${state.trip.style}`,

    "",

    `Readiness: ${readiness.total}%`,

    `Packing: ${getPackingPercent()}%`,

    `Itinerary coverage: ${getItineraryProgress()}%`,

    `Budget reserve: ${rupee(budget)}`,

    "",

    "CUSTOM ACTIVITIES",

    "----------------------------------------",

    activities,

    "",

    "Note: TripPilot values are planning estimates, not live booking data."

  ].join("\n");


  const blob =
    new Blob(
      [content],
      {
        type:"text/plain;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;

  anchor.download =
    `TripPilot-${
      (state.trip.destination || "Trip")
        .replace(/\s+/g,"-")
    }-Summary.txt`;

  document.body.appendChild(
    anchor
  );

  anchor.click();

  anchor.remove();

  URL.revokeObjectURL(url);

  showToast(
    "Trip summary exported."
  );
}


/* =========================================================
   20. NAVIGATION
   ========================================================= */

function navigateTo(id){

  const target =
    document.getElementById(id);

  if(!target){
    return;
  }

  target.scrollIntoView({
    behavior:"smooth",
    block:"start"
  });
}

function initNavigation(){

  const header =
    $("header");

  const menuIcon =
    $("menu-icon");

  const nav =
    document.querySelector(
      ".navlist"
    );

  const navItems =
    Array.from(
      document.querySelectorAll(
        "[data-nav]"
      )
    );

  const sections =
    Array.from(
      document.querySelectorAll(
        "section[id]"
      )
    );


  function updateHeader(){

    header.classList.toggle(
      "sticky",
      window.scrollY > 45
    );

  }


  function updateActive(){

    const position =
      window.scrollY + 150;

    let active = "home";

    sections.forEach(
      section => {

        if(
          position >=
          section.offsetTop
        ){

          active =
            section.id;

        }

      }
    );


    navItems.forEach(
      item => {

        item.classList.toggle(
          "active",
          item.getAttribute("href") ===
          `#${active}`
        );

      }
    );

  }


  function closeMenu(){

    nav.classList.remove(
      "open"
    );

    menuIcon.classList.remove(
      "bx-x"
    );

    menuIcon.classList.add(
      "bx-menu"
    );

  }


  navItems.forEach(
    item =>
      item.addEventListener(
        "click",
        closeMenu
      )
  );


  menuIcon.addEventListener(
    "click",
    () => {

      const open =
        nav.classList.toggle(
          "open"
        );

      menuIcon.classList.toggle(
        "bx-x",
        open
      );

      menuIcon.classList.toggle(
        "bx-menu",
        !open
      );

    }
  );


  menuIcon.addEventListener(
    "keydown",
    event => {

      if(
        event.key === "Enter" ||
        event.key === " "
      ){

        event.preventDefault();

        menuIcon.click();

      }

    }
  );


  window.addEventListener(
    "scroll",
    () => {

      updateHeader();
      updateActive();

    },
    {
      passive:true
    }
  );


  updateHeader();
  updateActive();

}


/* =========================================================
   21. SCROLL REVEAL
   ========================================================= */

function initScrollReveal(){

  const targets =
    document.querySelectorAll(
      ".scroll-scale,.scroll-bottom,.scroll-top"
    );

  if(
    !("IntersectionObserver" in window)
  ){

    targets.forEach(
      element =>
        element.classList.add(
          "show-items"
        )
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if(
              entry.isIntersecting
            ){

              entry.target.classList.add(
                "show-items"
              );

            }

          }
        );

      },
      {
        threshold:.10
      }
    );


  targets.forEach(
    target =>
      observer.observe(target)
  );

}


/* =========================================================
   22. ROTATING HERO WORDS
   ========================================================= */

function initRotatingWords(){

  const words =
    Array.from(
      document.querySelectorAll(
        ".change-text .word"
      )
    );

  if(!words.length){
    return;
  }


  words.forEach(
    word => {

      const text =
        word.textContent.trim();

      word.textContent = "";

      [...text].forEach(
        character => {

          const letter =
            document.createElement(
              "span"
            );

          letter.className =
            "letter";

          letter.textContent =
            character;

          word.appendChild(
            letter
          );

        }
      );

    }
  );


  let index = 0;


  words[0].style.opacity = "1";


  Array.from(
    words[0].children
  )
  .forEach(
    (letter,i) => {

      setTimeout(
        () => {

          letter.className =
            "letter in";

        },
        120 + i * 45
      );

    }
  );


  function switchWord(){

    const current =
      words[index];

    const next =
      words[
        index === words.length - 1
          ? 0
          : index + 1
      ];


    current.style.opacity = "1";
    next.style.opacity = "1";


    Array.from(
      current.children
    )
    .forEach(
      (letter,i) => {

        setTimeout(
          () => {

            letter.className =
              "letter out";

          },
          i * 38
        );

      }
    );


    Array.from(
      next.children
    )
    .forEach(
      (letter,i) => {

        letter.className =
          "letter behind";

        setTimeout(
          () => {

            letter.className =
              "letter in";

          },
          260 + i * 38
        );

      }
    );


    index =
      index === words.length - 1
        ? 0
        : index + 1;

  }


  setInterval(
    switchWord,
    3200
  );

}


/* =========================================================
   23. PLANNER EVENTS
   ========================================================= */

function initPlanner(){

  $("tripForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        readPlannerForm();

        saveCurrentTrip();

        renderAll();

      }
    );


  $("useSampleTrip")
    .addEventListener(
      "click",
      () => {

        const base =
          new Date();

        state.trip = {

          from:"Hyderabad",

          destination:"Goa",

          start:
            toISODate(
              addDays(base,10)
            ),

          end:
            toISODate(
              addDays(base,13)
            ),

          travelers:2,

          transport:"Train",

          stay:"Comfort",

          style:"Balanced"

        };

        syncPlannerForm();

        saveState();

        renderAll();

        showToast(
          "Sample Goa trip loaded."
        );

      }
    );


  $("activityForm")
    .addEventListener(
      "submit",
      addActivity
    );


  $("regenerateItinerary")
    .addEventListener(
      "click",
      regenerateItinerary
    );


  $("staySearch")
    .addEventListener(
      "input",
      renderStays
    );


  $("stayStyleFilter")
    .addEventListener(
      "change",
      renderStays
    );


  $("resetPacking")
    .addEventListener(
      "click",
      resetPacking
    );


  bindBudgetSlider(
    "transport",
    "transportBudgetInput",
    "transportBudgetOutput"
  );


  bindBudgetSlider(
    "stay",
    "stayBudgetInput",
    "stayBudgetOutput"
  );


  bindBudgetSlider(
    "food",
    "foodBudgetInput",
    "foodBudgetOutput"
  );


  $("saveSettings")
    .addEventListener(
      "click",
      saveSettings
    );


  $("clearData")
    .addEventListener(
      "click",
      clearData
    );


  $("ccExport")
    .addEventListener(
      "click",
      exportTripSummary
    );


  $("ccNextButton")
    .addEventListener(
      "click",
      () => {

        const target =
          $("ccNextButton")
            .dataset
            .target ||
          "planner";

        navigateTo(target);

      }
    );


  document
    .querySelectorAll(
      "[data-cc-target]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          navigateTo(
            button.dataset.ccTarget
          );

        }
      );

    });

}


/* =========================================================
   24. TOAST
   ========================================================= */

function showToast(message){

  const toast =
    $("toast");

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );
}


/* =========================================================
   25. RENDER ALL
   ========================================================= */

function renderAll(){

  renderHome();

  renderPlanner();

  renderTransport();

  renderItinerary();

  renderStays();

  renderBudget();

  renderPacking();

  renderTrips();

  syncSettingsForm();

  renderCommandCenter();

}


/* =========================================================
   26. STARTUP
   ========================================================= */

loadState();


if(!state.trip.start){

  setDefaultDates();

  saveState();

}


syncPlannerForm();


activeTransportMode =
  state.trip.transport ||
  "Flight";


renderAll();

initDestinationFilters();

initTransportTabs();

initPlanner();

initNavigation();

initScrollReveal();

initRotatingWords();

renderCommandCenter();


/* Keep the dashboard fresh when
   the date changes across midnight.
*/

setInterval(
  () => {

    renderCommandCenter();
    renderHome();

  },
  60000
);
