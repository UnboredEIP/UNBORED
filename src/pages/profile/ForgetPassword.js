import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles/styles2";

const ForgetPasswordScreen = ({ navigation }) => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Image
          style={styles.image4}
          source={require("../../../assets/logo2.gif")}
        />
        <Text style={styles.inscrire3}>Mot de passe oublié</Text>
        <Text style={styles.inscrire4}>
          Inscrivez votre email pour récupérer votre compte
        </Text>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Email" />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Confirmer l'email" />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.replace("OTP3")}
        >
          <Text style={styles.loginText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
};

export default ForgetPasswordScreen;
