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
import { RootSiblingParent } from "react-native-root-siblings";
import Buttons from "../../../components/Buttons";
import { AuthService } from "../../../services/AuthService";
import LoadingPage from "../../Loading";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

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
  const [isDisabled, setIsDisabled] = useState(true);

  const validateForm = () => {
    if (password !== password2) {
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
      return false;
    }
    return true;
  };

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

            <Text style={styles().h1}>S'inscrire gratuitement</Text>

            <Text style={styles().titleTextField}>
              Mot de passe<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              setPasswordValid={setIsDisabled}
            />

            <Text style={styles().titleTextField}>
              Confirmer mot de passe
              <Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(password2) => setPassword2(password2)}
              handleOnBlur={validateForm}
              setPasswordValid={setIsDisabled}
            />
            <Text style={styles().titleTextField}>Description</Text>
            <MyTextInput
              placeholder="Description"
              onChangeText={(description) => setDescription(description)}
            />
            <RNPickerSelect
              onValueChange={(value) => {
                setGender(value);
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
                  if (!validateForm()) {
                    return;
                  }

                  if (
                    JSON.parse(global.RegisterData).username !== "" &&
                    JSON.parse(global.RegisterData).email !== "" &&
                    password !== "" &&
                    gender !== ""
                  ) {
                    setIsDisabled(false);
                    const response = await authService.getRegister(
                      JSON.parse(global.RegisterData).username,
                      JSON.parse(global.RegisterData).email,
                      password,
                      gender,
                      description,
                      JSON.parse(global.RegisterData).birthdate,
                      global.OTPValue
                    );
                    setIsDisabled(false);
                    if (response === true) {
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
                      Toast.show(
                        `Inscription échouée: identifiants déjà utilisés.`,
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
                disabled={!isDisabled}
              />
            </RootSiblingParent>

            <View style={{ marginTop: 30, marginBottom: 30 }}></View>

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

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    Mainbox: {
      flex: 1,
      alignItems: "center",
      marginVertical: screenHeight < 768 ? 41 : 50,
      marginHorizontal: screenWidth / 15,
    },
    h1: {
      fontSize: screenHeight < 768 ? 20 : 24,
      fontFamily: "SourceSansPro_600SemiBold",
      textAlign: "center",
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
  });
};

export default RegisterStep3;
