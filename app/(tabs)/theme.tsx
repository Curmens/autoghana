// app/(tabs)/theme.tsx - Unified Theme Theme for GearsXXIV
import { TextStyle, ViewStyle } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

// Theme Design Tokens - Official Color Palette
export const themeTokens = {
  colors: {
    // Theme Brand Colors
    rausch: '#FF5A5F', // Theme Red (Primary)
    babu: '#00A699', // Theme Teal (Secondary)
    arches: '#FC642D', // Theme Orange (Accent)
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
    
    // Extended Theme colors
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
    sizes: typeof themeTokens.typography.sizes;
    weights: typeof themeTokens.typography.weights;
    lineHeights: typeof themeTokens.typography.lineHeights;
  };
}

// Main theme using Theme tokens
export const theme: AppTheme = {
  colors: {
    // Map Theme colors to standard theme colors
    primary: "#074E00", //rgb(7, 78, 0)
    secondary: themeTokens.colors.babu, // #00A699
    accent: themeTokens.colors.arches, // #FC642D
    
    // Status colors
    success: themeTokens.colors.success, // #008A05
    warning: themeTokens.colors.warning, // #FFB400
    error: themeTokens.colors.error, // #FF5A5F
    
    // Background colors
    background: themeTokens.colors.white, // #FFFFFF
    surface: themeTokens.colors.white, // #FFFFFF
    card: themeTokens.colors.white, // #FFFFFF
    
    // Text colors
    text: themeTokens.colors.textPrimary, // #222222
    textSecondary: themeTokens.colors.textSecondary, // #717171
    textTertiary: themeTokens.colors.textTertiary, // #B0B0B0
    placeholder: themeTokens.colors.textTertiary, // #B0B0B0
    
    // Border colors
    border: themeTokens.colors.lighter, // #D8D8D8
    divider: themeTokens.colors.lighter, // #D8D8D8
    
    // Basic colors
    white: themeTokens.colors.white, // #FFFFFF
    black: themeTokens.colors.black, // #222222
    
    // Extended Theme colors for direct access
    rausch: themeTokens.colors.rausch,
    babu: themeTokens.colors.babu,
    arches: themeTokens.colors.arches,
    hof: themeTokens.colors.hof,
    foggy: themeTokens.colors.foggy,
    light: themeTokens.colors.light,
    lighter: themeTokens.colors.lighter,
    lightest: themeTokens.colors.lightest,
  },
  
  spacing: {
    xs: themeTokens.spacing.xs, // 4
    sm: themeTokens.spacing.sm, // 8
    md: themeTokens.spacing.md, // 12
    lg: themeTokens.spacing.lg, // 16
    xl: themeTokens.spacing.xl, // 24
    xxl: themeTokens.spacing.xxl, // 32
    xxxl: themeTokens.spacing.xxxl, // 48
  },
  
  borderRadius: {
    sm: themeTokens.borderRadius.sm, // 4
    md: themeTokens.borderRadius.md, // 8
    lg: themeTokens.borderRadius.lg, // 12
    xl: themeTokens.borderRadius.xl, // 16
    xxl: themeTokens.borderRadius.xxl, // 24
    round: themeTokens.borderRadius.round, // 50
  },
  
  fontSize: {
    xs: themeTokens.typography.sizes.caption, // 12
    sm: themeTokens.typography.sizes.body, // 14
    md: themeTokens.typography.sizes.bodyLarge, // 16
    lg: themeTokens.typography.sizes.title, // 18
    xl: themeTokens.typography.sizes.titleLarge, // 22
    xxl: themeTokens.typography.sizes.heading, // 26
    xxxl: themeTokens.typography.sizes.display, // 32
  },
  
  fontWeight: {
    normal: themeTokens.typography.weights.regular, // '400'
    medium: themeTokens.typography.weights.medium, // '500'
    semibold: themeTokens.typography.weights.semibold, // '600'
    bold: themeTokens.typography.weights.bold, // '700'
  },
  
  shadows: {
    small: themeTokens.shadows.subtle,
    medium: themeTokens.shadows.medium,
    large: themeTokens.shadows.large,
    subtle: themeTokens.shadows.subtle,
    soft: themeTokens.shadows.soft,
  },
  
  typography: themeTokens.typography,
};

// React Native Paper theme configuration
export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary, // Theme Red
    secondary: theme.colors.secondary, // Theme Teal
    surface: theme.colors.surface,
    background: theme.colors.background,
    text: theme.colors.text,
    placeholder: theme.colors.placeholder,
    error: theme.colors.error,
    onSurface: theme.colors.text,
    onBackground: theme.colors.text,
    accent: theme.colors.accent, // Theme Orange
  },
};

// Utility functions for easy access to Theme tokens
export const getThemeColor = (colorName: keyof typeof themeTokens.colors) => 
  themeTokens.colors[colorName];

export const getThemeSpacing = (...values: (keyof typeof themeTokens.spacing)[]) => 
  values.map(value => themeTokens.spacing[value]);

export const getThemeRadius = (radius: keyof typeof themeTokens.borderRadius) => 
  themeTokens.borderRadius[radius];

export const getThemeShadow = (shadowName: keyof typeof themeTokens.shadows) => 
  themeTokens.shadows[shadowName];

// Component style helpers using Theme tokens
export const themeComponents = {
  // Button styles
  button: {
    primary: {
      backgroundColor: theme.colors.primary, // Theme Red
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
      borderRadius: theme.borderRadius.xxl, // Theme's rounded search style
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

// Typography helpers using Theme tokens
export const themeTypography = {
  display: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: themeTokens.typography.lineHeights.tight * themeTokens.typography.sizes.display,
  },
  heading: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: themeTokens.typography.lineHeights.tight * themeTokens.typography.sizes.heading,
  },
  titleLarge: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: themeTokens.typography.lineHeights.normal * themeTokens.typography.sizes.titleLarge,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: themeTokens.typography.lineHeights.normal * themeTokens.typography.sizes.title,
  },
  bodyLarge: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.text,
    lineHeight: themeTokens.typography.lineHeights.normal * themeTokens.typography.sizes.bodyLarge,
  },
  body: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.text,
    lineHeight: themeTokens.typography.lineHeights.normal * themeTokens.typography.sizes.body,
  },
  bodyMuted: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.textSecondary,
    lineHeight: themeTokens.typography.lineHeights.normal * themeTokens.typography.sizes.body,
  },
  caption: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.textSecondary,
    lineHeight: themeTokens.typography.lineHeights.normal * themeTokens.typography.sizes.caption,
  },
};

// Export both for compatibility
export default theme;