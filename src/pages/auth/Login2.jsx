import React, { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from "../../components/Buttons";
import { UbService } from "../../services/UbServices";
import { AuthService } from "../../services/AuthService";
import { API_URL, CLIENT_ID_WEB } from "@env";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

//A décommenter au moment de build
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

async function navigateTo() {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (authToken) {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ERROR: STATUS: ${response.status}`);
      }
      const tmpData = await response.json();
      if (tmpData.user.preferences.length >= 1) {
        await AsyncStorage.setItem("profileData", JSON.stringify(tmpData.user));
        return true;
      } else return false;
    } else console.log("NO TOKEN");
  } catch (error) {
    console.error(error);
  }
}

const Login2 = ({ navigation }) => {
  const ubservice = new UbService();
  const authService = new AuthService();
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

  //A décommenter au moment de build
  GoogleSignin.configure({
    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/calendar.readonly",
    ], // what API you want to access on behalf of the user, default is email and profile
    webClientId: `${CLIENT_ID_WEB}`, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  });

  return (
    <View style={styles().container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles().container}
      >
        <ScrollView>
          <View style={styles().Mainbox}>
            {/* <Auth /> */}
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
                    const response = await authService.getLogin(
                      email,
                      password
                    );
                    if (response) {
                      Toast.show("Vous êtes connecté", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        backgroundColor: "green",
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                      });
                      const tmp = await navigateTo();
                      if (tmp === true) navigation.replace("Accueil3");
                      else navigation.replace("Choose");
                      // navigation.replace("Choose");
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
                  } else {
                    Toast.show(
                      "Mot de passe ou email manquant. Veuillez remplir les deux champs",
                      {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        backgroundColor: "red",
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                      }
                    );
                  }
                }}
              />
            </RootSiblingParent>
            <TouchableOpacity
              onPress={async () => navigation.navigate("MotDePasse")}
            >
              <Text
                style={
                  (styles().loginText,
                  { marginTop: 20, marginBottom: 0, color: "#E1604D" })
                }
              >
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
                {/* //A décommenter au moment de build */}
                <Buttons
                  hasIcon={true}
                  iconPath={
                    "https://assets-global.website-files.com/5f68558b209a0b8f85194e47/6512c3effb2887c0bdbefca7_Google%20G%20Logo.png"
                  }
                  textColor="black"
                  width={screenWidth < 350 ? 145 : 160}
                  backgroundColor="white"
                  onPress={async () => {
                    try {
                      await GoogleSignin.signOut();
                      await GoogleSignin.hasPlayServices();
                      const userInfo = await GoogleSignin.signIn();
                      const response = await authService.loginGoogle(
                        userInfo.idToken
                      );

                      if (response) {
                        Toast.show("Vous êtes connecté", {
                          duration: Toast.durations.LONG,
                          position: Toast.positions.BOTTOM,
                          backgroundColor: "green",
                          shadow: true,
                          animation: true,
                          hideOnPress: true,
                        });
                        const tmp = await navigateTo();
                        if (tmp === true) navigation.replace("Accueil3");
                        else navigation.replace("Choose");
                      } else {
                        Toast.show("Erreur d'authentification", {
                          duration: Toast.durations.LONG,
                          position: Toast.positions.BOTTOM,
                          backgroundColor: "red",
                          shadow: true,
                          animation: true,
                          hideOnPress: true,
                        });
                      }
                    } catch (error) {
                      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                      } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                      } else if (
                        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                      ) {
                        // play services not available or outdated
                      } else {
                        console.log("error:", error);
                        // some other error happened
                      }
                    }
                  }}
                  texte="Google"
                />
              </RootSiblingParent>
            </View>
            <View style={{ marginTop: 15 }} />
            <Text style={styles().loginText}>
              Pas encore de compte ?{" "}
              <TouchableOpacity onPress={() => navigation.replace("Home")}>
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
