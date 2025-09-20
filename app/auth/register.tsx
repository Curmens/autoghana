// app/auth/register.tsx
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

export default function RegisterScreen() {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;
        try {
            await register(formData.email, formData.password, formData.fullName, formData.phoneNumber);
        } catch (error) {
            Alert.alert('Registration Failed', error instanceof Error ? error.message : 'An error occurred');
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
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Top bar */}
                        <View style={styles.topBar}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                                <Icon name="arrow-back" size={22} color={theme.colors.textPrimary} />
                            </TouchableOpacity>

                            <View style={styles.brandRow}>
                                <Icon name="directions-car" size={20} color={theme.colors.textPrimary} />
                                <Text style={styles.brandText}>AutoGhana</Text>
                            </View>

                            <TouchableOpacity onPress={() => router.replace('/auth/login')} style={styles.topAction}>
                                <Text style={styles.topActionText}>Sign in</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.h1}>Create your account</Text>
                            <Text style={styles.h2}>Join and manage your cars & services</Text>
                        </View>

                        {/* Form (flat inputs) */}
                        <View style={styles.form}>
                            {/* Full Name */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    mode="flat"
                                    value={formData.fullName}
                                    onChangeText={(t) => updateFormData('fullName', t)}
                                    placeholder="e.g., Ama K. Mensah"
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor={theme.colors.primary}
                                    style={styles.input}
                                    contentStyle={styles.inputContent}
                                    left={<TextInput.Icon icon="account-outline" />}
                                    error={!!errors.fullName}
                                    theme={{ colors: { background: 'transparent' } }}
                                    dense
                                />
                                {!!errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
                            </View>

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
                                    contentStyle={styles.inputContent}
                                    left={<TextInput.Icon icon="email-outline" />}
                                    error={!!errors.email}
                                    theme={{ colors: { background: 'transparent' } }}
                                    dense
                                />
                                {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            </View>

                            {/* Phone */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput
                                    mode="flat"
                                    value={formData.phoneNumber}
                                    onChangeText={(t) => updateFormData('phoneNumber', t)}
                                    placeholder="+233 XX XXX XXXX"
                                    keyboardType="phone-pad"
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor={theme.colors.primary}
                                    style={styles.input}
                                    contentStyle={styles.inputContent}
                                    left={<TextInput.Icon icon="phone-outline" />}
                                    error={!!errors.phoneNumber}
                                    theme={{ colors: { background: 'transparent' } }}
                                    dense
                                />
                                {!!errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
                            </View>

                            {/* Password */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    mode="flat"
                                    value={formData.password}
                                    onChangeText={(t) => updateFormData('password', t)}
                                    placeholder="Create a password"
                                    secureTextEntry={!showPassword}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor={theme.colors.primary}
                                    style={styles.input}
                                    contentStyle={styles.inputContent}
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

                            {/* Confirm Password */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput
                                    mode="flat"
                                    value={formData.confirmPassword}
                                    onChangeText={(t) => updateFormData('confirmPassword', t)}
                                    placeholder="Re-enter your password"
                                    secureTextEntry={!showConfirmPassword}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor={theme.colors.primary}
                                    style={styles.input}
                                    contentStyle={styles.inputContent}
                                    left={<TextInput.Icon icon="lock-outline" />}
                                    right={
                                        <TextInput.Icon
                                            icon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                    }
                                    error={!!errors.confirmPassword}
                                    theme={{ colors: { background: 'transparent' } }}
                                    dense
                                />
                                {!!errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                            </View>

                            {/* CTA */}
                            <Button
                                mode="contained"
                                onPress={handleRegister}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.cta}
                                contentStyle={styles.ctaContent}
                                labelStyle={styles.ctaLabel}
                            >
                                Create Account
                            </Button>
                        </View>

                        {/* Terms */}
                        <Text style={styles.terms}>
                            By creating an account, you agree to our{' '}
                            <Text style={styles.link} onPress={() => router.push('/legal/terms')}>Terms of Service</Text> and{' '}
                            <Text style={styles.link} onPress={() => router.push('/legal/privacy')}>Privacy Policy</Text>.
                        </Text>

                        {/* Bottom space */}
                        <View style={{ height: theme.spacing.xxxl }} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const INPUT_BG = `${theme.colors.primary}0D`; // ~5% primary tint for subtle fintech shade

const styles = StyleSheet.create({
    // Page
    container: { flex: 1, backgroundColor: theme.colors.background },
    kb: { flex: 1 },
    scroll: { flex: 1 },
    content: { paddingHorizontal: theme.spacing.xl },

    // Top bar
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.lg,
    },
    backBtn: { padding: theme.spacing.sm, marginLeft: -theme.spacing.sm },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    brandText: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, letterSpacing: 0.5 },
    topAction: { paddingVertical: 6, paddingHorizontal: 8, borderRadius: 16 },
    topActionText: { color: theme.colors.primary, fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold },

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
    label: { fontSize: theme.typography?.sizes.caption, color: theme.colors.textSecondary, letterSpacing: 0.3 },

    // Inputs: light bg, no borders, radius, spacing between icon & text
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

    // CTA
    cta: { borderRadius: 24, backgroundColor: theme.colors.primary, marginTop: theme.spacing.sm },
    ctaContent: { paddingVertical: theme.spacing.md },
    ctaLabel: { color: '#fff', fontSize: theme.typography?.sizes.bodyLarge, fontWeight: theme.typography?.weights.semibold },

    // Terms
    terms: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: (theme.typography?.lineHeights.normal ?? 1.4) * (theme.typography?.sizes.body ?? 14),
        paddingHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.xl,
    },
    link: { color: theme.colors.primary, fontWeight: theme.typography?.weights.medium },
});
