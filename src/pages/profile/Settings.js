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

function Settings() {
  const [firstName, setFirstName] = useState("Rémi");
  const [lastName, setLastName] = useState("SALEH");
  const [email, setEmail] = useState("remi.saleh@epitech.eu");
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);
  const defaultImageUri =
    "https://camo.githubusercontent.com/c870c9266f63ef17356bc6356d7c2df99d8a9889644352d4fe854f37f5c13693/68747470733a2f2f692e706f7374696d672e63632f5071674c68726e582f756e626f7265642e706e67"; // Replace with the actual default image URL
  const [defaultImage, setDefaultImage] = useState(defaultImageUri);
  const [hasGalleryPermission, setHasGalleryPermision] = useState(null);
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermision(galleryStatus.status === "granted");
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

  const handleSave = () => {
    console.log("Changes saved");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                left: 20,
                width: 250,
                height: 250,
                borderRadius: 600 / 2,
              }}
            />
          ) : (
            <Image
              source={{ uri: defaultImage }}
              style={{
                left: 20,
                width: 250,
                height: 250,
                borderRadius: 600 / 2,
              }}
            />
          )}
          <Text style={styles.title}>Modifier votre profil</Text>
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
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleSave}>
            <Text style={styles.loginBtnText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  // Style for the text inside the placeholder image
  placeholderText: {
    color: "#999",
  },

  // Style for the selected image
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "stretch",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 20,
    borderColor: "#b3b3b3",
    borderWidth: 1,
    paddingLeft: 10,
  },
  image4: {
    marginBottom: 10,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center", // Center horizontally
    marginTop: 20,
  },
  loginBtn: {
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
    color: "white", // Add text color to the button
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
});

export default Settings;
