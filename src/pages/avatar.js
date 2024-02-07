import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import Navbar from "../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Avatar = ({ navigation }) => {
  const [selectedOutfit, setSelectedOutfit] = useState(null); // Pour stocker la tenue sélectionnée
  const [selectedFace, setSelectedFace] = useState(null); // Pour stocker le visage sélectionné

  // Liste des tenues et visages
  const outfits = [
    require("./avatar/tenue.png"),
    require("./avatar/tenue2.png"),
    // Ajoutez d'autres tenues
  ];

  const faces = [
    require("./avatar/visage1.png"),
    require("./avatar/visage2.png"),
    // Ajoutez d'autres visages
  ];

  const saveAvatarData = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      // Step 2: Save selected face in the database
      const avatarDataResponse = await fetch("http://20.216.143.86/profile/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          style: {
            head: selectedFace === null ? "0" : selectedFace.toString(),
            shoes: "0", // Set the appropriate value for shoes
            pants: "0", // Set the appropriate value for pants
            body: "0", // Set the appropriate value for body
          },
        }),
      });

      // Handle the response if needed
      const avatarDataResult = await avatarDataResponse.json();
      console.log("Avatar data saved:", avatarDataResult);

    } catch (error) {
      console.error("Error saving avatar data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez l'avatar</Text>
      <Swiper
        style={styles.swiper}
        showsButtons={true}
        loop={false}
        onIndexChanged={(index) => setSelectedFace(index)}
      >
        {faces.map((face, index) => (
          <View key={index} style={styles.slide}>
            <Image source={face} style={styles.image} />
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await saveAvatarData();
          navigation.navigate("avatareyes");
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
    marginTop: 50,
  },
  swiper: {
    marginTop:20,
    height: 150,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "cover",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginBottom:29,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Avatar;
