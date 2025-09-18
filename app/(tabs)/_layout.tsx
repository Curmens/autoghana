import { Tabs } from 'expo-router';
import React from 'react';
import { ModernTabBar } from '../components/ModernTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <ModernTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // Hide default tab bar since we're using custom one
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: '/',
        }}
      />
      <Tabs.Screen
        name="my-garage"
        options={{
          title: 'My Garage',
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      
      {/* Hidden screens */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
