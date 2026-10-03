/* =========================================================
   TripPilot — Professional Travel Workspace
   ========================================================= */

"use strict";


/* =========================================================
   01. STORAGE + STATE
   ========================================================= */

const STORAGE_KEY = "trippilot_v2";

const state = {

  settings:{
    name:"Mahi",
    home:"Hyderabad",
    stay:"Comfort",
    transport:"Flight",
    theme:"dark"
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
let activeDestinationFilter = "all";
let toastTimer;
let wordTimer;


/* =========================================================
   02. DOM HELPER
   ========================================================= */

function $(id){
  return document.getElementById(id);
}


/* =========================================================
   03. UTILITIES
   ========================================================= */

function uid(prefix="id"){

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2,8)}`;

}


function todayISO(){

  const now = new Date();

  const local =
    new Date(
      now.getTime() -
      now.getTimezoneOffset() *
      60000
    );

  return local
    .toISOString()
    .slice(0,10);

}


function addDays(date,count){

  const result = new Date(date);

  result.setDate(
    result.getDate() + count
  );

  return result;

}


function toISODate(date){

  const local =
    new Date(
      date.getTime() -
      date.getTimezoneOffset() *
      60000
    );

  return local
    .toISOString()
    .slice(0,10);

}


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
      (
        b.getTime() -
        a.getTime()
      ) / 86400000
    ) + 1,
    1
  );

}


function formatDate(value){

  const date =
    new Date(value);

  if(
    Number.isNaN(
      date.getTime()
    )
  ){
    return value || "Not set";
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
    Number(
      value || 0
    ).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits:0
      }
    )
  );

}


function escapeHTML(value){

  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}


/* =========================================================
   04. DESTINATION DATA
   ========================================================= */

const destinationData = {

  Goa:{
    type:"beach",
    label:"Beach",
    state:"Goa",
    distance:660,
    subtitle:"Beaches, cafés and easy coastal days.",
    imageClass:"goa"
  },

  Manali:{
    type:"mountain",
    label:"Mountain",
    state:"Himachal Pradesh",
    distance:1900,
    subtitle:"Mountain roads, viewpoints and cool-weather stays.",
    imageClass:"manali"
  },

  Jaipur:{
    type:"heritage",
    label:"Heritage",
    state:"Rajasthan",
    distance:1580,
    subtitle:"Forts, markets, architecture and food.",
    imageClass:"jaipur"
  },

  Alappuzha:{
    type:"backwaters",
    label:"Backwaters",
    state:"Kerala",
    distance:1250,
    subtitle:"Houseboats, waterways and slower travel.",
    imageClass:"alappuzha"
  },

  Mumbai:{
    type:"city",
    label:"City",
    state:"Maharashtra",
    distance:710,
    subtitle:"Coastal city energy, food and culture.",
    imageClass:"mumbai"
  },

  Bengaluru:{
    type:"city",
    label:"City",
    state:"Karnataka",
    distance:570,
    subtitle:"Cafés, city districts and nearby escapes.",
    imageClass:"bengaluru"
  },

  Delhi:{
    type:"heritage",
    label:"Heritage",
    state:"Delhi",
    distance:1570,
    subtitle:"History, museums, monuments and food.",
    imageClass:"delhi"
  },

  Kochi:{
    type:"backwaters",
    label:"Backwaters",
    state:"Kerala",
    distance:1090,
    subtitle:"Fort Kochi, food and waterfront culture.",
    imageClass:"alappuzha"
  },

  Udaipur:{
    type:"heritage",
    label:"Heritage",
    state:"Rajasthan",
    distance:1700,
    subtitle:"Lakes, palaces and slower heritage days.",
    imageClass:"udaipur"
  },

  Rishikesh:{
    type:"mountain",
    label:"Mountain",
    state:"Uttarakhand",
    distance:1800,
    subtitle:"River views, outdoor activities and hill escapes.",
    imageClass:"rishikesh"
  },

  Munnar:{
    type:"mountain",
    label:"Mountain",
    state:"Kerala",
    distance:1120,
    subtitle:"Tea landscapes, hills and cool mornings.",
    imageClass:"munnar"
  },

  Hampi:{
    type:"heritage",
    label:"Heritage",
    state:"Karnataka",
    distance:610,
    subtitle:"Historic ruins, landscapes and relaxed exploration.",
    imageClass:"hampi"
  }

};


/* =========================================================
   05. TRANSPORT DATA
   ========================================================= */

const transportData = {

  Flight:{

    icon:"bx-paper-plane",

    kicker:"INTERCITY AIR",

    title:"Flights for longer routes",

    description:
      "Useful when you want to reduce long-distance travel time.",

    facts:[
      "Fastest intercity movement",
      "Airport transfers required",
      "Prices vary by date"
    ],

    options:[

      {
        name:"Early economy",
        sub:"Simple one-way planning",
        time:"1h 25m + airport",
        price:4800
      },

      {
        name:"Flexible economy",
        sub:"Midday / evening option",
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

    title:"Train for slower journeys",

    description:
      "A practical choice for overnight travel and long-distance routes.",

    facts:[
      "Sleeper and AC options",
      "Good overnight choice",
      "Station transfers needed"
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
        sub:"Air-conditioned route",
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

    description:
      "Useful for regional routes, hill stations and overnight road movement.",

    facts:[
      "Day and overnight services",
      "Smaller towns accessible",
      "Flexible route coverage"
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
        name:"Premium sleeper",
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

    description:
      "Useful for transfers, local circuits and flexible road days.",

    facts:[
      "Door-to-door movement",
      "Flexible stops",
      "Strong local usefulness"
    ],

    options:[

      {
        name:"Sedan",
        sub:"Up to 4 seats",
        time:"On-demand",
        price:1600
      },

      {
        name:"SUV",
        sub:"Up to 6 seats",
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

    title:"Metro for urban movement",

    description:
      "Useful for quick city hops and transit connections.",

    facts:[
      "Fast urban hops",
      "Avoids road traffic",
      "Useful with local transfers"
    ],

    options:[

      {
        name:"Single city hop",
        sub:"One connection",
        time:"20–45m",
        price:50
      },

      {
        name:"Day pass",
        sub:"Several segments",
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

    title:"Auto for quick local hops",

    description:
      "Best around stations, markets and short city transfers.",

    facts:[
      "Short-distance use",
      "Simple local access",
      "Good for quick hops"
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

    title:"Ferry and boat for water legs",

    description:
      "Useful for waterfront routes, islands and backwater experiences.",

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

    description:
      "Combine multiple movement modes when one option does not cover the whole journey.",

    facts:[
      "Useful for multi-leg routes",
      "Transfer time matters",
      "Great for city + local movement"
    ],

    options:[

      {
        name:"Main + local transfer",
        sub:"Intercity + cab / metro",
        time:"Varies",
        price:1800
      },

      {
        name:"Rail + road",
        sub:"Train + cab / bus",
        time:"Varies",
        price:2400
      },

      {
        name:"Air + local",
        sub:"Flight + city transfer",
        time:"Varies",
        price:6200
      }

    ]

  }

};


/* =========================================================
   06. STAY DATA
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
    tag:"Short stays",
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
  },

  {
    id:"stay-7",
    name:"Lakeview Palace Stay",
    city:"Udaipur",
    style:"Premium",
    price:6200,
    rating:4.9,
    tag:"Lake district",
    image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=82&w=900"
  },

  {
    id:"stay-8",
    name:"River Camp Rooms",
    city:"Rishikesh",
    style:"Budget",
    price:1800,
    rating:4.5,
    tag:"Near river",
    image:"https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&q=82&w=900"
  },

  {
    id:"stay-9",
    name:"Tea Valley Retreat",
    city:"Munnar",
    style:"Comfort",
    price:3100,
    rating:4.7,
    tag:"Hill views",
    image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=82&w=900"
  }

];


/* =========================================================
   07. PACKING DATA
   ========================================================= */

const packingBase = [

  {
    id:"documents",
    name:"ID & travel documents",
    note:"ID, tickets and booking references"
  },

  {
    id:"wallet",
    name:"Wallet & cards",
    note:"Cash, cards and backup payment"
  },

  {
    id:"charger",
    name:"Phone charger",
    note:"Cable, adapter and power bank"
  },

  {
    id:"clothes",
    name:"Clothes",
    note:"Match the trip length and weather"
  },

  {
    id:"shoes",
    name:"Comfortable footwear",
    note:"Primary pair + optional backup"
  },

  {
    id:"toiletries",
    name:"Toiletries",
    note:"Travel-size essentials"
  },

  {
    id:"meds",
    name:"Personal medicines",
    note:"Regular medication and basic first aid"
  },

  {
    id:"weather",
    name:"Weather layer",
    note:"Umbrella, jacket or sun protection"
  },

  {
    id:"camera",
    name:"Camera / accessories",
    note:"Optional photography gear"
  }

];


/* =========================================================
   08. ITINERARY TEMPLATES
   ========================================================= */

const itineraryTemplates = {

  Goa:[
    {
      day:1,
      title:"Arrival + beach reset",
      desc:"Check in, settle down and explore the nearest beach before sunset.",
      time:"Afternoon → Evening",
      cost:900
    },
    {
      day:2,
      title:"North Goa circuit",
      desc:"Cafés, local markets and coastal stops without rushing the route.",
      time:"09:00 → 20:00",
      cost:1800
    },
    {
      day:3,
      title:"Slow morning + South Goa",
      desc:"Keep the morning flexible, then explore quieter coastal stretches.",
      time:"10:00 → 20:00",
      cost:2100
    },
    {
      day:4,
      title:"Breakfast + departure",
      desc:"Breakfast, checkout and return journey.",
      time:"08:00 → Departure",
      cost:1000
    }
  ],

  Manali:[
    {
      day:1,
      title:"Arrival + Old Manali",
      desc:"Check in, café stop and a relaxed evening around Old Manali.",
      time:"Afternoon → Evening",
      cost:850
    },
    {
      day:2,
      title:"Mountain viewpoint day",
      desc:"Combine scenic stops with enough breathing room between them.",
      time:"08:00 → 18:00",
      cost:2200
    },
    {
      day:3,
      title:"Adventure / nature day",
      desc:"Reserve space for an outdoor experience or longer valley drive.",
      time:"08:00 → 18:00",
      cost:2500
    },
    {
      day:4,
      title:"Slow morning + food",
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
      title:"Arrival + backwater evening",
      desc:"Check in and enjoy a relaxed waterfront evening.",
      time:"15:00 → 20:00",
      cost:900
    },
    {
      day:2,
      title:"Houseboat day",
      desc:"Use the main day for water-based exploration and meals.",
      time:"08:00 → 18:00",
      cost:2800
    },
    {
      day:3,
      title:"Village route + food",
      desc:"Short road circuit, cafés and relaxed time around the water.",
      time:"09:00 → 18:00",
      cost:1400
    },
    {
      day:4,
      title:"Breakfast + onward journey",
      desc:"Breakfast, checkout and onward transfer.",
      time:"08:00 → Departure",
      cost:700
    }
  ],

  Mumbai:[
    {
      day:1,
      title:"Arrival + city reset",
      desc:"Check in and take an easy evening city walk.",
      time:"15:00 → 20:00",
      cost:900
    },
    {
      day:2,
      title:"South Mumbai circuit",
      desc:"Combine landmark, architecture, food and waterfront stops.",
      time:"09:00 → 20:00",
      cost:1700
    },
    {
      day:3,
      title:"Food + culture day",
      desc:"Build a slower city route around food and neighbourhoods.",
      time:"10:00 → 20:00",
      cost:1500
    },
    {
      day:4,
      title:"Breakfast + departure",
      desc:"Flexible morning and return journey.",
      time:"08:00 → Departure",
      cost:700
    }
  ],

  Bengaluru:[
    {
      day:1,
      title:"Arrival + café circuit",
      desc:"Check in and explore a nearby café district.",
      time:"15:00 → 20:00",
      cost:700
    },
    {
      day:2,
      title:"City + culture day",
      desc:"Mix city landmarks, food and relaxed exploration.",
      time:"09:00 → 19:00",
      cost:1200
    },
    {
      day:3,
      title:"Day escape",
      desc:"Use the day for a short nearby route or activity.",
      time:"08:00 → 19:00",
      cost:1800
    }
  ],

  Delhi:[
    {
      day:1,
      title:"Arrival + Old Delhi",
      desc:"Check in and keep the first evening around food and heritage.",
      time:"15:00 → 21:00",
      cost:900
    },
    {
      day:2,
      title:"Monuments + museums",
      desc:"Build a focused heritage and culture route.",
      time:"08:00 → 19:00",
      cost:1400
    },
    {
      day:3,
      title:"Food + city walk",
      desc:"Balance local food with a slower neighbourhood route.",
      time:"10:00 → 20:00",
      cost:1200
    }
  ],

  Kochi:[
    {
      day:1,
      title:"Fort Kochi arrival",
      desc:"Check in and settle into the waterfront district.",
      time:"15:00 → 20:00",
      cost:800
    },
    {
      day:2,
      title:"Fort Kochi culture day",
      desc:"Architecture, cafés, galleries and waterfront stops.",
      time:"09:00 → 19:00",
      cost:1300
    },
    {
      day:3,
      title:"Backwater escape",
      desc:"Use the day for a relaxed water-based route.",
      time:"08:00 → 18:00",
      cost:1900
    }
  ],

  Udaipur:[
    {
      day:1,
      title:"Arrival + lake evening",
      desc:"Check in, explore the old city and watch the evening light.",
      time:"15:00 → 21:00",
      cost:900
    },
    {
      day:2,
      title:"Palace + lake circuit",
      desc:"Build a heritage-heavy day with enough photography time.",
      time:"08:00 → 19:00",
      cost:1700
    },
    {
      day:3,
      title:"Slow city day",
      desc:"Cafés, markets and a calmer lakeside route.",
      time:"10:00 → 19:00",
      cost:1200
    }
  ],

  Rishikesh:[
    {
      day:1,
      title:"Arrival + river evening",
      desc:"Settle in and take an easy riverfront walk.",
      time:"15:00 → 20:00",
      cost:850
    },
    {
      day:2,
      title:"Adventure day",
      desc:"Reserve time for an outdoor activity and nearby viewpoints.",
      time:"08:00 → 18:00",
      cost:2200
    },
    {
      day:3,
      title:"Slow morning + cafés",
      desc:"Keep the final day relaxed before departure.",
      time:"09:00 → 16:00",
      cost:1000
    }
  ],

  Munnar:[
    {
      day:1,
      title:"Arrival + tea landscape",
      desc:"Check in and use the first evening for a scenic route.",
      time:"15:00 → 20:00",
      cost:800
    },
    {
      day:2,
      title:"Tea country circuit",
      desc:"Combine viewpoints, plantations and local food.",
      time:"08:00 → 18:00",
      cost:1600
    },
    {
      day:3,
      title:"Nature + slow morning",
      desc:"Flexible nature day followed by a relaxed evening.",
      time:"09:00 → 18:00",
      cost:1400
    }
  ],

  Hampi:[
    {
      day:1,
      title:"Arrival + ruins at sunset",
      desc:"Check in and keep the first route close and relaxed.",
      time:"15:00 → 20:00",
      cost:700
    },
    {
      day:2,
      title:"Historic core",
      desc:"Spend the main day moving through the major heritage areas.",
      time:"08:00 → 18:00",
      cost:1300
    },
    {
      day:3,
      title:"Landscape + departure",
      desc:"Use the morning for a slower route before heading back.",
      time:"08:00 → Departure",
      cost:700
    }
  ]

};


/* =========================================================
   09. STORAGE
   ========================================================= */

function saveState(){

  try{

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );

  }catch(error){

    console.warn(
      "TripPilot storage error:",
      error
    );

  }

}


function loadState(){

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );

  if(!saved){

    setDefaultDates();

    return;

  }

  try{

    const parsed =
      JSON.parse(saved);

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
      Array.isArray(
        parsed.trips
      )
        ? parsed.trips
        : [];

    state.activities =
      Array.isArray(
        parsed.activities
      )
        ? parsed.activities
        : [];

    state.packing =
      parsed.packing &&
      typeof parsed.packing === "object"
        ? parsed.packing
        : {};

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
    addDays(
      new Date(),
      14
    );

  const end =
    addDays(
      start,
      3
    );

  state.trip.start =
    toISODate(start);

  state.trip.end =
    toISODate(end);

}


function ensureValidTrip(){

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
   10. BUDGET CALCULATION
   ========================================================= */

function calculateTripBudget(){

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  const travelers =
    Math.max(
      Number(
        state.trip.travelers
      ) || 1,
      1
    );

  const transportMultiplier = {

    Flight:1.25,
    Train:.82,
    Bus:.70,
    Cab:1.12,
    "Self Drive":1,
    Mixed:1.05

  }[
    state.trip.transport
  ] || 1;


  const stayMultiplier = {

    Budget:.72,
    Comfort:1,
    Premium:1.55

  }[
    state.trip.stay
  ] || 1;


  const destinationBase = {

    Goa:3200,
    Manali:3500,
    Jaipur:2900,
    Alappuzha:3000,
    Mumbai:3500,
    Bengaluru:2600,
    Delhi:3200,
    Kochi:3000,
    Udaipur:3100,
    Rishikesh:3000,
    Munnar:2900,
    Hampi:2300

  }[
    state.trip.destination
  ] || 3000;


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


/* =========================================================
   11. TRIP STATUS
   ========================================================= */

function getTripStatus(){

  ensureValidTrip();

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

      label:"Planning",
      note:"Dates are not set yet.",
      icon:"bx-calendar"

    };

  }


  if(today < start){

    const days =
      Math.max(
        Math.ceil(
          (
            start.getTime() -
            today.getTime()
          ) / 86400000
        ),
        0
      );

    return {

      label:
        `${days} day${
          days === 1 ? "" : "s"
        } to go`,

      note:
        `Starts ${formatDate(
          state.trip.start
        )}`,

      icon:"bx-time-five"

    };

  }


  if(
    today >= start &&
    today <= end
  ){

    const day =
      Math.floor(
        (
          today.getTime() -
          start.getTime()
        ) / 86400000
      ) + 1;

    const total =
      dateDiffInDays(
        state.trip.start,
        state.trip.end
      );

    return {

      label:
        `Day ${Math.min(day,total)} of ${total}`,

      note:
        "Your trip is active.",

      icon:"bx-map-pin"

    };

  }


  return {

    label:"Completed",

    note:
      `Ended ${formatDate(
        state.trip.end
      )}`,

    icon:"bx-check-circle"

  };

}


/* =========================================================
   12. HOME
   ========================================================= */

function getUpcomingTrips(){

  const today =
    new Date(todayISO());

  return state.trips
    .filter(
      trip =>
        new Date(
          trip.start
        ) >= today
    )
    .sort(
      (a,b) =>
        new Date(a.start) -
        new Date(b.start)
    );

}


function renderHome(){

  const destination =
    state.trip.destination;

  const data =
    destinationData[destination] ||
    destinationData.Goa;

  const budget =
    calculateTripBudget();

  const status =
    getTripStatus();

  const readiness =
    calculateReadiness();

  const upcoming =
    getUpcomingTrips();

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );


  $("heroSavedTrips").textContent =
    state.trips.length;


  $("heroUpcomingTrips").textContent =
    upcoming.length;


  $("heroTripReadiness").textContent =
    `${readiness.total}%`;


  $("heroProductTitle").textContent =
    `${state.trip.from} → ${destination}`;


  $("heroProductDates").textContent =
    `${formatDate(
      state.trip.start
    )} → ${formatDate(
      state.trip.end
    )}`;


  $("heroRouteDestination").textContent =
    destination;


  $("heroTripStatus").textContent =
    status.label;


  $("heroTripStatusNote").textContent =
    status.note;


  $("heroProductBudget").textContent =
    rupee(budget);


  $("heroProductDays").textContent =
    days;


  $("heroProductTravelers").textContent =
    state.trip.travelers;


  $("heroReadinessLabel").textContent =
    `${readiness.total}%`;


  $("heroReadinessBar").style.width =
    `${readiness.total}%`;

}


/* =========================================================
   13. DESTINATION RENDERING
   ========================================================= */

function getDestinationCards(){

  return Object.entries(
    destinationData
  )
  .map(
    ([name,data]) => {

      return `

        <article
          class="destination-card"
          data-destination-card
          data-name="${escapeHTML(name)}"
          data-type="${escapeHTML(data.type)}"
        >

          <div
            class="
              destination-image
              ${escapeHTML(
                data.imageClass
              )}
            "
          ></div>

          <div class="destination-overlay"></div>

          <div class="destination-content">

            <span class="destination-chip">
              ${escapeHTML(data.label)}
              ·
              ${escapeHTML(data.state)}
            </span>

            <h3>
              ${escapeHTML(name)}
            </h3>

            <p>
              ${escapeHTML(data.subtitle)}
            </p>

            <div class="destination-meta">

              <span>
                ${data.distance.toLocaleString(
                  "en-IN"
                )} km reference
              </span>

              <span>
                2–5 days
              </span>

            </div>

            <button
              class="destination-button"
              type="button"
              data-plan-destination="${escapeHTML(name)}"
            >
              Plan ${escapeHTML(name)}
            </button>

          </div>

        </article>

      `;

    }
  )
  .join("");

}


function renderDestinations(){

  const grid =
    $("destinationGrid");

  const search =
    $("destinationSearch")
      .value
      .trim()
      .toLowerCase();

  grid.innerHTML =
    getDestinationCards();


  let visible = 0;


  grid
    .querySelectorAll(
      "[data-destination-card]"
    )
    .forEach(
      card => {

        const name =
          card.dataset.name
            .toLowerCase();

        const type =
          card.dataset.type;

        const matchesSearch =
          !search ||
          name.includes(search);

        const matchesFilter =
          activeDestinationFilter ===
          "all" ||
          activeDestinationFilter ===
          type;

        const show =
          matchesSearch &&
          matchesFilter;

        card.classList.toggle(
          "hidden",
          !show
        );

        if(show){
          visible += 1;
        }

      }
    );


  $("destinationEmpty").hidden =
    visible > 0;


  grid
    .querySelectorAll(
      "[data-plan-destination]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const destination =
              button.dataset
                .planDestination;

            state.trip.destination =
              destination;

            syncPlannerForm();

            saveState();

            renderAll();

            navigateTo(
              "planner"
            );

            showToast(
              `${destination} added to your trip.`
            );

          }
        );

      }
    );

}


function initDestinationFilters(){

  document
    .querySelectorAll(
      "[data-filter]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            document
              .querySelectorAll(
                "[data-filter]"
              )
              .forEach(
                item =>
                  item.classList.remove(
                    "active"
                  )
              );

            button.classList.add(
              "active"
            );

            activeDestinationFilter =
              button.dataset.filter;

            renderDestinations();

          }
        );

      }
    );


  $("destinationSearch")
    .addEventListener(
      "input",
      renderDestinations
    );

}


/* =========================================================
   14. PLANNER
   ========================================================= */

function syncPlannerForm(){

  ensureValidTrip();

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
    $("tripFrom")
      .value
      .trim() ||
    "Hyderabad";


  state.trip.destination =
    $("tripDestination")
      .value;


  state.trip.start =
    $("tripStart")
      .value;


  state.trip.end =
    $("tripEnd")
      .value;


  state.trip.travelers =
    Math.min(
      Math.max(
        Number(
          $("tripTravelers")
            .value
        ) || 1,
        1
      ),
      20
    );


  state.trip.transport =
    $("tripTransport")
      .value;


  state.trip.stay =
    $("tripStay")
      .value;


  state.trip.style =
    $("tripStyle")
      .value;


  ensureValidTrip();

}


function renderPlanner(){

  ensureValidTrip();

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  const budget =
    calculateTripBudget();

  $("previewFrom").textContent =
    state.trip.from;


  $("previewDestination").textContent =
    state.trip.destination;


  $("previewDates").textContent =
    `${formatDate(
      state.trip.start
    )} → ${formatDate(
      state.trip.end
    )}`;


  $("previewDaysBadge").textContent =
    `${days} day${
      days === 1 ? "" : "s"
    }`;


  $("previewTransport").textContent =
    state.trip.transport;


  $("previewTravelers").textContent =
    state.trip.travelers;


  $("previewStay").textContent =
    state.trip.stay;


  $("previewStyle").textContent =
    state.trip.style;


  $("previewBudget").textContent =
    rupee(budget);

}


function initPlanner(){

  [
    "tripFrom",
    "tripDestination",
    "tripStart",
    "tripEnd",
    "tripTravelers",
    "tripTransport",
    "tripStay",
    "tripStyle"
  ]
  .forEach(
    id => {

      const element =
        $(id);

      if(!element){
        return;
      }

      element.addEventListener(
        "input",
        () => {

          readPlannerForm();

          renderPlanner();

          renderCommandCenter();

        }
      );


      element.addEventListener(
        "change",
        () => {

          readPlannerForm();

          renderPlanner();

          renderCommandCenter();

        }
      );

    }
  );


  $("tripForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        readPlannerForm();

        saveCurrentTrip();

      }
    );


  $("loadSample")
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
              addDays(
                base,
                10
              )
            ),

          end:
            toISODate(
              addDays(
                base,
                13
              )
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

}


/* =========================================================
   15. SAVE TRIP
   ========================================================= */

function saveCurrentTrip(){

  ensureValidTrip();

  const trip = {

    id:
      uid("trip"),

    from:
      state.trip.from,

    destination:
      state.trip.destination,

    start:
      state.trip.start,

    end:
      state.trip.end,

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
      new Date()
        .toISOString()

  };


  state.trips.push(
    trip
  );


  saveState();

  renderAll();

  showToast(
    `${trip.destination} trip saved.`
  );

}


/* =========================================================
   16. TRANSPORT
   ========================================================= */

function setTransportMode(mode){

  activeTransportMode =
    mode;


  document
    .querySelectorAll(
      ".transport-switch"
    )
    .forEach(
      button =>
        button.classList.toggle(
          "active",
          button.dataset.mode ===
          mode
        )
    );


  renderTransport();

}


function renderTransport(){

  const data =
    transportData[
      activeTransportMode
    ];


  if(!data){
    return;
  }


  $("transportIcon").className =
    `bx ${data.icon}`;


  $("transportKicker").textContent =
    data.kicker;


  $("transportTitle").textContent =
    data.title;


  $("transportDescription").textContent =
    data.description;


  $("transportFacts").innerHTML =
    data.facts
      .map(
        fact =>
          `<span>${escapeHTML(
            fact
          )}</span>`
      )
      .join("");


  $("transportOptions").innerHTML =
    data.options
      .map(
        option => `

          <div class="transport-option">

            <div>

              <div class="transport-option-name">
                ${escapeHTML(
                  option.name
                )}
              </div>

              <small class="transport-option-sub">
                ${escapeHTML(
                  option.sub
                )}
              </small>

            </div>

            <div class="transport-option-time">
              ${escapeHTML(
                option.time
              )}
            </div>

            <div class="transport-option-price">

              ${rupee(
                option.price
              )}

              <small>
                estimate
              </small>

            </div>

          </div>

        `
      )
      .join("");

}


function initTransport(){

  document
    .querySelectorAll(
      ".transport-switch"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            activeTransportMode =
              button.dataset.mode;

            state.trip.transport =
              button.dataset.mode;

            saveState();

            renderAll();

          }
        );

      }
    );

}


/* =========================================================
   17. ITINERARY
   ========================================================= */

function getCurrentItinerary(){

  return (
    itineraryTemplates[
      state.trip.destination
    ] ||
    itineraryTemplates.Goa
  );

}


function renderItinerary(){

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  const template =
    getCurrentItinerary()
      .filter(
        item =>
          item.day <= days
      );


  $("itineraryTitle").textContent =
    `${state.trip.destination} · itinerary`;


  $("itinerarySubtitle").textContent =
    destinationData[
      state.trip.destination
    ]?.subtitle ||
    "Build your route your way.";


  $("itineraryDayCount").textContent =
    `${days} DAY${
      days === 1 ? "" : "S"
    }`;


  const container =
    $("itineraryTimeline");


  if(!template.length){

    container.innerHTML = `

      <div class="itinerary-empty">

        No suggested plan is available
        for this date range yet.

      </div>

    `;

    return;

  }


  container.innerHTML =
    template
      .map(
        item => {

          const custom =
            state.activities.filter(
              activity =>
                Number(
                  activity.day
                ) ===
                Number(
                  item.day
                )
            );


          return `

            <div class="day-row">

              <div class="day-row-head">

                <h4 class="day-row-title">
                  Day ${item.day}
                  ·
                  ${escapeHTML(
                    item.title
                  )}
                </h4>

                <span class="day-row-badge">
                  ${escapeHTML(
                    item.time
                  )}
                </span>

              </div>


              <p class="day-row-description">
                ${escapeHTML(
                  item.desc
                )}
              </p>


              <div class="day-row-details">

                <span>
                  Suggested spend
                  ${rupee(
                    item.cost
                  )}
                </span>

                ${
                  custom
                    .map(
                      activity =>
                        `

                          <span
                            class="user-activity-chip"
                          >

                            ${
                              escapeHTML(
                                activity.time
                              )
                            }

                            ·

                            ${
                              escapeHTML(
                                activity.name
                              )
                            }

                            ·

                            ${
                              rupee(
                                activity.cost
                              )
                            }

                          </span>

                        `
                    )
                    .join("")
                }

              </div>

            </div>

          `;

        }
      )
      .join("");

}


function initItinerary(){

  $("activityForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const activity = {

          id:
            uid("activity"),

          day:
            Number(
              $("activityDay")
                .value
            ),

          name:
            $("activityName")
              .value
              .trim(),

          time:
            $("activityTime")
              .value,

          cost:
            Number(
              $("activityCost")
                .value
            ) || 0

        };


        if(!activity.name){
          return;
        }


        state.activities.push(
          activity
        );


        saveState();

        event.target.reset();

        $("activityDay").value =
          "1";

        $("activityTime").value =
          "18:00";

        $("activityCost").value =
          "500";

        renderAll();

        showToast(
          "Activity added to itinerary."
        );

      }
    );


  $("regenerateItinerary")
    .addEventListener(
      "click",
      () => {

        state.activities = [];

        saveState();

        renderAll();

        showToast(
          "Itinerary suggestions refreshed."
        );

      }
    );

}


/* =========================================================
   18. STAYS
   ========================================================= */

function renderStays(){

  const search =
    $("staySearch")
      .value
      .trim()
      .toLowerCase();

  const style =
    $("stayStyleFilter")
      .value;


  const filtered =
    stayData.filter(
      stay => {

        const haystack =
          `${stay.name} ${stay.city} ${stay.style} ${stay.tag}`
            .toLowerCase();

        const matchesSearch =
          !search ||
          haystack.includes(search);

        const matchesStyle =
          style === "all" ||
          stay.style === style;

        return (
          matchesSearch &&
          matchesStyle
        );

      }
    );


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

                  <span class="stay-style">
                    ${escapeHTML(
                      stay.style
                    )}
                  </span>

                  <h3>
                    ${escapeHTML(
                      stay.name
                    )}
                  </h3>

                  <div class="stay-location">
                    ${escapeHTML(
                      stay.city
                    )}
                    ·
                    ${escapeHTML(
                      stay.tag
                    )}
                  </div>


                  <div class="stay-meta">

                    <span class="stay-price">

                      ${rupee(
                        stay.price
                      )}

                      <small>
                        / night
                      </small>

                    </span>


                    <span class="stay-rating">
                      ★ ${stay.rating}
                    </span>

                  </div>


                  <button
                    class="stay-action"
                    type="button"
                    data-stay-city="${escapeHTML(
                      stay.city
                    )}"
                    data-stay-style="${escapeHTML(
                      stay.style
                    )}"
                  >
                    Use in plan
                  </button>

                </div>

              </article>

            `
          )
          .join("")

      : `

          <div
            class="panel empty-state"
            style="grid-column:1/-1"
          >

            <i class="bx bx-building-house"></i>

            <h3>
              No stay found
            </h3>

            <p>
              Try another search or stay style.
            </p>

          </div>

        `;


  document
    .querySelectorAll(
      "[data-stay-city]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const city =
              button.dataset.stayCity;

            const style =
              button.dataset.stayStyle;


            if(
              Object.prototype.hasOwnProperty.call(
                destinationData,
                city
              )
            ){

              state.trip.destination =
                city;

            }


            state.trip.stay =
              style;


            syncPlannerForm();

            saveState();

            renderAll();

            navigateTo(
              "planner"
            );

            showToast(
              `${city} stay applied.`
            );

          }
        );

      }
    );

}


function initStays(){

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

}


/* =========================================================
   19. BUDGET
   ========================================================= */

function renderBudget(){

  const values = {

    transport:
      Number(
        state.budget.transport
      ) || 0,

    stay:
      Number(
        state.budget.stay
      ) || 0,

    food:
      Number(
        state.budget.food
      ) || 0,

    local:
      Number(
        state.budget.local
      ) || 0,

    activities:
      Number(
        state.budget.activities
      ) || 0

  };


  const total =
    Object.values(
      values
    )
    .reduce(
      (sum,value) =>
        sum + value,
      0
    );


  $("budgetTotal").textContent =
    rupee(total);


  $("budgetRoute").textContent =
    `${state.trip.from} → ${
      state.trip.destination
    }`;


  $("budgetDays").textContent =
    `${dateDiffInDays(
      state.trip.start,
      state.trip.end
    )} days`;


  [
    ["Transport","transport"],
    ["Stay","stay"],
    ["Food","food"],
    ["Local","local"],
    ["Activities","activities"]

  ]
  .forEach(
    ([label,key]) => {

      $(`budget${label}`)
        .textContent =
        rupee(
          values[key]
        );


      const percent =
        total
          ? values[key] /
            total *
            100
          : 0;


      $(`budget${label}Bar`)
        .style.width =
        `${percent}%`;

    }
  );


  syncBudgetInputs();

}


function syncBudgetInputs(){

  const inputs = [

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


  inputs.forEach(
    ([inputId,outputId,key]) => {

      $(inputId).value =
        state.budget[key];


      $(outputId).textContent =
        rupee(
          state.budget[key]
        );

    }
  );

}


function initBudget(){

  [
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

  ]
  .forEach(
    ([inputId,outputId,key]) => {

      $(inputId)
        .addEventListener(
          "input",
          event => {

            state.budget[key] =
              Number(
                event.target.value
              ) || 0;


            saveState();

            renderBudget();

            renderCommandCenter();

            renderHome();

          }
        );

    }
  );

}


/* =========================================================
   20. PACKING
   ========================================================= */

function getPackingPercent(){

  if(!packingBase.length){
    return 0;
  }

  const done =
    packingBase.filter(
      item =>
        !!state.packing[
          item.id
        ]
    ).length;


  return Math.round(
    done /
    packingBase.length *
    100
  );

}


function renderPacking(){

  const percent =
    getPackingPercent();


  const done =
    packingBase.filter(
      item =>
        !!state.packing[item.id]
    ).length;


  $("packingTitle").textContent =
    `${state.trip.destination} packing list`;


  $("packingPercent").textContent =
    `${percent}%`;


  $("packingMeter").style.width =
    `${percent}%`;


  if(percent === 100){

    $("packingReadyTitle").textContent =
      "You're departure-ready.";

    $("packingSummaryText").textContent =
      "Everything on your checklist is marked packed.";

  }else{

    $("packingReadyTitle").textContent =
      "You're getting ready.";

    $("packingSummaryText").textContent =
      `${done} of ${
        packingBase.length
      } items are packed.`;

  }


  $("packingList").innerHTML =
    packingBase
      .map(
        item => `

          <div
            class="
              pack-item
              ${
                state.packing[item.id]
                  ? "done"
                  : ""
              }
            "
            data-pack-id="${escapeHTML(
              item.id
            )}"
          >

            <div class="pack-check">

              <i class="bx bx-check"></i>

            </div>

            <div class="pack-copy">

              <strong>
                ${escapeHTML(
                  item.name
                )}
              </strong>

              <small>
                ${escapeHTML(
                  item.note
                )}
              </small>

            </div>

          </div>

        `
      )
      .join("");


  document
    .querySelectorAll(
      "[data-pack-id]"
    )
    .forEach(
      item => {

        item.addEventListener(
          "click",
          () => {

            const id =
              item.dataset.packId;

            state.packing[id] =
              !state.packing[id];

            saveState();

            renderPacking();

            renderCommandCenter();

            renderHome();

          }
        );

      }
    );

}


function initPacking(){

  $("resetPacking")
    .addEventListener(
      "click",
      () => {

        state.packing = {};

        saveState();

        renderPacking();

        renderCommandCenter();

        renderHome();

        showToast(
          "Packing checklist reset."
        );

      }
    );

}


/* =========================================================
   21. TRIP READINESS
   ========================================================= */

function isTripSetupComplete(){

  return !!(
    state.trip.from &&
    state.trip.destination &&
    state.trip.start &&
    state.trip.end &&
    Number(
      state.trip.travelers
    ) > 0
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


  getCurrentItinerary()
    .forEach(
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
    item => {

      const day =
        Number(
          item.day
        );

      if(
        day >= 1 &&
        day <= days
      ){

        plannedDays.add(day);

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


function calculateReadiness(){

  const planner =
    isTripSetupComplete()
      ? 25
      : 0;


  const itineraryProgress =
    getItineraryProgress();


  let itinerary = 0;


  if(
    itineraryProgress >= 75
  ){

    itinerary = 25;

  }else if(
    itineraryProgress >= 50
  ){

    itinerary = 18;

  }else if(
    itineraryProgress > 0
  ){

    itinerary = 10;

  }


  const budget =
    Object.values(
      state.budget
    )
    .reduce(
      (sum,value) =>
        sum + Number(value || 0),
      0
    ) > 0
      ? 20
      : 0;


  const packing =
    Math.round(
      getPackingPercent() *
      .30
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


/* =========================================================
   22. COMMAND CENTER
   ========================================================= */

function getNextAction(){

  const itinerary =
    getItineraryProgress();

  const packing =
    getPackingPercent();

  const budget =
    Object.values(
      state.budget
    )
    .reduce(
      (sum,value) =>
        sum + Number(value || 0),
      0
    );


  if(!isTripSetupComplete()){

    return {

      title:
        "Complete your trip setup",

      text:
        "Add your route, dates and travelers in the Trip Builder.",

      icon:
        "bx-map",

      target:
        "planner"

    };

  }


  if(
    itinerary < 75
  ){

    return {

      title:
        "Build the itinerary",

      text:
        "Review the route and add your own activities.",

      icon:
        "bx-calendar-check",

      target:
        "itinerary"

    };

  }


  if(
    budget <= 0
  ){

    return {

      title:
        "Set your budget",

      text:
        "Tune transport, stay and food reserves.",

      icon:
        "bx-wallet",

      target:
        "budget"

    };

  }


  if(
    packing < 100
  ){

    return {

      title:
        "Finish packing",

      text:
        `${packing}% of your checklist is complete.`,

      icon:
        "bx-briefcase",

      target:
        "packing"

    };

  }


  return {

    title:
      "Your trip is ready",

    text:
      "Planner, itinerary, budget and packing are all set.",

    icon:
      "bx-check-shield",

    target:
      "trips"

  };

}


function renderCommandCenter(){

  const readiness =
    calculateReadiness();

  const status =
    getTripStatus();

  const itinerary =
    getItineraryProgress();

  const packing =
    getPackingPercent();

  const budget =
    calculateTripBudget();

  const days =
    dateDiffInDays(
      state.trip.start,
      state.trip.end
    );

  const next =
    getNextAction();


  $("commandTitle").textContent =
    `${state.trip.destination} trip workspace`;


  $("commandSubtitle").textContent =
    `${state.trip.from} → ${
      state.trip.destination
    } · ${
      days
    } day${days === 1 ? "" : "s"}`;


  $("commandStatus").textContent =
    status.label;


  $("commandRoute").textContent =
    `${state.trip.from} → ${
      state.trip.destination
    }`;


  $("commandCountdown").textContent =
    status.label;


  $("commandCountdownNote").textContent =
    status.note;


  $("commandBudget").textContent =
    rupee(budget);


  $("commandTransport").textContent =
    state.trip.transport;


  $("readinessPercent").textContent =
    `${readiness.total}%`;


  $("readinessRing").style.setProperty(
    "--value",
    `${readiness.total}%`
  );


  $("checkTripValue").textContent =
    readiness.planner === 25
      ? "Ready"
      : "Missing";


  $("checkItineraryValue").textContent =
    `${itinerary}%`;


  $("checkBudgetValue").textContent =
    readiness.budget
      ? rupee(budget)
      : "Not set";


  $("checkPackingValue").textContent =
    `${packing}%`;


  document
    .querySelectorAll(
      ".dashboard-check"
    )
    .forEach(
      (item,index) => {

        const done = [

          readiness.planner === 25,

          itinerary >= 75,

          readiness.budget > 0,

          packing >= 100

        ][index];


        item.classList.toggle(
          "is-done",
          done
        );

      }
    );


  $("nextActionIcon").className =
    `bx ${next.icon}`;


  $("nextActionTitle").textContent =
    next.title;


  $("nextActionText").textContent =
    next.text;


  $("nextActionButton").dataset.target =
    next.target;


  $("snapshotDays").textContent =
    days;


  $("snapshotTravelers").textContent =
    state.trip.travelers;


  $("snapshotStay").textContent =
    state.trip.stay;


  $("snapshotStyle").textContent =
    state.trip.style;

}


function initCommandCenter(){

  $("nextActionButton")
    .addEventListener(
      "click",
      () => {

        const target =
          $("nextActionButton")
            .dataset
            .target ||
          "planner";

        navigateTo(target);

      }
    );


  $("commandExport")
    .addEventListener(
      "click",
      exportTripSummary
    );

}


/* =========================================================
   23. SAVED TRIPS
   ========================================================= */

function renderTrips(){

  const upcoming =
    getUpcomingTrips();


  const totalTravelers =
    state.trips.reduce(
      (sum,trip) =>
        sum +
        Number(
          trip.travelers || 0
        ),
      0
    );


  const totalSpend =
    state.trips.reduce(
      (sum,trip) =>
        sum +
        Number(
          trip.estimatedBudget || 0
        ),
      0
    );


  $("savedTripCount").textContent =
    state.trips.length;


  $("upcomingTripCount").textContent =
    upcoming.length;


  $("plannedTravelerCount").textContent =
    totalTravelers;


  $("plannedSpend").textContent =
    rupee(totalSpend);


  if(!state.trips.length){

    $("savedTripsGrid").innerHTML = `

      <div
        class="panel empty-state"
        style="grid-column:1/-1"
      >

        <i class="bx bx-map-alt"></i>

        <h3>
          Your trip library is empty.
        </h3>

        <p>
          Create your first trip and it will appear here.
        </p>

        <a
          href="#planner"
          class="btn primary-btn"
          style="margin-top:15px"
        >
          <i class="bx bx-plus"></i>
          Create first trip
        </a>

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
        trip => {

          const isUpcoming =
            new Date(trip.start) >=
            new Date(todayISO());


          const days =
            dateDiffInDays(
              trip.start,
              trip.end
            );


          return `

            <article class="panel saved-trip">

              <div class="saved-trip-top">

                <span
                  class="
                    saved-trip-status
                    ${
                      isUpcoming
                        ? ""
                        : "past"
                    }
                  "
                >
                  <span class="status-dot"></span>

                  ${
                    isUpcoming
                      ? "Upcoming"
                      : "Past"
                  }

                </span>

              </div>


              <h3>
                ${escapeHTML(
                  trip.destination
                )}
              </h3>


              <div class="saved-trip-route">

                ${escapeHTML(
                  trip.from
                )}

                →

                ${escapeHTML(
                  trip.destination
                )}

              </div>


              <div class="saved-trip-info">

                <div>

                  <span>
                    Dates
                  </span>

                  <strong>
                    ${formatDate(
                      trip.start
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    Duration
                  </span>

                  <strong>
                    ${days} days
                  </strong>

                </div>


                <div>

                  <span>
                    Travelers
                  </span>

                  <strong>
                    ${trip.travelers}
                  </strong>

                </div>


                <div>

                  <span>
                    Budget
                  </span>

                  <strong>
                    ${rupee(
                      trip.estimatedBudget
                    )}
                  </strong>

                </div>

              </div>


              <div class="saved-trip-actions">

                <button
                  class="btn primary-btn small-btn"
                  type="button"
                  data-open-trip="${escapeHTML(
                    trip.id
                  )}"
                >
                  Open
                </button>

                <button
                  class="btn danger-btn small-btn"
                  type="button"
                  data-delete-trip="${escapeHTML(
                    trip.id
                  )}"
                >
                  Delete
                </button>

              </div>

            </article>

          `;

        }
      )
      .join("");


  document
    .querySelectorAll(
      "[data-open-trip]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openSavedTrip(
              button.dataset
                .openTrip
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      "[data-delete-trip]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            deleteTrip(
              button.dataset
                .deleteTrip
            );

          }
        );

      }
    );

}


function openSavedTrip(id){

  const trip =
    state.trips.find(
      item =>
        item.id === id
    );


  if(!trip){
    return;
  }


  state.trip = {

    ...state.trip,

    from:
      trip.from,

    destination:
      trip.destination,

    start:
      trip.start,

    end:
      trip.end,

    travelers:
      trip.travelers,

    transport:
      trip.transport,

    stay:
      trip.stay,

    style:
      trip.style

  };


  activeTransportMode =
    state.trip.transport;


  syncPlannerForm();

  saveState();

  renderAll();

  navigateTo(
    "planner"
  );

  showToast(
    `${trip.destination} trip loaded.`
  );

}


function deleteTrip(id){

  const trip =
    state.trips.find(
      item =>
        item.id === id
    );


  if(!trip){
    return;
  }


  const confirmed =
    window.confirm(
      `Delete ${trip.destination} trip?`
    );


  if(!confirmed){
    return;
  }


  state.trips =
    state.trips.filter(
      item =>
        item.id !== id
    );


  saveState();

  renderAll();

  showToast(
    "Saved trip deleted."
  );

}


/* =========================================================
   24. SETTINGS
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
      $("settingsName")
        .value
        .trim() ||
      "Mahi",

    home:
      $("settingsHome")
        .value
        .trim() ||
      "Hyderabad",

    stay:
      $("settingsStay")
        .value,

    transport:
      $("settingsTransport")
        .value,

    theme:
      state.settings.theme ||
      "dark"

  };


  state.trip.from =
    state.settings.home;


  state.trip.stay =
    state.settings.stay;


  state.trip.transport =
    state.settings.transport;


  activeTransportMode =
    state.trip.transport;


  saveState();

  syncPlannerForm();

  renderAll();

  showToast(
    "Preferences saved."
  );

}


function clearData(){

  const confirmed =
    window.confirm(
      "Clear all TripPilot local data? This will remove saved trips, budget changes, activities, packing progress and preferences."
    );


  if(!confirmed){
    return;
  }


  localStorage.removeItem(
    STORAGE_KEY
  );


  location.reload();

}


/* =========================================================
   25. THEME
   ========================================================= */

function applyTheme(){

  const light =
    state.settings.theme ===
    "light";


  document.body.classList.toggle(
    "light-mode",
    light
  );


  const icon =
    $("themeToggle")
      .querySelector("i");


  if(light){

    icon.className =
      "bx bx-sun";

  }else{

    icon.className =
      "bx bx-moon";

  }

}


function toggleTheme(){

  state.settings.theme =
    state.settings.theme ===
    "light"
      ? "dark"
      : "light";


  saveState();

  applyTheme();

  showToast(
    state.settings.theme ===
    "light"
      ? "Light theme enabled."
      : "Dark theme enabled."
  );

}


/* =========================================================
   26. EXPORTS
   ========================================================= */

function getExportData(){

  return {

    app:"TripPilot",

    version:"2.0",

    exportedAt:
      new Date()
        .toISOString(),

    settings:{
      ...state.settings
    },

    currentTrip:{
      ...state.trip,

      estimatedBudget:
        calculateTripBudget(),

      duration:
        dateDiffInDays(
          state.trip.start,
          state.trip.end
        )

    },

    budget:{
      ...state.budget
    },

    savedTrips:
      [...state.trips],

    activities:
      [...state.activities],

    packing:
      {...state.packing}

  };

}


function downloadBlob(
  content,
  filename,
  mime
){

  const blob =
    new Blob(
      [content],
      {
        type:mime
      }
    );


  const url =
    URL.createObjectURL(blob);


  const link =
    document.createElement(
      "a"
    );


  link.href = url;

  link.download =
    filename;


  document.body.appendChild(
    link
  );


  link.click();

  link.remove();


  URL.revokeObjectURL(
    url
  );

}


function exportTripSummary(){

  const data =
    getExportData();


  const itineraryText =
    state.activities.length

      ? state.activities
          .slice()
          .sort(
            (a,b) =>
              Number(a.day) -
              Number(b.day)
          )
          .map(
            activity =>
              `Day ${activity.day} — ${
                activity.time
              } — ${
                activity.name
              } (${rupee(
                activity.cost
              )})`
          )
          .join("\n")

      : "No custom activities added.";


  const summary = [

    "TRIPPILOT — TRIP SUMMARY",

    "=======================================",

    `Route: ${
      state.trip.from
    } → ${
      state.trip.destination
    }`,

    `Dates: ${
      formatDate(
        state.trip.start
      )
    } → ${
      formatDate(
        state.trip.end
      )
    }`,

    `Duration: ${
      data.currentTrip.duration
    } days`,

    `Travelers: ${
      state.trip.travelers
    }`,

    `Transport: ${
      state.trip.transport
    }`,

    `Stay: ${
      state.trip.stay
    }`,

    `Trip style: ${
      state.trip.style
    }`,

    `Estimated budget: ${
      rupee(
        data.currentTrip.estimatedBudget
      )
    }`,

    "",

    `Readiness: ${
      calculateReadiness().total
    }%`,

    `Itinerary coverage: ${
      getItineraryProgress()
    }%`,

    `Packing: ${
      getPackingPercent()
    }%`,

    "",

    "CUSTOM ACTIVITIES",

    "---------------------------------------",

    itineraryText,

    "",

    "TripPilot is a planning application.",
    "Values are estimates and are not live booking data."

  ].join("\n");


  downloadBlob(
    summary,
    `TripPilot-${
      state.trip.destination
    }-Summary.txt`,
    "text/plain;charset=utf-8"
  );


  showToast(
    "Trip summary exported."
  );

}


function exportJSON(){

  const data =
    JSON.stringify(
      getExportData(),
      null,
      2
    );


  downloadBlob(
    data,
    "TripPilot-data.json",
    "application/json"
  );


  showToast(
    "TripPilot data exported."
  );

}


/* =========================================================
   27. NAVIGATION
   ========================================================= */

function navigateTo(id){

  const target =
    document.getElementById(
      id
    );


  if(!target){
    return;
  }


  target.scrollIntoView({

    behavior:
      "smooth",

    block:
      "start"

  });

}


function initNavigation(){

  const header =
    $("header");


  const menuButton =
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


  function closeMenu(){

    nav.classList.remove(
      "open"
    );


    menuButton
      .querySelector("i")
      .className =
      "bx bx-menu";

  }


  navItems.forEach(
    item => {

      item.addEventListener(
        "click",
        closeMenu
      );

    }
  );


  menuButton
    .addEventListener(
      "click",
      () => {

        const open =
          nav.classList.toggle(
            "open"
          );


        menuButton
          .querySelector("i")
          .className =
          open
            ? "bx bx-x"
            : "bx bx-menu";

      }
    );


  window.addEventListener(
    "scroll",
    () => {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 40
      );

    },
    {
      passive:true
    }
  );


  const sections =
    Array.from(
      document.querySelectorAll(
        "main section[id]"
      )
    );


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if(
              !entry.isIntersecting
            ){
              return;
            }


            navItems.forEach(
              item => {

                item.classList.toggle(
                  "active",
                  item.getAttribute("href") ===
                  `#${entry.target.id}`
                );

              }
            );

          }
        );

      },
      {
        rootMargin:
          "-30% 0px -55% 0px",
        threshold:0
      }
    );


  sections.forEach(
    section =>
      observer.observe(
        section
      )
  );

}


/* =========================================================
   28. ROTATING HERO WORDS
   ========================================================= */

function initRotatingWords(){

  const words =
    Array.from(
      document.querySelectorAll(
        ".rotating-window .word"
      )
    );


  if(!words.length){
    return;
  }


  let index = 0;


  words.forEach(
    word =>
      word.classList.remove(
        "active-word"
      )
  );


  words[0]
    .classList
    .add(
      "active-word"
    );


  wordTimer =
    setInterval(
      () => {

        words[index]
          .classList
          .remove(
            "active-word"
          );


        index =
          index ===
          words.length - 1
            ? 0
            : index + 1;


        words[index]
          .classList
          .add(
            "active-word"
          );

      },
      2800
    );

}


/* =========================================================
   29. SCROLL REVEAL
   ========================================================= */

function initScrollReveal(){

  const targets =
    document.querySelectorAll(
      ".scroll-scale,.scroll-bottom"
    );


  if(
    !(
      "IntersectionObserver"
      in window
    )
  ){

    targets.forEach(
      item =>
        item.classList.add(
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

              entry.target
                .classList
                .add(
                  "show-items"
                );

            }

          }
        );

      },
      {
        threshold:.08
      }
    );


  targets.forEach(
    target =>
      observer.observe(
        target
      )
  );

}


/* =========================================================
   30. SETTINGS EVENTS
   ========================================================= */

function initSettings(){

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


  $("themeToggle")
    .addEventListener(
      "click",
      toggleTheme
    );


  $("settingsThemeToggle")
    .addEventListener(
      "click",
      toggleTheme
    );


  $("exportJSON")
    .addEventListener(
      "click",
      exportJSON
    );

}


/* =========================================================
   31. RENDER ALL
   ========================================================= */

function renderAll(){

  renderHome();

  renderCommandCenter();

  renderDestinations();

  renderPlanner();

  renderTransport();

  renderItinerary();

  renderStays();

  renderBudget();

  renderPacking();

  renderTrips();

  syncSettingsForm();

  applyTheme();

}


/* =========================================================
   32. STARTUP
   ========================================================= */

function startTripPilot(){

  loadState();

  ensureValidTrip();

  if(
    !state.settings.theme
  ){
    state.settings.theme =
      "dark";
  }


  if(
    !state.trip.destination ||
    !destinationData[
      state.trip.destination
    ]
  ){

    state.trip.destination =
      "Goa";

  }


  if(
    !state.trip.transport ||
    !transportData[
      state.trip.transport
    ]
  ){

    state.trip.transport =
      "Flight";

  }


  activeTransportMode =
    state.trip.transport;


  syncPlannerForm();

  saveState();

  renderAll();

  initDestinationFilters();

  initPlanner();

  initTransport();

  initItinerary();

  initStays();

  initBudget();

  initPacking();

  initCommandCenter();

  initSettings();

  initNavigation();

  initScrollReveal();

  initRotatingWords();

}


/* =========================================================
   33. BOOT
   ========================================================= */

if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    startTripPilot,
    {
      once:true
    }
  );

}else{

  startTripPilot();

}
