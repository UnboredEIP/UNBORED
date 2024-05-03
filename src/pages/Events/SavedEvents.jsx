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
} from "react-native";
import Navbar from "../../components/NavigationBar";
import book from "../../../asset/bookmark.png";
import notifications from "../../../asset/notifications.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { UbService } from "../../services/UbServices";
import EventCard from "../../components/Event/EventCard";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const SavedEventsPage = ({ navigation }) => {
  const [text, setText] = useState("");
  const [choice, setChoice] = useState(0);
  const [username, setUsername] = useState("Citoyen");
  const [favouritesEvents, setFavouritesEvents] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [refresh, handleRefresh] = useState(0);
  const defaultImage = {
    id: 1,
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    description: "Default Image",
  };
  const [favouritesImages, setFavouritesImages] = useState([defaultImage]);
  const ubService = new UbService();
  const activitiesType = [
    "Tout",
    "art",
    "musique",
    "sport",
    "food",
    "soirée",
    "technologie",
    "photographie",
    "football",
    "automobile",
    "lol",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageFavourites = await AsyncStorage.getItem("favourites");
        // setFavouritesEvents(JSON.parse(storageFavourites));
        if (storageFavourites !== null) {
          const favouritesEvents2 = JSON.parse(storageFavourites);
          // console.log("FAV EVENTS:", favouritesEvents2[0].id);

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
        }
        handleRefresh(1);
      } catch (error) {
        // console.error("Error fetchdata:", error);
        // await AsyncStorage.removeItem("authToken");
        // navigation.replace("Login2");
      }
    };

    fetchData();
  }, [navigation, favouritesEvents, refresh]);

  useEffect(() => {}, [favouritesImages, favouritesEvents]);
  // console.log("ALL EVENTS:", events);

  if (
    favouritesEvents.length !== 0 &&
    favouritesImages.length !== favouritesEvents.length
  ) {
    return <Text> Loading </Text>;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal={false}
          nestedScrollEnabled={true}
          style={{
            // marginLeft: 5 + "%",
            marginHorizontal: screenWidth / 100,

            width: screenWidth,
            height: screenHeight,
          }}
        >
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
          >
            <View style={{ flex: 1, marginTop: screenHeight / 10 }}>
              <View
                style={{
                  // top: "15%",
                  display: "flex",
                  flexDirection: "row",
                  width: "95%",
                  // width: 40 + "%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 26, color: "black", fontWeight: "bold" }}
                >
                  {" "}
                  Mes activités enregistrées
                </Text>
              </View>
              <View
                style={{
                  top: 20 + "%",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: screenHeight / 50,
                  // width: 85 + "%",
                }}
              ></View>

              <View
                style={{
                  position: "relative",
                  // height: 47,
                  // width: 85 + "%",
                  // marginRight: 200,
                  // flex: 1,
                  // paddingBottom: 1,
                }}
              >
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  horizontal={true}
                >
                  {[
                    "Tout",
                    "Art",
                    "Musique",
                    "Sport",
                    "Food",
                    "Soirée",
                    "Technologie",
                    "Photographie",
                    "Football",
                    "Automobile",
                    "LoL",
                  ].map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setChoice(index)}
                      style={{
                        height: 45,
                        width: 89,
                        backgroundColor: choice === index ? "#E1604D" : "white",
                        marginRight: 5,
                        justifyContent: "center",
                        borderRadius: 24,
                        borderWidth: choice === index ? 0 : 2,
                        borderColor: choice === index ? "white" : "#E1604D",
                      }}
                    >
                      <Text
                        key={index}
                        style={{
                          color: choice === index ? "white" : "#E1604D",
                          fontWeight: "bold",
                          fontSize: screenHeight / 70,
                          textAlign: "center",
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View
                style={{
                  // flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // width: 85 + "%",
                  width: 100 + "%",
                  marginTop: screenHeight / 40,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Envie de ...</Text>
              </View>

              {/* <View style={{position:'relative', height:1000}}></View> */}
            </View>
          </TouchableWithoutFeedback>

          <View
            style={{
              position: "relative",
              // top: 200,
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
                {favouritesEvents.length > 0 ? (
                  favouritesEvents.map(
                    (event, index) =>
                      (event.categories[0] === activitiesType[choice] ||
                        choice === 0) && (
                        <View
                          key={index}
                          style={{
                            marginVertical: screenHeight / 50,
                            width: "50%",
                            // width: screenWidth > 600 ? "48%" : "100%",
                            marginVertical: screenHeight / 50,
                            // marginRight: 20,
                          }}
                        >
                          <EventCard
                            onPress={() => {
                              navigation.navigate("Event");
                            }}
                            key={index}
                            size={screenHeight / 3.4}
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
                            isSaved={true}
                            // rate={ubService.getEventRate(event._id)}
                          />
                        </View>
                      )
                  )
                ) : (
                  <View>
                    <Text>Pas d'activité enregistrée</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        <View>
          <Navbar navigation={navigation} />
        </View>
      </View>
    );
};

export default SavedEventsPage;
