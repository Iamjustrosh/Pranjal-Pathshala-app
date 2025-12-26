import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function App() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const { data, error } = await supabase
        .from('academic_sessions')
        .select('*');

      if (error) throw error;
      
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pranjal Pathshala 🎓</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.subtitle}>
            Connected to Supabase! ✅
          </Text>
          <Text style={styles.data}>
            Found {sessions.length} session(s)
          </Text>
          {sessions.map((session) => (
            <Text key={session.id} style={styles.session}>
              • {session.session_name}
            </Text>
          ))}
        </View>
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
  },
  session: {
    fontSize: 14,
    color: '#666',
  },
});