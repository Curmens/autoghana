// // app/mechanic-profile.jsx
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { router, useLocalSearchParams } from 'expo-router';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Card, Button, Chip, Divider } from 'react-native-paper';
// import { theme } from './(tabs)/theme';

// // Mock mechanic data
// const mechanicData = {
//   'pro-auto': {
//     id: 'pro-auto',
//     name: 'Pro Auto Works',
//     rating: 4.9,
//     reviewCount: 87,
//     distance: '2.1km',
//     image: 'https://via.placeholder.com/400x200',
//     coverImage: 'https://via.placeholder.com/400x200',
//     phone: '+233 24 123 4567',
//     email: 'info@proautoworks.com',
//     address: 'East Legon, Accra',
//     hours: 'Mon-Sat: 8:00 AM - 6:00 PM',
//     isOpen: true,
//     description: 'Professional automotive service center with over 15 years of experience. We specialize in engine diagnostics, brake systems, and general automotive repair.',
//     services: [
//       { name: 'Oil Change', price: 'GH₵120', duration: '30 mins' },
//       { name: 'Brake Repair', price: 'GH₵350', duration: '2 hours' },
//       { name: 'Engine Diagnostics', price: 'GH₵150', duration: '45 mins' },
//       { name: 'AC Service', price: 'GH₵200', duration: '1 hour' },
//       { name: 'Tire Service', price: 'GH₵80', duration: '45 mins' },
//       { name: 'Battery Service', price: 'GH₵250', duration: '30 mins' },
//     ],
//     specialties: ['Engine Repair', 'Brake Service', 'Oil Change', 'Diagnostics'],
//     certifications: ['ASE Certified', 'Bosch Certified', 'Toyota Specialist'],
//     reviews: [
//       {
//         id: 1,
//         customerName: 'Kwame A.',
//         rating: 5,
//         date: '2 days ago',
//         comment: 'Excellent service! Fixed my brake issues quickly and professionally.',
//         service: 'Brake Repair'
//       },
//       {
//         id: 2,
//         customerName: 'Ama S.',
//         rating: 5,
//         date: '1 week ago',
//         comment: 'Very knowledgeable staff. Great diagnostic work on my engine.',
//         service: 'Engine Diagnostics'
//       },
//       {
//         id: 3,
//         customerName: 'John D.',
//         rating: 4,
//         date: '2 weeks ago',
//         comment: 'Good service, fair prices. Will definitely come back.',
//         service: 'Oil Change'
//       }
//     ],
//     gallery: [
//       'https://via.placeholder.com/200x150',
//       'https://via.placeholder.com/200x150/ff0000',
//       'https://via.placeholder.com/200x150/00ff00',
//       'https://via.placeholder.com/200x150/0000ff',
//     ]
//   }
// };

// export default function MechanicProfileScreen() {
//   const { mechanicId } = useLocalSearchParams();
//   const mechanic = mechanicData[mechanicId];

//   if (!mechanic) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.errorContainer}>
//           <Icon name="error" size={64} color={theme.colors.error} />
//           <Text style={styles.errorTitle}>Mechanic Not Found</Text>
//           <Button 
//             mode="contained" 
//             onPress={() => router.back()}
//           >
//             Go Back
//           </Button>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const renderServiceItem = ({ item }) => (
//     <View style={styles.serviceItem}>
//       <View style={styles.serviceInfo}>
//         <Text style={styles.serviceName}>{item.name}</Text>
//         <Text style={styles.serviceDuration}>{item.duration}</Text>
//       </View>
//       <Text style={styles.servicePrice}>{item.price}</Text>
//     </View>
//   );

//   const renderReviewItem = ({ item }) => (
//     <View style={styles.reviewItem}>
//       <View style={styles.reviewHeader}>
//         <View style={styles.reviewerInfo}>
//           <Text style={styles.reviewerName}>{item.customerName}</Text>
//           <Text style={styles.reviewDate}>{item.date}</Text>
//         </View>
//         <View style={styles.reviewRating}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Icon
//               key={star}
//               name="star"
//               size={16}
//               color={star <= item.rating ? '#F59E0B' : '#E5E7EB'}
//             />
//           ))}
//         </View>
//       </View>
//       <Text style={styles.reviewComment}>{item.comment}</Text>
//       <Chip mode="outlined" style={styles.reviewService}>
//         {item.service}
//       </Chip>
//     </View>
//   );

//   const renderGalleryItem = ({ item }) => (
//     <Image source={{ uri: item }} style={styles.galleryImage} />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         {/* Cover Image */}
//         <View style={styles.coverContainer}>
//           <Image source={{ uri: mechanic.coverImage }} style={styles.coverImage} />
//           <View style={[styles.statusBadge, mechanic.isOpen ? styles.openBadge : styles.closedBadge]}>
//             <Text style={[styles.statusText, mechanic.isOpen ? styles.openText : styles.closedText]}>
//               {mechanic.isOpen ? 'Open' : 'Closed'}
//             </Text>
//           </View>
//         </View>

//         {/* Basic Info */}
//         <View style={styles.basicInfo}>
//           <Text style={styles.mechanicName}>{mechanic.name}</Text>
//           <View style={styles.mechanicStats}>
//             <View style={styles.statItem}>
//               <Icon name="star" size={20} color="#F59E0B" />
//               <Text style={styles.rating}>{mechanic.rating}</Text>
//               <Text style={styles.reviewCount}>({mechanic.reviewCount} reviews)</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Icon name="place" size={20} color={theme.colors.textSecondary} />
//               <Text style={styles.distance}>{mechanic.distance} away</Text>
//             </View>
//           </View>
//           <Text style={styles.description}>{mechanic.description}</Text>
//         </View>

//         {/* Contact Info */}
//         <Card style={styles.contactCard}>
//           <Card.Title title="Contact Information" />
//           <Card.Content>
//             <View style={styles.contactItem}>
//               <Icon name="phone" size={20} color={theme.colors.primary} />
//               <Text style={styles.contactText}>{mechanic.phone}</Text>
//               <TouchableOpacity style={styles.contactAction}>
//                 <Icon name="call" size={20} color={theme.colors.primary} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.contactItem}>
//               <Icon name="email" size={20} color={theme.colors.primary} />
//               <Text style={styles.contactText}>{mechanic.email}</Text>
//             </View>
//             <View style={styles.contactItem}>
//               <Icon name="place" size={20} color={theme.colors.primary} />
//               <Text style={styles.contactText}>{mechanic.address}</Text>
//               <TouchableOpacity style={styles.contactAction}>
//                 <Icon name="directions" size={20} color={theme.colors.primary} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.contactItem}>
//               <Icon name="schedule" size={20} color={theme.colors.primary} />
//               <Text style={styles.contactText}>{mechanic.hours}</Text>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Specialties */}
//         <Card style={styles.specialtiesCard}>
//           <Card.Title title="Specialties" />
//           <Card.Content>
//             <View style={styles.specialtiesContainer}>
//               {mechanic.specialties.map((specialty, index) => (
//                 <Chip key={index} mode="outlined" style={styles.specialtyChip}>
//                   {specialty}
//                 </Chip>
//               ))}
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Certifications */}
//         <Card style={styles.certificationsCard}>
//           <Card.Title title="Certifications" />
//           <Card.Content>
//             <View style={styles.certificationsContainer}>
//               {mechanic.certifications.map((cert, index) => (
//                 <View key={index} style={styles.certificationItem}>
//                   <Icon name="verified" size={20} color={theme.colors.success} />
//                   <Text style={styles.certificationText}>{cert}</Text>
//                 </View>
//               ))}
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Services & Pricing */}
//         <Card style={styles.servicesCard}>
//           <Card.Title title="Services & Pricing" />
//           <Card.Content>
//             <FlatList
//               data={mechanic.services}
//               renderItem={renderServiceItem}
//               keyExtractor={(item, index) => index.toString()}
//               scrollEnabled={false}
//               ItemSeparatorComponent={() => <Divider style={styles.serviceDivider} />}
//             />
//           </Card.Content>
//         </Card>

//         {/* Gallery */}
//         <Card style={styles.galleryCard}>
//           <Card.Title title="Gallery" />
//           <Card.Content>
//             <FlatList
//               data={mechanic.gallery}
//               renderItem={renderGalleryItem}
//               keyExtractor={(item, index) => index.toString()}
//               horizontal
//               show