// app/vin-scanner.tsx - Updated with Airbnb theme
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "./(tabs)/theme";

export default function VinScannerScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Icon
                        name="qr-code-scanner"
                        size={80}
                        color={theme.colors.primary}
                    />
                </View>
                
                <Text style={styles.title}>VIN Scanner</Text>
                <Text style={styles.subtitle}>
                    We&apos;re working on bringing you camera-based VIN scanning to make adding your vehicle even easier.
                </Text>
                
                <View style={styles.featuresList}>
                    <View style={styles.featureItem}>
                        <Icon name="camera-alt" size={20} color={theme.colors.success} />
                        <Text style={styles.featureText}>Instant VIN recognition</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="auto-fix-high" size={20} color={theme.colors.success} />
                        <Text style={styles.featureText}>Auto-fill vehicle details</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="speed" size={20} color={theme.colors.success} />
                        <Text style={styles.featureText}>Save time & reduce errors</Text>
                    </View>
                </View>

                <View style={styles.actionButtons}>
                    <Button
                        mode="contained"
                        onPress={() => router.push("/manual-vehicle-entry")}
                        style={styles.primaryButton}
                        contentStyle={styles.buttonContent}
                    >
                        Enter Details Manually
                    </Button>
                    
                    <Button
                        mode="outlined"
                        onPress={() => router.back()}
                        style={styles.secondaryButton}
                        contentStyle={styles.buttonContent}
                    >
                        Go Back
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
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.xl,
    },
    iconContainer: {
        width: 120,
        height: 120,
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
        textAlign: "center",
    },
    subtitle: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textSecondary,
        textAlign: "center",
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.bodyLarge,
        marginBottom: theme.spacing.xxxl,
        paddingHorizontal: theme.spacing.md,
    },
    featuresList: {
        alignSelf: 'stretch',
        marginBottom: theme.spacing.xxxl,
        gap: theme.spacing.lg,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
    },
    featureText: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textPrimary,
        fontWeight: theme.typography?.weights.medium,
    },
    actionButtons: {
        alignSelf: 'stretch',
        gap: theme.spacing.lg,
    },
    primaryButton: {
        borderRadius: theme.borderRadius.xl,
    },
    secondaryButton: {
        borderRadius: theme.borderRadius.xl,
        borderColor: theme.colors.lighter,
    },
    buttonContent: {
        paddingVertical: theme.spacing.md,
    },
});