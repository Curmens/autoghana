// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'my-garage') {
            iconName = 'directions-car';
          } else if (route.name === 'marketplace') {
            iconName = 'store';
          } else if (route.name === 'reports') {
            iconName = 'place';
          } else if (route.name === 'profile') {
            iconName = 'person';
          } else {
            iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: '/'
        }}
      />
      <Tabs.Screen
        name="my-garage"
        options={{ title: 'My Garage' }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{ title: 'Marketplace' }}
      />
      <Tabs.Screen
        name="reports"
        options={{ title: 'Reports' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}