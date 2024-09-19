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
import Buttons from "../../components/Buttons";
import FriendsList from "../../components/Modals/Friends";
import LoadingPage from "../Loading";
import { BackArrow } from "../../../assets/avatars/avatars";
import Swiper from "react-native-swiper";
import MyAvatar from "../../components/Avatar";
import EventCard from "../../components/Event/EventCard";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;


const NOT_FRIENDS = 1;
const WAIT_FOR_ACCEPT = 2;
const IS_FRIEND = 3;

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

const UserUbPage = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(defaultImage);
  const [events, setEvents] = useState([]);
  const ubService = new UbService();
  const [images, setImages] = useState([defaultImage]);
  const [refresh, setRefresh] = useState(true);
  const [isFollowed, setIsFollowed] = useState(NOT_FRIENDS);

  function isIdInInvitations(invitations, friends, id) {
    // for (const invitation of invitations) {
    for (const friend of invitations.friends) {
      if (friend._id === global.myId) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ubService.getUserById(global.currentUserId);
        if (!response) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = response;

        const eventsObj =
          global.myId === global.currentUserId
            ? await ubService.getUserEventsById(global.myId)
            : await ubService.getUserEventsById(global.currentUserId);

        isIdInInvitations(response.invitations, response.friends, global.myId);
        if (eventsObj) {
          setEvents(eventsObj);
          const imagePromises = eventsObj.map(async (event) => {
            const img = await ubService.getImage(event.pictures[0].id);
            return img;
          });
          const imageResults = await Promise.all(imagePromises);
          setImages(imageResults);
        }
        if (responseData) setUserData(responseData);

        if (response.friends.length > 0) {
          const users = [];
          if (global.currentUserId === global.myId) {
            setIsFollowed(5);
          }
          for (const friend of response.friends) {
            const user = await ubService.getUserById(friend._id);
            if (user) {
              users.push(user);
            }
          }
          setFriends(users);
        }
        if (response.profilePhoto) {
          const img = await ubService.getImage(response.profilePhoto);
          setImage(img);
        }
      } catch (error) {
        console.error("Error fetchData:", error);
      }
    };

    fetchData();

    const fetchDataInterval = setInterval(fetchData, 5000);

    const logInterval = setInterval(() => {
      console.log("UbPage reloads every 3 seconds");
    }, 3000);

    return () => {
      clearInterval(fetchDataInterval);
      clearInterval(logInterval);
    };
  }, [navigation, refresh, isFollowed]);

  if (
    userData === null ||
    (userData !== null &&
      userData.profilePhoto !== undefined &&
      image === defaultImage) ||
    events.length !== images.length
  ) {
    return <LoadingPage />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles().container}>
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
          style={styles().swiperContainer}
          loop={false}
          nestedScrollEnabled={true}
        >
          <View style={styles().slide}>
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
          <View style={styles().slide2}>
            <MyAvatar
              size={200}
              colorSkin={userData.style.head.color}
              eyes={listEyes[userData.style.eyes.id]}
              clothTop={listTop[userData.style.accessory.id]}
              colorClothingTop={userData.style.accessory.color}
              hair={listHair[userData.style.hair.id]}
              colorHair={userData.style.hair.color}
              // colorEye={userData.style.eyes.color}
              beard={listBeard[userData.style.beard.id]}
              mouth={listMouth[userData.style.mouth.id]}
              eyebrow={listEyebrow[userData.style.eyebrows.id]}
            />
          </View>
        </Swiper>

        {/* <Image style={styles().image} source={{ uri: image.url }} /> */}
        <Text style={styles().title}>{userData.username}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            alignSelf: "center",
          }}
        >
          <View style={styles().followersContainer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text
                style={{
                  ...styles().network,
                  fontSize: screenHeight * 0.03,
                  marginHorizontal: screenWidth * 0.08,
                }}
              >
                {userData.friends.length}
              </Text>
              <Text style={styles().network}>ami(s)</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 1,
              height: 30,
              backgroundColor: "#e0e0e0",
            }}
          />
          <View style={styles().followersContainer}>
            <Text
              style={{
                ...styles().network,
                fontSize: screenHeight * 0.03,
                marginHorizontal: screenWidth * 0.08,
              }}
            >
              {userData.reservations.length}
            </Text>
            <Text style={styles().network}>activité(s)</Text>
          </View>
        </View>

        <View
          style={{
            padding: screenHeight * 0.02,
          }}
        >
          {isFollowed === NOT_FRIENDS ? (
            <Buttons
              texte="suivre"
              onPress={async () => {
                const response = await ubService.sendFriendRequest(
                  global.currentUserId
                );

                if (response) {
                  console.log("SUCCESS FRIEND REQUEST");
                  setIsFollowed(WAIT_FOR_ACCEPT);
                } else console.log("FAILED FRIEND REQUEST");
              }}
            />
          ) : isFollowed === WAIT_FOR_ACCEPT ? (
            <Buttons
              texte="en attente"
              onPress={() => {}}
              backgroundColor="grey"
            />
          ) : isFollowed === IS_FRIEND ? (
            <Buttons
              texte="ami(e)"
              backgroundColor="green"
              onPress={() => {}}
            />
          ) : (
            <View />
          )}
        </View>
        <Text
          style={{
            fontSize: screenHeight * 0.03,
            alignSelf: "flex-start",
            marginLeft: screenWidth * 0.04,
            marginBottom: screenWidth * 0.06,
          }}
        >
          Biographie
        </Text>
        <Text style={{ ...styles().description }}>{userData.description}</Text>

        <Text
          style={{
            fontSize: screenHeight * 0.03,
            alignSelf: "flex-start",
            marginLeft: screenWidth * 0.04,
            marginVertical: screenWidth * 0.06,
          }}
        >
          Intérêts
        </Text>
        <View
          style={{
            position: "relative",
            alignItems: "center",
            flexDirection: "column",
            flex: 1,
            height: 50 + "%",
            width: 100 + "%",
            // paddingBottom: 230,
          }}
        >
          <ScrollView
            // showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            horizontal={false}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                // width: "100%",
                paddingHorizontal: screenHeight * 0.005,
              }}
            >
              {userData.preferences.length > 0
                ? userData.preferences.map((preference, index) => (
                    <View
                      style={styles(preference.length).categoryContainer}
                      key={index}
                    >
                      <TouchableOpacity key={index}>
                        <View
                          style={styles(preference.length).category}
                          key={index}
                        >
                          <Text
                            style={styles(preference.length).categoryText}
                            key={index}
                          >
                            {preference}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                : {}}
            </View>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: screenHeight * 0.03,
            alignSelf: "flex-start",
            marginLeft: screenWidth * 0.04,
            marginVertical: screenWidth * 0.06,
          }}
        >
          Activité{"(s)"}
        </Text>

        <View
          style={{
            position: "relative",
            marginTop: screenHeight * 0.02,
            flex: 1,
            height: 50 + "%",
            // width: 90 + "%",
            // paddingHorizontal: 20,
            alignItems: "center",
            marginBottom: 7 + "%",
          }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            horizontal={true}
          >
            {events.length > 0 ? (
              events
                // .filter((event) =>
                //   event.categories.some((category) =>
                //     preferences.includes(category)
                //   )
                // )
                .map((event, index) => (
                  <EventCard
                    onPress={() => {
                      navigation.navigate("Event");
                    }}
                    key={index}
                    name={event.name}
                    address={event.address}
                    pictures={images[index].url}
                    categories={event.categories}
                    date={event.start_date}
                    participents={event.participents.length}
                    id={event._id}
                    handleRefresh={() => {
                      handleRefresh(0);
                    }}
                    rate={event.rate}
                    // isSaved={isActivitySaved(event._id) === true ? true : false}
                    // rate={ubService.getEventRate(event._id)}
                  />
                ))
            ) : (
              <View>
                <Text>Pas d'activité</Text>
              </View>
            )}
          </ScrollView>
        </View>
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
        {/* <View style={styles().ratingContainer}>{renderStars(userData.rate)}</View> */}
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
                    <FriendsList
                      users={friends}
                      onPressChat={() => {
                        console.log("GO LE CHAT");
                        navigation.navigate("Chat");
                      }}
                      onPress={() => {
                        setModalVisible(false);
                        setRefresh(!refresh);
                      }}
                    />
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

const styles = (len) => {
  return StyleSheet.create({
    container: {
      flexGrow: screenHeight * 0.0001,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: screenHeight * 0.03,
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
      fontSize: screenHeight * 0.04,
      paddingTop: screenHeight * 0.01,
    },
    network: {
      textAlign: "center",
      // color: "#E1604D",
      // fontWeight: "6",
      fontSize: screenHeight * 0.015,
      // paddingTop: screenHeight * 0.01,
    },
    description: {
      fontSize: screenHeight * 0.02,
      alignSelf: "flex-start",
      marginLeft: screenWidth * 0.04,
      color: "grey",
      // paddingTop: screenHeight * 0.01,
    },
    followersContainer: {
      // alignSelf: "flex-start",
      // flex: 1,
      flexDirection: "column",
      marginHorizontal: screenWidth * 0.01,
      // paddingLeft: screenWidth * 0.015,
      // paddingTop: screenHeight * 0.01,
      // alignItems: "center",
    },
    categoryContainer: {
      alignSelf: "flex-start",
      flexDirection: "row",
      // paddingLeft: screenWidth * 0.015,
      paddingTop: screenHeight * 0.01,
      alignItems: "center",
      marginLeft: screenWidth * 0.04,
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
      fontSize: screenHeight * 0.02 - len * 0.5,
      color: "#E1604D",
      textAlign: "center",
    },
    participantsContainer: {
      paddingTop: screenHeight * 0.017,
    },
    participantsText: {
      fontWeight: "500",
      fontSize: screenHeight * 0.027,
    },
    locationContainer: {
      paddingTop: screenHeight * 0.069,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    locationTextContainer: {
      flexDirection: "row",
    },
    locationIcon: {
      width: screenHeight * 0.04,
      height: screenHeight * 0.04,
      paddingTop: screenHeight * 0.001,
    },
    locationText: {
      paddingLeft: screenHeight * 0.02,
      fontSize: screenHeight * 0.02,
      fontWeight: "bold",
      textAlign: "center",
    },
    vectorIcon: {
      width: screenHeight * 0.01,
      height: screenHeight * 0.03,
      paddingTop: screenHeight * 0.0006,
    },
    ratingContainer: {
      flexDirection: "row",
      alignSelf: "center",
      paddingTop: screenHeight * 0.01,
    },
    swiperContainer: {
      height: screenHeight * 0.24,
      marginTop: screenHeight * 0.03,
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
      // justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden",
      right: screenWidth * 0.25,
      // paddingBottom: 140,
    },
  });
};

export default UserUbPage;
