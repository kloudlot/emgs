-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('points_added', 'referral_joined', 'service_purchased')),
  points_delta INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  related_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  related_user_name VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(activity_type);

-- Enable Row Level Security
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own activities" ON activities;
DROP POLICY IF EXISTS "Users can insert their own activities" ON activities;

-- Create RLS policies
CREATE POLICY "Users can view their own activities"
  ON activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update user points when activity is created
CREATE OR REPLACE FUNCTION update_user_points_on_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.points_delta != 0 THEN
    UPDATE user_profiles
    SET total_points = total_points + NEW.points_delta
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update points
DROP TRIGGER IF EXISTS on_activity_created ON activities;
CREATE TRIGGER on_activity_created
  AFTER INSERT ON activities
  FOR EACH ROW EXECUTE FUNCTION update_user_points_on_activity();
