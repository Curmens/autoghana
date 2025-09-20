// app/styles/globalStyles.ts
import { TextStyle, ViewStyle } from 'react-native';
import { theme } from '../(tabs)/theme';

/**
 * Global Style Constants
 * Use these consistent patterns across all pages
 */

// LAYOUT CONSTANTS
export const LAYOUT = {
    // Page padding - use consistently across all pages
    PAGE_HORIZONTAL: theme.spacing.xl, // 24px - main content padding
    PAGE_VERTICAL: theme.spacing.lg,   // 16px - top/bottom padding

    // Header dimensions
    HEADER_PADDING_TOP: theme.spacing.lg,    // 16px
    HEADER_PADDING_BOTTOM: theme.spacing.xl, // 24px
    HEADER_PADDING_HORIZONTAL: theme.spacing.xl, // 24px

    // Section spacing
    SECTION_MARGIN_BOTTOM: theme.spacing.xxxl, // 48px
    SECTION_HEADER_MARGIN_BOTTOM: theme.spacing.xl, // 24px

    // Bottom safe area for FAB/content
    BOTTOM_SAFE_AREA: theme.spacing.xxxl, // 48px

    // Form spacing
    FORM_FIELD_GAP: theme.spacing.lg, // 16px
    FORM_MARGIN_TOP: theme.spacing.lg, // 16px
} as const;

// INPUT FIELD CONSTANTS
export const INPUT_STYLES = {
    // Standard input background (5% primary tint)
    BACKGROUND: `${theme.colors.primary}0D`,
    HEIGHT: 60,
    BORDER_RADIUS: theme.borderRadius.lg, // 12px
    PADDING_HORIZONTAL: theme.spacing.md, // 12px
    CONTENT_PADDING_LEFT: 12,
    FONT_SIZE: theme.typography?.sizes.bodyLarge, // 16px
} as const;

// HEADER CONSTANTS
export const HEADER_STYLES = {
    BACKGROUND: theme.colors.white,
    BORDER_COLOR: theme.colors.lightest,
    BORDER_WIDTH: 1,

    // Title styles
    TITLE_FONT_SIZE: theme.typography?.sizes.heading, // 26px
    TITLE_FONT_WEIGHT: theme.typography?.weights.semibold, // 600
    TITLE_COLOR: theme.colors.textPrimary,
    TITLE_MARGIN_BOTTOM: theme.spacing.xs, // 4px

    // Subtitle styles
    SUBTITLE_FONT_SIZE: theme.typography?.sizes.body, // 14px
    SUBTITLE_COLOR: theme.colors.textSecondary,

    // Action button styles
    ACTION_BUTTON_BACKGROUND: theme.colors.lightest,
    ACTION_BUTTON_SIZE: 40,
    ACTION_BUTTON_RADIUS: 20,
} as const;

// FAB CONSTANTS
export const FAB_STYLES = {
    BACKGROUND: theme.colors.primary,
    BORDER_RADIUS: 28,
    PADDING_HORIZONTAL: 16,
    HEIGHT: 56,
    LABEL_COLOR: '#fff',
    LABEL_FONT_SIZE: theme.fontSize?.sm,
    LABEL_FONT_WEIGHT: theme.fontWeight?.semibold,
    ICON_SIZE: 18,
} as const;

// BUTTON CONSTANTS
export const BUTTON_STYLES = {
    // Primary CTA button
    PRIMARY_BACKGROUND: theme.colors.primary,
    PRIMARY_BORDER_RADIUS: 24, // Pill shape
    PRIMARY_PADDING_VERTICAL: theme.spacing.md, // 12px
    PRIMARY_LABEL_COLOR: '#fff',
    PRIMARY_LABEL_FONT_SIZE: theme.typography?.sizes.bodyLarge, // 16px
    PRIMARY_LABEL_FONT_WEIGHT: theme.typography?.weights.semibold, // 600

    // Secondary/Ghost button
    GHOST_BACKGROUND: theme.colors.lightest,
    GHOST_PADDING: theme.spacing.sm,
} as const;

// CARD CONSTANTS
export const CARD_STYLES = {
    BACKGROUND: theme.colors.card,
    BORDER_RADIUS: theme.borderRadius.xl, // 16px
    BORDER_WIDTH: 2,
    BORDER_COLOR: theme.colors.lightest,
    PADDING: theme.spacing.lg, // 16px
    SHADOW: theme.shadows.small,
} as const;

/**
 * Standard Style Objects
 * Ready-to-use style objects for common patterns
 */

// Page container styles
export const pageStyles = {
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    content: {
        flex: 1,
        paddingHorizontal: LAYOUT.PAGE_HORIZONTAL,
    } as ViewStyle,

    scrollContent: {
        paddingBottom: LAYOUT.BOTTOM_SAFE_AREA,
    } as ViewStyle,
};

// Header styles
export const headerStyles = {
    container: {
        backgroundColor: HEADER_STYLES.BACKGROUND,
        paddingHorizontal: LAYOUT.HEADER_PADDING_HORIZONTAL,
        paddingTop: LAYOUT.HEADER_PADDING_TOP,
        paddingBottom: LAYOUT.HEADER_PADDING_BOTTOM,
        borderBottomWidth: HEADER_STYLES.BORDER_WIDTH,
        borderBottomColor: HEADER_STYLES.BORDER_COLOR,
    } as ViewStyle,

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
    } as ViewStyle,

    title: {
        fontSize: HEADER_STYLES.TITLE_FONT_SIZE,
        fontWeight: HEADER_STYLES.TITLE_FONT_WEIGHT,
        color: HEADER_STYLES.TITLE_COLOR,
        marginBottom: HEADER_STYLES.TITLE_MARGIN_BOTTOM,
    } as TextStyle,

    subtitle: {
        fontSize: HEADER_STYLES.SUBTITLE_FONT_SIZE,
        color: HEADER_STYLES.SUBTITLE_COLOR,
    } as TextStyle,

    actionButton: {
        backgroundColor: HEADER_STYLES.ACTION_BUTTON_BACKGROUND,
        width: HEADER_STYLES.ACTION_BUTTON_SIZE,
        height: HEADER_STYLES.ACTION_BUTTON_SIZE,
        borderRadius: HEADER_STYLES.ACTION_BUTTON_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
};

// Input field styles
export const inputStyles = {
    container: {
        gap: theme.spacing.xs,
    } as ViewStyle,

    label: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
        letterSpacing: 0.3,
    } as TextStyle,

    input: {
        backgroundColor: INPUT_STYLES.BACKGROUND,
        borderRadius: INPUT_STYLES.BORDER_RADIUS,
        height: INPUT_STYLES.HEIGHT,
        paddingHorizontal: INPUT_STYLES.PADDING_HORIZONTAL,
    } as ViewStyle,

    inputContent: {
        paddingLeft: INPUT_STYLES.CONTENT_PADDING_LEFT,
        fontSize: INPUT_STYLES.FONT_SIZE,
    } as ViewStyle,

    error: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.error,
        marginTop: 4,
    } as TextStyle,
};

// FAB styles
export const fabStyles = {
    container: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 1000,
    } as ViewStyle,

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: FAB_STYLES.BACKGROUND,
        borderRadius: FAB_STYLES.BORDER_RADIUS,
        paddingHorizontal: FAB_STYLES.PADDING_HORIZONTAL,
        height: FAB_STYLES.HEIGHT,
        ...theme.shadows.small,
    } as ViewStyle,

    label: {
        color: FAB_STYLES.LABEL_COLOR,
        fontSize: FAB_STYLES.LABEL_FONT_SIZE,
        fontWeight: FAB_STYLES.LABEL_FONT_WEIGHT,
    } as TextStyle,
};

// Button styles
export const buttonStyles = {
    primary: {
        borderRadius: BUTTON_STYLES.PRIMARY_BORDER_RADIUS,
        backgroundColor: BUTTON_STYLES.PRIMARY_BACKGROUND,
        marginTop: theme.spacing.sm,
    } as ViewStyle,

    primaryContent: {
        paddingVertical: BUTTON_STYLES.PRIMARY_PADDING_VERTICAL,
    } as ViewStyle,

    primaryLabel: {
        color: BUTTON_STYLES.PRIMARY_LABEL_COLOR,
        fontSize: BUTTON_STYLES.PRIMARY_LABEL_FONT_SIZE,
        fontWeight: BUTTON_STYLES.PRIMARY_LABEL_FONT_WEIGHT,
    } as TextStyle,

    ghost: {
        backgroundColor: BUTTON_STYLES.GHOST_BACKGROUND,
        margin: 0,
    } as ViewStyle,
};

// Form styles
export const formStyles = {
    container: {
        marginTop: LAYOUT.FORM_MARGIN_TOP,
        gap: LAYOUT.FORM_FIELD_GAP,
    } as ViewStyle,

    field: {
        gap: theme.spacing.xs,
    } as ViewStyle,
};

// Section styles
export const sectionStyles = {
    container: {
        paddingHorizontal: LAYOUT.PAGE_HORIZONTAL,
        marginBottom: LAYOUT.SECTION_MARGIN_BOTTOM,
    } as ViewStyle,

    header: {
        marginBottom: LAYOUT.SECTION_HEADER_MARGIN_BOTTOM,
    } as ViewStyle,

    title: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    } as TextStyle,

    subtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        lineHeight: (theme.typography?.lineHeights.normal ?? 1.2) * (theme.typography?.sizes.body ?? 14),
    } as TextStyle,
};

// Card styles
export const cardStyles = {
    base: {
        backgroundColor: CARD_STYLES.BACKGROUND,
        borderRadius: CARD_STYLES.BORDER_RADIUS,
        borderWidth: CARD_STYLES.BORDER_WIDTH,
        borderColor: CARD_STYLES.BORDER_COLOR,
        ...CARD_STYLES.SHADOW,
    } as ViewStyle,

    content: {
        padding: CARD_STYLES.PADDING,
    } as ViewStyle,
};

/**
 * Helper Functions
 */

// Create consistent spacing
export const createSpacing = (...sides: ('top' | 'bottom' | 'left' | 'right')[]) => {
    const spacing: ViewStyle = {};
    sides.forEach(side => {
        switch (side) {
            case 'top':
                spacing.paddingTop = LAYOUT.PAGE_VERTICAL;
                break;
            case 'bottom':
                spacing.paddingBottom = LAYOUT.PAGE_VERTICAL;
                break;
            case 'left':
                spacing.paddingLeft = LAYOUT.PAGE_HORIZONTAL;
                break;
            case 'right':
                spacing.paddingRight = LAYOUT.PAGE_HORIZONTAL;
                break;
        }
    });
    return spacing;
};

// Create consistent margins
export const createMargin = (size: keyof typeof theme.spacing) => ({
    margin: theme.spacing[size],
});

// Create consistent gaps
export const createGap = (size: keyof typeof theme.spacing) => ({
    gap: theme.spacing[size],
});