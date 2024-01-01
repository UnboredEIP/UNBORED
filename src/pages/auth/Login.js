import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles2";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const url = "http://20.216.143.86/auth/login"; // Replace with your backend login endpoint
    const headers = {
      "Content-Type": "application/json",
    };
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error(errorText);
        throw new Error(`HTTP error! Status: ${response.status}\n${errorText}`);
      }

      const responseData = await response.json();
      console.log(responseData); // Handle success
      const authToken = responseData.token;
      await AsyncStorage.setItem("authToken", authToken);
      navigation.replace("Choose");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Image
          style={styles.image4}
          source={require("../../../assets/logo2.gif")}
        />
        <Text style={styles.inscrire}>Se connecter !</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.FPBtn}
          onPress={() => navigation.replace("ForgetPassword")}
        >
          <Text style={styles.ForgetText}>Mot de passe oublié?</Text>
        </TouchableOpacity>
        <Text style={styles.ContinueravecText}>Ou continuer avec</Text>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 20,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity style={styles.oauthBtn}>
            <Image
              style={styles.image2}
              source={require("../../../assets/Facebook.png")}
            />
            <Text style={styles.oauthTxt}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oauthBtn}>
            <Image
              style={styles.image2}
              source={require("../../../assets/google.png")}
            />
            <Text style={styles.oauthTxt}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </NavigationContainer>
  );
};
export default LoginScreen;
