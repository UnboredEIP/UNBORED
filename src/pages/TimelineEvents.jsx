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
import Navbar from "../components/NavigationBar";
import "../../asset/SourceSansPro-Regular.otf";
import book from "../../asset/bookmark.png";
import notifications from "../../asset/notifications.png";
import Buttons from "../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { UbService } from "../services/UbServices";
import EventCard from "../components/Event/EventCard";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const TimelineEventsPage = ({ navigation }) => {
  // const [fontsLoaded] = useFonts({
  //   DMSans_400Regular,
  //   DMSans_700Bold,
  // });
  const [text, setText] = useState("");
  const [choice, setChoice] = useState(0);
  const [username, setUsername] = useState("Citoyen");
  const [profileData, setProfileData] = useState(null);
  const [events, setEvents] = useState([]);
  const defaultImage = {
    id: 1,
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    description: "Default Image",
  };
  const [images, setImages] = useState([defaultImage]);
  const ubService = new UbService();
  const [selectedActivities, setSelectedActivities] = useState(["Tout"]);
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
        // console.log(profileData);
        const tmpObj = await ubService.getEvents();
        setEvents(tmpObj);
        const imagePromises = tmpObj.map(async (event) => {
          const img = await ubService.getImage(event.pictures[0].id);
          return img;
        });
        const imageResults = await Promise.all(imagePromises);
        // console.log("ALL IMAGES:", JSON.stringify(imageResults));
        setImages(imageResults);
      } catch (error) {
        // console.error("Error fetchdata:", error);
        // await AsyncStorage.removeItem("authToken");
        // navigation.replace("Login2");
      }
    };

    fetchData();
  }, [navigation]);

  useEffect(() => {
    if (profileData !== null) {
      setUsername(profileData.user.username);
    }
  }, [profileData, events, images]);
  // console.log("ALL EVENTS:", events);

  if (
    profileData === null ||
    events.length < 0 ||
    images.length !== events.length
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
          {/* <View
            style={{
              marginTop: screenHeight / 10,
            }}
          >
            <Buttons texte="Retour" width={screenWidth / 5} />
          </View> */}
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
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 26, color: "black" }}>
                  {" "}
                  Les activités
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {/* <Buttons
                    texte="deco"
                    width="30%"
                    onPress={async () => {
                      await AsyncStorage.removeItem("authToken");
                      navigation.replace("Login2");
                    }}
                  /> */}
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
                {events.length > 0 ? (
                  events.map(
                    (event, index) =>
                      (event.categories[0] === activitiesType[choice] ||
                        choice === 0) && (
                        <View
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
                            size={screenHeight / 3.4}
                            key={index}
                            name={event.name}
                            address={event.address}
                            pictures={images[index].url}
                            categories={event.categories}
                            date={event.start_date}
                            participents={event.participents.length}
                            id={event._id}
                            rate={event.rate}
                          />
                        </View>
                      )
                  )
                ) : (
                  <EventCard />
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

export default TimelineEventsPage;
