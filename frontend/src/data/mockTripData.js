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
    {
      id: 'att-1',
      name: 'Aguada Fort & Lighthouse',
      rating: 4.7,
      location: 'Sinquerim, North Goa',
      duration: '1.5 hours',
      cost: 100,
      added: true,
      category: 'Heritage & Views',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-2',
      name: 'Fontainhas Latin Quarter',
      rating: 4.8,
      location: 'Panaji',
      duration: '2.0 hours',
      cost: 0,
      added: true,
      category: 'Culture & Architecture',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-3',
      name: 'Basilica of Bom Jesus',
      rating: 4.6,
      location: 'Old Goa',
      duration: '1.0 hour',
      cost: 0,
      added: true,
      category: 'UNESCO World Heritage',
      image: 'https://images.unsplash.com/photo-1609828913664-85888a70669b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'att-4',
      name: 'Dudhsagar Waterfalls Trail',
      rating: 4.9,
      location: 'Mollem National Park',
      duration: '4.5 hours',
      cost: 500,
      added: false,
      category: 'Nature & Adventure',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    }
  ],

  restaurants: [
    {
      id: 'rest-1',
      name: 'Viva Panjim',
      rating: 4.6,
      cuisine: 'Goan Seafood & Portuguese',
      priceRange: '₹300 - ₹600 / person',
      location: 'Fontainhas, Panaji',
      highlight: 'Famous Goan Fish Thali'
    },
    {
      id: 'rest-2',
      name: 'Fisherman’s Wharf',
      rating: 4.7,
      cuisine: 'Seafood & Multi-Cuisine',
      priceRange: '₹600 - ₹1200 / person',
      location: 'Cavelossim',
      highlight: 'Riverfront Dining Experience'
    },
    {
      id: 'rest-3',
      name: 'Mum’s Kitchen',
      rating: 4.5,
      cuisine: 'Traditional Goan Heritage',
      priceRange: '₹400 - ₹700 / person',
      location: 'Panaji',
      highlight: 'Authentic Mother’s Recipes'
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
