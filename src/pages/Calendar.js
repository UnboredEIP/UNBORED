import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Navbar from '../components/NavigationBar';

const Calendar = ({ navigation }) => {
  return (
    <View style={{flex:1}}>
    <Text> Mon profil UnBored</Text>
    <Navbar navigation={navigation} />
    </View>
  );
};

export default Calendar;