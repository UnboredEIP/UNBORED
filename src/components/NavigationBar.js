import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Navbar = ({ navigation }) => {
  const isAccueil3Page = navigation.state.routeName === 'Accueil3';
  const isProfilePage = navigation.state.routeName === 'Profile';
  const isSettingsPage = navigation.state.routeName === 'Settings'; 
  const isCalendarPage = navigation.state.routeName === 'Calendar'; 
  const getIconBackgroundColor = (page) => {
    return page ? "#E1604D" : "#5265FF1A";
  };
  const getIconColor = (page) => {
    return page ? "#fff" : "#E1604D";
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => navigation.replace("Accueil3")}
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor(isAccueil3Page) },
        ]}
      >
        <Icon name="home" size={25} color={getIconColor(isAccueil3Page)} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Calendar')}
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor(isCalendarPage) },
        ]}
      >
        <Icon name="calendar" size={25} color={getIconColor(isCalendarPage)} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Settings")}
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor(isSettingsPage) },
        ]}
      >
        <Icon
          name="folder-open"
          size={25}
          color={getIconColor(isSettingsPage)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Profile")}
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor(isProfilePage) },
        ]}
      >
        <Icon name="user" size={25} color={getIconColor(isProfilePage)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    left: 0,
    right: 0,
    height: 70,
    zIndex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  iconContainer: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
  },
});

export default Navbar;
