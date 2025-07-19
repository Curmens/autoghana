// app/(tabs)/my-garage.tsx
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
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

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  image: string;
}

interface MaintenanceItem {
  id: number;
  date: string;
  service: string;
  status: string;
}

export default function MyGarageScreen() {
  const vehicles: Vehicle[] = [
    {
      id: 'GT-1234-24',
      name: 'Toyota Camry',
      plate: 'GT 1234-24',
      image: 'https://via.placeholder.com/200x120',
    },
    {
      id: 'AS-5678-23',
      name: 'Ford Ranger',
      plate: 'AS 5678-23',
      image: 'https://via.placeholder.com/200x120',
    },
  ];

  const maintenanceTimeline: MaintenanceItem[] = [
    {
      id: 1,
      date: 'July 15, 2025',
      service: 'Oil Change & Filter',
      status: 'Upcoming',
    },
    {
      id: 2,
      date: 'May 02, 2025',
      service: 'Brake Pad Replacement',
      status: 'Completed',
    },
  ];

  const renderVehicleItem: ListRenderItem<Vehicle> = ({ item }) => (
    <TouchableOpacity
      style={styles.vehicleItem}
      onPress={() => router.push(`/vehicle-detail?vehicleId=${item.id}`)}
    >
      <Card style={styles.vehicleCard}>
        <Image source={{ uri: item.image }} style={styles.vehicleImage} />
        <Card.Content style={styles.vehicleContent}>
          <Text style={styles.vehicleName}>{item.name}</Text>
          <Text style={styles.vehiclePlate}>{item.plate}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderMaintenanceItem: ListRenderItem<MaintenanceItem> = ({ item }) => (
    <View style={styles.maintenanceItem}>
      <View
        style={[
          styles.maintenanceIcon,
          {
            backgroundColor: item.status === 'Upcoming'
              ? `${theme.colors.warning}20`
              : `${theme.colors.primary}10`,
          },
        ]}
      >
        <Icon
          name="build"
          size={20}
          color={item.status === 'Upcoming' ? theme.colors.warning : theme.colors.primary}
        />
      </View>
      <View style={styles.maintenanceInfo}>
        <Text style={styles.maintenanceService}>{item.service}</Text>
        <Text style={styles.maintenanceDate}>{item.date}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: item.status === 'Upcoming'
              ? `${theme.colors.warning}20`
              : `${theme.colors.success}20`,
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color: item.status === 'Upcoming'
                ? theme.colors.warning
                : theme.colors.success,
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Garage</Text>
          <Button
            mode="contained"
            compact
            icon="add"
            onPress={() => router.push('/add-vehicle')}
          >
            Add Vehicle
          </Button>
        </View>

        {/* Vehicles List */}
        <View style={styles.section}>
          <FlatList
            data={vehicles}
            renderItem={renderVehicleItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vehiclesList}
          />
        </View>

        {/* Maintenance Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance Timeline</Text>
          <Card style={styles.timelineCard}>
            <Card.Content>
              <FlatList
                data={maintenanceTimeline}
                renderItem={renderMaintenanceItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </Card.Content>
          </Card>
        </View>
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
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  vehiclesList: {
    paddingRight: theme.spacing.md,
  },
  vehicleItem: {
    marginRight: theme.spacing.md,
    width: 180,
  },
  vehicleCard: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  vehicleImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
  },
  vehicleContent: {
    padding: theme.spacing.sm,
  },
  vehicleName: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  vehiclePlate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  timelineCard: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  maintenanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  maintenanceIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  maintenanceInfo: {
    flex: 1,
  },
  maintenanceService: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  maintenanceDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
  },
  statusText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
});