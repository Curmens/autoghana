import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

const emailRegex = /\S+@\S+\.\S+/;
const INPUT_BG = `${theme.colors.primary}0D`;

export default function ForgotPasswordScreen() {
    const { startPasswordReset, passwordReset, isLoading, cancelPasswordReset } = useAuth();
    const [email, setEmail] = useState(passwordReset?.email ?? '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (passwordReset?.email) setEmail(passwordReset.email);
    }, [passwordReset?.email]);

    const updateEmail = (value: string) => {
        setEmail(value);
        if (error) setError('');
    };

    const handleSubmit = async () => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) return setError('Email is required');
        if (!emailRegex.test(trimmedEmail)) return setError('Please enter a valid email address');

        try {
            const { otp } = await startPasswordReset(trimmedEmail);
            Alert.alert(
                'Verification Code Sent',
                `We’ve sent a 6-digit code to ${trimmedEmail}.\n\n(For this demo, code: ${otp})`
            );
            router.push('/auth/verify-otp');
        } catch (err) {
            Alert.alert('Request Failed', err instanceof Error ? err.message : 'Unable to process request.');
        }
    };

    const handleBackToLogin = async () => {
        try { await cancelPasswordReset(); } catch { }
        router.replace('/auth/login');
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
                        {/* Top bar */}
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={handleBackToLogin} style={styles.backBtn}>
                                <Icon name="arrow-back" size={22} color={theme.colors.textPrimary} />
                            </TouchableOpacity>
                            <View style={styles.brandRow}>
                                <Icon name="lock-outline" size={20} color={theme.colors.textPrimary} />
                                <Text style={styles.brandText}>Password Reset</Text>
                            </View>
                            <View style={{ width: 22 }} />
                        </View>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.h1}>Forgot password?</Text>
                            <Text style={styles.h2}>
                                Enter the email linked to your account and we’ll send a one-time code to reset it.
                            </Text>
                        </View>

                        {/* Flat form */}
                        <View style={styles.form}>
                            <View style={styles.field}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    mode="flat"
                                    value={email}
                                    onChangeText={updateEmail}
                                    placeholder="name@example.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor={theme.colors.primary}
                                    style={styles.input}
                                    contentStyle={styles.inputContent}
                                    left={<TextInput.Icon icon="email-outline" />}
                                    error={!!error}
                                    theme={{ colors: { background: 'transparent' } }}
                                    dense
                                />
                                {!!error && <Text style={styles.error}>{error}</Text>}
                            </View>

                            <Button
                                mode="contained"
                                onPress={handleSubmit}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.cta}
                                contentStyle={styles.ctaContent}
                                labelStyle={styles.ctaLabel}
                            >
                                Send Code
                            </Button>

                            <TouchableOpacity onPress={handleBackToLogin} style={styles.secondaryAction}>
                                <Text style={styles.secondaryActionText}>
                                    Remember it? <Text style={styles.linkText}>Back to sign in</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: theme.spacing.xxxl }} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    brandText: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, letterSpacing: 0.4 },

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
    label: { fontSize: theme.typography?.sizes.caption, color: theme.colors.textSecondary },

    input: {
        backgroundColor: `${theme.colors.primary}0D`,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
    },
    inputContent: { paddingLeft: 6, fontSize: theme.typography?.sizes.bodyLarge },

    error: { fontSize: theme.typography?.sizes.caption, color: theme.colors.error, marginTop: 4 },

    cta: { borderRadius: 24, backgroundColor: theme.colors.primary },
    ctaContent: { paddingVertical: theme.spacing.md },
    ctaLabel: { color: '#fff', fontSize: theme.typography?.sizes.bodyLarge, fontWeight: theme.typography?.weights.semibold },

    secondaryAction: { alignItems: 'center', marginTop: theme.spacing.lg },
    secondaryActionText: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.body },
    linkText: { color: theme.colors.primary, fontWeight: theme.typography?.weights.medium },
});
