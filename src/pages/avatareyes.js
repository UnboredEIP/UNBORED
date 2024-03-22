import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const avatareyes = ({ navigation }) => {
  const [avatarIndex, setAvatarIndex] = useState(0); // Default avatar index
  const [selectedGlassesIndex, setSelectedGlassesIndex] = useState(null); // Index of selected glasses
  const [selectedMouthIndex, setSelectedMouthIndex] = useState(null); // Index of selected mouth
  const [continuePressed, setContinuePressed] = useState(false); // State to track if "Continuer" button is pressed

  const faces = [
    require("./avatar/visage_default.png"),
    require("./avatar/visage1.png"),
    require("./avatar/visage2.png"),
  ];
  const glasses = [
    require("./avatar/glass.png"),
    require("./avatar/glass-red.png"),
    require("./avatar/glass.png"),
    require("./avatar/glass.png"),
    require("./avatar/glass.png"),
    require("./avatar/glass.png"),
  ];
  const mouths = [
    require("./avatar/mouth.png"),
    require("./avatar/mouth2.png"),
    require("./avatar/mouth.png"),
    require("./avatar/mouth.png"),
    require("./avatar/mouth.png"),
    require("./avatar/mouth.png"),
    require("./avatar/mouth.png"),
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
      console.log(profileData);
      setAvatarIndex(parseInt(profileData.user.style.head) + 1); 
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const onPressImage = (index) => {
    setSelectedGlassesIndex(index);
  };

  const onPressContinue = () => {
    // Navigate to Settings screen
    setContinuePressed(true);
    // navigation.navigate("Settings");
  };

  const onPressFinish = () => {
    // Navigate to Settings screen
    navigation.navigate("Settings");
  };

  const renderGlassesImages = () => {
    if (!continuePressed) {
      // Divide glasses array into two arrays with 3 elements each
      const glassesRow1 = glasses.slice(0, 3);
      const glassesRow2 = glasses.slice(3, 6);
  
      return (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>
            {glassesRow1.map((glass, index) => (
              <TouchableOpacity key={index} onPress={() => onPressImage(index)}>
                <Image source={glass} style={styles.bigImage} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {glassesRow2.map((glass, index) => (
              <TouchableOpacity key={index + 3} onPress={() => onPressImage(index + 3)}>
                <Image source={glass} style={styles.bigImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };
  const renderMouthImages = () => {
    // Divide mouths array into two arrays with 3 elements each
    const mouthsRow1 = mouths.slice(0, 3);
    const mouthsRow2 = mouths.slice(3, 6);
  
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          {mouthsRow1.map((mouth, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedMouthIndex(index)}>
              <Image source={mouth} style={styles.bigImage} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {mouthsRow2.map((mouth, index) => (
            <TouchableOpacity key={index + 3} onPress={() => setSelectedMouthIndex(index + 3)}>
              <Image source={mouth} style={styles.bigImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Avatar</Text>
      <View style={styles.avatarContainer}>
        <Image source={faces[avatarIndex]} style={styles.image} />
        {selectedGlassesIndex !== null && (
          <Image
            source={glasses[selectedGlassesIndex]}
            style={[
              styles.glasses,
              continuePressed ? { opacity: 0.6 } : { opacity: 1 },
            ]}
          />
        )}
        {selectedMouthIndex !== null && continuePressed && (
          <Image source={mouths[selectedMouthIndex]} style={styles.mouth} />
        )}
      </View>
      {!continuePressed && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderGlassesImages()}</View>
        </View>
      )}
      <TouchableOpacity style={styles.bigButton} onPress={onPressContinue}>
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
      {continuePressed && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderMouthImages()}</View>
        </View>
      )}
      {continuePressed && (
        <TouchableOpacity style={styles.bigButton} onPress={onPressFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      )}
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
    position: "relative",
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
  glasses: {
    position: "absolute",
    width: "55%", // Adjust the size as needed
    height: "55%", // Adjust the size as needed
    top: "10%", // Adjust the position as needed
    left: "20%", // Adjust the position as needed
  },
  mouth: {
    position: "absolute",
    width: "30%", // Adjust the size as needed
    height: "30%", // Adjust the size as needed
    top: "40%", // Adjust the position as needed (moves the mouth upwards)
    left: "35%", // Adjust the position as needed
  },
  imagesContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bigImage: {
    width: 100, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    resizeMode: "cover",
    marginHorizontal: 10,
  },
  bigButton: {
    marginTop: 20,
    backgroundColor: "#e1604D",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default avatareyes;
