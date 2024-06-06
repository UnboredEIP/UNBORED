import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
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
  setPasswordValid,
}) => {
  const [date, setDate] = useState(dateSelect);
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/;
    setPasswordValid(passwordRegex.test(password));
  };

  const handlePasswordChange = (password) => {
    validatePassword(password);
    onChangeText(password);
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
            }}
          />
        );
      } else return null;
    } else {
      return (
        <View style={styles(borderColor, isFocused, height).inputContainer}>
          <TextInput
            style={styles(borderColor, isFocused, height).input}
            onChangeText={secureTextEntry ? handlePasswordChange : onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            returnKeyType="done"
            keyboardType={keyboardType}
            onFocus={handleFocus}
            onBlur={() => {
              handleBlur();
              handleOnBlur();
            }}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles(borderColor, isFocused, height).toggleButton}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Text style={styles(borderColor, isFocused, height).toggleButtonText}>
                {isPasswordVisible ? "Cacher" : "Montrer"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      {isDatepicker == false ? null : (
        <View style={{ marginTop: 10, alignSelf: "center" }}>
          <Button
            title="Show Date Picker"
            texte={show === false ? "Sélectionne l'anniversaire" : "Fermer"}
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
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: height,
      width: screenWidth / 1.2,
      margin: 12,
      borderWidth: isFocused ? 1.5 : 2,
      borderRadius: 20,
      borderColor: isFocused ? "#E1604D" : borderColor,
      opacity: isFocused ? 1 : 0.5,
    },
    input: {
      flex: 1,
      padding: 10,
      borderRadius: 20,
    },
    toggleButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleButtonText: {
      color: '#E1604D',
      fontWeight: 'bold',
    },
  });
};

export default MyTextInput;
