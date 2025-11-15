import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BarDetailScreen = () => {
  const route = useRoute();
  const { bar } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${bar.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${bar.email}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: bar.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.name}>{bar.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.rating}>{bar.rating}</Text>
                <Text style={styles.distance}>• {bar.distance} km</Text>
              </View>
              <Text style={styles.address}>{bar.address}</Text>
            </View>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{bar.discount}%</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informazioni</Text>
            <Text style={styles.description}>{bar.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Orari di Apertura</Text>
            <Text style={styles.hours}>{bar.openingHours}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contatti</Text>
            <TouchableOpacity style={styles.contactRow} onPress={handleCall}>
              <Ionicons name="call-outline" size={24} color="#2F3542" />
              <Text style={styles.contactText}>{bar.phone}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
              <Ionicons name="mail-outline" size={24} color="#2F3542" />
              <Text style={styles.contactText}>{bar.email}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.pointsText}>Hai {bar.points} punti fedeltà</Text>
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemButtonText}>Riscatta premi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 220,
  },
  infoContainer: {
    padding: 20,
    paddingBottom: 100, // Extra space for the fixed footer
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F3542',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#2F3542',
    marginLeft: 4,
    marginRight: 12,
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    color: '#747D8C',
  },
  address: {
    fontSize: 16,
    color: '#747D8C',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#FF4757',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F3542',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#57606F',
  },
  hours: {
    fontSize: 15,
    color: '#57606F',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F6',
  },
  contactText: {
    fontSize: 15,
    color: '#2F3542',
    marginLeft: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 15,
    color: '#2F3542',
    fontWeight: '500',
  },
  redeemButton: {
    backgroundColor: '#2ED573',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default BarDetailScreen;
