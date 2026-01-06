export interface SavedAccount {
    id: string
    username: string
    full_name: string
    email: string
    role: 'student' | 'admin'
    class?: string // Only for students
    photo_url: string | null
    session_token: string
    refresh_token: string
    unread_notifications: number
  }
  
  export interface LoginCredentials {
    username: string
    password: string
  }
  
  export interface SignupData {
    full_name: string
    email: string
    phone: string
    date_of_birth: string // ISO date string
    class: string
    subjects: string[]
    photo_url?: string
  }
  
  export interface AuthState {
    accounts: SavedAccount[]
    activeAccountId: string | null
    currentUser: UserProfile | null
    isLoading: boolean
    error: string | null
  }
  
  export interface UserProfile {
    id: string
    username: string
    role: 'student' | 'admin'
    full_name: string
    email: string
    phone: string
    photo_url: string | null
    date_of_birth: string | null
    admission_year: number | null
    status: 'pending' | 'approved' | 'rejected'
    created_at: string
    approved_at: string | null
  }
  
  export interface Session {
    access_token: string
    refresh_token: string
    expires_at: number
    user: {
      id: string
      email: string
    }
  }