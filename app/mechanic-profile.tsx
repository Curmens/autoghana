// app/mechanic-profile.tsx — Modernized
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    type StyleProp,
    type ViewStyle
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

type ShadowType = keyof typeof theme.shadows;

type MechanicService = {
    id: string;
    name: string;
    price: string;
    duration: string;
    description?: string;
    category?: string;
    popularity?: number;
};

type MechanicReview = {
    id: number;
    customerName: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    service: string;
    helpful?: number;
    verified?: boolean;
};

type MechanicGalleryItem = {
    id: string;
    url: string;
    caption?: string;
};

type MechanicStatus = {
    isOpen: boolean;
    nextChange?: string;
    message?: string;
};

type MechanicCertification = {
    name: string;
    year: string;
};

type MechanicSocialProof = {
    totalCustomers?: string;
    yearsExperience?: number;
    satisfactionRate?: number;
    repeatCustomers?: number;
};

type Mechanic = {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    distance: string;
    image: string;
    coverImage: string;
    phone?: string;
    email?: string;
    website?: string;
    address: string;
    coordinates?: { lat: number; lng: number };
    hours?: Record<string, string>;
    currentStatus?: MechanicStatus;
    responseTime?: string;
    completionRate?: number;
    averagePrice?: string;
    established?: string;
    employees?: number;
    description?: string;
    services?: MechanicService[];
    specialties?: string[];
    badges?: string[];
    certifications?: MechanicCertification[];
    features?: string[];
    amenities?: string[];
    reviews?: MechanicReview[];
    gallery?: MechanicGalleryItem[];
    socialProof?: MechanicSocialProof;
};

type ThemeCardProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    shadow?: ShadowType;
};

// --- Mock data (unchanged) ---
const mechanicData: Record<string, Mechanic> = {
    'pro-auto': {
        id: 'pro-auto',
        name: 'Pro Auto Works',
        rating: 4.89,
        reviewCount: 127,
        distance: '2.1 km away',
        image: 'https://images.pexels.com/photos/3822784/pexels-photo-3822784.jpeg',
        coverImage: 'https://images.pexels.com/photos/3930092/pexels-photo-3930092.jpeg',
        phone: '+233 24 123 4567',
        email: 'info@proautoworks.com',
        website: 'www.proautoworks.com',
        address: 'East Legon, Accra, Greater Accra',
        coordinates: { lat: 5.6037, lng: -0.1870 },
        hours: {
            monday: '8:00 AM - 6:00 PM',
            tuesday: '8:00 AM - 6:00 PM',
            wednesday: '8:00 AM - 6:00 PM',
            thursday: '8:00 AM - 6:00 PM',
            friday: '8:00 AM - 6:00 PM',
            saturday: '8:00 AM - 4:00 PM',
            sunday: 'Closed'
        },
        currentStatus: { isOpen: true, nextChange: 'Closes at 6:00 PM', message: 'Currently accepting walk-ins' },
        responseTime: 'Usually responds within 1 hour',
        completionRate: 98,
        averagePrice: 'GH₵150-350',
        established: '2009',
        employees: 8,
        description:
            'Professional automotive service center with over 15 years of experience in the industry. We specialize in comprehensive vehicle diagnostics, brake systems, engine repair, and preventive maintenance. Our certified technicians use state-of-the-art equipment to ensure your vehicle runs safely and efficiently.',
        services: [
            { id: '1', name: 'Oil Change & Filter', price: 'GH₵120', duration: '30 mins', description: 'Full synthetic oil change with premium filter', category: 'Maintenance', popularity: 95 },
            { id: '2', name: 'Brake Repair & Service', price: 'GH₵350', duration: '2 hours', description: 'Complete brake system inspection and repair', category: 'Safety', popularity: 88 },
            { id: '3', name: 'Engine Diagnostics', price: 'GH₵150', duration: '45 mins', description: 'Comprehensive computer diagnostic scan', category: 'Diagnostics', popularity: 92 },
            { id: '4', name: 'AC Service & Repair', price: 'GH₵200', duration: '1 hour', description: 'Air conditioning system service and recharge', category: 'Comfort', popularity: 75 },
            { id: '5', name: 'Tire Service', price: 'GH₵80', duration: '45 mins', description: 'Tire rotation, balancing, and alignment', category: 'Maintenance', popularity: 82 },
            { id: '6', name: 'Battery Service', price: 'GH₵250', duration: '30 mins', description: 'Battery testing and replacement', category: 'Electrical', popularity: 70 }
        ],
        specialties: ['Engine Repair', 'Brake Systems', 'Diagnostics', 'Preventive Maintenance', 'Electrical Systems'],
        badges: ['Superhost Mechanic', 'Verified Business', 'Expert Technician', 'Quality Guaranteed'],
        certifications: [
            { name: 'ASE Certified Master Technician', year: '2018' },
            { name: 'Bosch Diagnostic Specialist', year: '2020' },
            { name: 'Toyota Service Excellence', year: '2019' },
            { name: 'Brake Safety Inspector', year: '2021' }
        ],
        features: [
            'Free vehicle pickup & delivery',
            '12-month service warranty',
            '24/7 roadside assistance',
            'Digital service reports',
            'Genuine parts guarantee',
            'Expert diagnostic equipment'
        ],
        amenities: ['Comfortable waiting area', 'Free WiFi', 'Complimentary beverages', "Children's play area", 'Clean restrooms', 'Parking available'],
        reviews: [
            { id: 1, customerName: 'Kwame Asante', avatar: 'https://via.placeholder.com/50x50', rating: 5, date: '2 days ago', comment: 'Exceptional service! The team at Pro Auto Works diagnosed and fixed my brake issues quickly and professionally. They explained everything clearly and the pricing was fair. Will definitely return for future maintenance.', service: 'Brake Repair', helpful: 12, verified: true },
            { id: 2, customerName: 'Ama Osei', avatar: 'https://via.placeholder.com/50x50', rating: 5, date: '1 week ago', comment: 'Outstanding diagnostic work! They found an issue that two other mechanics missed. Very knowledgeable staff and excellent customer service. The facility is clean and modern.', service: 'Engine Diagnostics', helpful: 8, verified: true },
            { id: 3, customerName: 'John Mensah', avatar: 'https://via.placeholder.com/50x50', rating: 4, date: '2 weeks ago', comment: 'Good service overall. Fair prices and honest recommendations. The only minor issue was the wait time, but they kept me informed throughout the process.', service: 'Oil Change', helpful: 5, verified: true },
            { id: 4, customerName: 'Grace Adjei', avatar: 'https://via.placeholder.com/50x50', rating: 5, date: '3 weeks ago', comment: 'Amazing experience! They went above and beyond to help me with my AC problems. The waiting area is comfortable and they have great customer service.', service: 'AC Service', helpful: 15, verified: true },
            { id: 5, customerName: 'Michael Boateng', avatar: 'https://via.placeholder.com/50x50', rating: 5, date: '1 month ago', comment: "Professional, reliable, and trustworthy. They've been servicing my family's vehicles for years. Never had a bad experience.", service: 'General Maintenance', helpful: 20, verified: true }
        ],
        gallery: [
            { id: '1', url: 'https://via.placeholder.com/300x200', caption: 'Modern service bays' },
            { id: '2', url: 'https://via.placeholder.com/300x200/ff6b6b', caption: 'Diagnostic equipment' },
            { id: '3', url: 'https://via.placeholder.com/300x200/4ecdc4', caption: 'Comfortable waiting area' },
            { id: '4', url: 'https://via.placeholder.com/300x200/45b7d1', caption: 'Expert technicians at work' },
            { id: '5', url: 'https://via.placeholder.com/300x200/f9ca24', caption: 'Parts inventory' },
            { id: '6', url: 'https://via.placeholder.com/300x200/6c5ce7', caption: 'Clean facility exterior' }
        ],
        socialProof: { totalCustomers: '2,500+', yearsExperience: 15, satisfactionRate: 98, repeatCustomers: 85 }
    },
    '1': {
        id: '1',
        name: 'Pro Auto Works',
        rating: 4.89,
        reviewCount: 127,
        distance: '2.1 km away',
        image: 'https://images.pexels.com/photos/4481952/pexels-photo-4481952.jpeg',
        coverImage: 'https://images.pexels.com/photos/3930092/pexels-photo-3930092.jpeg',
        phone: '+233 24 123 4567',
        email: 'info@proautoworks.com',
        address: 'East Legon, Accra',
        hours: { monday: '8:00 AM - 6:00 PM' },
        currentStatus: { isOpen: true, nextChange: 'Closes at 6:00 PM' },
        description: 'Professional automotive service center with over 15 years of experience.',
        services: [
            { id: '1', name: 'Oil Change', price: 'GH₵120', duration: '30 mins' },
            { id: '2', name: 'Brake Repair', price: 'GH₵350', duration: '2 hours' }
        ],
        specialties: ['Engine Repair', 'Brake Service'],
        badges: ['Verified'],
        reviews: [{ id: 1, customerName: 'Kwame A.', avatar: 'https://via.placeholder.com/50x50', rating: 5, date: '2 days ago', comment: 'Excellent service!', service: 'Brake Repair' }],
        gallery: [{ id: '1', url: 'https://via.placeholder.com/300x200' }]
    }
};

export default function MechanicProfileScreen() {
    const { mechanicId } = useLocalSearchParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [selectedServiceCategory, setSelectedServiceCategory] = useState('All');

    const mechanicKey = Array.isArray(mechanicId) ? mechanicId[0] : mechanicId;
    const mechanic = mechanicKey ? mechanicData[mechanicKey] ?? mechanicData['1'] : undefined;

    if (!mechanic) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Icon name="error" size={64} color={theme.colors.error} />
                    <Text style={styles.errorTitle}>Mechanic Not Found</Text>
                    <Text style={styles.errorSubtitle}>The mechanic profile you’re looking for could not be found.</Text>
                    <Button mode="contained" onPress={() => router.back()} style={styles.backButton}>
                        Go Back
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    const serviceCategories = [
        'All',
        ...Array.from(new Set((mechanic.services ?? []).map(s => s.category).filter((c): c is string => Boolean(c))))
    ];

    const filteredServices =
        selectedServiceCategory === 'All'
            ? mechanic.services ?? []
            : (mechanic.services ?? []).filter(s => s.category === selectedServiceCategory);

    const ThemeCard = ({ children, style, shadow = 'soft' }: ThemeCardProps) => (
        <View style={[styles.themeCard, theme.shadows[shadow], style]}>{children}</View>
    );

    const StatusBadge = () => (
        <View style={[styles.statusBadge, mechanic.currentStatus?.isOpen ? styles.openBadge : styles.closedBadge]}>
            <View style={[styles.statusDot, mechanic.currentStatus?.isOpen ? styles.openDot : styles.closedDot]} />
            <View style={styles.statusTextContainer}>
                <Text style={[styles.statusText, mechanic.currentStatus?.isOpen ? styles.openText : styles.closedText]}>
                    {mechanic.currentStatus?.isOpen ? 'Open now' : 'Closed'}
                </Text>
                {!!mechanic.currentStatus?.nextChange && <Text style={styles.statusSubtext}>{mechanic.currentStatus.nextChange}</Text>}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* HERO with gradient */}
                <View style={styles.heroContainer}>
                    <ImageBackground
                        source={{ uri: mechanic.coverImage }}
                        style={styles.coverImage}
                        imageStyle={styles.coverImageRadius}
                    >
                        <View style={styles.gradient} />
                        <View style={styles.heroTopChips}>
                            {mechanic.badges?.slice(0, 2).map((b, i) => (
                                <View key={i} style={styles.heroBadge}>
                                    <Text style={styles.heroBadgeText}>{b}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Name & rating overlay */}
                        <View style={styles.heroBottomRow}>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={1} style={styles.heroName}>
                                    {mechanic.name}
                                </Text>
                                <View style={styles.heroMetaRow}>
                                    <Icon name="place" size={14} color="#fff" />
                                    <Text style={styles.heroMetaText}>{mechanic.distance}</Text>
                                </View>
                            </View>
                            <View style={styles.ratingPill}>
                                <Icon name="star" size={14} color="#fff" />
                                <Text style={styles.ratingPillText}>{mechanic.rating}</Text>
                                <Text style={styles.ratingPillSub}>({mechanic.reviewCount})</Text>
                            </View>
                        </View>

                        {/* Status pill */}
                        <View style={styles.heroStatus}>
                            <StatusBadge />
                        </View>
                    </ImageBackground>
                </View>

                {/* ABOUT + STATS */}
                <ThemeCard style={styles.mainInfoCard} shadow="medium">
                    {mechanic.socialProof && (
                        <View style={styles.socialProofRow}>
                            <View style={styles.statCol}>
                                <Text style={styles.statVal}>{mechanic.socialProof.totalCustomers}</Text>
                                <Text style={styles.statLabel}>Customers</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statCol}>
                                <Text style={styles.statVal}>{mechanic.socialProof.yearsExperience}+</Text>
                                <Text style={styles.statLabel}>Years</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statCol}>
                                <Text style={styles.statVal}>{mechanic.socialProof.satisfactionRate}%</Text>
                                <Text style={styles.statLabel}>Satisfaction</Text>
                            </View>
                        </View>
                    )}
                    <Text style={styles.description}>{mechanic.description}</Text>
                </ThemeCard>

                {/* QUICK ACTIONS */}
                <View style={styles.quickActionsContainer}>
                    {[
                        { icon: 'phone', label: 'Call' },
                        { icon: 'message', label: 'Message' },
                        { icon: 'directions', label: 'Directions' },
                        { icon: 'share', label: 'Share' }
                    ].map(a => (
                        <TouchableOpacity key={a.label} style={styles.quickActionCard}>
                            <Icon name={a.icon} size={20} color={theme.colors.primary} />
                            <Text style={styles.quickActionText}>{a.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* FEATURES */}
                <ThemeCard style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>What this place offers</Text>
                    <View style={styles.featuresGrid}>
                        {mechanic.features?.map((f, i) => (
                            <View key={i} style={styles.featureItem}>
                                <Icon name="check-circle" size={18} color={theme.colors.success} />
                                <Text style={styles.featureText}>{f}</Text>
                            </View>
                        ))}
                    </View>
                </ThemeCard>

                {/* SERVICES */}
                <ThemeCard style={styles.sectionCard}>
                    <View style={styles.servicesHeader}>
                        <Text style={styles.sectionTitle}>Services & Pricing</Text>
                        <Text style={styles.servicesSubtitle}>Professional automotive services</Text>
                    </View>

                    {serviceCategories.length > 1 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
                            {serviceCategories.map(cat => {
                                const active = selectedServiceCategory === cat;
                                return (
                                    <TouchableOpacity
                                        key={cat}
                                        onPress={() => setSelectedServiceCategory(cat)}
                                        style={[styles.categoryPill, active && styles.categoryPillActive]}
                                    >
                                        <Text style={[styles.categoryPillText, active && styles.categoryPillTextActive]}>{cat}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    )}

                    {filteredServices.map((s, idx) => (
                        <View key={s.id}>
                            <View style={styles.serviceRow}>
                                <View style={styles.serviceMain}>
                                    <Text style={styles.serviceName}>{s.name}</Text>
                                    {!!s.description && <Text style={styles.serviceDesc}>{s.description}</Text>}
                                    <View style={styles.serviceMetaRow}>
                                        {!!s.category && (
                                            <View style={styles.serviceTag}>
                                                <Text style={styles.serviceTagText}>{s.category}</Text>
                                            </View>
                                        )}
                                        {typeof s.popularity === 'number' && (
                                            <View style={styles.trendRow}>
                                                <Icon name="trending-up" size={14} color={theme.colors.success} />
                                                <Text style={styles.trendText}>{s.popularity}% satisfaction</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.servicePriceWrap}>
                                    <Text style={styles.servicePrice}>{s.price}</Text>
                                    <Text style={styles.serviceDuration}>{s.duration}</Text>
                                    <TouchableOpacity style={styles.serviceCta}>
                                        <Text style={styles.serviceCtaText}>Book</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {idx < filteredServices.length - 1 && <View style={styles.hairline} />}
                        </View>
                    ))}
                </ThemeCard>

                {/* REVIEWS */}
                {/* <ThemeCard style={styles.sectionCard}>
                    <View style={styles.reviewsHeader}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <View style={styles.reviewsStats}>
                            <Icon name="star" size={18} color={theme.colors.warning} />
                            <Text style={styles.reviewsAverage}>{mechanic.rating}</Text>
                            <Text style={styles.reviewsCount}>• {mechanic.reviewCount} reviews</Text>
                        </View>
                    </View>

                    {(showAllReviews ? mechanic.reviews ?? [] : (mechanic.reviews ?? []).slice(0, 3)).map((r, i, arr) => (
                        <View key={r.id}>
                            <View style={styles.reviewRow}>
                                <Image source={{ uri: r.avatar }} style={styles.reviewerAvatar} />
                                <View style={{ flex: 1 }}>
                                    <View style={styles.reviewerHead}>
                                        <Text style={styles.reviewerName}>{r.customerName}</Text>
                                        {r.verified && <Icon name="verified" size={14} color={theme.colors.success} />}
                                    </View>
                                    <Text style={styles.reviewDate}>{r.date}</Text>
                                    <View style={styles.reviewStars}>
                                        {Array.from({ length: 5 }).map((_, k) => (
                                            <Icon key={k} name="star" size={14} color={k < r.rating ? theme.colors.warning : theme.colors.lighter} />
                                        ))}
                                    </View>
                                    <Text style={styles.reviewText}>{r.comment}</Text>

                                    <View style={styles.reviewFooter}>
                                        <View style={styles.tag}>
                                            <Text style={styles.tagText}>{r.service}</Text>
                                        </View>

                                        {r.helpful ? (
                                            <TouchableOpacity style={styles.helpful}>
                                                <Icon name="thumb-up" size={14} color={theme.colors.textSecondary} />
                                                <Text style={styles.helpfulText}>Helpful ({r.helpful})</Text>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                            {i < arr.length - 1 && <View style={styles.hairline} />}
                        </View>
                    ))}

                    {mechanic.reviews && mechanic.reviews.length > 3 && (
                        <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)} style={styles.showAll}>
                            <Text style={styles.showAllText}>{showAllReviews ? 'Show less' : `Show all ${mechanic.reviewCount} reviews`}</Text>
                            <Icon name={showAllReviews ? 'expand-less' : 'expand-more'} size={16} color={theme.colors.primary} />
                        </TouchableOpacity>
                    )}
                </ThemeCard> */}

                {/* GALLERY */}
                {/* <ThemeCard style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Photo Gallery</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingRight: theme.spacing.xl }}>
                        <View style={{ flexDirection: 'row', gap: theme.spacing.lg }}>
                            {(mechanic.gallery ?? []).map((g, idx) => (
                                <TouchableOpacity key={g.id} onPress={() => setSelectedImageIndex(idx)} style={styles.galleryItem}>
                                    <Image source={{ uri: g.url }} style={styles.galleryImage} />
                                    {!!g.caption && (
                                        <View style={styles.galleryCaptionWrap}>
                                            <Text style={styles.galleryCaptionText}>{g.caption}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </ThemeCard> */}

                {/* <View style={{ height: 110 }} /> */}
            </ScrollView>

            {/* Sticky bottom actions */}
            <View style={styles.bottomActions}>
                <View>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.priceValue}>{mechanic.averagePrice || 'GH₵80'}</Text>
                </View>
                <Button
                    mode="contained"
                    onPress={() => router.push('/service-booking')}
                    style={styles.bookBtn}
                    contentStyle={{ paddingVertical: theme.spacing.md }}
                    labelStyle={{ color: '#fff', fontWeight: theme.typography?.weights.semibold }}
                >
                    Book Service
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    scrollView: { flex: 1 },

    // Hero
    heroContainer: { height: 300, marginBottom: theme.spacing.md },
    coverImage: { flex: 1, justifyContent: 'flex-end' },
    coverImageRadius: {
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent'
    },
    heroTopChips: { position: 'absolute', top: 18, left: 18, flexDirection: 'row', gap: 8 },
    heroBadge: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 6,
        borderRadius: 999
    },
    heroBadgeText: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.caption, fontWeight: theme.typography?.weights.medium },

    heroBottomRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
        padding: theme.spacing.xl
    },
    heroName: {
        color: '#fff',
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold
    },
    heroMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
    heroMetaText: { color: '#fff', opacity: 0.9 },

    ratingPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(0,0,0,0.35)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999
    },
    ratingPillText: { color: '#fff', fontWeight: theme.typography?.weights.semibold },
    ratingPillSub: { color: '#fff', opacity: 0.85, fontSize: theme.typography?.sizes.caption },

    heroStatus: { position: 'absolute', right: theme.spacing.xl, top: 70 },

    // Card base
    themeCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        marginHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.lg
    },

    // Stats
    mainInfoCard: { marginTop: -theme.spacing.lg },
    socialProofRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        marginBottom: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.surface
    },
    statCol: { flex: 1, alignItems: 'center', paddingVertical: theme.spacing.sm },
    statVal: { color: theme.colors.primary, fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.title },
    statLabel: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },
    statDivider: { width: 1, backgroundColor: theme.colors.lightest, marginVertical: 8 },

    description: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.bodyLarge, lineHeight: theme.typography?.sizes.bodyLarge * (theme.typography?.lineHeights.normal ?? 1.2) },

    // Status pill
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 8,
        borderRadius: 999,
        ...theme.shadows.soft
    },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    openDot: { backgroundColor: theme.colors.success },
    closedDot: { backgroundColor: theme.colors.error },
    statusTextContainer: { flexDirection: 'column' },
    statusText: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.medium },
    statusSubtext: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },
    openBadge: { backgroundColor: `${theme.colors.success}15` },
    closedBadge: { backgroundColor: `${theme.colors.error}15` },
    openText: { color: theme.colors.success },
    closedText: { color: theme.colors.error },

    // Quick actions
    quickActionsContainer: { flexDirection: 'row', gap: theme.spacing.md, paddingHorizontal: theme.spacing.xl, marginBottom: theme.spacing.md },
    quickActionCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.lg,
        backgroundColor: `${theme.colors.primary}0D`,
        borderRadius: theme.borderRadius.xl
    },
    quickActionText: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.medium, marginTop: 6 },

    // Sections
    sectionCard: { marginTop: 0 },
    sectionTitle: {
        color: theme.colors.textPrimary,
        fontWeight: theme.typography?.weights.semibold,
        fontSize: theme.typography?.sizes.titleLarge,
        marginBottom: theme.spacing.lg
    },

    featuresGrid: { gap: theme.spacing.md },
    featureItem: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
    featureText: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.bodyLarge },

    servicesHeader: { marginBottom: theme.spacing.md },
    servicesSubtitle: { color: theme.colors.textSecondary },
    categoryFilters: { marginBottom: theme.spacing.lg },
    categoryPill: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        marginRight: theme.spacing.md,
        backgroundColor: theme.colors.lightest,
        borderRadius: 999
    },
    categoryPillActive: { backgroundColor: theme.colors.primary },
    categoryPillText: { color: theme.colors.textSecondary, fontWeight: theme.typography?.weights.medium },
    categoryPillTextActive: { color: '#fff' },

    serviceRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: theme.spacing.md, gap: theme.spacing.md },
    serviceMain: { flex: 1 },
    serviceName: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold },
    serviceDesc: { color: theme.colors.textSecondary, marginTop: 2 },
    serviceMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
    serviceTag: { backgroundColor: theme.colors.lightest, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
    serviceTagText: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },
    trendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    trendText: { color: theme.colors.success, fontSize: theme.typography?.sizes.caption },

    servicePriceWrap: { alignItems: 'flex-end', minWidth: 112 },
    servicePrice: { color: theme.colors.primary, fontWeight: theme.typography?.weights.semibold },
    serviceDuration: { color: theme.colors.textSecondary, marginTop: 2 },
    serviceCta: {
        marginTop: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8
    },
    serviceCtaText: { color: '#fff', fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.caption },
    hairline: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.lightest },

    // Reviews
    reviewsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.md },
    reviewsStats: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    reviewsAverage: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold },
    reviewsCount: { color: theme.colors.textSecondary },

    reviewRow: { flexDirection: 'row', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
    reviewerAvatar: { width: 44, height: 44, borderRadius: 22 },
    reviewerHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    reviewerName: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.medium },
    reviewDate: { color: theme.colors.textSecondary, marginTop: 2, marginBottom: 6 },
    reviewStars: { flexDirection: 'row', gap: 2, marginBottom: 6 },
    reviewText: { color: theme.colors.textPrimary },
    reviewFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: theme.spacing.sm },
    tag: { backgroundColor: theme.colors.lightest, borderRadius: 999, paddingHorizontal: theme.spacing.md, paddingVertical: 6 },
    tagText: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },
    helpful: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: theme.spacing.sm, paddingVertical: 6 },
    helpfulText: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },
    showAll: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingTop: theme.spacing.md },
    showAllText: { color: theme.colors.primary, fontWeight: theme.typography?.weights.medium },

    // Gallery
    galleryItem: { position: 'relative' },
    galleryImage: { width: 220, height: 150, borderRadius: theme.borderRadius.lg },
    galleryCaptionWrap: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: theme.borderRadius.md
    },
    galleryCaptionText: { color: '#fff', fontSize: theme.typography?.sizes.caption },

    // Bottom CTA
    bottomActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.xl,
        backgroundColor: theme.colors.white,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: theme.colors.lightest,
    },
    priceLabel: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.body },
    priceValue: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.titleLarge },
    bookBtn: { borderRadius: 24, minWidth: 120, marginLeft: theme.spacing.xl },

    // Empty/error
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xl },
    errorTitle: { fontSize: theme.typography?.sizes.heading, fontWeight: theme.typography?.weights.semibold, color: theme.colors.textPrimary, marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },
    errorSubtitle: { fontSize: theme.typography?.sizes.body, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: theme.spacing.xl },
    backButton: { marginTop: theme.spacing.lg }
});
