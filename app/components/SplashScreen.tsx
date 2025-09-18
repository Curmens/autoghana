import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../(tabs)/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.8));
    const [dotsAnim] = useState([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]);

    useEffect(() => {
        // Start animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        // Animate loading dots
        const animateDots = () => {
            Animated.loop(
                Animated.stagger(200, [
                    Animated.sequence([
                        Animated.timing(dotsAnim[0], {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(dotsAnim[0], {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.sequence([
                        Animated.timing(dotsAnim[1], {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(dotsAnim[1], {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.sequence([
                        Animated.timing(dotsAnim[2], {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(dotsAnim[2], {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]),
                ])
            ).start();
        };

        const dotsTimer = setTimeout(animateDots, 1000);

        // Auto finish after 3.5 seconds
        const finishTimer = setTimeout(onFinish, 3500);

        return () => {
            clearTimeout(dotsTimer);
            clearTimeout(finishTimer);
        };
    }, [fadeAnim, scaleAnim, dotsAnim, onFinish]);

    return (
        <View style={styles.container}>
            {/* Background Gradient Effect */}
            <View style={styles.backgroundOrbs}>
                <View style={[styles.orb, styles.orb1]} />
                <View style={[styles.orb, styles.orb2]} />
                <View style={[styles.orb, styles.orb3]} />
            </View>

            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                {/* Logo */}
                <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <View style={styles.logoMain}>
                        <Icon name="directions-car" size={48} color={theme.colors.white} />
                    </View>
                    <View style={styles.logoBadge}>
                        <View style={styles.pulseDot} />
                    </View>
                </Animated.View>

                <Text style={styles.appName}>AutoGhana</Text>
                <Text style={styles.tagline}>Your trusted automotive companion</Text>

                {/* Features */}
                <View style={styles.featuresList}>
                    <View style={styles.featureItem}>
                        <Icon name="build" size={20} color={theme.colors.white} />
                        <Text style={styles.featureText}>Expert mechanics</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="shopping-cart" size={20} color={theme.colors.white} />
                        <Text style={styles.featureText}>Quality parts</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Icon name="report" size={20} color={theme.colors.white} />
                        <Text style={styles.featureText}>Live traffic reports</Text>
                    </View>
                </View>

                {/* Loading Dots */}
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingDots}>
                        {dotsAnim.map((anim, index) => (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.dot,
                                    {
                                        opacity: anim,
                                        transform: [
                                            {
                                                scale: anim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0.8, 1.2],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            />
                        ))}
                    </View>
                    <Text style={styles.loadingText}>Getting things ready...</Text>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        position: 'relative',
    },
    backgroundOrbs: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    orb: {
        position: 'absolute',
        borderRadius: 200,
        opacity: 0.3,
    },
    orb1: {
        width: 300,
        height: 300,
        backgroundColor: theme.colors.accent,
        top: -100,
        left: -50,
    },
    orb2: {
        width: 200,
        height: 200,
        backgroundColor: theme.colors.secondary,
        bottom: -50,
        right: -30,
    },
    orb3: {
        width: 150,
        height: 150,
        backgroundColor: theme.colors.white,
        top: height * 0.4,
        left: width * 0.7,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        zIndex: 1,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: theme.spacing.xxxl,
    },
    logoMain: {
        width: 120,
        height: 120,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.large,
    },
    logoBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.warning,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulseDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.white,
    },
    appName: {
        fontSize: theme.typography?.sizes.display,
        fontWeight: theme.typography?.weights.bold,
        color: theme.colors.white,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    tagline: {
        fontSize: theme.typography?.sizes.title,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: theme.spacing.xxxl,
    },
    featuresList: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxxl,
        gap: theme.spacing.lg,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: theme.borderRadius.round,
        minWidth: 200,
    },
    featureText: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.white,
        fontWeight: theme.typography?.weights.medium,
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: theme.spacing.xxxl,
    },
    loadingDots: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    loadingText: {
        fontSize: theme.typography?.sizes.body,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
});

export default SplashScreen;