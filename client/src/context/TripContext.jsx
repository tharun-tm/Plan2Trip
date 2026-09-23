import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_TRIP_INPUTS, MOCK_MOBILITY_DATA } from '../data/mockTripData';

const TripContext = createContext();

export function TripProvider({ children }) {
  const [tripInputs, setTripInputs] = useState(DEFAULT_TRIP_INPUTS);
  const [planData, setPlanData] = useState(MOCK_MOBILITY_DATA);
  const [savedTrips, setSavedTrips] = useState([
    {
      id: 'saved-1',
      title: 'Mangaluru to Goa Smart Escape',
      destination: 'Goa',
      dates: 'Oct 15 - Oct 18, 2026',
      budget: 12000,
      estimatedCost: 10300,
      savedAt: '2026-09-22',
      transport: 'Bus Sleeper'
    }
  ]);
  const [isSavedCurrent, setIsSavedCurrent] = useState(false);

  const updateTripInputs = (newInputs) => {
    setTripInputs(prev => ({ ...prev, ...newInputs }));
  };

  const toggleSaveCurrentPlan = () => {
    setIsSavedCurrent(prev => !prev);
  };

  const toggleAttraction = (attractionId) => {
    setPlanData(prev => {
      const updatedAttractions = prev.attractions.map(att => {
        if (att.id === attractionId) {
          return { ...att, added: !att.added };
        }
        return att;
      });

      // Recalculate activities cost
      const newActivitiesTotal = updatedAttractions
        .filter(a => a.added)
        .reduce((sum, a) => sum + (a.cost || 0), 0);

      // Recalculate total estimated cost
      const otherCosts = 2400 + 3600 + 3150; // Transport + Hotel + Food
      const newEstimatedTotal = otherCosts + newActivitiesTotal;
      const newRemainingBudget = (prev.tripSummary.totalBudget || 12000) - newEstimatedTotal;

      return {
        ...prev,
        attractions: updatedAttractions,
        tripSummary: {
          ...prev.tripSummary,
          estimatedTotal: newEstimatedTotal,
          remainingBudget: newRemainingBudget
        }
      };
    });
  };

  return (
    <TripContext.Provider
      value={{
        tripInputs,
        updateTripInputs,
        planData,
        setPlanData,
        savedTrips,
        isSavedCurrent,
        toggleSaveCurrentPlan,
        toggleAttraction
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
