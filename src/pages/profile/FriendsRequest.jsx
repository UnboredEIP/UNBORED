import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { UbService } from "../../services/UbServices";
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

const FriendsRequest = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [users, setUsers] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // État pour savoir si l'animation a déjà été jouée
  const animations = useRef([]).current;
  const ubservice = new UbService();

  const fetchData = async () => {
    try {
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

      if (responseData && responseData.user.invitations.friends.length > 0) {
        const users2 = [];
        for (const user of responseData.user.invitations.friends) {
          const user2 = await ubservice.getUserById(user._id);
          if (user2) {
            users2.push(user2);
          }
        }
        setUsers(users2);
      }
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetchData:", error);
    }
  };

  // Première récupération des données et rafraîchissement toutes les 5 secondes
  useEffect(() => {
    fetchData(); // Récupération initiale des données

    const intervalId = setInterval(() => {
      fetchData(); // Rafraîchir les données toutes les 5 secondes
    }, 1000);

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle à la fin
  }, [navigation]);

  // Jouer l'animation seulement lors de la première fois que les utilisateurs sont chargés
  useEffect(() => {
    if (isDataLoaded && users.length > 0 && !hasAnimated) {
      users.forEach((_, index) => {
        animations[index] = new Animated.Value(0);
      });
      animateAvatars();
      setHasAnimated(true); // L'animation a été jouée
    }
  }, [isDataLoaded, users]);

  const animateAvatars = () => {
    users.forEach((_, index) => {
      if (animations[index]) {
        Animated.timing(animations[index], {
          toValue: 1,
          duration: 500,
          delay: index * 500,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  if (
    profileData === null ||
    (profileData !== null &&
      profileData.user.invitations.friends.length !== 0 &&
      users.length !== profileData.user.invitations.friends.length)
  ) {
    return <LoadingPage />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal={false}
          nestedScrollEnabled={true}
          style={{ width: screenWidth }}
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

          <View style={styles.avatarContainer}>
            {users.length > 0 ? (
              users.map((user, index) => (
                <Animated.View
                  key={index}
                  style={{
                    ...styles.avatarCard,
                    opacity: animations[index],
                    transform: [
                      {
                        translateY:
                          animations[index]?.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }) || 0,
                      },
                    ],
                  }}
                >
                  <AvatarCardFriendAccept
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
                </Animated.View>
              ))
            ) : (
              <Text>Pas de nouvelle demande d'ami</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
  avatarContainer: {
    paddingTop: screenHeight * 0.09,
    paddingBottom: screenHeight * 0.1,
    paddingHorizontal: screenWidth * 0.08,
    alignItems: "center",
  },
  avatarCard: {
    marginVertical: screenHeight * 0.015,
    borderRadius: 20,
    padding: screenHeight * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
});

export default FriendsRequest;
