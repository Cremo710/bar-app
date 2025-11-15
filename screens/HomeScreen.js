import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import Bar from '../components/Bar';
import bars from '../data/barsData';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [region, setRegion] = useState({
    latitude: 45.4642,  // Posizione di default (Milano)
    longitude: 9.19,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permesso alla posizione negato');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Mappa */}
      <View style={styles.mapContainer}>
        <MapView 
          style={styles.map} 
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
        >
          {bars.map((bar) => (
            <Marker
              key={bar.id}
              coordinate={{
                latitude: bar.latitude || region.latitude + (Math.random() * 0.01 - 0.005),
                longitude: bar.longitude || region.longitude + (Math.random() * 0.01 - 0.005),
              }}
              title={bar.name}
              description={bar.address}
            />
          ))}
        </MapView>
      </View>

      {/* Lista Bar */}
      <View style={styles.listContainer}>
        <FlatList
          data={bars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Bar bar={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mapContainer: {
    height: '25%', // La mappa occupa il 25% dello schermo
    width: '100%',
    marginTop: 0, // Rimuove il margine superiore
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F3542',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
