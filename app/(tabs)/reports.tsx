// app/(tabs)/reports.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { airbnbComponents, theme } from './theme';

const { width } = Dimensions.get('window');

interface Report {
    id: string;
    type: 'police' | 'traffic' | 'hazard' | 'accident';
    title: string;
    location: string;
    distance: string;
    timeAgo: string;
    severity: 'low' | 'medium' | 'high';
    verifications: number;
    description?: string;
}

const mockReports: Report[] = [
    {
        id: '1',
        type: 'police',
        title: 'Police Checkpoint',
        location: 'East Legon - Spintex Road',
        distance: '0.8 km away',
        timeAgo: '5 minutes ago',
        severity: 'medium',
        verifications: 12,
        description: 'Active checkpoint checking documents'
    },
    {
        id: '2',
        type: 'traffic',
        title: 'Heavy Traffic',
        location: 'Accra Mall - Tetteh Quarshie',
        distance: '2.1 km away',
        timeAgo: '8 minutes ago',
        severity: 'high',
        verifications: 28,
        description: 'Slow moving traffic due to construction'
    },
    {
        id: '3',
        type: 'accident',
        title: 'Minor Accident',
        location: 'Ring Road - Osu Junction',
        distance: '3.4 km away',
        timeAgo: '15 minutes ago',
        severity: 'high',
        verifications: 6,
        description: 'Fender bender blocking right lane'
    },
    {
        id: '4',
        type: 'hazard',
        title: 'Road Pothole',
        location: 'La Beach Road',
        distance: '1.2 km away',
        timeAgo: '25 minutes ago',
        severity: 'low',
        verifications: 4,
        description: 'Large pothole in the left lane'
    },
];

const reportTypes = [
    { id: 'all', label: 'All', icon: 'list' },
    { id: 'police', label: 'Police', icon: 'local-police' },
    { id: 'traffic', label: 'Traffic', icon: 'traffic' },
    { id: 'hazard', label: 'Hazards', icon: 'warning' },
    { id: 'accident', label: 'Accidents', icon: 'car-crash' },
];

export default function ReportsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [reports, setReports] = useState(mockReports);

    const getReportIcon = (type: Report['type']) => {
        switch (type) {
            case 'police': return 'local-police';
            case 'traffic': return 'traffic';
            case 'hazard': return 'warning';
            case 'accident': return 'car-crash';
            default: return 'info';
        }
    };

    const getReportColor = (type: Report['type']) => {
        switch (type) {
            case 'police': return theme.colors.primary;
            case 'traffic': return theme.colors.warning;
            case 'hazard': return theme.colors.accent;
            case 'accident': return theme.colors.error;
            default: return theme.colors.textSecondary;
        }
    };

    const getSeverityColor = (severity: Report['severity']) => {
        switch (severity) {
            case 'high': return theme.colors.error;
            case 'medium': return theme.colors.warning;
            case 'low': return theme.colors.success;
            default: return theme.colors.textSecondary;
        }
    };

    const filteredReports = reports.filter(report => {
        const matchesType = selectedType === 'all' || report.type === selectedType;
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleVerifyReport = (reportId: string) => {
        setReports(prev => prev.map(report =>
            report.id === reportId
                ? { ...report, verifications: report.verifications + 1 }
                : report
        ));
    };

    const AirbnbCard = ({ children, style = {}, shadow = 'soft' }: any) => (
        <View style={[styles.airbnbCard, theme.shadows[shadow], style]}>
            {children}
        </View>
    );

    const TypeFilterChip = ({ type }: { type: typeof reportTypes[0] }) => (
        <TouchableOpacity
            style={[
                styles.filterChip,
                selectedType === type.id && styles.filterChipActive
            ]}
            onPress={() => setSelectedType(type.id)}
        >
            <Icon
                name={type.icon}
                size={16}
                color={selectedType === type.id ? theme.colors.white : theme.colors.textSecondary}
            />
            <Text style={[
                styles.filterChipText,
                selectedType === type.id && styles.filterChipTextActive
            ]}>
                {type.label}
            </Text>
        </TouchableOpacity>
    );

    const ReportCard = ({ report }: { report: Report }) => (
        <TouchableOpacity style={styles.reportContainer} activeOpacity={0.95}>
            <AirbnbCard style={styles.reportCard}>
                <View style={styles.reportHeader}>
                    <View style={[styles.reportIconContainer, { backgroundColor: `${getReportColor(report.type)}15` }]}>
                        <Icon
                            name={getReportIcon(report.type)}
                            size={24}
                            color={getReportColor(report.type)}
                        />
                    </View>

                    <View style={styles.reportMainInfo}>
                        <Text style={styles.reportTitle}>{report.title}</Text>
                        <View style={styles.reportLocationRow}>
                            <Icon name="place" size={14} color={theme.colors.textSecondary} />
                            <Text style={styles.reportLocation}>{report.location}</Text>
                        </View>
                        <Text style={styles.reportDistance}>{report.distance}</Text>
                    </View>

                    <View style={styles.reportMeta}>
                        <View style={[styles.severityDot, { backgroundColor: getSeverityColor(report.severity) }]} />
                        <Text style={styles.reportTime}>{report.timeAgo}</Text>
                    </View>
                </View>

                {report.description && (
                    <Text style={styles.reportDescription}>{report.description}</Text>
                )}

                <View style={styles.reportFooter}>
                    <View style={styles.verificationsContainer}>
                        <Icon name="verified" size={16} color={theme.colors.success} />
                        <Text style={styles.verificationsText}>
                            {report.verifications} verifications
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.verifyButton}
                        onPress={() => handleVerifyReport(report.id)}
                    >
                        <Icon name="thumb-up" size={16} color={theme.colors.primary} />
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </AirbnbCard>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.headerTitle}>Live Reports</Text>
                        <Text style={styles.headerSubtitle}>Real-time traffic & road updates</Text>
                    </View>

                    <TouchableOpacity style={styles.mapButton}>
                        <Icon name="map" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <Searchbar
                    placeholder="Search reports by location..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    inputStyle={styles.searchInput}
                    iconColor={theme.colors.textSecondary}
                />
            </View>

            {/* Filter Chips */}
            <View style={styles.filtersContainer}>
                <FlatList
                    data={reportTypes}
                    renderItem={({ item }) => <TypeFilterChip type={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filtersList}
                />
            </View>

            {/* Reports List */}
            <FlatList
                data={filteredReports}
                renderItem={({ item }) => <ReportCard report={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.reportsList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <Icon name="info" size={64} color={theme.colors.textSecondary} />
                        <Text style={styles.emptyTitle}>No reports found</Text>
                        <Text style={styles.emptySubtitle}>
                            Be the first to report traffic conditions in your area
                        </Text>
                    </View>
                )}
            />

            {/* Floating Action Button */}
            <FAB
                style={styles.fab}
                icon="add"
                label="Report"
                onPress={() => router.push('/create-report')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    // Header Styles
    header: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightest,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.xl,
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
    mapButton: {
        ...airbnbComponents.button.ghost,
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.round,
        backgroundColor: theme.colors.lightest,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        backgroundColor: theme.colors.lightest,
        borderRadius: theme.borderRadius.xxl,
        elevation: 0,
    },
    searchInput: {
        fontSize: theme.typography?.sizes.body,
    },

    // Card Base
    airbnbCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        padding: theme.spacing.xl,
    },

    // Filters
    filtersContainer: {
        paddingVertical: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightest,
    },
    filtersList: {
        paddingHorizontal: theme.spacing.xl,
        gap: theme.spacing.md,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.round,
        backgroundColor: theme.colors.lightest,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
    },
    filterChipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    filterChipText: {
        fontSize: theme.typography?.sizes.body,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textSecondary,
    },
    filterChipTextActive: {
        color: theme.colors.white,
    },

    // Reports List
    reportsList: {
        padding: theme.spacing.xl,
        paddingBottom: 100, // Space for FAB
    },
    reportContainer: {
        marginBottom: theme.spacing.lg,
    },
    reportCard: {
        padding: theme.spacing.xl,
    },
    reportHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
    },
    reportIconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.lg,
    },
    reportMainInfo: {
        flex: 1,
    },
    reportTitle: {
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    reportLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
    },
    reportLocation: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    reportDistance: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    reportMeta: {
        alignItems: 'flex-end',
    },
    severityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: theme.spacing.sm,
    },
    reportTime: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
        textAlign: 'right',
    },
    reportDescription: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textPrimary,
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.body,
        marginBottom: theme.spacing.lg,
    },
    reportFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.lightest,
    },
    verificationsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    verificationsText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },
    verifyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.round,
        backgroundColor: theme.colors.lightest,
    },
    verifyButtonText: {
        fontSize: theme.typography?.sizes.body,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.primary,
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xxxl,
    },
    emptyTitle: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
    },
    emptySubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.xl,
    },

    // FAB
    fab: {
        position: 'absolute',
        margin: theme.spacing.xl,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.primary,
    },
});