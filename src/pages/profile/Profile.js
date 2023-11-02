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

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [description, setDescription] = useState(""); // State for the user's description

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
      console.log("Profile Data:", profileData);
      setUsername(profileData.user.username.trim());
      setPreferences(profileData.user.preferences);
      setDescription(profileData.user.description); // Set the user's description
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  const handleSave = () => {
    console.log("Changes saved");
    // You can send the updated description to your server here if needed.
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={true}>
     <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textAboveImage}>Mon profil UnBored</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Settings")}>
              <Text style={styles.loginBtnText}>O</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
                source={require("../../../assets/pot1.jpg")}              
                style={{
                width: 180,
                height: 180,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          </View>
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
          <Text style={styles.descriptionpersonne}>"Rémi, un développeur passionné par la création d'applications innovantes. Fort d'une solide expertise en programmation, il excelle dans la résolution de problèmes et la conception de solutions élégantes. Toujours en quête de défis, il est un collaborateur dévoué, prêt à contribuer au succès de tout projet technologique."</Text>
          <Text style={styles.textPreferences}>Mes intérêts :</Text>
          <ScrollView horizontal contentContainerStyle={styles.preferenceRow}>
            {preferences.map((preference, index) => (
              <Text key={index} style={styles.preferenceItem}>
                {preference}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
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
    marginBottom:5,
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
    fontSize: 18,
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
    width: 30,
    top:5,
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:50,
    backgroundColor: "#b3b3b3",
    borderColor: "#E1604D",
    borderWidth: 1,
  },
  loginBtnText: {
    color: "#E1604D",
  },
});

export default Profile;
