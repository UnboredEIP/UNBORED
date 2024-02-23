import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const avatareyes = ({ navigation }) => {
  const [avatarIndex, setAvatarIndex] = useState(0); // Default avatar index

  const faces = [
    require("./avatar/visage1.png"),
    require("./avatar/visage2.png"),
  ];

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch("http://20.216.143.86/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const profileData = await response.json();
      if (profileData && profileData.style && profileData.style.head === "0") {
        setAvatarIndex(0); // Set visage1 if head === 1
      } else {
        setAvatarIndex(1); // Default avatar visage2
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Avatar</Text>
      <View style={styles.avatarContainer}>
        <Image source={faces[avatarIndex]} style={styles.image} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default avatareyes;
