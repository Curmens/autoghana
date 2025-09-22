// components/MainHeader.tsx
import { theme } from '@/app/(tabs)/theme'; // adjust import to where your theme lives
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

type MainHeaderProps = {
    greeting?: string;                 // e.g. "Hi, Kofi!"
    locationText?: string;             // e.g. "Accra, Greater Accra"
    temperatureText?: string;          // e.g. "29°C"
    weatherEmoji?: string;             // e.g. "☀️"
    showSearch?: boolean;              // default: true
    searchPlaceholder?: string;        // default: "Search services, parts, or mechanics..."
    searchQuery?: string;
    onChangeSearch?: (q: string) => void;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
    rightAction?: React.ReactNode;     // optional: replace default bell+profile
    leftAction?: React.ReactNode;      // optional: add extra node near greeting
    style?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    showBorder?: boolean;              // default: true
};

export const MainHeader: React.FC<MainHeaderProps> = ({
    greeting = 'Hi there!',
    locationText,
    temperatureText,
    weatherEmoji,
    showSearch = true,
    searchPlaceholder = 'Search services, parts, or mechanics...',
    searchQuery,
    onChangeSearch,
    onNotificationPress,
    onProfilePress,
    rightAction,
    leftAction,
    style,
    titleStyle,
    subtitleStyle,
    showBorder = true,
}) => {
    return (
        <View
            style={[
                styles.container,
                !showBorder && { borderBottomWidth: 0 },
                style,
            ]}
        >
            <View style={styles.topRow}>
                <View style={styles.userSection}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                        <Text style={[styles.greeting, titleStyle]} numberOfLines={1}>
                            {greeting}
                        </Text>
                        {leftAction}
                    </View>

                    {(locationText || temperatureText || weatherEmoji) && (
                        <Text style={[styles.location, subtitleStyle]} numberOfLines={1}>
                            {locationText ?? ''}
                            {(locationText && (temperatureText || weatherEmoji)) ? ' • ' : ''}
                            {temperatureText ? `${temperatureText} ` : ''}
                            {weatherEmoji ?? ''}
                        </Text>
                    )}
                </View>

                <View style={styles.headerActions}>
                    {rightAction ? (
                        rightAction
                    ) : (
                        <>
                            <IconButton
                                icon="bell-outline"
                                size={24}
                                iconColor={theme.colors.primary}
                                style={styles.headerButton}
                                onPress={onNotificationPress}
                            />
                            <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
                                <Icon name="account-circle" size={32} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            {showSearch && (
                <View style={styles.searchSection}>
                    <Searchbar
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChangeText={onChangeSearch}
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        iconColor={theme.colors.textSecondary}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightest,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.xl,
    },
    userSection: {
        flex: 1,
        paddingRight: theme.spacing.lg,
    },
    greeting: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    location: {
        marginTop: theme.spacing.xs,
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography?.weights.regular,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    headerButton: {
        backgroundColor: theme.colors.lightest,
        margin: 0,
    },
    profileButton: {
        padding: theme.spacing.xs,
    },
    searchSection: {
        marginTop: theme.spacing.md,
    },
    searchBar: {
        backgroundColor: theme.colors.lightest,
        borderRadius: theme.borderRadius.xxl,
        elevation: 0,
    },
    searchInput: {
        fontSize: theme.typography?.sizes.body,
    },
});
