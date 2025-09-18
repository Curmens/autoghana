// app/mechanic-profile.tsx - Complete Theme-inspired mechanic profile
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ListRenderItem,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, Chip, Divider, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

const { width } = Dimensions.get('window');

// Mock comprehensive mechanic data
const mechanicData: Record<string, any> = {
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

    const mechanic = mechanicData[mechanicId as string];

    if (!mechanic) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Icon name="error" size={64} color={theme.colors.error} />
                    <Text style={styles.errorTitle}>Mechanic Not Found</Text>
                    <Text style={styles.errorSubtitle}>
                        The mechanic profile you're looking for could not be found.
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
    const serviceCategories = ['All', ...Array.from(new Set(mechanic.services?.map((s: any) => s.category) || []))];

    // Filter services by category
    const filteredServices = selectedServiceCategory === 'All'
        ? mechanic.services
        : mechanic.services?.filter((s: any) => s.category === selectedServiceCategory);

    const ThemeCard = ({ children, style = {}, shadow = 'soft' }: any) => (
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

    const ServiceCard = ({ service }: { service: any }) => (
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

                {service.popularity && (
                    <View style={styles.serviceFooter}>
                        <View style={styles.popularityContainer}>
                            <Icon name="trending-up" size={14} color={theme.colors.success} />
                            <Text style={styles.popularityText}>{service.popularity}% customer satisfaction</Text>
                        </View>
                        <Chip mode="outlined" style={styles.categoryChip} textStyle={styles.categoryChipText}>
                            {service.category}
                        </Chip>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    const ReviewCard = ({ review }: { review: any }) => (
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

                {review.helpful > 0 && (
                    <TouchableOpacity style={styles.helpfulButton}>
                        <Icon name="thumb-up" size={14} color={theme.colors.textSecondary} />
                        <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const GalleryImage = ({ item, index }: { item: any; index: number }) => (
        <TouchableOpacity
            style={styles.galleryImageContainer}
            onPress={() => setSelectedImageIndex(index)}
        >
            <Image source={{ uri: item.url }} style={styles.galleryImage} />
            {item.caption && (
                <View style={styles.galleryCaption}>
                    <Text style={styles.galleryCaptionText}>{item.caption}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    const renderServiceItem: ListRenderItem<any> = ({ item }) => <ServiceCard service={item} />;
    const renderReviewItem: ListRenderItem<any> = ({ item }) => <ReviewCard review={item} />;
    const renderGalleryItem: ListRenderItem<any> = ({ item, index }) => <GalleryImage item={item} index={index} />;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: mechanic.gallery?.[selectedImageIndex]?.url || mechanic.coverImage }}
                        style={styles.coverImage}
                    />

                    {/* Overlay Content */}
                    <View style={styles.heroOverlay}>
                        {/* Badges */}
                        <View style={styles.badgesContainer}>
                            {mechanic.badges?.slice(0, 2).map((badge: string, index: number) => (
                                <View key={index} style={styles.heroBadge}>
                                    <Text style={styles.heroBadgeText}>{badge}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Status Badge */}
                        <StatusBadge />
                    </View>
                </View>

                {/* Main Info Card */}
                <ThemeCard style={styles.mainInfoCard} shadow="medium">
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

                    {/* Social Proof Stats */}
                    {mechanic.socialProof && (
                        <View style={styles.socialProofContainer}>
                            <View style={styles.socialProofItem}>
                                <Text style={styles.socialProofValue}>{mechanic.socialProof.totalCustomers}</Text>
                                <Text style={styles.socialProofLabel}>Customers Served</Text>
                            </View>

                            <View style={styles.socialProofDivider} />

                            <View style={styles.socialProofItem}>
                                <Text style={styles.socialProofValue}>{mechanic.socialProof.yearsExperience}+</Text>
                                <Text style={styles.socialProofLabel}>Years Experience</Text>
                            </View>

                            <View style={styles.socialProofDivider} />

                            <View style={styles.socialProofItem}>
                                <Text style={styles.socialProofValue}>{mechanic.socialProof.satisfactionRate}%</Text>
                                <Text style={styles.socialProofLabel}>Satisfaction Rate</Text>
                            </View>
                        </View>
                    )}

                    <Text style={styles.description}>{mechanic.description}</Text>
                </ThemeCard>

                {/* Quick Contact Actions */}
                <View style={styles.quickActionsContainer}>
                    <TouchableOpacity style={styles.quickActionCard}>
                        <Icon name="phone" size={24} color={theme.colors.primary} />
                        <Text style={styles.quickActionText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionCard}>
                        <Icon name="message" size={24} color={theme.colors.primary} />
                        <Text style={styles.quickActionText}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionCard}>
                        <Icon name="directions" size={24} color={theme.colors.primary} />
                        <Text style={styles.quickActionText}>Directions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionCard}>
                        <Icon name="share" size={24} color={theme.colors.primary} />
                        <Text style={styles.quickActionText}>Share</Text>
                    </TouchableOpacity>
                </View>

                {/* Features & Amenities */}
                <ThemeCard style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>What this place offers</Text>

                    <View style={styles.featuresGrid}>
                        {mechanic.features?.map((feature: string, index: number) => (
                            <View key={index} style={styles.featureItem}>
                                <Icon name="check-circle" size={20} color={theme.colors.success} />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>
                </ThemeCard>

                {/* Services & Pricing */}
                <ThemeCard style={styles.sectionCard}>
                    <View style={styles.servicesHeader}>
                        <Text style={styles.sectionTitle}>Services & Pricing</Text>
                        <Text style={styles.servicesSubtitle}>Professional automotive services</Text>
                    </View>

                    {/* Service Category Filter */}
                    {serviceCategories.length > 1 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
                            {serviceCategories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.categoryFilter,
                                        selectedServiceCategory === category && styles.categoryFilterActive
                                    ]}
                                    onPress={() => setSelectedServiceCategory(category)}
                                >
                                    <Text style={[
                                        styles.categoryFilterText,
                                        selectedServiceCategory === category && styles.categoryFilterTextActive
                                    ]}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}

                    <FlatList
                        data={filteredServices}
                        renderItem={renderServiceItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <Divider style={styles.serviceDivider} />}
                    />
                </ThemeCard>

                {/* Reviews Section */}
                <ThemeCard style={styles.sectionCard}>
                    <View style={styles.reviewsHeader}>
                        <View style={styles.reviewsHeaderMain}>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            <View style={styles.reviewsStats}>
                                <Icon name="star" size={18} color={theme.colors.warning} />
                                <Text style={styles.reviewsAverage}>{mechanic.rating}</Text>
                                <Text style={styles.reviewsCount}>• {mechanic.reviewCount} reviews</Text>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        data={showAllReviews ? mechanic.reviews : mechanic.reviews?.slice(0, 3)}
                        renderItem={renderReviewItem}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.reviewSeparator} />}
                    />

                    {mechanic.reviews?.length > 3 && (
                        <TouchableOpacity
                            style={styles.showAllReviews}
                            onPress={() => setShowAllReviews(!showAllReviews)}
                        >
                            <Text style={styles.showAllReviewsText}>
                                {showAllReviews ? 'Show less' : `Show all ${mechanic.reviewCount} reviews`}
                            </Text>
                            <Icon
                                name={showAllReviews ? "expand-less" : "expand-more"}
                                size={16}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>
                    )}
                </ThemeCard>

                {/* Gallery */}
                <ThemeCard style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Photo Gallery</Text>
                    <FlatList
                        data={mechanic.gallery}
                        renderItem={renderGalleryItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.galleryList}
                    />
                </ThemeCard>

                {/* Contact Information */}
                <ThemeCard style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Contact & Location</Text>

                    <View style={styles.contactList}>
                        <TouchableOpacity style={styles.contactItem}>
                            <Icon name="phone" size={20} color={theme.colors.primary} />
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Phone</Text>
                                <Text style={styles.contactValue}>{mechanic.phone}</Text>
                            </View>
                            <Icon name="call" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactItem}>
                            <Icon name="email" size={20} color={theme.colors.primary} />
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Email</Text>
                                <Text style={styles.contactValue}>{mechanic.email}</Text>
                            </View>
                            <Icon name="email" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactItem}>
                            <Icon name="place" size={20} color={theme.colors.primary} />
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Address</Text>
                                <Text style={styles.contactValue}>{mechanic.address}</Text>
                            </View>
                            <Icon name="directions" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>

                        <View style={styles.contactItem}>
                            <Icon name="access-time" size={20} color={theme.colors.primary} />
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Response Time</Text>
                                <Text style={styles.contactValue}>{mechanic.responseTime}</Text>
                            </View>
                        </View>
                    </View>
                </ThemeCard>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Fixed Bottom Actions */}
            <View style={styles.bottomActions}>
                <View style={styles.priceInfo}>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.priceValue}>{mechanic.averagePrice || 'GH₵80'}</Text>
                </View>

                <Button
                    mode="contained"
                    onPress={() => router.push('/service-booking')}
                    style={styles.bookButton}
                    contentStyle={styles.bookButtonContent}
                >
                    Book Service
                </Button>
            </View>

            {/* Floating Action Button for Quick Contact */}
            <FAB
                style={styles.fab}
                icon="phone"
                onPress={() => console.log('Quick call')}
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
        flex: 1,
    },

    // Error State
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    errorTitle: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
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

    // Card Base
    themeCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        padding: theme.spacing.xl,
        marginHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
    },

    // Hero Section
    heroContainer: {
        position: 'relative',
        height: 280,
        marginBottom: theme.spacing.lg,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: theme.spacing.xl,
    },
    badgesContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        flexWrap: 'wrap',
    },
    heroBadge: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.round,
        ...theme.shadows.soft,
    },
    heroBadgeText: {
        fontSize: theme.typography?.sizes.caption,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    statusBadge: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.round,
        ...theme.shadows.soft,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    openBadge: {
        backgroundColor: theme.colors.white,
    },
    closedBadge: {
        backgroundColor: theme.colors.white,
    },
    openDot: {
        backgroundColor: theme.colors.success,
    },
    closedDot: {
        backgroundColor: theme.colors.error,
    },
    statusTextContainer: {
        alignItems: 'flex-end',
    },
    statusText: {
        fontSize: theme.typography?.sizes.body,
        fontWeight: theme.typography?.weights.semibold,
    },
    openText: {
        color: theme.colors.success,
    },
    closedText: {
        color: theme.colors.error,
    },
    statusSubtext: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },

    // Main Info Card
    mainInfoCard: {
        marginTop: 0,
    },
    mechanicHeader: {
        marginBottom: theme.spacing.xl,
    },
    mechanicTitleSection: {
        marginBottom: theme.spacing.lg,
    },
    mechanicName: {
        fontSize: theme.typography?.sizes.heading,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    mechanicMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    rating: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    reviewCount: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    separator: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    distance: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },

    // Social Proof
    socialProofContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.lightest,
    },
    socialProofItem: {
        alignItems: 'center',
    },
    socialProofValue: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    socialProofLabel: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    socialProofDivider: {
        width: 1,
        height: 40,
        backgroundColor: theme.colors.lightest,
    },
    description: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textPrimary,
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.bodyLarge,
    },

    // Quick Actions
    quickActionsContainer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    quickActionCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.lg,
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
        gap: theme.spacing.sm,
        ...theme.shadows.soft,
    },
    quickActionText: {
        fontSize: theme.typography?.sizes.body,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textPrimary,
    },

    // Section Styles
    sectionCard: {
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xl,
    },

    // Features Grid
    featuresGrid: {
        gap: theme.spacing.lg,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.lg,
    },
    featureText: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textPrimary,
        fontWeight: theme.typography?.weights.medium,
    },

    // Services Section
    servicesHeader: {
        marginBottom: theme.spacing.xl,
    },
    servicesSubtitle: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
    },
    categoryFilters: {
        marginBottom: theme.spacing.xl,
    },
    categoryFilter: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        marginRight: theme.spacing.md,
        backgroundColor: theme.colors.lightest,
        borderRadius: theme.borderRadius.round,
        borderWidth: 1,
        borderColor: theme.colors.lighter,
    },
    categoryFilterActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    categoryFilterText: {
        fontSize: theme.typography?.sizes.body,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textSecondary,
    },
    categoryFilterTextActive: {
        color: theme.colors.white,
    },
    serviceContainer: {
        marginVertical: theme.spacing.sm,
    },
    serviceItem: {
        paddingVertical: theme.spacing.lg,
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
    },
    serviceMainInfo: {
        flex: 1,
        marginRight: theme.spacing.lg,
    },
    serviceName: {
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    serviceDescription: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.body,
    },
    servicePricing: {
        alignItems: 'flex-end',
    },
    servicePrice: {
        fontSize: theme.typography?.sizes.title,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    serviceDuration: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    serviceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    popularityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    popularityText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.success,
        fontWeight: theme.typography?.weights.medium,
    },
    categoryChip: {
        height: 28,
        backgroundColor: theme.colors.lightest,
    },
    categoryChipText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },
    serviceDivider: {
        backgroundColor: theme.colors.lighter,
        marginVertical: theme.spacing.lg,
    },

    // Reviews Section
    reviewsHeader: {
        marginBottom: theme.spacing.xl,
    },
    reviewsHeaderMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    reviewsStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    reviewsAverage: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    reviewsCount: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
    },
    reviewCard: {
        paddingVertical: theme.spacing.lg,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
    },
    reviewerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: theme.spacing.lg,
    },
    reviewerInfo: {
        flex: 1,
    },
    reviewerNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.xs,
    },
    reviewerName: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    reviewDate: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    reviewRating: {
        flexDirection: 'row',
        gap: theme.spacing.xs,
    },
    reviewComment: {
        fontSize: theme.typography?.sizes.bodyLarge,
        color: theme.colors.textPrimary,
        lineHeight: theme.typography?.lineHeights.normal * theme.typography?.sizes.bodyLarge,
        marginBottom: theme.spacing.lg,
    },
    reviewFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceChip: {
        height: 28,
        backgroundColor: theme.colors.lightest,
    },
    serviceChipText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },
    helpfulButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    helpfulText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.textSecondary,
    },
    reviewSeparator: {
        height: 1,
        backgroundColor: theme.colors.lighter,
        marginVertical: theme.spacing.lg,
    },
    showAllReviews: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.lighter,
    },
    showAllReviewsText: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.primary,
    },

    // Gallery
    galleryList: {
        gap: theme.spacing.lg,
        paddingRight: theme.spacing.xl,
    },
    galleryImageContainer: {
        position: 'relative',
    },
    galleryImage: {
        width: 200,
        height: 150,
        borderRadius: theme.borderRadius.lg,
    },
    galleryCaption: {
        position: 'absolute',
        bottom: theme.spacing.md,
        left: theme.spacing.md,
        right: theme.spacing.md,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
    },
    galleryCaptionText: {
        fontSize: theme.typography?.sizes.caption,
        color: theme.colors.white,
        fontWeight: theme.typography?.weights.medium,
    },

    // Contact Information
    contactList: {
        gap: theme.spacing.xl,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.lg,
    },
    contactInfo: {
        flex: 1,
    },
    contactLabel: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    contactValue: {
        fontSize: theme.typography?.sizes.bodyLarge,
        fontWeight: theme.typography?.weights.medium,
        color: theme.colors.textPrimary,
    },

    // Bottom Actions
    bottomSpacing: {
        height: 100,
    },
    bottomActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: theme.colors.lighter,
        ...theme.shadows.large,
    },
    priceInfo: {
        flex: 1,
    },
    priceLabel: {
        fontSize: theme.typography?.sizes.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    priceValue: {
        fontSize: theme.typography?.sizes.titleLarge,
        fontWeight: theme.typography?.weights.semibold,
        color: theme.colors.textPrimary,
    },
    bookButton: {
        flex: 1,
        marginLeft: theme.spacing.xl,
        borderRadius: theme.borderRadius.xl,
    },
    bookButtonContent: {
        paddingVertical: theme.spacing.md,
    },

    // Floating Action Button
    fab: {
        position: 'absolute',
        margin: theme.spacing.xl,
        right: 0,
        bottom: 100,
        backgroundColor: theme.colors.secondary,
    },
});