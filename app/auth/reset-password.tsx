import { router } from 'expo-router';
import React, { useState } from 'react';
import {
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

const INPUT_BG = `${theme.colors.primary}0D`;

export default function ResetPasswordScreen() {
    const { completePasswordReset, isLoading } = useAuth();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        if (!password || !confirm) return setError('Please complete all fields');
        if (password.length < 6) return setError('Password must be at least 6 characters');
        if (password !== confirm) return setError('Passwords do not match');

        try {
            await completePasswordReset(password);
            router.replace('/auth/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reset password');
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
                                <Icon name="lock-reset" size={20} color={theme.colors.textPrimary} />
                                <Text style={styles.brandText}>Reset Password</Text>
                            </View>
                            <View style={{ width: 22 }} />
                        </View>

                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.h1}>Set a new password</Text>
                            <Text style={styles.h2}>Choose a strong password you haven’t used before.</Text>
                        </View>

                        {/* Flat form */}
                        <View style={styles.form}>
                            <View style={styles.field}>
                                <Text style={styles.label}>New Password</Text>
                                <TextInput
                                    mode="flat"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter new password"
                                    secureTextEntry={!showPass}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor={theme.colors.primary}
                                    style={styles.input}
                                    contentStyle={styles.inputContent}
                                    left={<TextInput.Icon icon="lock-outline" />}
                                    right={
                                        <TextInput.Icon
                                            icon={showPass ? 'eye-off-outline' : 'eye-outline'}
                                            onPress={() => setShowPass(!showPass)}
                                        />
                                    }
                                    theme={{ colors: { background: 'transparent' } }}
                                    dense
                                />
                            </View>

                            <View style={styles.field}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput
                                    mode="flat"
                                    value={confirm}
                                    onChangeText={setConfirm}
                                    placeholder="Re-enter new password"
                                    secureTextEntry={!showConfirm}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor={theme.colors.primary}
                                    style={styles.input}
                                    contentStyle={styles.inputContent}
                                    left={<TextInput.Icon icon="lock-outline" />}
                                    right={
                                        <TextInput.Icon
                                            icon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                                            onPress={() => setShowConfirm(!showConfirm)}
                                        />
                                    }
                                    theme={{ colors: { background: 'transparent' } }}
                                    dense
                                />
                            </View>

                            {!!error && <Text style={styles.error}>{error}</Text>}

                            <Button
                                mode="contained"
                                onPress={handleSubmit}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.cta}
                                contentStyle={styles.ctaContent}
                                labelStyle={styles.ctaLabel}
                            >
                                Update Password
                            </Button>
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

    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: theme.spacing.lg },
    backBtn: { padding: theme.spacing.sm, marginLeft: -theme.spacing.sm },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    brandText: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary, letterSpacing: 0.4 },

    header: { paddingTop: theme.spacing.xl, paddingBottom: theme.spacing.lg },
    h1: { fontSize: theme.typography?.sizes.heading, fontWeight: theme.typography?.weights.semibold, color: theme.colors.textPrimary },
    h2: { marginTop: theme.spacing.xs, fontSize: theme.typography?.sizes.bodyLarge, color: theme.colors.textSecondary },

    form: { marginTop: theme.spacing.lg, gap: theme.spacing.lg },
    field: { gap: theme.spacing.xs },
    label: { fontSize: theme.typography?.sizes.caption, color: theme.colors.textSecondary },

    input: {
        backgroundColor: INPUT_BG,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
    },
    inputContent: { paddingLeft: 6, fontSize: theme.typography?.sizes.bodyLarge },

    error: { marginTop: theme.spacing.sm, color: theme.colors.error, fontSize: theme.typography?.sizes.caption },

    cta: { borderRadius: 24, backgroundColor: theme.colors.primary, marginTop: theme.spacing.xl },
    ctaContent: { paddingVertical: theme.spacing.md },
    ctaLabel: { color: '#fff', fontSize: theme.typography?.sizes.bodyLarge, fontWeight: theme.typography?.weights.semibold },
});
