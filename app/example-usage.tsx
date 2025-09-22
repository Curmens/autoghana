// app/example-usage.tsx - Example of using standard components
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
    Badge,
    EmptyState,
    HeaderAction,
    StandardButton,
    StandardCard,
    StandardContent,
    StandardFAB,
    StandardForm,
    StandardHeader,
    StandardInput,
    StandardPage,
    StandardSection,
} from '../components/StandardComponents';

export default function ExampleUsageScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <StandardPage>
            {/* Standard Header with actions */}
            <StandardHeader
                title="Example Screen"
                subtitle="Demonstrating standard components"
                rightAction={
                    <HeaderAction
                        icon="notifications"
                        onPress={() => console.log('Notifications')}
                        accessibilityLabel="Notifications"
                    />
                }
                leftAction={
                    <HeaderAction
                        icon="menu"
                        onPress={() => console.log('Menu')}
                        accessibilityLabel="Menu"
                    />
                }
            />

            {/* Scrollable content with standard padding */}
            <StandardContent>
                {/* Standard Section with form */}
                <StandardSection
                    title="Login Form Example"
                    subtitle="Using standard input components"
                >
                    <StandardCard>
                        <View style={{ padding: 20 }}>
                            <StandardForm>
                                <StandardInput
                                    label="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="you@example.com"
                                    keyboardType="email-address"
                                    leftIcon="email-outline"
                                />

                                <StandardInput
                                    label="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter your password"
                                    secureTextEntry={!showPassword}
                                    leftIcon="lock-outline"
                                    rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    onRightIconPress={() => setShowPassword(!showPassword)}
                                />

                                <StandardButton
                                    title="Sign In"
                                    onPress={() => console.log('Login')}
                                />

                                <StandardButton
                                    title="Cancel"
                                    onPress={() => router.back()}
                                    variant="ghost"
                                />
                            </StandardForm>
                        </View>
                    </StandardCard>
                </StandardSection>

                {/* Standard Section with badges */}
                <StandardSection
                    title="Status Examples"
                    subtitle="Using standard badge components"
                >
                    <StandardCard>
                        <View style={{ padding: 20, gap: 16 }}>
                            <Badge text="Good condition" />
                            <Badge text="Service due" color="#f59e0b" />
                            <Badge text="Needs attention" color="#ef4444" />
                            <Badge text="Info only" showDot={false} />
                        </View>
                    </StandardCard>
                </StandardSection>

                {/* Empty State Example */}
                <StandardSection
                    title="Empty State Example"
                >
                    <EmptyState
                        icon="info"
                        title="No data available"
                        subtitle="There's nothing to show here yet. Try adding some content."
                        actionTitle="Add Content"
                        onAction={() => console.log('Add content')}
                    />
                </StandardSection>
            </StandardContent>

            {/* Standard FAB */}
            <StandardFAB
                label="Add Item"
                onPress={() => console.log('Add item')}
                icon="add"
            />
        </StandardPage>
    );
}