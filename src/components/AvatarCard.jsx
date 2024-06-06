import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MyAvatar from "./Avatar";
import Buttons from "./Buttons";
import { UbService } from "../services/UbServices";
import Toast from "react-native-root-toast";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const NOT_FRIENDS = 1;
const WAIT_FOR_ACCEPT = 2;
const IS_FRIEND = 3;

const AvatarCard = ({
  name = "user",
  clothTop,
  eyes,
  size = 200,
  hair,
  beard,
  colorSkin = "#E1604D",
  colorEye = "green",
  colorHair = "black",
  colorClothingTop = "black",
  mouth,
  eyebrow,
  //@ts-ignore
  hat,
  colorHat,
  invitations,
  friends,
  //@ts-ignore
  id,
  onPress,
}) => {
  const uberservice = new UbService();
  const [isFollowed, setIsFollowed] = useState(NOT_FRIENDS);
  const MAX_NAME_LENGTH = screenWidth * 0.0305;

  //@ts-ignore
  const truncateName = (name) => {
    if (name.length > MAX_NAME_LENGTH) {
      return name.substring(0, MAX_NAME_LENGTH) + "...";
    }
    return name;
  };

  // console.log("FRIENDS:", friends);

  function isIdInInvitations(invitations, friends, id) {
    // for (const invitation of invitations) {
    for (const friend of invitations.friends) {
      if (friend._id === id) {
        setIsFollowed(WAIT_FOR_ACCEPT);
        return true; // ID found in invitations
      }
      // }
    }
    for (const friend of friends) {
      if (friend._id === id) {
        setIsFollowed(IS_FRIEND);
        return true; // ID found in invitations
      }
      // }
    }
    console.log("NOT FOUND");
    return false; // ID not found in invitations
  }

  // console.log("MES INVITATIONS:", invitations.friends._id);

  useEffect(() => {
    if (invitations.friends.length > 0 || friends.length > 0) {
      isIdInInvitations(invitations, friends, global.myId);
    }
    if (id === global.myId) {
      setIsFollowed(5);
    }
  }, [isFollowed]);

  return (
    <TouchableOpacity
      style={styles(size).container}
      onPress={() => {
        global.currentUserId = id;
        onPress();
      }}
    >
      <View style={styles(size).leftSection}>
        <View style={styles(size).avatarContainer}>
          <MyAvatar
            clothTop={clothTop}
            colorHair={colorHair}
            eyes={eyes}
            size={size / 2}
            hair={hair}
            beard={beard}
            colorSkin={colorSkin}
            colorEye={colorEye}
            colorClothingTop={colorClothingTop}
            mouth={mouth}
            eyebrow={eyebrow}
            hat={hat}
            colorHat={colorHat}
          />
        </View>
        <Text style={styles(size).name}>{truncateName(name)}</Text>
      </View>
      {isFollowed === NOT_FRIENDS ? (
        <Buttons
          texte="suivre"
          textSize={size * 0.13}
          width={size * 0.6}
          height={size * 0.3}
          onPress={async () => {
            const response = await uberservice.sendFriendRequest(id);

            if (response) {
              console.log("SUCCESS FRIEND REQUEST");
              setIsFollowed(WAIT_FOR_ACCEPT);
            } else console.log("FAILED FRIEND REQUEST");
          }}
        />
      ) : isFollowed === WAIT_FOR_ACCEPT ? (
        <Buttons
          texte="en attente"
          textSize={size * 0.1}
          width={size * 0.6}
          height={size * 0.3}
          onPress={() => {}}
          backgroundColor="grey"
        />
      ) : isFollowed === IS_FRIEND ? (
        <Buttons
          texte="ami(e)"
          backgroundColor="green"
          textSize={size * 0.13}
          width={size * 0.6}
          height={size * 0.3}
          onPress={() => {}}
        />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

const AvatarCardFriendAccept = ({
  name = "user",
  clothTop = "shirt",
  eyes = "wink",
  size = 200,
  hair = "afro",
  beard = "majestic",
  colorSkin = "#D08B5B",
  colorEye = "green",
  colorHair = "black",
  colorClothingTop = "black",
  mouth = "grimace",
  eyebrow = "natural",
  //@ts-ignore
  hat,
  colorHat = "yellow",
  invitations,
  //@ts-ignore
  id,
  onPress,
}) => {
  const uberservice = new UbService();
  const [isFollowed, setIsFollowed] = useState(NOT_FRIENDS);
  const MAX_NAME_LENGTH = 11;

  //@ts-ignore
  const truncateName = (name) => {
    if (name.length > MAX_NAME_LENGTH) {
      return name.substring(0, MAX_NAME_LENGTH) + "...";
    }
    return name;
  };

  function isIdInInvitations(invitations, id) {
    // for (const invitation of invitations) {
    for (const friend of invitations.friends) {
      if (friend._id === id) {
        setIsFollowed(WAIT_FOR_ACCEPT);
        return true; // ID found in invitations
      }
      // }
    }
    console.log("NOT FOUND");
    return false; // ID not found in invitations
  }

  // console.log("MES INVITATIONS:", invitations.friends._id);

  useEffect(() => {
    if (invitations.friends.length > 0) {
      isIdInInvitations(invitations, global.myId);
    }
    if (id === global.myId) {
      setIsFollowed(5);
    }
  }, [isFollowed]);

  return (
    <TouchableOpacity
      style={styles(size).container}
      onPress={() => {
        global.currentUserId = id;
        onPress();
      }}
    >
      <View style={styles(size).leftSection}>
        <View style={styles(size).avatarContainer}>
          <MyAvatar
            clothTop={clothTop}
            colorHair={colorHair}
            eyes={eyes}
            size={size / 2}
            hair={hair}
            beard={beard}
            colorSkin={colorSkin}
            colorEye={colorEye}
            colorClothingTop={colorClothingTop}
            mouth={mouth}
            eyebrow={eyebrow}
            hat={hat}
            colorHat={colorHat}
          />
        </View>
        <Text style={styles(size).name}>{truncateName(name)}</Text>
      </View>
      <Buttons
        texte="Accepter"
        textSize={size * 0.13}
        width={size * 0.6}
        height={size * 0.3}
        onPress={async () => {
          const response = await uberservice.acceptFriendRequest(id);
          if (response) {
            console.log("SUCCESS FRIEND REQUEST");
            Toast.show("Nouvel(le) ami(e)", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              backgroundColor: "green",
              shadow: true,
              animation: true,
              hideOnPress: true,
            });
            setIsFollowed(IS_FRIEND);
          } else {
            console.log("FAILED FRIEND REQUEST");

            Toast.show("Veuillez réessayez", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              backgroundColor: "red",
              shadow: true,
              animation: true,
              hideOnPress: true,
            });
          }
        }}
      />
    </TouchableOpacity>
  );
};

//@ts-ignore
const styles = (size) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 20,
      borderRadius: 10,
      borderWidth: 0.3,
      width: size * 2.5,
      height: size * 0.9,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatarContainer: {
      paddingBottom: screenHeight * 0.06,
    },
    name: {
      fontSize: size * 0.14,
      marginLeft: size * 0.6,
    },
  });
};

export { AvatarCard, AvatarCardFriendAccept };
