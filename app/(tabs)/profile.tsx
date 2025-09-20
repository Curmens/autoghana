// app/(tabs)/profile.tsx — Premium modern profile (flat styles)
import { router } from 'expo-router';
import React from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './theme';

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
        memberSince: 'Member since 2024',
        profileImage: 'https://images.pexels.com/photos/2794503/pexels-photo-2794503.jpeg',
        profileBackground: 'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg',
        stats: { vehicles: 2, services: 8, reviews: 5 },
        verified: true,
        tier: 'Premium',
    };

    const profileMenuItems: ProfileMenuItem[] = [
        { id: 'edit-profile', title: 'Edit Profile', subtitle: 'Update your personal information', icon: 'edit', action: () => console.log('Edit profile'), showArrow: true },
        { id: 'my-garage', title: 'My Garage', subtitle: `${user.stats.vehicles} vehicles`, icon: 'directions-car', action: () => router.push('/(tabs)/my-garage'), showArrow: true },
        { id: 'service-history', title: 'Service History', subtitle: `${user.stats.services} completed`, icon: 'history', action: () => console.log('Service history'), showArrow: true },
        { id: 'reviews', title: 'My Reviews', subtitle: `${user.stats.reviews} reviews`, icon: 'star', action: () => console.log('My reviews'), showArrow: true },
    ];

    const settingsMenuItems: ProfileMenuItem[] = [
        { id: 'notifications', title: 'Notifications', subtitle: 'Push, email & SMS', icon: 'notifications', action: () => console.log('Notifications'), showArrow: true },
        { id: 'privacy', title: 'Privacy & Security', subtitle: 'Passwords, 2FA, data', icon: 'privacy-tip', action: () => console.log('Privacy'), showArrow: true },
        { id: 'payment', title: 'Payment Methods', subtitle: 'Cards & mobile money', icon: 'payment', action: () => console.log('Payment'), showArrow: true },
        { id: 'help', title: 'Help & Support', subtitle: 'FAQ & contact', icon: 'help', action: () => console.log('Help'), showArrow: true },
    ];

    const accountMenuItems: ProfileMenuItem[] = [
        { id: 'terms', title: 'Terms of Service', icon: 'description', action: () => console.log('Terms'), showArrow: true },
        { id: 'privacy-policy', title: 'Privacy Policy', icon: 'policy', action: () => console.log('Privacy Policy'), showArrow: true },
        {
            id: 'logout',
            title: 'Log Out',
            icon: 'logout',
            action: async () => {
                Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Sign Out', style: 'destructive', onPress: async () => { await logout(); } },
                ]);
            },
            type: 'danger',
        },
    ];

    const ThemeCard = ({ children, style = {}, shadow = 'small' as keyof typeof theme.shadows }) => (
        <View style={[styles.cardBase, theme.shadows[shadow], style]}>{children}</View>
    );

    const Section = ({ title, children }: { title?: string; children: React.ReactNode }) => (
        <View style={styles.sectionWrap}>
            {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
            {children}
        </View>
    );

    const MenuList = ({ items }: { items: ProfileMenuItem[] }) => (
        <ThemeCard style={styles.menuCard}>
            {items.map((item, idx) => (
                <View key={item.id}>
                    <TouchableOpacity style={styles.menuItem} onPress={item.action} activeOpacity={0.75}>
                        <View style={[styles.menuIconPill, item.type === 'danger' ? styles.menuIconPillDanger : styles.menuIconPillDefault]}>
                            <Icon name={item.icon} size={20} color={item.type === 'danger' ? theme.colors.error : theme.colors.primary} />
                        </View>
                        <View style={styles.menuTextCol}>
                            <Text style={[styles.menuTitle, item.type === 'danger' && styles.menuTitleDanger]}>{item.title}</Text>
                            {!!item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                        </View>
                        {item.showArrow && <Icon name="chevron-right" size={22} color={theme.colors.textSecondary} />}
                    </TouchableOpacity>
                    {idx < items.length - 1 && <View style={styles.menuDivider} />}
                </View>
            ))}
        </ThemeCard>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* HERO */}
                <View style={styles.heroWrap}>
                    <ImageBackground
                        source={{ uri: user.profileBackground }}
                        style={styles.heroImage}
                        imageStyle={styles.heroImageRadius}
                    >
                        <View style={styles.heroOverlay} />
                        <View style={styles.heroTopBar}>
                            <Text style={styles.heroTitle}>Profile</Text>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Icon name="settings" size={20} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.heroFooter}>
                            <View style={styles.avatarWrap}>
                                <Avatar.Image size={84} source={{ uri: user.profileImage }} />
                                <View style={styles.avatarRing} />
                                <TouchableOpacity style={styles.avatarEditBtn} activeOpacity={0.8}>
                                    <Icon name="photo-camera" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.identityCol}>
                                <View style={styles.nameRow}>
                                    <Text style={styles.nameText}>{user.name}</Text>
                                    {user.verified && (
                                        <View style={styles.verifiedPill}>
                                            <Icon name="verified" size={14} color="#fff" />
                                            <Text style={styles.verifiedText}>Verified</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.emailText}>{user.email}</Text>
                                <Text style={styles.memberText}>{user.memberSince}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* QUICK ACTIONS */}
                <Section>
                    <View style={styles.quickRow}>
                        <TouchableOpacity style={[styles.quickCard, theme.shadows.small]} onPress={() => router.push('/service-booking')} activeOpacity={0.85}>
                            <Icon name="build" size={22} color={theme.colors.primary} />
                            <Text style={styles.quickText}>Book Service</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.quickCard, theme.shadows.small]} onPress={() => router.push('/(tabs)/reports')} activeOpacity={0.85}>
                            <Icon name="report" size={22} color={theme.colors.primary} />
                            <Text style={styles.quickText}>Report Issue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.quickCard, theme.shadows.small]} onPress={() => router.push('/(tabs)/my-garage')} activeOpacity={0.85}>
                            <Icon name="garage" size={22} color={theme.colors.primary} />
                            <Text style={styles.quickText}>My Garage</Text>
                        </TouchableOpacity>
                    </View>
                </Section>

                {/* MENUS */}
                <Section>
                    <MenuList items={profileMenuItems} />
                </Section>
                <Section title="Settings">
                    <MenuList items={settingsMenuItems} />
                </Section>
                <Section title="Legal & Account">
                    <MenuList items={accountMenuItems} />
                </Section>

                {/* VERSION */}
                <View style={styles.versionWrap}>
                    <Text style={styles.versionText}>AutoGhana v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Layout
    container: { flex: 1, backgroundColor: theme.colors.background },
    scroll: { flex: 1 },

    // Hero
    heroWrap: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg },
    heroImage: { height: 180, borderRadius: theme.borderRadius.xl, overflow: 'hidden' },
    heroImageRadius: { borderRadius: theme.borderRadius.xl },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },
    heroTopBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        alignItems: 'center',
    },
    heroTitle: { color: '#fff', fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.semibold },
    iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center' },

    heroFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginTop: 'auto',
        paddingBottom: theme.spacing.lg,
    },
    avatarWrap: { width: 84, height: 84, borderRadius: 42, overflow: 'visible' },
    avatarRing: {
        position: 'absolute', top: -2, left: -2, right: -2, bottom: -2, borderRadius: 44,
        borderWidth: 2, borderColor: '#fff',
    },
    avatarEditBtn: {
        position: 'absolute', right: -2, bottom: -2, width: 28, height: 28, borderRadius: 14,
        backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: '#fff',
    },
    identityCol: { flex: 1, marginLeft: theme.spacing.md },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    nameText: { color: '#fff', fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold },
    verifiedPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 8, height: 24, borderRadius: 12 },
    verifiedText: { color: '#fff', fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.medium },
    emailText: { color: '#f2f2f2', fontSize: theme.fontSize.xs, marginTop: 2 },
    memberText: { color: '#eaeaea', fontSize: theme.fontSize.xs, marginTop: 2 },
    
    // Buttons
    primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.colors.primary, paddingHorizontal: 14, height: 44, borderRadius: 22 },
    primaryBtnText: { color: '#fff', fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold },
    secondaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.colors.surface, paddingHorizontal: 14, height: 44, borderRadius: 22, borderWidth: 1, borderColor: theme.colors.lighter },
    secondaryBtnText: { color: theme.colors.primary, fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold },

    // Quick actions
    sectionWrap: { marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg },
    sectionTitle: { fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.colors.text, marginBottom: theme.spacing.sm },
    quickRow: { flexDirection: 'row', gap: theme.spacing.md },
    quickCard: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: theme.spacing.lg, backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.lg, borderWidth: 1, borderColor: theme.colors.lighter },
    quickText: { fontSize: theme.fontSize.sm, color: theme.colors.text, fontWeight: theme.fontWeight.medium },

    // Menus
    menuCard: { paddingHorizontal: theme.spacing.lg, paddingVertical: 0, borderRadius: theme.borderRadius.xl, backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.lighter },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: theme.spacing.lg },
    menuIconPill: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: theme.spacing.lg, borderWidth: 1 },
    menuIconPillDefault: { backgroundColor: `${theme.colors.primary}10`, borderColor: `${theme.colors.primary}40` },
    menuIconPillDanger: { backgroundColor: `${theme.colors.error}10`, borderColor: `${theme.colors.error}40` },
    menuTextCol: { flex: 1 },
    menuTitle: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.medium, color: theme.colors.text },
    menuTitleDanger: { color: theme.colors.error },
    menuSubtitle: { fontSize: theme.fontSize.xs, color: theme.colors.textSecondary, marginTop: 2 },
    menuDivider: { height: 1, backgroundColor: theme.colors.lightest, marginLeft: 56 },

    // Version
    versionWrap: { alignItems: 'center', paddingVertical: theme.spacing.xl },
    versionText: { fontSize: theme.fontSize.xs, color: theme.colors.textSecondary },
});

async function logout() {
    router.replace('/auth/login');
}
