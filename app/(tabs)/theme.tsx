// app/(tabs)/theme.tsx
import { TextStyle, ViewStyle } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

// Define proper theme types
export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    placeholder: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontWeight: {
    normal: TextStyle['fontWeight'];
    medium: TextStyle['fontWeight'];
    semibold: TextStyle['fontWeight'];
    bold: TextStyle['fontWeight'];
  };
  shadows: {
    small: ViewStyle;
    medium: ViewStyle;
    large: ViewStyle;
  };
}

export const theme: AppTheme = {
  colors: {
    primary: '#1F2937', // Dark Charcoal Gray
    secondary: '#6B7280', // Medium Gray
    success: '#22C55E', // Vibrant Green
    warning: '#FBBF24', // Amber Yellow
    error: '#EF4444', // Red
    background: '#F9FAFB', // Light Gray Background
    surface: '#FFFFFF', // White
    text: '#1F2937', // Dark text
    textSecondary: '#6B7280', // Secondary text
    border: '#E5E7EB', // Light border
    placeholder: '#9CA3AF', // Placeholder text
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  shadows: {
    small: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

// Paper theme with proper typing
export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    surface: theme.colors.surface,
    background: theme.colors.background,
    text: theme.colors.text,
    placeholder: theme.colors.placeholder,
    error: theme.colors.error,
  },
};