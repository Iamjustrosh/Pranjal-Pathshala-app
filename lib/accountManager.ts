import { SecureStorage } from './secureStorage'
import { SavedAccount } from '@/types/auth.types'
import { APP_CONFIG } from '@/constants/config'

/**
 * Manages multiple user accounts on a single device
 * Handles storage, retrieval, and switching between accounts
 */
export class AccountManager {
  private static ACCOUNTS_KEY = 'accounts'
  private static ACTIVE_ACCOUNT_KEY = 'activeAccountId'

  /**
   * Get all saved accounts
   */
  static async getAccounts(): Promise<SavedAccount[]> {
    try {
      const data = await SecureStorage.getItem(this.ACCOUNTS_KEY)
      if (!data) return []
      
      const accounts: SavedAccount[] = JSON.parse(data)
      return accounts
    } catch (error) {
      console.error('Failed to get accounts:', error)
      return []
    }
  }

  /**
   * Save accounts array
   */
  static async saveAccounts(accounts: SavedAccount[]): Promise<void> {
    try {
      await SecureStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts))
    } catch (error) {
      console.error('Failed to save accounts:', error)
      throw error
    }
  }

  /**
   * Add new account
   * @throws Error if max accounts reached or account already exists
   */
  static async addAccount(account: SavedAccount): Promise<void> {
    const accounts = await this.getAccounts()
    
    // Check max limit
    if (accounts.length >= APP_CONFIG.MAX_ACCOUNTS) {
      throw new Error(`Maximum ${APP_CONFIG.MAX_ACCOUNTS} accounts allowed per device`)
    }
    
    // Check if account already exists
    const exists = accounts.find(a => a.id === account.id)
    if (exists) {
      // Update existing account instead of adding duplicate
      return this.updateAccount(account)
    }
    
    // Add new account
    accounts.push(account)
    await this.saveAccounts(accounts)
  }

  /**
   * Update existing account data
   */
  static async updateAccount(updatedAccount: SavedAccount): Promise<void> {
    const accounts = await this.getAccounts()
    const index = accounts.findIndex(a => a.id === updatedAccount.id)
    
    if (index === -1) {
      throw new Error('Account not found')
    }
    
    accounts[index] = updatedAccount
    await this.saveAccounts(accounts)
  }

  /**
   * Remove account by ID
   */
  static async removeAccount(accountId: string): Promise<void> {
    const accounts = await this.getAccounts()
    const filtered = accounts.filter(a => a.id !== accountId)
    
    await this.saveAccounts(filtered)
    
    // If removed account was active, clear active account
    const activeId = await this.getActiveAccountId()
    if (activeId === accountId) {
      await this.clearActiveAccount()
    }
  }

  /**
   * Get currently active account ID
   */
  static async getActiveAccountId(): Promise<string | null> {
    try {
      return await SecureStorage.getItem(this.ACTIVE_ACCOUNT_KEY)
    } catch (error) {
      console.error('Failed to get active account ID:', error)
      return null
    }
  }

  /**
   * Set active account
   */
  static async setActiveAccount(accountId: string): Promise<void> {
    // Verify account exists
    const accounts = await this.getAccounts()
    const account = accounts.find(a => a.id === accountId)
    
    if (!account) {
      throw new Error('Account not found')
    }
    
    await SecureStorage.setItem(this.ACTIVE_ACCOUNT_KEY, accountId)
  }

  /**
   * Clear active account (shows account switcher)
   */
  static async clearActiveAccount(): Promise<void> {
    await SecureStorage.removeItem(this.ACTIVE_ACCOUNT_KEY)
  }

  /**
   * Get active account data
   */
  static async getActiveAccount(): Promise<SavedAccount | null> {
    const activeId = await this.getActiveAccountId()
    if (!activeId) return null
    
    const accounts = await this.getAccounts()
    return accounts.find(a => a.id === activeId) || null
  }

  /**
   * Update unread notification count for specific account
   */
  static async updateUnreadCount(accountId: string, count: number): Promise<void> {
    const accounts = await this.getAccounts()
    const updated = accounts.map(account =>
      account.id === accountId
        ? { ...account, unread_notifications: count }
        : account
    )
    await this.saveAccounts(updated)
  }

  /**
   * Get account by ID
   */
  static async getAccountById(accountId: string): Promise<SavedAccount | null> {
    const accounts = await this.getAccounts()
    return accounts.find(a => a.id === accountId) || null
  }

  /**
   * Check if account exists
   */
  static async accountExists(accountId: string): Promise<boolean> {
    const account = await this.getAccountById(accountId)
    return account !== null
  }

  /**
   * Clear all accounts (logout all)
   */
  static async clearAll(): Promise<void> {
    await SecureStorage.removeItem(this.ACCOUNTS_KEY)
    await SecureStorage.removeItem(this.ACTIVE_ACCOUNT_KEY)
  }

  /**
   * Get accounts count
   */
  static async getAccountsCount(): Promise<number> {
    const accounts = await this.getAccounts()
    return accounts.length
  }

  /**
   * Check if max accounts reached
   */
  static async isMaxAccountsReached(): Promise<boolean> {
    const count = await this.getAccountsCount()
    return count >= APP_CONFIG.MAX_ACCOUNTS
  }
}