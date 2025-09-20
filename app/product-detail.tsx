// app/product-detail.jsx — Modern, simpler design
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Chip, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from './(tabs)/theme';

// Mock product data (unchanged)
const productData = {
  1: {
    id: 1,
    name: 'Continental PremiumContact 6 Tire - 205/55R16',
    price: '150',
    originalPrice: '180',
    rating: 4.8,
    reviewCount: 245,
    images: [
      'https://images.pexels.com/photos/29255737/pexels-photo-29255737.jpeg',
      'https://images.pexels.com/photos/5640644/pexels-photo-5640644.jpeg',
      'https://images.pexels.com/photos/6156594/pexels-photo-6156594.jpeg',
    ],
    description:
      'PremiumContact 6 by Continental offers exceptional performance, safety, and comfort for your vehicle. Engineered with advanced technology, this tire provides superior grip on both wet and dry roads, ensuring a smooth and quiet ride. Its innovative tread design enhances handling and braking efficiency, making it an ideal choice for everyday driving.',
    features: [
      'Iridium-tipped for enhanced durability',
      'Improved ignition performance',
      'Better fuel efficiency',
      'Longer service intervals',
      'OE-fitment for various car models',
    ],
    specifications: {
      Size: '205/55R16',
      Type: 'All-Season',
      SpeedRating: 'V (up to 149 mph)',
      LoadIndex: '91 (up to 615 kg)',
      Gap: '0.8mm',
      Quantity: '4 pieces',
    },
    compatibility: ['Toyota Corolla 2017-2024', 'Honda Civic 2016-2024', 'Mazda 3 2019-2024'],
    seller: {
      name: 'AutoParts Ghana',
      isVerified: true,
      rating: 4.9,
      location: 'Accra, Ghana',
    },
    inStock: true,
    quantity: 15,
    shippingInfo: 'Free delivery in Accra • 2-3 days delivery',
    warranty: '12 months manufacturer warranty',
  },
  2: {
    id: 2,
    name: 'Bosch Air Filter',
    price: '220',
    originalPrice: '250',
    rating: 4.9,
    reviewCount: 132,
    images: ['https://images.pexels.com/photos/33247260/pexels-photo-33247260.jpeg', 'https://images.pexels.com/photos/29255737/pexels-photo-29255737.jpeg'],
    description:
      'High-performance Bosch air filter for improved engine efficiency and longevity. Traps dust and harmful particles while ensuring optimal airflow to your engine.',
    features: [
      'Multi-layer filtration technology',
      'High dust holding capacity',
      'Optimal airflow design',
      'Easy installation',
      'OE-quality materials',
    ],
    specifications: {
      'Filter Type': 'Panel',
      Material: 'Pleated paper',
      Dimensions: '245 x 190 x 30mm',
      Efficiency: '99.5%',
    },
    compatibility: ['Toyota Camry 2018-2024', 'Lexus ES 2019-2024'],
    seller: {
      name: 'Bosch Official Store',
      isVerified: true,
      rating: 4.8,
      location: 'Kumasi, Ghana',
    },
    inStock: true,
    quantity: 8,
    shippingInfo: 'Free delivery nationwide • 1-2 days delivery',
    warranty: '24 months manufacturer warranty',
  },
};

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const product = productData[productId as unknown as keyof typeof productData];
  const discountPct = useMemo(() => {
    if (!product?.originalPrice) return null;
    const o = parseFloat(product.originalPrice);
    const p = parseFloat(product.price);
    if (!o || !p) return null;
    return Math.round(((o - p) / o) * 100);
  }, [product]);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorWrap}>
          <Icon name="error" size={64} color={theme.colors.error} />
          <Text style={styles.errorTitle}>Product Not Found</Text>
          <Text style={styles.errorText}>The product you’re looking for could not be found.</Text>
          <Button mode="contained" onPress={() => router.push('/(tabs)/marketplace')} style={{ marginTop: theme.spacing.md }}>
            Back to Marketplace
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `${qty}x ${product.name} added to your cart.`, [
      { text: 'Continue Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => console.log('Navigate to cart') },
    ]);
  };

  const handleBuyNow = () =>
    Alert.alert(
      'Proceed to Checkout',
      `Ready to purchase ${qty}x ${product.name} for GH₵${(parseFloat(product.price) * qty).toFixed(2)}?`,
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Checkout', onPress: () => console.log('Go to checkout') }]
    );

  const renderThumb = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity onPress={() => setSelectedImageIndex(index)} activeOpacity={0.85}>
      <Image source={{ uri: item }} style={[styles.thumb, index === selectedImageIndex && styles.thumbActive]} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={styles.heroWrap}>
          <ImageBackground source={{ uri: product.images[selectedImageIndex] }} style={styles.hero} imageStyle={styles.heroRadius}>
            <View style={styles.heroTopRow}>
              <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                <Icon name="arrow-back" size={20} color={theme.colors.textPrimary} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="share" size={20} color={theme.colors.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Icon name="favorite-border" size={20} color={theme.colors.textPrimary} />
                </TouchableOpacity>
              </View>
            </View>

            {!!discountPct && (
              <View style={styles.discountPill}>
                <Text style={styles.discountPillText}>{discountPct}% OFF</Text>
              </View>
            )}

            <View style={styles.stockPill}>
              <Text style={[styles.stockText, product.inStock ? styles.inStock : styles.outOfStock]}>
                {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
              </Text>
            </View>
          </ImageBackground>

          {/* Thumbs */}
          {product.images.length > 1 && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={product.images}
              keyExtractor={(_, i) => String(i)}
              renderItem={renderThumb}
              contentContainerStyle={styles.thumbList}
            />
          )}
        </View>

        {/* TITLE + PRICE */}
        <View style={styles.card}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.priceRow}>
            <View style={styles.priceBlock}>
              <Text style={styles.price}>GH₵{product.price}</Text>
              {product.originalPrice ? <Text style={styles.priceStrike}>GH₵{product.originalPrice}</Text> : null}
            </View>

            <View style={styles.ratingRow}>
              <Icon name="star" size={18} color={theme.colors.warning} />
              <Text style={styles.ratingVal}>{product.rating}</Text>
              <Text style={styles.ratingCount}>({product.reviewCount})</Text>
            </View>
          </View>

          {!!product.shippingInfo && <Text style={styles.shipping}>{product.shippingInfo}</Text>}
        </View>

        {/* QUANTITY */}
        <View style={[styles.card, styles.rowBetween]}>
          <Text style={styles.label}>Quantity</Text>
          <View style={styles.qtyWrap}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
              <Icon name="remove" size={18} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyVal}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.min(product.quantity, qty + 1))}>
              <Icon name="add" size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SELLER */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.muted}>Sold by</Text>
              {product.seller.isVerified && (
                <View style={styles.verified}>
                  <Icon name="verified" size={14} color={theme.colors.success} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
            <View style={styles.rowMid}>
              <Icon name="star" size={16} color={theme.colors.warning} />
              <Text style={styles.smallText}>{product.seller.rating}</Text>
            </View>
          </View>

          <Text style={styles.sellerName}>{product.seller.name}</Text>
          <View style={styles.rowMid}>
            <Icon name="place" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.smallMuted}>{product.seller.location}</Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>{product.description}</Text>
        </View>

        {/* FEATURES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {product.features.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Icon name="check-circle" size={16} color={theme.colors.success} />
              <Text style={styles.body}>{f}</Text>
            </View>
          ))}
        </View>

        {/* SPECS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          {Object.entries(product.specifications).map(([k, v], i, arr) => (
            <View key={i}>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>{k}</Text>
                <Text style={styles.specVal}>{String(v)}</Text>
              </View>
              {i < arr.length - 1 && <Divider style={{ backgroundColor: theme.colors.lightest }} />}
            </View>
          ))}
        </View>

        {/* COMPATIBILITY */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Vehicle Compatibility</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {product.compatibility.map((c, i) => (
              <Chip key={i} mode="outlined" style={styles.compChip} textStyle={{ fontSize: 12 }}>
                {c}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* WARRANTY */}
        <View style={styles.cardRow}>
          <Icon name="shield" size={20} color={theme.colors.primary} />
          <Text style={[styles.body, { fontWeight: theme.fontWeight.medium }]}>{product.warranty}</Text>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* STICKY BOTTOM */}
      <View style={styles.bottomBar}>
        <Button mode="outlined" onPress={handleAddToCart} style={styles.outlinedBtn} disabled={!product.inStock}>
          Add to Cart
        </Button>
        <Button mode="contained" onPress={handleBuyNow} style={styles.ctaBtn} disabled={!product.inStock}>
          Buy Now
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { flex: 1 },

  // Hero
  heroWrap: { backgroundColor: theme.colors.surface },
  hero: {
    height: 320,
    justifyContent: 'space-between',
  },
  heroRadius: {
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  heroTopRow: {
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBtn: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    padding: 8,
    borderRadius: 999,
    ...theme.shadows.soft,
  },
  discountPill: {
    position: 'absolute',
    left: theme.spacing.md,
    bottom: theme.spacing.md,
    backgroundColor: theme.colors.error,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  discountPillText: { color: '#fff', fontWeight: theme.fontWeight.semibold, fontSize: theme.fontSize.xs },
  stockPill: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.md,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    ...theme.shadows.soft,
  },
  stockText: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.medium },
  inStock: { color: theme.colors.success },
  outOfStock: { color: theme.colors.error },

  thumbList: { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, gap: 8 },
  thumb: {
    width: 62,
    height: 62,
    borderRadius: theme.borderRadius.md,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.colors.lightest,
  },
  thumbActive: { borderColor: theme.colors.primary, borderWidth: 2 },

  // Cards
  card: {
    backgroundColor: theme.colors.card,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.small,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.card,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.small,
  },

  // Title & price
  title: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.bold, fontSize: theme.fontSize.lg, marginBottom: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  priceBlock: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: { color: theme.colors.primary, fontWeight: theme.fontWeight.bold, fontSize: theme.fontSize.xl },
  priceStrike: { color: theme.colors.textSecondary, textDecorationLine: 'line-through' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingVal: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold },
  ratingCount: { color: theme.colors.textSecondary },

  shipping: { color: theme.colors.success, fontWeight: theme.fontWeight.medium, marginTop: 2 },

  // Quantity
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold },
  qtyWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyVal: { minWidth: 24, textAlign: 'center', color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium },

  // Seller
  muted: { color: theme.colors.textSecondary, fontSize: theme.fontSize.sm },
  rowMid: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  smallText: { color: theme.colors.textPrimary, fontSize: theme.fontSize.sm },
  smallMuted: { color: theme.colors.textSecondary, fontSize: theme.fontSize.sm },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${theme.colors.success}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  verifiedText: { color: theme.colors.success, fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.semibold },
  sellerName: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold, marginVertical: 6 },

  // Sections
  sectionTitle: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.semibold, marginBottom: 8 },
  body: { color: theme.colors.textPrimary, lineHeight: 22 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },

  specRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  specKey: { color: theme.colors.textSecondary, flex: 1, paddingRight: 10 },
  specVal: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.medium, flex: 1, textAlign: 'right' },

  compChip: { backgroundColor: theme.colors.surface, borderColor: theme.colors.lightest },

  // Sticky bottom bar
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.lightest,
    ...theme.shadows.large,
  },
  outlinedBtn: { flex: 1, backgroundColor: theme.colors.white, borderRadius: 14 },
  ctaBtn: { flex: 1, borderRadius: 14 },

  // Error
  errorWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xl },
  errorTitle: { color: theme.colors.textPrimary, fontWeight: theme.fontWeight.bold, fontSize: theme.fontSize.lg, marginTop: theme.spacing.md },
  errorText: { color: theme.colors.textSecondary, textAlign: 'center', marginTop: theme.spacing.sm },
});
