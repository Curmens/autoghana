// app/diagnostics-upload.tsx - Updated with Theme theme
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

const uploadOptions = [
    {
        id: 'camera',
        title: 'Take Photo',
        subtitle: 'Capture diagnostic report with camera',
        icon: 'camera-alt',
        color: theme.colors.primary,
    },
    {
        id: 'gallery',
        title: 'Choose from Gallery',
        subtitle: 'Select existing photos from device',
        icon: 'photo-library',
        color: theme.colors.secondary,
    },
    {
        id: 'scanner',
        title: 'Scan Document',
        subtitle: 'Use built-in document scanner',
        icon: 'document-scanner',
        color: theme.colors.accent,
    },
];

export default function DiagnosticsUploadScreen() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const ThemeCard = ({ children, style = {}, shadow = 'soft' }: any) => (
        <View style={[styles.themeCard, theme.shadows[shadow], style]}>
            {children}
        </View>
    );

    const UploadOptionCard = ({ option }: { option: typeof uploadOptions[0] }) => (
        <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => setSelectedOption(option.id)}
            activeOpacity={0.95}
        >
            <ThemeCard style={[
                styles.optionCard,
                selectedOption === option.id && styles.optionCardSelected
            ]}>
                <View style={[styles.optionIcon, { backgroundColor: `${option.color}15` }]}>
                    <Icon name={option.icon} size={32} color={option.color} />
                </View>
                
                <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
                
                <View style={[
                    styles.radioButton,
                    selectedOption === option.id && styles.radioButtonSelected
                ]}>
                    {selectedOption === option.id && (
                        <View style={styles.radioButtonInner} />
                    )}
                </View>
            </ThemeCard>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerIconContainer}>
                        <Icon name="upload" size={48} color={theme.colors.primary} />
                    </View>
                    
                    <Text style={styles.title}>Upload Diagnostic Report</Text>
                    <Text style={styles.subtitle}>
                        Share your vehicle&apos;s diagnostic information to get better service recommendations and track your car's health over time.
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    <Text style={styles.sectionTitle}>Choose upload method</Text>
                    
                    {uploadOptions.map((option) => (
                        <UploadOptionCard key={option.id} option={option} />
                    ))}
                </View>

                <ThemeCard style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Icon name="info" size={20} color={theme.colors.primary} />
                        <Text style={styles.infoTitle}>What we accept</Text>
                    </View>
                    
                    <View style={styles.infoList}>
                        <Text style={styles.infoItem}>• OBD-II scan reports</Text>
                        <Text style={styles.infoItem}>• Engine diagnostic printouts</Text>
                        <Text style={styles.infoItem}>• Mechanic inspection reports</Text>
                        <Text style={styles.infoItem}>• Service history documents</Text>
                    </View>
                </ThemeCard>

                <View style={styles.actions}>
                    <Button
                        mode="contained"
                        onPress={() => {
                            if (selectedOption) {
                                // Handle upload logic here
                                console.log('Upload with:', selectedOption);
                            }
                        }}
                        disabled={!selectedOption}
                        style={styles.uploadButton}
                        contentStyle={styles.buttonContent}
                    >
                        Continue with Upload
                    </Button>
                    
                    <Button
                        mode="outlined"
                        onPress={() => router.back()}
                        style={styles.cancelButton}
                        contentStyle={styles.buttonContent}
                    >
                        Maybe Later
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        padding: theme.spacing.xl,
    },

    // Header
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxxl,
    },
    headerIconContainer: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.xl,
        backgroundColor: `${theme.colors.primary}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: (theme.typography?.lineHeights.normal ?? 1.2) * theme.typography?.sizes.bodyLarge,
        paddingHorizontal: theme.spacing.md,
    },

    // Card Base
    themeCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        padding: theme.spacing.xl,
    },

    // Options
    optionsContainer: {
        marginBottom: theme.spacing.xxxl,
    },
    sectionTitle: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xl,
    },
    optionContainer: {
        marginBottom: theme.spacing.lg,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.lg,
    },
    optionCardSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: `${theme.colors.primary}05`,
    },
    optionIcon: {
        width: 64,
        height: 64,
        borderRadius: theme.borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    optionSubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.body,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.lighter,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: theme.colors.primary,
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.primary,
    },

    // Info Card
    infoCard: {
        marginBottom: theme.spacing.xxxl,
        backgroundColor: `${theme.colors.primary}08`,
        borderColor: `${theme.colors.primary}20`,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    infoTitle: {
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    infoList: {
        gap: theme.spacing.md,
    },
    infoItem: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textPrimary,
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.bodyLarge,
    },

    // Actions
    actions: {
        gap: theme.spacing.lg,
        marginTop: 'auto',
    },
    uploadButton: {
        borderRadius: theme.borderRadius.xl,
    },
    cancelButton: {
        borderRadius: theme.borderRadius.xl,
        borderColor: theme.colors.lighter,
    },
    buttonContent: {
        paddingVertical: theme.spacing.md,
    },
});