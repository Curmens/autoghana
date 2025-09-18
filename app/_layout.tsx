import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { paperTheme, theme } from './(tabs)/theme';
import { SplashScreen } from './components/SplashScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// App Navigator Component
function AppNavigator() {
    const { isAuthenticated, isLoading } = useAuth();
    const [showSplash, setShowSplash] = useState(true);

    // Show splash screen for first-time visitors or on app restart
    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    // Show loading state while checking authentication
    if (isLoading) {
        return <SplashScreen onFinish={() => { }} />;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: false,
            }}
        >
            {!isAuthenticated ? (
                // Authentication Stack
                <>
                    <Stack.Screen
                        name="auth/login"
                        options={{
                            headerShown: false,
                            animation: 'fade'
                        }}
                    />
                    <Stack.Screen
                        name="auth/register"
                        options={{
                            headerShown: false,
                            animation: 'slide_from_right'
                        }}
                    />
                </>
            ) : (
                // Main App Stack
                <>
                    <Stack.Screen name="(tabs)asdf" options={{ headerShown: true, title: "aoeinfaoiwnefoinf" }} />
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
                </>
            )}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <PaperProvider theme={paperTheme}>
                        <StatusBar style="auto" />
                        <AppNavigator />
                        <Toast />
                    </PaperProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </AuthProvider>
    );
}