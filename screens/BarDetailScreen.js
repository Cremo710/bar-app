import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SwipeBottomMenu from "../components/SwipeBottomMenu";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Dummy rewards data
const REWARDS = [
  {
    id: "1",
    name: "Caffè omaggio",
    points: 50,
    description: "Un caffè in omaggio",
  },
  {
    id: "2",
    name: "Aperitivo",
    points: 100,
    description: "Aperitivo con stuzzichini",
  },
  { id: "3", name: "Pizza", points: 200, description: "Una pizza a scelta" },
  {
    id: "4",
    name: "Cena per due",
    points: 500,
    description: "Cena completa per due persone",
  },
];

const BarDetailScreen = () => {
  const route = useRoute();
  const { bar } = route.params;
  const [userPoints] = useState(bar.points || 250);
  // Riferimento allo ScrollView
  const scrollViewRef = useRef(null);

  const handleCall = () => {
    Linking.openURL(`tel:${bar.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${bar.email}`);
  };

  const handleRedeem = (reward) => {
    alert(`Hai riscattato: ${reward.name} per ${reward.points} punti!`);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={scrollViewRef}
      >
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
      <SwipeBottomMenu
        visible={true}
        onMenuClose={(isOpen) => console.log("Menu is open:", isOpen)}
        title="Titolo del Menu"
      >
        <View style={{ flex: 1 }}>
          <Text>Contenuto del menu scorrevole...</Text>
          {/* Altri componenti qui */}
        </View>
      </SwipeBottomMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    position: "relative",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.35,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F3542",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#2F3542",
    marginLeft: 4,
    marginRight: 12,
    fontWeight: "600",
  },
  distance: {
    fontSize: 14,
    color: "#747D8C",
  },
  address: {
    fontSize: 16,
    color: "#747D8C",
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: "#FF4757",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  discountText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F3542",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#57606F",
  },
  hours: {
    fontSize: 15,
    color: "#57606F",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  contactText: {
    fontSize: 15,
    color: "#2F3542",
    marginLeft: 12,
  },
  sheetHeader: {
    paddingVertical: 8,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 8,
  },
  sheetHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F3542",
  },
  pointsBadge: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  pointsLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  pointsValue: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: "600",
    margin: 12,
    marginTop: 0,
    color: "#2F3542",
    paddingHorizontal: 8,
  },
  rewardsList: {
    flex: 1,
    paddingHorizontal: 8,
    marginBottom: 20,
    paddingTop: 8,
  },
  rewardCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  disabledReward: {
    opacity: 0.6,
  },
  rewardInfo: {
    flex: 1,
    marginRight: 12,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#2F3542",
  },
  rewardDescription: {
    fontSize: 14,
    color: "#747D8C",
    marginBottom: 8,
  },
  rewardPoints: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#A4B0BE",
  },
});

export default BarDetailScreen;
