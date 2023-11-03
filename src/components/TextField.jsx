import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  dateSelect = new Date()
}) => {
  const [date, setDate] = useState(dateSelect);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderInput = () => {
    if (isDatepicker) {
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
          }}
        />
      );
    } else {
      return (
        <TextInput
          style={styles(borderColor, isFocused).input}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry || false}
          returnKeyType="done"
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    }
  };

  return <SafeAreaView>{renderInput()}</SafeAreaView>;
};

const styles = (borderColor, isFocused) => {
  return StyleSheet.create({
    input: {
      height: screenHeight / 17,
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
