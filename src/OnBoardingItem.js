import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Button from "./components/Buttons";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const OnBoardingItem = ({ item, navigation }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width, height }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image source={item.image} style={[styles.image]} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            <Text>{item.title}</Text>
            <Text style={{ color: "#E1604D", fontWeight: "bold" }}>
              {item.title_sub}
            </Text>
            <Text>{item.title_subb}</Text>
          </Text>
          <Text style={[styles.description, { color: "#02013d" }]}>
            {item.description}
          </Text>
          {item.id === "3" ? (
            <Button
              texte="Commencer"
              width="50%"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.10,
  },
  scrollViewContainer: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    resizeMode: "contain",
    height: height / 2,
    width: height / 2,
  },
  textContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 28,
    marginBottom: 10,
    color: "#02013d",
    textAlign: "left",
    paddingHorizontal: "5%",
    // width: "60%",
  },
  description: {
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: "5%",
  },
});
