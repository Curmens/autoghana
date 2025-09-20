import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TextInput as RNTextInput,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../(tabs)/theme';
import { useAuth } from '../contexts/AuthContext';

const BOXES = 6;

export default function VerifyOtpScreen() {
    const { passwordReset, verifyOtp, isLoading, resendOtp } = useAuth();
    const [digits, setDigits] = useState(Array(BOXES).fill(''));
    const [error, setError] = useState('');
    const [seconds, setSeconds] = useState(60);

    const refs = useRef<RNTextInput[]>([]);

    useEffect(() => {
        const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(t);
    }, []);

    const value = digits.join('');

    const handleChange = (index: number, char: string) => {
        setError('');
        const onlyNum = char.replace(/\D/g, '');
        if (!onlyNum) return;

        setDigits(prev => {
            const next = [...prev];
            next[index] = onlyNum.slice(-1);
            return next;
        });

        if (index < BOXES - 1) refs.current[index + 1]?.focus();
        else Keyboard.dismiss();
    };

    const handleKeyPress = (index: number, e: any) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (digits[index]) {
                setDigits(prev => {
                    const next = [...prev];
                    next[index] = '';
                    return next;
                });
            } else if (index > 0) {
                refs.current[index - 1]?.focus();
                setDigits(prev => {
                    const next = [...prev];
                    next[index - 1] = '';
                    return next;
                });
            }
        }
    };

    const handleVerify = async () => {
        if (value.length !== BOXES) return setError('Enter the 6-digit code');
        try {
            await verifyOtp(value);
            router.push('/auth/reset-password');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid code');
        }
    };

    const handleResend = async () => {
        if (seconds > 0) return;
        try {
            await resendOtp(passwordReset?.email);
            setSeconds(60);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to resend code');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.kb}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                        {/* Top bar */}
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                                <Icon name="arrow-back" size={22} color={theme.colors.textPrimary} />
                            </TouchableOpacity>
                            <View style={styles.brandRow}>
                                <Icon name="shield" size={20} color={theme.colors.textPrimary} />
                                <Text style={styles.brandText}>Verify Code</Text>
                            </View>
                            <View style={{ width: 22 }} />
                        </View>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.h1}>Enter verification code</Text>
                            <Text style={styles.h2}>
                                We sent a 6-digit code to{' '}
                                <Text style={styles.emph}>{passwordReset?.email ?? 'your email'}</Text>
                            </Text>
                        </View>

                        {/* OTP boxes */}
                        <View style={styles.otpRow}>
                            {Array.from({ length: BOXES }).map((_, i) => (
                                <RNTextInput
                                    key={i}
                                    ref={el => (refs.current[i] = el as RNTextInput)}
                                    style={styles.otpBox}
                                    value={digits[i]}
                                    onChangeText={t => handleChange(i, t)}
                                    onKeyPress={e => handleKeyPress(i, e)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    returnKeyType="done"
                                    textAlign="center"
                                />
                            ))}
                        </View>
                        {!!error && <Text style={styles.error}>{error}</Text>}

                        {/* Actions */}
                        <Button
                            mode="contained"
                            onPress={handleVerify}
                            loading={isLoading}
                            disabled={isLoading}
                            style={styles.cta}
                            contentStyle={styles.ctaContent}
                            labelStyle={styles.ctaLabel}
                        >
                            Verify
                        </Button>

                        <View style={styles.resendRow}>
                            <Text style={styles.resendText}>
                                Didn’t get it?
                            </Text>
                            <TouchableOpacity onPress={handleResend} disabled={seconds > 0}>
                                <Text style={[styles.resendLink, seconds > 0 && styles.resendLinkDisabled]}>
                                    {seconds > 0 ? `Resend in ${seconds}s` : 'Resend code'}
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

const BOX_BG = `${theme.colors.primary}0D`;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    kb: { flex: 1 },
    scroll: { flex: 1 },
    content: { paddingHorizontal: theme.spacing.xl },

    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: theme.spacing.lg },
    backBtn: { padding: theme.spacing.sm, marginLeft: -theme.spacing.sm },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    brandText: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, letterSpacing: 0.4 },

    header: { paddingTop: theme.spacing.xl, paddingBottom: theme.spacing.lg },
    h1: { fontSize: theme.typography?.sizes.heading, fontWeight: theme.typography?.weights.semibold, color: theme.colors.textPrimary },
    h2: { marginTop: theme.spacing.xs, fontSize: theme.typography?.sizes.bodyLarge, color: theme.colors.textSecondary },
    emph: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.medium },

    otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: theme.spacing.md, marginTop: theme.spacing.xl },
    otpBox: {
        flex: 1,
        height: 56,
        backgroundColor: BOX_BG,
        borderRadius: theme.borderRadius.lg,
        fontSize: theme.typography?.sizes.title,
        color: theme.colors.textPrimary,
    },

    error: { marginTop: theme.spacing.md, color: theme.colors.error, fontSize: theme.typography?.sizes.caption },

    cta: { borderRadius: 24, backgroundColor: theme.colors.primary, marginTop: theme.spacing.xl },
    ctaContent: { paddingVertical: theme.spacing.md },
    ctaLabel: { color: '#fff', fontSize: theme.typography?.sizes.bodyLarge, fontWeight: theme.typography?.weights.semibold },

    resendRow: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: theme.spacing.lg },
    resendText: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.body },
    resendLink: { color: theme.colors.primary, fontWeight: theme.typography?.weights.medium },
    resendLinkDisabled: { color: theme.colors.textSecondary },
});
