import { createClient } from '@supabase/supabase-js'

// Get credentials from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials. Please check your .env file.\n' +
    'Required variables:\n' +
    '- EXPO_PUBLIC_SUPABASE_URL\n' +
    '- EXPO_PUBLIC_SUPABASE_ANON_KEY'
  )
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable auto token refresh
    autoRefreshToken: true,
    // Persist session in storage
    persistSession: true,
    // Detect session from URL (for web)
    detectSessionInUrl: false,
  },
})

// Helper to check if Supabase is configured correctly
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count')
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('✅ Supabase connected successfully')
    return true
  } catch (error) {
    console.error('Supabase connection failed:', error)
    return false
  }
}