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
  size = 290,
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#EBEEF2",
        height: size,
        width: size / 1.4,
        borderRadius: 20,
        overflow: "hidden",
        marginHorizontal: 5,
      }}
    >
      <Image
        style={{
          height: size / 6 + "%",
          width: size / 2.2 + "%",
          resizeMode: "cover",
        }}
        // source={pictures}
        source={{ uri: pictures }}
      ></Image>
      <View
        style={{
          position: "absolute",
          top: size * 0.055,
          height: size * 0.1,
          width: size * 0.2,
          right: size * 0.035,
          backgroundColor: "white",
          borderRadius: size * 0.027,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#E1604D",
            fontWeight: 600,
            fontSize: size * 0.034,
          }}
        >
          {formatDate(date)}
        </Text>
      </View>
      <View
        style={{
          marginLeft: size * 0.062,
          width: size * 0.6,
          top: size * 0.029,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#E1604D",
            fontWeight: 600,
            fontSize: size * 0.069,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontWeight: 500,
            fontSize: size * 0.04,
            marginTop: size * 0.017,
          }}
        >
          Heure début: {heure}
        </Text>
        <View style={{ marginTop: size * 0.054, flexDirection: "row" }}>
          <View
            style={{
              width: size * 0.227,
              height: size * 0.076,
              borderWidth: 1,
              borderColor: "#E1604D",
              borderRadius: 100,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: size * 0.031,
                color: "#E1604D",
                textAlign: "center",
              }}
            >
              {categories[0]}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: size * 0.024 }}>
            <View
              style={{
                backgroundColor: "grey",
                zIndex: 2,
                width: size * 0.069,
                height: size * 0.069,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: size * 0.034,
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
                width: size * 0.069,
                left: -size * 0.035,
                height: size * 0.069,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: size * 0.034,
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
                width: size * 0.069,
                left: -size * 0.069,
                height: size * 0.069,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: size * 0.034,
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
              marginTop: size * 0.017,
              fontWeight: 500,
              fontSize: size * 0.027,
              left: -size * 0.041,
            }}
          >
            {participents} personne(s)
            {/* {data[0]["1"]["going"] + "K+ y vont"} */}
          </Text>
        </View>
        <View
          style={{
            marginTop: size * 0.069,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: size * 0.04,
                height: size * 0.04,
                marginTop: size * 0.015,
              }}
              source={loc}
            ></Image>
            <Text
              style={{
                marginLeft: size * 0.041,
                fontSize: size * 0.042,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {address}
            </Text>
          </View>
          <Image
            style={{
              width: size * 0.03,
              height: size * 0.04,
              marginTop: size * 0.015,
            }}
            source={vector}
          ></Image>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
