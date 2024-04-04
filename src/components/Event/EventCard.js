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
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const ubService = new UbService();

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const dateExtraite = dateObj.toISOString().split("T")[0];

  return dateExtraite;
}

async function updateFavourites(name, id) {
  try {
    // await AsyncStorage.removeItem("favourites");
    let favourites = await AsyncStorage.getItem("favourites");

    if (favourites === null) {
      console.log("No favourites yet");
      favourites = [];
    } else {
      favourites = JSON.parse(favourites);
    }

    const existingFavourite = favourites.findIndex(
      (preference) => preference.id === id
    );

    if (existingFavourite !== -1) {
      console.log("Remove from favourites:", favourites[existingFavourite]);

      favourites.splice(existingFavourite, 1);
      await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
      // console.log("Updated favourites:", favourites);
      // console.log("ALL FAVOURITES:", await AsyncStorage.getItem("favourites"));
      return;
    }
    favourites.push({ name, id });
    await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
    // console.log("Updated favourites:", favourites);
    console.log("ALL FAVOURITES:", await AsyncStorage.getItem("favourites"));
  } catch (error) {
    console.error("Error updating favourites:", error);
  }
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
  id,
  handleRefresh = () => {},
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
      <TouchableOpacity
        onPress={async () => {
          updateFavourites(name, id);
          handleRefresh();
        }}
      >
        <Image
          style={{
            height: size / 2.5,
            width: size / 2.2 + "%",
            resizeMode: "cover",
          }}
          // source={pictures}
          source={{ uri: pictures }}
        />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: size * 0.035,
          backgroundColor: "white",
          borderRadius: size * 0.027,

          top: size * 0.28,
          height: size * 0.1,
          width: size * 0.2,
          // right: size * 0.035,
          // backgroundColor: "white",
          // borderRadius: size * 0.027,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#E1604D",
            fontWeight: 600,
            fontSize: size * 0.02,
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
          <TouchableOpacity>
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
          </TouchableOpacity>
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
                marginTop: size * 0.001,
              }}
              source={loc}
            ></Image>
            <Text
              style={{
                marginLeft: size * 0.041,
                fontSize: size * 0.036,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {address}
            </Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              updateFavourites(name, id);
              handleRefresh();
            }}
          >
            <Image
              style={{
                width: size * 0.05,
                height: size * 0.07,
                marginTop: size * 0.001,
              }}
              source={vector}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
