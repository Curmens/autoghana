// app/manual-vehicle-entry.jsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './(tabs)/theme';

export default function ManualVehicleEntryScreen() {
  const [formData, setFormData] = useState<{
    make: string;
    model: string;
    year: string;
    plate: string;
  }>({
    make: '',
    model: '',
    year: '',
    plate: '',
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const validateForm = () => {
    const newErrors: Record<string, string | null> = {};
    
    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    if (!formData.plate.trim()) newErrors.plate = 'License plate is required';
    
    // Validate year format
    if (formData.year && (!/^\d{4}$/.test(formData.year) || parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear() + 1)) {
      newErrors.year = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Vehicle Added',
        `Your ${formData.year} ${formData.make} ${formData.model} has been successfully added to your garage.`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/my-garage'),
          },
        ]
      );
    }
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.title}>Enter Vehicle Details</Text>
          <Text style={styles.subtitle}>
            Please provide your vehicle information below
          </Text>

          <TextInput
            label="Make"
            value={formData.make}
            onChangeText={(text) => updateFormData('make', text)}
            placeholder="e.g., Toyota"
            style={styles.input}
            mode="outlined"
            error={!!errors.make}
            autoCapitalize="words"
          />
          {errors.make && <Text style={styles.errorText}>{errors.make}</Text>}
          
          <TextInput
            label="Model"
            value={formData.model}
            onChangeText={(text) => updateFormData('model', text)}
            placeholder="e.g., Camry"
            style={styles.input}
            mode="outlined"
            error={!!errors.model}
            autoCapitalize="words"
          />
          {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
          
          <TextInput
            label="Year"
            value={formData.year}
            onChangeText={(text) => updateFormData('year', text)}
            placeholder="e.g., 2022"
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            maxLength={4}
            error={!!errors.year}
          />
          {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
          
          <TextInput
            label="License Plate"
            value={formData.plate}
            onChangeText={(text) => updateFormData('plate', text.toUpperCase())}
            placeholder="e.g., GT 1234-24"
            style={styles.input}
            mode="outlined"
            autoCapitalize="characters"
            error={!!errors.plate}
          />
          {errors.plate && <Text style={styles.errorText}>{errors.plate}</Text>}

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
          >
            Save Vehicle
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  form: {
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700', // Updated to a compatible value
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginTop: -theme.spacing.sm,
    marginLeft: theme.spacing.md,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
  },
  submitButtonContent: {
    paddingVertical: theme.spacing.sm,
  },
});