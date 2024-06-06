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
import { ScrollView } from "react-native-gesture-handler";
import MyTextInput from "../../../components/TextField";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import Buttons from "../../../components/Buttons";
import { AuthService } from "../../../services/AuthService";
import LoadingPage from "../../Loading";
import { API_URL, CLIENT_ID_WEB } from "@env";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

// //A décommenter au moment de build
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

global.RegisterData = [];
function generateSixDigitNumber() {
  let num = Math.floor(Math.random() * 900000);
  return num.toString().padStart(6, "0");
}

global.SecretCode = generateSixDigitNumber();

const Register = ({ navigation }) => {
  const authService = new AuthService();
  // const [fontsLoaded] = useFonts({
  //   SourceSansPro_600SemiBold,
  // });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("M");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [birthdate, setBirthdate] = useState("");

  // if (!fontsLoaded) {
  //   return <LoadingPage />;
  // }

  // //A décommenter au moment de build
  // GoogleSignin.configure({
  //   scopes: [
  //     "https://www.googleapis.com/auth/drive.readonly",
  //     "https://www.googleapis.com/auth/calendar.readonly",
  //   ], // what API you want to access on behalf of the user, default is email and profile
  //   webClientId: `${CLIENT_ID_WEB}`, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  // });

  return (
    <View style={styles().container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles().container}
      >
        <ScrollView>
          <View style={styles().Mainbox}>
            <Image
              source={require("../../../../assets/logo2.gif")}
              style={{ height: 200, width: 200 }}
            />

            <Text style={styles().h1}>S'inscrire gratuitement</Text>

            <Text style={styles().titleTextField}>
              Email<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Email"
              keyboardType={"email-address"}
              onChangeText={(email) => setEmail(email)}
            />

            <Text style={styles().titleTextField}>Nom d'utilisateur</Text>
            <MyTextInput
              placeholder="Nom d'utilisateur"
              onChangeText={(username) => setUsername(username)}
            />

            <Text style={styles().titleTextField}>Date de naissance</Text>
            <MyTextInput
              placeholder="Date de naissance"
              isDatepicker
              onDateChange={(birthdate) => setBirthdate(birthdate)}
              onChangeText={(birthdate) => setBirthdate(birthdate)}
            />

            <View style={{ marginTop: 20 }} />
            <RootSiblingParent>
              <Buttons
                texte={"S'inscrire"}
                backgroundColor="#E1604D"
                onPress={async () => {
                  if (email && username && birthdate) {
                    const response = await authService.checkUsernameEmail(
                      username,
                      email
                    );
                    console.log("STATUS:", response);
                    if (response) {
                      global.RegisterData = JSON.stringify({
                        email: email,
                        username: username,
                        birthdate: birthdate,
                        gender: gender,
                      });
                      // console.log(global.RegisterData);

                      navigation.replace("RegisterStep2");
                    } else {
                      Toast.show(
                        `Inscription échouée: identifiants déjà utilisé.`,
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
                  } else {
                    let errorMessage3 =
                      "\nInscription échouée, champs manquant(s) :\n";
                    if (username.trim() === "") {
                      errorMessage3 += " Nom d'utilisateur \n";
                    }
                    if (email.trim() === "") {
                      errorMessage3 += " Email \n";
                    }
                    if (password.trim() === "") {
                      errorMessage3 += " Mot de passe \n";
                    }
                    Toast.show(errorMessage3, {
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

            <Text
              style={(styles().loginText, { marginTop: 30, marginBottom: 30 })}
            >
              ou continuer avec
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 32 }}>
              <RootSiblingParent>
                {/* //A décommenter au moment de build */}
                {/* <Buttons
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
                /> */}
              </RootSiblingParent>
            </View>

            <Text style={styles().loginText}>
              J'ai déjà un compte{" "}
              <TouchableOpacity onPress={() => navigation.replace("Login2")}>
                <Text style={styles().colorStar}>Se connecter</Text>
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
      // // fontFamily: "SourceSansPro_600SemiBold",
      textAlign: "center",
      //   marginHorizontal: screenWidth / 30,
      marginBottom: screenHeight / 30,
    },
    titleTextField: {
      fontSize: 16,
      alignSelf: "flex-start",
      // // fontFamily: "SourceSansPro_600SemiBold",
      opacity: 0.4,
      marginLeft: 20,
    },
    loginText: {
      fontSize: 16,
      alignSelf: "center",
      // // fontFamily: "SourceSansPro_600SemiBold",
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
      // fontFamily: "SourceSansPro_600SemiBold",
      fontSize: 16,
      color: "white",
    },
    oauthButton: {
      borderRadius: 25,
      borderWidth: 1,
      borderColor: "#F4F6F9",
      height: 50,
      width: screenWidth < 350 ? 145 : 160,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      flexDirection: "row",
      shadowColor: "black",
      shadowOffset: {
        width: 2,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  });
};

export default Register;
