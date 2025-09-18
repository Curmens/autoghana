// app/service-booking.jsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Card, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

const services = [
  {
    id: 1,
    name: 'Oil Change',
    icon: 'opacity',
    description: 'Full synthetic oil change with filter replacement',
    duration: '30 mins',
    price: 'GH₵120'
  },
  {
    id: 2,
    name: 'Brake Repair',
    icon: 'album',
    description: 'Brake pad replacement and system inspection',
    duration: '2 hours',
    price: 'GH₵350'
  },
  {
    id: 3,
    name: 'Tire Rotation',
    icon: 'settings',
    description: 'Complete tire rotation and pressure check',
    duration: '45 mins',
    price: 'GH₵80'
  },
  {
    id: 4,
    name: 'AC Service',
    icon: 'ac-unit',
    description: 'Air conditioning system service and recharge',
    duration: '1 hour',
    price: 'GH₵200'
  },
  {
    id: 5,
    name: 'Engine Diagnostics',
    icon: 'search',
    description: 'Comprehensive engine diagnostic scan',
    duration: '45 mins',
    price: 'GH₵150'
  },
  {
    id: 6,
    name: 'Battery Service',
    icon: 'battery-full',
    description: 'Battery testing and replacement if needed',
    duration: '30 mins',
    price: 'GH₵250'
  },
];

const mechanics = [
  {
    id: 'pro-auto',
    name: 'Pro Auto Works',
    rating: 4.9,
    reviewCount: 87,
    distance: '2.1km',
    image: 'https://via.placeholder.com/64x64',
    specialties: ['Engine Repair', 'Brake Service', 'Oil Change'],
    priceRange: 'GH₵80 - GH₵500',
    nextAvailable: 'Today',
    isOpen: true,
  },
  {
    id: 'kofi-garage',
    name: "Kofi's Garage",
    rating: 4.7,
    reviewCount: 156,
    distance: '3.5km',
    image: 'https://via.placeholder.com/64x64',
    specialties: ['AC Service', 'Diagnostics', 'Tire Service'],
    priceRange: 'GH₵60 - GH₵400',
    nextAvailable: 'Tomorrow',
    isOpen: false,
  },
  {
    id: 'east-legon-auto',
    name: 'East Legon Auto Center',
    rating: 4.8,
    reviewCount: 203,
    distance: '5.2km',
    image: 'https://via.placeholder.com/64x64',
    specialties: ['Engine Diagnostics', 'Battery Service', 'General Repair'],
    priceRange: 'GH₵100 - GH₵600',
    nextAvailable: 'Today',
    isOpen: true,
  },
];

const availableTimes = [
  '09:00 AM', '10:30 AM', '12:00 PM',
  '01:30 PM', '03:00 PM', '04:30 PM'
];

export default function ServiceBookingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedMechanic, setSelectedMechanic] = useState<typeof mechanics[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const totalSteps = 4;
  const progress = currentStep / totalSteps;

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleMechanicSelect = (mechanic: any) => {
    setSelectedMechanic(mechanic);
    setCurrentStep(3);
  };

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(4);
    } else {
      Alert.alert('Incomplete', 'Please select both date and time.');
    }
  };

  const handleFinalConfirm = () => {
    Alert.alert(
      'Booking Confirmed!',
      `Your ${selectedService?.name ?? 'selected service'} appointment with ${selectedMechanic?.name ?? 'selected mechanic'} is scheduled for ${selectedDate} at ${selectedTime}.`,
      [
        {
          text: 'Done',
          onPress: () => router.push('/(tabs)'),
        },
      ]
    );
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Select a Service';
      case 2: return 'Choose a Mechanic';
      case 3: return 'Select Date & Time';
      case 4: return 'Confirm Booking';
      default: return 'Book Service';
    }
  };

  const renderServiceStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        What service does your vehicle need?
      </Text>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => handleServiceSelect(item)}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.serviceContent}>
                <View style={styles.serviceIcon}>
                  <Icon name={item.icon} size={28} color={theme.colors.primary} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.serviceDescription}>{item.description}</Text>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.serviceDuration}>{item.duration}</Text>
                    <Text style={styles.servicePrice}>{item.price}</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderMechanicStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        Choose a mechanic for your {selectedService?.name}
      </Text>
      <FlatList
        data={mechanics}
        renderItem={({ item }) => (
          <Card style={styles.mechanicCard}>
            <TouchableOpacity
              style={styles.mechanicContent}
              onPress={() => router.push(`/mechanic-profile?mechanicId=${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.mechanicImage} />
              <View style={styles.mechanicInfo}>
                <View style={styles.mechanicHeader}>
                  <Text style={styles.mechanicName}>{item.name}</Text>
                  <View style={[styles.statusDot, item.isOpen ? styles.openDot : styles.closedDot]} />
                </View>
                <View style={styles.mechanicStats}>
                  <View style={styles.mechanicStat}>
                    <Icon name="star" size={16} color="#F59E0B" />
                    <Text style={styles.mechanicRating}>{item.rating}</Text>
                    <Text style={styles.mechanicReviews}>({item.reviewCount})</Text>
                  </View>
                  <View style={styles.mechanicStat}>
                    <Icon name="place" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.mechanicDistance}>{item.distance}</Text>
                  </View>
                </View>
                <Text style={styles.mechanicPrice}>{item.priceRange}</Text>
                <Text style={styles.mechanicAvailable}>
                  Next available: {item.nextAvailable}
                </Text>
                <View style={styles.specialtiesContainer}>
                  {item.specialties.slice(0, 2).map((specialty, index) => (
                    <View key={index} style={styles.specialtyChip}>
                      <Text style={styles.specialtyText}>{specialty}</Text>
                    </View>
                  ))}
                  {item.specialties.length > 2 && (
                    <Text style={styles.moreSpecialties}>+{item.specialties.length - 2} more</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.mechanicActions}>
              <Button
                mode="outlined"
                onPress={() => router.push(`/mechanic-profile?mechanicId=${item.id}`)}
                style={styles.viewButton}
              >
                View Profile
              </Button>
              <Button
                mode="contained"
                onPress={() => handleMechanicSelect(item)}
                style={styles.selectButton}
              >
                Select
              </Button>
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderDateTimeStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        When would you like to schedule your appointment?
      </Text>

      <Card style={styles.calendarCard}>
        <Calendar
          style={styles.calendar}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: theme.colors.primary,
            },
          }}
          minDate={new Date().toISOString().split('T')[0]}
          theme={{
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: 'white',
            todayTextColor: theme.colors.primary,
            arrowColor: theme.colors.primary,
            monthTextColor: theme.colors.text,
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
          }}
        />
      </Card>

      {selectedDate && (
        <View style={styles.timeSection}>
          <Text style={styles.timeTitle}>Available Times</Text>
          <View style={styles.timeGrid}>
            {availableTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Button
        mode="contained"
        style={styles.confirmButton}
        onPress={handleDateTimeConfirm}
        disabled={!selectedDate || !selectedTime}
      >
        Continue
      </Button>
    </View>
  );

  const renderConfirmationStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        Please review your booking details
      </Text>

      <Card style={styles.summaryCard}>
        <Card.Title title="Booking Summary" />
        <Card.Content>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Service:</Text>
            <Text style={styles.summaryValue}>{selectedService?.name}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Mechanic:</Text>
            <Text style={styles.summaryValue}>{selectedMechanic?.name}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>{selectedDate}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Time:</Text>
            <Text style={styles.summaryValue}>{selectedTime}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>{selectedService?.duration}</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Estimated Cost:</Text>
            <Text style={styles.totalValue}>{selectedService?.price}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.noteCard}>
        <Card.Content>
          <View style={styles.noteContent}>
            <Icon name="info" size={20} color={theme.colors.primary} />
            <Text style={styles.noteText}>
              You will receive a confirmation SMS with the mechanic&apos;s contact details.
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.confirmButton}
        onPress={handleFinalConfirm}
      >
        Confirm Booking
      </Button>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderServiceStep();
      case 2: return renderMechanicStep();
      case 3: return renderDateTimeStep();
      case 4: return renderConfirmationStep();
      default: return renderServiceStep();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{getStepTitle()}</Text>
          <Text style={styles.stepIndicator}>Step {currentStep} of {totalSteps}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={styles.progressBar}
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  stepIndicator: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  stepContent: {
    paddingVertical: theme.spacing.lg,
  },
  stepDescription: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  serviceCard: {
    marginBottom: theme.spacing.md,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  serviceDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceDuration: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  servicePrice: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
  },
  mechanicCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  mechanicContent: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  mechanicImage: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.md,
  },
  mechanicInfo: {
    flex: 1,
  },
  mechanicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  mechanicName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  openDot: {
    backgroundColor: theme.colors.success,
  },
  closedDot: {
    backgroundColor: theme.colors.error,
  },
  mechanicStats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  mechanicStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  mechanicRating: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  mechanicReviews: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  mechanicDistance: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  mechanicPrice: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  mechanicAvailable: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    alignItems: 'center',
  },
  specialtyChip: {
    backgroundColor: `${theme.colors.primary}10`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  specialtyText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  moreSpecialties: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  mechanicActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.md,
  },
  viewButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  selectButton: {
    flex: 1,
  },
  calendarCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  calendar: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  timeSection: {
    marginBottom: theme.spacing.lg,
  },
  timeTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  timeSlot: {
    width: '31%',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },
  selectedTimeSlot: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  timeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  selectedTimeText: {
    color: 'white',
  },
  confirmButton: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md,
  },
  totalLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  noteCard: {
    backgroundColor: `${theme.colors.primary}10`,
    marginBottom: theme.spacing.lg,
  },
  noteContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  noteText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 20,
  },
});