import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ColorValue,
  Dimensions,
  AppLoading,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_200ExtraLight_Italic,
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
  SourceSansPro_900Black,
  SourceSansPro_900Black_Italic,
} from "@expo-google-fonts/source-sans-pro";
import MainStyles from "../../styles/styles2";
import { ScrollView } from "react-native-gesture-handler";
import MyTextInput from "../../components/TextField";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Register2 = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });
  const [selectedLanguage, setSelectedLanguage] = useState();

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

            <Text style={styles().h1}>S'inscrire gratuitement</Text>

            <Text style={styles().titleTextField}>
              Email<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput placeholder="Email" keyboardType={"email-address"} />

            <Text style={styles().titleTextField}>Nom d'utilisateur</Text>
            <MyTextInput placeholder="Nom d'utilisateur" />

            <Text style={styles().titleTextField}>
              Mot de passe<Text style={styles().colorStar}>*</Text>
            </Text>
            <MyTextInput placeholder="Mot de passe" secureTextEntry={true} />

            <Text style={styles().titleTextField}>Numéro de téléphone</Text>
            <MyTextInput
              placeholder="Nom d'utilisateur"
              keyboardType={"numeric"}
            />

            <Text style={styles().titleTextField}>
              Date de naissance
            </Text>
            <MyTextInput
              placeholder="Date de naissance"
              isDatepicker
              onDateChange={(selectedDate) => console.log(selectedDate)}
            />


            <Text style={styles().titleTextField}>Nom d'utilisateur</Text>
            <MyTextInput placeholder="Nom d'utilisateur" />

            <Text style={styles().titleTextField}>Nom d'utilisateur</Text>
            <MyTextInput placeholder="Nom d'utilisateur" />

            <TouchableOpacity
              style={styles().loginBtn}
              onPress={() => Alert.alert("Ca arrive ;)")}
            >
              <Text style={styles().textButton}>S'inscrire</Text>
            </TouchableOpacity>
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
      backgroundColor: "white",
    },
    Mainbox: {
      flex: 1,
      alignItems: "center",
      //   justifyContent: "center",
      //   marginTop: screenHeight < 768 ? 41 : 50,
      marginVertical: screenHeight < 768 ? 41 : 50,
      marginHorizontal: screenWidth / 15,
      backgroundColor: "white",
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
    colorStar: {
      color: "red",
    },
    loginBtn: {
      width: "80%",
      borderRadius: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E1604D",
      borderColor: "#b3b3b3",
      borderWidth: 1,
    },
    textButton: {
      fontFamily: "SourceSansPro_600SemiBold",
      fontSize: 16,
      color: "white",
    },
  });
};

export default Register2;
