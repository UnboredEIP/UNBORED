import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import TinderCard from "react-tinder-card";
import Navbar from "../components/NavigationBar";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Activities = ({ navigation }) => {
  const [lastDirection, setLastDirection] = useState();
  const [data, setData] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(9);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const swiped = (direction, nameToDelete, index) => {
    console.log("prout", direction);
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    setSwipeDirection(direction);
    setCurrentCardIndex((currentIndex) => currentIndex - 1);
    console.log("zzzzzz::", index);
    if (direction === "right") {
      createEvent(index);
    }
  };

  const handleLinkPress = () => {
    const url = removeCharacter(data.results[currentCardIndex].url, "<br />");
    Linking.openURL(url);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    setSwipeDirection(null);
  };

  function formatDate(dateString) {
    if (dateString) {
      const dateRanges = dateString.split("_");
      const firstDateRange = dateRanges[0];
      const startDateString = firstDateRange.split("T")[0];
      const startDate = new Date(startDateString);
      const day = startDate.getDate().toString().padStart(2, "0");
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      const year = startDate.getFullYear();
      const hours = 12; // Random hour between 10 and 18
      const minutes = startDate.getMinutes().toString().padStart(2, "0");
      const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
      return formattedDate;
    }
  }

  const removeCharacter = (str, charToRemove) => {
    if (str) {
      return str.split(charToRemove).join("");
    }
  };
  function formatDateToISO(originalDate) {
    if (originalDate) {
      const dateParts = originalDate.split(/[\s/:\-]/);
      const year = parseInt(dateParts[2]);
      const month = parseInt(dateParts[1]) - 1; // Month is zero-based
      const day = parseInt(dateParts[0]);
      const hour = parseInt(dateParts[3]);
      const minute = parseInt(dateParts[4]);
      const dateObject = new Date(Date.UTC(year, month, day, hour, minute));
      const isoDateString = dateObject.toISOString();
      return isoDateString;
    }
  }
  const createEvent = async (currentIndex) => {
    console.log("tezst,", currentIndex);
    const formattedDate = formatDateToISO(
      formatDate(data.results[currentIndex].occurrences)
    );
    const activityName = data.results[currentIndex].title;
    const address = removeCharacter(data.results[currentIndex].url, "<br />");
    console.log(
      "start date : tiiiiit",
      formatDate(data.results[currentIndex].occurrences)
    );
    const endDate = new Date(formattedDate);
    endDate.setHours(endDate.getHours() + 2);
    const eventData = {
      start_date: formattedDate,
      name: activityName,
      address: address,
      end_date: endDate,
      categories: ["test"],
    };

    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/create/private",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        console.log("Event created successfully");
      } else {
        console.error("Failed to create event", response);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=10&refine=date_end%3A%222024%2F05%22",
          {
            method: "GET",
            headers: {},
          }
        );
        const responseData = await response.json();
        setData(responseData);
        console.log("caca", responseData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Match une nouvelle activité !</Text>
      <View style={styles.cardContainer}>
        {data &&
          data.results.map((character, index) => (
            <TinderCard
              key={character.title}
              onSwipe={(dir) => swiped(dir, character.title, index)}
              onCardLeftScreen={() => outOfFrame(character.title)}
            >
              <View
                style={[
                  styles.card,
                  swipeDirection === "right"
                    ? styles.swipeRight
                    : swipeDirection === "left"
                    ? styles.swipeLeft
                    : null,
                ]}
              >
                <ImageBackground
                  style={styles.cardImage}
                  source={{ uri: character.cover_url }}
                >
                  <Text style={styles.cardTitle}>{character.title}</Text>
                </ImageBackground>
              </View>
            </TinderCard>
          ))}
      </View>
      {currentCardIndex === -1 && (
        <Text style={styles.infoText}>
          Félicitation ! Vous avez tout swipé !
        </Text>
      )}
      {data && data.results[currentCardIndex] && (
        <View style={styles.cardInfo}>
          <Text style={styles.priceText}>
            Tarification: {data.results[currentCardIndex].price_type}
          </Text>
          <View style={styles.cardInfoRow}>
            <View style={styles.iconBackground}>
              <Icon
                name="calendar"
                size={20}
                color="black"
                style={styles.icon}
              />
            </View>
            <Text style={styles.cardInfoText}>
              {formatDate(data.results[currentCardIndex].occurrences, "<br />")}
            </Text>
          </View>
          <View style={styles.cardInfoRow}>
            <View style={styles.iconBackground}>
              <Icon
                name="map-marker"
                size={20}
                color="black"
                style={styles.icon}
              />
            </View>
            <TouchableOpacity onPress={handleLinkPress}>
              <Text style={styles.cardInfoText2}>
              Accédez au site en cliquant ici !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.bottomNavbarContainer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#E1604D",
    fontSize: 23,
    marginTop: -300,
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 15,
    left: -20,
    marginRight: 60,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 23,
    paddingBottom: 40,
    fontWeight: "bold",
    position: "absolute",
    top: -40, // Adjust this value according to your layout
    left: 10, // Adjust this value according to your layout
  },

  cardContainer: {
    width: "90%",
    maxWidth: 400,
    height: 300,
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 360,
    height: 400,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  cardTitle: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 10,
    fontSize: 20,
    color: "#fff", // Make sure it's large enough to cover the icon
    backgroundColor: "rgba(0, 0, 0, 0.7)", // semi-transparent white background
    fontWeight: "bold",
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    // marginRight: 10,
  },
  iconBackground: {
    backgroundColor: "lightgrey",
    borderRadius: 50, // Make sure it's large enough to cover the icon
    padding: 8,
    marginLeft: -5,
  },
  cardInfo: {
    position: "absolute",
    bottom: 0,
    bottom: 100,
    width: "90%",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  cardInfoText2: {
    color: "#E1604D",
    fontSize: 15,
    padding: 10,
    fontWeight:"bold",
  },
  cardInfoText: {
    color: "black",
    fontSize: 15,
    padding: 10,
  },
  bottomNavbarContainer: {
    position: "center",
    top: 350,
    width: "100%",
  },
  infoText: {
    justifyContent: "center",
    // zIndex: -100,
  },
  swipeRight: {
    backgroundColor: "rgba(0, 255, 0)", // light transparent green
  },
  swipeLeft: {
    backgroundColor: "rgba(255, 0, 0)", // light transparent red
  },
});

export default Activities;
