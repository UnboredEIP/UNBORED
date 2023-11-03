import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTextInput from "../../components/TextField";

const Settings = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [defaultImageUri] = useState(
    "https://camo.githubusercontent.com/c870c9266f63ef17356bc6356d7c2df99d8a9889644352d4fe854f37f5c13693/68747470733a2f2f692e706f7374696d672e63632f5071674c68726e582f756e626f7265642e706e67" // Replace with the actual default image URL
  );
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [image, setImage] = useState(defaultImageUri);
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      if (result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to internal Storage</Text>;
  }

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so we add 1
    const year = date.getFullYear().toString();

    return `${month} ${day} ${year}`;
  }

  const handleProfileFetch = async () => {
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
      setUsername(profileData.user.username.trim());
      setNumber(profileData.user.number.trim());
      // const tmp = new Date(profileData.user.birthdate.trim())
      setBirthdate(new Date(profileData.user.birthdate.trim()));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const handleSave = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      const response = await fetch("http://20.216.143.86/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          username,
          birthdate,
          number,
        }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.log("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle errors related to the request, such as network errors
    }
    navigation.navigate("Accueil3");
  };

  const handleIconClick = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };
  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={true}
    >
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleIconClick}
            >
              <Image
                source={require("../../../assets/icon2.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          {showButtons && (
            <View
              style={{
                flexDirection: "row",
                marginLeft: 20,
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity style={styles.oauthBtn} onPress={pickImage}>
                <Image
                  style={styles.image4}
                  source={require("../../../assets/camera.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} onPress={pickImage2}>
                <Image
                  style={styles.image4}
                  source={require("../../../assets/gallery.png")}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.horizontalLine} />
          <Text style={styles.username}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.username}>Number </Text>
          <TextInput
            style={styles.input}
            placeholder="number"
            value={number}
            onChangeText={setNumber}
          />
          <Text style={styles.username}>Birthdate</Text>
          <MyTextInput
            dateSelect={new Date(birthdate)}
            placeholder="Date de naissance"
            isDatepicker
            onDateChange={(birthdate) => setBirthdate(birthdate)}
            onChangeText={(birthdate) => setBirthdate(birthdate)}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleSave}>
            <Text style={styles.loginBtnText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginTop: 20,
    marginBottom: 10,
    borderColor: "#b3b3b3",
    borderWidth: 1,
    paddingLeft: 10,
  },
  image4: {
    width: 50,
    height: 50,
    alignItems: "center",
  },
  loginBtn: {
    marginTop: 20,
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#E1604D",
    borderColor: "#b3b3b3",
    borderWidth: 1,
  },
  loginBtnText: {
    color: "white",
  },
  oauthBtn: {
    width: "40%",
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "#E1604D",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  username: {
    position: "relative",
    right: 110,
    marginTop: 20,
    marginBottom: -10,
    color: "grey",
  },
  horizontalLine: {
    width: "100%",
    height: 1, // Adjust the height as needed
    backgroundColor: "#ccc", // Grey color
    marginTop: 10, // Adjust the margin as needed
    marginBottom: 10, // Adjust the margin as needed
  },
});

export default Settings;
