// app/(tabs)/my-garage.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  image: string;
  vin: string;
  mileage: number;
  nextService: string;
  fuelType: string;
  year: number;
}

interface MaintenanceItem {
  id: number;
  vehicleId: string;
  date: string;
  service: string;
  status: 'Upcoming' | 'Completed';
  cost?: string;
  mileage?: string;
}

export default function MyGarageScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const vehicles: Vehicle[] = [
    {
      id: 'GW-50-22',
      name: 'Audi A5',
      plate: 'GW 50-22',
      vin: 'WAUZZZ8T3JA123456',
      image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1740',
      mileage: 45620,
      nextService: 'July 15, 2025',
      fuelType: 'Petrol',
      year: 2021,
    },
    {
      id: 'DV-5678-23',
      name: 'Ford Ranger',
      plate: 'DV 5678-23',
      vin: '1FTFW1E50JFC12345',
      image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=1548',
      mileage: 28450,
      nextService: 'August 02, 2025',
      fuelType: 'Diesel',
      year: 2022,
    },
    {
      id: 'GT-1234-24',
      name: 'Tesla Model 3',
      plate: 'GT 1234-24',
      vin: '5YJ3E1EA4LF123456',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1740',
      mileage: 12800,
      nextService: 'September 10, 2025',
      fuelType: 'Electric',
      year: 2023,
    },
  ];

  const maintenanceTimeline: MaintenanceItem[] = [
    // Audi A5 maintenance
    {
      id: 1,
      vehicleId: 'GW-50-22',
      date: 'July 15, 2025',
      service: 'Oil Change & Filter',
      status: 'Upcoming',
      cost: '$85',
      mileage: '46,000 km',
    },
    {
      id: 2,
      vehicleId: 'GW-50-22',
      date: 'May 02, 2025',
      service: 'Brake Pad Replacement',
      status: 'Completed',
      cost: '$320',
      mileage: '44,500 km',
    },
    {
      id: 3,
      vehicleId: 'GW-50-22',
      date: 'March 18, 2025',
      service: 'Annual Service Check',
      status: 'Completed',
      cost: '$150',
      mileage: '42,800 km',
    },
    // Ford Ranger maintenance
    {
      id: 4,
      vehicleId: 'DV-5678-23',
      date: 'August 02, 2025',
      service: 'Tire Rotation & Alignment',
      status: 'Upcoming',
      cost: '$120',
      mileage: '29,000 km',
    },
    {
      id: 5,
      vehicleId: 'DV-5678-23',
      date: 'June 10, 2025',
      service: 'Oil Change & Filter',
      status: 'Completed',
      cost: '$95',
      mileage: '27,800 km',
    },
    // Tesla Model 3 maintenance
    {
      id: 6,
      vehicleId: 'GT-1234-24',
      date: 'September 10, 2025',
      service: 'Software Update & Check',
      status: 'Upcoming',
      cost: '$0',
      mileage: '13,500 km',
    },
    {
      id: 7,
      vehicleId: 'GT-1234-24',
      date: 'April 15, 2025',
      service: 'Cabin Air Filter',
      status: 'Completed',
      cost: '$45',
      mileage: '11,200 km',
    },
  ];

  const getMaintenanceForVehicle = (vehicleId: string) => {
    return maintenanceTimeline
      .filter(item => item.vehicleId === vehicleId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const renderFeaturedVehicle = (vehicle: Vehicle) => (
    <Card style={[styles.featuredVehicleCard, { elevation: 0 }]}>
      <View style={styles.featuredVehicleImageWrapper}>
        <Image
          source={{ uri: vehicle.image }}
          style={styles.featuredVehicleImage}
          resizeMode="cover"
        />
        <View style={styles.vehicleOverlay} />

        {/* Vehicle Info Overlay */}
        <View style={styles.vehicleInfo}>
          <View style={styles.vehicleHeader}>
            <View>
              <Text style={styles.featuredVehicleName}>{vehicle.name}</Text>
              <Text style={styles.featuredVehiclePlate}>{vehicle.plate}</Text>
            </View>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => router.push(`/vehicle-detail?vehicleId=${vehicle.id}`)}
            >
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Ionicons name="speedometer-outline" size={18} color="#fff" />
              <Text style={styles.statText}>{vehicle.mileage.toLocaleString()} km</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="calendar-outline" size={18} color="#fff" />
              <Text style={styles.statText}>{vehicle.year}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons
                name={vehicle.fuelType === 'Electric' ? 'flash-outline' : 'car-outline'}
                size={18}
                color="#fff"
              />
              <Text style={styles.statText}>{vehicle.fuelType}</Text>
            </View>
          </View>

          {/* Quick Actions (INSIDE card) */}
          <View style={styles.inlineActions}>
            <TouchableOpacity style={styles.inlineActionButton}>
              <Ionicons name="build-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.inlineActionText}>Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inlineActionButton}>
              <Ionicons name="add-circle-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.inlineActionText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inlineActionButton}>
              <Ionicons name="stats-chart-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.inlineActionText}>Stats</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );


  const renderMaintenanceItem: ListRenderItem<MaintenanceItem> = ({ item, index }) => {
    const vehicleMaintenance = getMaintenanceForVehicle(vehicles[currentPage]?.id || '');
    const isLast = index === vehicleMaintenance.length - 1;

    return (
      <View style={styles.timelineRow}>
        {/* Timeline Indicator */}
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
          {!isLast && <View style={styles.timelineLine} />}
        </View>

        {/* Maintenance Info */}
        <View style={styles.timelineContent}>
          <View style={styles.maintenanceHeader}>
            <Text style={styles.maintenanceService}>{item.service}</Text>
            <Chip
              mode="outlined"
              style={[
                styles.statusChip,
                item.status === 'Upcoming' ? styles.upcomingChip : styles.completedChip,
              ]}
              textStyle={[
                styles.chipText,
                item.status === 'Upcoming' ? styles.upcomingText : styles.completedText,
              ]}
            >
              {item.status}
            </Chip>
          </View>

          <Text style={styles.maintenanceDate}>{item.date}</Text>

          <View style={styles.maintenanceDetails}>
            {item.mileage && (
              <Text style={styles.maintenanceDetailText}>📏 {item.mileage}</Text>
            )}
            {item.cost && (
              <Text style={styles.maintenanceDetailText}>💰 {item.cost}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderPageIndicator = () => (
    <View style={styles.pageIndicator}>
      {vehicles.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentPage ? theme.colors.primary : theme.colors.border }
          ]}
          onPress={() => pagerRef.current?.setPage(index)}
        />
      ))}
      <Text style={styles.pageCounter}>
        {currentPage + 1} of {vehicles.length}
      </Text>
    </View>
  );

  const currentVehicle = vehicles[currentPage];
  const currentMaintenance = getMaintenanceForVehicle(currentVehicle?.id || '');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Featured Vehicle Pager */}
        <View style={styles.pagerContainer}>
          <PagerView
            ref={pagerRef}
            style={styles.pager}
            initialPage={0}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          >
            {vehicles.map((vehicle, index) => (
              <View key={vehicle.id} style={styles.page}>
                {renderFeaturedVehicle(vehicle)}
              </View>
            ))}
          </PagerView>

          {/* Page Indicator */}
          {vehicles.length > 1 && renderPageIndicator()}
        </View>

        {/* Next Service Alert */}
        {currentVehicle && (
          <Card style={styles.nextServiceCard}>
            <View style={styles.nextServiceContent}>
              <Ionicons name="time-outline" size={24} color={theme.colors.warning} />
              <View style={styles.nextServiceInfo}>
                <Text style={styles.nextServiceTitle}>Next Service Due</Text>
                <Text style={styles.nextServiceDate}>{currentVehicle.nextService}</Text>
              </View>
              <TouchableOpacity style={styles.scheduleButton}>
                <Text style={styles.scheduleButtonText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}

        {/* Maintenance Timeline */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Maintenance History - {currentVehicle?.name}
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.timelineCard}>
            <View style={styles.timelineContainer}>
              {currentMaintenance.length > 0 ? (
                <FlatList
                  data={currentMaintenance.slice(0, 4)} // Show only first 4 items
                  renderItem={renderMaintenanceItem}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="construct-outline" size={48} color={theme.colors.border} />
                  <Text style={styles.emptyStateTitle}>No maintenance records</Text>
                  <Text style={styles.emptyStateText}>
                    Add your first maintenance record for {currentVehicle?.name}
                  </Text>
                  <TouchableOpacity style={styles.addRecordButton}>
                    <Text style={styles.addRecordButtonText}>Add Record</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      {/* <View style={styles.fabContainer}>
        <FAB
          mode="elevated"
          icon="plus"
          label="Add vehicle"
          onPress={() => router.push('/add-vehicle')}
          style={styles.fabModern}
          rippleColor="rgb(247, 0, 0)"
        />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.lg,
  },
  headerGreeting: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  featuredVehicleImageWrapper: {
    height: 220,
    position: 'relative',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },

  inlineActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },

  inlineActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },

  inlineActionText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
    marginLeft: 6,
  },


  featuredVehicleCard: {
    height: 220,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    // Softer shadow
    ...theme.shadows.small,
  },
  vehicleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',  // lighter overlay
  },
  vehicleInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
  },
  featuredVehicleName: {
    color: '#fff',
    fontSize: theme.fontSize.md,  // slightly smaller
    fontWeight: theme.fontWeight.semibold,
  },
  featuredVehiclePlate: {
    color: '#ddd',
    fontSize: theme.fontSize.xs,
    marginTop: 2,
  },

  // Quick Actions: only two main actions to simplify
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    // gentler shadow
    ...theme.shadows.small,
  },
  actionButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },

  // Next Service Card: simplify layout
  nextServiceCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  nextServiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextServiceTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  nextServiceDate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  scheduleButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    marginLeft: 'auto',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },

  // Timeline: reduce dot size, remove long vertical lines maybe
  timelineRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  timelineIndicator: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: theme.colors.border,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: theme.spacing.sm,
  },
  maintenanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  maintenanceService: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  maintenanceDate: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  // Chip: simpler outlines
  statusChip: {
    height: 30,
    borderWidth: .5,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  upcomingChip: {
    backgroundColor: theme.colors.warning + '10',
    borderColor: theme.colors.warning,
  },
  completedChip: {
    backgroundColor: theme.colors.success + '10',
    borderColor: theme.colors.success,
  },
  chipText: {
    fontSize: 13,
    fontWeight: theme.fontWeight.normal,
  },
  upcomingText: {
    color: theme.colors.warning,
  },
  completedText: {
    color: theme.colors.success,
  },

  // Pager Styles
  pagerContainer: {
    height: 260,
    marginBottom: theme.spacing.lg,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },

  // Featured Vehicle Styles
  featuredVehicleContainer: {
    flex: 1,
  },
  featuredVehicleImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  detailsButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 2,
  },
  statText: {
    color: '#fff',
    fontSize: theme.fontSize.xs,
    marginLeft: 4,
    fontWeight: theme.fontWeight.medium,
  },
  actionButtonContent: {
    alignItems: 'center',
  },

  // Page Indicator
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  pageCounter: {
    marginLeft: theme.spacing.md,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },

  // Next Service Card
  nextServiceInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },

  // Section Styles
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  viewAllText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },

  // Timeline Styles
  timelineCard: {
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    elevation: 2,
  },
  timelineContainer: {
    padding: theme.spacing.lg,
  },
  maintenanceDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  maintenanceDetailText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.md,
    marginTop: 2,
  },

  // Status Chip Styles

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyStateTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  emptyStateText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  addRecordButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: theme.spacing.md,
  },
  addRecordButtonText: {
    color: '#fff',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },

  // FAB
  fabContainer: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg + 50, // sits above tab bar; tweak if needed
    alignItems: 'center',
  },
  fabModern: {
    backgroundColor: theme.colors.primary,
    borderRadius: 28,                 // pill
    ...theme.shadows.small,           // soft shadow from your theme
    paddingHorizontal: 6,             // space for the pill
  },
  fabContent: {
    height: 56,                       // comfy touch target
  },

  // white text
  fabLabel: {
    color: '#fff',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    marginLeft: 8,
  },

});