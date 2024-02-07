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
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message'; 
import Navbar from "../../components/NavigationBar";

const Settings = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
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
  useEffect(() => {
    handleProfileFetch();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.0001,
    });
  
    if (!result.canceled) {
      if (result.assets.length > 0) {
        setImage(result.assets[0].uri);
        await updateProfilePicture(result.assets[0].uri);
      }
    }
  };
  
  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.0001,
    });
  
    if (!result.canceled) {
      if (result.assets.length > 0) {
        setImage(result.assets[0].uri);
        await updateProfilePicture(result.assets[0].uri);
      }
    }
  };
  
  const updateProfilePicture = async (uri) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "image/jpg",
        name: "profilePicture.jpg",
      });
  
      const imageResponse = await fetch("http://20.216.143.86/profile/profilepicture", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });
  
      if (imageResponse.ok) {
        console.log("Profile picture updated successfully");
      } else {
        const errorDescription = await imageResponse.text();
        console.log("Failed to update profile picture:", imageResponse.status, errorDescription, formData);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };
  

  if (hasGalleryPermission === false) {
    return <Text>No access to internal Storage</Text>;
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
      setImage(`http://20.216.143.86/getimage?imageName=${profileData.user.profilPhoto}`);
      setUsername(profileData.user.username.trim());
      setBirthdate(new Date(profileData.user.birthdate.trim()));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const navigatetotamere = async () => {
    navigation.navigate("Choose");
  }
  const navigatetodescr = async () => {
    navigation.navigate("Description");
  }
  const navigatetoavatar = async () => {
    navigation.navigate("Avatar");
  }
  const handleSave = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      const profileResponse = await fetch("http://20.216.143.86/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          username,
          birthdate,
        }),
      });
      if (!username) {
        Toast.show(`Nom d'utilisateur ou numéro de téléphone vide, merci de remplir ces champs`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: "red",
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
      if (!profileResponse.ok) {
        const errorDescription = await profileResponse.text();
        console.log("Failed to update profile:", profileResponse.status, errorDescription);
        Toast.show(`Modification de profile échouée, les informations sont incorrects`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: "red",
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        return;
      }

      console.log("Profile updated successfully");

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  if (username) {
    navigation.navigate("Accueil3");
  }
    
  };
  

  const handleIconClick = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  return (
    <View style={{ flex: 1 }}>
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
            <Icon name="gears" size={40} color= {'#E1604D'} />
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
              <Icon name="camera" size={30} color= {'white'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} onPress={pickImage2}>
              <Icon name="photo" size={30} color= {'white'} />
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
          <Text style={styles.username}>Birthdate</Text>
          <MyTextInput
            dateSelect={new Date(birthdate)}
            placeholder="Date de naissance"
            isDatepicker
            onDateChange={(birthdate) => setBirthdate(birthdate)}
            onChangeText={(birthdate) => setBirthdate(birthdate)}
          />
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginBtn2} onPress={navigatetotamere}>
            <Text style={styles.loginBtnText}>Change your preferences !</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn2} onPress={navigatetodescr}>
            <Text style={styles.loginBtnText}>Change your description !</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginBtn3} onPress={navigatetoavatar}>
            <Text style={styles.loginBtnText2}>Créer ton avatar !</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={handleSave}>
            <Text style={styles.loginBtnText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
    <Navbar navigation={navigation} />
    </View>
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
  buttonContainer: {
    flexDirection: "row",  // Align buttons horizontally
    justifyContent: "space-between",  // Space buttons evenly
    marginTop: 20,  // Adjust margin as needed
  },
  loginBtn2: {
    marginTop: 20,
    marginLeft:5,
    marginRight:5,
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#E1604D",
    borderColor: "#b3b3b3",
    borderWidth: 1,
  },
  loginBtn3: {
    marginTop: 20,
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderColor: "#b3b3b3",
    borderWidth: 1,
  },
  loginBtnText: {
    color: "white",
  },
  loginBtnText2: {
    color: "#E1604D",
  },
  oauthBtn: {
    width: "30%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
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
    marginBottom: -5,
    color: "grey",
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc", 
    marginTop: 10, 
    marginBottom: 10, 
  },
});

export default Settings;