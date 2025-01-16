export interface User {
  id: string;
  email: string;
}

export interface InterviewExperience {
  id: string;
  name: string;
  country: string;
  company: string;
  questions: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
  experience_years?: string;
  ctc?: string;
  verified?: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}