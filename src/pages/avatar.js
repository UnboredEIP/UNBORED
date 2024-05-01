import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyAvatar from "../components/Avatar";
const Avatar = ({ navigation }) => {
  const [selectedFace, setSelectedFace] = useState(null); // To store the selected face
  const [tintColor, setTintColor] = useState("#000000"); // Initial color is black

  const colorOptions = [
    "#F5D0A9",
    "#E0AC69",
    "#C68642",
    "#A0522D",
    "#8B4513",
    "#6F4E37",
    "#DEB887",
    "#D2B48C",
    "#CD853F",
    "#8B5A2B",
    "#FFDAB9",
    "#F4A460",
    "#FFA07A",
    "#FA8072",
    "#FF6347",
    "#FF4500",
    "#FF7F50",
    "#FF8C00",
    "#D2691E",
    "#8B0000",
  ];

  const saveAvatarData = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      // Step 2: Save selected face in the database
      const avatarDataResponse = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/avatar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            head: {
              color: selectedFace === null ? "0" : selectedFace,
            },
          }),
        }
      );

      const avatarDataResult = await avatarDataResponse.json();
      console.log("Avatar data saved:", avatarDataResult);
    } catch (error) {
      console.error("Error saving avatar data:", error);
    }
  };

  const handleColorChange = (color) => {
    setSelectedFace(color);
    console.log("ziziii", color);
    setTintColor(color);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez l'avatar</Text>
      <View style={styles.face1}>
        <MyAvatar
          size={330}
          colorSkin={tintColor}
          colorClothingTop={tintColor}
        />
      </View>

      <ScrollView horizontal style={styles.colorContainer}>
        {colorOptions.map((color, index) => (
          <ColorBox
            key={index}
            color={color}
            onPress={() => handleColorChange(color)}
          />
        ))}
      </ScrollView>

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

const ColorBox = ({ color, onPress }) => (
  <TouchableOpacity
    style={[styles.colorBox, { backgroundColor: color }]}
    onPress={onPress}
    accessibilityLabel={`Color ${color}`}
  />
);

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
  face1: {
    flex: 1,
    marginBottom: -100,
    marginTop: 50,
    paddingLeft: 30,
    alignSelf: "flex-start",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  colorContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: -550,
  },
  colorBox: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  button: {
    padding: 10,
    backgroundColor: "#E1604D",
    borderRadius: 5,
    marginBottom: 29,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Avatar;
