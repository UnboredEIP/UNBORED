import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
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
import filter from "../../asset/filter.png";

import MyAvatar from "../components/Avatar";
import { BodySvg, shirt } from "../../assets/avatars/avatars/index";

import Buttons from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { UbService } from "../services/UbServices";
import EventCard from "../components/Event/EventCard";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

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
  const [favouritesEvents, setFavouritesEvents] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [refresh, handleRefresh] = useState(0);

  const defaultImage = {
    id: 1,
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    description: "Default Image",
  };
  const [images, setImages] = useState([defaultImage]);
  const [favouritesImages, setFavouritesImages] = useState([defaultImage]);
  const ubService = new UbService();

  useEffect(() => {
    const getEvents = async () => {
      try {
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
      } catch (error) {
        console.error("Error get events:", error);
      }
    };
    const getFavouritesEvents = async () => {
      try {
        setFavouritesEvents(
          JSON.parse(await AsyncStorage.getItem("favourites"))
        );
      } catch (error) {
        console.error("Error get events:", error);
      }
    };
    const fetchData = async () => {
      try {
        // await AsyncStorage.removeItem("favourites");
        const authToken = await AsyncStorage.getItem("authToken");

        const response = await fetch("http://20.216.143.86/profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setProfileData(responseData);

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

          const storageFavourites = await AsyncStorage.getItem("favourites");
          // setFavouritesEvents(JSON.parse(storageFavourites));
          if (storageFavourites !== null) {
            const favouritesEvents2 = JSON.parse(storageFavourites);
            // console.log("FAV EVENTS:", favouritesEvents[1].id);

            if (favouritesEvents2.length > 0 && refresh === 0) {
              // console.log(favouritesEvents);
              const favourites = [];
              for (const favourite of favouritesEvents2) {
                const event = await ubService.getEventById(favourite.id);
                // console.log(event);
                if (event) {
                  favourites.push(event);
                }
              }
              setFavouritesEvents(favourites);
              // console.log("FAVOURITES EVENTS", favourites);
              const imagePromises2 = favouritesEvents.map(async (event) => {
                const img = await ubService.getImage(event.pictures[0].id);
                return img;
              });
              const imageResults2 = await Promise.all(imagePromises2);
              setFavouritesImages(imageResults2);
            }
            handleRefresh(1);
          }
        }
      } catch (error) {
        console.error("Error fetchData:", error);
        await AsyncStorage.removeItem("authToken");
        navigation.replace("Login2");
      }
    };

    fetchData();
    // getFavouritesEvents();
  }, [navigation, favouritesEvents, refresh]);

  // console.log("ALL EVENTS:", events);

  if (
    profileData === null ||
    events.length < 0 ||
    images.length !== events.length ||
    (favouritesEvents.length !== 0 &&
      favouritesImages.length !== favouritesEvents.length)
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
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
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
                <Text style={{ fontSize: 26, color: "black" }}>
                  {" "}
                  Bonjour {username} !
                </Text>
                <View
                  style={{
                    marginHorizontal: 5,
                  }}
                ></View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      width: 44,
                      height: 44,
                      marginHorizontal: 15,
                      justifyContent: "center",
                      backgroundColor: "#5265FF1A",
                      borderRadius: 12,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ height: 19, width: 15 }}
                      source={notifications}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginLeft: 10,
                      width: 44,
                      height: 44,
                      justifyContent: "center",
                      backgroundColor: "#5265FF1A",
                      borderRadius: 12,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ height: 20, width: 14 }}
                      source={book}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  top: 20 + "%",
                  display: "flex",
                  flexDirection: "row",
                  width: 85 + "%",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                  }}
                />
                {/* <Buttons
                  texte="màj"
                  width="30%"
                  onPress={async () => {
                    navigation.navigate("PreferencesUpdate");
                  }}
                /> */}
                {/* <View>
                  <TextInput
                    style={{
                      height: 45,
                      backgroundColor: "#F4F6F9",
                      width: 270,
                      borderRadius: 100,
                      justifyContent: "center",
                      paddingLeft: 24,
                      paddingRight: 24,
                    }}
                    placeholder="Rechercher"
                    placeholderTextColor={"grey"}
                    onChangeText={(newText) => setText(newText)}
                    defaultValue={text}
                  />
                  <Image
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 25,
                      height: 17,
                      width: 17,
                    }}
                    source={search}
                  ></Image>
                </View> */}
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    width: 44,
                    height: 44,
                    justifyContent: "center",
                    backgroundColor: "#5265FF1A",
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ height: 20, width: 14 }}
                    source={filter}
                  ></Image>
                </TouchableOpacity>
              </View>
              {/* <MyAvatar
                top={300}
                clothTop="hoodie"
                colorClothingTop="orange"
                size={50}
              />
              <MyAvatar
                top={400}
                clothTop="polo"
                colorClothingTop="red"
                size={75}
              /> */}
              <View
                style={{
                  top: screenHeight / 8,
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
                    fontSize: screenHeight / 40,
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
                  marginTop: 120,
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
                          key={index}
                          name={event.name}
                          address={event.address}
                          pictures={images[index].url}
                          categories={event.categories}
                          date={event.date}
                          participents={event.participents.length}
                          heure={event.hours + ":" + event.minutes}
                          id={event._id}
                          handleRefresh={() => {
                            handleRefresh(0);
                          }}
                          // rate={ubService.getEventRate(event._id)}
                        />
                      ))
                  ) : (
                    <View />
                  )}
                  {/* {events.length > 0 ? (
                events
                  // .filter((event) =>
                  //   event.categories.some((category) =>
                  //     preferences.includes(category)
                  //   )
                  // )
                  .map((event, index) => (
                    <EventCard
                      key={index}
                      name={event.name}
                      address={event.address}
                      pictures={images[index].url}
                      categories={event.categories}
                      date={event.date}
                      participents={event.participents.length}
                      heure={event.hours + ":" + event.minutes}
                      id={event._id}
                      handleRefresh={handleRefresh}
                    />
                  ))
              ) : (
                <EventCard />
              )} */}
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
                  Tes activités enregistrés
                </Text>
              </View>
              {/* <View style={{position:'relative', height:1000}}></View> */}
            </View>
          </TouchableWithoutFeedback>

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
              {favouritesEvents.length > 0 ? (
                favouritesEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    name={event.name}
                    address={event.address}
                    pictures={favouritesImages[index].url}
                    categories={event.categories}
                    date={event.date}
                    participents={event.participents.length}
                    heure={event.hours + ":" + event.minutes}
                    id={event._id}
                    handleRefresh={() => {
                      handleRefresh(0);
                    }}
                    // rate={ubService.getEventRate(event._id)}
                  />
                ))
              ) : (
                <View />
              )}
              {/* {events.length > 0 ? (
                events
                  // .filter((event) =>
                  //   event.categories.some((category) =>
                  //     preferences.includes(category)
                  //   )
                  // )
                  .map((event, index) => (
                    <EventCard
                      key={index}
                      name={event.name}
                      address={event.address}
                      pictures={images[index].url}
                      categories={event.categories}
                      date={event.date}
                      participents={event.participents.length}
                      heure={event.hours + ":" + event.minutes}
                      id={event._id}
                      handleRefresh={handleRefresh}
                    />
                  ))
              ) : (
                <EventCard />
              )} */}
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
