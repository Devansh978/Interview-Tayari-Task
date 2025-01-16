import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if configuration is missing
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://ctynaegkreiqymjjeoed.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0eW5hZWdrcmVpcXltamplb2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4ODAyMTIsImV4cCI6MjA1MjQ1NjIxMn0.MI6whajKHdLDQmYIh4AVk5bxm_PEvcwCH17IWsvMbPU');