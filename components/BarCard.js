import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BarCard = ({ bar }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('BarDetail', { bar })}
    >
      <Image 
        source={{ uri: bar.image || 'https://via.placeholder.com/150' }} 
        style={styles.image} 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{bar.name}</Text>
        <Text style={styles.address}>{bar.address}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {bar.rating || 'N/A'}</Text>
          <Text style={styles.distance}>{bar.distance || '0.5'} km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  distance: {
    color: '#666',
  },
});

export default BarCard;
