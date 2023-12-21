import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTextInput from "../../components/TextField";
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from "../../components/NavigationBar";

const Description = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [defaultImageUri] = useState(
    "https://camo.githubusercontent.com/c870c9266f63ef17356bc6356d7c2df99d8a9889644352d4fe854f37f5c13693/68747470733a2f2f692e706f7374696d672e63632f5071674c68726e582f756e626f7265642e706e67" // Replace with the actual default image URL
  );
  const [image, setImage] = useState(defaultImageUri);

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
      setDescription(profileData.user.description.trim());
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const navigatetotamere = async () => {
    navigation.navigate("Settings");
  }
  const handleSave = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
  
      // Step 1: Update user profile information
      const profileResponse = await fetch("http://20.216.143.86/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            description,
        }),
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  
    navigation.navigate("Accueil3");
  };
  

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"  // or "never"
    >
    <View style={{ flex: 1 }}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={true}
    >
      <View style={styles.container}>
        <View style={styles.container2}>
      <Image
              source={{ uri: image }}
              style={{
                marginTop:20,
                width: 150,
                height: 150,
                borderRadius: 10,
                alignItems:"center"
              }}
            />
      </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.username}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}  
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleSave}>
            <Text style={styles.loginBtnText}>Sauvegarder</Text>
          </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
    <Navbar navigation={navigation} />
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  container2: {
    backgroundColor: "white",
    alignItems:"center",
  },
  loginBtn: {
    marginTop: 60,
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
  loginBtn2: {
    marginTop: 20,
    width: "60%",
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
  input: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "100%",
    height: 300,
    marginTop: 20,
    marginBottom: 10,
    borderColor: "#b3b3b3",
    borderWidth: 1,
    paddingLeft: 10,
  },
  username: {
    marginTop:40,
    position: "relative",
    right: 110,
    marginBottom: 10,
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

export default Description;
