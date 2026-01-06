import * as SecureStore from 'expo-secure-store'

/**
 * Secure storage wrapper using Expo SecureStore
 * Data is encrypted at rest using device hardware
 */
export class SecureStorage {
  /**
   * Save data securely
   */
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.error('SecureStorage setItem error:', error)
      throw new Error(`Failed to save ${key}`)
    }
  }

  /**
   * Retrieve data securely
   */
  static async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.error('SecureStorage getItem error:', error)
      return null
    }
  }

  /**
   * Remove data
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (error) {
      console.error('SecureStorage removeItem error:', error)
      throw new Error(`Failed to remove ${key}`)
    }
  }

  /**
   * Check if key exists
   */
  static async hasItem(key: string): Promise<boolean> {
    const value = await this.getItem(key)
    return value !== null
  }

  /**
   * Clear all stored data (logout all accounts)
   */
  static async clear(): Promise<void> {
    // SecureStore doesn't have a clear all method
    // So we need to remove known keys manually
    const keys = ['accounts', 'activeAccountId']
    
    for (const key of keys) {
      try {
        await this.removeItem(key)
      } catch (error) {
        console.error(`Failed to clear ${key}:`, error)
      }
    }
  }
}