// app/service-booking.jsx — Modern, seamless booking flow
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

// --- Mock data (unchanged)
const services = [
  { id: 1, name: 'Oil Change', icon: 'opacity', description: 'Full synthetic oil change with filter', duration: '30 mins', price: 'GH₵120' },
  { id: 2, name: 'Brake Repair', icon: 'album', description: 'Brake pad replacement & inspection', duration: '2 hours', price: 'GH₵350' },
  { id: 3, name: 'Tire Rotation', icon: 'settings', description: 'Rotation + pressure check', duration: '45 mins', price: 'GH₵80' },
  { id: 4, name: 'AC Service', icon: 'ac-unit', description: 'AC system service & recharge', duration: '1 hour', price: 'GH₵200' },
  { id: 5, name: 'Engine Diagnostics', icon: 'search', description: 'Comprehensive diagnostic scan', duration: '45 mins', price: 'GH₵150' },
  { id: 6, name: 'Battery Service', icon: 'battery-full', description: 'Battery testing & replacement', duration: '30 mins', price: 'GH₵250' },
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

const baseTimes = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];

// --- Helpers
const daysAhead = (n = 14) => {
  const out: { key: string; label: string; sub: string; isToday: boolean }[] = [];
  const formatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' });
  const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' });
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const key = d.toISOString().split('T')[0];
    out.push({
      key,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : weekday.format(d),
      sub: formatter.format(d),
      isToday: i === 0,
    });
  }
  return out;
};

export default function ServiceBookingScreen() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = step / totalSteps;

  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => services.filter(s => s.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const [selectedService, setSelectedService] = useState(null as (typeof services)[number] | null);
  const [selectedMechanic, setSelectedMechanic] = useState(null as (typeof mechanics)[number] | null);
  const [selectedDate, setSelectedDate] = useState(daysAhead()[0]?.key || '');
  const [selectedTime, setSelectedTime] = useState('');

  const dateStrip = useMemo(() => daysAhead(14), []);
  const timesForDay = baseTimes; // you can tailor availability by mechanic/day here

  const goNext = () => setStep(Math.min(totalSteps, step + 1));
  const goBack = () => (step > 1 ? setStep(step - 1) : router.back());

  const confirmDateTime = () => {
    if (!selectedDate || !selectedTime) return;
    goNext();
  };

  const handleFinalConfirm = () => {
    Alert.alert(
      'Booking Confirmed!',
      `Your ${selectedService?.name ?? 'service'} with ${selectedMechanic?.name ?? 'mechanic'} is scheduled for ${selectedDate} at ${selectedTime}.`,
      [{ text: 'Done', onPress: () => router.push('/(tabs)') }]
    );
  };

  const StepTitle = () => {
    const titles = ['Select a Service', 'Choose a Mechanic', 'Select Date & Time', 'Confirm Booking'];
    return <Text style={styles.headerTitle}>{titles[step - 1]}</Text>;
  };

  // --- Step 1: Services (search + grid)
  const StepServices = () => (
    <View style={styles.stepWrap}>
      <Text style={styles.stepHint}>What does your vehicle need?</Text>

      <View style={styles.searchWrap}>
        <Icon name="search" size={18} color={theme.colors.textSecondary} />
        <RNTextInput
          placeholder="Search services (e.g., oil, brake, AC)"
          placeholderTextColor={theme.colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        {query ? (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Icon name="close" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.grid}>
        {(filtered.length ? filtered : services).map(item => {
          const active = selectedService?.id === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={[styles.serviceCard, active && styles.serviceCardActive]}
              onPress={() => {
                setSelectedService(item);
                setStep(2);
              }}
            >
              <View style={[styles.serviceIcon, active && styles.serviceIconActive]}>
                <Icon name={item.icon} size={22} color={active ? '#fff' : theme.colors.primary} />
              </View>
              <Text style={[styles.serviceName, active && styles.serviceNameActive]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.serviceTiny} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceMeta}>{item.duration}</Text>
                <Text style={[styles.serviceMeta, styles.servicePrice]}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // --- Step 2: Mechanics (cards list)
  const StepMechanics = () => (
    <View style={styles.stepWrap}>
      <Text style={styles.stepHint}>
        Choose a mechanic for your <Text style={styles.em}>{selectedService?.name}</Text>
      </Text>
      <FlatList
        data={mechanics}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: theme.spacing.md }}
        renderItem={({ item }) => {
          const active = selectedMechanic?.id === item.id;
          return (
            <Card style={[styles.mechanicCard, active && styles.mechanicCardActive]}>
              <TouchableOpacity
                style={styles.mechanicContent}
                onPress={() => router.push(`/mechanic-profile?mechanicId=${item.id}`)}
                activeOpacity={0.9}
              >
                <Image source={{ uri: item.image }} style={styles.mechanicImage} />
                <View style={{ flex: 1 }}>
                  <View style={styles.mechanicTopRow}>
                    <Text style={styles.mechanicName}>{item.name}</Text>
                    <View style={[styles.statusChip, item.isOpen ? styles.openChip : styles.closedChip]}>
                      <View style={[styles.dot, item.isOpen ? styles.dotOpen : styles.dotClosed]} />
                      <Text style={[styles.statusText, item.isOpen ? styles.openText : styles.closedText]}>
                        {item.isOpen ? 'Open' : 'Closed'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mechanicMetaRow}>
                    <View style={styles.inline}>
                      <Icon name="star" size={16} color={theme.colors.warning} />
                      <Text style={styles.metaText}>{item.rating}</Text>
                      <Text style={styles.metaSub}>({item.reviewCount})</Text>
                    </View>
                    <Text style={styles.sep}>•</Text>
                    <View style={styles.inline}>
                      <Icon name="place" size={16} color={theme.colors.textSecondary} />
                      <Text style={styles.metaSub}>{item.distance}</Text>
                    </View>
                  </View>

                  <Text style={styles.priceRange}>{item.priceRange}</Text>
                  <Text style={styles.available}>Next available: {item.nextAvailable}</Text>

                  <View style={styles.specialties}>
                    {item.specialties.slice(0, 2).map((s, i) => (
                      <View style={styles.chip} key={i}>
                        <Text style={styles.chipText}>{s}</Text>
                      </View>
                    ))}
                    {item.specialties.length > 2 && (
                      <Text style={styles.more}>{`+${item.specialties.length - 2} more`}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.mechanicActions}>
                <Button mode="outlined" onPress={() => router.push(`/mechanic-profile?mechanicId=${item.id}`)} style={styles.viewBtn}>
                  Profile
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    setSelectedMechanic(item);
                    setStep(3);
                  }}
                  style={styles.selectBtn}
                >
                  {active ? 'Selected' : 'Select'}
                </Button>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );

  // --- Step 3: Date & time (horizontal date strip + grid)
  const StepDateTime = () => (
    <View style={styles.stepWrap}>
      <Text style={styles.stepHint}>Pick a date and time</Text>

      {/* Quick pick row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateStrip}
      >
        {dateStrip.map(d => {
          const active = selectedDate === d.key;
          return (
            <TouchableOpacity
              key={d.key}
              onPress={() => {
                setSelectedDate(d.key);
                setSelectedTime('');
              }}
              style={[styles.datePill, active && styles.datePillActive]}
              activeOpacity={0.9}
            >
              <Text style={[styles.datePillLabel, active && styles.datePillLabelActive]}>{d.label}</Text>
              <Text style={[styles.datePillSub, active && styles.datePillSubActive]}>{d.sub}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.timesTitle}>Available times</Text>
      <View style={styles.timesGrid}>
        {timesForDay.map(t => {
          const active = selectedTime === t;
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedTime(t)}
              style={[styles.timeBtn, active && styles.timeBtnActive]}
              activeOpacity={0.9}
            >
              <Text style={[styles.timeText, active && styles.timeTextActive]}>{t}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // --- Step 4: Confirmation
  const StepConfirm = () => (
    <View style={styles.stepWrap}>
      <Text style={styles.stepHint}>Review and confirm your booking</Text>

      <Card style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service</Text>
          <View style={styles.summaryValWrap}>
            <Text style={styles.summaryVal}>{selectedService?.name}</Text>
            <TouchableOpacity onPress={() => setStep(1)}>
              <Text style={styles.link}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Mechanic</Text>
          <View style={styles.summaryValWrap}>
            <Text style={styles.summaryVal}>{selectedMechanic?.name}</Text>
            <TouchableOpacity onPress={() => setStep(2)}>
              <Text style={styles.link}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date</Text>
          <View style={styles.summaryValWrap}>
            <Text style={styles.summaryVal}>{selectedDate}</Text>
            <TouchableOpacity onPress={() => setStep(3)}>
              <Text style={styles.link}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Time</Text>
          <View style={styles.summaryValWrap}>
            <Text style={styles.summaryVal}>{selectedTime}</Text>
            <TouchableOpacity onPress={() => setStep(3)}>
              <Text style={styles.link}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { fontWeight: theme.fontWeight.semibold }]}>Estimated Cost</Text>
          <Text style={styles.totalPrice}>{selectedService?.price}</Text>
        </View>
      </Card>

      <View style={styles.noteCard}>
        <Icon name="info" size={18} color={theme.colors.primary} />
        <Text style={styles.noteText}>
          You’ll receive a confirmation SMS with the mechanic’s contact details.
        </Text>
      </View>
    </View>
  );

  // --- Header
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.navBtn} onPress={goBack}>
        <Icon name="arrow-back" size={22} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <StepTitle />
        <Text style={styles.stepSub}>Step {step} of {totalSteps}</Text>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );

  // --- Sticky Bottom (context + primary CTA)
  const StickyBar = () => {
    const onPress = () => {
      if (step === 1 && selectedService) return setStep(2);
      if (step === 2 && selectedMechanic) return setStep(3);
      if (step === 3 && selectedDate && selectedTime) return confirmDateTime();
      if (step === 4) return handleFinalConfirm();
    };

    const disabled =
      (step === 1 && !selectedService) ||
      (step === 2 && !selectedMechanic) ||
      (step === 3 && (!selectedDate || !selectedTime));

    const label = step === 4 ? 'Confirm Booking' : 'Continue';

    return (
      <View style={styles.stickyBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.contextTitle}>
            {selectedService?.name ?? 'Select service'}
          </Text>
          <Text style={styles.contextSub} numberOfLines={1}>
            {selectedMechanic?.name ?? 'Pick a mechanic'} • {selectedDate || 'Pick a date'} {selectedTime ? `• ${selectedTime}` : ''}
          </Text>
        </View>
        <Button mode="contained" onPress={onPress} disabled={disabled} style={styles.primaryCta}>
          {label}
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.progressWrap}>
        <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progress} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 && <StepServices />}
        {step === 2 && <StepMechanics />}
        {step === 3 && <StepDateTime />}
        {step === 4 && <StepConfirm />}

        <View style={{ height: 120 }} />
      </ScrollView>

      <StickyBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.lightest,
  },
  navBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.card },
  headerCenter: { flex: 1, alignItems: 'center', gap: 2 },
  headerTitle: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold, fontSize: theme.fontSize.lg },
  stepSub: { color: theme.colors.textSecondary, fontSize: theme.fontSize.xs },

  // Progress
  progressWrap: { paddingHorizontal: theme.spacing.md, paddingTop: theme.spacing.sm, backgroundColor: theme.colors.white },
  progress: { height: 4, borderRadius: 2 },

  // Content
  content: { flex: 1, paddingHorizontal: theme.spacing.md },

  stepWrap: { paddingVertical: theme.spacing.lg },
  stepHint: { color: theme.colors.textSecondary, textAlign: 'center', marginBottom: theme.spacing.lg },

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.md,
  },
  searchInput: { flex: 1, color: theme.colors.textPrimary, paddingVertical: 0 },

  // Services grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md },
  serviceCard: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  serviceCardActive: { borderWidth: 2, borderColor: theme.colors.primary },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${theme.colors.primary}12`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  serviceIconActive: { backgroundColor: theme.colors.primary },
  serviceName: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold },
  serviceNameActive: { color: '#fff' },
  serviceTiny: { color: theme.colors.textSecondary, fontSize: theme.fontSize.xs, marginTop: 2 },
  serviceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.sm },
  serviceMeta: { color: theme.colors.textSecondary, fontSize: theme.fontSize.xs },
  servicePrice: { color: theme.colors.primary, fontWeight: theme.fontWeight.semibold },

  em: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold },

  // Mechanics
  mechanicCard: { backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.xl, overflow: 'hidden', ...theme.shadows.small },
  mechanicCardActive: { borderWidth: 2, borderColor: theme.colors.primary },
  mechanicContent: { flexDirection: 'row', padding: theme.spacing.md, gap: theme.spacing.md },
  mechanicImage: { width: 64, height: 64, borderRadius: theme.borderRadius.lg, backgroundColor: theme.colors.lightest },
  mechanicTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mechanicName: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold },
  statusChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  openChip: { backgroundColor: `${theme.colors.success}15` },
  closedChip: { backgroundColor: `${theme.colors.error}12` },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotOpen: { backgroundColor: theme.colors.success },
  dotClosed: { backgroundColor: theme.colors.error },
  statusText: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.medium },
  openText: { color: theme.colors.success },
  closedText: { color: theme.colors.error },

  mechanicMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  inline: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: theme.colors.textPrimary, fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.medium },
  metaSub: { color: theme.colors.textSecondary, fontSize: theme.fontSize.sm },
  sep: { color: theme.colors.textSecondary },

  priceRange: { color: theme.colors.primary, fontWeight: theme.fontWeight.semibold, marginTop: 6 },
  available: { color: theme.colors.textSecondary, marginTop: 2 },
  specialties: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginTop: 8 },
  chip: { backgroundColor: `${theme.colors.primary}10`, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipText: { color: theme.colors.primary, fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.medium },
  more: { color: theme.colors.textSecondary, fontSize: theme.fontSize.xs, fontStyle: 'italic' },

  mechanicActions: { flexDirection: 'row', gap: theme.spacing.md, padding: theme.spacing.md, paddingTop: 0 },
  viewBtn: { flex: 1, backgroundColor: theme.colors.card },
  selectBtn: { flex: 1 },

  // Date & time
  dateStrip: { gap: 10, paddingVertical: 4 },
  datePill: {
    width: 96,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  datePillActive: { backgroundColor: theme.colors.primary },
  datePillLabel: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold },
  datePillLabelActive: { color: '#fff' },
  datePillSub: { color: theme.colors.textSecondary, fontSize: theme.fontSize.xs, marginTop: 2 },
  datePillSubActive: { color: '#fff' },

  timesTitle: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold, marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },
  timesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeBtn: {
    width: '30.5%',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  timeBtnActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  timeText: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium },
  timeTextActive: { color: '#fff' },

  // Summary
  summaryCard: { backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.xl, padding: theme.spacing.lg, ...theme.shadows.small },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md },
  summaryLabel: { color: theme.colors.textSecondary },
  summaryValWrap: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryVal: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium },
  link: { color: theme.colors.primary, fontWeight: theme.fontWeight.medium },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.lightest, marginVertical: theme.spacing.md },
  totalPrice: { color: theme.colors.primary, fontWeight: theme.fontWeight.bold, fontSize: theme.fontSize.lg },

  noteCard: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: `${theme.colors.primary}10`,
    marginTop: theme.spacing.lg,
  },
  noteText: { color: theme.colors.textPrimary, flex: 1, lineHeight: 20 },

  // Sticky bottom bar
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.lightest,
    ...theme.shadows.large,
    paddingHorizontal: theme.spacing.xxl,
  },
  contextTitle: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold },
  contextSub: { color: theme.colors.textSecondary, fontSize: theme.fontSize.xs, marginTop: 2 },
  primaryCta: { borderRadius: 16, minWidth: 140 },
});
