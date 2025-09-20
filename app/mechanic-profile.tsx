// app/mechanic-profile.tsx - Complete Theme-inspired mechanic profile
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    type StyleProp,
    type ViewStyle,
} from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

type ListRenderItem<T> = ({ item, index }: { item: T; index?: number }) => React.ReactElement | null;

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

// Mock comprehensive mechanic data
const mechanicData: Record<string, Mechanic> = {
    'pro-auto': {
        id: 'pro-auto',
        name: 'Pro Auto Works',
        rating: 4.89,
        reviewCount: 127,
        distance: '2.1 km away',
        image: 'https://via.placeholder.com/400x240',
        coverImage: 'https://via.placeholder.com/400x240',
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
        currentStatus: {
            isOpen: true,
            nextChange: 'Closes at 6:00 PM',
            message: 'Currently accepting walk-ins'
        },
        responseTime: 'Usually responds within 1 hour',
        completionRate: 98,
        averagePrice: 'GH₵150-350',
        established: '2009',
        employees: 8,
        description: 'Professional automotive service center with over 15 years of experience in the industry. We specialize in comprehensive vehicle diagnostics, brake systems, engine repair, and preventive maintenance. Our certified technicians use state-of-the-art equipment to ensure your vehicle runs safely and efficiently.',
        services: [
            {
                id: '1',
                name: 'Oil Change & Filter',
                price: 'GH₵120',
                duration: '30 mins',
                description: 'Full synthetic oil change with premium filter',
                category: 'Maintenance',
                popularity: 95
            },
            {
                id: '2',
                name: 'Brake Repair & Service',
                price: 'GH₵350',
                duration: '2 hours',
                description: 'Complete brake system inspection and repair',
                category: 'Safety',
                popularity: 88
            },
            {
                id: '3',
                name: 'Engine Diagnostics',
                price: 'GH₵150',
                duration: '45 mins',
                description: 'Comprehensive computer diagnostic scan',
                category: 'Diagnostics',
                popularity: 92
            },
            {
                id: '4',
                name: 'AC Service & Repair',
                price: 'GH₵200',
                duration: '1 hour',
                description: 'Air conditioning system service and recharge',
                category: 'Comfort',
                popularity: 75
            },
            {
                id: '5',
                name: 'Tire Service',
                price: 'GH₵80',
                duration: '45 mins',
                description: 'Tire rotation, balancing, and alignment',
                category: 'Maintenance',
                popularity: 82
            },
            {
                id: '6',
                name: 'Battery Service',
                price: 'GH₵250',
                duration: '30 mins',
                description: 'Battery testing and replacement',
                category: 'Electrical',
                popularity: 70
            },
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
        amenities: [
            'Comfortable waiting area',
            'Free WiFi',
            'Complimentary beverages',
            'Children\'s play area',
            'Clean restrooms',
            'Parking available'
        ],
        reviews: [
            {
                id: 1,
                customerName: 'Kwame Asante',
                avatar: 'https://via.placeholder.com/50x50',
                rating: 5,
                date: '2 days ago',
                comment: 'Exceptional service! The team at Pro Auto Works diagnosed and fixed my brake issues quickly and professionally. They explained everything clearly and the pricing was fair. Will definitely return for future maintenance.',
                service: 'Brake Repair',
                helpful: 12,
                verified: true
            },
            {
                id: 2,
                customerName: 'Ama Osei',
                avatar: 'https://via.placeholder.com/50x50',
                rating: 5,
                date: '1 week ago',
                comment: 'Outstanding diagnostic work! They found an issue that two other mechanics missed. Very knowledgeable staff and excellent customer service. The facility is clean and modern.',
                service: 'Engine Diagnostics',
                helpful: 8,
                verified: true
            },
            {
                id: 3,
                customerName: 'John Mensah',
                avatar: 'https://via.placeholder.com/50x50',
                rating: 4,
                date: '2 weeks ago',
                comment: 'Good service overall. Fair prices and honest recommendations. The only minor issue was the wait time, but they kept me informed throughout the process.',
                service: 'Oil Change',
                helpful: 5,
                verified: true
            },
            {
                id: 4,
                customerName: 'Grace Adjei',
                avatar: 'https://via.placeholder.com/50x50',
                rating: 5,
                date: '3 weeks ago',
                comment: 'Amazing experience! They went above and beyond to help me with my AC problems. The waiting area is comfortable and they have great customer service.',
                service: 'AC Service',
                helpful: 15,
                verified: true
            },
            {
                id: 5,
                customerName: 'Michael Boateng',
                avatar: 'https://via.placeholder.com/50x50',
                rating: 5,
                date: '1 month ago',
                comment: 'Professional, reliable, and trustworthy. They\'ve been servicing my family\'s vehicles for years. Never had a bad experience.',
                service: 'General Maintenance',
                helpful: 20,
                verified: true
            }
        ],
        gallery: [
            { id: '1', url: 'https://via.placeholder.com/300x200', caption: 'Modern service bays' },
            { id: '2', url: 'https://via.placeholder.com/300x200/ff6b6b', caption: 'Diagnostic equipment' },
            { id: '3', url: 'https://via.placeholder.com/300x200/4ecdc4', caption: 'Comfortable waiting area' },
            { id: '4', url: 'https://via.placeholder.com/300x200/45b7d1', caption: 'Expert technicians at work' },
            { id: '5', url: 'https://via.placeholder.com/300x200/f9ca24', caption: 'Parts inventory' },
            { id: '6', url: 'https://via.placeholder.com/300x200/6c5ce7', caption: 'Clean facility exterior' }
        ],
        socialProof: {
            totalCustomers: '2,500+',
            yearsExperience: 15,
            satisfactionRate: 98,
            repeatCustomers: 85
        }
    },
    '1': {
        // Fallback data for the index-based ID from the home screen
        id: '1',
        name: 'Pro Auto Works',
        rating: 4.89,
        reviewCount: 127,
        distance: '2.1 km away',
        image: 'https://via.placeholder.com/400x240',
        coverImage: 'https://via.placeholder.com/400x240',
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
        reviews: [
            {
                id: 1,
                customerName: 'Kwame A.',
                avatar: 'https://via.placeholder.com/50x50',
                rating: 5,
                date: '2 days ago',
                comment: 'Excellent service!',
                service: 'Brake Repair'
            }
        ],
        gallery: [
            { id: '1', url: 'https://via.placeholder.com/300x200' }
        ]
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
                    <Text style={styles.errorSubtitle}>
                        The mechanic profile you’re looking for could not be found.
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        Go Back
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    // Get unique service categories
    const serviceCategories = [
        'All',
        ...Array.from(
            new Set(
                (mechanic.services ?? [])
                    .map(service => service.category)
                    .filter((category): category is string => Boolean(category))
            )
        ),
    ];

    // Filter services by category
    const filteredServices: MechanicService[] = selectedServiceCategory === 'All'
        ? mechanic.services ?? []
        : (mechanic.services ?? []).filter(service => service.category === selectedServiceCategory);

    const ThemeCard = ({ children, style, shadow = 'soft' }: ThemeCardProps) => (
        <View style={[styles.themeCard, theme.shadows[shadow], style]}>
            {children}
        </View>
    );

    const StatusBadge = () => (
        <View style={[styles.statusBadge, mechanic.currentStatus?.isOpen ? styles.openBadge : styles.closedBadge]}>
            <View style={[styles.statusDot, mechanic.currentStatus?.isOpen ? styles.openDot : styles.closedDot]} />
            <View style={styles.statusTextContainer}>
                <Text style={[styles.statusText, mechanic.currentStatus?.isOpen ? styles.openText : styles.closedText]}>
                    {mechanic.currentStatus?.isOpen ? 'Open Now' : 'Closed'}
                </Text>
                {mechanic.currentStatus?.nextChange && (
                    <Text style={styles.statusSubtext}>{mechanic.currentStatus.nextChange}</Text>
                )}
            </View>
        </View>
    );

    const ServiceCard = ({ service }: { service: MechanicService }) => (
        <TouchableOpacity style={styles.serviceContainer} activeOpacity={0.95}>
            <View style={styles.serviceItem}>
                <View style={styles.serviceHeader}>
                    <View style={styles.serviceMainInfo}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.serviceDescription}>{service.description}</Text>
                    </View>
                    <View style={styles.servicePricing}>
                        <Text style={styles.servicePrice}>{service.price}</Text>
                        <Text style={styles.serviceDuration}>{service.duration}</Text>
                    </View>
                </View>

                {(typeof service.popularity === 'number' || service.category) && (
                    <View style={styles.serviceFooter}>
                        {typeof service.popularity === 'number' && (
                            <View style={styles.popularityContainer}>
                                <Icon name="trending-up" size={14} color={theme.colors.success} />
                                <Text style={styles.popularityText}>{service.popularity}% customer satisfaction</Text>
                            </View>
                        )}
                        {service.category && (
                            <Chip mode="outlined" style={styles.categoryChip} textStyle={styles.categoryChipText}>
                                {service.category}
                            </Chip>
                        )}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    const ReviewCard = ({ review }: { review: MechanicReview }) => (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
                <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerNameRow}>
                        <Text style={styles.reviewerName}>{review.customerName}</Text>
                        {review.verified && (
                            <Icon name="verified" size={16} color={theme.colors.success} />
                        )}
                    </View>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                    <View style={styles.reviewRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                                key={star}
                                name="star"
                                size={14}
                                color={star <= review.rating ? theme.colors.warning : theme.colors.lighter}
                            />
                        ))}
                    </View>
                </View>
            </View>

            <Text style={styles.reviewComment}>{review.comment}</Text>

            <View style={styles.reviewFooter}>
                <Chip mode="outlined" style={styles.serviceChip} textStyle={styles.serviceChipText}>
                    {review.service}
                </Chip>

                {typeof review.helpful === 'number' && review.helpful > 0 && (
                    <TouchableOpacity style={styles.helpfulButton}>
                        <Icon name="thumb-up" size={14} color={theme.colors.textSecondary} />
                        <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    // const GalleryImage = ({ item, index }: { item: MechanicGalleryItem; index: number }) => (
    //     <TouchableOpacity
    //         style={styles.galleryImageContainer}
    //         onPress={() => setSelectedImageIndex(index)}
    //     >
    //         <Image source={{ uri: item.url }} style={styles.galleryImage} />
    //         {item.caption && (
    //             <View style={styles.galleryCaption}>
    //                 <Text style={styles.galleryCaptionText}>{item.caption}</Text>
    //             </View>
    //         )}
    //     </TouchableOpacity>
    // );

    // const renderServiceItem: ListRenderItem<MechanicService> = ({ item }) => <ServiceCard service={item} />;
    // const renderReviewItem: ListRenderItem<MechanicReview> = ({ item }) => <ReviewCard review={item} />;
    // const renderGalleryItem: ListRenderItem<MechanicGalleryItem> = ({ item, index }) => (
    //     <GalleryImage item={item} index={index} />
    // );
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: mechanic.gallery?.[selectedImageIndex]?.url || mechanic.coverImage }}
                        style={styles.coverImage}
                    />
                    <View style={styles.heroOverlay}>
                        <View style={styles.badgesContainer}>
                            {mechanic.badges?.slice(0, 2).map((b, i) => (
                                <View key={i} style={styles.heroBadge}><Text style={styles.heroBadgeText}>{b}</Text></View>
                            ))}
                        </View>
                        <StatusBadge />
                    </View>
                </View>

                {/* Main Card */}
                <ThemeCard style={styles.mainInfoCard}>
                    <View style={styles.mechanicHeader}>
                        <View style={styles.mechanicTitleSection}>
                            <Text style={styles.mechanicName}>{mechanic.name}</Text>
                            <View style={styles.mechanicMetaRow}>
                                <View style={styles.ratingContainer}>
                                    <Icon name="star" size={18} color={theme.colors.warning} />
                                    <Text style={styles.rating}>{mechanic.rating}</Text>
                                    <Text style={styles.reviewCount}>({mechanic.reviewCount} reviews)</Text>
                                </View>
                                <Text style={styles.separator}>•</Text>
                                <View style={styles.locationContainer}>
                                    <Icon name="place" size={16} color={theme.colors.textSecondary} />
                                    <Text style={styles.distance}>{mechanic.distance}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {mechanic.socialProof && (
                        <View style={styles.socialProofContainer}>
                            <View style={styles.socialProofItem}>
                                <Text style={styles.socialProofValue}>{mechanic.socialProof.totalCustomers}</Text>
                                <Text style={styles.socialProofLabel}>Customers</Text>
                            </View>
                            <View style={styles.socialProofDivider} />
                            <View style={styles.socialProofItem}>
                                <Text style={styles.socialProofValue}>{mechanic.socialProof.yearsExperience}+</Text>
                                <Text style={styles.socialProofLabel}>Years</Text>
                            </View>
                            <View style={styles.socialProofDivider} />
                            <View style={styles.socialProofItem}>
                                <Text style={styles.socialProofValue}>{mechanic.socialProof.satisfactionRate}%</Text>
                                <Text style={styles.socialProofLabel}>Satisfaction</Text>
                            </View>
                        </View>
                    )}

                    <Text style={styles.description}>{mechanic.description}</Text>
                </ThemeCard>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    {[
                        { icon: 'phone', label: 'Call' },
                        { icon: 'message', label: 'Message' },
                        { icon: 'directions', label: 'Directions' },
                        { icon: 'share', label: 'Share' },
                    ].map(a => (
                        <TouchableOpacity key={a.label} style={styles.quickActionCard}>
                            <Icon name={a.icon} size={22} color={theme.colors.primary} />
                            <Text style={styles.quickActionText}>{a.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Features */}
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

                {/* Services */}
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

                    {filteredServices.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.serviceRow}>
                                <View style={styles.serviceMain}>
                                    <Text style={styles.serviceName}>{item.name}</Text>
                                    {!!item.description && <Text style={styles.serviceDesc}>{item.description}</Text>}
                                </View>
                                <View style={styles.servicePriceWrap}>
                                    <Text style={styles.servicePrice}>{item.price}</Text>
                                    <Text style={styles.serviceDuration}>{item.duration}</Text>
                                </View>
                            </View>
                            {index < filteredServices.length - 1 && <View style={styles.hairline} />}
                        </View>
                    ))}
                </ThemeCard>

                {/* Reviews */}
                <ThemeCard style={styles.sectionCard}>
                    <View style={styles.reviewsHeader}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <View style={styles.reviewsStats}>
                            <Icon name="star" size={18} color={theme.colors.warning} />
                            <Text style={styles.reviewsAverage}>{mechanic.rating}</Text>
                            <Text style={styles.reviewsCount}>• {mechanic.reviewCount} reviews</Text>
                        </View>
                    </View>

                    {(showAllReviews ? mechanic.reviews ?? [] : (mechanic.reviews ?? []).slice(0, 3)).map((item, index, array) => (
                        <View key={item.id}>
                            <View style={styles.reviewRow}>
                                <Image source={{ uri: item.avatar }} style={styles.reviewerAvatar} />
                                <View style={{ flex: 1 }}>
                                    <View style={styles.reviewerHead}>
                                        <Text style={styles.reviewerName}>{item.customerName}</Text>
                                        {item.verified && <Icon name="verified" size={14} color={theme.colors.success} />}
                                    </View>
                                    <Text style={styles.reviewDate}>{item.date}</Text>
                                    <View style={styles.reviewStars}>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Icon
                                                key={i}
                                                name="star"
                                                size={14}
                                                color={i < item.rating ? theme.colors.warning : theme.colors.lighter}
                                            />
                                        ))}
                                    </View>
                                    <Text style={styles.reviewText}>{item.comment}</Text>

                                    <View style={styles.reviewFooter}>
                                        <View style={styles.tag}>
                                            <Text style={styles.tagText}>{item.service}</Text>
                                        </View>

                                        {item.helpful ? (
                                            <TouchableOpacity style={styles.helpful}>
                                                <Icon name="thumb-up" size={14} color={theme.colors.textSecondary} />
                                                <Text style={styles.helpfulText}>Helpful ({item.helpful})</Text>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </View>
                            </View>
                            {index < array.length - 1 && <View style={styles.hairline} />}
                        </View>
                    ))}

                    {mechanic.reviews && mechanic.reviews.length > 3 && (
                        <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)} style={styles.showAll}>
                            <Text style={styles.showAllText}>
                                {showAllReviews ? 'Show less' : `Show all ${mechanic.reviewCount} reviews`}
                            </Text>
                            <Icon name={showAllReviews ? 'expand-less' : 'expand-more'} size={16} color={theme.colors.primary} />
                        </TouchableOpacity>
                    )}
                </ThemeCard>

                {/* Gallery */}
                <ThemeCard style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Photo Gallery</Text>
                    <ScrollView horizontal style={{ paddingRight: theme.spacing.xl }}>
                        <View style={{ flexDirection: 'row', gap: theme.spacing.lg }}>
                            {(mechanic.gallery ?? []).map((item, index) => (
                                <TouchableOpacity key={item.id} onPress={() => setSelectedImageIndex(index)}>
                                    <Image source={{ uri: item.url }} style={styles.galleryImage} />
                                    {item.caption ? <Text style={styles.galleryCaption}>{item.caption}</Text> : null}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </ThemeCard>

                <View style={{ height: 110 }} />
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomActions}>
                <View style={{ flex: 1 }}>
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

    // Card base -> FLAT (no border)
    themeCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        marginHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
    },

    // Hero
    heroContainer: { position: 'relative', height: 260, marginBottom: theme.spacing.md },
    coverImage: { width: '100%', height: '100%', borderBottomLeftRadius: theme.borderRadius.xl, borderBottomRightRadius: theme.borderRadius.xl },
    heroOverlay: { position: 'absolute', inset: 0, justifyContent: 'space-between', padding: theme.spacing.xl },
    badgesContainer: { flexDirection: 'row', gap: theme.spacing.sm },
    heroBadge: { backgroundColor: theme.colors.white, paddingHorizontal: theme.spacing.md, paddingVertical: 6, borderRadius: theme.borderRadius.round },
    heroBadgeText: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.caption, fontWeight: theme.typography?.weights.medium },

    // Status pill
    statusBadge: {
        alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', gap: 8,
        backgroundColor: theme.colors.white, paddingHorizontal: theme.spacing.md, paddingVertical: 8, borderRadius: 999,
    },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    openDot: { backgroundColor: theme.colors.success }, closedDot: { backgroundColor: theme.colors.error },
    statusText: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.medium },
    statusSubtext: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },

    // Main
    mainInfoCard: { marginTop: 0 },
    mechanicHeader: { marginBottom: theme.spacing.md },
    mechanicTitleSection: { marginBottom: theme.spacing.sm },
    mechanicName: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.heading, fontWeight: theme.typography?.weights.semibold },
    mechanicMetaRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    rating: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold },
    reviewCount: { color: theme.colors.textSecondary },
    separator: { color: theme.colors.textSecondary },
    locationContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    distance: { color: theme.colors.textSecondary },

    socialProofContainer: {
        flexDirection: 'row', justifyContent: 'space-around', paddingVertical: theme.spacing.lg,
        borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.lightest, marginVertical: theme.spacing.lg,
    },
    socialProofItem: { alignItems: 'center' },
    socialProofValue: { color: theme.colors.primary, fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.title },
    socialProofLabel: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },
    socialProofDivider: { width: 1, height: 34, backgroundColor: theme.colors.lightest },

    description: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.bodyLarge },

    // Quick actions
    quickActionsContainer: { flexDirection: 'row', gap: theme.spacing.md, paddingHorizontal: theme.spacing.xl, marginBottom: theme.spacing.md },
    quickActionCard: {
        flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: theme.spacing.lg,
        backgroundColor: `${theme.colors.primary}0D`, borderRadius: theme.borderRadius.xl,
    },
    quickActionText: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.medium, marginTop: 6 },

    // Sections
    sectionCard: { marginTop: 0 },
    sectionTitle: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.titleLarge, marginBottom: theme.spacing.lg },

    featuresGrid: { gap: theme.spacing.md },
    featureItem: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
    featureText: { color: theme.colors.textPrimary, fontSize: theme.typography?.sizes.bodyLarge },

    servicesHeader: { marginBottom: theme.spacing.md },
    servicesSubtitle: { color: theme.colors.textSecondary },
    categoryFilters: { marginBottom: theme.spacing.lg },
    categoryPill: {
        paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, marginRight: theme.spacing.md,
        backgroundColor: theme.colors.lightest, borderRadius: 999,
    },
    categoryPillActive: { backgroundColor: theme.colors.primary },
    categoryPillText: { color: theme.colors.textSecondary, fontWeight: theme.typography?.weights.medium },
    categoryPillTextActive: { color: '#fff' },

    serviceRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: theme.spacing.md },
    serviceMain: { flex: 1, marginRight: theme.spacing.md },
    serviceName: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold },
    serviceDesc: { color: theme.colors.textSecondary, marginTop: 2 },
    servicePriceWrap: { alignItems: 'flex-end' },
    servicePrice: { color: theme.colors.primary, fontWeight: theme.typography?.weights.semibold },
    serviceDuration: { color: theme.colors.textSecondary, marginTop: 2 },
    hairline: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.lightest },

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

    galleryImage: { width: 200, height: 140, borderRadius: theme.borderRadius.lg },
    galleryCaption: { marginTop: 6, color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.caption },

    bottomActions: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        padding: theme.spacing.xl, backgroundColor: theme.colors.white,
        borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.lightest,
    },
    priceLabel: { color: theme.colors.textSecondary, fontSize: theme.typography?.sizes.body },
    priceValue: { color: theme.colors.textPrimary, fontWeight: theme.typography?.weights.semibold, fontSize: theme.typography?.sizes.titleLarge },
    bookBtn: { borderRadius: 24, minWidth: 160, marginLeft: theme.spacing.xl },

    // Error state styles
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    errorTitle: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
    },
    errorSubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    backButton: {
        marginTop: theme.spacing.lg,
    },

    // Status badge styles
    openBadge: {
        backgroundColor: `${theme.colors.success}15`,
    },
    closedBadge: {
        backgroundColor: `${theme.colors.error}15`,
    },
    statusTextContainer: {
        flexDirection: 'column',
    },
    openText: {
        color: theme.colors.success,
    },
    closedText: {
        color: theme.colors.error,
    },

    // Service card styles
    serviceContainer: {
        marginBottom: theme.spacing.sm,
    },
    serviceItem: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    serviceMainInfo: {
        flex: 1,
        marginRight: theme.spacing.md,
    },
    serviceDescription: {
        color: theme.colors.textSecondary,
        fontSize: theme.typography?.sizes.body,
        marginTop: 4,
    },
    servicePricing: {
        alignItems: 'flex-end',
    },
    serviceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    popularityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    popularityText: {
        color: theme.colors.success,
        fontSize: theme.typography?.sizes.caption,
    },
    categoryChip: {
        backgroundColor: theme.colors.lightest,
    },
    categoryChipText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },

    // Review card styles
    reviewCard: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.sm,
    },
    reviewHeader: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
    },
    reviewerInfo: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    reviewerNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    reviewRating: {
        flexDirection: 'row',
        gap: 2,
        marginTop: 4,
    },
    reviewComment: {
        color: theme.colors.textPrimary,
        fontSize: theme.typography?.sizes.body,
        marginBottom: theme.spacing.sm,
    },
    serviceChip: {
        backgroundColor: theme.colors.lightest,
    },
    serviceChipText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },
    helpfulButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: theme.spacing.sm,
    },
});