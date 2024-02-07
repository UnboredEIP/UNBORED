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
import ChoosePreferences from "./src/ChoosePreferences";
import ForgetPasswordScreen from "./src/pages/profile/ForgetPassword";
import Login2 from "./src/pages/auth/Login2";
import Profile from "./src/pages/profile/Profile";
import styles from "./src/styles/styles2";
import Description from "./src/pages/profile/description";
import Calendar from "./src/pages/Calendar";
import MotDePasse from "./src/pages/profile/mdp";
import Avatar from "./src/pages/avatar";
import avatareyes from "./src/pages/avatareyes";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PreferencesUpdate from "./src/pages/settings/Preferences";
import { ImagePickerIOS } from "react-native";
class OTP2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <OTP />
      </View>
    );
  }
}

const checkKeys = async (prefix) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const filteredKeys = keys.filter((key) => key.startsWith(prefix));
    return filteredKeys.length > 0;
  } catch (error) {
    console.log(error);
  }
};

const checkFirstLaunch = async () => {
  try {
    // await AsyncStorage.removeItem("first");
    // const keys = await AsyncStorage.getAllKeys();
    // await AsyncStorage.multiRemove(keys);
    const firstLaunch = await AsyncStorage.getItem("firstLaunch");
    if (firstLaunch === null) {
      // L'application n'a jamais été lancée auparavant
      await AsyncStorage.setItem("firstLaunch", "true");
      return true;
    }
    // L'application a déjà été lancée auparavant
    return false;
  } catch (error) {
    console.log(error);
  }
};

class InitialScreen extends React.Component {
  async componentDidMount() {
    if (await checkFirstLaunch()) {
      this.props.navigation.replace("OnBoarding3");
      return;
    }
    const initialRoute = await checkKeys("authToken");
    this.props.navigation.replace(initialRoute ? "Accueil3" : "Home");
  }

  render() {
    return null;
  }
}

const AppNavigator = createStackNavigator(
  {
    Initial: {
      screen: InitialScreen,
    },
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
    Avatar: {
      screen: Avatar,
      navigationOptions: {
        ...TransitionPresets.FadeFromBottomAndroid,
      }
    },
    avatareyes: {
      screen: avatareyes,
      navigationOptions: {
        ...TransitionPresets.FadeFromBottomAndroid,
      }
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
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
    PreferencesUpdate: {
      screen: PreferencesUpdate,
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
    initialRouteName: "Initial",
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "white" },
    },
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    const prefix = "authToken";
    checkKeys(prefix).then((hasKey) => {
      if (hasKey) {
        console.log("AsyncStorage has a key that starts with " + prefix);
      } else {
        console.log(
          "AsyncStorage does not have a key that starts with " + prefix
        );
      }
    });
    return <AppContainer />;
  }
}
