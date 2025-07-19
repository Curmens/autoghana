// app/diagnostics-upload.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

export default function DiagnosticsUploadScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Icon name="upload" size={64} color={theme.colors.textSecondary} />
                <Text style={styles.title}>Upload Diagnostics</Text>
                <Text style={styles.subtitle}>
                    Diagnostic report upload feature coming soon!
                </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
    },
});