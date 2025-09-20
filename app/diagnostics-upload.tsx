// app/diagnostics-upload.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

const TINT = `${theme.colors.primary}0D`;

const uploadOptions = [
    { id: 'camera', title: 'Take Photo', subtitle: 'Capture diagnostic report with camera', icon: 'camera-alt', color: theme.colors.primary },
    { id: 'gallery', title: 'Choose from Gallery', subtitle: 'Select existing photos from device', icon: 'photo-library', color: theme.colors.secondary },
    { id: 'scanner', title: 'Scan Document', subtitle: 'Use built-in document scanner', icon: 'document-scanner', color: theme.colors.accent },
];

export default function DiagnosticsUploadScreen() {
    const [selected, setSelected] = useState<string | null>(null);

    const Option = ({ o }: { o: typeof uploadOptions[0] }) => {
        const active = selected === o.id;
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelected(o.id)}
                style={[styles.option, active && styles.optionActive]}
            >
                <View style={[styles.iconWrap, { backgroundColor: `${o.color}14` }]}>
                    <Icon name={o.icon} size={24} color={o.color} />
                </View>

                <View style={styles.optionMain}>
                    <Text style={styles.optionTitle}>{o.title}</Text>
                    <Text style={styles.optionSub}>{o.subtitle}</Text>
                </View>

                <View style={[styles.radio, active && styles.radioOn]}>
                    {active ? <View style={styles.radioDot} /> : null}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Top bar */}
            <View style={styles.topBar}>
                <View style={styles.brandRow}>
                    <Icon name="upload" size={20} color={theme.colors.textPrimary} />
                    <Text style={styles.brandText}>Diagnostics</Text>
                </View>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Icon name="close" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.h1}>Upload diagnostic report</Text>
                    <Text style={styles.h2}>
                        Share your vehicle’s diagnostics for smarter recommendations and health tracking.
                    </Text>
                </View>

                {/* Options (flat list) */}
                <Text style={styles.sectionTitle}>Choose upload method</Text>
                <View style={styles.list}>
                    {uploadOptions.map(o => <Option key={o.id} o={o} />)}
                </View>

                {/* Info (flat) */}
                <View style={styles.info}>
                    <View style={styles.infoHead}>
                        <Icon name="info" size={18} color={theme.colors.primary} />
                        <Text style={styles.infoTitle}>What we accept</Text>
                    </View>
                    <View style={styles.infoList}>
                        <Text style={styles.infoItem}>• OBD-II scan reports</Text>
                        <Text style={styles.infoItem}>• Engine diagnostic printouts</Text>
                        <Text style={styles.infoItem}>• Mechanic inspection reports</Text>
                        <Text style={styles.infoItem}>• Service history documents</Text>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        mode="contained"
                        disabled={!selected}
                        onPress={() => selected && console.log('Upload via:', selected)}
                        style={styles.cta}
                        contentStyle={styles.ctaContent}
                        labelStyle={styles.ctaLabel}
                    >
                        Continue
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => router.back()}
                        style={styles.secondary}
                        labelStyle={styles.secondaryLabel}
                    >
                        Maybe later
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    topBar: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing.lg,
    },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    brandText: { color: theme.colors.textSecondary, fontSize: theme.fontSize.sm, letterSpacing: 0.3 },
    closeBtn: { padding: theme.spacing.sm },

    body: { flex: 1, paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing.lg },
    header: { marginBottom: theme.spacing.xl },
    h1: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    h2: { marginTop: theme.spacing.xs, color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.bodyLarge },

    sectionTitle: {
        color: theme.colors.textPrimary,
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        marginBottom: theme.spacing.md,
    },

    list: { gap: theme.spacing.md, marginBottom: theme.spacing.xl },
    option: {
        flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md,
        padding: theme.spacing.lg, borderRadius: theme.borderRadius.xl, backgroundColor: TINT,
    },
    optionActive: { backgroundColor: `${theme.colors.primary}1A` },
    iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    optionMain: { flex: 1 },
    optionTitle: {
        color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.semibold,
    },
    optionSub: { color: theme.colors.textSecondary, marginTop: 2, fontSize: theme.typography?.sizes.body },

    radio: {
        width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: theme.colors.lighter, alignItems: 'center', justifyContent: 'center',
    },
    radioOn: { borderColor: theme.colors.primary },
    radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary },

    info: {
        backgroundColor: `${theme.colors.primary}0F`,
        borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg, marginBottom: theme.spacing.xl,
    },
    infoHead: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.sm },
    infoTitle: {
        color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.bodyLarge, fontWeight: theme.typography?.weights.semibold,
    },
    infoList: { gap: theme.spacing.xs },
    infoItem: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.body },

    actions: { marginTop: 'auto', paddingVertical: theme.spacing.lg, gap: theme.spacing.sm },
    cta: { borderRadius: 24, backgroundColor: theme.colors.primary },
    ctaContent: { paddingVertical: theme.spacing.md },
    ctaLabel: { color: '#fff', fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.bodyLarge },

    secondary: { alignSelf: 'center' },
    secondaryLabel: { color: theme.colors.textSecondary, fontWeight: theme.typography?.weights.medium },
});
