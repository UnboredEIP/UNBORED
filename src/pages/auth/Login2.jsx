import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  useFonts,
  SourceSansPro_600SemiBold,
} from "@expo-google-fonts/source-sans-pro";
import { ScrollView } from "react-native-gesture-handler";
import MyTextInput from "../../components/TextField";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from "../../components/Buttons";
import Accueil3 from "../Accueil";
import ChoosePreferences from "../../ChoosePreferences";

async function makeRLoginRequest(email, password) {
  try {
    const response = await fetch("http://20.216.143.86/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === 202) {
      const data = await response.json();
      const Authtoken = data.token;
      await AsyncStorage.setItem("authToken", Authtoken);
      console.log(await AsyncStorage.getItem("authToken"))
      console.log(data["refresh"]);
      return true;
    } else {
      console.error(response.toString());
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    return false;
  }
}

const Login2 = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles().container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles().container}
      >
        <ScrollView>
          <View style={styles().Mainbox}>
            <Image
              source={require("../../../assets/logo2.gif")}
              style={{ height: 200, width: 200 }}
            ></Image>

            <Text style={styles().h1}>Se connecter</Text>

            <Text style={styles().titleTextField}>
              Email<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Email"
              keyboardType={"email-address"}
              onChangeText={(email) => setEmail(email)}
            />

            <Text style={styles().titleTextField}>
              Mot de passe<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <RootSiblingParent>
              <View style={{ marginBottom: 10 }}></View>
              <Buttons
                texte={"Se connecter"}
                onPress={async () => {
                  if (email !== "" && password !== "") {
                    const response = await makeRLoginRequest(email, password);
                    if (response) {
                      Toast.show("Vous êtes connecté", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        backgroundColor: "green",
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                      });
                      navigation.navigate("Accueil3");
                    } else {
                      Toast.show("Mot de passe ou Email incorrect", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        backgroundColor: "red",
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                      });
                    }
                  }
                  else {
                    Toast.show("Mot de passe ou email manquant. Veuillez remplir les deux champs", {
                      duration: Toast.durations.LONG,
                      position: Toast.positions.BOTTOM,
                      backgroundColor: "red",
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                    });
                  }
                }}
              />
            </RootSiblingParent>
            <TouchableOpacity onPress={async () =>navigation.navigate("MotDePasse")}>
              <Text
                style={(styles().loginText,
                  { marginTop: 20, marginBottom: 0, color: "#E1604D" })}>
                Mot de passe oublié
              </Text>
            </TouchableOpacity>
            <Text
              style={(styles().loginText, { marginTop: 30, marginBottom: 30 })}
            >
              ou continuer avec
            </Text>
            <View style={{ flexDirection: "row" }}>
              <RootSiblingParent>
                <Buttons
                  hasIcon={true}
                  iconPath={
                    "https://www.facebook.com/images/fb_icon_325x325.png"
                  }
                  textColor="black"
                  width={screenWidth < 350 ? 145 : 160}
                  backgroundColor="white"
                  texte="Facebook"
                />
                <Buttons
                  hasIcon={true}
                  iconPath={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                  }
                  textColor="black"
                  width={screenWidth < 350 ? 145 : 160}
                  backgroundColor="white"
                  texte="Google"
                />
              </RootSiblingParent>
            </View>
            <View style={{ marginTop: 15 }} />
            <Text style={styles().loginText}>
              Pas encore de compte ?{" "}
              <TouchableOpacity
                onPress={() => navigation.navigate("Register2")}
              >
                <Text style={styles().colorStar}>S'inscire</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = (textColor) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      //   marginTop: screenHeight < 768 ? 41 : 50,
      // backgroundColor: "white",
    },
    Mainbox: {
      flex: 1,
      alignItems: "center",
      //   justifyContent: "center",
      //   marginTop: screenHeight < 768 ? 41 : 50,
      marginVertical: screenHeight < 768 ? 41 : 50,
      marginHorizontal: screenWidth / 15,
      // backgroundColor: "white",
    },
    h1: {
      fontSize: screenHeight < 768 ? 20 : 24,
      fontFamily: "SourceSansPro_600SemiBold",
      textAlign: "center",
      //   marginHorizontal: screenWidth / 30,
      marginBottom: screenHeight / 30,
    },
    titleTextField: {
      fontSize: 16,
      alignSelf: "flex-start",
      fontFamily: "SourceSansPro_600SemiBold",
      opacity: 0.4,
      marginLeft: 20,
    },
    loginText: {
      fontSize: 16,
      alignSelf: "center",
      fontFamily: "SourceSansPro_600SemiBold",
      color: "#858C94",
    },
    colorStar: {
      color: "#E1604D",
    },
    boutton: {
      width: "80%",
      borderRadius: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E1604D",
      marginTop: 50,
    },
    textButton: {
      fontFamily: "SourceSansPro_600SemiBold",
      fontSize: 16,
      color: "white",
    },
  });
};

export default Login2;
