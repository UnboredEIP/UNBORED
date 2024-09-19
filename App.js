import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import React from "react";
import OTP from "./src/pages/OTP";
import "./asset/SourceSansPro-Regular.otf";
import OTP3 from "./src/pages/OTP";
import Accueil3 from "./src/pages/Accueil";
import OnBoarding3 from "./src/pages/OnBoarding";
import Settings from "./src/pages/profile/Settings";
import ChoosePreferences from "./src/ChoosePreferences";
import ForgetPasswordScreen from "./src/pages/profile/ForgetPassword";
import Login2 from "./src/pages/auth/Login2";
import Profile from "./src/pages/profile/Profile";
import styles from "./src/styles/styles2";
import Description from "./src/pages/profile/description";
import Calendar from "./src/pages/Calendar";
import MotDePasse from "./src/pages/profile/mdp";
import Avatar from "./src/pages/avatar";
import NewEvent from "./src/pages/NewEvent";
import avatareyes from "./src/pages/avatareyes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PreferencesUpdate from "./src/pages/settings/Preferences";
import Register from "./src/pages/auth/Register_Pages/Register";
import RegisterStep2 from "./src/pages/auth/Register_Pages/Register_step2";
import RegisterStep3 from "./src/pages/auth/Register_Pages/Register_step3";
import EditEvent from "./src/pages/EditEvent";
import TimelineEventsPage from "./src/pages/Events/TimelineEvents";
import activites from "./src/pages/activites";
import Event from "./src/pages/Events/Event";
import FriendsRequest from "./src/pages/profile/FriendsRequest";
import SavedEventsPage from "./src/pages/Events/SavedEvents";
import shop from "./src/pages/shop";
import Chat from "./src/pages/chat";
import History from "./src/pages/history";
import UserUbPage from "./src/pages/profile/UserUb";
import { useState } from "react";

import * as CalendarDevice from "expo-calendar";
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

    // await AsyncStorage.removeItem("firstLaunch");

    const firstLaunch = await AsyncStorage.getItem("firstLaunch");
    if (firstLaunch === null) {
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
    this.props.navigation.replace(initialRoute ? "Accueil3" : "OnBoarding3");
  }

  render() {
    return null;
  }
}

const AppNavigator = createStackNavigator(
  {
    Initial: {
      screen: InitialScreen,
      // screen: Login2,
    },
    Chat: {
      screen: Chat,
    },
    Home: {
      screen: Register,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    RegisterStep2: {
      screen: RegisterStep2,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    RegisterStep3: {
      screen: RegisterStep3,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    activites: {
      screen: activites,
    },
    Choose: {
      screen: ChoosePreferences,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    Avatar: {
      screen: Avatar,
      navigationOptions: {
        ...TransitionPresets.ModalTransition,
      },
    },
    shop: {
      screen: shop,
    },
    avatareyes: {
      screen: avatareyes,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    Login2: {
      screen: Login2,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    OTP2: {
      screen: OTP2,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    OTP3: {
      screen: OTP3,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    MotDePasse: {
      screen: MotDePasse,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    OnBoarding3: {
      screen: OnBoarding3,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    Accueil3: {
      screen: Accueil3,
      navigationOptions: {
        animationEnabled: false,
      },
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    NewEvent: {
      screen: NewEvent,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    EditEvent: {
      screen: EditEvent,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    Settings: {
      screen: Settings,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // ...TransitionPresets.ModalTransition,
      // },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        animationEnabled: false,
      },
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    PreferencesUpdate: {
      screen: PreferencesUpdate,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        animationEnabled: false,
      },
      navigationOptions: {
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
    Description: {
      screen: Description,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    TimelineEventsPage: {
      screen: TimelineEventsPage,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    Event: {
      screen: Event,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    FriendsRequest: {
      screen: FriendsRequest,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
    },
    SavedEventsPage: {
      screen: SavedEventsPage,

      navigationOptions: {
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
    History: {
      screen: History,

      navigationOptions: {
        ...TransitionPresets.ScaleFromCenterAndroid,
      },
    },
    UserUbPage: {
      screen: UserUbPage,
      // navigationOptions: {
      // ...TransitionPresets.ModalTransition,
      // },
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
