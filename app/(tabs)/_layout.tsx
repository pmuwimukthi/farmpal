// (tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

// --- FIXED PATHS ---
import { ICONS } from '../../constants/assets'; // Import our icons
import { COLORS } from '../../constants/colors'; // Import our colors
// --- END OF FIX ---

// A helper component to render the tab icon
function TabIcon({icon, color}: {icon: any; color: string}) {
  return <Image source={icon} style={{width: 28, height: 28, tintColor: color}} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.highlight, // Your action yellow
        tabBarInactiveTintColor: COLORS.subtext, // Your subtext color
        tabBarStyle: {
          backgroundColor: '#ffffff', // Or any color you prefer
        },
        headerShown: false, // We let each screen manage its own header
      }}>
      
      {/* This is your first tab (e.g., Home) */}
      <Tabs.Screen
        name="index" // This links to (tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <TabIcon icon={ICONS.home} color={color} />,
        }}
      />
      
      {/* This is your NEW notes tab.
        It must match the file name "notes.tsx"
      */}
      <Tabs.Screen
        name="notes" // This links to (tabs)/notes.tsx
        options={{
          title: 'Notes',
          tabBarIcon: ({color}) => <TabIcon icon={ICONS.calendar} color={color} />,
        }}
      />

      {/* Add your other tabs here */}
      <Tabs.Screen
        name="analytics" // This would link to (tabs)/analytics.tsx
        options={{
          title: 'Analytics',
          tabBarIcon: ({color}) => <TabIcon icon={ICONS.analytics} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile" // This would link to (tabs)/profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => <TabIcon icon={ICONS.profile} color={color} />,
        }}
      />
    </Tabs>
  );
}