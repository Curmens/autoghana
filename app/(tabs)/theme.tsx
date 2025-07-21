// app/(tabs)/theme.tsx - Unified Airbnb Theme for AutoGhana
import { TextStyle, ViewStyle } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

// Airbnb Design Tokens - Official Color Palette
export const airbnbTokens = {
  colors: {
    // Airbnb Brand Colors
    rausch: '#FF5A5F', // Airbnb Red (Primary)
    babu: '#00A699', // Airbnb Teal (Secondary)
    arches: '#FC642D', // Airbnb Orange (Accent)
    hof: '#484848', // Dark Gray
    foggy: '#767676', // Medium Gray
    light: '#B0B0B0', // Light Gray
    lighter: '#D8D8D8', // Lighter Gray
    lightest: '#F7F7F7', // Lightest Gray
    white: '#FFFFFF',
    black: '#222222',
    
    // Extended Semantic Colors
    success: '#008A05',
    warning: '#FFB400',
    error: '#FF5A5F',
    info: '#00A699',
    
    // Surface Colors
    background: '#FFFFFF',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.48)',
    disabled: '#F7F7F7',
    
    // Text Colors
    textPrimary: '#222222',
    textSecondary: '#717171',
    textTertiary: '#B0B0B0',
    textInverse: '#FFFFFF',
    textDisabled: '#D8D8D8',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 50,
  },
  
  typography: {
    sizes: {
      caption: 12,
      body: 14,
      bodyLarge: 16,
      title: 18,
      titleLarge: 22,
      heading: 26,
      display: 32,
    },
    weights: {
      regular: '400' as TextStyle['fontWeight'],
      medium: '500' as TextStyle['fontWeight'],
      semibold: '600' as TextStyle['fontWeight'],
      bold: '700' as TextStyle['fontWeight'],
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  shadows: {
    subtle: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    soft: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

// Universal theme interface compatible with existing components
export interface AppTheme {
  colors: {
    // Primary colors
    primary: string;
    secondary: string;
    accent: string;
    
    // Status colors
    success: string;
    warning: string;
    error: string;
    
    // Background colors
    background: string;
    surface: string;
    card: string;
    
    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    placeholder: string;
    
    // Border and divider colors
    border: string;
    divider: string;
    
    // Specific UI colors
    white: string;
    black: string;
    
    // Extended Airbnb colors
    rausch?: string;
    babu?: string;
    arches?: string;
    hof?: string;
    foggy?: string;
    light?: string;
    lighter?: string;
    lightest?: string;

    // text colors
    textPrimary?: string;
  };
  
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl?: number;
  };
  
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl?: number;
    round?: number;
  };
  
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl?: number;
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
    subtle: ViewStyle;
    soft: ViewStyle;
  };
  
  typography?: {
    sizes: typeof airbnbTokens.typography.sizes;
    weights: typeof airbnbTokens.typography.weights;
    lineHeights: typeof airbnbTokens.typography.lineHeights;
  };
}

// Main theme using Airbnb tokens
export const theme: AppTheme = {
  colors: {
    // Map Airbnb colors to standard theme colors
    primary: airbnbTokens.colors.rausch, // #FF5A5F
    secondary: airbnbTokens.colors.babu, // #00A699
    accent: airbnbTokens.colors.arches, // #FC642D
    
    // Status colors
    success: airbnbTokens.colors.success, // #008A05
    warning: airbnbTokens.colors.warning, // #FFB400
    error: airbnbTokens.colors.error, // #FF5A5F
    
    // Background colors
    background: airbnbTokens.colors.white, // #FFFFFF
    surface: airbnbTokens.colors.white, // #FFFFFF
    card: airbnbTokens.colors.white, // #FFFFFF
    
    // Text colors
    text: airbnbTokens.colors.textPrimary, // #222222
    textSecondary: airbnbTokens.colors.textSecondary, // #717171
    textTertiary: airbnbTokens.colors.textTertiary, // #B0B0B0
    placeholder: airbnbTokens.colors.textTertiary, // #B0B0B0
    
    // Border colors
    border: airbnbTokens.colors.lighter, // #D8D8D8
    divider: airbnbTokens.colors.lighter, // #D8D8D8
    
    // Basic colors
    white: airbnbTokens.colors.white, // #FFFFFF
    black: airbnbTokens.colors.black, // #222222
    
    // Extended Airbnb colors for direct access
    rausch: airbnbTokens.colors.rausch,
    babu: airbnbTokens.colors.babu,
    arches: airbnbTokens.colors.arches,
    hof: airbnbTokens.colors.hof,
    foggy: airbnbTokens.colors.foggy,
    light: airbnbTokens.colors.light,
    lighter: airbnbTokens.colors.lighter,
    lightest: airbnbTokens.colors.lightest,
  },
  
  spacing: {
    xs: airbnbTokens.spacing.xs, // 4
    sm: airbnbTokens.spacing.sm, // 8
    md: airbnbTokens.spacing.md, // 12
    lg: airbnbTokens.spacing.lg, // 16
    xl: airbnbTokens.spacing.xl, // 24
    xxl: airbnbTokens.spacing.xxl, // 32
    xxxl: airbnbTokens.spacing.xxxl, // 48
  },
  
  borderRadius: {
    sm: airbnbTokens.borderRadius.sm, // 4
    md: airbnbTokens.borderRadius.md, // 8
    lg: airbnbTokens.borderRadius.lg, // 12
    xl: airbnbTokens.borderRadius.xl, // 16
    xxl: airbnbTokens.borderRadius.xxl, // 24
    round: airbnbTokens.borderRadius.round, // 50
  },
  
  fontSize: {
    xs: airbnbTokens.typography.sizes.caption, // 12
    sm: airbnbTokens.typography.sizes.body, // 14
    md: airbnbTokens.typography.sizes.bodyLarge, // 16
    lg: airbnbTokens.typography.sizes.title, // 18
    xl: airbnbTokens.typography.sizes.titleLarge, // 22
    xxl: airbnbTokens.typography.sizes.heading, // 26
    xxxl: airbnbTokens.typography.sizes.display, // 32
  },
  
  fontWeight: {
    normal: airbnbTokens.typography.weights.regular, // '400'
    medium: airbnbTokens.typography.weights.medium, // '500'
    semibold: airbnbTokens.typography.weights.semibold, // '600'
    bold: airbnbTokens.typography.weights.bold, // '700'
  },
  
  shadows: {
    small: airbnbTokens.shadows.subtle,
    medium: airbnbTokens.shadows.medium,
    large: airbnbTokens.shadows.large,
    subtle: airbnbTokens.shadows.subtle,
    soft: airbnbTokens.shadows.soft,
  },
  
  typography: airbnbTokens.typography,
};

// React Native Paper theme configuration
export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary, // Airbnb Red
    secondary: theme.colors.secondary, // Airbnb Teal
    surface: theme.colors.surface,
    background: theme.colors.background,
    text: theme.colors.text,
    placeholder: theme.colors.placeholder,
    error: theme.colors.error,
    onSurface: theme.colors.text,
    onBackground: theme.colors.text,
    accent: theme.colors.accent, // Airbnb Orange
  },
};

// Utility functions for easy access to Airbnb tokens
export const getAirbnbColor = (colorName: keyof typeof airbnbTokens.colors) => 
  airbnbTokens.colors[colorName];

export const getAirbnbSpacing = (...values: (keyof typeof airbnbTokens.spacing)[]) => 
  values.map(value => airbnbTokens.spacing[value]);

export const getAirbnbRadius = (radius: keyof typeof airbnbTokens.borderRadius) => 
  airbnbTokens.borderRadius[radius];

export const getAirbnbShadow = (shadowName: keyof typeof airbnbTokens.shadows) => 
  airbnbTokens.shadows[shadowName];

// Component style helpers using Airbnb tokens
export const airbnbComponents = {
  // Button styles
  button: {
    primary: {
      backgroundColor: theme.colors.primary, // Airbnb Red
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
      ...theme.shadows.soft,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
    },
  },
  
  // Card styles
  card: {
    default: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.soft,
    },
    elevated: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.xl,
      ...theme.shadows.medium,
    },
    hero: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.large,
    },
  },
  
  // Input styles
  input: {
    default: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.xxl, // Airbnb's rounded search style
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    focused: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
  },
  
  // Badge styles
  badge: {
    default: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.round,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    secondary: {
      backgroundColor: theme.colors.lightest,
      borderRadius: theme.borderRadius.round,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    success: {
      backgroundColor: theme.colors.success + '20',
      borderRadius: theme.borderRadius.round,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
  },
};

// Typography helpers using Airbnb tokens
export const airbnbTypography = {
  display: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: airbnbTokens.typography.lineHeights.tight * airbnbTokens.typography.sizes.display,
  },
  heading: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: airbnbTokens.typography.lineHeights.tight * airbnbTokens.typography.sizes.heading,
  },
  titleLarge: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: airbnbTokens.typography.lineHeights.normal * airbnbTokens.typography.sizes.titleLarge,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: airbnbTokens.typography.lineHeights.normal * airbnbTokens.typography.sizes.title,
  },
  bodyLarge: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.text,
    lineHeight: airbnbTokens.typography.lineHeights.normal * airbnbTokens.typography.sizes.bodyLarge,
  },
  body: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.text,
    lineHeight: airbnbTokens.typography.lineHeights.normal * airbnbTokens.typography.sizes.body,
  },
  bodyMuted: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.textSecondary,
    lineHeight: airbnbTokens.typography.lineHeights.normal * airbnbTokens.typography.sizes.body,
  },
  caption: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.textSecondary,
    lineHeight: airbnbTokens.typography.lineHeights.normal * airbnbTokens.typography.sizes.caption,
  },
};

// Export both for compatibility
export default theme;