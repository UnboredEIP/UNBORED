import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import slides from "../slides";
import OnBoardingItem from "../OnBoardingItem";
import Button from "../components/Buttons";

function Onboarding3({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const firstOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(firstOpacity, {
      toValue: 1,
      delay: 500,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  });

  const onViewableItemsChanged = ({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
    // Do stuff
  };

  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  return (
    <Animated.View style={[styles.container, { opacity: firstOpacity }]}>
      <View style={styles.contentContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnBoardingItem item={item} navigation={navigation} />  }
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
      </View>
      
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E1604D",
    marginHorizontal: 3,
    borderRadius: 50,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E1604D",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});

export default Onboarding3;
