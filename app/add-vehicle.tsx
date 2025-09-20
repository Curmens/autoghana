// app/add-vehicle.tsx
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

const TINT = `${theme.colors.primary}0D`;

export default function AddVehicleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.brand}>Garage</Text>
        <TouchableOpacity onPress={() => router.back()}><Icon name="close" size={20} color={theme.colors.textSecondary} /></TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Add a vehicle</Text>
        <Text style={styles.subtitle}>
          Keep your garage up to date to get accurate reminders and compatible parts.
        </Text>

        <View style={styles.options}>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/vin-scanner')}>
            <View style={[styles.iconWrap, { backgroundColor: `${theme.colors.primary}14` }]}>
              <Icon name="qr-code-scanner" size={28} color={theme.colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Scan VIN Code</Text>
            <Text style={styles.cardSub}>Use your camera for instant recognition</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.push('/manual-vehicle-entry')}>
            <View style={[styles.iconWrap, { backgroundColor: `${theme.colors.secondary}14` }]}>
              <Icon name="edit" size={28} color={theme.colors.secondary} />
            </View>
            <Text style={styles.cardTitle}>Enter Manually</Text>
            <Text style={styles.cardSub}>Fill in make, model, year & plate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  subtitle: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.bodyLarge, marginTop: 6, marginBottom: theme.spacing.xl },

  options: { gap: theme.spacing.lg },
  card: {
    backgroundColor: TINT, borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg, gap: theme.spacing.sm,
  },
  iconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.title },
  cardSub: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.body },
});
