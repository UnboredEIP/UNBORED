import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { UbService } from "../../services/UbServices";
import Navbar from "../../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AvatarCardFriendAccept } from "../../components/AvatarCard";
import LoadingPage from "../Loading";
import { BackArrow } from "../../../assets/avatars/avatars";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const listHair = [
  "null",
  "calvitie",
  "buzzcut",
  "big",
  "afro",
  "frizzy",
  "curvy",
  "curlyshort",
  "curly",
  "mediumdreads",
  "medium",
  "longstraight",
  "longdreads",
  "shaggymullet",
  "shaggy",
  "minidreads",
  "mediumlong",
  "square",
  "shortwaved",
  "shortflat",
];

const listMouth = [
  "null",
  "grimace",
  "eating",
  "desbelief",
  "default",
  "serious",
  "scream",
  "sad",
  "open",
  "vomit",
  "twinkle",
  "tongue",
  "smile",
];

const listTop = [
  "null",
  "hoodie",
  "crewneck",
  "blazer",
  "shirt",
  "scoopneck",
  "polo",
  "vneck",
  "overall",
];

const listEyebrow = [
  "null",
  "natural",
  "flat",
  "exited",
  "angry",
  "updown",
  "unibrow",
  "sad2",
  "sad",
];

const listBeard = [
  "null",
  "medium",
  "majestic",
  "ligth",
  "mustachemagnum",
  "mustache",
];

const listEyes = [
  "null",
  "dizzy",
  "default",
  "cry",
  "closed",
  "side",
  "heart",
  "happy",
  "eyeroll",
  "wink",
  "wacky",
  "surprised",
  "squint",
  "angry",
  "updown",
  "unibrow",
  "sad2",
  "sad",
];

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

const FriendsRequest = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [users, setUsers] = useState([]);
  const ubservice = new UbService();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // await AsyncStorage.removeItem("favourites");
        const authToken = await AsyncStorage.getItem("authToken");

        const response = await fetch(
          "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setProfileData(responseData);

        // console.log("MY FRIENDS", responseData.user.friends);

        if (responseData !== null) {
          if (responseData.user.invitations.friends.length > 0) {
            const users2 = [];
            for (const user of responseData.user.invitations.friends) {
              const user2 = await ubservice.getUserById(user._id);
              // console.log(user2);
              if (user2) {
                users2.push(user2);
              }
            }
            setUsers(users2);
            console.log("USERS:", users2);
          }
          //   setUsers(responseData.user.invitations.friends);
        }
      } catch (error) {
        console.error("Error fetchData:", error);
        // await AsyncStorage.removeItem("authToken");
        // navigation.replace("Login2");
      }
    };

    fetchData();
    // getFavouritesEvents();
  }, [navigation, users]);

  if (
    profileData === null ||
    (profileData !== null &&
      profileData.user.invitations.friends.length !== 0 &&
      users.length !== profileData.user.invitations.friends.length)
  ) {
    return <LoadingPage />;
  } else
    return (
      <View
        style={{
          flex: 1,
          // marginHorizontal: screenHeight * 0.01,
        }}
      >
        <ScrollView
          horizontal={false}
          nestedScrollEnabled={true}
          style={{
            width: screenWidth,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: screenHeight / 15,
              left: screenWidth / 20,
              zIndex: 1,
            }}
            onPress={() => navigation.replace("Accueil3")}
          >
            <BackArrow
              style={{
                width: screenWidth / 12,
                height: screenWidth / 12,
                color: "black",
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              // borderColor: "#EBEEF2",
              height: screenHeight * 0.8,
              width: screenWidth * 0.83,
              borderRadius: 20,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {users.length > 0 ? (
              users.map((user, index) => (
                <View
                  key={index}
                  style={{
                    padding: screenHeight * 0.01,
                  }}
                >
                  <AvatarCardFriendAccept
                    key={index}
                    name={user.username}
                    size={100}
                    colorHair={user.style.hair.color}
                    hair={listHair[user.style.hair.id]}
                    colorSkin={user.style.head.color}
                    clothTop={listTop[user.style.accessory.id]}
                    colorClothingTop={user.style.accessory.color}
                    colorBeard={user.style.beard.color}
                    eyes={listEyes[user.style.eyes.id]}
                    mouth={listMouth[user.style.mouth.id]}
                    beard={listBeard[user.style.beard.id]}
                    invitations={user.invitations}
                    friends={user.friends}
                    id={user._id}
                  />
                </View>
              ))
            ) : (
              <View>
                <Text>Pas de nouvelle demande d'ami</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: screenHeight * 0.0062,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: screenHeight / 10,
  },
  image: {
    height: screenHeight * 0.4,
    width: screenHeight * 0.49,
  },
  title: {
    textAlign: "center",
    color: "#E1604D",
    fontWeight: "600",
    fontSize: screenHeight * 0.03,
  },
  date: {
    textAlign: "center",
    color: "#E1604D",
    fontWeight: "600",
    fontSize: screenHeight * 0.023,
  },
  time: {
    textAlign: "left",
    color: "black",
    fontWeight: "500",
    fontSize: screenHeight * 0.04,
    marginTop: screenHeight * 0.017,
  },
  categoryContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.01,
    alignItems: "center",
  },
  category: {
    width: screenHeight * 0.1,
    height: screenHeight * 0.04,
    borderWidth: 1,
    borderColor: "#E1604D",
    borderRadius: 100,
    justifyContent: "center",
  },
  categoryText: {
    fontWeight: "600",
    fontSize: screenHeight * 0.02,
    color: "#E1604D",
    textAlign: "center",
  },
  participantsContainer: {
    marginTop: screenHeight * 0.017,
  },
  participantsText: {
    fontWeight: "500",
    fontSize: screenHeight * 0.027,
  },
  locationContainer: {
    marginTop: screenHeight * 0.069,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationTextContainer: {
    flexDirection: "row",
  },
  locationIcon: {
    width: screenHeight * 0.04,
    height: screenHeight * 0.04,
    marginTop: screenHeight * 0.001,
  },
  locationText: {
    marginLeft: screenHeight * 0.02,
    fontSize: screenHeight * 0.02,
    fontWeight: "bold",
    textAlign: "center",
  },
  vectorIcon: {
    width: screenHeight * 0.01,
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.0006,
  },
  ratingContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: screenHeight * 0.01,
  },
  backButton: {
    position: "absolute",
    top: screenHeight / 15,
    left: screenWidth / 20,
    zIndex: 1,
  },
  backIcon: {
    width: screenWidth / 12,
    height: screenWidth / 12,
  },
});

export default FriendsRequest;
