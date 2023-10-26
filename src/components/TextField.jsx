import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Dimensions } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const MyTextInput = ({ placeholder, secureTextEntry, isDatepicker = false, onDateChange, keyboardType }) => {
  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());

  const renderInput = () => {
    if (isDatepicker) {
      return (
        <DateTimePicker
        style={styles.test}
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
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry || false}
          returnKeyType="done"
          keyboardType={keyboardType}
        />
      );
    }
  };

  return <SafeAreaView>{renderInput()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  input: {
    height: screenHeight / 17,
    width: screenWidth / 1.2,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: "#E1604D",
  },
});

export default MyTextInput;
