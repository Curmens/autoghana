// app/(tabs)/my-garage.tsx
import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { Button, Card, Chip, IconButton } from 'react-native-paper';


import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFABPosition } from '../../hooks/useFabPosition';
import { theme } from './theme';

type ListRenderItem<T> = ({ item, index }: { item: T; index: number }) => React.ReactElement | null;


const INPUT_BG = `${theme.colors.primary}0D`;

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
  const fabPosition = useFABPosition();

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

  // Bottom sheet
  const addSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []); // half-screen
  const openAddSheet = () => addSheetRef.current?.present();
  const closeAddSheet = () => addSheetRef.current?.dismiss();

  const [quick, setQuick] = useState({ make: '', model: '', year: '', plate: '' });
  const [showModal, setShowModal] = useState(false);

  const onQuickSave = () => {
    console.log('Quick save:', quick);
    closeAddSheet();
  };

  const renderFeaturedVehicle = (vehicle: Vehicle) => (
    <Card style={[styles.featuredVehicleCard, { elevation: 0 }]}>
      <View style={styles.featuredVehicleImageWrapper}>
        <Image source={{ uri: vehicle.image }} style={styles.featuredVehicleImage} resizeMode="cover" />
        <View style={styles.vehicleOverlay} />

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
              <Ionicons name={vehicle.fuelType === 'Electric' ? 'flash-outline' : 'car-outline'} size={18} color="#fff" />
              <Text style={styles.statText}>{vehicle.fuelType}</Text>
            </View>
          </View>

          {/* Inline actions — changed Add to open bottom sheet */}
          <View style={styles.inlineActions}>
            <TouchableOpacity style={styles.inlineActionButton} onPress={() => router.push('/vehicle-detail')}>
              <Ionicons name="build-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.inlineActionText}>Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inlineActionButton} onPress={() => {
              console.log('Opening bottom sheet');
              openAddSheet();
            }}>
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


  const renderMaintenanceItem = ({ item, index }: { item: MaintenanceItem; index: number }) => {
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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Theme-style Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.userSection}>
              <Text style={styles.greeting}>My Garage</Text>
              <Text style={styles.location}>Manage and View your cars</Text>
            </View>

            <View style={styles.headerActions}>
              <IconButton
                icon="bell-outline"
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

      </View>
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
                currentMaintenance.slice(0, 4).map((item, index) => (
                  <View key={item.id}>
                    {renderMaintenanceItem({ item, index })}
                  </View>
                ))
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

      <BottomSheetModal
        ref={addSheetRef}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
            opacity={0.35}
          />
        )}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Add a vehicle</Text>
            <TouchableOpacity onPress={closeAddSheet}>
              <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Quick actions */}
          <View style={styles.sheetRow}>
            <TouchableOpacity
              style={styles.sheetOption}
              onPress={() => { closeAddSheet(); router.push('/vin-scanner'); }}
            >
              <Ionicons name="qr-code-outline" size={22} color={theme.colors.primary} />
              <Text style={styles.sheetOptionText}>Scan VIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sheetOption}
              onPress={() => { closeAddSheet(); router.push('/manual-vehicle-entry'); }}
            >
              <Ionicons name="create-outline" size={22} color={theme.colors.primary} />
              <Text style={styles.sheetOptionText}>Enter manually</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sheetDivider} />

          {/* Quick add form */}
          <Text style={styles.sheetSub}>Quick add</Text>
          <View style={styles.quickForm}>
            <BottomSheetTextInput
              placeholder="Make"
              value={quick.make}
              onChangeText={(t) => setQuick({ ...quick, make: t })}
              style={[styles.bsInput, styles.bsInputSpacing]}
            />
            <BottomSheetTextInput
              placeholder="Model"
              value={quick.model}
              onChangeText={(t) => setQuick({ ...quick, model: t })}
              style={[styles.bsInput, styles.bsInputSpacing]}
            />

            <View style={styles.quickRow}>
              <BottomSheetTextInput
                placeholder="Year"
                value={quick.year}
                onChangeText={(t) => setQuick({ ...quick, year: t })}
                keyboardType="number-pad"
                style={[styles.bsInput, styles.quickHalf]}
              />
              <BottomSheetTextInput
                placeholder="Plate"
                value={quick.plate}
                onChangeText={(t) => setQuick({ ...quick, plate: t.toUpperCase() })}
                autoCapitalize="characters"
                style={[styles.bsInput, styles.quickHalf]}
              />
            </View>

            <View style={styles.bottomSheetActions}>
              <Button mode="outlined" onPress={closeAddSheet} style={styles.cancelButton}>
                Cancel
              </Button>
              <Button mode="contained" onPress={onQuickSave} style={styles.saveButton}>
                Quick Save
              </Button>
            </View>

            <TouchableOpacity
              style={styles.fullFormButton}
              onPress={() => { closeAddSheet(); router.push('/add-vehicle'); }}
            >
              <Text style={styles.fullFormText}>Or add complete vehicle details</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      {/* Floating Action Button */}
      <View style={[styles.fabContainer, fabPosition]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => openAddSheet()}
          style={styles.fabButton}
        >
          <Icon name="add" size={18} color="#fff" />
          <Text style={styles.fabLabel}>Add vehicle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    // Softer shadow
    ...theme.shadows.small,
  },
  featuredVehicleCardContent: {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden', // Move overflow to inner View
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
    alignItems: 'center',
    zIndex: 1000,
  },

  fabLabel: {
    color: '#fff',
    fontSize: theme.fontSize?.sm,
    fontWeight: theme.fontWeight?.semibold
  },


  fabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 28,
    paddingHorizontal: 16,
    height: 56,
    ...theme.shadows.small,
  },

  // Bottom sheet styles
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  sheetTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  sheetRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  sheetOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  sheetOptionText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
  },
  sheetSub: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  quickForm: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  inputContent: {
    paddingHorizontal: theme.spacing.md,
  },
  cta: {
    marginTop: theme.spacing.md,
  },

  bottomSheetTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bottomSheetSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  quickInput: {
    marginBottom: theme.spacing.md,
  },
  quickRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  quickHalf: {
    flex: 1,
  },
  bottomSheetActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
  fullFormButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  fullFormText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  closeButton: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    padding: theme.spacing.sm,
  },
  modalContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  modalSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },

  sheetBackground: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetHandle: {
    backgroundColor: theme.colors.border,
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },

  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },

  // Flat, airy inputs inside the sheet
  bsInput: {
    backgroundColor: `${theme.colors.primary}0D`, // light tint
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  bsInputSpacing: {
    marginBottom: theme.spacing.md,
  },

});