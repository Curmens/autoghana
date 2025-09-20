// app/manual-vehicle-entry.jsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './(tabs)/theme';

const INPUT_BG = `${theme.colors.primary}0D`;

export default function ManualVehicleEntryScreen() {
  const [formData, setFormData] = useState({ make: '', model: '', year: '', plate: '' });
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const validateForm = () => {
    const e: Record<string, string | null> = {};
    if (!formData.make.trim()) e.make = 'Make is required';
    if (!formData.model.trim()) e.model = 'Model is required';
    if (!formData.year.trim()) e.year = 'Year is required';
    if (!formData.plate.trim()) e.plate = 'License plate is required';

    if (formData.year) {
      const y = parseInt(formData.year, 10);
      const now = new Date().getFullYear() + 1;
      if (!/^\d{4}$/.test(formData.year) || y < 1900 || y > now) e.year = 'Please enter a valid year';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    Alert.alert(
      'Vehicle Added',
      `Your ${formData.year} ${formData.make} ${formData.model} has been added to your garage.`,
      [{ text: 'OK', onPress: () => router.push('/(tabs)/my-garage') }]
    );
  };

  const update = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.h1}>Enter vehicle details</Text>
          <Text style={styles.h2}>Provide accurate information for better service matches.</Text>
        </View>

        {/* Flat form */}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Make</Text>
            <TextInput
              mode="flat"
              value={formData.make}
              onChangeText={(t) => update('make', t)}
              placeholder="e.g., Toyota"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={styles.input}
              contentStyle={styles.inputContent}
              theme={{ colors: { background: 'transparent' } }}
              dense
            />
            {!!errors.make && <Text style={styles.error}>{errors.make}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Model</Text>
            <TextInput
              mode="flat"
              value={formData.model}
              onChangeText={(t) => update('model', t)}
              placeholder="e.g., Camry"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={styles.input}
              contentStyle={styles.inputContent}
              theme={{ colors: { background: 'transparent' } }}
              dense
            />
            {!!errors.model && <Text style={styles.error}>{errors.model}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Year</Text>
            <TextInput
              mode="flat"
              value={formData.year}
              onChangeText={(t) => update('year', t)}
              placeholder="e.g., 2022"
              keyboardType="number-pad"
              maxLength={4}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={styles.input}
              contentStyle={styles.inputContent}
              theme={{ colors: { background: 'transparent' } }}
              dense
            />
            {!!errors.year && <Text style={styles.error}>{errors.year}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>License Plate</Text>
            <TextInput
              mode="flat"
              value={formData.plate}
              onChangeText={(t) => update('plate', t.toUpperCase())}
              placeholder="e.g., GT 1234-24"
              autoCapitalize="characters"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={styles.input}
              contentStyle={styles.inputContent}
              theme={{ colors: { background: 'transparent' } }}
              dense
            />
            {!!errors.plate && <Text style={styles.error}>{errors.plate}</Text>}
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.cta}
            contentStyle={styles.ctaContent}
            labelStyle={styles.ctaLabel}
          >
            Save Vehicle
          </Button>
        </View>

        <View style={{ height: theme.spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { flex: 1, paddingHorizontal: theme.spacing.xl },

  header: { paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.md },
  h1: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography?.sizes.heading,
    fontWeight: theme.typography?.weights.semibold,
  },
  h2: { marginTop: theme.spacing.xs, color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.bodyLarge },

  form: { marginTop: theme.spacing.lg, gap: theme.spacing.lg },
  field: { gap: theme.spacing.xs },
  label: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },

  input: { backgroundColor: INPUT_BG, borderRadius: theme.borderRadius.lg, paddingHorizontal: theme.spacing.md },
  inputContent: { paddingLeft: 2, fontSize: theme.typography?.sizes.bodyLarge },

  error: { color: theme.colors.error, fontSize: theme.typography?.sizes.caption, marginTop: 2 },

  cta: { borderRadius: 24, backgroundColor: theme.colors.primary, marginTop: theme.spacing.md },
  ctaContent: { paddingVertical: theme.spacing.md },
  ctaLabel: { color: '#fff', fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.bodyLarge },
});
