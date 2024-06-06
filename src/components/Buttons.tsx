import React from "react";
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

interface ButtonsProps {
  onPress: () => void;
  texte?: string;
  textColor?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  hasIcon?: boolean;
  iconPath?: string;
  textSize?: number;
  disabled?: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({
  onPress,
  texte = "Boutton",
  textColor = "white",
  backgroundColor = "#E1604D",
  width = screenWidth / 2,
  height = 50,
  hasIcon = false,
  iconPath = "https://cdn.discordapp.com/attachments/1017170044091908298/1080063443987611669/unBored.gif?ex=655341f7&is=6540ccf7&hm=956eddad32a5e7640ffceb2493fd78a3cb8fb535342dd982e9fff97c82f2bbaf&",
  textSize = 16,
  disabled = false,
}) => {
  const [fontsLoaded] = useFonts({
    SourceSansPro_600SemiBold,
  });

  // if (!fontsLoaded) {
  //   return <Text>Font loading</Text>;
  // }

  const buttonStyles = disabled
    ? styles(textColor, "#AEB3BE", width, height, textSize).buttonDisabled
    : styles(textColor, backgroundColor, width, height, textSize).button;

  const textStyles = styles(textColor, backgroundColor, width, height, textSize)
    .textButton;

  if (!hasIcon) {
    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={!disabled ? onPress : undefined}
        disabled={disabled}
      >
        <Text style={textStyles}>{texte}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={!disabled ? onPress : undefined}
        disabled={disabled}
      >
        <Image
          source={{ uri: iconPath }}
          style={{ height: 25, width: 25, margin: 10 }}
        />
        <Text style={textStyles}>{texte}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = (textColor: string, backgroundColor: string, width: number, height: number, textSize: number) =>
  StyleSheet.create({
    button: {
      width: width,
      borderRadius: 50,
      height: height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: backgroundColor,
      opacity: 1,
    },
    buttonDisabled: {
      width: width,
      borderRadius: 50,
      height: height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: backgroundColor,
      opacity: 0.5,
    },
    textButton: {
      fontFamily: "SourceSansPro_600SemiBold",
      fontSize: textSize,
      color: textColor,
    },
  });

export default Buttons;
