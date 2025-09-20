// app/(tabs)/marketplace.tsx
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Chip, IconButton, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './theme';

type ListRenderItem<T> = ({ item, index }: { item: T; index: number }) => React.ReactElement | null;

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    seller: string;
    category: string;
}

const CATEGORIES = ['All', 'Engine', 'Filters', 'Electrical', 'Tyres', 'Interior'];

export default function MarketplaceScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCat, setActiveCat] = useState('All');
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const products: Product[] = useMemo(() => [
        {
            id: 1,
            name: 'Continental PremiumContact 6 Tire - 205/55R16',
            price: 150,
            originalPrice: 180,
            rating: 4.8,
            reviewCount: 245,
            image: 'https://images.pexels.com/photos/29255737/pexels-photo-29255737.jpeg',
            seller: 'AutoParts Ghana',
            category: 'Tyres',
        },
        {
            id: 2,
            name: 'Bosch Air Filter',
            price: 220,
            originalPrice: 250,
            rating: 4.9,
            reviewCount: 132,
            image: 'https://images.pexels.com/photos/18180571/pexels-photo-18180571.jpeg',
            seller: 'Bosch Official Store',
            category: 'Filters',
        },
        {
            id: 3,
            name: '12V Car Battery 60Ah',
            price: 950,
            rating: 4.7,
            reviewCount: 78,
            image: 'https://media.istockphoto.com/id/1596813342/photo/a-car-mechanic-installs-a-battery-in-a-car-battery-replacement-and-repair.jpg?s=1024x1024&w=is&k=20&c=6l2eA2c9RNEjiVNlADveB16YvKDBJuL23wYzHclb0nQ=',
            seller: 'VoltPro',
            category: 'Electrical',
        },
        {
            id: 4,
            name: 'All-Weather Floor Mats (Set)',
            price: 320,
            originalPrice: 360,
            rating: 4.6,
            reviewCount: 56,
            image: 'https://images.pexels.com/photos/17710774/pexels-photo-17710774.jpeg',
            seller: 'Innen',
            category: 'Interior',
        },
    ], []);

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return products.filter(p => {
            const matchCat = activeCat === 'All' || p.category === activeCat;
            const matchQ = !q || p.name.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q);
            return matchCat && matchQ;
        });
    }, [activeCat, searchQuery, products]);

    const toggleFav = (id: number) =>
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));

    const renderHeader = () => (
        <View>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.userSection}>
                        <Text style={styles.greeting}>Marketplace</Text>
                        <Text style={styles.location}>Accra, Greater Accra • 29°C ☀️</Text>
                    </View>

                    <View style={styles.headerActions}>
                        <IconButton
                            icon="shopping-cart"
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

                {/* Search Bar */}
                <View style={styles.searchSection}>
                    <Searchbar
                        placeholder="Search services, parts, or mechanics..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        iconColor={theme.colors.textSecondary}
                    />
                </View>
            </View>

            {/* Category Chips */}
            <View style={styles.chipsRow}>
                {CATEGORIES.map(cat => (
                    <Chip
                        key={cat}
                        mode={activeCat === cat ? 'flat' : 'outlined'}
                        selected={activeCat === cat}
                        onPress={() => setActiveCat(cat)}
                        style={[
                            styles.chip,
                            activeCat === cat ? styles.chipActive : styles.chipInactive,
                        ]}
                        textStyle={[
                            styles.chipText,
                            activeCat === cat ? styles.chipTextActive : styles.chipTextInactive,
                        ]}
                    >
                        {cat}
                    </Chip>
                ))}
            </View>
        </View>
    );

    const renderProductItem = ({ item, index }: { item: Product; index: number }) => {
        const fav = !!favorites[item.id];
        const hasDiscount = item.originalPrice && item.originalPrice > item.price;
        const discountPct = hasDiscount
            ? Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100)
            : 0;

        return (
            <TouchableOpacity
                style={[styles.cardCol, (index + 1) % 2 === 0 && { marginRight: 0 }]}
                onPress={() => router.push(`/product-detail?productId=${item.id}`)}
                activeOpacity={0.9}
            >
                <Card style={styles.card}>
                    {/* Image */}
                    <View style={styles.imageWrap}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        {/* Favorite */}
                        <TouchableOpacity style={styles.favBtn} onPress={() => toggleFav(item.id)}>
                            <Icon
                                name={fav ? 'favorite' : 'favorite-border'}
                                size={18}
                                color={fav ? '#fff' : theme.colors.text}
                            />
                        </TouchableOpacity>
                        {/* Discount badge */}
                        {hasDiscount && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>-{discountPct}%</Text>
                            </View>
                        )}
                    </View>

                    {/* Content */}
                    <Card.Content style={styles.cardContent}>
                        <Text style={styles.name} numberOfLines={2}>
                            {item.name}
                        </Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.price}>GH₵{item.price.toLocaleString()}</Text>
                            {hasDiscount && (
                                <Text style={styles.originalPrice}>GH₵{item.originalPrice!.toLocaleString()}</Text>
                            )}
                        </View>

                        <View style={styles.metaRow}>
                            <Icon name="star" size={14} color={theme.colors.warning} />
                            <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
                            <Text style={styles.reviews}>({item.reviewCount})</Text>
                            <View style={styles.dot} />
                            <Text style={styles.seller} numberOfLines={1}>
                                {item.seller}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filtered}
                renderItem={({ item, index }: { item: Product; index: number }) => renderProductItem({ item, index })}
                keyExtractor={(item: Product) => String(item.id)}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                ListHeaderComponent={renderHeader}
            />
        </SafeAreaView>
    );
}

/** Styles (grouped like your Garage screen) */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    // Header + search
    header: {
        backgroundColor: theme.colors.white,
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

    // Category chips
    chipsRow: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    chip: {
        height: 32,
        borderRadius: 16,
    },
    chipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    chipInactive: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
    },
    chipText: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.medium,
    },
    chipTextActive: { color: '#fff' },
    chipTextInactive: { color: theme.colors.text },

    // Grid
    listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    cardCol: {
        width: '48%',
        marginRight: '4%',
        marginBottom: theme.spacing.lg,
    },

    // Card
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.small,
    },
    imageWrap: {
        width: '100%',
        aspectRatio: 16 / 10,
        backgroundColor: theme.colors.background,
        position: 'relative',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    favBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        height: 22,
        borderRadius: 11,
        backgroundColor: theme.colors.success,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.semibold,
    },
    cardContent: {
        padding: theme.spacing.sm,
    },
    name: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.text,
        minHeight: 36,
        marginBottom: theme.spacing.xs,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
    },
    price: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.primary,
    },
    originalPrice: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textDecorationLine: 'line-through',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
    },
    reviews: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: theme.colors.border,
        marginHorizontal: 4,
    },
    seller: {
        flex: 1,
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
});
