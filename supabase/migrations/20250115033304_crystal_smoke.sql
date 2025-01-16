/*
  # Enhanced Experiences Table Schema

  1. Table Changes
    - Add constraints to ensure data quality
    - Add trigger for automatic updated_at updates
  
  2. Indexes
    - Add indexes for user_id and created_at for better query performance
*/

-- Create experiences table with proper constraints
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS experiences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL CHECK (char_length(trim(name)) > 0),
    country text NOT NULL CHECK (char_length(trim(country)) > 0),
    company text NOT NULL CHECK (char_length(trim(company)) > 0),
    questions text[] NOT NULL CHECK (array_length(questions, 1) > 0),
    user_id uuid REFERENCES auth.users NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS if not already enabled
DO $$ BEGIN
  ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ BEGIN
  CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- RLS Policies with existence checks
DO $$ BEGIN
  DROP POLICY IF EXISTS "Experiences are viewable by everyone" ON experiences;
  CREATE POLICY "Experiences are viewable by everyone"
    ON experiences
    FOR SELECT
    USING (true);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can create their own experiences" ON experiences;
  CREATE POLICY "Users can create their own experiences"
    ON experiences
    FOR INSERT
    TO authenticated
    WITH CHECK (
      auth.uid() = user_id AND
      array_length(questions, 1) > 0 AND
      char_length(trim(name)) > 0 AND
      char_length(trim(country)) > 0 AND
      char_length(trim(company)) > 0
    );
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update their own experiences" ON experiences;
  CREATE POLICY "Users can update their own experiences"
    ON experiences
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (
      auth.uid() = user_id AND
      array_length(questions, 1) > 0 AND
      char_length(trim(name)) > 0 AND
      char_length(trim(country)) > 0 AND
      char_length(trim(company)) > 0
    );
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete their own experiences" ON experiences;
  CREATE POLICY "Users can delete their own experiences"
    ON experiences
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
END $$;

-- Create indexes if they don't exist
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS experiences_user_id_idx ON experiences(user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS experiences_created_at_idx ON experiences(created_at DESC);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;