// app/(whatever)/maintenance.tsx (replaces NotFound with a maintenance screen)
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { theme } from '@/app/(tabs)/theme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MaintenanceScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Maintenance' }} />
      <ThemedView style={styles.container}>
        <View style={[styles.card, styles.shadow]}>
          <View style={styles.iconWrap}>
            <Icon name="build" size={28} color={theme.colors.primary} />
          </View>

          <ThemedText type="title" style={styles.title}>
            Screen Under Maintenance
          </ThemedText>

          <ThemedText type="default" style={styles.subtitle}>
            We’re upgrading this feature for a better experience. Check back soon.
          </ThemedText>

          <Link href="/" style={[styles.ctaBtn, styles.shadow]} asChild>
            <ThemedText type="link" style={styles.ctaText}>
              Back to Home
            </ThemedText>
          </Link>

          <Link href="/support" style={styles.secondaryLink}>
            <ThemedText type="default" style={styles.secondaryText}>
              Need help? Contact support
            </ThemedText>
          </Link>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },

  // Card
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.lighter,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
  },
  shadow: {
    ...theme.shadows.small,
  },

  // Icon badge
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${theme.colors.primary}15`,
    borderWidth: 1,
    borderColor: `${theme.colors.primary}40`,
    marginBottom: theme.spacing.lg,
  },

  // Text
  title: {
    textAlign: 'center',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },

  // Primary CTA (pill)
  ctaBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  ctaText: {
    color: '#fff', // ensure white text
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
    width: '100%',
    lineHeight: 48,
  },

  // Secondary link
  secondaryLink: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  secondaryText: {
    color: theme.colors.textSecondary,
  },
});
