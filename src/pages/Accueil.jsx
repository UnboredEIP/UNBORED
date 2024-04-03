import React, { useRef, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Navbar from "../components/NavigationBar";
import "../../asset/SourceSansPro-Regular.otf";
import book from "../../asset/bookmark.png";
import notifications from "../../asset/notifications.png";
import filter from "../../asset/filter.png";
import search from "../../asset/search.png";
import pir from "../../asset/pir.jpg";

import data from "../value.json";

import img1 from "../../asset/img-1.png";
import img2 from "../../asset/img-2.png";
import img3 from "../../asset/img-3.png";
import img4 from "../../asset/img-4.png";
import img5 from "../../asset/img-5.png";
import img6 from "../../asset/img-6.png";

import loc from "../../asset/location_on.png";
import vector from "../../asset/Vector.png";
import Buttons from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import base64 from "react-native-base64";
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
  const [preferences, setPreferences] = useState([]);

  const defaultImage = {
    id: 1,
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    description: "Default Image",
  };
  const [images, setImages] = useState([defaultImage]);
  const ubService = new UbService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");

        const response = await fetch(`${API_URL}/profile/`, {
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
          console.log("USER PREFERENCES:", preferences);

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
        }
      } catch (error) {
        console.error("Error fetchData:", error);
        await AsyncStorage.removeItem("authToken");
        navigation.replace("Login2");
      }
    };

    fetchData();
  }, [navigation]);

  // console.log("ALL EVENTS:", events);

  if (
    profileData === null ||
    events.length < 0 ||
    images.length !== events.length
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
                <Buttons
                  texte="deco"
                  width="30%"
                  onPress={async () => {
                    await AsyncStorage.removeItem("authToken");
                    navigation.replace("Login2");
                  }}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                  }}
                />
                <Buttons
                  texte="màj preferences"
                  width="30%"
                  onPress={async () => {
                    navigation.navigate("PreferencesUpdate");
                  }}
                />
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
              <View
                style={{
                  top: 26 + "%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 85 + "%",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Recommandé</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TimelineEventsPage")}
                >
                  <Text style={{ fontWeight: "bold", color: "#E1604D" }}>
                    Voir toutes les activités
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  top: 40 + "%",
                  height: 160,
                  width: 370,
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{ height: 90 + "%", width: "90%" }}
                  source={pir}
                ></Image>
                <View style={{ position: "absolute", left: 40, top: "30%" }}>
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: 600 }}
                  >
                    Musée du Louvre
                  </Text>
                  <TouchableHighlight
                    onPress={() => console.log("Reserver")}
                    style={{
                      marginTop: 20,
                      width: 103,
                      height: 37,
                      borderRadius: 20,
                      backgroundColor: "#E1604D",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Réserver
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View
                style={{
                  top: 38 + "%",
                  flexDirection: "row",

                  alignSelf: "center",
                  width: 85 + "%",
                }}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Ces activités sont faites pour toi !
                </Text>
              </View>
              {/* <View style={{position:'relative', height:1000}}></View> */}
            </View>
          </TouchableWithoutFeedback>

          <View
            style={{
              position: "relative",
              marginTop: 200,
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
              {events.length > 0 ? (
                events
                  .filter((event) =>
                    event.categories.some((category) =>
                      preferences.includes(category)
                    )
                  )
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
                    />
                  ))
              ) : (
                <EventCard />
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

export default Accueil3;
