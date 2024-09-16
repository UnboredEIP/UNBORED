import React from "react";
import { Dimensions, Text, View } from "react-native";
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
];

const ParticipantsActivity = ({ participents, onPressChat }) => {
  return (
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
      <Text>Fais connaissances avec eux</Text>
      {participents.length > 0 ? (
        participents.map((participent, index) => (
          <View
            key={index}
            style={{
              padding: screenHeight * 0.01,
            }}
          >
            <AvatarCard
              onPressChat={onPressChat}
              key={index}
              name={participent.username}
              size={100}
              colorHair={participent.style.hair.color}
              hair={listHair[participent.style.hair.id]}
              colorSkin={participent.style.head.color}
              clothTop={listTop[participent.style.accessory.id]}
              colorClothingTop={participent.style.accessory.color}
              colorBeard={participent.style.beard.color}
              eyes={listEyes[participent.style.eyes.id]}
              colorEye={participent.style.eyes.color}
              eyebrow={
                participent.style.eyebrows.id
                  ? listEyebrow[participent.style.eyebrows.id]
                  : listEyebrow[1]
              }
              mouth={listMouth[participent.style.mouth.id]}
              beard={listBeard[participent.style.beard.id]}
              invitations={participent.invitations}
              friends={participent.friends}
              id={participent._id}
              // key={index}
              // name={participent.username}
              // size={100}
              // colorHair={participent.style.hair.color}
              // hair={listHair[participent.style.hair.id]}
              // colorSkin={participent.style.head.color}
              // clothTop={listTop[participent.style.accessory.id]}
              // colorClothingTop={participent.style.accessory.color}
              // colorBeard={participent.style.beard.color}
              // eyes={listEyes[participent.style.eyes.id]}
              // // eyebrow={
              // //   participent.style.eyebrows.id
              // //     ? listEyebrow[participent.style.eyebrows.id]
              // //     : listEyebrow[1]
              // // }
              // mouth={listMouth[participent.style.mouth.id]}
              // beard={listBeard[participent.style.beard.id]}
              // invitations={participent.invitations}
              // friends={participent.friends}
              // id={participent._id}
            />
          </View>
        ))
      ) : (
        <View>
          <Text>Pas encore de participent, sois le premier !</Text>
        </View>
      )}
    </View>
  );
};

export default ParticipantsActivity;
