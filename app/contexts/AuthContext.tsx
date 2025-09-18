// ===== 1. Create Auth Context (app/contexts/AuthContext.tsx) =====
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
    fullName: string;
    phoneNumber?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string, phoneNumber?: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error checking auth state:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate API call - replace with actual authentication
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockUser: User = {
                id: '1',
                email,
                fullName: 'Kofi Asante',
                phoneNumber: '+233 24 123 4567',
            };

            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
        } catch (error) {
            throw new Error('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, fullName: string, phoneNumber?: string) => {
        setIsLoading(true);
        try {
            // Simulate API call - replace with actual registration
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newUser: User = {
                id: Date.now().toString(),
                email,
                fullName,
                phoneNumber,
            };

            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            throw new Error('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
