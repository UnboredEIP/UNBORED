import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

const OnBoardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
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
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 28,
    marginBottom: 10,
    color: "#02013d",
    textAlign: "left",
    paddingHorizontal: 5 + "%",
    width: "60%",
  },
  description: {
    fontWeight: "300",
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 5 + "%",
  },
});
