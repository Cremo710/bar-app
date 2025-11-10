import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Bar from '../components/Bar';
import bars from '../data/barsData';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bar nelle vicinanze</Text>
      </View>
      <FlatList
        data={bars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Bar bar={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F3542',
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
});

export default HomeScreen;
