// Centralized Mock Dataset for TripWise Smart Mobility Planner

export const DEFAULT_TRIP_INPUTS = {
  startingLocation: 'Mangaluru',
  destination: 'Goa',
  startDate: '2026-10-15',
  endDate: '2026-10-18',
  travelers: 2,
  budget: 12000,
  preference: 'balanced'
};

export const MOCK_MOBILITY_DATA = {
  tripSummary: {
    origin: 'Mangaluru',
    destination: 'Goa',
    dates: 'Oct 15 - Oct 18, 2026 (3 Days, 2 Nights)',
    travelers: 2,
    totalBudget: 12000,
    estimatedTotal: 10300,
    remainingBudget: 1700,
    currency: '₹',
    travelStyle: 'Balanced Comfort'
  },

  recommendedTransport: {
    id: 'bus-sleeper',
    type: 'Bus',
    title: 'KSRTC Non-AC Sleeper / KGL Express',
    route: 'Mangaluru → Goa (Madgaon)',
    pricePerPerson: 1200,
    totalCost: 2400,
    travelTime: '7h 30m',
    departureTime: '22:00 (Overnight)',
    arrivalTime: '05:30 (+1 Day)',
    comfortScore: 88,
    efficiencyScore: 94,
    reason: 'Best balance of cost, travel time, and convenience for your budget. Overnight timing saves 1 full night of hotel accommodation spend.',
    isRecommended: true
  },

  transportOptions: [
    {
      id: 'bus-sleeper',
      type: 'Bus',
      name: 'Overnight Express Sleeper',
      operator: 'KSRTC / Private Sleeper',
      pricePerPerson: 1200,
      totalCost: 2400,
      travelTime: '7h 30m',
      departureTime: '22:00',
      arrivalTime: '05:30',
      convenience: 'High',
      recommendationScore: 94,
      tag: 'Best Mobility Value',
      why: 'Saves 1 night stay cost. Direct pickup from city center.'
    },
    {
      id: 'train-express',
      type: 'Train',
      name: 'Vande Bharat / Jan Shatabdi Express',
      operator: 'Indian Railways (Konkan Railway)',
      pricePerPerson: 850,
      totalCost: 1700,
      travelTime: '6h 15m',
      departureTime: '08:30',
      arrivalTime: '14:45',
      convenience: 'Very High',
      recommendationScore: 88,
      tag: 'Lowest Transit Cost',
      why: 'Fastest land route with scenic Konkan views, but requires daytime travel.'
    },
    {
      id: 'private-car',
      type: 'Car',
      name: 'Self-Drive SUV / Rental Car',
      operator: 'Private Mobility Rental',
      pricePerPerson: 2250,
      totalCost: 4500,
      travelTime: '6h 00m',
      departureTime: 'Flexible',
      arrivalTime: 'Flexible',
      convenience: 'Maximum',
      recommendationScore: 76,
      tag: 'Flexibility Priority',
      why: 'Complete route control, but consumes 37.5% of total trip budget.'
    }
  ],

  smartRoute: {
    title: 'Optimized Daily Mobility Chain',
    totalDistance: '42 km',
    avgTransitBetweenSights: '14 mins',
    nodes: [
      { id: 1, title: 'Madgaon Arrival Hub', type: 'origin', time: '05:30 AM', icon: '🚉' },
      { id: 2, title: 'SeaBreeze Eco Stay (Hotel Check-in)', type: 'hotel', time: '07:00 AM', transitFromPrev: '25 mins cab', icon: '🏨' },
      { id: 3, title: 'Fontainhas Latin Quarter', type: 'attraction', time: '10:00 AM', transitFromPrev: '12 mins walk', icon: '🏛️' },
      { id: 4, title: 'Viva Panjim (Goan Lunch)', type: 'dining', time: '01:00 PM', transitFromPrev: '5 mins walk', icon: '🍜' },
      { id: 5, title: 'Aguada Fort & Lighthouse', type: 'attraction', time: '04:30 PM', transitFromPrev: '22 mins scooter', icon: '🏰' },
      { id: 6, title: 'SeaBreeze Eco Stay (Return)', type: 'hotel', time: '07:30 PM', transitFromPrev: '18 mins scooter', icon: '🏨' }
    ]
  },

  recommendedHotel: {
    id: 'seabreeze-hotel',
    name: 'SeaBreeze Eco Stay & Suites',
    rating: 4.6,
    reviewsCount: 328,
    location: 'Panaji, North Goa',
    pricePerNight: 1800,
    nights: 2,
    totalCost: 3600,
    distanceToAttractions: '12 mins avg. transit to top sights',
    amenities: ['Free Wi-Fi', 'Breakfast Included', 'EV Scooter Station', 'AC Rooms'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    whyThisHotel: 'Chosen because it fits your budget and keeps your daily travel distance low (under 15 mins to Fontainhas & Old Goa).'
  },

  hotelOptions: [
    {
      id: 'seabreeze-hotel',
      name: 'SeaBreeze Eco Stay & Suites',
      rating: 4.6,
      location: 'Panaji, Central Goa',
      pricePerNight: 1800,
      totalCost: 3600,
      score: 95,
      isRecommended: true,
      why: 'Optimal hub location. Reduces local transit expenses by ₹800.'
    },
    {
      id: 'horizon-palms',
      name: 'Horizon Palms Beach Resort',
      rating: 4.4,
      location: 'Candolim Beach',
      pricePerNight: 2600,
      totalCost: 5200,
      score: 82,
      isRecommended: false,
      why: 'Beachfront luxury, but increases total stay cost beyond budget buffer.'
    },
    {
      id: 'backpackers-hostel',
      name: 'Backpackers Haven Hostel',
      rating: 4.2,
      location: 'Anjuna',
      pricePerNight: 900,
      totalCost: 1800,
      score: 78,
      isRecommended: false,
      why: 'Ultra low budget, but adds 35 mins extra daily commute to heritage sites.'
    }
  ],

  attractions: [
    // 🛕 TEMPLES & PILGRIMAGE
    {
      id: 'att-1',
      name: 'Mahabaleshwar Temple & Atma Linga',
      rating: 4.9,
      location: 'Gokarna, Uttara Kannada',
      distanceFromHub: '230 km on Journey Route',
      duration: '1.5 hours',
      cost: 0,
      added: true,
      category: '🛕 Ancient Temple',
      type: 'temples',
      image: 'https://images.unsplash.com/photo-1609828913664-85888a70669b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-2',
      name: 'Murudeshwara Coastal Temple & Shiva Statue',
      rating: 4.8,
      location: 'Murudeshwar, Uttara Kannada',
      distanceFromHub: '155 km on NH 66 Coastal Highway',
      duration: '2.5 hours',
      cost: 0,
      added: true,
      category: '🛕 Pilgrimage & Sea View',
      type: 'temples',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-3',
      name: 'Udupi Sri Krishna Matha & Temple Square',
      rating: 4.9,
      location: 'Udupi, Karnataka',
      distanceFromHub: '58 km from Mangaluru Start Point',
      duration: '1.5 hours',
      cost: 0,
      added: true,
      category: '🛕 Sacred Heritage Temple',
      type: 'temples',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-4',
      name: 'Kadri Manjunatha & Mangaladevi Temple',
      rating: 4.7,
      location: 'Mangaluru Start Point',
      distanceFromHub: '4.5 km from Bus Station',
      duration: '2.0 hours',
      cost: 0,
      added: false,
      category: '🛕 Heritage Temple',
      type: 'temples',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-5',
      name: 'Shri Shanta Durga & Mangueshi Temple',
      rating: 4.8,
      location: 'Ponda, Central Goa',
      distanceFromHub: '28 km before Destination',
      duration: '1.5 hours',
      cost: 0,
      added: false,
      category: '🛕 Goan Heritage Temple',
      type: 'temples',
      image: 'https://images.unsplash.com/photo-1609828913664-85888a70669b?auto=format&fit=crop&w=800&q=80'
    },

    // 🛍️ MALLS & SHOPPING
    {
      id: 'att-6',
      name: 'Mall of Goa (Porvorim)',
      rating: 4.6,
      location: 'Porvorim, North Goa Highway',
      distanceFromHub: '6.5 km from Panaji Hub',
      duration: '2.0 hours',
      cost: 0,
      added: true,
      category: '🛍️ Malls & Shopping',
      type: 'malls',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-7',
      name: 'Nexus Fiza Mall & Multiplex',
      rating: 4.5,
      location: 'Pandeshwar, Mangaluru',
      distanceFromHub: '2.0 km from Start Point',
      duration: '2.0 hours',
      cost: 0,
      added: false,
      category: '🛍️ Malls & Shopping',
      type: 'malls',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-8',
      name: 'Panaji Municipal Market & Craft Emporium',
      rating: 4.5,
      location: 'City Center, Panaji',
      distanceFromHub: '1.0 km from City Center',
      duration: '1.5 hours',
      cost: 0,
      added: true,
      category: '🛍️ Artisanal Shopping Market',
      type: 'malls',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80'
    },

    // 🌳 PARKS & NATURE
    {
      id: 'att-9',
      name: 'Kadri Park & Musical Fountain',
      rating: 4.6,
      location: 'Kadri, Mangaluru',
      distanceFromHub: '3.5 km from Start Point',
      duration: '1.5 hours',
      cost: 20,
      added: true,
      category: '🌳 Parks & Botanical Gardens',
      type: 'parks',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-10',
      name: 'Pilikula Biological Park & Nisargadhama',
      rating: 4.7,
      location: 'Vamanjoor, Mangaluru',
      distanceFromHub: '12 km from Start Point',
      duration: '3.0 hours',
      cost: 100,
      added: false,
      category: '🌳 Eco Park & Sanctuary',
      type: 'parks',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-11',
      name: 'Campal Promenade Riverside Park',
      rating: 4.5,
      location: 'Mandovi Waterfront, Panaji',
      distanceFromHub: '1.5 km from Destination Hub',
      duration: '1.0 hour',
      cost: 0,
      added: false,
      category: '🌳 Waterfront City Park',
      type: 'parks',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },

    // 🌅 SEA VIEWPOINTS & BEACHES
    {
      id: 'att-12',
      name: 'Maravanthe Beach & Highway Viewpoint',
      rating: 4.9,
      location: 'Kundapura, NH 66 Coastal Highway',
      distanceFromHub: '110 km on Journey Route',
      duration: '45 mins stop',
      cost: 0,
      added: true,
      category: '🌅 Sea Viewpoint & Highway Drive',
      type: 'beaches',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-13',
      name: 'Om Beach Cliff Viewpoint',
      rating: 4.8,
      location: 'Gokarna Coast',
      distanceFromHub: '235 km on Journey Route',
      duration: '2.0 hours',
      cost: 0,
      added: true,
      category: '🌅 Panoramic Sea Viewpoint',
      type: 'beaches',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-14',
      name: 'Dona Paula Cliff Sea Viewpoint',
      rating: 4.6,
      location: 'Panaji, North Goa',
      distanceFromHub: '7.0 km from Destination Hub',
      duration: '1.0 hour',
      cost: 0,
      added: true,
      category: '🌅 Sea Viewpoint',
      type: 'beaches',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-15',
      name: 'Panambur Beach & Sunset Promenade',
      rating: 4.6,
      location: 'Mangaluru Coast',
      distanceFromHub: '10 km from Start Point',
      duration: '2.0 hours',
      cost: 0,
      added: false,
      category: '🌅 Sunset Sea Beach',
      type: 'beaches',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },

    // 🏰 FORTS & HERITAGE
    {
      id: 'att-16',
      name: 'Aguada Fort & Lighthouse',
      rating: 4.7,
      location: 'Sinquerim, North Goa',
      distanceFromHub: '18 km from Destination Hub',
      duration: '1.5 hours',
      cost: 100,
      added: true,
      category: '🏰 Coastal Heritage Fort',
      type: 'forts',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-17',
      name: 'Mirjan Fort (Coastal Highway Stop)',
      rating: 4.7,
      location: 'Kumta, NH 66 Route',
      distanceFromHub: '210 km on Journey Route',
      duration: '1.0 hour',
      cost: 0,
      added: true,
      category: '🏰 Ancient Fort & Architecture',
      type: 'forts',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
    }
  ],

  restaurants: [
    {
      id: 'rest-1',
      name: 'Viva Panjim',
      rating: 4.6,
      reviewsCount: '2,140+ Google reviews',
      cuisine: 'Goan Seafood & Portuguese',
      priceRange: '₹300 - ₹600 / person',
      location: 'Fontainhas, Panaji',
      distance: '1.2 km from City Center',
      highlight: 'Famous Goan Fish Curry & Prawn Balchão',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      googleMapsUrl: 'https://www.google.com/maps/search/Viva+Panjim+Goa'
    },
    {
      id: 'rest-2',
      name: 'Fisherman’s Wharf',
      rating: 4.7,
      reviewsCount: '4,890+ Google reviews',
      cuisine: 'Seafood & Multi-Cuisine',
      priceRange: '₹600 - ₹1200 / person',
      location: 'Cavelossim / Panaji',
      distance: '3.5 km riverfront view',
      highlight: 'Riverfront Dining & Live Music',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      googleMapsUrl: 'https://www.google.com/maps/search/Fishermans+Wharf+Goa'
    },
    {
      id: 'rest-3',
      name: 'Mum’s Kitchen',
      rating: 4.5,
      reviewsCount: '1,720+ Google reviews',
      cuisine: 'Traditional Goan Heritage',
      priceRange: '₹400 - ₹700 / person',
      location: 'Panaji',
      distance: '0.8 km from Promenade',
      highlight: 'Authentic Mother’s Xacuti Recipes',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
      googleMapsUrl: 'https://www.google.com/maps/search/Mums+Kitchen+Panaji'
    },
    {
      id: 'rest-4',
      name: 'Giri Manja’s / Machali Seafood',
      rating: 4.8,
      reviewsCount: '3,450+ Google reviews',
      cuisine: 'Mangalurean Coastal Seafood',
      priceRange: '₹250 - ₹500 / person',
      location: 'Mangaluru City',
      distance: '2.0 km from Railway Station',
      highlight: 'Legendary Anjal Tawa Fry & Crab Ghee Roast',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      googleMapsUrl: 'https://www.google.com/maps/search/Giri+Manjas+Mangalore'
    }
  ],

  itinerary: [
    {
      day: 1,
      dateLabel: 'Day 1: Arrival & Historic Panaji',
      events: [
        { time: '05:30 AM', activity: 'Arrival at Madgaon Station / Bus Hub', location: 'Madgaon', cost: 0, travelTime: '30 mins cab to hotel' },
        { time: '08:30 AM', activity: 'Goan Breakfast at Cafe Bodega', location: 'Altinho, Panaji', cost: 400, travelTime: '10 mins walk' },
        { time: '10:00 AM', activity: 'Fontainhas Heritage Quarter Walking Tour', location: 'Fontainhas', cost: 0, travelTime: '5 mins walk' },
        { time: '01:00 PM', activity: 'Authentic Goan Lunch', location: 'Viva Panjim', cost: 700, travelTime: '5 mins walk' },
        { time: '03:00 PM', activity: 'Hotel Check-in & Rest', location: 'SeaBreeze Eco Stay', cost: 0, travelTime: '10 mins drive' },
        { time: '04:30 PM', activity: 'Aguada Fort Sunset Visit', location: 'Sinquerim', cost: 100, travelTime: '22 mins scooter' },
        { time: '08:00 PM', activity: 'Dinner', location: 'Mum’s Kitchen, Panaji', cost: 800, travelTime: '15 mins drive' }
      ]
    },
    {
      day: 2,
      dateLabel: 'Day 2: Old Goa UNESCO & Mandovi Cruise',
      events: [
        { time: '08:30 AM', activity: 'Complimentary Breakfast', location: 'Hotel Dining', cost: 0, travelTime: '-' },
        { time: '09:30 AM', activity: 'Basilica of Bom Jesus & Se Cathedral', location: 'Old Goa', cost: 50, travelTime: '20 mins drive' },
        { time: '01:00 PM', activity: 'Seafood Lunch', location: 'Ritz Classic', cost: 650, travelTime: '15 mins drive' },
        { time: '03:30 PM', activity: 'Miramar Beach & Dona Paula Viewpoint', location: 'Miramar', cost: 0, travelTime: '12 mins drive' },
        { time: '06:30 PM', activity: 'Mandovi Sunset River Cruise', location: 'Panaji Jetty', cost: 1000, travelTime: '10 mins drive' },
        { time: '08:30 PM', activity: 'Dinner & Night Market Walk', location: 'Panaji Promenade', cost: 600, travelTime: '5 mins walk' }
      ]
    }
  ],

  budgetBreakdown: [
    { category: 'Intercity Transport', amount: 2400, percentage: 23, color: 'bg-blue-500' },
    { category: 'Hotel / Accommodation', amount: 3600, percentage: 35, color: 'bg-emerald-500' },
    { category: 'Food & Dining', amount: 3150, percentage: 31, color: 'bg-amber-500' },
    { category: 'Attractions & Sightseeing', amount: 1150, percentage: 11, color: 'bg-purple-500' }
  ]
};
