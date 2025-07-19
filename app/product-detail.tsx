// app/product-detail.jsx
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, Card, Chip, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

const { width } = Dimensions.get('window');

// Mock product data - in a real app, this would be fetched from API
const productData = {
  1: {
    id: 1,
    name: 'NGK Spark Plugs - Set of 4',
    price: '150',
    originalPrice: '180',
    rating: 4.8,
    reviewCount: 245,
    images: [
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300/ff0000',
      'https://via.placeholder.com/400x300/00ff00',
    ],
    description: 'Premium NGK spark plugs designed for optimal engine performance. These iridium-tipped spark plugs provide superior ignition, better fuel economy, and longer service life. Compatible with most 4-cylinder engines.',
    features: [
      'Iridium-tipped electrodes for longer life',
      'Superior ignition performance',
      'Improved fuel economy',
      'Reduced emissions',
      'OEM quality construction'
    ],
    specifications: {
      'Thread Size': '14mm',
      'Thread Reach': '19mm',
      'Heat Range': '6',
      'Gap': '0.8mm',
      'Quantity': '4 pieces'
    },
    compatibility: ['Toyota Camry 2018-2024', 'Honda Accord 2019-2024', 'Nissan Altima 2020-2024'],
    seller: { 
      name: 'AutoParts Ghana', 
      isVerified: true,
      rating: 4.9,
      location: 'Accra, Ghana'
    },
    inStock: true,
    quantity: 15,
    shippingInfo: 'Free delivery in Accra • 2-3 days delivery',
    warranty: '12 months manufacturer warranty'
  },
  2: {
    id: 2,
    name: 'Bosch Air Filter',
    price: '220',
    originalPrice: '250',
    rating: 4.9,
    reviewCount: 132,
    images: [
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300/0000ff',
    ],
    description: 'High-performance Bosch air filter for improved engine efficiency and longevity. Traps dust and harmful particles while ensuring optimal airflow to your engine.',
    features: [
      'Multi-layer filtration technology',
      'High dust holding capacity',
      'Optimal airflow design',
      'Easy installation',
      'OE-quality materials'
    ],
    specifications: {
      'Filter Type': 'Panel',
      'Material': 'Pleated paper',
      'Dimensions': '245 x 190 x 30mm',
      'Efficiency': '99.5%'
    },
    compatibility: ['Toyota Camry 2018-2024', 'Lexus ES 2019-2024'],
    seller: { 
      name: 'Bosch Official Store', 
      isVerified: true,
      rating: 4.8,
      location: 'Kumasi, Ghana'
    },
    inStock: true,
    quantity: 8,
    shippingInfo: 'Free delivery nationwide • 1-2 days delivery',
    warranty: '24 months manufacturer warranty'
  }
};

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = productData[productId as unknown as keyof typeof productData];

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="error" size={64} color={theme.colors.error} />
          <Text style={styles.errorTitle}>Product Not Found</Text>
          <Text style={styles.errorText}>
            The product you're looking for could not be found.
          </Text>
          <Button 
            mode="contained" 
            onPress={() => router.push('/(tabs)/marketplace')}
            style={styles.errorButton}
          >
            Back to Marketplace
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${quantity}x ${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => console.log('Navigate to cart') }
      ]
    );
  };

  const handleBuyNow = () => {
    Alert.alert(
      'Proceed to Checkout',
      `Ready to purchase ${quantity}x ${product.name} for GH₵${(parseFloat(product.price) * quantity).toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Checkout', onPress: () => console.log('Navigate to checkout') }
      ]
    );
  };

  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
      <Image source={{ uri: item }} style={styles.galleryImage} />
    </TouchableOpacity>
  );

  const renderFeatureItem = ({ item }) => (
    <View style={styles.featureItem}>
      <Icon name="check-circle" size={16} color={theme.colors.success} />
      <Text style={styles.featureText}>{item}</Text>
    </View>
  );

  const renderCompatibilityItem = ({ item }) => (
    <Chip mode="outlined" style={styles.compatibilityChip}>
      {item}
    </Chip>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[selectedImageIndex] }} 
            style={styles.mainImage} 
          />
          
          {/* Discount Badge */}
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)}% OFF
              </Text>
            </View>
          )}

          {/* Stock Status */}
          <View style={[styles.stockBadge, product.inStock ? styles.inStockBadge : styles.outOfStockBadge]}>
            <Text style={[styles.stockText, product.inStock ? styles.inStockText : styles.outOfStockText]}>
              {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
            </Text>
          </View>
        </View>

        {/* Image Gallery */}
        {product.images.length > 1 && (
          <View style={styles.galleryContainer}>
            <FlatList
              data={product.images}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryList}
            />
          </View>
        )}

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>GH₵{product.price}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>GH₵{product.originalPrice}</Text>
              )}
            </View>
            
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="#F59E0B" />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.reviewCount})</Text>
            </View>
          </View>

          <Text style={styles.shippingInfo}>{product.shippingInfo}</Text>
        </View>

        {/* Quantity Selector */}
        <Card style={styles.quantityCard}>
          <Card.Content style={styles.quantityContent}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Icon name="remove" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.min(product.quantity, quantity + 1))}
              >
                <Icon name="add" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Seller Info */}
        <Card style={styles.sellerCard}>
          <Card.Content>
            <View style={styles.sellerHeader}>
              <Text style={styles.sellerLabel}>Sold by</Text>
              {product.seller.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Icon name="verified" size={16} color={theme.colors.success} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
            <Text style={styles.sellerName}>{product.seller.name}</Text>
            <View style={styles.sellerStats}>
              <View style={styles.sellerStat}>
                <Icon name="star" size={16} color="#F59E0B" />
                <Text style={styles.sellerRating}>{product.seller.rating}</Text>
              </View>
              <View style={styles.sellerStat}>
                <Icon name="place" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.sellerLocation}>{product.seller.location}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Description */}
        <Card style={styles.sectionCard}>
          <Card.Title title="Description" />
          <Card.Content>
            <Text style={styles.description}>{product.description}</Text>
          </Card.Content>
        </Card>

        {/* Features */}
        <Card style={styles.sectionCard}>
          <Card.Title title="Key Features" />
          <Card.Content>
            <FlatList
              data={product.features}
              renderItem={renderFeatureItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </Card.Content>
        </Card>

        {/* Specifications */}
        <Card style={styles.sectionCard}>
          <Card.Title title="Specifications" />
          <Card.Content>
            {Object.entries(product.specifications).map(([key, value], index) => (
              <View key={index}>
                <View style={styles.specRow}>
                  <Text style={styles.specKey}>{key}</Text>
                  <Text style={styles.specValue}>{String(value)}</Text>
                </View>
                {index < Object.entries(product.specifications).length - 1 && (
                  <Divider style={styles.specDivider} />
                )}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Compatibility */}
        <Card style={styles.sectionCard}>
          <Card.Title title="Vehicle Compatibility" />
          <Card.Content>
            <FlatList
              data={product.compatibility}
              renderItem={renderCompatibilityItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.compatibilityList}
            />
          </Card.Content>
        </Card>

        {/* Warranty Info */}
        <Card style={styles.sectionCard}>
          <Card.Content style={styles.warrantyContent}>
            <Icon name="shield" size={24} color={theme.colors.primary} />
            <Text style={styles.warrantyText}>{product.warranty}</Text>
          </Card.Content>
        </Card>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button
          mode="outlined"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
        <Button
          mode="contained"
          onPress={handleBuyNow}
          style={styles.buyNowButton}
          disabled={!product.inStock}
        >
          Buy Now
        </Button>
      </View>
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
    position: 'relative',
    backgroundColor: theme.colors.surface,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  discountText: {
    color: 'white',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
  },
  stockBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  inStockBadge: {
    backgroundColor: `${theme.colors.success}20`,
  },
  outOfStockBadge: {
    backgroundColor: `${theme.colors.error}20`,
  },
  stockText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  inStockText: {
    color: theme.colors.success,
  },
  outOfStockText: {
    color: theme.colors.error,
  },
  galleryContainer: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
  },
  galleryList: {
    paddingHorizontal: theme.spacing.md,
  },
  galleryImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  productInfo: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  productName: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  price: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  originalPrice: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  rating: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  reviewCount: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  shippingInfo: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.success,
    fontWeight: theme.fontWeight.medium,
  },
  quantityCard: {
    margin: theme.spacing.md,
    marginTop: 0,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  quantityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    minWidth: 24,
    textAlign: 'center',
  },
  sellerCard: {
    margin: theme.spacing.md,
    marginTop: 0,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  sellerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  sellerLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  verifiedText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.success,
  },
  sellerName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  sellerStats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  sellerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  sellerRating: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  sellerLocation: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  sectionCard: {
    margin: theme.spacing.md,
    marginTop: 0,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    flex: 1,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  specKey: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  specValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    flex: 1,
    textAlign: 'right',
  },
  specDivider: {
    backgroundColor: theme.colors.border,
  },
  compatibilityList: {
    gap: theme.spacing.sm,
  },
  compatibilityChip: {
    marginRight: theme.spacing.sm,
  },
  warrantyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  warrantyText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    flex: 1,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
    ...theme.shadows.large,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  buyNowButton: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
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