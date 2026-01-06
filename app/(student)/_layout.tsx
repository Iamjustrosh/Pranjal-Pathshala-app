import { Tabs } from 'expo-router'

export default function StudentLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home',
          tabBarIcon: () => null, // We'll add icons later
        }} 
      />
      <Tabs.Screen 
        name="study-material" 
        options={{ title: 'Study' }} 
      />
      <Tabs.Screen 
        name="quiz" 
        options={{ title: 'Quiz' }} 
      />
      <Tabs.Screen 
        name="analytics" 
        options={{ title: 'Analytics' }} 
      />
    </Tabs>
  )
}