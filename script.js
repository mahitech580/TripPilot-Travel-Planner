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

  Hyderabad:{
    type:"city",
    label:"Featured City",
    state:"Telangana",
    distance:620,
    subtitle:"Charminar, Golconda, biryani and a modern tech-city pulse.",
    imageClass:"hyderabad",
    image:"https://images.unsplash.com/photo-1750834115164-8c2658f18dd0?auto=format&fit=crop&fm=jpg&q=92&w=3840",
    source:"Unsplash — Charminar, Hyderabad",
    featured:true
  },

  Mumbai:{
    type:"city",
    label:"Featured City",
    state:"Maharashtra",
    distance:710,
    subtitle:"Marine Drive sunsets, heritage landmarks and coastal city energy.",
    imageClass:"mumbai",
    image:"https://images.unsplash.com/photo-1529253355930-347a3b4a3435?auto=format&fit=crop&fm=jpg&q=92&w=3840",
    source:"Unsplash — Mumbai cityscape at sunset",
    featured:true
  },

  Bengaluru:{
    type:"city",
    label:"Featured City",
    state:"Karnataka",
    distance:570,
    subtitle:"Vidhana Soudha, green spaces, cafés and Bengaluru city life.",
    imageClass:"bengaluru",
    image:"https://images.unsplash.com/photo-1644779504736-ed346f96a7bf?auto=format&fit=crop&fm=jpg&q=92&w=3840",
    source:"Unsplash — Vidhana Soudha, Bengaluru",
    featured:true
  },

  Goa:{
    type:"beach",
    label:"Beach",
    state:"Goa",
    distance:660,
    subtitle:"Beaches, cafés and easy coastal days.",
    imageClass:"goa",
    image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Manali:{
    type:"mountain",
    label:"Mountain",
    state:"Himachal Pradesh",
    distance:1900,
    subtitle:"Mountain roads, viewpoints and cool-weather stays.",
    imageClass:"manali",
    image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Jaipur:{
    type:"heritage",
    label:"Heritage",
    state:"Rajasthan",
    distance:1580,
    subtitle:"Forts, markets, architecture and food.",
    imageClass:"jaipur",
    image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Alappuzha:{
    type:"backwaters",
    label:"Backwaters",
    state:"Kerala",
    distance:1250,
    subtitle:"Houseboats, waterways and slower travel.",
    imageClass:"alappuzha",
    image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Delhi:{
    type:"heritage",
    label:"Heritage",
    state:"Delhi",
    distance:1570,
    subtitle:"History, museums, monuments and food.",
    imageClass:"delhi",
    image:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Kochi:{
    type:"backwaters",
    label:"Waterfront",
    state:"Kerala",
    distance:1090,
    subtitle:"Fort Kochi, waterfront culture and relaxed food trails.",
    imageClass:"alappuzha",
    image:"https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Udaipur:{
    type:"heritage",
    label:"Heritage",
    state:"Rajasthan",
    distance:1700,
    subtitle:"Lakes, palaces and slower heritage days.",
    imageClass:"udaipur",
    image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Rishikesh:{
    type:"mountain",
    label:"Mountain",
    state:"Uttarakhand",
    distance:1800,
    subtitle:"River views, outdoor activities and hill escapes.",
    imageClass:"rishikesh",
    image:"https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Munnar:{
    type:"mountain",
    label:"Mountain",
    state:"Kerala",
    distance:1120,
    subtitle:"Tea landscapes, hills and cool mornings.",
    imageClass:"munnar",
    image:"https://images.unsplash.com/photo-1672219386269-486cbbe9a50f?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  Hampi:{
    type:"heritage",
    label:"Heritage",
    state:"Karnataka",
    distance:610,
    subtitle:"Historic ruins, landscapes and relaxed exploration.",
    imageClass:"hampi",
    image:"https://images.unsplash.com/photo-1600100397608-f010f0f71dbe?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  }

}

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
    image:"https://images.unsplash.com/photo-1701421016474-09b19faa9f77?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-2",
    name:"Coastline Budget Rooms",
    city:"Goa",
    style:"Budget",
    price:1600,
    rating:4.4,
    tag:"Short stays",
    image:"https://images.unsplash.com/photo-1772476361154-e894ba10d757?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-3",
    name:"Mountain View Lodge",
    city:"Manali",
    style:"Comfort",
    price:2900,
    rating:4.6,
    tag:"Valley view",
    image:"https://images.unsplash.com/photo-1719464515608-dcc7343fba4e?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-4",
    name:"Pink City Courtyard",
    city:"Jaipur",
    style:"Premium",
    price:4800,
    rating:4.8,
    tag:"Heritage feel",
    image:"https://images.unsplash.com/photo-1776763018821-8feeaeeee0a5?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-5",
    name:"Backwater House Stay",
    city:"Alappuzha",
    style:"Comfort",
    price:3600,
    rating:4.8,
    tag:"Waterfront",
    image:"https://images.unsplash.com/photo-1651804279611-a0b8b4bdb4f4?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-6",
    name:"Airport Link Hotel",
    city:"Hyderabad",
    style:"Budget",
    price:2200,
    rating:4.3,
    tag:"Transit-friendly",
    image:"https://images.unsplash.com/photo-1777016844282-46fa8713cdae?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-7",
    name:"Lakeview Palace Stay",
    city:"Udaipur",
    style:"Premium",
    price:6200,
    rating:4.9,
    tag:"Lake district",
    image:"https://images.unsplash.com/photo-1777016844282-46fa8713cdae?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-8",
    name:"River Camp Rooms",
    city:"Rishikesh",
    style:"Budget",
    price:1800,
    rating:4.5,
    tag:"Near river",
    image:"https://images.unsplash.com/photo-1772476361154-e894ba10d757?auto=format&fit=crop&fm=jpg&q=92&w=3840"
  },

  {
    id:"stay-9",
    name:"Tea Valley Retreat",
    city:"Munnar",
    style:"Comfort",
    price:3100,
    rating:4.7,
    tag:"Hill views",
    image:"https://images.unsplash.com/photo-1719464515608-dcc7343fba4e?auto=format&fit=crop&fm=jpg&q=92&w=3840"
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

  Hyderabad:[
    {day:1,title:"Old City arrival",desc:"Check in, explore Charminar and settle into the city at an easy pace.",time:"15:00 → 20:00",cost:900},
    {day:2,title:"Heritage + food trail",desc:"Build a route across historic neighbourhoods, local food and landmark stops.",time:"09:00 → 20:00",cost:1300},
    {day:3,title:"Modern Hyderabad",desc:"Mix a relaxed city day with cafés, shopping and a sunset stop.",time:"10:00 → 19:00",cost:1500},
    {day:4,title:"Breakfast + departure",desc:"Breakfast, checkout and return journey.",time:"08:00 → Departure",cost:800}
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
          class="destination-card ${data.featured ? 'featured-city' : ''}"
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
            aria-hidden="true"
          >
            <img
              class="destination-photo"
              src="${escapeHTML(data.image || '')}"
              alt="${escapeHTML(name + ' destination photo')}"
              loading="lazy"
              decoding="async"
            >
          </div>

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
      "Clear all TripPilot local data? This removes saved trips, budget changes, activities, packing progress, travel searches, inspiration saves and live-session cache."
    );

  if(!confirmed){
    return;
  }

  [
    STORAGE_KEY,
    "trippilot_desk_recent_v1",
    "trippilot_inspiration_v1",
    "trippilot_live_cache_v1"
  ].forEach(function(key){
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });

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

  document.body.dataset.theme =
    light ? "light" : "dark";

  const meta =
    document.querySelector(
      'meta[name="theme-color"]'
    );

  if(meta){
    meta.setAttribute(
      "content",
      light ? "#f1f3f1" : "#080909"
    );
  }

  const icon =
    $("themeToggle")
      .querySelector("i");

  if(icon){
    icon.className =
      light
        ? "bx bx-sun"
        : "bx bx-moon";
  }

  const settingsToggle =
    $("settingsThemeToggle");

  if(settingsToggle){
    settingsToggle.setAttribute(
      "aria-pressed",
      String(light)
    );
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

  if(typeof installTravelImageFallbacks==="function") setTimeout(function(){installTravelImageFallbacks();},0);
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


/* =========================================================
   PRODUCTION UX ENHANCEMENTS
   ========================================================= */
(function initProductionEnhancements(){
  const progress=document.getElementById("scrollProgress");
  const progressBar=progress ? progress.querySelector("span") : null;
  const backTop=document.getElementById("backToTop");
  const glow=document.getElementById("cursorGlow");

  const updateViewportChrome=()=>{
    const doc=document.documentElement;
    const max=doc.scrollHeight-doc.clientHeight;
    const pct=max>0 ? (window.scrollY/max)*100 : 0;
    if(progressBar) progressBar.style.width=Math.min(100,Math.max(0,pct))+"%";
    if(backTop) backTop.classList.toggle("show",window.scrollY>620);
  };
  window.addEventListener("scroll",updateViewportChrome,{passive:true});
  window.addEventListener("resize",updateViewportChrome,{passive:true});
  updateViewportChrome();

  if(backTop){
    backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  }

  if(glow && window.matchMedia && !window.matchMedia("(pointer: coarse)").matches){
    glow.style.opacity="1";
    window.addEventListener("pointermove",(event)=>{
      glow.style.left=event.clientX+"px";
      glow.style.top=event.clientY+"px";
    },{passive:true});
    window.addEventListener("pointerleave",()=>glow.style.opacity="0");
    window.addEventListener("pointerenter",()=>glow.style.opacity="1");
  }

  const navLinks=[...document.querySelectorAll(".navlist a[data-nav]")];
  const sections=navLinks
    .map(link=>document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if("IntersectionObserver" in window && navLinks.length){
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const id="#"+entry.target.id;
        navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===id));
      });
    },{rootMargin:"-28% 0px -55% 0px",threshold:0.01});
    sections.forEach(section=>observer.observe(section));
  }

  document.addEventListener("keydown",(event)=>{
    if(event.key==="Escape"){
      document.body.classList.remove("nav-open");
    }
    if((event.key==="g" || event.key==="G") && !event.ctrlKey && !event.metaKey && !event.altKey){
      const tag=(document.activeElement?.tagName||"").toLowerCase();
      if(!["input","textarea","select"].includes(tag)){
        document.querySelector("#planner")?.scrollIntoView({behavior:"smooth"});
      }
    }
  });
})();


/* =========================================================
   LIVE TRAVEL + TRAVEL EDITORIAL ENHANCEMENTS
   ========================================================= */

const destinationImageFallbacks = {
  Hyderabad:"https://images.unsplash.com/photo-1750834115164-8c2658f18dd0?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Mumbai:"https://images.unsplash.com/photo-1529253355930-347a3b4a3435?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Bengaluru:"https://images.unsplash.com/photo-1644779504736-ed346f96a7bf?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Goa:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Manali:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Jaipur:"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Alappuzha:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Delhi:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Kochi:"https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Udaipur:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Rishikesh:"https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Munnar:"https://images.unsplash.com/photo-1672219386269-486cbbe9a50f?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Hampi:"https://images.unsplash.com/photo-1600100397608-f010f0f71dbe?auto=format&fit=crop&fm=jpg&q=92&w=3840",
};

const productionDestinationImages = {
  Hyderabad:"https://images.unsplash.com/photo-1750834115164-8c2658f18dd0?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Mumbai:"https://images.unsplash.com/photo-1529253355930-347a3b4a3435?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Bengaluru:"https://images.unsplash.com/photo-1644779504736-ed346f96a7bf?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Goa:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Manali:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Jaipur:"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Alappuzha:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Delhi:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Kochi:"https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Udaipur:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Rishikesh:"https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Munnar:"https://images.unsplash.com/photo-1672219386269-486cbbe9a50f?auto=format&fit=crop&fm=jpg&q=92&w=3840",
  Hampi:"https://images.unsplash.com/photo-1600100397608-f010f0f71dbe?auto=format&fit=crop&fm=jpg&q=92&w=3840",
};

var TRAVEL_IMAGE_FALLBACK =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#0b0f0d"/>' +
        '<stop offset=".48" stop-color="#1f8a5a"/>' +
        '<stop offset="1" stop-color="#a33631"/>' +
      '</linearGradient></defs>' +
      '<rect width="1600" height="900" fill="url(#g)"/>' +
      '<circle cx="1220" cy="220" r="150" fill="rgba(255,255,255,.12)"/>' +
      '<path d="M0 720 L350 410 L570 610 L850 300 L1240 700 L1450 500 L1600 720 V900 H0Z" fill="rgba(0,0,0,.28)"/>' +
      '<text x="80" y="800" fill="white" font-family="Arial,sans-serif" font-size="52" font-weight="700">TripPilot</text>' +
    '</svg>'
  );

var installTravelImageFallbacks = function(){
  document.querySelectorAll('img[src*="images.unsplash.com"]').forEach(function(img){
    if(img.dataset.fallbackBound==="1") return;
    img.dataset.fallbackBound="1";
    img.addEventListener("error",function(){
      if(img.dataset.fallbackUsed==="1") return;
      img.dataset.fallbackUsed="1";
      img.src=TRAVEL_IMAGE_FALLBACK;
      img.removeAttribute("srcset");
      img.classList.add("image-fallback-active");
    },{once:true});
  });
};

window.installTravelImageFallbacks = installTravelImageFallbacks;

Object.entries(productionDestinationImages).forEach(function(entry){
  var name=entry[0], url=entry[1];
  if(destinationData[name]) destinationData[name].imageUrl=url;
});

getDestinationCards = function(){
  return Object.entries(destinationData).map(function(entry){
    var name=entry[0], data=entry[1];
    return (
      '<article class="destination-card" data-destination-card data-name="' + escapeHTML(name) + '" data-type="' + escapeHTML(data.type) + '">' +
        '<div class="destination-image">' +
          '<img src="' + escapeHTML(data.imageUrl || productionDestinationImages[name] || destinationImageFallbacks[name] || TRAVEL_IMAGE_FALLBACK) + '" alt="' + escapeHTML(name) + ' travel destination" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=TRAVEL_IMAGE_FALLBACK;">' +
        '</div>' +
        '<div class="destination-overlay"></div>' +
        '<div class="destination-content">' +
          '<span class="destination-chip">' + escapeHTML(data.label) + ' · ' + escapeHTML(data.state) + '</span>' +
          '<h3>' + escapeHTML(name) + '</h3>' +
          '<p>' + escapeHTML(data.subtitle) + '</p>' +
          '<div class="destination-meta"><span>' + data.distance.toLocaleString("en-IN") + ' km reference</span><span>2–5 days</span></div>' +
          '<button class="destination-button" type="button" data-plan-destination="' + escapeHTML(name) + '">Plan ' + escapeHTML(name) + '</button>' +
        '</div>' +
      '</article>'
    );
  }).join("");
};

// The production image map is declared after the core boot sequence.
// Re-render once here so the final high-resolution image URLs are actually
// applied to the first visible Destination Studio paint.
if(document.readyState !== "loading"){
  setTimeout(function(){
    if(typeof renderDestinations === "function"){
      renderDestinations();
    }
    if(typeof installTravelImageFallbacks === "function"){
      installTravelImageFallbacks();
    }
  },0);
}

var LIVE_CACHE_KEY = "trippilot_live_cache_v1";
var LIVE_CACHE_TTL = 10 * 60 * 1000;
var liveMapInstance = null;
var liveRouteLayer = null;
var liveOriginMarker = null;
var liveDestinationMarker = null;
var livePreviewPlace = null;
var liveRequestKey = "";
var liveRefreshTimer = null;

function liveReadCache(key){
  try{
    var raw=sessionStorage.getItem(LIVE_CACHE_KEY);
    if(!raw) return null;
    var store=JSON.parse(raw);
    var item=store[key];
    if(!item || Date.now()-item.savedAt>LIVE_CACHE_TTL) return null;
    return item.data;
  }catch(error){ return null; }
}

function liveWriteCache(key,data){
  try{
    var raw=sessionStorage.getItem(LIVE_CACHE_KEY);
    var store=raw ? JSON.parse(raw) : {};
    store[key]={savedAt:Date.now(),data:data};
    sessionStorage.setItem(LIVE_CACHE_KEY,JSON.stringify(store));
  }catch(error){}
}

async function liveFetchJSON(url,timeout){
  var controller=new AbortController();
  var timer=setTimeout(function(){controller.abort();},timeout || 12000);
  try{
    var response=await fetch(url,{signal:controller.signal,cache:"no-store"});
    if(!response.ok) throw new Error("HTTP "+response.status);
    return await response.json();
  }finally{
    clearTimeout(timer);
  }
}

async function liveGeocode(query){
  var normalized=query.trim();
  var cacheKey="geo:"+normalized.toLowerCase();
  var cached=liveReadCache(cacheKey);
  if(cached) return cached;

  var url="https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(normalized)+"&count=1&language=en&format=json";
  var data=await liveFetchJSON(url);
  if(!data.results || !data.results.length) throw new Error("Location not found");

  var place=data.results[0];
  var result={
    name:place.name,
    admin1:place.admin1 || "",
    country:place.country || "",
    countryCode:place.country_code || "",
    latitude:Number(place.latitude),
    longitude:Number(place.longitude),
    timezone:place.timezone || "auto"
  };

  liveWriteCache(cacheKey,result);
  return result;
}

async function liveWeather(place){
  var cacheKey="weather:"+place.latitude.toFixed(3)+","+place.longitude.toFixed(3);
  var cached=liveReadCache(cacheKey);
  if(cached) return cached;

  var url="https://api.open-meteo.com/v1/forecast" +
    "?latitude="+encodeURIComponent(place.latitude) +
    "&longitude="+encodeURIComponent(place.longitude) +
    "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,visibility,cloud_cover" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max" +
    "&forecast_days=5&timezone=auto";

  var data=await liveFetchJSON(url);
  liveWriteCache(cacheKey,data);
  return data;
}

function liveWeatherMeta(code,isDay){
  var c=Number(code);
  if(c===0) return {label:"Clear sky",icon:isDay ? "bx-sun" : "bx-moon"};
  if([1,2].includes(c)) return {label:"Partly cloudy",icon:isDay ? "bx-sun" : "bx-cloud"};
  if(c===3) return {label:"Overcast",icon:"bx-cloud"};
  if([45,48].includes(c)) return {label:"Foggy",icon:"bx-cloud"};
  if([51,53,55,56,57].includes(c)) return {label:"Drizzle",icon:"bx-cloud-drizzle"};
  if([61,63,65,66,67].includes(c)) return {label:"Rain",icon:"bx-cloud-rain"};
  if([71,73,75,77,85,86].includes(c)) return {label:"Snow",icon:"bx-cloud-snow"};
  if([80,81,82].includes(c)) return {label:"Rain showers",icon:"bx-cloud-rain"};
  if([95,96,99].includes(c)) return {label:"Thunderstorm",icon:"bx-cloud-lightning"};
  return {label:"Changing conditions",icon:"bx-cloud"};
}

function liveLocalTime(timezone){
  try{
    return new Intl.DateTimeFormat("en-IN",{timeZone:timezone,weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit",hour12:true}).format(new Date());
  }catch(error){
    return new Intl.DateTimeFormat("en-IN",{weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit",hour12:true}).format(new Date());
  }
}

function liveDayLabel(value,timezone){
  try{
    return new Intl.DateTimeFormat("en-IN",{timeZone:timezone,weekday:"short"}).format(new Date(value+"T12:00:00"));
  }catch(error){ return value.slice(5); }
}

function renderLiveWeather(place,data){
  var panel=$("liveWeatherPanel");
  if(!panel) return;

  var current=data.current || {};
  var meta=liveWeatherMeta(current.weather_code,current.is_day !== 0);
  var daily=data.daily || {};
  var forecast=(daily.time || []).map(function(date,index){
    var m=liveWeatherMeta(daily.weather_code && daily.weather_code[index],true);
    var high=Math.round(Number((daily.temperature_2m_max && daily.temperature_2m_max[index]) != null ? daily.temperature_2m_max[index] : 0));
    var low=Math.round(Number((daily.temperature_2m_min && daily.temperature_2m_min[index]) != null ? daily.temperature_2m_min[index] : 0));
    var rain=Math.round(Number((daily.precipitation_probability_max && daily.precipitation_probability_max[index]) != null ? daily.precipitation_probability_max[index] : 0));
    return '<div class="live-forecast-card">' +
      '<div class="day">' + escapeHTML(index===0 ? "Today" : liveDayLabel(date,place.timezone)) + '</div>' +
      '<div class="icon"><i class="bx ' + m.icon + '"></i></div>' +
      '<strong>' + high + '° / ' + low + '°</strong>' +
      '<small>' + rain + '% rain</small>' +
      '</div>';
  }).join("");

  panel.innerHTML=
    '<div class="live-weather-top">' +
      '<div class="live-weather-location">' +
        '<span class="live-location-icon"><i class="bx bx-map-pin"></i></span>' +
        '<div><strong>' + escapeHTML(place.name) + '</strong><small>' + escapeHTML(place.admin1 || place.country) + '</small></div>' +
      '</div>' +
      '<span class="live-weather-badge">CURRENT CONDITIONS</span>' +
    '</div>' +
    '<div class="live-current">' +
      '<div class="live-temp">' + Math.round(Number(current.temperature_2m || 0)) + '<sup>°C</sup></div>' +
      '<div><div class="live-condition">' + escapeHTML(meta.label) + '</div>' +
      '<div class="live-feels">Feels like ' + Math.round(Number(current.apparent_temperature != null ? current.apparent_temperature : current.temperature_2m || 0)) + '°C</div>' +
      '<div class="live-time"><i class="bx bx-time-five"></i> ' + escapeHTML(liveLocalTime(place.timezone)) + '</div></div>' +
    '</div>' +
    '<div class="live-stat-grid">' +
      '<div class="live-stat"><span>Humidity</span><strong>' + Math.round(Number(current.relative_humidity_2m || 0)) + '%</strong></div>' +
      '<div class="live-stat"><span>Wind</span><strong>' + Math.round(Number(current.wind_speed_10m || 0)) + ' km/h</strong></div>' +
      '<div class="live-stat"><span>Cloud cover</span><strong>' + Math.round(Number(current.cloud_cover || 0)) + '%</strong></div>' +
      '<div class="live-stat"><span>Visibility</span><strong>' + (Number.isFinite(Number(current.visibility)) ? Math.max(0.1,Number(current.visibility)/1000).toFixed(1) : "—") + ' km</strong></div>' +
    '</div>' +
    '<div class="live-extra-row">' +
      '<div class="live-stat sunrise"><span>Sunrise</span><strong>' + escapeHTML((data.daily && data.daily.sunrise && data.daily.sunrise[0]) ? data.daily.sunrise[0].slice(11,16) : "—") + '</strong></div>' +
      '<div class="live-stat sunset"><span>Sunset</span><strong>' + escapeHTML((data.daily && data.daily.sunset && data.daily.sunset[0]) ? data.daily.sunset[0].slice(11,16) : "—") + '</strong></div>' +
      '<div class="live-stat"><span>UV max</span><strong>' + (data.daily && data.daily.uv_index_max && data.daily.uv_index_max[0] != null ? Number(data.daily.uv_index_max[0]).toFixed(1) : "—") + '</strong></div>' +
    '</div>' +
    '<div class="live-forecast">' + forecast + '</div>';
}

function renderMapPreviewFallback(originName,destinationName,reason){
  var node=$("tripMap");
  if(!node) return;

  var fallback=node.querySelector(".map-preview-fallback");
  if(!fallback){
    fallback=document.createElement("div");
    fallback.className="map-preview-fallback";
    fallback.innerHTML=
      '<div class="map-preview-grid"></div>' +
      '<svg class="map-preview-route" viewBox="0 0 640 320" aria-hidden="true">' +
        '<path d="M88 230 C150 195 182 248 238 188 S334 96 406 134 S516 178 560 86" pathLength="1"></path>' +
        '<circle cx="88" cy="230" r="13" class="origin-dot"></circle>' +
        '<circle cx="560" cy="86" r="13" class="destination-dot"></circle>' +
        '<circle cx="88" cy="230" r="28" class="pulse-dot origin-pulse"></circle>' +
        '<circle cx="560" cy="86" r="28" class="pulse-dot destination-pulse"></circle>' +
      '</svg>' +
      '<div class="map-preview-label map-preview-origin"></div>' +
      '<div class="map-preview-label map-preview-destination"></div>' +
      '<div class="map-preview-status"><i class="bx bx-map"></i><span></span></div>';
    node.appendChild(fallback);
  }

  fallback.querySelector(".map-preview-origin").textContent=originName || "Origin";
  fallback.querySelector(".map-preview-destination").textContent=destinationName || "Destination";
  fallback.querySelector(".map-preview-status span").textContent=reason || "Route preview active";
  fallback.classList.add("show");
}

function hideMapPreviewFallback(){
  var node=$("tripMap");
  var fallback=node?.querySelector(".map-preview-fallback");
  if(fallback) fallback.classList.remove("show");
}

function renderLiveOfflinePreview(place){
  var panel=$("liveWeatherPanel");
  if(!panel) return;

  var name=place?.name || state.trip.destination || "your destination";
  var admin=place?.admin1 ? " · "+place.admin1 : "";

  panel.innerHTML=
    '<div class="live-offline-card">' +
      '<div class="live-offline-icon"><i class="bx bx-signal-5"></i></div>' +
      '<span class="live-weather-badge">PREVIEW MODE</span>' +
      '<h3>TripPilot is ready for '+escapeHTML(name)+'</h3>' +
      '<p>Live weather is unavailable right now, but your destination workspace remains ready. Refresh later to reconnect live conditions.</p>' +
      '<div class="live-offline-facts">' +
        '<span><i class="bx bx-map-pin"></i>'+escapeHTML(name)+escapeHTML(admin)+'</span>' +
        '<span><i class="bx bx-time-five"></i>Planning tools remain available</span>' +
      '</div>' +
      '<button class="btn primary-btn" type="button" id="liveRetryButton"><i class="bx bx-refresh"></i> Refresh live data</button>' +
    '</div>';

  $("liveRetryButton")?.addEventListener("click",function(){refreshLiveTravel(true);});
}

function initLiveMap(){
  var node=$("tripMap");
  if(!node) return null;

  if(liveMapInstance){
    try{window.setTimeout(function(){liveMapInstance.invalidateSize();},40);}catch(error){}
    return liveMapInstance;
  }

  if(!window.L){
    renderMapPreviewFallback(state.trip.from || "Hyderabad",state.trip.destination || "Goa","Map library unavailable · route preview active");
    return null;
  }

  try{
    liveMapInstance=L.map(node,{zoomControl:true,scrollWheelZoom:false,attributionControl:true});
    renderMapPreviewFallback(
      state.trip.from || "Hyderabad",
      state.trip.destination || "Goa",
      "Loading interactive map…"
    );
    var tiles=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
      maxZoom:19,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    });

    tiles.on("load",function(){
      hideMapPreviewFallback();
      try{liveMapInstance.invalidateSize();}catch(error){}
    });

    tiles.on("tileerror",function(){
      renderMapPreviewFallback(
        state.trip.from || "Hyderabad",
        state.trip.destination || "Goa",
        "Map tiles unavailable · route preview active"
      );
    });

    tiles.addTo(liveMapInstance);

    window.setTimeout(function(){
      try{liveMapInstance.invalidateSize();}catch(error){}
    },80);

    return liveMapInstance;
  }catch(error){
    liveMapInstance=null;
    renderMapPreviewFallback(
      state.trip.from || "Hyderabad",
      state.trip.destination || "Goa",
      "Interactive map unavailable · route preview active"
    );
    return null;
  }
}

async function liveRoute(origin,destination){
  if(!window.L){
    renderMapPreviewFallback(origin.name,destination.name,"Map library unavailable · route preview active");
    return null;
  }

  var map=initLiveMap();
  if(!map) return null;

  var key=origin.latitude.toFixed(4)+","+origin.longitude.toFixed(4)+"|"+destination.latitude.toFixed(4)+","+destination.longitude.toFixed(4);
  var cacheKey="route:"+key;
  var data=liveReadCache(cacheKey);

  if(!data){
    var url="https://router.project-osrm.org/route/v1/driving/"+
      origin.longitude+","+origin.latitude+";"+
      destination.longitude+","+destination.latitude+
      "?overview=full&geometries=geojson&alternatives=true";

    try{
      data=await liveFetchJSON(url);
      liveWriteCache(cacheKey,data);
    }catch(error){
      data=null;
    }
  }

  if(liveRouteLayer) liveRouteLayer.remove();
  if(liveOriginMarker) liveOriginMarker.remove();
  if(liveDestinationMarker) liveDestinationMarker.remove();

  liveOriginMarker=L.circleMarker(
    [origin.latitude,origin.longitude],
    {radius:8,color:"#a33631",weight:3,fillColor:"#a33631",fillOpacity:.88}
  ).addTo(map).bindPopup("<strong>"+escapeHTML(origin.name)+"</strong><br>Origin");

  liveDestinationMarker=L.circleMarker(
    [destination.latitude,destination.longitude],
    {radius:8,color:"#1f8a5a",weight:3,fillColor:"#1f8a5a",fillOpacity:.88}
  ).addTo(map).bindPopup("<strong>"+escapeHTML(destination.name)+"</strong><br>Destination");

  if(data?.code==="Ok" && data.routes && data.routes.length){
    var route=data.routes[0];
    liveRouteLayer=L.geoJSON(route.geometry,{
      style:{color:"#a33631",weight:5,opacity:.83,dashArray:"9 7"}
    }).addTo(map);

    var bounds=L.latLngBounds([[origin.latitude,origin.longitude],[destination.latitude,destination.longitude]]);
    route.geometry.coordinates.forEach(function(pair){bounds.extend([pair[1],pair[0]]);});
    map.fitBounds(bounds.pad(.12));
    hideMapPreviewFallback();

    return {distanceKm:route.distance/1000,durationMin:route.duration/60};
  }

  map.fitBounds(
    L.latLngBounds(
      [[origin.latitude,origin.longitude],[destination.latitude,destination.longitude]]
    ).pad(.18)
  );

  renderMapPreviewFallback(
    origin.name,
    destination.name,
    "Road geometry unavailable · route preview active"
  );
  return null;
}

function updateLiveRouteText(origin,destination,route){
  $("liveRouteTitle").textContent=origin.name+" → "+destination.name;
  $("liveRouteMeta").textContent=route ?
    "Road-routing reference · "+Math.round(route.distanceKm).toLocaleString("en-IN")+" km · "+Math.floor(route.durationMin/60)+" h "+Math.round(route.durationMin%60)+" min" :
    "Road-routing reference · route preview active";

  $("liveOpenMaps").href="https://www.openstreetmap.org/?mlat="+destination.latitude+"&mlon="+destination.longitude+"#map=10/"+destination.latitude+"/"+destination.longitude;
}

function renderLiveError(message){
  renderLiveOfflinePreview(livePreviewPlace || {name:state.trip.destination || "your destination"});
  renderMapPreviewFallback(
    state.trip.from || "Hyderabad",
    state.trip.destination || "Goa",
    "Live location unavailable · route preview active"
  );
  var sync=$("liveSync");
  if(sync) sync.textContent="Preview mode · live refresh unavailable";
}

async function refreshLiveTravel(force){
  var sync=$("liveSync");
  if(sync) sync.textContent="Syncing live data…";

  var originName=state.trip.from || state.settings.home || "Hyderabad";
  var destinationName=livePreviewPlace?.name || state.trip.destination || "Goa";
  var requestKey=originName.trim().toLowerCase()+"|"+destinationName.trim().toLowerCase();

  if(!force && requestKey===liveRequestKey &&
     liveReadCache("geo:"+originName.toLowerCase()) &&
     liveReadCache("geo:"+destinationName.toLowerCase())){
    if(sync) sync.textContent="Live data cached · just now";
    return;
  }

  liveRequestKey=requestKey;

  var places;
  try{
    places=await Promise.all([
      liveGeocode(originName),
      livePreviewPlace || liveGeocode(destinationName)
    ]);
  }catch(error){
    renderLiveError(
      error && error.message==="Location not found"
        ? "Use a city or destination name such as Hyderabad, Goa, Mumbai or Bengaluru."
        : "Live location services are unavailable right now."
    );
    return;
  }

  var origin=places[0];
  var destination=places[1];

  var weather=null;
  try{
    weather=await liveWeather(destination);
  }catch(error){
    renderLiveOfflinePreview(destination);
  }

  var air=null;
  if(weather && typeof liveAirQuality==="function"){
    air=await liveAirQuality(destination).catch(function(){return null;});
  }

  if(weather){
    renderLiveWeather(destination,weather);
    if(typeof injectAqi==="function") injectAqi(air);
  }

  var route=await liveRoute(origin,destination);
  updateLiveRouteText(origin,destination,route);

  var statusParts=[];
  if(weather) statusParts.push("Weather");
  if(route) statusParts.push("Route");
  if(air) statusParts.push("Air quality");

  if(sync){
    if(statusParts.length===3){
      sync.textContent="Live data updated";
    }else if(statusParts.length){
      sync.textContent="Live "+statusParts.join(" + ")+" updated";
    }else{
      sync.textContent="Preview mode · live data unavailable";
    }
  }
}

function initLiveTravel(){
  if(!$("liveWeatherPanel")) return;

  $("livePlaceButton")?.addEventListener("click",async function(){
    var input=$("livePlaceSearch");
    var value=input?.value.trim();
    if(!value){showToast("Enter a destination to preview.");return;}
    try{
      var place=await liveGeocode(value);
      livePreviewPlace=place;
      await refreshLiveTravel(true);
      showToast(place.name+" is now in Live Travel.");
    }catch(error){
      showToast("That destination could not be found.");
    }
  });

  $("livePlaceSearch")?.addEventListener("keydown",function(event){
    if(event.key==="Enter"){event.preventDefault();$("livePlaceButton")?.click();}
  });

  $("liveResetButton")?.addEventListener("click",function(){
    livePreviewPlace=null;
    var input=$("livePlaceSearch");
    if(input) input.value="";
    refreshLiveTravel(true);
  });

  initLiveMap();
  renderDestinations();
  refreshLiveTravel(true);

  clearInterval(liveRefreshTimer);
  liveRefreshTimer=setInterval(function(){refreshLiveTravel(true);},10*60*1000);

  var baseRenderAll=renderAll;
  renderAll=function(){
    baseRenderAll();
    window.setTimeout(function(){refreshLiveTravel(false);},0);
  };
}

if(typeof transportData!=="undefined" && !transportData["Self Drive"]){
  transportData["Self Drive"]={
    icon:"bx-car",kicker:"ROAD TRIP",title:"Self-drive flexibility",
    description:"A private road option for flexible departure times and multi-stop travel.",
    duration:"Route dependent",estimate:"Own / variable",color:"green"
  };
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",initLiveTravel,{once:true});
}else{
  initLiveTravel();
}


/* =========================================================
   REAL TRAVEL DESK
   ========================================================= */
(function(){
  var deskService="flight";
  var deskRecentKey="trippilot_desk_recent_v1";
  var deskProviderLinks={
    flight:"https://www.google.com/travel/flights",
    hotel:"https://www.google.com/travel/search?q=hotels",
    train:"https://www.irctc.co.in/nget/train-search",
    bus:"https://www.redbus.in/",
    cab:"https://www.uber.com/in/en/",
    activities:"https://www.google.com/travel/things-to-do",
    holidays:"https://www.thomascook.in/holidays",
    insurance:"https://www.policybazaar.com/travel-insurance/"
  };

  var deskServiceMeta={
    flight:{kicker:"FLIGHT SEARCH",title:"Find a flight for your route",icon:"bx-paper-plane"},
    hotel:{kicker:"HOTEL SEARCH",title:"Find a stay that fits the trip",icon:"bx-building-house"},
    train:{kicker:"TRAIN SEARCH",title:"Search trains by route and date",icon:"bx-train"},
    bus:{kicker:"BUS SEARCH",title:"Compare bus options for your route",icon:"bx-bus"},
    cab:{kicker:"CAB SEARCH",title:"Plan the road leg of your journey",icon:"bx-car"},
    activities:{kicker:"ACTIVITY SEARCH",title:"Find things to do at the destination",icon:"bx-map-pin"},
    holidays:{kicker:"HOLIDAY PACKAGES",title:"Explore complete trip packages",icon:"bx-sun"},
    insurance:{kicker:"TRAVEL PROTECTION",title:"Check travel protection options",icon:"bx-shield-quarter"},
    currency:{kicker:"LIVE CURRENCY",title:"Convert your travel money",icon:"bx-transfer-alt"}
  };

  function deskVal(id){
    var node=$(id);
    return node ? node.value.trim() : "";
  }

  function deskDateValue(offset){
    var d=new Date();
    d.setDate(d.getDate()+offset);
    var local=new Date(d.getTime()-d.getTimezoneOffset()*60000);
    return local.toISOString().slice(0,10);
  }

  function deskRecentRead(){
    try{
      var raw=localStorage.getItem(deskRecentKey);
      var arr=raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    }catch(error){return []}
  }

  function deskRecentWrite(item){
    var arr=deskRecentRead().filter(function(x){
      return !(x.service===item.service && x.signature===item.signature);
    });
    arr.unshift(item);
    localStorage.setItem(deskRecentKey,JSON.stringify(arr.slice(0,8)));
    deskRenderRecent();
  }

  function deskRenderRecent(){
    var box=$("deskRecentList");
    if(!box) return;
    var arr=deskRecentRead();
    if(!arr.length){
      box.innerHTML='<span class="desk-empty-recent">No saved searches yet.</span>';
      return;
    }
    box.innerHTML=arr.map(function(item,index){
      return '<button class="desk-recent-item" type="button" data-recent-index="'+index+'">' +
        '<i class="bx '+(deskServiceMeta[item.service]?.icon || "bx-search")+'"></i>' +
        '<span>'+escapeHTML(item.label)+'</span>' +
      '</button>';
    }).join("");
    box.querySelectorAll("[data-recent-index]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var item=arr[Number(btn.dataset.recentIndex)];
        if(!item) return;
        deskLoadState(item);
      });
    });
  }

  function deskField(label,id,icon,type,value,extra){
    return '<div class="desk-field'+(extra?.full?' full':'')+'">' +
      '<label for="'+id+'">'+label+'</label>' +
      '<div class="desk-field-wrap"><i class="bx '+icon+'"></i>' +
      '<input id="'+id+'" type="'+type+'" value="'+escapeHTML(value || '')+'" '+(extra?.placeholder?'placeholder="'+escapeHTML(extra.placeholder)+'"':'')+' '+(extra?.min?'min="'+extra.min+'"':'')+'></div>' +
    '</div>';
  }

  function deskSelect(label,id,icon,options,value,extra){
    return '<div class="desk-field'+(extra?.full?' full':'')+'">' +
      '<label for="'+id+'">'+label+'</label>' +
      '<div class="desk-field-wrap"><i class="bx '+icon+'"></i><select id="'+id+'">' +
      options.map(function(opt){return '<option value="'+escapeHTML(opt[0])+'" '+(opt[0]===value?'selected':'')+'>'+escapeHTML(opt[1])+'</option>';}).join("") +
      '</select></div></div>';
  }

  function deskRenderFields(){
    var box=$("travelDeskFields");
    if(!box) return;
    var today=deskDateValue(0);
    var plus1=deskDateValue(1);
    var plus4=deskDateValue(4);
    var from=state.trip.from || state.settings.home || "Hyderabad";
    var to=state.trip.destination || "Goa";
    var html="";
    if(deskService==="flight"){
      html+=deskField("From","deskFrom","bx-map-pin","text",from,{placeholder:"City or airport"});
      html+=deskField("To","deskTo","bx-flag","text",to,{placeholder:"City or airport"});
      html+=deskField("Departure","deskDeparture","bx-calendar","date",today);
      html+=deskField("Return","deskReturn","bx-calendar-event","date",plus4);
      html+=deskField("Travellers","deskTravellers","bx-group","number",String(state.trip.travelers || 2),{min:"1"});
      html+=deskSelect("Cabin class","deskCabin","bx-chair",[["economy","Economy / Premium Economy"],["premium","Premium Economy"],["business","Business"],["first","First"]],"economy");
      html+=deskField("Trip type","deskTripType","bx-git-compare","text","Round trip",{placeholder:"One way / Round trip / Multi-city"});
    }else if(deskService==="hotel"){
      html+=deskField("City / hotel","deskHotelCity","bx-building-house","text",to,{placeholder:"Destination or property"});
      html+=deskField("Check-in","deskCheckIn","bx-calendar","date",today);
      html+=deskField("Check-out","deskCheckOut","bx-calendar-event","date",plus4);
      html+=deskField("Rooms","deskRooms","bx-door-open","number","1",{min:"1"});
      html+=deskField("Guests","deskGuests","bx-group","number",String(state.trip.travelers || 2),{min:"1"});
      html+=deskSelect("Stay style","deskStayStyle","bx-star",[["budget","Budget"],["comfort","Comfort"],["premium","Premium"]],String(state.trip.stay || "Comfort").toLowerCase());
    }else if(["train","bus","cab"].includes(deskService)){
      html+=deskField("From","deskFrom","bx-map-pin","text",from,{placeholder:"Departure city"});
      html+=deskField("To","deskTo","bx-flag","text",to,{placeholder:"Arrival city"});
      html+=deskField("Travel date","deskTravelDate","bx-calendar","date",plus1);
      html+=deskField("Travellers","deskTravellers","bx-group","number",String(state.trip.travelers || 2),{min:"1"});
      if(deskService==="train") html+=deskSelect("Class","deskTrainClass","bx-chair",[["all","Any class"],["sleeper","Sleeper"],["3a","AC 3 Tier"],["2a","AC 2 Tier"],["1a","AC First Class"]],"all");
      if(deskService==="bus") html+=deskSelect("Bus type","deskBusType","bx-bus",[["any","Any type"],["ac","AC Seater"],["sleeper","AC Sleeper"],["luxury","Luxury"],["volvo","Volvo"]],"any");
      if(deskService==="cab") html+=deskSelect("Cab type","deskCabType","bx-car",[["sedan","Sedan"],["suv","SUV"],["premium","Premium"],["outstation","Outstation"]],"sedan");
    }else if(["activities","holidays"].includes(deskService)){
      html+=deskField("Destination","deskDestination","bx-map-pin","text",to,{placeholder:"Where are you going?"});
      html+=deskField("Start date","deskStartDate","bx-calendar","date",today);
      html+=deskField("Travellers","deskTravellers","bx-group","number",String(state.trip.travelers || 2),{min:"1"});
      html+=deskSelect("Travel style","deskTravelStyle","bx-sparkles",[["balanced","Balanced"],["relaxed","Relaxed"],["adventure","Adventure"],["culture","Culture"],["food","Food"]],String(state.trip.style || "Balanced").toLowerCase());
      html+=deskField("Budget","deskTripBudget","bx-wallet","number",String(Math.round(calculateTripBudget())),{min:"0"});
    }else if(deskService==="insurance"){
      html+=deskField("Destination","deskInsuranceDestination","bx-map-pin","text",to,{placeholder:"Country or destination"});
      html+=deskField("Start date","deskInsuranceStart","bx-calendar","date",today);
      html+=deskField("End date","deskInsuranceEnd","bx-calendar-event","date",plus4);
      html+=deskField("Travellers","deskTravellers","bx-group","number",String(state.trip.travelers || 2),{min:"1"});
      html+=deskSelect("Plan","deskInsurancePlan","bx-shield-quarter",[["single","Single trip"],["annual","Annual multi-trip"],["student","Student / long-term"]],"single");
    }else if(deskService==="currency"){
      html+=deskField("Amount","deskAmount","bx-wallet","number","100",{min:"0",placeholder:"Enter amount"});
      html+=deskSelect("From currency","deskFromCurrency","bx-transfer-alt",[["INR","Indian Rupee (INR)"],["USD","US Dollar (USD)"],["EUR","Euro (EUR)"],["GBP","British Pound (GBP)"],["AED","UAE Dirham (AED)"],["SGD","Singapore Dollar (SGD)"],["THB","Thai Baht (THB)"]],"INR");
      html+=deskSelect("To currency","deskToCurrency","bx-transfer-alt",[["USD","US Dollar (USD)"],["EUR","Euro (EUR)"],["AED","UAE Dirham (AED)"],["SGD","Singapore Dollar (SGD)"],["GBP","British Pound (GBP)"],["INR","Indian Rupee (INR)"],["THB","Thai Baht (THB)"]],"USD");
      html+=deskField("Trip destination","deskCurrencyDestination","bx-flag","text",to,{placeholder:"Optional context"});
    }
    box.innerHTML=html;
  }

  async function deskCurrencyConvert(amount,from,to){
    if(from===to) return {rate:1,date:new Date().toISOString().slice(0,10)};
    var url="https://api.frankfurter.dev/v2/rate/"+encodeURIComponent(from)+"/"+encodeURIComponent(to);
    var data=await liveFetchJSON(url,10000);
    return {rate:Number(data.rate),date:data.date};
  }

  function deskResultHtml(summary,provider){
    return '<div class="desk-preview-head">' +
      '<div><div class="desk-preview-route">'+escapeHTML(summary.title)+'</div><div class="desk-preview-meta">'+escapeHTML(summary.subtitle)+'</div></div>' +
      '<span class="desk-preview-status">READY</span>' +
      '</div>' +
      '<div class="desk-preview-list">'+summary.rows.map(function(row){
        return '<div class="desk-preview-row"><span>'+escapeHTML(row[0])+'</span><strong>'+escapeHTML(row[1])+'</strong></div>';
      }).join("")+'</div>' +
      '<div class="desk-provider-note"><i class="bx bx-info-circle"></i>'+escapeHTML(summary.note)+'</div>' +
      '<a class="desk-open-provider" href="'+escapeHTML(provider)+'" target="_blank" rel="noopener noreferrer"><i class="bx bx-link-external"></i> Continue to live search</a>';
  }

  async function deskSearch(){
    if(deskService==="currency"){
      var amount=Number(deskVal("deskAmount") || 0);
      var from=deskVal("deskFromCurrency") || "INR";
      var to=deskVal("deskToCurrency") || "USD";
      if(amount<0){showToast("Enter a valid amount.");return;}
      var result=$("travelDeskResult");
      result.innerHTML='<div class="desk-result-empty"><span class="live-loader"></span><div style="margin-top:15px"><strong>Refreshing live rate…</strong><small>Fetching the latest available reference rate.</small></div></div>';
      try{
        var data=await deskCurrencyConvert(amount,from,to);
        var converted=amount*data.rate;
        result.innerHTML=
          '<div style="width:100%"><span class="panel-kicker">LIVE CONVERSION</span>' +
          '<h3 style="margin-top:7px">Travel money snapshot</h3>' +
          '<div class="desk-currency-result"><div class="rate">'+escapeHTML(amount.toLocaleString("en-IN",{maximumFractionDigits:2}))+' '+escapeHTML(from)+' → '+escapeHTML(converted.toLocaleString("en-IN",{maximumFractionDigits:2}))+' '+escapeHTML(to)+'</div>' +
          '<small>1 '+escapeHTML(from)+' = '+escapeHTML(data.rate.toFixed(4))+' '+escapeHTML(to)+'</small>' +
          '<div class="desk-currency-rate-note"><span>Rate date</span><strong>'+escapeHTML(data.date)+'</strong></div></div>' +
          '<div class="desk-provider-note"><i class="bx bx-refresh"></i>Reference rate from Frankfurter. Exchange prices can move; verify the rate with your payment or FX provider before exchanging money.</div></div>';
        deskRecentWrite({
          service:"currency",
          signature:from+"|"+to+"|"+amount,
          label:amount+" "+from+" → "+to,
          values:deskCaptureValues()
        });
        return;
      }catch(error){
        result.innerHTML='<div class="desk-result-empty"><div class="desk-result-icon"><i class="bx bx-error"></i></div><span class="panel-kicker">RATE UNAVAILABLE</span><h3>Could not refresh the rate</h3><p>Check your connection and try again.</p></div>';
        return;
      }
    }

    var summary;
    if(deskService==="flight"){
      summary={title:deskVal("deskFrom")+" → "+deskVal("deskTo"),subtitle:deskVal("deskDeparture")+" · "+deskVal("deskReturn"),rows:[
        ["Travellers",deskVal("deskTravellers")],
        ["Cabin",deskVal("deskCabin")],
        ["Trip type",deskVal("deskTripType")]
      ],note:"Your route and travel preferences are ready. Continue to the live provider to see current inventory, fares, filters and booking options."};
    }else if(deskService==="hotel"){
      summary={title:deskVal("deskHotelCity"),subtitle:deskVal("deskCheckIn")+" → "+deskVal("deskCheckOut"),rows:[
        ["Rooms",deskVal("deskRooms")],
        ["Guests",deskVal("deskGuests")],
        ["Stay style",deskVal("deskStayStyle")]
      ],note:"Live hotel availability, room types, cancellation terms and current rates are shown by the booking provider."};
    }else if(["train","bus","cab"].includes(deskService)){
      summary={title:deskVal("deskFrom")+" → "+deskVal("deskTo"),subtitle:deskVal("deskTravelDate"),rows:[
        ["Travellers",deskVal("deskTravellers")],
        ["Preference",deskService==="train"?deskVal("deskTrainClass"):deskService==="bus"?deskVal("deskBusType"):deskVal("deskCabType")]
      ],note:"The provider will return live schedules, availability, operator options and current pricing for this route."};
    }else if(["activities","holidays"].includes(deskService)){
      summary={title:deskVal("deskDestination"),subtitle:deskVal("deskStartDate"),rows:[
        ["Travellers",deskVal("deskTravellers")],
        ["Travel style",deskVal("deskTravelStyle")],
        ["Planning budget",deskVal("deskTripBudget") ? rupee(deskVal("deskTripBudget")) : "Not set"]
      ],note:"Continue to the provider for live experiences or package inventory, current prices and bookable availability."};
    }else{
      summary={title:deskVal("deskInsuranceDestination"),subtitle:deskVal("deskInsuranceStart")+" → "+deskVal("deskInsuranceEnd"),rows:[
        ["Travellers",deskVal("deskTravellers")],
        ["Plan",deskVal("deskInsurancePlan")]
      ],note:"Insurance terms, eligibility, exclusions and current premiums are displayed by the provider. Review the policy wording before purchase."};
    }

    $("travelDeskResult").innerHTML=deskResultHtml(summary,deskProviderLinks[deskService]);
    var signature=JSON.stringify(summary.rows)+"|"+summary.title+"|"+summary.subtitle;
    deskRecentWrite({
      service:deskService,
      signature:signature,
      label:summary.title+" · "+summary.subtitle,
      summary:summary,
      values:deskCaptureValues()
    });
    showToast("Search preview ready. Continue to the live provider.");
  }

  function deskApplyValues(values){
    if(!values) return;
    Object.keys(values).forEach(function(id){
      var node=$(id);
      if(node) node.value=values[id];
    });
  }

  function deskCaptureValues(){
    var values={};
    var fields=$("travelDeskFields");
    if(!fields) return values;
    fields.querySelectorAll("input,select").forEach(function(node){
      if(node.id) values[node.id]=node.value;
    });
    return values;
  }

  function deskLoadState(item){
    deskService=item.service || "flight";
    document.querySelectorAll(".desk-tab").forEach(function(btn){
      btn.classList.toggle("active",btn.dataset.deskService===deskService);
    });
    $("deskKicker").textContent=deskServiceMeta[deskService].kicker;
    $("deskTitle").textContent=deskServiceMeta[deskService].title;
    deskRenderFields();
    deskApplyValues(item.values || {});
    var box=$("travelDeskResult");
    if(box) box.innerHTML=deskResultHtml(item.summary || {
      title:item.label,subtitle:"Saved search",rows:[],note:"This saved search is a local planning shortcut. Start a fresh live search to refresh current inventory."
    },deskProviderLinks[deskService] || "https://www.google.com/travel/");
    showToast("Saved search loaded.");
  }

  function deskInit(){
    if(!$("travelDeskFields")) return;
    document.querySelectorAll(".desk-tab").forEach(function(btn){
      btn.addEventListener("click",function(){
        deskService=btn.dataset.deskService;
        document.querySelectorAll(".desk-tab").forEach(function(item){item.classList.toggle("active",item===btn)});
        $("deskKicker").textContent=deskServiceMeta[deskService].kicker;
        $("deskTitle").textContent=deskServiceMeta[deskService].title;
        deskRenderFields();
        $("travelDeskResult").innerHTML='<div class="desk-result-empty"><div class="desk-result-icon"><i class="bx '+deskServiceMeta[deskService].icon+'"></i></div><span class="panel-kicker">'+escapeHTML(deskServiceMeta[deskService].kicker)+'</span><h3>Build your search</h3><p>Fill in the fields and continue to the live provider when you are ready.</p></div>';
      });
    });

    $("travelDeskSearch").addEventListener("click",deskSearch);
    $("travelDeskSave").addEventListener("click",function(){
      var label=deskService==="currency" ? ((deskVal("deskAmount")||"100")+" "+(deskVal("deskFromCurrency")||"INR")+" → "+(deskVal("deskToCurrency")||"USD")) : ((deskVal("deskFrom")||deskVal("deskHotelCity")||deskVal("deskDestination")||deskVal("deskInsuranceDestination")||"Trip")+" → "+(deskVal("deskTo")||"search"));
      var item={service:deskService,signature:Date.now().toString(),label:label,values:deskCaptureValues()};
      deskRecentWrite(item);
      showToast("Search saved locally.");
    });

    $("deskClearRecent").addEventListener("click",function(){
      localStorage.removeItem(deskRecentKey);
      deskRenderRecent();
      showToast("Recent searches cleared.");
    });

    deskRenderFields();
    deskRenderRecent();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",deskInit,{once:true});
  else deskInit();
})();


/* =========================================================
   TRAVEL DESK QA POLISH + LIVE AIR QUALITY
   ========================================================= */
(function(){
  function deskSnapshot(){
    var fields=$("travelDeskFields");
    if(!fields) return {};
    var snap={};
    fields.querySelectorAll("input,select").forEach(function(node){
      if(node.id) snap[node.id]=node.value;
    });
    return snap;
  }

  function deskApplySnapshot(snap){
    if(!snap) return;
    Object.keys(snap).forEach(function(id){
      var node=$(id);
      if(node) node.value=snap[id];
    });
  }

  if(typeof deskRecentRead==="function"){
    // Upgrade the existing loader without changing its public UI.
    deskLoadState=function(item){
      deskService=item.service || "flight";
      document.querySelectorAll(".desk-tab").forEach(function(btn){
        btn.classList.toggle("active",btn.dataset.deskService===deskService);
      });
      if($("deskKicker")) $("deskKicker").textContent=deskServiceMeta[deskService].kicker;
      if($("deskTitle")) $("deskTitle").textContent=deskServiceMeta[deskService].title;
      deskRenderFields();
      deskApplySnapshot(item.values || {});

      if(item.summary && $("travelDeskResult")){
        $("travelDeskResult").innerHTML=deskResultHtml(item.summary,deskProviderLinks[deskService] || "https://www.google.com/travel/");
      }
      showToast("Saved search loaded.");
    };

    var originalDeskSearch=deskSearch;
    deskSearch=async function(){
      var result=await originalDeskSearch();
      var snap=deskSnapshot();
      var arr=deskRecentRead();
      if(arr.length){
        arr[0].values=snap;
        localStorage.setItem(deskRecentKey,JSON.stringify(arr));
        deskRenderRecent();
      }
      return result;
    };

    var originalDeskSave=deskRecentWrite;
    deskRecentWrite=function(item){
      if(!item.values) item.values=deskSnapshot();
      originalDeskSave(item);
    };
  }

  async function liveAirQuality(place){
    var cacheKey="air:"+place.latitude.toFixed(3)+","+place.longitude.toFixed(3);
    var cached=liveReadCache(cacheKey);
    if(cached) return cached;

    var url="https://air-quality-api.open-meteo.com/v1/air-quality" +
      "?latitude="+encodeURIComponent(place.latitude) +
      "&longitude="+encodeURIComponent(place.longitude) +
      "&current=us_aqi,pm2_5,pm10&timezone=auto";

    var data=await liveFetchJSON(url,10000);
    liveWriteCache(cacheKey,data);
    return data;
  }

  function aqiLabel(value){
    var n=Number(value);
    if(!Number.isFinite(n)) return "Unavailable";
    if(n<=50) return "Good";
    if(n<=100) return "Moderate";
    if(n<=150) return "Sensitive groups";
    if(n<=200) return "Unhealthy";
    if(n<=300) return "Very unhealthy";
    return "Hazardous";
  }

  function injectAqi(data){
    var panel=$("liveWeatherPanel");
    var grid=panel && panel.querySelector(".live-stat-grid");
    if(!grid || !data || !data.current) return;

    var aqi=data.current.us_aqi;
    var pm25=data.current.pm2_5;
    var pm10=data.current.pm10;
    var html='<div class="live-stat live-aqi-stat"><span>US AQI</span><strong>'+ (Number.isFinite(Number(aqi)) ? Math.round(Number(aqi)) : "—") +'</strong><small>'+escapeHTML(aqiLabel(aqi))+'</small></div>';
    html+='<div class="live-stat"><span>PM2.5</span><strong>'+ (Number.isFinite(Number(pm25)) ? Number(pm25).toFixed(1) : "—") +' μg/m³</strong></div>';
    html+='<div class="live-stat"><span>PM10</span><strong>'+ (Number.isFinite(Number(pm10)) ? Number(pm10).toFixed(1) : "—") +' μg/m³</strong></div>';
    grid.insertAdjacentHTML("beforeend",html);
  }

  var baseRefresh=refreshLiveTravel;
  refreshLiveTravel=async function(force){
    var sync=$("liveSync");
    if(sync) sync.textContent="Syncing live data…";

    var originName=state.trip.from || state.settings.home || "Hyderabad";
    var destinationName=livePreviewPlace?.name || state.trip.destination || "Goa";
    var requestKey=originName.trim().toLowerCase()+"|"+destinationName.trim().toLowerCase();

    if(!force && requestKey===liveRequestKey && liveReadCache("geo:"+originName.toLowerCase()) && liveReadCache("geo:"+destinationName.toLowerCase())){
      if(sync) sync.textContent="Live data cached · just now";
      return;
    }

    liveRequestKey=requestKey;

    try{
      var results=await Promise.all([
        liveGeocode(originName),
        livePreviewPlace || liveGeocode(destinationName)
      ]);
      var origin=results[0], destination=results[1];

      var weather=await liveWeather(destination);
      var air=await liveAirQuality(destination).catch(function(){return null;});

      renderLiveWeather(destination,weather);
      injectAqi(air);

      var route=await liveRoute(origin,destination);
      updateLiveRouteText(origin,destination,route);

      if(sync){
        sync.textContent="Updated "+new Intl.DateTimeFormat("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true}).format(new Date());
      }
    }catch(error){
      console.error("TripPilot live data:",error);
      if(typeof renderLiveError==="function"){
        renderLiveError(error && error.message==="Location not found"
          ? "Try a city or destination name such as Goa, Dubai or Singapore."
          : "Check your internet connection and try the live refresh again."
        );
      }
      if(sync) sync.textContent="Live sync failed";
    }
  };
})();

/* =========================================================
   TRAVEL INSPIRATION CONTROLLER
   ========================================================= */
(function(){
  var key="trippilot_inspiration_v1";

  function readSaved(){
    try{
      var raw=localStorage.getItem(key);
      var arr=raw?JSON.parse(raw):[];
      return Array.isArray(arr)?arr:[];
    }catch(error){return []}
  }

  function writeSaved(arr){
    try{localStorage.setItem(key,JSON.stringify(arr));}catch(error){}
  }

  function renderSaved(){
    var saved=readSaved();
    var counter=$("savedInspirationCount");
    if(counter) counter.textContent=String(saved.length);
    document.querySelectorAll("[data-inspiration-save]").forEach(function(btn){
      var name=btn.dataset.inspirationSave;
      var active=saved.includes(name);
      btn.classList.toggle("saved",active);
      var icon=btn.querySelector("i");
      if(icon) icon.className=active ? "bx bxs-heart" : "bx bx-heart";
    });
  }

  function toggle(name){
    var saved=readSaved();
    var index=saved.indexOf(name);
    if(index>=0){
      saved.splice(index,1);
      showToast(name+" removed from saved ideas.");
    }else{
      saved.push(name);
      showToast(name+" saved to your inspiration list.");
    }
    writeSaved(saved);
    renderSaved();
  }

  function plan(name){
    if(destinationData[name]){
      state.trip.destination=name;
      syncPlannerForm();
      saveState();
      renderAll();
      navigateTo("planner");
      showToast(name+" added to your trip.");
    }
  }

  document.querySelectorAll("[data-inspiration-save]").forEach(function(btn){
    btn.addEventListener("click",function(){toggle(btn.dataset.inspirationSave);});
  });

  document.querySelectorAll("[data-inspiration-plan]").forEach(function(btn){
    btn.addEventListener("click",function(){plan(btn.dataset.inspirationPlan);});
  });

  renderSaved();
})();

/* =========================================================
   FINAL MICRO-INTERACTION + REMOTE IMAGE FALLBACK
   ========================================================= */
(function(){
  if(window.__tripPilotMicroReady) return;
  window.__tripPilotMicroReady=true;

  document.addEventListener("error",function(event){
    var node=event.target;
    if(!node || node.tagName!=="IMG") return;
    node.classList.add("broken-image");
    if(node.parentElement) node.parentElement.classList.add("image-fallback");
    if(node.dataset && node.dataset.fallbackUsed!=="1" && typeof TRAVEL_IMAGE_FALLBACK==="string"){
      node.dataset.fallbackUsed="1";
      node.src=TRAVEL_IMAGE_FALLBACK;
      node.removeAttribute("srcset");
      node.classList.add("image-fallback-active");
    }
  },true);

  document.addEventListener("click",function(event){
    var button=event.target.closest(".btn,.desk-tab,.filter-tab,.transport-tab,.destination-button,.stay-action,.inspiration-plan,.inspiration-save,.inspiration-mini-save");
    if(!button) return;
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var rect=button.getBoundingClientRect();
    var dot=document.createElement("span");
    dot.className="ripple-dot";
    dot.style.left=(event.clientX-rect.left)+"px";
    dot.style.top=(event.clientY-rect.top)+"px";
    if(getComputedStyle(button).position==="static") button.style.position="relative";
    button.appendChild(dot);
    window.setTimeout(function(){dot.remove();},620);
  },{passive:true});
})();
