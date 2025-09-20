// app/components/StandardComponents.tsx
import { theme } from '@/app/(tabs)/theme';
import {
    buttonStyles,
    fabStyles,
    formStyles,
    headerStyles,
    inputStyles,
    LAYOUT,
    pageStyles,
    sectionStyles,
} from '@/app/styles/globalStyles';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFABPosition } from '../hooks/useFabPosition';

/**
 * Standard Page Container
 * Use this for all pages to ensure consistent layout
 */
interface StandardPageProps {
    children: React.ReactNode;
    backgroundColor?: string;
    safeArea?: boolean;
}

export const StandardPage: React.FC<StandardPageProps> = ({
    children,
    backgroundColor = theme.colors.background,
    safeArea = true,
}) => {
    const Container = safeArea ? SafeAreaView : View;

    return (
        <Container style={[pageStyles.container, { backgroundColor }]}>
            {children}
        </Container>
    );
};

/**
 * Standard Page Content with Scroll
 * Use for scrollable content with consistent padding
 */
interface StandardContentProps {
    children: React.ReactNode;
    scrollable?: boolean;
    style?: ViewStyle;
}

export const StandardContent: React.FC<StandardContentProps> = ({
    children,
    scrollable = true,
    style,
}) => {
    if (scrollable) {
        return (
            <ScrollView
                style={[pageStyles.content, style]}
                contentContainerStyle={pageStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        );
    }

    return (
        <View style={[pageStyles.content, style]}>
            {children}
        </View>
    );
};

/**
 * Standard Header Component
 * Consistent header across all pages
 */
interface StandardHeaderProps {
    title: string;
    subtitle?: string;
    rightAction?: React.ReactNode;
    leftAction?: React.ReactNode;
    showBorder?: boolean;
}

export const StandardHeader: React.FC<StandardHeaderProps> = ({
    title,
    subtitle,
    rightAction,
    leftAction,
    showBorder = true,
}) => {
    return (
        <View style={[
            headerStyles.container,
            !showBorder && { borderBottomWidth: 0 }
        ]}>
            <View style={headerStyles.topRow}>
                <View style={{ flex: 1 }}>
                    <Text style={headerStyles.title}>{title}</Text>
                    {subtitle && <Text style={headerStyles.subtitle}>{subtitle}</Text>}
                </View>
                <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                    {leftAction}
                    {rightAction}
                </View>
            </View>
        </View>
    );
};

/**
 * Standard Header Action Button
 */
interface HeaderActionProps {
    icon: string;
    onPress: () => void;
    accessibilityLabel?: string;
}

export const HeaderAction: React.FC<HeaderActionProps> = ({
    icon,
    onPress,
    accessibilityLabel,
}) => {
    return (
        <TouchableOpacity
            style={headerStyles.actionButton}
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
        >
            <Icon name={icon} size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
    );
};

/**
 * Standard Input Field
 * Consistent input styling across forms
 */
interface StandardInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    error?: string;
    multiline?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    leftIcon?: string;
    rightIcon?: string;
    onRightIconPress?: () => void;
}

export const StandardInput: React.FC<StandardInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    multiline,
    keyboardType = 'default',
    leftIcon,
    rightIcon,
    onRightIconPress,
}) => {
    return (
        <View style={inputStyles.container}>
            <Text style={inputStyles.label}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                keyboardType={keyboardType}
                style={inputStyles.input}
                contentStyle={inputStyles.inputContent}
                left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
                right={rightIcon ? (
                    <TextInput.Icon
                        icon={rightIcon}
                        onPress={onRightIconPress}
                    />
                ) : undefined}
                mode="flat"
                underlineStyle={{ display: 'none' }}
                activeUnderlineColor="transparent"
                outlineStyle={{ borderWidth: 0 }}
                theme={{
                    colors: {
                        primary: theme.colors.primary,
                        background: 'transparent',
                        surface: 'transparent',
                    },
                }}
            />
            {error && <Text style={inputStyles.error}>{error}</Text>}
        </View>
    );
};

/**
 * Standard Primary Button
 * Consistent CTA button styling
 */
interface StandardButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    style?: ViewStyle;
}

export const StandardButton: React.FC<StandardButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = 'primary',
    style,
}) => {
    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return buttonStyles.primary;
            case 'ghost':
                return buttonStyles.ghost;
            default:
                return buttonStyles.primary;
        }
    };

    return (
        <Button
            mode="contained"
            onPress={onPress}
            loading={loading}
            disabled={disabled}
            style={[getButtonStyle(), style]}
            contentStyle={buttonStyles.primaryContent}
            labelStyle={buttonStyles.primaryLabel}
        >
            {title}
        </Button>
    );
};

/**
 * Standard FAB Component
 * Consistent floating action button
 */
interface StandardFABProps {
    label: string;
    onPress: () => void;
    icon?: string;
}

export const StandardFAB: React.FC<StandardFABProps> = ({
    label,
    onPress,
    icon = 'add',
}) => {
    const fabPosition = useFABPosition();

    return (
        <View style={[fabStyles.container, fabPosition]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                style={fabStyles.button}
            >
                <Icon name={icon} size={18} color="#fff" />
                <Text style={fabStyles.label}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
};

/**
 * Standard Section Component
 * Consistent section layout
 */
interface StandardSectionProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    style?: ViewStyle;
}

export const StandardSection: React.FC<StandardSectionProps> = ({
    title,
    subtitle,
    children,
    style,
}) => {
    return (
        <View style={[sectionStyles.container, style]}>
            <View style={sectionStyles.header}>
                <Text style={sectionStyles.title}>{title}</Text>
                {subtitle && <Text style={sectionStyles.subtitle}>{subtitle}</Text>}
            </View>
            {children}
        </View>
    );
};

/**
 * Standard Form Container
 * Consistent form layout and spacing
 */
interface StandardFormProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const StandardForm: React.FC<StandardFormProps> = ({
    children,
    style,
}) => {
    return (
        <View style={[formStyles.container, style]}>
            {children}
        </View>
    );
};

/**
 * Standard Empty State
 * Consistent empty state component
 */
interface EmptyStateProps {
    icon: string;
    title: string;
    subtitle: string;
    actionTitle?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    subtitle,
    actionTitle,
    onAction,
}) => {
    return (
        <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
                <Icon name={icon} size={48} color={theme.colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptySubtitle}>{subtitle}</Text>
            {actionTitle && onAction && (
                <TouchableOpacity
                    style={styles.emptyAction}
                    onPress={onAction}
                >
                    <Text style={styles.emptyActionText}>{actionTitle}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

/**
 * Standard Back Button
 * For navigation headers
 */
interface BackButtonProps {
    onPress: () => void;
    color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
    onPress,
    color = theme.colors.textSecondary,
}) => {
    return (
        <TouchableOpacity
            style={styles.backButton}
            onPress={onPress}
            accessibilityLabel="Go back"
        >
            <Icon name="arrow-back" size={24} color={color} />
        </TouchableOpacity>
    );
};

/**
 * Standard Top Bar
 * For auth pages and simple headers
 */
interface TopBarProps {
    leftAction?: React.ReactNode;
    rightAction?: React.ReactNode;
    center?: React.ReactNode;
    style?: ViewStyle;
}

export const TopBar: React.FC<TopBarProps> = ({
    leftAction,
    rightAction,
    center,
    style,
}) => {
    return (
        <View style={[styles.topBar, style]}>
            <View style={styles.topBarSide}>
                {leftAction}
            </View>
            <View style={styles.topBarCenter}>
                {center}
            </View>
            <View style={styles.topBarSide}>
                {rightAction}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxxl,
        paddingHorizontal: theme.spacing.xl,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${theme.colors.textTertiary}10`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.lg,
    },
    emptyTitle: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    emptySubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
        lineHeight: theme.typography?.lineHeights.normal ?
            theme.typography.lineHeights.normal * (theme.typography?.sizes.body ?? 14) :
            20,
    },
    emptyAction: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.lg,
    },
    emptyActionText: {
        color: '#fff',
        fontSize: theme.typography?.sizes.body,
        fontWeight: theme.typography?.weights.medium,
    },

    // Back Button
    backButton: {
        padding: theme.spacing.sm,
        marginLeft: -theme.spacing.sm,
    },

    // Top Bar
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: LAYOUT.PAGE_HORIZONTAL,
        paddingTop: LAYOUT.PAGE_VERTICAL,
        minHeight: 56,
    },
    topBarSide: {
        flex: 1,
        alignItems: 'flex-start',
    },
    topBarCenter: {
        flex: 2,
        alignItems: 'center',
    },
});