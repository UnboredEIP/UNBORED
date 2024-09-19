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
import MyTextInput from "../../../components/TextField";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-root-toast";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
import { RootSiblingParent } from "react-native-root-siblings";
import Buttons from "../../../components/Buttons";
import OTPInput from "../../../components/OTP_intputs";
import { UbService } from "../../../services/UbServices";
import { AuthService } from "../../../services/AuthService";
import LoadingPage from "../../Loading";

const RegisterStep2 = ({ navigation }) => {
  const ubservice = new UbService();
  const authService = new AuthService();
  // const [fontsLoaded] = useFonts({
  //   SourceSansPro_600SemiBold,
  // });

  // if (!fontsLoaded) {
  //   return <LoadingPage />;
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
              onPress={async () => {
                console.log(
                  "Value EMAIL",
                  JSON.parse(global.RegisterData).email.toLowerCase()
                );
                console.log("Value OTP", global.OTPValue);
                const response = await authService.checkOTP(
                  JSON.parse(global.RegisterData).email.toLowerCase(),
                  global.OTPValue
                );
                if (response) navigation.replace("RegisterStep3");
                else
                  Toast.show(`OTP Invalide`, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: "red",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                  });
              }}
            />

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
      fontSize: screenHeight < 768 ? 15 : 19,
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
