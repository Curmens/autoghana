import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../(tabs)/theme';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.kb}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Top bar with Sign up (right) */}
            <View style={styles.topBar}>
              <View style={styles.brandRow}>
                <Icon name="directions-car" size={20} color={theme.colors.textPrimary} />
                <Text style={styles.brandText}>AutoGhana</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/auth/register')} style={styles.topAction}>
                <Text style={styles.topActionText}>Sign up</Text>
              </TouchableOpacity>
            </View>

            {/* Headline */}
            <View style={styles.header}>
              <Text style={styles.h1}>Welcome back</Text>
              <Text style={styles.h2}>Sign in to your account</Text>
            </View>

            {/* Flat form */}
            <View style={styles.form}>
              {/* Email */}
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  mode="flat"
                  value={formData.email}
                  onChangeText={(t) => updateFormData('email', t)}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  selectionColor={theme.colors.primary}
                  style={styles.input}
                  contentStyle={styles.inputContent}   // adds space between icon and text
                  left={<TextInput.Icon icon="email-outline" />}
                  error={!!errors.email}
                  theme={{ colors: { background: 'transparent' } }}
                  dense
                />
                {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}
              </View>

              {/* Password */}
              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  mode="flat"
                  value={formData.password}
                  onChangeText={(t) => updateFormData('password', t)}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  selectionColor={theme.colors.primary}
                  style={styles.input}
                  contentStyle={styles.inputContent}   // adds space between icon and text
                  left={<TextInput.Icon icon="lock-outline" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  error={!!errors.password}
                  theme={{ colors: { background: 'transparent' } }}
                  dense
                />
                {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}
              </View>

              <TouchableOpacity onPress={() => router.push('/auth/forgot-password')} style={styles.forgot}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.cta}
                contentStyle={styles.ctaContent}
                labelStyle={styles.ctaLabel}
              >
                Sign In
              </Button>
            </View>

            {/* Bottom spacer */}
            <View style={styles.bottomSpace} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const INPUT_BG = `${theme.colors.primary}0D`; // ~5% tint of primary for subtle fintech shade

const styles = StyleSheet.create({
  // Page
  container: { flex: 1, backgroundColor: theme.colors.background },
  kb: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: theme.spacing.xl, paddingBottom: theme.spacing.xxxl },

  // Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, letterSpacing: 0.5 },
  topAction: { paddingVertical: 6, paddingHorizontal: 8, borderRadius: 16 },
  topActionText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },

  // Header
  header: { paddingTop: theme.spacing.xl, paddingBottom: theme.spacing.lg },
  h1: {
    fontSize: theme.typography?.sizes.heading,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
  },
  h2: { marginTop: theme.spacing.xs, fontSize: theme.typography?.sizes.bodyLarge, color: theme.colors.textSecondary },

  // Form
  form: { marginTop: theme.spacing.lg, gap: theme.spacing.lg },
  field: { gap: theme.spacing.xs },
  label: {
    fontSize: theme.typography?.sizes.caption,
    color: theme.colors.textSecondary,
    letterSpacing: 0.3,
  },

  // Flat inputs with light bg, no borders, radius, and spacing between icon & text
  input: {
    backgroundColor: INPUT_BG,
    borderRadius: theme.borderRadius.lg,
    height: 60,
    paddingHorizontal: theme.spacing.md,
  },
  inputContent: {
    paddingLeft: 12,
    fontSize: theme.typography?.sizes.bodyLarge,
  },

  // Errors
  error: { fontSize: theme.typography?.sizes.caption, color: theme.colors.error, marginTop: 4 },

  // Forgot
  forgot: { alignSelf: 'flex-end', marginTop: -theme.spacing.xs },
  forgotText: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.body },

  // CTA (pill)
  cta: { borderRadius: 24, backgroundColor: theme.colors.primary, marginTop: theme.spacing.sm },
  ctaContent: { paddingVertical: theme.spacing.md },
  ctaLabel: { color: '#fff', fontSize: theme.typography?.sizes.bodyLarge, fontWeight: theme.typography?.weights.semibold },

  bottomSpace: { height: theme.spacing.xxxl },
});
