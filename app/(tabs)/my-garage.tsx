// app/(tabs)/my-garage.tsx
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  image: string;
  vin: string;
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
      id: 'GW 50-22',
      name: 'Audi A5',
      plate: 'GW 50-22',
      vin: 'WAUZZZ8T3JA123456',
      image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1740',
    },
    {
      id: 'AS-5678-23',
      name: 'Ford Ranger',
      plate: 'DV 5678-23',
      vin: '1FTFW1E50JFC12345',
      image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=1548',
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
    <TouchableOpacity onPress={() => router.push(`/vehicle-detail?vehicleId=${item.id}`)}>
      <Card style={styles.vehicleCard}>
        <Image source={{ uri: item.image }} style={styles.vehicleImage} />
        <View style={styles.vehicleOverlay} />
        <View style={styles.vehicleCardContent}>
          <Text style={styles.vehicleName}>{item.name}</Text>
          <Text style={styles.vehiclePlate}>{item.plate}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderMaintenanceItem: ListRenderItem<MaintenanceItem> = ({ item, index }) => (
    <View style={styles.timelineRow}>
      {/* Dot + line */}
      <View style={styles.timelineIndicator}>
        <View
          style={[
            styles.timelineDot,
            {
              backgroundColor:
                item.status === 'Upcoming' ? theme.colors.warning : theme.colors.success,
            },
          ]}
        />
        {index !== maintenanceTimeline.length - 1 && <View style={styles.timelineLine} />}
      </View>

      {/* Info */}
      <View style={styles.timelineContent}>
        <Text style={styles.maintenanceService}>{item.service}</Text>
        <Text style={styles.maintenanceDate}>{item.date}</Text>
        <Text
          style={[
            styles.statusText,
            {
              color:
                item.status === 'Upcoming' ? theme.colors.warning : theme.colors.success,
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
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Hello 👋</Text>
            <Text style={styles.headerTitle}>Your Garage</Text>
          </View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=3' }}
            style={styles.avatar}
          />
        </View>

        {/* Vehicles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Vehicles</Text>
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
          <View style={styles.timelineContainer}>
            <FlatList
              data={maintenanceTimeline}
              renderItem={renderMaintenanceItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <FAB
        icon="plus"
        label="Add Vehicle"
        style={styles.fab}
        onPress={() => router.push('/add-vehicle')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    paddingHorizontal: theme.spacing.lg,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  headerGreeting: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    marginBottom: theme.spacing.xxl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  vehiclesList: {
    paddingRight: theme.spacing.md,
  },
  vehicleCard: {
    width: 220,
    height: 140,
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    ...theme.shadows.medium,
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  vehicleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  vehicleCardContent: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  vehicleName: {
    color: '#fff',
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
  vehiclePlate: {
    color: '#eee',
    fontSize: theme.fontSize.xs,
  },
  timelineContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  timelineIndicator: {
    alignItems: 'center',
    width: 30,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: theme.colors.border,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: theme.spacing.md,
  },
  maintenanceService: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  maintenanceDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  statusText: {
    marginTop: 4,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
});
