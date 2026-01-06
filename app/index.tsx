import { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { AccountManager } from '@/lib/accountManager'
import { SavedAccount } from '@/types/auth.types'

export default function App() {
  const [accounts, setAccounts] = useState<SavedAccount[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    loadAccounts()
  }, [])

  async function loadAccounts() {
    const saved = await AccountManager.getAccounts()
    const active = await AccountManager.getActiveAccountId()
    setAccounts(saved)
    setActiveId(active)
  }

  async function addTestAccount() {
    const testAccount: SavedAccount = {
      id: `test-${Date.now()}`,
      username: 'PP25091000',
      full_name: 'Test Student',
      email: 'test@test.com',
      role: 'student',
      class: '09',
      photo_url: null,
      session_token: 'test-token',
      refresh_token: 'refresh-token',
      unread_notifications: 0,
    }

    await AccountManager.addAccount(testAccount)
    await AccountManager.setActiveAccount(testAccount.id)
    await loadAccounts()
  }

  async function clearAll() {
    await AccountManager.clearAll()
    await loadAccounts()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Manager Test</Text>
      
      <Text style={styles.subtitle}>
        Accounts: {accounts.length} / 5
      </Text>
      
      <Text style={styles.subtitle}>
        Active: {activeId || 'None'}
      </Text>

      {accounts.map((account) => (
        <View key={account.id} style={styles.accountCard}>
          <Text>{account.full_name}</Text>
          <Text>{account.username}</Text>
          <Text>🔴 {account.unread_notifications}</Text>
        </View>
      ))}

      <Button title="Add Test Account" onPress={addTestAccount} />
      <Button title="Clear All" onPress={clearAll} color="red" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  accountCard: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
})