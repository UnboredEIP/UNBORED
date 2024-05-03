import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Navbar from "../components/NavigationBar";
import "../../asset/SourceSansPro-Regular.otf";
import book from "../../asset/bookmark.png";
import notifications from "../../asset/notifications.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UbService } from "../services/UbServices";
import EventCard from "../components/Event/EventCard";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const MAX_NAME_LENGTH = screenWidth / 32;

const truncateName = (name) => {
  if (name.length > MAX_NAME_LENGTH) {
    return name.substring(0, MAX_NAME_LENGTH) + "...";
  }
  return name;
};

const Accueil3 = ({ navigation }) => {
  // const [fontsLoaded] = useFonts({
  //   DMSans_400Regular,
  //   DMSans_700Bold,
  // });
  const [text, setText] = useState("");
  const [choice, setChoice] = useState(0);
  const [username, setUsername] = useState("Citoyen");
  const [profileData, setProfileData] = useState(null);
  const [events, setEvents] = useState([]);
  const [reservedEvents, setReservedEvents] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [refresh, handleRefresh] = useState(0);
  const [favourites, setFavourites] = useState(null);

  const defaultImage = {
    id: 1,
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    description: "Default Image",
  };
  const [images, setImages] = useState([defaultImage]);
  const [favouritesImages, setFavouritesImages] = useState([defaultImage]);
  const ubService = new UbService();

  const isActivitySaved = (id) => {
    if (favourites === null) return false;
    const existingFavourite = favourites.findIndex(
      (preference) => preference.id === id
    );

    if (existingFavourite) return true;

    return false;
  };
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

        global.myId = responseData.user._id;

        const tmpfavourites = await AsyncStorage.getItem("favourites");
        if (tmpfavourites === null) {
          return false;
        } else {
          setFavourites(JSON.parse(tmpfavourites));
        }

        if (responseData !== null) {
          const preferences = responseData.user.preferences.map(function (
            string
          ) {
            return string.toLowerCase();
          });

          setUsername(responseData.user.username);
          setPreferences(preferences);
          // await getEvents();
          const tmpObj = await ubService.getEvents();
          const filteredEvents = tmpObj.filter((event) =>
            event.categories.some((category) => preferences.includes(category))
          );
          setEvents(filteredEvents);

          const imagePromises = filteredEvents.map(async (event) => {
            const img = await ubService.getImage(event.pictures[0].id);
            return img;
          });
          const imageResults = await Promise.all(imagePromises);
          setImages(imageResults);
          //
          const reservedEvents2 = responseData.user.reservations;

          if (reservedEvents2.length > 0 && refresh === 0) {
            // console.log(reservedEvents);
            const events = [];
            for (const favourite of reservedEvents2) {
              const event = await ubService.getEventById(favourite);
              // console.log(event);
              if (event) {
                events.push(event);
              }
            }
            setReservedEvents(events);
            // console.log("FAVOURITES EVENTS", favourites);
            const imagePromises2 = reservedEvents.map(async (event) => {
              const img = await ubService.getImage(event.pictures[0].id);
              return img;
            });
            const imageResults2 = await Promise.all(imagePromises2);
            setFavouritesImages(imageResults2);
          }
          handleRefresh(1);
        }
      } catch (error) {
        console.error("Error fetchData:", error);
        // await AsyncStorage.removeItem("authToken");
        // navigation.replace("Login2");
      }
    };

    fetchData();
    // getreservedEvents();
  }, [navigation, refresh, reservedEvents]);

  // console.log("ALL EVENTS:", events);

  if (
    profileData === null ||
    events.length < 0 ||
    images.length !== events.length ||
    (profileData.user.reservations.length !== 0 &&
      (favouritesImages.length !== profileData.user.reservations.length ||
        reservedEvents.length === 0))
  ) {
    return <Text> Loading </Text>;
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
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                top: "15%",
                display: "flex",
                flexDirection: "row",
                // width: "85%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: screenWidth * 0.07 - username.length * 0.3,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Salut {truncateName(username)} !
              </Text>
              <View
                style={{
                  marginHorizontal: 5,
                }}
              ></View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: screenHeight * 0.05,
                    height: screenHeight * 0.05,
                    marginHorizontal: screenWidth * 0.03,
                    justifyContent: "center",
                    backgroundColor: "#5265FF1A",
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.replace("FriendsRequest");
                  }}
                >
                  <Image
                    style={{
                      height: screenHeight * 0.03,
                      width: screenHeight * 0.02,
                    }}
                    source={notifications}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: screenHeight * 0.05,
                    height: screenHeight * 0.05,
                    justifyContent: "center",
                    backgroundColor: "#5265FF1A",
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.replace("SavedEventsPage");
                  }}
                >
                  <Image
                    style={{
                      height: screenHeight * 0.03,
                      width: screenHeight * 0.02,
                    }}
                    source={book}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                marginTop: screenHeight * 0.12,
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
                width: 85 + "%",
                // alignItems: "center",
              }}
            >
              {/* <Image src="../../assets/avatars/avatars/body/blazer.svg"></Image> */}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: screenWidth / 20,
                  alignSelf: "center",
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Ces activités sont faites pour toi !
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("TimelineEventsPage")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#E1604D",
                    flex: 1,
                    textAlign: "right",
                    justifyContent: "flex-end",
                  }}
                >
                  Voir toutes les activités
                </Text>
              </TouchableOpacity>
            </View>

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
                        isSaved={isActivitySaved(event._id) ? false : true}
                        // rate={ubService.getEventRate(event._id)}
                      />
                    ))
                ) : (
                  <View />
                )}
              </ScrollView>
            </View>

            <View
              style={{
                alignSelf: "center",
                width: 85 + "%",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: screenHeight / 40,
                }}
              >
                Tes activités qui arrivent
              </Text>
            </View>
            {/* <View style={{position:'relative', height:1000}}></View> */}
          </View>
          <View
            style={{
              position: "relative",
              marginTop: 20,
              flex: 1,
              height: 50 + "%",
              // width: 90 + "%",
              // paddingHorizontal: 20,
              alignItems: "center",
              paddingBottom: 230,
            }}
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              horizontal={true}
            >
              {reservedEvents.length > 0 ? (
                reservedEvents.map((event, index) => (
                  <EventCard
                    onPress={() => {
                      navigation.navigate("Event");
                    }}
                    key={index}
                    name={event.name}
                    address={event.address}
                    pictures={favouritesImages[index].url}
                    categories={event.categories}
                    date={event.start_date}
                    participents={event.participents.length}
                    id={event._id}
                    handleRefresh={() => {
                      handleRefresh(0);
                    }}
                    rate={event.rate}
                    isSaved={isActivitySaved(event._id) ? false : true}
                    // rate={ubService.getEventRate(event._id)}
                  />
                ))
              ) : (
                <View>
                  <Text>Trouve une activité juste au dessus !</Text>
                </View>
              )}
            </ScrollView>
          </View>
          {/* <View style={{backgroundColor:'blue', width:100+'%', top:300, height:1000}}></View> */}
        </ScrollView>
        <View>
          <Navbar navigation={navigation} />
        </View>
      </View>
    );
};

const styles = (top = screenHeight / 3, left = 100, right, bottom) => {
  return StyleSheet.create({
    svgBody: {
      position: "absolute",
      top: top,
      left: left,
      right: right,
      bottom: bottom,
    },
    svgTop: {
      position: "absolute",
      top: top + 134,
      left: left - 32,
      right: right,
      bottom: bottom,
    },
  });
};

export default Accueil3;
