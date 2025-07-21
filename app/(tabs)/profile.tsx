// app/(tabs)/profile.tsx - Updated with Airbnb theme
import { router } from 'expo-router';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "./theme";

interface ProfileMenuItem {
    id: string;
    title: string;
    subtitle?: string;
    icon: string;
    action: () => void;
    showArrow?: boolean;
    type?: 'default' | 'warning' | 'danger';
}

export default function ProfileScreen() {
    const user = {
        name: 'Kofi Asante',
        email: 'kofi.asante@example.com',
        phone: '+233 24 123 4567',
        location: 'Accra, Greater Accra',
        memberSince: 'Member since 2024',
        profileImage: 'https://via.placeholder.com/120x120',
        stats: {
            vehicles: 2,
            services: 8,
            reviews: 5,
        }
    };

    const profileMenuItems: ProfileMenuItem[] = [
        {
            id: 'edit-profile',
            title: 'Edit Profile',
            subtitle: 'Update your personal information',
            icon: 'edit',
            action: () => console.log('Edit profile'),
            showArrow: true,
        },
        {
            id: 'my-garage',
            title: 'My Garage',
            subtitle: `${user.stats.vehicles} vehicles`,
            icon: 'directions-car',
            action: () => router.push('/(tabs)/my-garage'),
            showArrow: true,
        },
        {
            id: 'service-history',
            title: 'Service History',
            subtitle: `${user.stats.services} completed services`,
            icon: 'history',
            action: () => console.log('Service history'),
            showArrow: true,
        },
        {
            id: 'reviews',
            title: 'My Reviews',
            subtitle: `${user.stats.reviews} reviews written`,
            icon: 'star',
            action: () => console.log('My reviews'),
            showArrow: true,
        },
    ];

    const settingsMenuItems: ProfileMenuItem[] = [
        {
            id: 'notifications',
            title: 'Notifications',
            subtitle: 'Manage your notification preferences',
            icon: 'notifications',
            action: () => console.log('Notifications'),
            showArrow: true,
        },
        {
            id: 'privacy',
            title: 'Privacy & Security',
            subtitle: 'Control your privacy settings',
            icon: 'privacy-tip',
            action: () => console.log('Privacy'),
            showArrow: true,
        },
        {
            id: 'payment',
            title: 'Payment Methods',
            subtitle: 'Manage your payment options',
            icon: 'payment',
            action: () => console.log('Payment'),
            showArrow: true,
        },
        {
            id: 'help',
            title: 'Help & Support',
            subtitle: 'Get help when you need it',
            icon: 'help',
            action: () => console.log('Help'),
            showArrow: true,
        },
    ];

    const accountMenuItems: ProfileMenuItem[] = [
        {
            id: 'terms',
            title: 'Terms of Service',
            icon: 'description',
            action: () => console.log('Terms'),
            showArrow: true,
        },
        {
            id: 'privacy-policy',
            title: 'Privacy Policy',
            icon: 'policy',
            action: () => console.log('Privacy Policy'),
            showArrow: true,
        },
        {
            id: 'logout',
            title: 'Log Out',
            icon: 'logout',
            action: () => console.log('Logout'),
            type: 'danger',
        },
    ];

    const AirbnbCard = ({ children, style = {}, shadow = 'soft' }: any) => (
        <View style={[styles.airbnbCard, theme.shadows[shadow], style]}>
            {children}
        </View>
    );

    const MenuSection = ({ title, items }: { title?: string; items: ProfileMenuItem[] }) => (
        <View style={styles.menuSection}>
            {title && <Text style={styles.sectionTitle}>{title}</Text>}
            <AirbnbCard>
                {items.map((item, index) => (
                    <View key={item.id}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={item.action}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.menuIconContainer,
                                item.type === 'danger' && styles.dangerIconContainer
                            ]}>
                                <Icon
                                    name={item.icon}
                                    size={24}
                                    color={item.type === 'danger' ? theme.colors.error : theme.colors.primary}
                                />
                            </View>
                            
                            <View style={styles.menuContent}>
                                <Text style={[
                                    styles.menuTitle,
                                    item.type === 'danger' && styles.dangerText
                                ]}>
                                    {item.title}
                                </Text>
                                {item.subtitle && (
                                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                                )}
                            </View>
                            
                            {item.showArrow && (
                                <Icon
                                    name="chevron-right"
                                    size={24}
                                    color={theme.colors.textSecondary}
                                />
                            )}
                        </TouchableOpacity>
                        
                        {index < items.length - 1 && <View style={styles.menuDivider} />}
                    </View>
                ))}
            </AirbnbCard>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Icon name="settings" size={24} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Profile Card */}
                <AirbnbCard style={styles.profileCard} shadow="medium">
                    <View style={styles.profileHeader}>
                        <Avatar.Image
                            size={80}
                            source={{ uri: user.profileImage }}
                            style={styles.avatar}
                        />
                        
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                            <Text style={styles.memberSince}>{user.memberSince}</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.editButton}>
                            <Icon name="edit" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{user.stats.vehicles}</Text>
                            <Text style={styles.statLabel}>Vehicles</Text>
                        </View>
                        
                        <View style={styles.statDivider} />
                        
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{user.stats.services}</Text>
                            <Text style={styles.statLabel}>Services</Text>
                        </View>
                        
                        <View style={styles.statDivider} />
                        
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{user.stats.reviews}</Text>
                            <Text style={styles.statLabel}>Reviews</Text>
                        </View>
                    </View>
                </AirbnbCard>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.quickActionCard}
                        onPress={() => router.push('/service-booking')}
                    >
                        <Icon name="build" size={24} color={theme.colors.primary} />
                        <Text style={styles.quickActionText}>Book Service</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.quickActionCard}
                        onPress={() => router.push('/(tabs)/marketplace')}
                    >
                        <Icon name="shopping-cart" size={24} color={theme.colors.primary} />
                        <Text style={styles.quickActionText}>Shop Parts</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.quickActionCard}
                        onPress={() => router.push('/(tabs)/reports')}
                    >
                        <Icon name="report" size={24} color={theme.colors.primary} />
                        <Text style={styles.quickActionText}>Report Issue</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu Sections */}
                <MenuSection items={profileMenuItems} />
                
                <MenuSection title="Settings" items={settingsMenuItems} />
                
                <MenuSection title="Legal & Account" items={accountMenuItems} />
                
                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>AutoGhana v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
    },
    headerTitle: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    settingsButton: {
        padding: theme.spacing.sm,
    },

    // Card Base
    airbnbCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        padding: theme.spacing.xl,
        marginHorizontal: theme.spacing.xl,
    },

    // Profile Card
    profileCard: {
        marginBottom: theme.spacing.xl,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    avatar: {
        marginRight: theme.spacing.lg,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    userEmail: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    memberSince: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.round,
        backgroundColor: theme.colors.lightest,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: theme.spacing.xl,
        borderTopWidth: 1,
        borderTopColor: theme.colors.lightest,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: theme.colors.lightest,
    },

    // Quick Actions
    quickActions: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.md,
    },
    quickActionCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.lg,
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        gap: theme.spacing.sm,
        ...theme.shadows.soft,
    },
    quickActionText: {
        fontSize: theme.typography?.sizes.body,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textPrimary,
    },

    // Menu Sections
    menuSection: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
    },
    menuIconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.xl,
        backgroundColor: `${theme.colors.primary}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.lg,
    },
    dangerIconContainer: {
        backgroundColor: `${theme.colors.error}15`,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    dangerText: {
        color: theme.colors.error,
    },
    menuSubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    menuDivider: {
        height: 1,
        backgroundColor: theme.colors.lightest,
        marginLeft: 64, // Align with content
    },

    // Version
    versionContainer: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    versionText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },
});