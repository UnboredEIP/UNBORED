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
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
import Buttons from "../../../components/Buttons";
import OTPInput from "../../../components/OTP_intputs";
import { UbService } from "../../../services/UbServices";

const RegisterStep2 = ({ navigation }) => {
  const ubservice = new UbService();
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("M");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [birthdate, setBirthdate] = useState("");

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
              source={require("../../../../assets/logo2.gif")}
              style={{ height: 200, width: 200 }}
            />

            <Text style={styles().h1}>
              Veuillez entrer le code reçu sur l'addresse mail indiqué
            </Text>
            <OTPInput />
            <View style={{ marginTop: 20 }} />
            <Buttons
              texte="Confirmer"
              onPress={() => {
                navigation.replace("RegisterStep3");
              }}
            />
            {/* <Text style={styles().titleTextField}>
              {JSON.parse(global.RegisterData).username}
            </Text> */}

            <View
              style={(styles().loginText, { marginTop: 30, marginBottom: 30 })}
            ></View>
            {/* <View style={{ flexDirection: "row", marginBottom: 32 }}>
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
            </View> */}

            <Text style={styles().loginText}>
              J'ai déjà un compte{" "}
              <TouchableOpacity onPress={() => navigation.replace("Login")}>
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
      fontSize: screenHeight < 768 ? 15 : 19,
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

export default RegisterStep2;
