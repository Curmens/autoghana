// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { theme } from './(tabs)/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <StatusBar style="auto" />
          <Stack
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
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="product-detail" 
              options={{ title: 'Product Details' }}
            />
            <Stack.Screen 
              name="service-booking" 
              options={{ title: 'Book Service' }}
            />
            <Stack.Screen 
              name="mechanic-profile" 
              options={{ title: 'Mechanic Profile' }}
            />
            <Stack.Screen 
              name="add-vehicle" 
              options={{ title: 'Add Vehicle' }}
            />
            <Stack.Screen 
              name="vin-scanner" 
              options={{ title: 'Scan VIN' }}
            />
            <Stack.Screen 
              name="manual-vehicle-entry" 
              options={{ title: 'Enter Vehicle Details' }}
            />
            <Stack.Screen 
              name="vehicle-detail" 
              options={{ title: 'Vehicle Details' }}
            />
            <Stack.Screen 
              name="diagnostics-upload" 
              options={{ title: 'Upload Diagnostics' }}
            />
          </Stack>
          <Toast />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}