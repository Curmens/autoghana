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
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

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
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const ThemeCard = ({ children, style = {} }) => (
        <View style={[styles.themeCard, theme.shadows.soft, style]}>
            {children}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logo}>
                                <Icon name="directions-car" size={32} color={theme.colors.primary} />
                            </View>

                            <Text style={styles.title}>Welcome back!</Text>
                            <Text style={styles.subtitle}>
                                Sign in to access your garage and services
                            </Text>
                        </View>

                        {/* Form */}
                        <ThemeCard style={styles.formCard}>
                            <View style={styles.formContent}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <TextInput
                                        mode="outlined"
                                        value={formData.email}
                                        onChangeText={(text) => updateFormData('email', text)}
                                        placeholder="Enter your email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        left={<TextInput.Icon icon="email" />}
                                        error={!!errors.email}
                                        style={styles.textInput}
                                    />
                                    {errors.email && (
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    )}
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <TextInput
                                        mode="outlined"
                                        value={formData.password}
                                        onChangeText={(text) => updateFormData('password', text)}
                                        placeholder="Enter your password"
                                        secureTextEntry={!showPassword}
                                        left={<TextInput.Icon icon="lock" />}
                                        right={
                                            <TextInput.Icon
                                                icon={showPassword ? "eye-off" : "eye"}
                                                onPress={() => setShowPassword(!showPassword)}
                                            />
                                        }
                                        error={!!errors.password}
                                        style={styles.textInput}
                                    />
                                    {errors.password && (
                                        <Text style={styles.errorText}>{errors.password}</Text>
                                    )}
                                </View>

                                <TouchableOpacity style={styles.forgotPassword}>
                                    <Text style={styles.forgotPasswordText}>
                                        Forgot your password?
                                    </Text>
                                </TouchableOpacity>

                                <Button
                                    mode="contained"
                                    onPress={handleLogin}
                                    loading={isLoading}
                                    disabled={isLoading}
                                    style={styles.submitButton}
                                    contentStyle={styles.submitButtonContent}
                                    labelStyle={styles.submitButtonLabel}
                                >
                                    Sign In
                                </Button>
                            </View>
                        </ThemeCard>

                        {/* Social Login */}
                        <View style={styles.socialSection}>
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>or continue with</Text>
                                <View style={styles.divider} />
                            </View>

                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon name="g-translate" size={24} color="#EA4335" />
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon name="facebook" size={24} color="#1877F2" />
                                    <Text style={styles.socialButtonText}>Facebook</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Register Link */}
                        <View style={styles.registerLink}>
                            <Text style={styles.registerText}>
                                Don't have an account?{' '}
                                <Text
                                    style={styles.registerLinkText}
                                    onPress={() => router.push('/auth/register')}
                                >
                                    Sign up
                                </Text>
                            </Text>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
    },
    header: {
        alignItems: 'center',
        paddingTop: theme.spacing.xxxl,
        paddingBottom: theme.spacing.xl,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.xl,
        backgroundColor: `${theme.colors.primary}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.bodyLarge,
    },

    // Card
    themeCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        padding: theme.spacing.xl,
    },
    formCard: {
        marginBottom: theme.spacing.xl,
    },
    formContent: {
        gap: theme.spacing.xl,
    },

    // Form inputs
    inputGroup: {
        gap: theme.spacing.md,
    },
    inputLabel: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textPrimary,
    },
    textInput: {
        backgroundColor: theme.colors.background,
    },
    errorText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.error,
        marginTop: -theme.spacing.sm,
        marginLeft: theme.spacing.md,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -theme.spacing.sm,
    },
    forgotPasswordText: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.primary,
        fontWeight: theme.typography?.weights.medium,
    },

    // Submit button
    submitButton: {
        borderRadius: theme.borderRadius.xl,
        marginTop: theme.spacing.md,
    },
    submitButtonContent: {
        paddingVertical: theme.spacing.md,
    },
    submitButtonLabel: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.semibold,
    },

    // Social login
    socialSection: {
        marginBottom: theme.spacing.xl,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.lighter,
    },
    dividerText: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        marginHorizontal: theme.spacing.lg,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: theme.spacing.lg,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        borderRadius: theme.borderRadius.xl,
        ...theme.shadows.soft,
    },
    socialButtonText: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textPrimary,
    },

    // Register link
    registerLink: {
        alignItems: 'center',
        paddingBottom: theme.spacing.xxxl,
    },
    registerText: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    registerLinkText: {
        color: theme.colors.primary,
        fontWeight: theme.typography?.weights.semibold,
    },
});