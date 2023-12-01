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
  F,
} from "react-native";
import {
  useFonts,
  SourceSansPro_600SemiBold,
} from "@expo-google-fonts/source-sans-pro";
import { ScrollView } from "react-native-gesture-handler";
import MyTextInput from "../../components/TextField";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-root-toast";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
import { RootSiblingParent } from "react-native-root-siblings";
import Buttons from "../../components/Buttons";

async function makeRegisterRequest(
  username,
  email,
  password,
  gender,
  number,
  description,
  birthdate,
  preferences
) {
  try {
    const response = await fetch("http://20.216.143.86/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        gender,
        number,
        description,
        birthdate,
        preferences,
      }),
    });
    if (response.status === 201) {
      console.log("User created");
      return true;
    } else {
      console.error(response.json);
      return false;
    }
  } catch (error) {
    console.error("Request error: ", error);
    return false;
  }
}

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
    if (response.status === 201) {
      console.log("User created");
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

const Register2 = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
              source={require("../../../assets/logo2.gif")}
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

            <Text style={styles().titleTextField}>
              Mot de passe<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />

            <Text style={styles().titleTextField}>Numéro de téléphone</Text>
            <MyTextInput
              placeholder="Numéro de téléphone"
              keyboardType={"numeric"}
              onChangeText={(number) => setNumber(number)}
            />

            <Text style={styles().titleTextField}>Date de naissance</Text>
            <MyTextInput
              placeholder="Date de naissance"
              isDatepicker
              onDateChange={(birthdate) => setBirthdate(birthdate)}
              onChangeText={(birthdate) => setBirthdate(birthdate)}
            />
            <Text style={styles().titleTextField}>Genre</Text>
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
            <Text style={styles().titleTextField}>Description</Text>
            <MyTextInput
            height={screenHeight/8}
              placeholder="Description"
              onChangeText={(description) => setDescription(description)}
            />
            <RootSiblingParent>
              <Buttons
                texte={"S'inscrire"}
                backgroundColor="#E1604D"
                onPress={async () => {
                  if (
                    username !== "" &&
                    email !== "" &&
                    password !== "" &&
                    gender !== ""
                  ) {
                    const response = await makeRegisterRequest(
                      username,
                      email,
                      password,
                      gender,
                      number,
                      description,
                      birthdate,
                      []
                    );
                    if (response) {
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
                      console.log("fail");
                      Toast.show("Registration failed", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        backgroundColor: "red",
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                      });
                    }
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

export default Register2;
