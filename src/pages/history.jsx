import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/NavigationBar";

const handleProfileFetch = async () => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");

    const response = await fetch(
      "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/history/get",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

const handleProfileDelete = async () => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");

    const response = await fetch(
      "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/history/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error("Error deleting profile:", error);
    return null;
  }
};

const History = ({navigation}) => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await handleProfileFetch();
      if (data && data.history) {
        setHistoryData(data.history);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async () => {
    await handleProfileDelete();
    setHistoryData([]); // Efface les données locales après la suppression
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {historyData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete History</Text>
      </TouchableOpacity>
      <View style={styles.navbar}>
          <Navbar navigation={navigation} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  navbar: {
    bottom:-12,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff4444", // Couleur rouge pour le bouton de suppression
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default History;
