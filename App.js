// App.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import MyGarageScreen from './src/screens/MyGarageScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ReportsScreen from './src/screens/ReportsScreen';

// Import Stack Screens
import AddVehicleScreen from './src/screens/AddVehicleScreen';
import DiagnosticsUploadScreen from './src/screens/DiagnosticsUploadScreen';
import ManualVehicleEntryScreen from './src/screens/ManualVehicleEntryScreen';
import MechanicProfileScreen from './src/screens/MechanicProfileScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ServiceBookingScreen from './src/screens/ServiceBookingScreen';
import VehicleDetailScreen from './src/screens/VehicleDetailScreen';
import VinScannerScreen from './src/screens/VinScannerScreen';

import { theme } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator Component
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'My Garage') {
            iconName = 'directions-car';
          } else if (route.name === 'Marketplace') {
            iconName = 'store';
          } else if (route.name === 'Reports') {
            iconName = 'place';
          } else if (route.name === 'Profile') {
            iconName = 'person';
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Garage" component={MyGarageScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen 
        name="ServiceBooking" 
        component={ServiceBookingScreen}
        options={{ title: 'Book Service' }}
      />
      <Stack.Screen 
        name="MechanicProfile" 
        component={MechanicProfileScreen}
        options={{ title: 'Mechanic Profile' }}
      />
      <Stack.Screen 
        name="AddVehicle" 
        component={AddVehicleScreen}
        options={{ title: 'Add Vehicle' }}
      />
      <Stack.Screen 
        name="VinScanner" 
        component={VinScannerScreen}
        options={{ title: 'Scan VIN' }}
      />
      <Stack.Screen 
        name="ManualVehicleEntry" 
        component={ManualVehicleEntryScreen}
        options={{ title: 'Enter Vehicle Details' }}
      />
      <Stack.Screen 
        name="VehicleDetail" 
        component={VehicleDetailScreen}
        options={{ title: 'Vehicle Details' }}
      />
      <Stack.Screen 
        name="DiagnosticsUpload" 
        component={DiagnosticsUploadScreen}
        options={{ title: 'Upload Diagnostics' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
        <Toast />
      </NavigationContainer>
    </PaperProvider>
  );
}