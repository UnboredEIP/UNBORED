import { View, Dimensions, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import tw from "twrnc";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const LoadingPage = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <LottieView
        source={require("../../assets/animations/Loading_Animation.json")}
        autoPlay
        loop={false}
        // style={tw`w-[150] h-[150]`}
        style={styles().animation}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    animation: {
      width: screenWidth,
      height: screenHeight,
    },
  });
};

export default LoadingPage;
