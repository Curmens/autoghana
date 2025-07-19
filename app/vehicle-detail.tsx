// app/vehicle-detail.jsx
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

// Mock data - in a real app, this would be fetched based on vehicleId
const vehicleData: Record<string, {
  id: string;
  name: string;
  plate: string;
  image: string;
  year: number;
  vin: string;
  mileage: string;
  engine: string;
  color: string;
  transmission: string;
  fuelType: string;
  maintenance: Array<{
    id: number;
    date: string;
    service: string;
    status: string;
    mileage?: string;
    cost?: string;
  }>;
  diagnostics: Array<{
    id: number;
    title: string;
    date: string;
    status: string;
    type: string;
  }>;
}> = {
  'GT-1234-24': {
    id: 'GT-1234-24',
    name: 'Toyota Camry',
    plate: 'GT 1234-24',
    image: 'https://via.placeholder.com/400x200',
    year: 2022,
    vin: '1GKS19E64F5214587',
    mileage: '45,780 km',
    engine: '2.5L I4',
    color: 'Silver',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    maintenance: [
      { 
        id: 1,
        date: 'July 15, 2025', 
        service: 'Oil Change & Filter', 
        status: 'Upcoming',
        mileage: '46,000 km'
      },
      { 
        id: 2,
        date: 'May 02, 2025', 
        service: 'Brake Pad Replacement', 
        status: 'Completed',
        mileage: '44,500 km',
        cost: 'GH₵450'
      },
      { 
        id: 3,
        date: 'February 18, 2025', 
        service: 'Tire Rotation', 
        status: 'Completed',
        mileage: '43,200 km',
        cost: 'GH₵120'
      },
    ],
    diagnostics: [
      { 
        id: 1, 
        title: 'Engine Check Report', 
        date: 'June 28, 2025',
        status: 'Normal',
        type: 'OBD-II Scan'
      },
      { 
        id: 2, 
        title: 'Brake System Check', 
        date: 'May 02, 2025',
        status: 'Attention Required',
        type: 'Visual Inspection'
      }
    ],
  },
  'AS-5678-23': {
    id: 'AS-5678-23',
    name: 'Ford Ranger',
    plate: 'AS 5678-23',
    image: 'https://via.placeholder.com/400x200',
    year: 2021,
    vin: '1FTRE2CH2MFA12345',
    mileage: '89,120 km',
    engine: '2.3L EcoBoost',
    color: 'Blue',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    maintenance: [
      { 
        id: 1,
        date: 'August 10, 2025', 
        service: 'Major Service', 
        status: 'Upcoming',
        mileage: '90,000 km'
      }
    ],
    diagnostics: [],
  },
};

export default function VehicleDetailScreen() {
  const { vehicleId } = useLocalSearchParams();
  const vehicle = vehicleData[vehicleId as string];

  if (!vehicle) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="error" size={64} color={theme.colors.error} />
          <Text style={styles.errorTitle}>Vehicle Not Found</Text>
          <Text style={styles.errorText}>
            The vehicle you're looking for could not be found.
          </Text>
          <Button 
            mode="contained" 
            onPress={() => router.push('/(tabs)/my-garage')}
            style={styles.errorButton}
          >
            Back to Garage
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const renderMaintenanceItem = ({ item }: { item: typeof vehicleData['GT-1234-24']['maintenance'][number] }) => (
    <View style={styles.maintenanceItem}>
      <View style={styles.maintenanceHeader}>
        <View style={styles.maintenanceInfo}>
          <Text style={styles.maintenanceService}>{item.service}</Text>
          <Text style={styles.maintenanceDate}>{item.date}</Text>
          {item.mileage && (
            <Text style={styles.maintenanceMileage}>at {item.mileage}</Text>
          )}
        </View>
        <Chip 
          mode="outlined"
          style={[
            styles.statusChip,
            item.status === 'Upcoming' 
              ? styles.upcomingChip 
              : styles.completedChip
          ]}
          textStyle={[
            styles.statusText,
            item.status === 'Upcoming' 
              ? styles.upcomingText 
              : styles.completedText
          ]}
        >
          {item.status}
        </Chip>
      </View>
      {item.cost && (
        <Text style={styles.maintenanceCost}>Cost: {item.cost}</Text>
      )}
    </View>
  );

  const renderDiagnosticItem = ({ item }) => (
    <TouchableOpacity style={styles.diagnosticItem}>
      <View style={styles.diagnosticIcon}>
        <Icon name="description" size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.diagnosticInfo}>
        <Text style={styles.diagnosticTitle}>{item.title}</Text>
        <Text style={styles.diagnosticDate}>{item.date}</Text>
        <Text style={styles.diagnosticType}>{item.type}</Text>
      </View>
      <View style={styles.diagnosticStatus}>
        <Chip 
          mode="outlined"
          style={[
            styles.statusChip,
            item.status === 'Normal' 
              ? styles.normalChip 
              : styles.attentionChip
          ]}
          textStyle={[
            styles.statusText,
            item.status === 'Normal' 
              ? styles.normalText 
              : styles.attentionText
          ]}
        >
          {item.status}
        </Chip>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Vehicle Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            icon="build"
            onPress={() => router.push('/service-booking')}
            style={styles.actionButton}
          >
            Book Service
          </Button>
          <Button
            mode="outlined"
            icon="upload"
            onPress={() => router.push(`/diagnostics-upload?vehicleId=${vehicleId}`)}
            style={[styles.actionButton, styles.outlineButton]}
          >
            Upload Report
          </Button>
        </View>

        {/* Vehicle Information */}
        <Card style={styles.infoCard}>
          <Card.Title title="Vehicle Information" />
          <Card.Content>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Make & Model</Text>
                <Text style={styles.infoValue}>{vehicle.name}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Year</Text>
                <Text style={styles.infoValue}>{vehicle.year}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>License Plate</Text>
                <Text style={styles.infoValue}>{vehicle.plate}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Mileage</Text>
                <Text style={styles.infoValue}>{vehicle.mileage}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Engine</Text>
                <Text style={styles.infoValue}>{vehicle.engine}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Color</Text>
                <Text style={styles.infoValue}>{vehicle.color}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Transmission</Text>
                <Text style={styles.infoValue}>{vehicle.transmission}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Fuel Type</Text>
                <Text style={styles.infoValue}>{vehicle.fuelType}</Text>
              </View>
              <View style={[styles.infoItem, styles.fullWidth]}>
                <Text style={styles.infoLabel}>VIN</Text>
                <Text style={[styles.infoValue, styles.vinText]}>{vehicle.vin}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Maintenance History */}
        <Card style={styles.sectionCard}>
          <Card.Title 
            title="Maintenance History" 
            right={(props) => (
              <TouchableOpacity style={styles.sectionAction}>
                <Text style={styles.sectionActionText}>View All</Text>
              </TouchableOpacity>
            )}
          />
          <Card.Content>
            {vehicle.maintenance.length > 0 ? (
              <FlatList
                data={vehicle.maintenance}
                renderItem={renderMaintenanceItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            ) : (
              <View style={styles.emptyState}>
                <Icon name="build" size={48} color={theme.colors.textSecondary} />
                <Text style={styles.emptyText}>No maintenance records yet</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Diagnostic Reports */}
        <Card style={styles.sectionCard}>
          <Card.Title 
            title="Diagnostic Reports" 
            right={(props) => (
              <TouchableOpacity 
                style={styles.sectionAction}
                onPress={() => router.push(`/diagnostics-upload?vehicleId=${vehicleId}`)}
              >
                <Text style={styles.sectionActionText}>Add New</Text>
              </TouchableOpacity>
            )}
          />
          <Card.Content>
            {vehicle.diagnostics.length > 0 ? (
              <FlatList
                data={vehicle.diagnostics}
                renderItem={renderDiagnosticItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            ) : (
              <View style={styles.emptyState}>
                <Icon name="description" size={48} color={theme.colors.textSecondary} />
                <Text style={styles.emptyText}>No diagnostic reports uploaded</Text>
                <Button 
                  mode="outlined" 
                  onPress={() => router.push(`/diagnostics-upload?vehicleId=${vehicleId}`)}
                  style={styles.emptyButton}
                >
                  Upload First Report
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>
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
  imageContainer: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  outlineButton: {
    backgroundColor: theme.colors.surface,
  },
  infoCard: {
    margin: theme.spacing.md,
    marginTop: 0,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  infoItem: {
    width: '48%',
  },
  fullWidth: {
    width: '100%',
  },
  infoLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  infoValue: {
    fontSize: theme.fontSize.md,
    fontWeight: "500",
    color: theme.colors.text,
  },
  vinText: {
    fontFamily: 'monospace',
    fontSize: theme.fontSize.sm,
  },
  sectionCard: {
    margin: theme.spacing.md,
    marginTop: 0,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  sectionAction: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  sectionActionText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
  },
  maintenanceItem: {
    paddingVertical: theme.spacing.sm,
  },
  maintenanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  maintenanceInfo: {
    flex: 1,
  },
  maintenanceService: {
    fontSize: theme.fontSize.md,
    fontWeight: "500",
    color: theme.colors.text,
  },
  maintenanceDate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  maintenanceMileage: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  maintenanceCost: {
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  diagnosticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  diagnosticIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  diagnosticInfo: {
    flex: 1,
  },
  diagnosticTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: "500",
    color: theme.colors.text,
  },
  diagnosticDate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  diagnosticType: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  diagnosticStatus: {
    marginLeft: theme.spacing.sm,
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    fontSize: theme.fontSize.xs,
    fontWeight: "500",
  },
  upcomingChip: {
    backgroundColor: `${theme.colors.warning}20`,
    borderColor: theme.colors.warning,
  },
  upcomingText: {
    color: theme.colors.warning,
  },
  completedChip: {
    backgroundColor: `${theme.colors.success}20`,
    borderColor: theme.colors.success,
  },
  completedText: {
    color: theme.colors.success,
  },
  normalChip: {
    backgroundColor: `${theme.colors.success}20`,
    borderColor: theme.colors.success,
  },
  normalText: {
    color: theme.colors.success,
  },
  attentionChip: {
    backgroundColor: `${theme.colors.warning}20`,
    borderColor: theme.colors.warning,
  },
  attentionText: {
    color: theme.colors.warning,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: theme.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  errorText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  errorButton: {
    marginTop: theme.spacing.md,
  },
});