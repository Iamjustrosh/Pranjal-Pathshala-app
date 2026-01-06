import { create } from 'zustand'
import { SavedAccount, UserProfile } from '@/types/auth.types'

interface AuthStore {
  // State
  accounts: SavedAccount[]
  activeAccountId: string | null
  currentUser: UserProfile | null
  isLoading: boolean
  error: string | null
  isInitialized: boolean

  // Actions
  setAccounts: (accounts: SavedAccount[]) => void
  setActiveAccount: (id: string | null) => void
  setCurrentUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setInitialized: (initialized: boolean) => void
  
  addAccount: (account: SavedAccount) => void
  removeAccount: (id: string) => void
  updateAccount: (account: SavedAccount) => void
  updateUnreadCount: (accountId: string, count: number) => void
  
  clearAuth: () => void
  reset: () => void
}

const initialState = {
  accounts: [],
  activeAccountId: null,
  currentUser: null,
  isLoading: true,
  error: null,
  isInitialized: false,
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  // Setters
  setAccounts: (accounts) => set({ accounts }),
  
  setActiveAccount: (id) => set({ activeAccountId: id }),
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setInitialized: (initialized) => set({ isInitialized: initialized }),

  // Account management
  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
    })),

  removeAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== id),
      activeAccountId: state.activeAccountId === id ? null : state.activeAccountId,
    })),

  updateAccount: (account) =>
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === account.id ? account : a
      ),
    })),

  updateUnreadCount: (accountId, count) =>
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === accountId ? { ...a, unread_notifications: count } : a
      ),
    })),

  // Clear current session but keep accounts
  clearAuth: () =>
    set({
      activeAccountId: null,
      currentUser: null,
      error: null,
    }),

  // Complete reset (logout all)
  reset: () => set(initialState),
}))