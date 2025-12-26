import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qoooeuhafwxbastarxuc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvb29ldWhhZnd4YmFzdGFyeHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NzE0NTUsImV4cCI6MjA4MjA0NzQ1NX0.5M7dA65jDzAMsYe0oMh0vEb9Va5w__b7tsz2fNoYTPw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);