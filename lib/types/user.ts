export interface UserProfile {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  class_status: 'active' | 'inactive';
  class_plan: string;
  total_points: number;
  referral_count: number;
  referral_code: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  activity_type: 'points_added' | 'referral_joined' | 'service_purchased';
  points_delta: number;
  description: string;
  related_user_id: string | null;
  related_user_name: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  status: 'pending' | 'completed' | 'rewarded';
  points_awarded: number;
  created_at: string;
}

export interface UserStats {
  total_points: number;
  referral_count: number;
  services_purchased: number;
}

export interface UpdateProfileInput {
  full_name?: string;
  phone_number?: string;
  avatar_url?: string;
}

export interface CreateActivityInput {
  activity_type: 'points_added' | 'referral_joined' | 'service_purchased';
  points_delta: number;
  description: string;
  related_user_id?: string;
  related_user_name?: string;
  metadata?: Record<string, any>;
}
