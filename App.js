import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import React, { useState, useEffect, useRef } from "react";
import OTP from "./src/pages/OTP";
import "./asset/SourceSansPro-Regular.otf";
import OTP3 from "./src/pages/OTP";
import Accueil3 from "./src/pages/Accueil";
import OnBoarding3 from "./src/pages/OnBoarding";
import Settings from "./src/pages/profile/Settings";
import Register2 from "./src/pages/auth/Register2";
import CreateAccount from "./src/pages/auth/Register";
import ChoosePreferences from "./src/ChoosePreferences";
import ForgetPasswordScreen from "./src/pages/profile/ForgetPassword";
import Login2 from "./src/pages/auth/Login2";
import LoginScreen from "./src/pages/auth/Login";
import Profile from "./src/pages/profile/Profile";
import styles from "./src/styles/styles2";
import Description from "./src/pages/profile/description";
import Calendar from "./src/pages/Calendar";
import MotDePasse from "./src/pages/profile/mdp";
import { NavigationContainer } from "@react-navigation/native";

class OTP2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <OTP />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Register2,
      navigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: {
        ...TransitionPresets.DefaultTransition,
      },
    },
    Choose: {
      screen: ChoosePreferences,
      navigationOptions: {
        ...TransitionPresets.FadeFromBottomAndroid,
      },
    },
    Register2: {
      screen: Register2,
      navigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
    },
    Login2: {
      screen: Login2,
      navigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
    },
    OTP2: {
      screen: OTP2,
      navigationOptions: {
        ...TransitionPresets.ModalSlideFromBottomIOS,
      },
    },
    OTP3: {
      screen: OTP3,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    MotDePasse: {
      screen: MotDePasse,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    OnBoarding3: {
      screen: OnBoarding3,
      navigationOptions: {
        ...TransitionPresets.RevealFromBottomAndroid,
      },
    },
    Accueil3: {
      screen: Accueil3,
      navigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
    Description: {
      screen: Description,
      navigationOptions: {
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
  },
  {
    headerMode: false,
    initialRouteName: "Login2",
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "white" },
    },
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    console.error = (error) => error; 
    return <AppContainer />;
  }
}
