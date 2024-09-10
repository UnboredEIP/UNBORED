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

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const IS_ENROLL = 1;
const NOT_ENROLL = 2;

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
        <TouchableOpacity key={i}>
          <Image
            key={i}
            style={{ width: screenHeight * 0.04, height: screenHeight * 0.04 }}
            source={startFilled}
          />
        </TouchableOpacity>
      );
    } else {
      stars.push(
        <TouchableOpacity key={i}>
          <Image
            key={i}
            style={{ width: screenHeight * 0.04, height: screenHeight * 0.04 }}
            source={startUnfilled}
          />
        </TouchableOpacity>
      );
    }
  }
  return stars;
};

const Event = ({ navigation }) => {
  const [eventData, setEventData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [participents, setParticipents] = useState([]);
  const [isEnroll, setIsEnroll] = useState(NOT_ENROLL);
  const ubService = new UbService();

  const date = new Date().toISOString().split("T")[0];

  function userIsEnroll(events, id) {
    // for (const invitation of invitations) {
    for (const event of events) {
      if (event === id) {
        setIsEnroll(IS_ENROLL);
        // console.log("ENROLL");
        return true;
      }
      // }
    }

    return false; // ID not found in invitations
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ubService.getEventById(global.currentEventId);
        if (!response) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = response;
        setEventData(responseData);
        userIsEnroll(global.reservedEvents, global.currentEventId);

        global.reservedEvents;
        const img = await ubService.getImage(responseData.pictures[0].id);
        setImage(img);

        if (responseData.participents.length > 0) {
          const users = [];
          for (const participent of responseData.participents) {
            const user = await ubService.getUserById(participent);
            // console.log(user);
            if (user) {
              users.push(user);
            }
          }
          setParticipents(users);

          // console.log(users);
        }
      } catch (error) {
        console.error("Error fetchData:", error);
      }
    };

    fetchData();
  }, [participents, isEnroll]);

  if (eventData === null || image === null) {
    return <LoadingPage />;
  } else {
    return formatDate(eventData.start_date) > date ? (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: screenHeight / 15,
            left: screenWidth / 20,
            zIndex: 1,
          }}
          onPress={() => navigation.replace(global.currentScreen)}
        >
          <BackArrow
            style={{
              width: screenWidth / 12,
              height: screenWidth / 12,
              color: "white",
            }}
          />
        </TouchableOpacity>
        <Image style={styles.image} source={{ uri: image.url }} />
        <View style={styles.categoryContainer}>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>
              {eventData.participents.length} personne(s)
            </Text>
          </View>
          <TouchableOpacity>
            <View style={styles.category}>
              <Text style={styles.categoryText}>{eventData.categories[0]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{eventData.name}</Text>
        <Text style={styles.date}>{formatDate(eventData.start_date)}</Text>
        <Text style={styles.time}>
          Heure début: {extractTime(eventData.start_date)}
        </Text>
        <Text style={styles.description}>{eventData.description}</Text>

        {isEnroll == IS_ENROLL ? (
          <Buttons
            texte="Inscrit(e)"
            backgroundColor="green"
            onPress={async () => {
              const response = await ubService.leaveEvent([
                global.currentEventId,
              ]);
              if (response === true) {
                setIsEnroll(NOT_ENROLL);
                let favourites = global.reservedEvents;

                if (favourites === null) {
                  favourites = [];
                }
                const existingFavourite = global.reservedEvents.findIndex(
                  (event) => event === global.currentEventId
                );
                if (existingFavourite !== -1) {
                  // console.log("CACA");
                  favourites.splice(existingFavourite, 1);
                  global.reservedEvents = favourites;
                  console.log("SECOND GLOB:", global.reservedEvents);
                }
                Toast.show("Activité quitté", {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  backgroundColor: "green",
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                });
              } else {
                // console.log("ERROR:", response);
                console.log("ERROR WHEN LEAVE ACTIVITY");
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
        ) : (
          <Buttons
            texte="Rejoindre activité"
            onPress={async () => {
              const response = await ubService.joinEvent([
                global.currentEventId,
              ]);
              if (response == true) {
                setIsEnroll(IS_ENROLL);
                global.reservedEvents.push(global.currentEventId);
                console.log("NEW ACTIVITY JOIN:", eventData.name);
                Toast.show("Activité rejoints", {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  backgroundColor: "green",
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                });
              } else {
                console.log("ERROR WHEN JOIN ACTIVITY");
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
        )}
        <View
          style={{
            marginVertical: 10,
          }}
        />
        <Buttons
          texte="Voir les participants"
          onPress={() => {
            setModalVisible(true);
          }}
        />

        <View style={styles.locationContainer}>
          <View style={styles.locationTextContainer}>
            <Image style={styles.locationIcon} source={loc} />
            <Text style={styles.locationText}>{eventData.address}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {renderStars(eventData.rate)}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity
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
              <TouchableOpacity>
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
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    ) : (
      //
      //
      //
      //
      //
      //
      //La date de l'event est passé
      //
      //
      //
      //
      //
      //
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: screenHeight / 15,
            left: screenWidth / 20,
            zIndex: 1,
          }}
          onPress={() => navigation.replace(global.currentScreen)}
        >
          <BackArrow
            style={{
              width: screenWidth / 12,
              height: screenWidth / 12,
              color: "white",
            }}
          />
        </TouchableOpacity>
        <Image style={styles.image} source={{ uri: image.url }} />
        <View style={styles.categoryContainer}>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>
              {eventData.participents.length} personne(s)
            </Text>
          </View>
          <TouchableOpacity>
            <View style={styles.category}>
              <Text style={styles.categoryText}>{eventData.categories[0]}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{eventData.name}</Text>
        <Text style={styles.date}>{formatDate(eventData.start_date)}</Text>
        <Text style={styles.time}>
          Heure début: {extractTime(eventData.start_date)}
        </Text>

        {isEnroll == IS_ENROLL ? (
          <View></View>
        ) : (
          <Buttons
            texte="Rejoindre activité"
            onPress={async () => {
              const response = await ubService.joinEvent([
                global.currentEventId,
              ]);
              if (response == true) {
                setIsEnroll(IS_ENROLL);
                global.reservedEvents.push(global.currentEventId);
                console.log("NEW ACTIVITY JOIN:", eventData.name);
                Toast.show("Activité rejoints", {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  backgroundColor: "green",
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                });
              } else {
                console.log("ERROR WHEN JOIN ACTIVITY");
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
        )}
        <View
          style={{
            marginVertical: 10,
          }}
        />
        <Buttons
          texte="Voir les participants"
          onPress={() => {
            setModalVisible(true);
          }}
        />

        <View style={styles.locationContainer}>
          <View style={styles.locationTextContainer}>
            <Image style={styles.locationIcon} source={loc} />
            <Text style={styles.locationText}>{eventData.address}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {renderStars(eventData.rate)}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity
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
              <TouchableOpacity>
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
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: screenHeight * 0.0062,
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
    fontSize: screenHeight * 0.03,
    marginTop: screenHeight * 0.017,
  },
  description: {
    textAlign: "left",
    color: "black",
    fontWeight: "50",
    fontSize: screenHeight * 0.017,
    marginVertical: screenHeight * 0.017,
    paddingHorizontal: screenWidth * 0.02,
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
});

export default Event;
