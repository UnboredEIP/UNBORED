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

const Login2 = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("M");
  const [number, setNumber] = useState("");
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
              <TouchableOpacity
                style={styles().boutton}
                onPress={async () => {
                  const response = await makeRLoginRequest(email, password);
                  if (response) {
                    Toast.show("Login succeed", {
                      duration: Toast.durations.LONG,
                      position: Toast.positions.BOTTOM,
                      backgroundColor: "green",
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                    });
                  } else {
                    Toast.show("Login failed", {
                      duration: Toast.durations.LONG,
                      position: Toast.positions.BOTTOM,
                      backgroundColor: "red",
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                    });
                  }
                }}
              >
                <Text style={styles().textButton}>Se connecter</Text>
              </TouchableOpacity>
            </RootSiblingParent>
            <TouchableOpacity>
              <Text
                style={
                  (styles().loginText,
                  { marginTop: 20, marginBottom: 20, color: "#E1604D" })
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
