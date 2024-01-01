import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
} from "react-native";
import {
  useFonts,
  SourceSansPro_600SemiBold,
} from "@expo-google-fonts/source-sans-pro";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

// Composants Boutton bien modulable my man
const Buttons = ({
  onPress,
  texte = "Boutton",
  textColor = "white",
  backgroundColor = "#E1604D",
  // width = screenWidth < 350 ? 145 : 160,
  width = screenWidth / 2,
  height = 50,
  hasIcon = false,
  iconPath = "https://cdn.discordapp.com/attachments/1017170044091908298/1080063443987611669/unBored.gif?ex=655341f7&is=6540ccf7&hm=956eddad32a5e7640ffceb2493fd78a3cb8fb535342dd982e9fff97c82f2bbaf&",
  textSize = 16,
}) => {
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text> Font loading</Text>;
  }

  if (hasIcon === false) {
    return (
      <TouchableOpacity
        style={
          styles(textColor, backgroundColor, width, height, textSize).boutton
        }
        onPress={onPress}
      >
        <Text
          style={
            styles(textColor, backgroundColor, width, height, textSize)
              .textButton
          }
        >
          {texte}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={
          styles(textColor, backgroundColor, width, height, textSize)
            .oauthButton
        }
        onPress={onPress}
      >
        <Image
          source={{ uri: iconPath }}
          style={{ height: 25, width: 25, margin: 10 }}
        />
        <Text
          style={
            (styles().textButton,
            {
              color: textColor,
              fontSize: 16,
              fontFamily: "SourceSansPro_600SemiBold",
            })
          }
        >
          {texte}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = (textColor?, backgroundColor?, width?, height?, textSize?) => {
  return StyleSheet.create({
    boutton: {
      width: width,
      borderRadius: 50,
      height: height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: backgroundColor,
      // marginTop: 50,
    },
    textButton: {
      fontFamily: "SourceSansPro_600SemiBold",
      fontSize: textSize,
      color: textColor,
    },
    oauthButton: {
      borderRadius: 25,
      borderWidth: 1,
      borderColor: "#F4F6F9",
      height: height,
      width: width,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      backgroundColor: backgroundColor,
      flexDirection: "row",
      shadowColor: "black",
      shadowOffset: {
        width: 2,
        height: 1,
      }, // Shadow offset
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  });
};

export default Buttons;
