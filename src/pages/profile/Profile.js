import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../../components/NavigationBar";
import Icon from "react-native-vector-icons/FontAwesome";
import Accueil3 from "../Accueil";
import Buttons from "../../components/Buttons";
import MyAvatar from "../../components/Avatar";
import Swiper from 'react-native-swiper';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [defaultImageUri] = useState(
    "https://camo.githubusercontent.com/c870c9266f63ef17356bc6356d7c2df99d8a9889644352d4fe854f37f5c13693/68747470733a2f2f692e706f7374696d672e63632f5071674c68726e582f756e626f7265642e706e67" // Replace with the actual default image URL
  );
  const [image, setImage] = useState(defaultImageUri);
  const [description, setDescription] = useState(""); // State for the user's description
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [selectedHair, setSelectedHair] = useState("");
  const [selectedBeard, setSelectedBeard] = useState("");
  const [selectedMouth, setSelectedMouth] = useState("");
  const [selectedHat, setSelectedHat] = useState("");
  const [selectedEyebrow, setSelectedEyebrow] = useState("");
  const [avatarColor, setAvatarColor] = useState("#FFFFFF");
  const [clothColor, setClothColor] = useState("");
  const [HairColor, setHairColor] = useState("black");
  const [EyeColor, setEyeColor] = useState("");
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
      setPreferences(profileData.user.preferences);
      setDescription(profileData.user.description);
      setAvatarColor(profileData.user.style.head.color);
      setSelectedBeard(profileData.user.style.beard.id);
      setSelectedEyebrow();
      setSelectedCloth(profileData.user.style.accessory.id);
      setSelectedGlasses(profileData.user.style.eyes.id);
      setSelectedHair(profileData.user.style.hair.id);
      setSelectedMouth(profileData.user.style.mouth.id);
      setClothColor(profileData.user.style.accessory.color);
      setHairColor(profileData.user.style.hair.color);
      setImage(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${profileData.user.profilePhoto}`
      );
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={true}
      >
        <View style={styles.container}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textAboveImage}>Mon profil UnBored</Text>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => navigation.navigate("Settings")}
              >
                <Icon name="gears" size={20} color={"#E1604D"} />
              </TouchableOpacity>
            </View>
            <Swiper style={styles.swiperContainer} loop={false} nestedScrollEnabled={true}>
              <View style={styles.slide}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
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
                  eyebrow={selectedEyebrow}
                />
              </View>
            </Swiper>
            <Text style={styles.textBelowImage}>{username}</Text>
            <View style={styles.numbersContainer}>
              <View style={styles.numberItem}>
                <Text style={styles.numberValue}>1234</Text>
                <Text style={styles.numberLabel}>Followers</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.numberItem}>
                <Text style={styles.numberValue}>567</Text>
                <Text style={styles.numberLabel}>Suivie</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.numberItem}>
                <Text style={styles.numberValue}>89</Text>
                <Text style={styles.numberLabel}>Events</Text>
              </View>
            </View>
            <View style={styles.dividerhorz} />
            <Text style={styles.textPreferences}>À propos de moi</Text>
            <Text style={styles.descriptionpersonne}>{description}</Text>
            <Text style={styles.textPreferences}>Mes intérêts :</Text>
            <ScrollView horizontal contentContainerStyle={styles.preferenceRow}   nestedScrollEnabled={true} >
              {preferences.map((preference, index) => (
                <Text key={index} style={styles.preferenceItem}>
                  {preference}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  textAboveImage: {
    textAlign: "left",
    marginBottom: 10,
    marginTop: 25,
    fontSize: 22,
    fontWeight: "bold",
  },
  textBelowImage: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  numbersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  numberItem: {
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#e0e0e0",
  },
  dividerhorz: {
    width: 300,
    marginBottom: 30,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  numberValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  numberLabel: {
    fontSize: 14,
  },
  textPreferences: {
    textAlign: "left",
    right: 80,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  descriptionpersonne: {
    textAlign: "center",
    fontSize: 12,
  },
  descriptionInput: {
    width: "100%",
    fontSize: 16,
    borderColor: "#E1604D",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  preferenceRow: {
    flexDirection: "row",
  },
  preferenceItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    height: 50,
    color: "#E1604D",
    marginRight: 15,
    padding: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E1604D",
  },
  loginBtn: {
    width: 40,
    top: 8,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    backgroundColor: "#5265FF1A",
    borderColor: "#E1604D",
    borderWidth: 1,
  },
  swiperContainer: {
    // width: "100%",
    height: 150,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    right:60,
    paddingBottom:140,
  },
  loginBtnText: {
    color: "#E1604D",
  },
});

export default Profile;
