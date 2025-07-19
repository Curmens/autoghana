// app/add-vehicle.tsx
import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

export default function AddVehicleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add a Vehicle</Text>
        <Text style={styles.subtitle}>
          Add your car to your garage to get personalized service reminders and find compatible parts.
        </Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push('/vin-scanner')}
          >
            <Icon name="qr-code-scanner" size={48} color="white" />
            <Text style={styles.optionTitle}>Scan VIN Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.outlineButton]}
            onPress={() => router.push('/manual-vehicle-entry')}
          >
            <Icon name="edit" size={48} color={theme.colors.primary} />
            <Text style={[styles.optionTitle, styles.outlineText]}>Enter Details Manually</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    lineHeight: 22,
  },
  optionsContainer: {
    width: '100%',
    gap: theme.spacing.lg,
  },
  optionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xl,
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadows.medium,
  },
  outlineButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  optionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: 'white',
  },
  outlineText: {
    color: theme.colors.primary,
  },
});