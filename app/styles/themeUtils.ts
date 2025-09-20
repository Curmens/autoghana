// app/styles/themeUtils.ts
import { TextStyle, ViewStyle } from "react-native";
import { theme } from "../(tabs)/theme";

/**
 * Theme Utility Functions
 * Helper functions for consistent styling across components
 */

// Color utilities with opacity
export const withOpacity = (color: string, opacity: number): string => {
    // Convert opacity to hex (0-1 to 00-FF)
    const opacityHex = Math.round(opacity * 255)
        .toString(16)
        .padStart(2, "0");
    return `${color}${opacityHex}`;
};

// Get tinted backgrounds
export const getTintedBackground = (
    color: string,
    opacity: number = 0.1
): string => {
    return withOpacity(color, opacity);
};

// Common tinted backgrounds
export const backgrounds = {
    primaryTint: getTintedBackground(theme.colors.primary, 0.05),
    secondaryTint: getTintedBackground(theme.colors.secondary, 0.05),
    successTint: getTintedBackground(theme.colors.success, 0.1),
    warningTint: getTintedBackground(theme.colors.warning, 0.1),
    errorTint: getTintedBackground(theme.colors.error, 0.1),
};

// Typography style generators
export const createTextStyle = (
    size: keyof typeof theme.fontSize,
    weight: keyof typeof theme.fontWeight,
    color: string = theme.colors.text
): TextStyle => ({
    fontSize: theme.fontSize[size],
    fontWeight: theme.fontWeight[weight],
    color,
});

// Spacing utilities
export const spacing = {
    // Padding helpers
    paddingHorizontal: (size: keyof typeof theme.spacing): ViewStyle => ({
        paddingHorizontal: theme.spacing[size],
    }),
    paddingVertical: (size: keyof typeof theme.spacing): ViewStyle => ({
        paddingVertical: theme.spacing[size],
    }),
    padding: (size: keyof typeof theme.spacing): ViewStyle => ({
        padding: theme.spacing[size],
    }),

    // Margin helpers
    marginHorizontal: (size: keyof typeof theme.spacing): ViewStyle => ({
        marginHorizontal: theme.spacing[size],
    }),
    marginVertical: (size: keyof typeof theme.spacing): ViewStyle => ({
        marginVertical: theme.spacing[size],
    }),
    margin: (size: keyof typeof theme.spacing): ViewStyle => ({
        margin: theme.spacing[size],
    }),

    // Gap helpers (for flexbox)
    gap: (size: keyof typeof theme.spacing): ViewStyle => ({
        gap: theme.spacing[size],
    }),
};

// Border radius utilities
export const borderRadius = {
    top: (size: keyof typeof theme.borderRadius): ViewStyle => ({
        borderTopLeftRadius: theme.borderRadius[size],
        borderTopRightRadius: theme.borderRadius[size],
    }),
    bottom: (size: keyof typeof theme.borderRadius): ViewStyle => ({
        borderBottomLeftRadius: theme.borderRadius[size],
        borderBottomRightRadius: theme.borderRadius[size],
    }),
    left: (size: keyof typeof theme.borderRadius): ViewStyle => ({
        borderTopLeftRadius: theme.borderRadius[size],
        borderBottomLeftRadius: theme.borderRadius[size],
    }),
    right: (size: keyof typeof theme.borderRadius): ViewStyle => ({
        borderTopRightRadius: theme.borderRadius[size],
        borderBottomRightRadius: theme.borderRadius[size],
    }),
};

// Shadow utilities
export const shadows = {
    ...theme.shadows,
    // Add colored shadows
    colored: (
        color: string,
        intensity: "light" | "medium" | "strong" = "medium"
    ): ViewStyle => {
        const opacities = { light: 0.1, medium: 0.15, strong: 0.2 };
        const elevations = { light: 2, medium: 4, strong: 6 };

        return {
            shadowColor: color,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: opacities[intensity],
            shadowRadius: 4,
            elevation: elevations[intensity],
        };
    },
};

// Layout utilities
export const layout = {
    // Flexbox helpers
    center: {
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,

    centerHorizontal: {
        alignItems: "center",
    } as ViewStyle,

    centerVertical: {
        justifyContent: "center",
    } as ViewStyle,

    spaceBetween: {
        justifyContent: "space-between",
    } as ViewStyle,

    spaceAround: {
        justifyContent: "space-around",
    } as ViewStyle,

    // Common row layouts
    row: {
        flexDirection: "row",
    } as ViewStyle,

    rowCenter: {
        flexDirection: "row",
        alignItems: "center",
    } as ViewStyle,

    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    } as ViewStyle,

    // Full width/height
    fullWidth: {
        width: "100%",
    } as ViewStyle,

    fullHeight: {
        height: "100%",
    } as ViewStyle,

    flex1: {
        flex: 1,
    } as ViewStyle,
};

// Border utilities
export const borders = {
    // Standard borders
    thin: {
        borderWidth: 1,
        borderColor: theme.colors.border,
    } as ViewStyle,

    thick: {
        borderWidth: 2,
        borderColor: theme.colors.border,
    } as ViewStyle,

    // Specific sides
    top: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    } as ViewStyle,

    bottom: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    } as ViewStyle,

    left: {
        borderLeftWidth: 1,
        borderLeftColor: theme.colors.border,
    } as ViewStyle,

    right: {
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
    } as ViewStyle,
};

// Position utilities
export const positions = {
    absolute: {
        position: "absolute",
    } as ViewStyle,

    absoluteFill: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    } as ViewStyle,

    relative: {
        position: "relative",
    } as ViewStyle,
};

// Common style combinations
export const combinations = {
    // Card styles
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.small,
        ...spacing.padding("lg"),
    } as ViewStyle,

    cardWithBorder: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...spacing.padding("lg"),
    } as ViewStyle,

    // Input container
    inputContainer: {
        backgroundColor: backgrounds.primaryTint,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        height: 60,
    } as ViewStyle,

    // Button styles
    primaryButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 24,
        ...spacing.paddingVertical("md"),
        ...layout.center,
    } as ViewStyle,

    secondaryButton: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 24,
        ...spacing.paddingVertical("md"),
        ...layout.center,
    } as ViewStyle,

    // Icon containers
    iconContainer: (
        size: number = 40,
        backgroundColor: string = theme.colors.surface
    ) =>
    ({
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        ...layout.center,
    } as ViewStyle),

    // List item
    listItem: {
        ...layout.rowBetween,
        ...spacing.paddingVertical("md"),
        ...spacing.paddingHorizontal("lg"),
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
    } as ViewStyle,
};

// Validation helpers for consistent error states
export const validation = {
    errorInput: {
        borderWidth: 1,
        borderColor: theme.colors.error,
    } as ViewStyle,

    successInput: {
        borderWidth: 1,
        borderColor: theme.colors.success,
    } as ViewStyle,

    errorText: createTextStyle("xs", "normal", theme.colors.error),
    successText: createTextStyle("xs", "normal", theme.colors.success),
};

// Animation timing constants
export const animations = {
    timing: {
        fast: 150,
        normal: 250,
        slow: 350,
    },

    easing: {
        // Standard easing curves
        easeOut: "ease-out",
        easeIn: "ease-in",
        easeInOut: "ease-in-out",
        linear: "linear",
    },
};

// Helper function to combine styles safely
export const combineStyles = (
    ...styles: (ViewStyle | TextStyle | undefined)[]
): ViewStyle | TextStyle => {
    return Object.assign({}, ...styles.filter(Boolean));
};

// Responsive helpers (for different screen sizes)
export const responsive = {
    // Common breakpoints
    isSmallScreen: (width: number) => width < 350,
    isMediumScreen: (width: number) => width >= 350 && width < 768,
    isLargeScreen: (width: number) => width >= 768,

    // Dynamic spacing based on screen size
    dynamicSpacing: (width: number) => {
        if (width < 350) return theme.spacing.md; // Small screens
        if (width < 768) return theme.spacing.lg; // Medium screens
        return theme.spacing.xl; // Large screens
    },
};

// Export all utilities
export const themeUtils = {
    withOpacity,
    getTintedBackground,
    backgrounds,
    createTextStyle,
    spacing,
    borderRadius,
    shadows,
    layout,
    borders,
    positions,
    combinations,
    validation,
    animations,
    combineStyles,
    responsive,
};

export default themeUtils;
