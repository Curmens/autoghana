import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../(tabs)/theme';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5;

const tabs = [
    { name: 'index', icon: 'home-outline', label: 'Home' },
    { name: 'my-garage', icon: 'car-outline', label: 'Garage' },
    { name: 'marketplace', icon: 'storefront-outline', label: 'Shop' },
    { name: 'reports', icon: 'traffic-light', label: 'Traffic' },
    { name: 'profile', icon: 'account-outline', label: 'Profile' },
];

type ModernTabBarProps = {
    state: {
        index: number;
        routes: { key: string; name: string }[];
    };
    descriptors: Record<string, any>;
    navigation: {
        navigate: (routeName: string) => void;
    };
};

export function ModernTabBar({ state, descriptors, navigation }: ModernTabBarProps) {
    const insets = useSafeAreaInsets();
    const dotAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(dotAnim, {
            toValue: state.index * TAB_WIDTH + TAB_WIDTH / 2 - 4,
            useNativeDriver: false,
        }).start();
    }, [state.index, dotAnim]);

    const handleTabPress = (routeName: string) => {
        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        navigation.navigate(routeName);
    };

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            {Platform.OS === 'ios' ? (
                <BlurView intensity={80} tint="extraLight" style={styles.blurContainer} />
            ) : (
                <View style={styles.androidBackground} />
            )}

            {/* Active Indicator Dot */}
            <Animated.View style={[styles.dotIndicator, { left: dotAnim }]} />

            <View style={styles.tabsContainer}>
                {tabs.map((tab, index) => {
                    const isActive = state.index === index;
                    const route = state.routes[index];

                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tabButton}
                            onPress={() => handleTabPress(route.name)}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons
                                name={tab.icon}
                                size={24}
                                color={isActive ? theme.colors.primary : theme.colors.textSecondary}
                            />
                            <Text
                                style={[
                                    styles.tabLabel,
                                    {
                                        color: isActive ? theme.colors.primary : theme.colors.textSecondary,
                                        fontWeight: isActive ? theme.typography?.weights.semibold : theme.typography?.weights.medium,
                                    },
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    androidBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 6,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 2,
    },
    dotIndicator: {
        position: 'absolute',
        bottom: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        zIndex: 1,
    },
});

export default ModernTabBar;