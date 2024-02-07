import React, { useRef } from "react";
import { StyleSheet, TextInput, Dimensions, View } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const OTPInput = ({ isDisabled, length = 6 }) => {
  const inputsRefs = useRef([]);

  const handleChangeText = (text, index) => {
    if (text.length !== 0 && inputsRefs.current[index + 1]) {
      return inputsRefs.current[index + 1].focus();
    } else if (text.length === 0 && index > 0 && inputsRefs.current[index - 1])
      return inputsRefs.current[index - 1].focus();
  };

  return (
    <View style={styles().container}>
      {[...new Array(length)].map((item, index) => (
        <TextInput
          ref={(ref) => {
            if (ref && !inputsRefs.current.includes(ref)) {
              inputsRefs.current.push(ref);
            }
          }}
          key={index}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          style={styles().input}
          editable={!isDisabled}
          keyboardType="numeric"
          testID={`OTPInput-${index}`}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleChangeText("", 0);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = () => {
  return StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: "center",
    },
    input: {
      alignSelf: "center",
      textAlign: "center",
      fontSize: screenHeight / 30,
      color: "white",
      width: 45,
      height: 55,
      color: "black",
      backgroundColor: "white",
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "#E1604D",
    },
  });
};

export default OTPInput;
