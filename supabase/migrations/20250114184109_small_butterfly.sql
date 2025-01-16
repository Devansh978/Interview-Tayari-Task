/*
  # Create experiences table

  1. New Tables
    - `experiences`
      - `id` (uuid, primary key)
      - `name` (text)
      - `country` (text)
      - `company` (text)
      - `questions` (text array)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `experiences` table
    - Add policies for:
      - Anyone can read experiences
      - Authenticated users can create their own experiences
      - Users can only update/delete their own experiences
*/

CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  company text NOT NULL,
  questions text[] NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read experiences
CREATE POLICY "Experiences are viewable by everyone"
  ON experiences
  FOR SELECT
  USING (true);

-- Allow authenticated users to create experiences
CREATE POLICY "Users can create their own experiences"
  ON experiences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own experiences
CREATE POLICY "Users can update their own experiences"
  ON experiences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own experiences
CREATE POLICY "Users can delete their own experiences"
  ON experiences
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);