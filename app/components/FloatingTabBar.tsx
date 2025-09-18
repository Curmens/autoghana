import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../(tabs)/theme';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width - (theme.spacing.xl * 2);
const TAB_WIDTH = TAB_BAR_WIDTH / 5;

interface TabItem {
    name: string;
    icon: string;
    label: string;
    href?: string;
}

const tabs: TabItem[] = [
    { name: 'index', icon: 'home', label: 'Home', href: '/' },
    { name: 'my-garage', icon: 'directions-car', label: 'Garage' },
    { name: 'marketplace', icon: 'store', label: 'Shop' },
    { name: 'reports', icon: 'traffic', label: 'Traffic' },
    { name: 'profile', icon: 'person', label: 'Profile' },
];

interface FloatingTabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
    const insets = useSafeAreaInsets();
    // const [isVisible, setIsVisible] = useState(true);

    // Animation references
    const slideAnim = useRef(new Animated.Value(0)).current;
    const tabIndicatorAnim = useRef(new Animated.Value(0)).current;
    const scaleAnims = useRef(tabs.map(() => new Animated.Value(1))).current;
    const bounceAnims = useRef(tabs.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        // Slide up animation on mount
        Animated.spring(slideAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();

        // Tab indicator animation
        Animated.spring(tabIndicatorAnim, {
            toValue: state.index * TAB_WIDTH,
            useNativeDriver: false,
            tension: 80,
            friction: 10,
        }).start();

        // Scale and bounce animations for active tab
        tabs.forEach((_, index) => {
            const isActive = index === state.index;

            if (isActive) {
                // Bounce effect for active tab
                Animated.sequence([
                    Animated.timing(bounceAnims[index], {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.spring(bounceAnims[index], {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 100,
                        friction: 6,
                    }),
                ]).start();
            }

            Animated.spring(scaleAnims[index], {
                toValue: isActive ? 1.15 : 1,
                useNativeDriver: true,
                tension: 100,
                friction: 8,
            }).start();
        });
    }, [state.index, slideAnim, tabIndicatorAnim, scaleAnims, bounceAnims]);

    const handleTabPress = (index: number, routeName: string) => {
        // Enhanced haptic feedback
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        // Pulse animation on press
        Animated.sequence([
            Animated.timing(scaleAnims[index], {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnims[index], {
                toValue: state.index === index ? 1.15 : 1,
                useNativeDriver: true,
                tension: 200,
                friction: 8,
            }),
        ]).start();

        navigation.navigate(routeName);
    };

    return (
        <Animated.View
            style={[
                styles.floatingContainer,
                {
                    paddingBottom: insets.bottom + theme.spacing.md,
                    transform: [
                        {
                            translateY: slideAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [100, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            {/* Floating Tab Bar Container */}
            <View style={styles.floatingTabBar}>
                {/* Glassmorphism Background */}
                {Platform.OS === 'ios' ? (
                    <BlurView intensity={100} tint="extraLight" style={styles.blurBackground}>
                        <View style={styles.frostedGlass} />
                    </BlurView>
                ) : (
                    <View style={styles.androidFloatingBg} />
                )}

                {/* Animated Floating Indicator */}
                <Animated.View
                    style={[
                        styles.floatingIndicator,
                        {
                            transform: [{ translateX: tabIndicatorAnim }],
                        },
                    ]}
                >
                    <View style={styles.indicatorGlow} />
                    <View style={styles.indicatorCore} />
                </Animated.View>

                {/* Tab Items */}
                <View style={styles.floatingTabsContainer}>
                    {tabs.map((tab, index) => {
                        const isActive = state.index === index;
                        const route = state.routes[index];

                        return (
                            <TouchableOpacity
                                key={tab.name}
                                style={styles.floatingTabButton}
                                onPress={() => handleTabPress(index, route.name)}
                                activeOpacity={0.7}
                            >
                                <Animated.View
                                    style={[
                                        styles.floatingTabContent,
                                        {
                                            transform: [
                                                { scale: scaleAnims[index] },
                                                {
                                                    translateY: bounceAnims[index].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, -8],
                                                    }),
                                                },
                                            ],
                                        },
                                    ]}
                                >
                                    {/* Enhanced Icon Container */}
                                    <View style={[
                                        styles.floatingIconContainer,
                                        isActive && styles.activeFloatingIcon,
                                    ]}>
                                        <Icon
                                            name={tab.icon}
                                            size={22}
                                            color={isActive ? theme.colors.white : theme.colors.textSecondary}
                                        />

                                        {/* Active State Effects */}
                                        {isActive && (
                                            <>
                                                <View style={styles.activeRing} />
                                                <View style={styles.activePulse} />
                                            </>
                                        )}
                                    </View>

                                    {/* Dynamic Label */}
                                    <Animated.Text
                                        style={[
                                            styles.floatingTabLabel,
                                            {
                                                color: isActive ? theme.colors.primary : theme.colors.textSecondary,
                                                fontWeight: isActive ? theme.typography?.weights.bold : theme.typography?.weights.medium,
                                                opacity: isActive ? 1 : 0.8,
                                            },
                                        ]}
                                    >
                                        {tab.label}
                                    </Animated.Text>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    // Modern Tab Bar Styles
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        overflow: 'hidden',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
    },
    androidBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        ...theme.shadows.large,
    },
    tabIndicator: {
        position: 'absolute',
        top: theme.spacing.lg,
        width: TAB_WIDTH - theme.spacing.lg,
        height: 50,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.xl,
        marginHorizontal: theme.spacing.sm,
        ...theme.shadows.medium,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.sm,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.md,
    },
    tabContent: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.xs,
    },
    activeIconContainer: {
        backgroundColor: 'transparent',
    },
    tabIcon: {
        textAlign: 'center',
    },
    activeDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.warning,
        borderWidth: 1.5,
        borderColor: theme.colors.white,
    },
    tabLabel: {
        fontSize: theme.typography?.sizes.caption,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
    bottomSpace: {
        height: theme.spacing.sm,
    },

    // Floating Tab Bar Styles
    floatingContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    floatingTabBar: {
        width: TAB_BAR_WIDTH,
        height: 70,
        borderRadius: theme.borderRadius.xxl,
        position: 'relative',
        overflow: 'hidden',
        ...theme.shadows.large,
    },
    blurBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: theme.borderRadius.xxl,
    },
    frostedGlass: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: theme.borderRadius.xxl,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    androidFloatingBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: theme.borderRadius.xxl,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        ...theme.shadows.large,
    },
    floatingIndicator: {
        position: 'absolute',
        top: theme.spacing.md,
        width: TAB_WIDTH - theme.spacing.md,
        height: 42,
        borderRadius: theme.borderRadius.xl,
        marginLeft: theme.spacing.sm,
    },
    indicatorGlow: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.xl,
        opacity: 0.2,
        transform: [{ scale: 1.2 }],
    },
    indicatorCore: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.xl,
        ...theme.shadows.medium,
    },
    floatingTabsContainer: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.sm,
    },
    floatingTabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    floatingTabContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingIconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.xs,
    },
    activeFloatingIcon: {
        backgroundColor: 'transparent',
    },
    activeRing: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: theme.colors.primary + '30',
    },
    activePulse: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.primary + '10',
    },
    floatingTabLabel: {
        fontSize: theme.typography?.sizes.caption,
        textAlign: 'center',
    },
});


export default FloatingTabBar;
