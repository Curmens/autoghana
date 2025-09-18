// app/(tabs)/index.tsx - AutoGhana Home Screen with Theme-Inspired Design
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './theme';

const { width } = Dimensions.get('window');

export default function ThemeHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const vehicle = {
    name: 'Toyota Camry',
    plate: 'GT 1234-24',
    serviceDue: 'in 2,500 km',
    serviceProgress: 0.68,
    mileage: '45,780 km',
    lastService: '3 months ago',
    status: 'Good condition',
  };

  const quickActions = [
    {
      id: 'service',
      icon: 'build',
      label: 'Find Service',
      subtitle: 'Book a mechanic',
      color: theme.colors.primary,
      image: 'https://via.placeholder.com/80x80',
    },
    {
      id: 'parts',
      icon: 'shopping-cart',
      label: 'Browse Parts',
      subtitle: 'Auto parts',
      color: theme.colors.secondary,
      image: 'https://via.placeholder.com/80x80',
    },
    {
      id: 'report',
      icon: 'report-problem',
      label: 'Report Issue',
      subtitle: 'Traffic & road hazards',
      color: theme.colors.accent,
      image: 'https://via.placeholder.com/80x80',
    },
    {
      id: 'events',
      icon: 'event',
      label: 'Car Events',
      subtitle: 'Meetups & car shows',
      color: theme.colors.warning,
      image: 'https://via.placeholder.com/80x80',
    },
  ];

  const featuredServices = [
    {
      id: 1,
      name: 'Pro Auto Works',
      location: 'East Legon, Accra',
      distance: '2.1 km away',
      rating: 4.89,
      reviewCount: 127,
      price: '₵₵₵',
      image: 'https://via.placeholder.com/300x200',
      badges: ['Superhost', 'Verified'],
      specialty: 'Engine & Brake Specialist',
      availability: 'Available today',
      responseTime: 'Usually responds within an hour',
      features: ['Free pickup', 'Warranty included', '24/7 support'],
    },
    {
      id: 2,
      name: "Kofi's Premium Garage",
      location: 'Adenta, Greater Accra',
      distance: '3.5 km away',
      rating: 4.76,
      reviewCount: 89,
      price: '₵₵',
      image: 'https://via.placeholder.com/300x200',
      badges: ['Verified'],
      specialty: 'AC & Diagnostics Expert',
      availability: 'Busy until 3 PM',
      responseTime: 'Usually responds within 2 hours',
      features: ['Mobile service', 'Genuine parts', 'Expert technicians'],
    },
  ];

  type ShadowType = keyof typeof theme.shadows;
  const ThemeCard = ({
    children,
    style = {
      borderWidth: 10,
    },
    shadow = 'soft',
  }: {
    children: React.ReactNode;
    style?: object;
    shadow?: ShadowType;
  }) => (
    <View style={[styles.themeCard, style]}>
      {children}
    </View>
  );

  const VehicleStatusBadge = ({ status }: { status: string }) => (
    <View style={styles.statusBadge}>
      <View style={styles.statusDot} />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );

  const ServiceProgressIndicator = ({ progress }: { progress: number }) => (
    <View style={styles.progressSection}>
      <Text style={styles.progressLabel}>Service Progress</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressBar, { width: `${progress * 100}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}% complete</Text>
      </View>
    </View>
  );

  const QuickActionCard = ({ action }: any) => (
    <TouchableOpacity
      style={styles.quickActionContainer}
      onPress={() => router.push(`/reports`)}
      activeOpacity={0.9}
    >
      <ThemeCard style={styles.quickActionCard}>
        <Image source={{ uri: action.image }} style={styles.quickActionImage} />
        <View style={styles.quickActionContent}>
          <Text style={styles.quickActionLabel}>{action.label}</Text>
          <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
        </View>
      </ThemeCard>
    </TouchableOpacity>
  );

  const FeaturedServiceCard = ({ service }: any) => (
    <TouchableOpacity
      style={styles.serviceContainer}
      onPress={() => router.push(`/mechanic-profile?mechanicId=${service.id}`)}
      activeOpacity={0.95}
    >
      <ThemeCard style={styles.serviceCard}>
        <View style={styles.serviceImageContainer}>
          <Image source={{ uri: service.image }} style={styles.serviceImage} />
          <View style={styles.serviceBadges}>
            {service.badges.map((badge: string, index: number) => (
              <View key={index} style={styles.serviceBadge}>
                <Text style={styles.serviceBadgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.serviceContent}>
          <View style={styles.serviceHeader}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceSpecialty}>{service.specialty}</Text>
          </View>

          <View style={styles.serviceLocationRow}>
            <Icon name="place" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.serviceLocation}>{service.location}</Text>
          </View>

          <Text style={styles.serviceDistance}>{service.distance}</Text>

          <View style={styles.serviceRatingRow}>
            <Icon name="star" size={16} color={theme.colors.warning} />
            <Text style={styles.serviceRating}>{service.rating}</Text>
            <Text style={styles.serviceReviews}>({service.reviewCount} reviews)</Text>
            <Text style={styles.servicePrice}> • {service.price}</Text>
          </View>

          <View style={styles.serviceFeatures}>
            {service.features.slice(0, 2).map((feature: string, index: number) => (
              <View key={index} style={styles.featureTag}>
                <Icon name="check-circle" size={12} color={theme.colors.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.serviceFooter}>
            <Text style={styles.serviceAvailability}>{service.availability}</Text>
            <Text style={styles.serviceResponse}>{service.responseTime}</Text>
          </View>
        </View>
      </ThemeCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Theme-style Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.userSection}>
              <Text style={styles.greeting}>Hi, Kofi!</Text>
              <Text style={styles.location}>Accra, Greater Accra • 29°C ☀️</Text>
            </View>

            <View style={styles.headerActions}>
              <IconButton
                icon="notifications-none"
                size={24}
                iconColor={theme.colors.primary}
                style={styles.headerButton}
                onPress={() => console.log('Notifications')}
              />
              <TouchableOpacity style={styles.profileButton}>
                <Icon name="account-circle" size={32} color={theme.colors.textSecondary} onPress={
                  () => router.push('/profile')
                } />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchSection}>
            <Searchbar
              placeholder="Search services, parts, or mechanics..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              inputStyle={styles.searchInput}
              iconColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        {/* Hero Vehicle Section */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => router.push('/vehicle-detail')}
            activeOpacity={0.95}
          >
            <ThemeCard style={styles.vehicleCard} shadow="medium">
              <View style={styles.vehicleHeader}>
                <View style={styles.vehicleMainInfo}>
                  <Text style={styles.vehicleTitle}>Your Vehicle</Text>
                  <Text style={styles.vehicleName}>{vehicle.name}</Text>
                  <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
                  <VehicleStatusBadge status={vehicle.status} />
                </View>

                <View style={styles.vehicleIcon}>
                  <Icon name="directions-car" size={48} color={theme.colors.primary} />
                </View>
              </View>

              <View style={styles.vehicleStats}>
                <View style={styles.vehicleStatItem}>
                  <Text style={styles.vehicleStatValue}>{vehicle.mileage}</Text>
                  <Text style={styles.vehicleStatLabel}>Current Mileage</Text>
                </View>

                <View style={styles.vehicleStatDivider} />

                <View style={styles.vehicleStatItem}>
                  <Text style={styles.vehicleStatValue}>{vehicle.serviceDue}</Text>
                  <Text style={styles.vehicleStatLabel}>Next Service</Text>
                </View>
              </View>

              <ServiceProgressIndicator progress={vehicle.serviceProgress} />
            </ThemeCard>
          </TouchableOpacity>
        </View>

        {/* Quick Actions - Theme Grid Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What can we help you with?</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
          </View>
        </View>

        {/* Featured Services - Theme Listing Style */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured auto services</Text>
            <Text style={styles.sectionSubtitle}>Highly rated by the AutoGhana community</Text>
          </View>

          <View style={styles.featuredServices}>
            {featuredServices.map((service) => (
              <FeaturedServiceCard key={service.id} service={service} />
            ))}
          </View>

          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => router.push('/service-booking')}
          >
            <Text style={styles.showMoreText}>Show all services</Text>
            <Icon name="arrow-forward" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxxl,
  },

  // Header Styles
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightest,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  userSection: {
    flex: 1,
  },
  greeting: {
    fontSize: theme.typography?.sizes.heading,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  location: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography?.weights.regular,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  headerButton: {
    backgroundColor: theme.colors.lightest,
    margin: 0,
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  searchSection: {
    marginTop: theme.spacing.md,
  },
  searchBar: {
    backgroundColor: theme.colors.lightest,
    borderRadius: theme.borderRadius.xxl,
    elevation: 0,
  },
  searchInput: {
    fontSize: theme.typography?.sizes.body,
  },

  // Card Base
  themeCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 10 },
    borderColor: theme.colors.lightest,
  },

  // Section Styles
  section: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xxxl,
  },
  sectionHeader: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography?.sizes.titleLarge,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
    lineHeight: (theme.typography?.lineHeights.normal ?? 1.2) * (theme.typography?.sizes.body ?? 16),
  },

  // Vehicle Card Styles
  vehicleCard: {
    padding: theme.spacing.xl,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  vehicleMainInfo: {
    flex: 1,
  },
  vehicleTitle: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography?.weights.medium,
    marginBottom: theme.spacing.sm,
  },
  vehicleName: {
    fontSize: theme.typography?.sizes.titleLarge,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  vehiclePlate: {
    fontSize: theme.typography?.sizes.bodyLarge,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  vehicleIcon: {
    backgroundColor: theme.colors.lightest,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
  },
  vehicleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  vehicleStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  vehicleStatValue: {
    fontSize: theme.typography?.sizes.title,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  vehicleStatLabel: {
    fontSize: theme.typography?.sizes.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  vehicleStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.lighter,
    marginHorizontal: theme.spacing.xl,
  },

  // Status Badge
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightest,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: theme.spacing.sm,
  },
  statusText: {
    fontSize: theme.typography?.sizes.caption,
    fontWeight: theme.typography?.weights.medium,
    color: theme.colors.textSecondary,
  },

  // Progress Indicator
  progressSection: {
    paddingTop: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightest,
  },
  progressLabel: {
    fontSize: theme.typography?.sizes.body,
    fontWeight: theme.typography?.weights.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.lightest,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.typography?.sizes.caption,
    fontWeight: theme.typography?.weights.medium,
    color: theme.colors.textSecondary,
  },

  // Quick Actions Grid
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  quickActionContainer: {
    width: (width - theme.spacing.xl * 2 - theme.spacing.lg) / 2,
  },
  quickActionCard: {
    overflow: 'hidden',
  },
  quickActionImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
  },
  quickActionContent: {
    padding: theme.spacing.lg,
  },
  quickActionLabel: {
    fontSize: theme.typography?.sizes.bodyLarge,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  quickActionSubtitle: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
  },

  // Featured Services
  featuredServices: {
    gap: theme.spacing.xl,
  },
  serviceContainer: {
    marginBottom: theme.spacing.lg,
  },
  serviceCard: {
    overflow: 'hidden',
  },
  serviceImageContainer: {
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
  },
  serviceBadges: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  serviceBadge: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    ...theme.shadows.subtle,
  },
  serviceBadgeText: {
    fontSize: theme.typography?.sizes.caption,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
  },
  serviceContent: {
    padding: theme.spacing.xl,
  },
  serviceHeader: {
    marginBottom: theme.spacing.md,
  },
  serviceName: {
    fontSize: theme.typography?.sizes.title,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  serviceSpecialty: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
  },
  serviceLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  serviceLocation: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
  },
  serviceDistance: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  serviceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  serviceRating: {
    fontSize: theme.typography?.sizes.body,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
  },
  serviceReviews: {
    fontSize: theme.typography?.sizes.body,
    color: theme.colors.textSecondary,
  },
  servicePrice: {
    fontSize: theme.typography?.sizes.body,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.textPrimary,
  },
  serviceFeatures: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  featureText: {
    fontSize: theme.typography?.sizes.caption,
    color: theme.colors.textSecondary,
  },
  serviceFooter: {
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightest,
  },
  serviceAvailability: {
    fontSize: theme.typography?.sizes.body,
    fontWeight: theme.typography?.weights.medium,
    color: theme.colors.success,
    marginBottom: theme.spacing.xs,
  },
  serviceResponse: {
    fontSize: theme.typography?.sizes.caption,
    color: theme.colors.textSecondary,
  },

  // Show More Button
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.lightest,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    marginTop: theme.spacing.xl,
  },
  showMoreText: {
    fontSize: theme.typography?.sizes.bodyLarge,
    fontWeight: theme.typography?.weights.semibold,
    color: theme.colors.primary,
  },

  bottomSpacing: {
    height: theme.spacing.xxxl,
  },
});