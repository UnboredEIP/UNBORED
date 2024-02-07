import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./Buttons";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const MyTextInput = ({
  placeholder,
  secureTextEntry,
  isDatepicker = false,
  onDateChange,
  keyboardType,
  onChangeText,
  borderColor = "#AEB3BE",
  dateSelect = new Date(),
  hasIcon = false,
  iconPath,
  handleOnBlur = () => {},
  height = screenHeight / 17,
}) => {
  const [date, setDate] = useState(dateSelect);
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderInput = () => {
    if (isDatepicker) {
      if (show === true) {
        return (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (event.type === "set" && selectedDate) {
                setDate(selectedDate);
                const isoDateString = selectedDate.toISOString();
                onDateChange && onDateChange(isoDateString);
              }
              // if (isFocused == false) {
              //   setShow(false);
              // }
            }}
          />
        );
      } else return null;
    } else {
      return (
        <TextInput
          style={styles(borderColor, isFocused, height).input}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry || false}
          returnKeyType="done"
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={() => {
            handleBlur();
            handleOnBlur();
          }}
        />
      );
    }
  };

  return (
    <SafeAreaView>
      {isDatepicker == false ? null : (
        <View style={{ marginTop: 10, alignSelf: "center" }}>
          <Button
            title="Show Date Picker"
            // width="100%"
            texte={show === false ? "Sélectionner birthdate" : "Close Picker"}
            width={screenWidth / 2}
            onPress={() => {
              if (show === true) setShow(false);
              else setShow(true);
            }}
          />
        </View>
      )}
      {renderInput()}
    </SafeAreaView>
  );
};

const styles = (borderColor, isFocused, height) => {
  return StyleSheet.create({
    input: {
      height: height,
      width: screenWidth / 1.2,
      margin: 12,
      borderWidth: isFocused ? 1.5 : 2,
      padding: 10,
      borderRadius: 20,
      borderColor: isFocused ? "#E1604D" : borderColor,
      opacity: isFocused ? 1 : 0.5,
    },
  });
};

export default MyTextInput;
