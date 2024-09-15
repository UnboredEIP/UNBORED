import React, { useState, useEffect } from "react";
import { TouchableOpacity, Dimensions, Text, View, Image } from "react-native";
import vector from "../../../asset/Vector.png";
import book from "../../../asset/bookmark.png";
import loc from "../../../asset/location_on.png";
import startFilled from "../../../assets/star_filled.png";
import startUnfilled from "../../../assets/star_unfilled.png";
import { UbService } from "../../services/UbServices";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
global.currentEventId = 0;

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const ubService = new UbService();
const MAX_NAME_LENGTH = screenWidth * 0.065;

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

const truncateName = (name) => {
  if (name.length > MAX_NAME_LENGTH) {
    return name.substring(0, MAX_NAME_LENGTH) + "...";
  }
  return name;
};

const EventCard = ({
  onPress = () => {},
  name = "Five Ivry",
  address = "Ivry-sur-seine",
  pictures,
  categories = ["Football", "Sport"],
  date = "2024-01-28T12:00:00.000Z",
  participents,
  size = 290,
  id,
  rate,
  isSaved = false,
  handleRefresh = () => {},
}) => {
  const [isActivitySaved, setIsActivitySaved] = useState(isSaved);
  const renderStars = (ratings) => {
    let totalStars = 0;
    ratings.forEach((rating) => {
      totalStars += parseInt(rating.stars);
    });
    const averageStars = Math.round(totalStars / ratings.length); // Calculate average stars and round to nearest integer
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      if (i <= averageStars) {
        stars.push(
          <Image
            key={i}
            style={{ width: size * 0.04, height: size * 0.04 }}
            source={startFilled}
          />
        );
      } else {
        stars.push(
          <Image
            key={i}
            style={{ width: size * 0.04, height: size * 0.04 }}
            source={startUnfilled}
          />
        );
      }
    }
    return stars;
  };

  useEffect(() => {}, [global.favEvents, isActivitySaved]);

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
        onPress={() => {
          global.currentEventId = id;
          onPress();
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
            fontSize: size * 0.026,
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
            fontSize: size * 0.069 - name.length * 0.2,
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
          Heure début: {extractTime(date)}
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
                fontSize: size * 0.03,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {truncateName(address)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              if (isActivitySaved === false) {
                const response = await ubService.favEvent([id]);

                if (response) {
                  setIsActivitySaved(!isActivitySaved);
                  handleRefresh();
                  Toast.show("Activité enregistrée", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: "green",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                  });
                } else
                  Toast.show("Veuillez réessayer", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: "red",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                  });
              } else {
                const response = await ubService.deleteFavEvent([id]);
                if (response) {
                  let favourites = global.favEvents;

                  if (!favourites) {
                    favourites = [];
                  }
                  const existingFavourite = global.favEvents.findIndex(
                    (event) => event === global.currentEventId
                  );
                  if (existingFavourite !== -1) {
                    favourites.splice(existingFavourite, 1);
                    global.favEvents = favourites;
                  }

                  setIsActivitySaved(!isActivitySaved);
                  handleRefresh();
                  Toast.show("Activité désenregistrée", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: "green",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                  });
                } else
                  Toast.show("Veuillez réessayer", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: "red",
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                  });
              }
            }}
          >
            <Image
              style={{
                width: isActivitySaved === false ? size * 0.04 : size * 0.05,
                height: isActivitySaved === false ? size * 0.06 : size * 0.07,
                marginTop: size * 0.001,
              }}
              source={isActivitySaved === false ? vector : book}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: size * 0.04,
        }}
      >
        {renderStars(rate)}
      </View>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); // Change this to directly set modalVisible to false
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    // padding: 2,
                    // alignItems: "center",
                    // elevation: 5,
                  }}
                >
                  <ActivityModal pictures={pictures} date={date} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
    </View>
  );
};

export default EventCard;
