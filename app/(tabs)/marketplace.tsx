// app/(tabs)/marketplace.tsx - Fixed with proper theme usage
import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './theme';

interface Product {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviewCount: number;
    image: string;
    seller: string;
}

export default function MarketplaceScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const products: Product[] = [
        {
            id: 1,
            name: 'NGK Spark Plugs - Set of 4',
            price: '150',
            originalPrice: '180',
            rating: 4.8,
            reviewCount: 245,
            image: 'https://via.placeholder.com/200x150',
            seller: 'AutoParts Ghana',
        },
        {
            id: 2,
            name: 'Bosch Air Filter',
            price: '220',
            originalPrice: '250',
            rating: 4.9,
            reviewCount: 132,
            image: 'https://via.placeholder.com/200x150',
            seller: 'Bosch Official Store',
        },
    ];

    const renderProductItem: ListRenderItem<Product> = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => router.push(`/product-detail?productId=${item.id}`)}
        >
            <Card style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Card.Content style={styles.productContent}>
                    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>GH₵{item.price}</Text>
                        {item.originalPrice && (
                            <Text style={styles.originalPrice}>GH₵{item.originalPrice}</Text>
                        )}
                    </View>
                    <View style={styles.ratingRow}>
                        <Icon name="star" size={16} color={theme.colors.warning} />
                        <Text style={styles.rating}>{item.rating}</Text>
                        <Text style={styles.reviewCount}>({item.reviewCount})</Text>
                    </View>
                    <Text style={styles.seller} numberOfLines={1}>{item.seller}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Marketplace</Text>
            </View>

            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search for parts & accessories"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                />
            </View>

            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.productsList}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
    },
    headerTitle: {
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
    },
    searchContainer: {
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    searchBar: {
        backgroundColor: theme.colors.surface,
        elevation: 0,
    },
    productsList: {
        paddingHorizontal: theme.spacing.md,
    },
    productItem: {
        width: '48%',
        marginRight: '2%',
        marginBottom: theme.spacing.md,
    },
    productCard: {
        backgroundColor: theme.colors.surface,
        ...theme.shadows.small,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: theme.borderRadius.md,
        borderTopRightRadius: theme.borderRadius.md,
    },
    productContent: {
        padding: theme.spacing.sm,
    },
    productName: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        minHeight: 36,
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
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        textDecorationLine: 'line-through',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
    },
    rating: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        color: theme.colors.text,
    },
    reviewCount: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
    seller: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
    },
});