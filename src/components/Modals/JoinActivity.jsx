import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  View,
  Image,
  Modal,
} from "react-native";
import vector from "../../../asset/Vector.png";
import loc from "../../../asset/location_on.png";
import startFilled from "../../../assets/star_filled.png";
import startUnfilled from "../../../assets/star_unfilled.png";
import { UbService } from "../../services/UbServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const ubService = new UbService();

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const dateExtraite = dateObj.toISOString().split("T")[0];

  return dateExtraite;
}

function extractTime(dateTimeString) {
  // Create a new Date object from the given date string
  const date = new Date(dateTimeString);

  // Extract hours, minutes, and seconds
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Construct the time string
  const timeString = `${hours}:${minutes}`;

  return timeString;
}

const ActivityModal = ({
  name = "Five Ivry",
  address = "Ivry-sur-seine",
  pictures,
  categories = ["Football", "Sport"],
  date = "2024-01-28T12:00:00.000Z",
  participents,
  size = 290,
  id,
  rate = 4,
  handleRefresh = () => {},
}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Image
            key={i}
            style={{ width: screenHeight * 0.04, height: screenHeight * 0.04 }}
            source={startFilled}
          />
        );
      } else {
        stars.push(
          <Image
            key={i}
            style={{ width: screenHeight * 0.04, height: screenHeight * 0.04 }}
            source={startUnfilled}
          />
        );
      }
    }
    return stars;
  };

  return (
    <View
      style={{
        // borderColor: "#EBEEF2",
        height: screenHeight * 0.8,
        width: screenWidth * 0.83,
        borderRadius: 20,
        overflow: "hidden",
        alignItems: "center",

        paddingTop: screenHeight / 20,
      }}
    >
      <Image
        style={{
          height: screenHeight * 0.27,
          width: screenHeight * 0.3,
          // resizeMode: "cover",
        }}
        // source={pictures}
        source={{ uri: pictures }}
      />
      <Text
        style={{
          textAlign: "center",
          color: "#E1604D",
          fontWeight: 600,
          fontSize: screenHeight * 0.04,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "#E1604D",
          fontWeight: 600,
          fontSize: screenHeight * 0.023,
        }}
      >
        {formatDate(date)}
      </Text>
      <Text
        style={{
          textAlign: "left",
          color: "black",
          fontWeight: 500,
          fontSize: screenHeight * 0.04,
          marginTop: screenHeight * 0.017,
        }}
      >
        Heure début: {extractTime(date)}
      </Text>
      <View style={{ marginTop: screenHeight * 0.054, flexDirection: "row" }}>
        <TouchableOpacity>
          <View
            style={{
              width: screenHeight * 0.227,
              height: screenHeight * 0.076,
              borderWidth: 1,
              borderColor: "#E1604D",
              borderRadius: 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: screenHeight * 0.031,
                color: "#E1604D",
                textAlign: "center",
              }}
            >
              {categories[0]}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", marginLeft: screenHeight * 0.024 }}
        >
          <View
            style={{
              backgroundColor: "grey",
              zIndex: 2,
              width: screenHeight * 0.069,
              height: screenHeight * 0.069,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "white",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: screenHeight * 0.034,
                textAlign: "center",
                color: "white",
              }}
            >
              M
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "grey",
              zIndex: 1,
              width: screenHeight * 0.069,
              left: -size * 0.035,
              height: screenHeight * 0.069,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "white",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: screenHeight * 0.034,
                textAlign: "center",
                color: "white",
              }}
            >
              A
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "grey",
              width: screenHeight * 0.069,
              left: -size * 0.069,
              height: screenHeight * 0.069,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "white",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: screenHeight * 0.034,
                textAlign: "center",
                color: "white",
              }}
            >
              C
            </Text>
          </View>
        </View>
        <Text
          style={{
            textAlign: "center",
            marginTop: screenHeight * 0.017,
            fontWeight: 500,
            fontSize: screenHeight * 0.027,
            left: -size * 0.041,
          }}
        >
          {participents} personne(s)
          {/* {data[0]["1"]["going"] + "K+ y vont"} */}
        </Text>
      </View>
      <View
        style={{
          marginTop: screenHeight * 0.069,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: screenHeight * 0.04,
              height: screenHeight * 0.04,
              marginTop: screenHeight * 0.001,
            }}
            source={loc}
          ></Image>
          <Text
            style={{
              marginLeft: screenHeight * 0.02,
              fontSize: screenHeight * 0.02,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {address}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleRefresh();
          }}
        >
          <Image
            style={{
              width: screenHeight * 0.01,
              height: screenHeight * 0.03,
              marginTop: screenHeight * 0.0006,
            }}
            source={vector}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: screenHeight * 0.01,
        }}
      >
        {renderStars(rate)}
      </View>
    </View>
  );
};

export default ActivityModal;
