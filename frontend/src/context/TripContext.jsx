import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_TRIP_INPUTS, MOCK_MOBILITY_DATA } from '../data/mockTripData';
import { supabase } from '../lib/supabaseClient';
import { fetchUserTrips } from '../lib/tripsService';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [tripInputs, setTripInputs] = useState(DEFAULT_TRIP_INPUTS);
  const [planData, setPlanData] = useState(MOCK_MOBILITY_DATA);
  const [selectedTransportId, setSelectedTransportId] = useState('bus-sleeper');
  const [selectedHotelId, setSelectedHotelId] = useState('seabreeze-hotel');
  const [includeTransport, setIncludeTransport] = useState(true);
  const [includeHotel, setIncludeHotel] = useState(true);
  const [includeDining, setIncludeDining] = useState(true);
  const [savedTrips, setSavedTrips] = useState([]);
  const [isSavedCurrent, setIsSavedCurrent] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [currentTripId, setCurrentTripId] = useState(null);

  // --- Auth state listener ---
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // --- Load saved trips from Supabase when user logs in ---
  useEffect(() => {
    if (!user) {
      setSavedTrips([]);
      return;
    }
    loadTrips();
  }, [user]);

  const loadTrips = async () => {
    try {
      setLoadingTrips(true);
      const trips = await fetchUserTrips();
      setSavedTrips(trips);
    } catch (err) {
      if (!err.message?.includes('Not authenticated')) {
        console.error('Failed to load trips:', err.message);
      }
    } finally {
      setLoadingTrips(false);
    }
  };

  const updateTripInputs = (newInputs) => {
    setTripInputs(prev => ({ ...prev, ...newInputs }));
  };

  const toggleSaveCurrentPlan = () => {
    setIsSavedCurrent(prev => !prev);
  };

  const selectTransport = (transportId) => {
    setSelectedTransportId(transportId);
  };

  const selectHotel = (hotelId) => {
    setSelectedHotelId(hotelId);
  };

  const toggleIncludeTransport = () => setIncludeTransport(prev => !prev);
  const toggleIncludeHotel = () => setIncludeHotel(prev => !prev);
  const toggleIncludeDining = () => setIncludeDining(prev => !prev);

  const toggleAttraction = (attractionId) => {
    setPlanData(prev => {
      const updatedAttractions = (prev.attractions || []).map(att => {
        if (att.id === attractionId) {
          return { ...att, added: !att.added };
        }
        return att;
      });
      return {
        ...prev,
        attractions: updatedAttractions
      };
    });
  };

  // Dynamic calculation helpers
  const travelers = Number(tripInputs.travelers) || 2;
  const totalBudgetCap = Number(tripInputs.budget) || planData.tripSummary?.totalBudget || 12000;

  const selectedTransport = planData.transportOptions?.find(t => t.id === selectedTransportId) || planData.recommendedTransport;
  const selectedHotel = planData.hotelOptions?.find(h => h.id === selectedHotelId) || planData.recommendedHotel;
  const selectedAttractions = (planData.attractions || []).filter(a => a.added);

  const transportCost = includeTransport ? (selectedTransport?.pricePerPerson || 1200) * travelers : 0;
  const hotelCost = includeHotel ? (selectedHotel?.pricePerNight || 1800) * (selectedHotel?.nights || 2) : 0;
  const activitiesCost = selectedAttractions.reduce((sum, a) => sum + (a.cost || 0), 0);
  const diningCost = includeDining ? 1500 * travelers : 0;

  const dynamicEstimatedTotal = transportCost + hotelCost + activitiesCost + diningCost;
  const dynamicRemainingBudget = totalBudgetCap - dynamicEstimatedTotal;

  const dynamicBreakdown = [
    { category: `Intercity Transport (${includeTransport ? selectedTransport?.type || 'Bus' : 'Opted Out'})`, amount: transportCost, color: 'bg-blue-500' },
    { category: `Hotel Stay (${includeHotel ? (selectedHotel?.name ? selectedHotel.name.split(' ')[0] : 'Hotel') : 'Opted Out'})`, amount: hotelCost, color: 'bg-emerald-500' },
    { category: `Food & Dining (${includeDining ? travelers + ' travelers' : 'Opted Out'})`, amount: diningCost, color: 'bg-amber-500' },
    { category: `Activities & Sights (${selectedAttractions.length} items)`, amount: activitiesCost, color: 'bg-purple-500' },
  ];

  return (
    <TripContext.Provider
      value={{
        tripInputs,
        updateTripInputs,
        planData,
        setPlanData,
        selectedTransportId,
        selectTransport,
        selectedHotelId,
        selectHotel,
        includeTransport,
        toggleIncludeTransport,
        includeHotel,
        toggleIncludeHotel,
        includeDining,
        toggleIncludeDining,
        selectedTransport,
        selectedHotel,
        selectedAttractions,
        transportCost,
        hotelCost,
        activitiesCost,
        diningCost,
        dynamicEstimatedTotal,
        dynamicRemainingBudget,
        totalBudgetCap,
        dynamicBreakdown,
        savedTrips,
        setSavedTrips,
        loadTrips,
        loadingTrips,
        isSavedCurrent,
        toggleSaveCurrentPlan,
        toggleAttraction,
        user,
        authLoading,
        currentTripId,
        setCurrentTripId,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
