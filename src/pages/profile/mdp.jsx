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

async function makeRLoginRequest(email) {
  try {
    const response = await fetch(
      "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/askreset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
  } catch {
    console.log("error");
  }
}

const MotDePasse = ({ navigation }) => {
  // const [fontsLoaded] = useFonts({
  //   SourceSansPro_600SemiBold,
  // });
  const [email, setEmail] = useState("");
  // if (!fontsLoaded) {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // }

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

            <Text style={styles().h1}>Mot de Passe Oublié ?</Text>
            <Text
              style={(styles().loginText, { marginTop: 10, marginBottom: 20 })}
            >
              Nous allons vous envoyez un E-mail sur l'adresse que vous
              remplissez si nous trouvons un compte lié à cette adresse
            </Text>
            <Text style={styles().titleTextField}>
              Email<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Email"
              keyboardType={"email-address"}
              onChangeText={(email) => setEmail(email)}
            />

            <RootSiblingParent>
              <View style={{ marginBottom: 10 }}></View>
              <Buttons
                texte={"Changer son mot de passe"}
                onPress={async () => {
                  if (email !== "") {
                    const response = await makeRLoginRequest(email);
                    navigation.navigate("Login2");
                  } else {
                    Toast.show("Veuillez remplir l'Email", {
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
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
      // fontFamily: "SourceSansPro_600SemiBold",
      textAlign: "center",
      //   marginHorizontal: screenWidth / 30,
      marginBottom: screenHeight / 30,
    },
    titleTextField: {
      fontSize: 16,
      alignSelf: "flex-start",
      // fontFamily: "SourceSansPro_600SemiBold",
      opacity: 0.4,
      marginLeft: 20,
    },
    loginText: {
      fontSize: 16,
      alignSelf: "center",
      // fontFamily: "SourceSansPro_600SemiBold",
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
  });
};

export default MotDePasse;
