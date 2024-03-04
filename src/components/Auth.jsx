// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import { CLIENT_ID_ANDROID, CLIENT_ID_IOS, CLIENT_ID_WEB } from "@env";
// import { View } from "react-native";

// export default function () {
//   GoogleSignin.configure({
//     scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: CLIENT_ID_WEB, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
//     iosClientId: CLIENT_ID_IOS,
//     offlineAccess: true,
//     forceCodeForRefreshToken: true,
//     profileImageSize: 120,
//   });

//   return (
//     <View>
//       <GoogleSigninButton
//         size={GoogleSigninButton.Size.Wide}
//         color={GoogleSigninButton.Color.Dark}
//         onPress={async () => {
//           try {
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             //   setState({ userInfo });
//             console.log(JSON.stringify(userInfo, null, 2));
//           } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//               // user cancelled the login flow
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//               // operation (e.g. sign in) is in progress already
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//               // play services not available or outdated
//             } else {
//               console.error(error);
//               // some other error happened
//             }
//           }
//         }}
//       />
//     </View>
//   );
// }
