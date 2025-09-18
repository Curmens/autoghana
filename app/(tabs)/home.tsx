// src/screens/HomeScreen.js
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './theme';

import type { NavigationProp } from '@react-navigation/native';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const vehicle = {
    name: 'Toyota Camry',
    plate: 'GT 1234-24',
    serviceDue: 'in 2,500 km',
    mileage: '45,780 km',
  };

  const quickActions = [
    {
      icon: 'search',
      label: 'Find Service',
      action: () => navigation.navigate('ServiceBooking'),
    },
    {
      icon: 'build',
      label: 'Browse Parts',
      action: () => navigation.navigate('MainTabs', { screen: 'Marketplace' }),
    },
  ];

  const nearbyServices = [
    {
      name: 'Pro Auto Works',
      location: 'East Legon, 2.1km away',
      image: 'https://via.placeholder.com/48x48',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Vehicle Card */}
        <Card style={styles.vehicleCard}>
          <Card.Content>
            <View style={styles.vehicleHeader}>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
            </View>
            <View style={styles.vehicleStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{vehicle.serviceDue}</Text>
                <Text style={styles.statLabel}>Next Service</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{vehicle.mileage}</Text>
                <Text style={styles.statLabel}>Mileage</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={action.action}
            >
              <Icon
                name={action.icon}
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
          {nearbyServices.map((service, index) => (
            <Card key={index} style={styles.serviceCard}>
              <Card.Content style={styles.serviceContent}>
                <Image
                  source={{ uri: service.image }}
                  style={styles.serviceImage}
                />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.locationRow}>
                    <Icon
                      name="place"
                      size={16}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={styles.serviceLocation}>{service.location}</Text>
                  </View>
                </View>
                <Button
                  //   mode="outlined" 
                  compact
                  onPress={() => router.push('/add-vehicle')}
                >
                  View
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  notificationButton: {
    padding: theme.spacing.sm,
  },
  vehicleCard: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  vehicleName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  vehiclePlate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  vehicleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: theme.colors.border,
  },
  quickActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  actionCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    ...theme.shadows.small,
  },
  actionLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  serviceCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  serviceImage: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  serviceLocation: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
});

export default HomeScreen;