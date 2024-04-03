import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
} from "react-native";
import vector from "../../../asset/Vector.png";
import loc from "../../../asset/location_on.png";
import { UbService } from "../../services/UbServices";
import { RootSiblingParent } from "react-native-root-siblings";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const ubService = new UbService();

function formatDate(dateString) {
  const dateObj = new Date(dateString);

  // Extraction de la date au format 'YYYY-MM-DD'
  const dateExtraite = dateObj.toISOString().split("T")[0];

  return dateExtraite;
}

const EventCard = ({
  name = "Five Ivry",
  address = "Ivry-sur-seine",
  pictures,
  categories = ["Football", "Sport"],
  date = "2024-01-28",
  participents,
  heure = "00:00",
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#EBEEF2",
        marginRight: 10,
        height: 290,
        width: 220,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Image
        style={{
          height: 50 + "%",
          width: 100 + "%",
          resizeMode: "cover",
        }}
        // source={pictures}
        source={{ uri: pictures }}
      ></Image>
      <View
        style={{
          position: "absolute",
          top: 16,
          height: 29,
          width: 56,
          right: 10 + "%",
          backgroundColor: "white",
          borderRadius: 8,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#E1604D",
            fontWeight: 600,
            fontSize: 8,
          }}
        >
          {formatDate(date)}
        </Text>
      </View>
      <View style={{ marginLeft: 18, width: 83 + "%", top: 20 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#E1604D",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: 500,
            fontSize: 10,
            marginTop: 5,
          }}
        >
          Heure début: {heure}
        </Text>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <View
            style={{
              width: 66,
              height: 22,
              borderWidth: 1,
              borderColor: "#E1604D",
              borderRadius: 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 9,
                color: "#E1604D",
                textAlign: "center",
              }}
            >
              {categories[0]}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 7 }}>
            <View
              style={{
                backgroundColor: "grey",
                zIndex: 2,
                width: 24,
                height: 24,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
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
                width: 24,
                left: -10,
                height: 24,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
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
                width: 24,
                left: -20,
                height: 24,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
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
              marginTop: 5,
              fontWeight: 500,
              fontSize: 8,
              left: -12,
            }}
          >
            {participents} personne(s)
            {/* {data[0]["1"]["going"] + "K+ y vont"} */}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image style={{ width: 8, height: 11 }} source={loc}></Image>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {address}
            </Text>
          </View>
          <Image style={{ width: 11, height: 15 }} source={vector}></Image>
        </View>
      </View>
    </View>
  );
};

export default EventCard;