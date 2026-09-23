import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, ArrowRight, ExternalLink } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function ItineraryTimeline({ itinerary: propItinerary }) {
  const { tripInputs, planData, selectedTransport, selectedHotel, selectedAttractions } = useTrip();
  const [activeDay, setActiveDay] = useState(1);

  const origin = tripInputs.startingLocation || planData.tripSummary?.origin || 'Mangaluru';
  const destination = tripInputs.destination || planData.tripSummary?.destination || 'Goa';
  const travelers = Number(tripInputs.travelers) || 2;

  const transportTitle = selectedTransport?.name || selectedTransport?.title || 'Overnight Express';
  const hotelName = selectedHotel?.name || 'Selected Accommodation';
  const attractionsList = selectedAttractions && selectedAttractions.length > 0
    ? selectedAttractions
    : (planData.attractions || []).filter(a => a.added);

  // Distribute selected attractions sequentially across 3 days
  const day1Attractions = attractionsList.slice(0, 2);
  const day2Attractions = attractionsList.slice(2, 5);
  const day3Attractions = attractionsList.slice(5);

  // Build dynamic sequential schedule tracing exact routes from origin to destination and back
  const dynamicSchedule = [
    {
      day: 1,
      dateLabel: `Day 1: Departure from ${origin} → Arrival & Exploration in ${destination}`,
      events: [
        {
          time: '05:30 AM',
          activity: `Board Transit: ${transportTitle}`,
          fromLocation: `${origin} Main Bus/Railway Terminal`,
          toLocation: `${destination} Central Station`,
          routeStr: `${origin} → ${destination}`,
          cost: (selectedTransport?.pricePerPerson || 1200) * travelers,
          travelTime: `${selectedTransport?.travelTime || '7h 30m'} travel time`,
          mapsUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
        },
        {
          time: '08:30 AM',
          activity: `Check-in & Refresh at ${hotelName}`,
          fromLocation: `${destination} Central Station`,
          toLocation: hotelName,
          routeStr: `Transit Hub → ${hotelName}`,
          cost: 0,
          travelTime: '20 mins cab/scooter',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(hotelName + ' ' + destination)}`
        },
        ...(day1Attractions.length > 0 ? day1Attractions.map((att, i) => ({
          time: i === 0 ? '10:30 AM' : '04:30 PM',
          activity: `Visit & Explore ${att.name}`,
          fromLocation: i === 0 ? hotelName : day1Attractions[0].name,
          toLocation: att.name,
          routeStr: `${i === 0 ? hotelName : day1Attractions[0].name} → ${att.name}`,
          cost: att.cost || 0,
          travelTime: att.duration || '1.5 hours',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(att.name + ' ' + att.location)}`
        })) : [
          {
            time: '10:30 AM',
            activity: `Explore Local Heritage Quarter & Sights`,
            fromLocation: hotelName,
            toLocation: `Central ${destination} Sights`,
            routeStr: `${hotelName} → Heritage Quarter`,
            cost: 0,
            travelTime: '15 mins walk',
            mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(destination + ' sights')}`
          }
        ]),
        {
          time: '08:00 PM',
          activity: `Authentic Dining & Evening Walk`,
          fromLocation: day1Attractions[day1Attractions.length - 1]?.name || hotelName,
          toLocation: `${destination} Popular Restaurant`,
          routeStr: `Sights → Local Dining → ${hotelName}`,
          cost: 500 * travelers,
          travelTime: '10 mins drive',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(destination + ' restaurants')}`
        }
      ]
    },
    {
      day: 2,
      dateLabel: `Day 2: Full Coastal Circuit & Sights (${destination})`,
      events: [
        {
          time: '08:30 AM',
          activity: `Breakfast at ${hotelName}`,
          fromLocation: hotelName,
          toLocation: `${destination} Day Tour Route`,
          routeStr: hotelName,
          cost: 0,
          travelTime: 'Morning departure',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(hotelName)}`
        },
        ...(day2Attractions.length > 0 ? day2Attractions.map((att, i) => ({
          time: i === 0 ? '09:30 AM' : i === 1 ? '02:00 PM' : '05:00 PM',
          activity: `Explore ${att.name}`,
          fromLocation: i === 0 ? hotelName : day2Attractions[i - 1].name,
          toLocation: att.name,
          routeStr: `${i === 0 ? hotelName : day2Attractions[i - 1].name} → ${att.name}`,
          cost: att.cost || 0,
          travelTime: att.duration || '2.0 hours',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(att.name + ' ' + att.location)}`
        })) : [
          {
            time: '09:30 AM',
            activity: `Coastal Viewpoints & Temple Sights`,
            fromLocation: hotelName,
            toLocation: `Famous ${destination} Coastal Route`,
            routeStr: `${hotelName} → Coastal Highway`,
            cost: 0,
            travelTime: '25 mins drive',
            mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(destination + ' coastal sights')}`
          },
          {
            time: '04:30 PM',
            activity: `Fort Visit & Sunset Viewpoint`,
            fromLocation: `Coastal Circuit`,
            toLocation: `Sunset Cliff Viewpoint`,
            routeStr: `Coast → Sunset Viewpoint`,
            cost: 100,
            travelTime: '15 mins drive',
            mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(destination + ' fort sunset')}`
          }
        ]),
        {
          time: '08:30 PM',
          activity: `Night Promenade Walk & Seafood Dinner`,
          fromLocation: `Sunset Viewpoint`,
          toLocation: hotelName,
          routeStr: `Sunset Point → Restaurant → ${hotelName}`,
          cost: 600 * travelers,
          travelTime: '15 mins return',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(destination + ' night market')}`
        }
      ]
    },
    {
      day: 3,
      dateLabel: `Day 3: Morning Highlights & Return Journey (${destination} → ${origin})`,
      events: [
        {
          time: '09:00 AM',
          activity: `Hotel Check-out & Luggage Store`,
          fromLocation: hotelName,
          toLocation: `${destination} City Center`,
          routeStr: `${hotelName} → City Bazaar`,
          cost: 0,
          travelTime: '10 mins drive',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(hotelName)}`
        },
        ...(day3Attractions.length > 0 ? day3Attractions.map((att) => ({
          time: '10:30 AM',
          activity: `Final Sight Stop: ${att.name}`,
          fromLocation: `City Bazaar`,
          toLocation: att.name,
          routeStr: `Bazaar → ${att.name}`,
          cost: att.cost || 0,
          travelTime: att.duration || '1.5 hours',
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(att.name + ' ' + att.location)}`
        })) : [
          {
            time: '10:30 AM',
            activity: `Local Craft Markets & Souvenir Shopping`,
            fromLocation: `City Bazaar`,
            toLocation: `${destination} Handicraft Market`,
            routeStr: `City Center → Craft Bazaar`,
            cost: 0,
            travelTime: '1.5 hours',
            mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(destination + ' craft market')}`
          }
        ]),
        {
          time: '02:00 PM',
          activity: `Return Transit Departure (${destination} → ${origin})`,
          fromLocation: `${destination} Station`,
          toLocation: `${origin} Departure Terminal`,
          routeStr: `${destination} → ${origin}`,
          cost: 0,
          travelTime: `Return journey to ${origin}`,
          mapsUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(destination)}&destination=${encodeURIComponent(origin)}`
        }
      ]
    }
  ];

  return (
    <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-5 bg-white border border-stone-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-100">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sequential Schedule</span>
            <h3 className="text-base font-bold text-slate-900">Day-by-Day Itinerary ({origin} → {destination})</h3>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
          3 Days • {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}
        </span>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex space-x-2 border-b border-stone-200 pb-3">
        {dynamicSchedule.map((dayPlan) => {
          const isActive = activeDay === dayPlan.day;
          return (
            <button
              key={dayPlan.day}
              onClick={() => setActiveDay(dayPlan.day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-stone-100 text-slate-600 hover:text-slate-900 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              Day {dayPlan.day}
            </button>
          );
        })}
      </div>

      {/* Active Day Schedule */}
      {dynamicSchedule
        .filter((d) => d.day === activeDay)
        .map((dayPlan) => (
          <div key={dayPlan.day} className="space-y-4">
            <div className="text-xs font-bold text-slate-800 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 flex justify-between items-center">
              <span>{dayPlan.dateLabel}</span>
              <span className="text-[10px] font-mono text-slate-500 font-semibold">{dayPlan.events.length} Scheduled Milestones</span>
            </div>

            {/* Vertical Timeline with Route Pills */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
              {dayPlan.events.map((evt, index) => (
                <div key={index} className="relative flex items-start space-x-3.5 group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 top-2.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-900 group-hover:scale-125 transition-transform shadow-sm" />

                  <div className="flex-1 bg-stone-50/80 p-4 rounded-2xl border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-stone-200 shadow-2xs">
                        {evt.time}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {evt.cost === 0 ? 'Free Entry' : `₹${evt.cost.toLocaleString()}`}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{evt.activity}</h4>
                      {/* From Where to Where Route Pill */}
                      <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-purple-800 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg mt-1.5">
                        <MapPin className="w-3 h-3 text-purple-600 shrink-0" />
                        <span>{evt.fromLocation}</span>
                        <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                        <span>{evt.toLocation}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                      {evt.travelTime && (
                        <span className="flex items-center gap-1 text-slate-600 font-mono font-medium text-[11px]">
                          <Navigation className="w-3 h-3 text-slate-400 rotate-45" />
                          {evt.travelTime}
                        </span>
                      )}

                      {evt.mapsUrl && (
                        <a
                          href={evt.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-1 ml-auto"
                        >
                          <span>Google Maps Directions</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
