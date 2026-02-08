import { createClient } from "@/lib/supabase/server";
import type {
  UserProfile,
  Activity,
  UserStats,
  UpdateProfileInput,
  CreateActivityInput,
} from "@/lib/types/user";

/**
 * Get user profile by user ID
 */
export async function getUserProfile(
  userId: string
): Promise<{ data: UserProfile | null; error: any }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return { data, error };
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  input: UpdateProfileInput
): Promise<{ data: UserProfile | null; error: any }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .update(input)
    .eq("id", userId)
    .select()
    .maybeSingle();

  return { data, error };
}

/**
 * Get user statistics for dashboard
 */
export async function getUserStats(
  userId: string
): Promise<{ data: UserStats | null; error: any }> {
  const supabase = await createClient();

  // Get profile data
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("total_points, referral_count")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    return { data: null, error: profileError };
  }

  // Return default stats if profile doesn't exist
  if (!profile) {
    return {
      data: {
        total_points: 0,
        referral_count: 0,
        services_purchased: 0,
      },
      error: null,
    };
  }

  // Count services purchased (activities with type 'service_purchased')
  const { count: serviceCount, error: countError } = await supabase
    .from("activities")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("activity_type", "service_purchased");

  if (countError) {
    return { data: null, error: countError };
  }

  const stats: UserStats = {
    total_points: profile.total_points || 0,
    referral_count: profile.referral_count || 0,
    services_purchased: serviceCount || 0,
  };

  return { data: stats, error: null };
}

/**
 * Get user activities with pagination
 */
export async function getUserActivities(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<{ data: Activity[] | null; error: any }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  return { data, error };
}

/**
 * Generate a new referral code for user
 */
export async function generateReferralCode(
  userId: string
): Promise<{ data: string | null; error: any }> {
  const supabase = await createClient();

  // Generate a random 8-character code
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();

  const { data, error } = await supabase
    .from("user_profiles")
    .update({ referral_code: code })
    .eq("id", userId)
    .select("referral_code")
    .maybeSingle();

  if (error) {
    return { data: null, error };
  }

  if (!data) {
    return { data: null, error: "Failed to generate referral code" };
  }

  return { data: data.referral_code, error: null };
}

/**
 * Track a referral when a new user signs up with a referral code
 */
export async function trackReferral(
  referralCode: string,
  newUserId: string
): Promise<{ success: boolean; error: any }> {
  const supabase = await createClient();

  // Find the referrer by code
  const { data: referrer, error: referrerError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("referral_code", referralCode)
    .maybeSingle();

  if (referrerError || !referrer) {
    return { success: false, error: referrerError || "Referrer not found" };
  }

  // Create referral record
  const { error: referralError } = await supabase.from("referrals").insert({
    referrer_id: referrer.id,
    referred_id: newUserId,
    referral_code: referralCode,
    status: "completed",
    points_awarded: 3,
  });

  if (referralError) {
    return { success: false, error: referralError };
  }

  return { success: true, error: null };
}

/**
 * Create an activity log entry
 */
export async function createActivity(
  userId: string,
  input: CreateActivityInput
): Promise<{ data: Activity | null; error: any }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("activities")
    .insert({
      user_id: userId,
      ...input,
    })
    .select()
    .maybeSingle();

  return { data, error };
}

/**
 * Get current authenticated user's profile
 */
export async function getCurrentUserProfile(): Promise<{
  data: UserProfile | null;
  error: any;
}> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: null, error: authError || "Not authenticated" };
  }

  return getUserProfile(user.id);
}
