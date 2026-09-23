import { supabase } from './supabaseClient';

/**
 * Verify session is active before making Supabase DB calls.
 * This prevents 403 errors during token refresh race conditions.
 */
async function requireSession() {
  if (!supabase) throw new Error('Supabase not configured');
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (!session) throw new Error('Not authenticated. Please sign in.');
  return session;
}

/**
 * Save a new trip to Supabase trips table.
 */
export async function saveTrip(tripInputs, planData, userId) {
  await requireSession();

  const { data, error } = await supabase
    .from('trips')
    .insert([
      {
        user_id: userId,
        origin: tripInputs.startingLocation,
        destination: tripInputs.destination,
        start_date: tripInputs.startDate,
        end_date: tripInputs.endDate,
        travelers: Number(tripInputs.travelers),
        budget: Number(tripInputs.budget),
        travel_style: tripInputs.preference || 'balanced',
        itinerary: planData,
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch all trips belonging to the logged-in user.
 * RLS ensures only their own trips are returned.
 */
export async function fetchUserTrips() {
  await requireSession();

  const { data, error } = await supabase
    .from('trips')
    .select('id, user_id, origin, destination, start_date, end_date, travelers, budget, travel_style, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Delete a trip by ID.
 */
export async function deleteTrip(tripId) {
  await requireSession();

  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId);

  if (error) throw error;
}
