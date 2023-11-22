import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import React, { useState, useEffect, useRef } from "react";
import OTP from "./pages/OTP";
import "../asset/SourceSansPro-Regular.otf";
import OTP3 from "./pages/OTP";
import Accueil3 from "./pages/Accueil";
import OnBoarding3 from "./pages/OnBoarding";
import Settings from "./pages/profile/Settings";
import Register2 from "./pages/auth/Register2";
import ChoosePreferences from "./ChoosePreferences";
import ForgetPasswordScreen from "./pages/profile/ForgetPassword";
import Login2 from "./pages/auth/Login2";
import Profile from "./pages/profile/Profile";
import styles from "./styles/styles2";
import Calendar from "./pages/Calendar";
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
    // Register2: {
    //   screen: Register2,
    //   navigationOptions: {
    //     ...TransitionPresets.SlideFromRightIOS,
    //   },
    // },
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
        ...TransitionPresets.ScaleFromCenterAndroid,
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
  },
  {
    headerMode: false,
    initialRouteName: "Home",
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "white" },
    },
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
