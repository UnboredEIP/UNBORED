import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyAvatar from "../components/Avatar";
import Navbar from "../components/NavigationBar";

const shop = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [selectedHair, setSelectedHair] = useState("");
  const [selectedBeard, setSelectedBeard] = useState("");
  const [selectedMouth, setSelectedMouth] = useState("");
  const [selectedHat, setSelectedHat] = useState("");
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [selectedEyebrow, setSelectedEyebrow] = useState("");
  const [avatarColor, setAvatarColor] = useState("#FFFFFF");
  const [clothColor, setClothColor] = useState("");
  const [HairColor, setHairColor] = useState("black");
  const [EyeColor, setEyeColor] = useState("");
  const [coins, setCoins] = useState(200); // Example coin count

  const listHair = [
    "null",
    "calvitie",
    "buzzcut",
    "big",
    "afro",
    "frizzy",
    "curvy",
    "curlyshort",
    "curly",
    "mediumdreads",
    "medium",
    "longstraight",
    "longdreads",
    "shaggymullet",
    "shaggy",
    "minidreads",
    "mediumlong",
    "square",
    "shortwaved",
    "shortflat",
  ];

  const listMouth = [
    "null",
    "grimace",
    "eating",
    "desbelief",
    "default",
    "serious",
    "scream",
    "sad",
    "open",
    "vomit",
    "twinkle",
    "tongue",
    "smile",
  ];

  const listTop = [
    "null",
    "hoodie",
    "crewneck",
    "blazer",
    "shirt",
    "scoopneck",
    "polo",
    "vneck",
    "overall",
  ];

  const listEyebrow = [
    "null",
    "natural",
    "flat",
    "exited",
    "angry",
    "updown",
    "unibrow",
    "sad2",
    "sad",
  ];

  const listBeard = [
    "null",
    "medium",
    "majestic",
    "ligth",
    "mustachemagnum",
    "mustache",
  ];

  const listEyes = [
    "null",
    "dizzy",
    "default",
    "cry",
    "closed",
    "side",
    "heart",
    "happy",
    "eyeroll",
    "wink",
    "wacky",
    "surprised",
    "squint",
    "angry",
    "updown",
    "unibrow",
    "sad2",
    "sad",
  ];

  const handleProfileFetch = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      const response = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile",
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
      console.log("Profile Data:", profileData);
      setUsername(profileData.user.username);
      setAvatarColor(profileData.user.style.head.color);
      setSelectedBeard(profileData.user.style.beard.id);
      setSelectedEyebrow(profileData.user.style.eyebrows.id);
      setSelectedCloth(profileData.user.style.accessory.id);
      setSelectedGlasses(profileData.user.style.eyes.id);
      setSelectedHair(profileData.user.style.hair.id);
      setSelectedMouth(profileData.user.style.mouth.id);
      setClothColor(profileData.user.style.accessory.color);
      setHairColor(profileData.user.style.hair.color);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSave = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      // Step 1: Update user profile information
      const profileResponse = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            description,
          }),
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    navigation.navigate("Accueil3");
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topLeftItems}>
        <Image source={require("../../assets/coin.png")} style={styles.coinImage} />
        <Text style={styles.coinText}>{coins}</Text>
      </View>
      <View style={styles.slide2}>
        <MyAvatar
          size={120}
          colorSkin={avatarColor}
          eyes={listEyes[selectedGlasses]}
          clothTop={listTop[selectedCloth]}
          colorClothingTop={clothColor}
          hair={listHair[selectedHair]}
          colorHair={HairColor}
          colorEye={EyeColor}
          beard={listBeard[selectedBeard]}
          mouth={listMouth[selectedMouth]}
          eyebrow={listEyebrow[selectedEyebrow]}
        />
      </View>
      <Text style={styles.username2}>{username}</Text>
      <TouchableOpacity style={styles.buttonZ2}>
            <MyAvatar size={100} colorSkin={avatarColor} clothTop={"crewneck"} />
            <Image source={require("../../assets/coin.png")} style={styles.coinImage} />
            <Text style={styles.coinText}>{coins - 50}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonZ1}>
            <MyAvatar size={100} colorSkin={avatarColor} clothTop={"blazer"} />
            <Image source={require("../../assets/coin.png")} style={styles.coinImage} />
        <Text style={styles.coinText}>{coins - 50}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonZ3}>
            <MyAvatar size={100} colorSkin={avatarColor} clothTop={"shirt"} />
            <Image source={require("../../assets/coin.png")} style={styles.coinImage} />
            <Text style={styles.coinText}>{coins - 50}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonZ4}>
            <MyAvatar size={100} colorSkin={avatarColor} clothTop={"polo"} />
            <Image source={require("../../assets/coin.png")} style={styles.coinImage} />
        <Text style={styles.coinText}>{coins - 50}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonZ5}>
            <MyAvatar size={100} colorSkin={avatarColor} clothTop={"vneck"} />
            <Image source={require("../../assets/coin.png")} style={styles.coinImage} />
            <Text style={styles.coinText}>{coins - 50}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonZ6}>
            <MyAvatar size={100} colorSkin={avatarColor} clothTop={"overall"} />
            <Image source={require("../../assets/coin.png")} style={styles.coinImage} />
        <Text style={styles.coinText}>{coins - 50}</Text>
      </TouchableOpacity>
      <View style={styles.bottomNavbarContainer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonZ2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    right:120,
    bottom:70,
  },
  buttonZ1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    left:20,
    bottom:138,
  },
  buttonZ3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    left:20,
    bottom:32,
  },
  buttonZ4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    right:120,
    bottom:100,
  },
  buttonZ5: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    left:20,
    bottom:20,
  },
  buttonZ6: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    right:120,
    bottom:85,
  },
  topLeftItems: {
    position: "absolute",
    top: 30,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  coinImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  coinText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  username2:{
    bottom:120,
    left:145,
    fontSize: 18,
    fontWeight: "bold",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    right:60,
    overflow: "hidden",
    paddingBottom: 280,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default shop;
