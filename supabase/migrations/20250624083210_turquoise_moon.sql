/*
  # Create student records table

  1. New Tables
    - `student_records`
      - `id` (uuid, primary key)
      - `student_name` (text, not null)
      - `usn` (text, not null)
      - `semester` (integer, not null)
      - `subjects` (jsonb, not null) - stores array of subject data
      - `previous_semesters` (jsonb, default empty array) - stores previous semester data
      - `sgpa` (decimal, not null) - current semester SGPA
      - `cgpa` (decimal, nullable) - cumulative CGPA
      - `total_credits` (integer, not null) - total credits for current semester
      - `created_at` (timestamp, default now)

  2. Security
    - Enable RLS on `student_records` table
    - Add policy for public access (since no authentication required)
*/

CREATE TABLE IF NOT EXISTS student_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  usn text NOT NULL,
  semester integer NOT NULL,
  subjects jsonb NOT NULL,
  previous_semesters jsonb DEFAULT '[]'::jsonb,
  sgpa decimal(4,2) NOT NULL,
  cgpa decimal(4,2),
  total_credits integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE student_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for student records"
  ON student_records
  FOR ALL
  USING (true);