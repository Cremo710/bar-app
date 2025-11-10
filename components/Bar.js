import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Bar = ({ bar }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('BarDetail', { bar })}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: bar.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{bar.discount}%</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {bar.name}
        </Text>
        <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
          {bar.address}
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{bar.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{bar.distance} km</Text>
            <Text style={styles.statLabel}>Distanza</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{bar.points}</Text>
            <Text style={styles.statLabel}>Punti</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4757',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F3542',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#747D8C',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F2F6',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F3542',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#747D8C',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E1E5EE',
  },
});

export default Bar;
