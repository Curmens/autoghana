// app/(tabs)/reports.tsx
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card, Chip, Divider, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme, themeComponents } from './theme';

type ReportType = 'police' | 'traffic' | 'hazard' | 'accident';
type Severity = 'low' | 'medium' | 'high';

interface Report {
    id: string;
    type: ReportType;
    title: string;
    location: string;
    distance: string;
    timeAgo: string;
    severity: Severity;
    verifications: number;
    description?: string;
}

const reportTypes: { id: 'all' | ReportType; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: 'list' },
    { id: 'police', label: 'Police', icon: 'local-police' },
    { id: 'traffic', label: 'Traffic', icon: 'traffic' },
    { id: 'hazard', label: 'Hazards', icon: 'warning' },
    { id: 'accident', label: 'Accidents', icon: 'car-crash' },
];

const MOCK: Report[] = [
    {
        id: '1',
        type: 'police',
        title: 'Police Checkpoint',
        location: 'East Legon - Spintex Road',
        distance: '0.8 km away',
        timeAgo: '5m ago',
        severity: 'medium',
        verifications: 12,
        description: 'Active checkpoint checking documents',
    },
    {
        id: '2',
        type: 'traffic',
        title: 'Heavy Traffic',
        location: 'Accra Mall - Tetteh Quarshie',
        distance: '2.1 km away',
        timeAgo: '8m ago',
        severity: 'high',
        verifications: 28,
        description: 'Slow moving traffic due to construction',
    },
    {
        id: '3',
        type: 'accident',
        title: 'Minor Accident',
        location: 'Ring Road - Osu Junction',
        distance: '3.4 km away',
        timeAgo: '15m ago',
        severity: 'high',
        verifications: 6,
        description: 'Fender bender blocking right lane',
    },
    {
        id: '4',
        type: 'hazard',
        title: 'Road Pothole',
        location: 'La Beach Road',
        distance: '1.2 km away',
        timeAgo: '25m ago',
        severity: 'low',
        verifications: 4,
        description: 'Large pothole in the left lane',
    },
];

export default function ReportsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<'all' | ReportType>('all');
    const [reports, setReports] = useState<Report[]>(MOCK);

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return reports.filter(r => {
            const typeOk = selectedType === 'all' || r.type === selectedType;
            const textOk = !q || r.title.toLowerCase().includes(q) || r.location.toLowerCase().includes(q);
            return typeOk && textOk;
        });
    }, [reports, selectedType, searchQuery]);

    const handleVerify = (id: string) => {
        setReports(prev =>
            prev.map(r => (r.id === id ? { ...r, verifications: r.verifications + 1 } : r)),
        );
    };

    const colorForType = (t: ReportType) =>
        t === 'police' ? theme.colors.primary :
            t === 'traffic' ? theme.colors.warning :
                t === 'hazard' ? theme.colors.accent :
                    t === 'accident' ? theme.colors.error :
                        theme.colors.textSecondary;

    const iconForType = (t: ReportType) =>
        t === 'police' ? 'local-police' :
            t === 'traffic' ? 'traffic' :
                t === 'hazard' ? 'warning' :
                    'car-crash';

    const colorForSeverity = (s: Severity) =>
        s === 'high' ? theme.colors.error :
            s === 'medium' ? theme.colors.warning :
                theme.colors.success;

    const Header = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerTopRow}>
                <View>
                    <Text style={styles.headerTitle}>Live Reports</Text>
                    <Text style={styles.headerSubtitle}>Real-time traffic & road updates</Text>
                </View>
                <TouchableOpacity style={styles.headerMapBtn} onPress={() => router.push('/map')}>
                    <Icon name="map" size={22} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <Searchbar
                placeholder="Search by location or title"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchBar}
                inputStyle={styles.searchInput}
                iconColor={theme.colors.textSecondary}
            />

            <View style={styles.filtersRow}>
                {reportTypes.map(t => {
                    const active = selectedType === t.id;
                    return (
                        <Chip
                            key={t.id}
                            mode={active ? 'flat' : 'outlined'}
                            selected={active}
                            onPress={() => setSelectedType(t.id as any)}
                            style={[styles.filtersChip, active ? styles.filtersChipActive : styles.filtersChipIdle]}
                            textStyle={[styles.filtersChipText, active ? styles.filtersChipTextActive : styles.filtersChipTextIdle]}
                            icon={() => (
                                <Icon
                                    name={t.icon}
                                    size={16}
                                    color={active ? '#fff' : theme.colors.textSecondary}
                                />
                            )}
                        >
                            {t.label}
                        </Chip>
                    );
                })}
            </View>

            {/* Premium ribbon */}
            <View style={styles.premiumBanner}>
                <Icon name="workspace-premium" size={16} color={theme.colors.primary} />
                <Text style={styles.premiumText}>Premium crowdsourced data</Text>
            </View>

            <Divider style={styles.headerDivider} />
        </View>
    );

    const ReportCard = ({ r }: { r: Report }) => {
        const typeColor = colorForType(r.type);
        const sevColor = colorForSeverity(r.severity);

        return (
            <Card style={styles.cardBase} mode="elevated">
                <View style={styles.cardTopRow}>
                    <View style={[styles.cardIconWrap, { backgroundColor: `${typeColor}15` }]}>
                        <Icon name={iconForType(r.type)} size={22} color={typeColor} />
                    </View>

                    <View style={styles.cardMain}>
                        <Text style={styles.cardTitle} numberOfLines={2}>{r.title}</Text>

                        <View style={styles.cardMetaRow}>
                            <Icon name="place" size={14} color={theme.colors.textSecondary} />
                            <Text style={styles.cardMetaText} numberOfLines={1}>{r.location}</Text>
                            <View style={styles.cardDot} />
                            <Text style={styles.cardMetaText}>{r.distance}</Text>
                        </View>

                        <View style={styles.cardMetaRow}>
                            <View style={[styles.cardSeverityPill, { backgroundColor: `${sevColor}15`, borderColor: `${sevColor}55` }]}>
                                <View style={[styles.cardSeverityDot, { backgroundColor: sevColor }]} />
                                <Text style={[styles.cardSeverityText, { color: sevColor }]}>
                                    {r.severity === 'high' ? 'High' : r.severity === 'medium' ? 'Medium' : 'Low'} severity
                                </Text>
                            </View>

                            <View style={styles.cardTimeRow}>
                                <Icon name="schedule" size={14} color={theme.colors.textSecondary} />
                                <Text style={styles.cardMetaText}>{r.timeAgo}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Verify count */}
                    <View style={styles.cardVerifyCount}>
                        <Icon name="verified" size={16} color={theme.colors.success} />
                        <Text style={styles.cardVerifyText}>{r.verifications}</Text>
                    </View>
                </View>

                {!!r.description && (
                    <Text style={styles.cardDesc} numberOfLines={3}>
                        {r.description}
                    </Text>
                )}

                <View style={styles.cardCtaRow}>
                    <TouchableOpacity style={styles.cardCtaGhost} onPress={() => router.push(`/navigate?to=${encodeURIComponent(r.location)}`)}>
                        <Icon name="navigation" size={16} color={theme.colors.text} />
                        <Text style={styles.cardCtaGhostText}>Navigate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardCtaGhost} onPress={() => { /* share */ }}>
                        <Icon name="ios-share" size={16} color={theme.colors.text} />
                        <Text style={styles.cardCtaGhostText}>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardCtaPrimary} onPress={() => handleVerify(r.id)}>
                        <Icon name="thumb-up" size={16} color="#fff" />
                        <Text style={styles.cardCtaPrimaryText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        );
    };

    return (
        <SafeAreaView style={styles.layoutContainer}>
            <FlatList
                data={filtered}
                keyExtractor={(it) => it.id}
                ListHeaderComponent={<Header />}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => <ReportCard r={item} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="info" size={56} color={theme.colors.textSecondary} />
                        <Text style={styles.emptyTitle}>No reports yet</Text>
                        <Text style={styles.emptySubtitle}>Be the first to report in your area</Text>
                    </View>
                }
            />

            {/* Extended premium FAB */}
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => router.push('/(tabs)/create-report')}
                    style={styles.fabButton}
                >
                    <Icon name="add" size={18} color="#fff" />
                    <Text style={styles.fabLabel}>New Report</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

/** Styles (flattened for TypeScript compatibility) */
const styles = StyleSheet.create({
    // Layout
    layoutContainer: {
        flex: 1,
        backgroundColor: theme.colors.background
    },

    // Header
    headerContainer: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightest,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
    },
    headerTitle: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    headerSubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    headerMapBtn: {
        ...themeComponents.button.ghost,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.lightest,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerDivider: {
        marginTop: theme.spacing.md,
        backgroundColor: theme.colors.lightest
    },

    // Search
    searchBar: {
        backgroundColor: theme.colors.lightest,
        borderRadius: 24,
        elevation: 0,
    },
    searchInput: {
        fontSize: theme.typography?.sizes.body
    },

    // Filters
    filtersRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
        paddingTop: theme.spacing.md,
    },
    filtersChip: {
        height: 32,
        borderRadius: 16
    },
    filtersChipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary
    },
    filtersChipIdle: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border
    },
    filtersChipText: {
        fontSize: theme.typography?.sizes.caption,
        fontWeight: theme.typography?.weights.medium
    },
    filtersChipTextActive: {
        color: '#fff'
    },
    filtersChipTextIdle: {
        color: theme.colors.text
    },

    // Premium
    premiumBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        backgroundColor: theme.colors.lightest,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginTop: theme.spacing.md,
        alignSelf: 'flex-start',
    },
    premiumText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography?.weights.medium,
    },

    // List
    listContent: {
        padding: theme.spacing.lg,
        paddingBottom: 120
    },

    // Card
    cardBase: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        ...theme.shadows.small,
    },
    cardTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    cardIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    cardMain: {
        flex: 1
    },
    cardTitle: {
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    cardMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2
    },
    cardMetaText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary
    },
    cardDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: theme.colors.border,
        marginHorizontal: 2
    },
    cardSeverityPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        marginRight: theme.spacing.md,
    },
    cardSeverityDot: {
        width: 6,
        height: 6,
        borderRadius: 3
    },
    cardSeverityText: {
        fontSize: theme.typography?.sizes.caption,
        fontWeight: theme.typography?.weights.medium
    },
    cardTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    cardVerifyCount: {
        alignItems: 'flex-end',
        marginLeft: theme.spacing.md
    },
    cardVerifyText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
        marginTop: 4
    },
    cardDesc: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textPrimary,
        lineHeight: (theme.typography?.lineHeights?.normal ?? 1.5) * (theme.typography?.sizes?.body ?? 16),
        marginTop: theme.spacing.md,
    },
    cardCtaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.lg,
    },
    cardCtaGhost: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: 999,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        flex: 1,
    },
    cardCtaGhostText: {
        color: theme.colors.text,
        fontSize: theme.typography?.sizes.caption,
        fontWeight: theme.typography?.weights.medium
    },
    cardCtaPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: 999,
        backgroundColor: theme.colors.primary,
    },
    cardCtaPrimaryText: {
        color: '#fff',
        fontSize: theme.typography?.sizes.caption,
        fontWeight: theme.typography?.weights.semibold
    },

    // Empty state
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xxxl
    },
    emptyTitle: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xs,
    },
    emptySubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.xl
    },

    // FAB
    fabContainer: {
        position: 'absolute',
        right: theme.spacing.lg,
        bottom: theme.spacing.lg + 100,
        alignItems: 'center',
    },
    fabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: theme.colors.primary,
        borderRadius: 28,
        paddingHorizontal: 16,
        height: 56,
        ...theme.shadows.small,
    },
    fabLabel: {
        color: '#fff',
        fontSize: theme.fontSize?.sm,
        fontWeight: theme.fontWeight?.semibold
    },
});