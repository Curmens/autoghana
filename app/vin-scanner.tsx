// app/vin-scanner.tsx
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

const FRAME_BG = `${theme.colors.primary}0D`;

export default function VinScannerScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={styles.brand}>Garage</Text>
                <Icon name="qr-code-scanner" size={20} color={theme.colors.textSecondary} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>VIN Scanner</Text>
                <Text style={styles.subtitle}>
                    Camera-based VIN scanning is coming soon. You’ll be able to scan quickly and auto-fill your vehicle details.
                </Text>

                {/* Camera frame placeholder (flat, classy) */}
                <View style={styles.frame}>
                    <View style={styles.cornerTL} />
                    <View style={styles.cornerTR} />
                    <View style={styles.cornerBL} />
                    <View style={styles.cornerBR} />
                    <View style={styles.badge}>
                        <Icon name="bolt" size={14} color={theme.colors.success} />
                        <Text style={styles.badgeText}>Fast recognition</Text>
                    </View>
                </View>

                {/* Feature bullets */}
                <View style={styles.features}>
                    <View style={styles.featureRow}>
                        <Icon name="auto-fix-high" size={18} color={theme.colors.success} />
                        <Text style={styles.featureText}>Auto-fill vehicle details</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Icon name="speed" size={18} color={theme.colors.success} />
                        <Text style={styles.featureText}>Save time & reduce errors</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Icon name="verified" size={18} color={theme.colors.success} />
                        <Text style={styles.featureText}>Improved accuracy</Text>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        mode="contained"
                        onPress={() => router.push('/manual-vehicle-entry')}
                        style={styles.cta}
                        contentStyle={{ paddingVertical: 12 }}
                        labelStyle={{ color: '#fff', fontWeight: theme.typography?.weights.semibold }}
                    >
                        Enter Details Manually
                    </Button>
                    <Button
                        mode="text"
                        onPress={() => router.back()}
                        style={{ alignSelf: 'center' }}
                        labelStyle={{ color: theme.colors.textSecondary, fontWeight: theme.typography?.weights.medium }}
                    >
                        Go back
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const C = 18;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    headerBar: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing.lg,
    },
    brand: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption, letterSpacing: 0.3 },

    content: { flex: 1, paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing.lg },
    title: {
        color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
    },
    subtitle: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.bodyLarge, marginTop: 6 },

    frame: {
        marginTop: theme.spacing.xl,
        height: 220,
        borderRadius: theme.borderRadius.xl,
        backgroundColor: FRAME_BG,
        position: 'relative',
        overflow: 'hidden',
    },
    cornerTL: { position: 'absolute', top: 10, left: 10, width: C, height: 2, backgroundColor: theme.colors.primary },
    cornerTR: { position: 'absolute', top: 10, right: 10, width: C, height: 2, backgroundColor: theme.colors.primary },
    cornerBL: { position: 'absolute', bottom: 10, left: 10, width: C, height: 2, backgroundColor: theme.colors.primary },
    cornerBR: { position: 'absolute', bottom: 10, right: 10, width: C, height: 2, backgroundColor: theme.colors.primary },
    badge: {
        position: 'absolute', top: 12, alignSelf: 'center', flexDirection: 'row',
        alignItems: 'center', gap: 6, backgroundColor: theme.colors.white,
        paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999,
    },
    badgeText: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.caption, fontWeight: theme.typography?.weights.medium },

    features: { marginTop: theme.spacing.xl, gap: theme.spacing.md },
    featureRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
    featureText: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.medium },

    actions: { marginTop: 'auto', paddingVertical: theme.spacing.xl, gap: theme.spacing.sm },
    cta: { borderRadius: 24, backgroundColor: theme.colors.primary },
});
