-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'rewarded')),
  points_awarded INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at DESC);

-- Enable Row Level Security
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own referrals" ON referrals;
DROP POLICY IF EXISTS "Users can insert referrals" ON referrals;

-- Create RLS policies
CREATE POLICY "Users can view their own referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Users can insert referrals"
  ON referrals FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to handle referral rewards
CREATE OR REPLACE FUNCTION handle_referral_reward()
RETURNS TRIGGER AS $$
BEGIN
  -- Update referrer's referral count
  UPDATE user_profiles
  SET referral_count = referral_count + 1
  WHERE id = NEW.referrer_id;
  
  -- Create activity for referrer
  INSERT INTO activities (user_id, activity_type, points_delta, description, related_user_id, related_user_name)
  SELECT 
    NEW.referrer_id,
    'referral_joined',
    NEW.points_awarded,
    'Joined through your referral link',
    NEW.referred_id,
    up.full_name
  FROM user_profiles up
  WHERE up.id = NEW.referred_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to handle referral rewards
DROP TRIGGER IF EXISTS on_referral_created ON referrals;
CREATE TRIGGER on_referral_created
  AFTER INSERT ON referrals
  FOR EACH ROW EXECUTE FUNCTION handle_referral_reward();
