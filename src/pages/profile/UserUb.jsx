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
import vector from "../../../asset/Vector.png";
import loc from "../../../asset/location_on.png";
import startFilled from "../../../assets/star_filled.png";
import startUnfilled from "../../../assets/star_unfilled.png";
import { UbService } from "../../services/UbServices";
import Buttons from "../../components/Buttons";
import ParticipantsActivity from "../../components/Modals/ParticipantsActivity";
import Toast from "react-native-root-toast";
import LoadingPage from "../Loading";
import { BackArrow } from "../../../assets/avatars/avatars";
import Swiper from "react-native-swiper";
import MyAvatar from "../../components/Avatar";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const IS_ENROLL = 1;
const NOT_ENROLL = 2;
const defaultImage = {
  id: 1,
  url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
  description: "Default Image",
};

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

const renderStars = (ratings) => {
  let totalStars = 0;
  ratings.forEach((rating) => {
    totalStars += parseInt(rating.stars); // Sum up all the stars
  });
  const averageStars = Math.round(totalStars / ratings.length); // Calculate average stars and round to nearest integer
  const stars = [];
  const maxStars = 5; // Maximum number of stars
  for (let i = 1; i <= maxStars; i++) {
    if (i <= averageStars) {
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

const UserUbPage = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(defaultImage);
  const [participents, setParticipents] = useState([]);
  const [isEnroll, setIsEnroll] = useState(NOT_ENROLL);
  const ubService = new UbService();

  //   function userIsEnroll(events, id) {
  //     // for (const invitation of invitations) {
  //     for (const event of events) {
  //       if (event === id) {
  //         setIsEnroll(IS_ENROLL);
  //         // console.log("ENROLL");
  //         return true;
  //       }
  //       // }
  //     }

  //     return false; // ID not found in invitations
  //   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ubService.getUserById(global.currentUserId);
        if (!response) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = response;

        if (responseData) setUserData(responseData);
        // userIsEnroll(global.reservedEvents, global.currentEventId);

        console.log("USER style:", responseData);
        if (responseData.profilePhoto) {
          const img = await ubService.getImage(responseData.profilePhoto);
          setImage(img);
        }
      } catch (error) {
        console.error("Error fetchData:", error);
      }
    };

    fetchData();
  }, [userData]);

  if (
    userData === null ||
    (userData !== null &&
      userData.profilePhoto !== undefined &&
      image === defaultImage)
  ) {
    return <LoadingPage />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: screenHeight / 15,
            left: screenWidth / 20,
            zIndex: 1,
          }}
          onPress={() => navigation.goBack()}
        >
          <BackArrow
            style={{
              width: screenWidth / 12,
              height: screenWidth / 12,
              color: "black",
            }}
          />
        </TouchableOpacity>

        <Swiper
          style={styles.swiperContainer}
          loop={false}
          nestedScrollEnabled={true}
        >
          <View style={styles.slide}>
            <Image
              source={{ uri: image.url }}
              style={{
                width: 400,
                height: 400,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          </View>
          <View style={styles.slide2}>
            <MyAvatar
              size={200}
              colorSkin={userData.style.head.color}
              eyes={listEyes[userData.style.eyes.id]}
              clothTop={listTop[userData.style.accessory.id]}
              colorClothingTop={userData.style.accessory.color}
              hair={listHair[userData.style.hair.id]}
              colorHair={userData.style.hair.color}
              colorEye={userData.style.eyes.color}
              beard={listBeard[userData.style.beard.id]}
              mouth={listMouth[userData.style.mouth.id]}
              eyebrow={listEyebrow[userData.style.eyebrows.color]}
            />
          </View>
        </Swiper>

        {/* <Image style={styles.image} source={{ uri: image.url }} /> */}
        <View style={styles.categoryContainer}>
          {/* <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>
              {userData.participents.length} personne(s)
            </Text>
          </View> */}
          {/* <TouchableOpacity>
            <View style={styles.category}>
              <Text style={styles.categoryText}>{userData.categories[0]}</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <Text style={styles.title}>{userData.username}</Text>
        {/* <Text style={styles.date}>{formatDate(userData.start_date)}</Text> */}
        {/* <Text style={styles.time}>
          Heure début: {extractTime(userData.start_date)}
        </Text> */}
        <View
          style={{
            marginVertical: 10,
          }}
        />
        {/* <Buttons
          texte="Voir les participants"
          onPress={() => {
            setModalVisible(true);
          }}
        /> */}
        {/* <View style={styles.ratingContainer}>{renderStars(userData.rate)}</View> */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
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
                    }}
                  >
                    <ParticipantsActivity participents={participents} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: screenHeight * 0.00027,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: screenHeight / 10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
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
  swiperContainer: {
    // width: "100%",
    height: 150,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    right: screenWidth * 0.25,
    paddingBottom: 140,
  },
});

export default UserUbPage;
