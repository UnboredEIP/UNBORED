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
import MyTextInput from "../../../components/TextField";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-root-toast";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
import { RootSiblingParent } from "react-native-root-siblings";
import Buttons from "../../../components/Buttons";
import { AuthService } from "../../../services/AuthService";
import LoadingPage from "../../Loading";
const RegisterStep3 = ({ navigation }) => {
  const authService = new AuthService();
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("M");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [birthdate, setBirthdate] = useState("");

  if (!fontsLoaded) {
    return <LoadingPage />;
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

            <Text style={styles().h1}>S'inscrire gratuitement</Text>

            <Text style={styles().titleTextField}>
              Mot de passe<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />

            <Text style={styles().titleTextField}>
              Confirmer mot de passe
              <Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(password2) => setPassword2(password2)}
              handleOnBlur={() => {
                if (password2 !== password) {
                  Toast.show("Mot de passe non similaire !", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: "red",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                  });
                  setPassword("");
                  setPassword2("");
                } else console.log("MATCH !");
              }}
            />
            <Text style={styles().titleTextField}>Description</Text>
            <MyTextInput
              placeholder="Description"
              onChangeText={(description) => setDescription(description)}
            />
            {/* <Text style={styles().titleTextField}>
              {JSON.parse(global.RegisterData).username}
            </Text> */}
            <RNPickerSelect
              onValueChange={(value) => {
                setGender(value);
                console.log(gender);
              }}
              items={[
                { label: "Homme", value: "Homme" },
                { label: "Femme", value: "Femme" },
              ]}
              placeholder={{ label: "Sélectionnez un genre", value: null }}
              style={{
                inputIOS: {
                  marginTop: 10,
                  fontSize: 16,
                  padding: 12,
                  alignItems: "center",
                  width: "auto",
                  alignSelf: "center",
                  textAlign: "center",
                  borderWidth: 2,
                  borderColor: "#E1604D",
                  borderRadius: 20,
                  color: "white",
                  paddingRight: 30,
                  backgroundColor: "#E1604D",
                  opacity: 0.8,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderWidth: 0.5,
                  borderColor: "#E1604D",
                  borderRadius: 8,
                  color: "black",
                  paddingRight: 30,
                },
              }}
            />
            <View style={{ marginTop: 20 }} />
            <RootSiblingParent>
              <Buttons
                texte={"S'inscrire"}
                backgroundColor="#E1604D"
                onPress={async () => {
                  if (
                    JSON.parse(global.RegisterData).username !== "" &&
                    JSON.parse(global.RegisterData).email !== "" &&
                    password !== "" &&
                    gender !== ""
                  ) {
                    const response = await authService.getRegister(
                      JSON.parse(global.RegisterData).username,
                      JSON.parse(global.RegisterData).email,
                      password,
                      gender,
                      description,
                      JSON.parse(global.RegisterData).birthdate,
                      global.OTPValue
                    );
                    if (response === true) {
                      console.log("success");
                      Toast.show("Registration succeed", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        backgroundColor: "green",
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                      });
                      navigation.replace("Login2");
                    } else {
                      console.log(JSON.parse(global.RegisterData).username);
                      console.log(JSON.parse(global.RegisterData).email);
                      console.log(password),
                        console.log(gender),
                        console.log(JSON.parse(global.RegisterData).birthdate);
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
                    if (JSON.parse(global.RegisterData).username === "") {
                      errorMessage3 += " Nom d'utilisateur \n";
                    }
                    if (JSON.parse(global.RegisterData).email === "") {
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

export default RegisterStep3;
