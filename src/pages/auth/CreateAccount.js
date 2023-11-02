import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles2";

const CreateAccount = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [preferences, setPreferences] = useState([""]);

  const registerUser = async () => {
    const url = "http://20.216.143.86/auth/register";
    const headers = {
      "Content-Type": "application/json",
    };

    const userData = {
      username,
      email,
      password,
      gender,
      number,
      birthdate,
      preferences,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(userData),
        timeout: 10000, // Set a timeout value in milliseconds
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error(errorText); // Log the response text for more details
        throw new Error(`HTTP error! Status: ${response.status}\n${errorText}`);
      }

      const responseData = await response.json();
      console.log(responseData); // Handle success
      // Navigate to the next screen or perform any other action upon successful registration
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error during registration:", error); // Handle error
      // Display an error message or take appropriate action
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.inscrire2}>S'inscrire gratuitement !</Text>

      <View style={styles.inputView2}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView2}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView3}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView2}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Sélectionnez le genre" value="" style={styles.TextInput5} />
          <Picker.Item label="Homme" value="Homme" style={styles.TextInput31}/>
          <Picker.Item label="Femme" value="Femme" style={styles.TextInput31}/>
          <Picker.Item label="Autre" value="Autre" style={styles.TextInput31}/>
        </Picker>
      </View>
      <View style={styles.inputView2}>
        <TextInput
          style={styles.TextInput}
          placeholder="Numéro de téléphone"
          value={number}
          onChangeText={(text) => setNumber(text)}
        />
      </View>
      <View style={styles.inputView2}>
        <TextInput
          style={styles.TextInput}
          placeholder="Date de naissance"
          value={birthdate}
          onChangeText={(text) => setBirthdate(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={registerUser}>
        <Text style={styles.loginText}>S'inscrire</Text>
      </TouchableOpacity>

      <Text style={styles.ContinueravecText}>Ou continuer avec</Text>

      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={styles.oauthBtn}
          onPress={() => navigation.navigate("OnBoarding3")}
        >
          <Image
            style={styles.image2}
            source={require("../../../assets/Facebook.png")}
          />
          <Text style={styles.oauthTxt}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.oauthBtn}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            style={styles.image2}
            source={require("../../../assets/google.png")}
          />
          <Text style={styles.oauthTxt}>Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.FPBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>
          <Text style={styles.ForgetText2}>J'ai déjà un compte</Text>
          <Text style={styles.ForgetText}> Se connecter</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;
