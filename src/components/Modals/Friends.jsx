import React from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import { AvatarCard } from "../AvatarCard";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

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
  "light",
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

const FriendsList = ({ users, onPress, onPressChat }) => {
  return (
    <View
      style={{
        height: screenHeight * 0.8,
        width: screenWidth * 0.83,
        borderRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: screenHeight * 0.03,
      }}
    >
      <Text
        style={{
          marginTop: screenHeight * 0.05,
          fontSize: screenHeight * 0.025,
          fontWeight: "bold",
        }}
      >
        Liste d'ami
      </Text>
      {users.length > 0 ? (
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: screenHeight * 0.02, // Adjust padding if needed
          }}
        >
          {users.map((user, index) => (
            <View
              key={index}
              style={{
                padding: screenHeight * 0.01,
              }}
            >
              <AvatarCard
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
                eyebrow={
                  user.style.eyebrows.id
                    ? listEyebrow[user.style.eyebrows.id]
                    : listEyebrow[1]
                }
                mouth={listMouth[user.style.mouth.id]}
                beard={listBeard[user.style.beard.id]}
                invitations={user.invitations}
                friends={user.friends}
                id={user._id}
                onPress={onPress}
                onPressChat={onPressChat}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View>
          <Text>Pas encore d'amis {"):"}</Text>
        </View>
      )}
    </View>
  );
};

export default FriendsList;
