import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Navbar from "../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Calendar = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [username, setUsername] = useState("");
  const [defaultImageUri] = useState("https://..."); // URL d'une image par défaut
  const [image, setImage] = useState(defaultImageUri);
  const [dayDetails, setDayDetails] = useState([]);
  const [viewMode, setViewMode] = useState("week"); // Ajout du mode d'affichage
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  let filteredEvents = [];
  let dotEvent = [];
  let formattedSelectedDayNumber = null;

  const navigatetotamere = async () => {
    navigation.navigate("NewEvent");
  };
  const navigatetodescr = async () => {
    navigation.navigate("activites");
  };
  const handleEventPress = (item) => {
    window.Globalitem = item;
    navigation.navigate("EditEvent");
  };
  const HoursGrid = ({ selectedDay }) => {
    console.log("prouuuuuuuzzz", selectedDay);
    const hours = [];
    for (let i = 0; i <= 23; i += 1) {
      hours.push(`${i}:00`);
    }

    return (
      <FlatList
        data={hours}
        renderItem={({ item: hour }) => (
          <View style={styles.hourItem}>
            <Text style={styles.hourText}>{hour}</Text>
            {filteredEvents
              .filter(
                (event) =>
                  parseInt(event.heuredebut) === parseInt(hour) &&
                  event.date === selectedDay
              )
              .map((event) => (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => handleEventPress(event)}
                >
                <View style={[styles.eventBox, { height: (parseInt(event.heurefin - event.heuredebut) * 37) }]}>
                  <Text style={styles.eventText}>{event.name}</Text>
              </View>                
              </TouchableOpacity>
              ))}
            {filteredEvents
              .filter(
                (event) =>
                  parseInt(event.heuredebut) === parseInt(hour) &&
                  event.date === selectedDay
              )              .map((event) =>
                console.log(
                  "event.date: ",
                  event.date + "selectedDate!: ",
                  selectedDay
                )
              )}
          </View>
        )}
        keyExtractor={(hour) => hour}
      />
    );
  };

  useEffect(() => {
    const getDaysOfWeek = () => {
      const today = new Date();

      const days = [];
      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() + i);

        const dayNumber = dayDate.getDate();
        const dayName = getDayName(dayDate.getDay());
        const month = dayDate.getMonth() + 1; // Months are zero-based, so we add 1
        const year = dayDate.getFullYear();

        days.push({
          dayNumber,
          dayName,
          month,
          year,
        });
      }

      return days;
    };
    const getDaysOfMonth = () => {
      const daysInMonth = new Date();
    
      const days = [];
      for (let i = 1; i <= 31; i++) {
        const dayDate = new Date(daysInMonth);
        dayDate.setDate(daysInMonth.getDate() + i);

        const dayNumber = dayDate.getDate();
        const dayName = getDayName(dayDate.getDay());
        const month = dayDate.getMonth() + 1; // Months are zero-based, so we add 1
        const year = dayDate.getFullYear();
    
        days.push({
          dayNumber,
          dayName,
          month,
          year,
        });
      }
    
      return days;
    };
    
    const getDayName = (dayNumber) => {
      const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
      return days[dayNumber];
    };

    const fetchProfileData = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");

        const response = await fetch(
          "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile",
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

        const profileData = await response.json();
        setUsername(profileData.user.username.trim());
        setImage(
          `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${profileData.user.profilePhoto}`
        );
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching profile info:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    const fetchActivities = async () => {
      try {
        // Get authentication token from AsyncStorage
        const authToken = await AsyncStorage.getItem("authToken");

        // Fetch activities data from the server
        const response = await fetch(
          "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/lists",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse activities data from response
        const activitiesData = await response.json();

        // Check if valid activities data is received
        if (!activitiesData || !Array.isArray(activitiesData.events)) {
          throw new Error("Invalid activities data received");
        }

        // Log activities data

        // Set all events
        setAllEvents(activitiesData.events);

        // Update dayDetails state with new activities data using functional update
        setDayDetails((prevDayDetails) => {
          const newDayDetails = [...prevDayDetails];

          // Iterate through each activity
          activitiesData.events.forEach((activity) => {
            const activityDate = new Date(activity.date);
            const dayIndex = activityDate.getDay();
            const dayName = getDayName(dayIndex);
            const formattedDate = activityDate.getDate();

            // Check if day details already exist in newDayDetails
            const existingDay = newDayDetails.find(
              (day) =>
                day.dayName === dayName && day.dayNumber === formattedDate
            );

            // If day details exist, push new event to existing day
            if (existingDay) {
              existingDay.events.push({
                name: activity.name,
                address: activity.address,
                time: `${activity.hours}:${activity.minutes}`,
              });
            } else {
              // If day details don't exist, create new day details with event
              newDayDetails.push({
                dayName: dayName,
                dayNumber: formattedDate,
                events: [
                  {
                    name: activity.name,
                    address: activity.address,
                    time: `${activity.hours}:${activity.minutes}`,
                  },
                ],
              });
            }
          });

          return newDayDetails;
        });
      } catch (error) {
        // Handle errors
        console.error("Error fetching activities:", error);
      }
    };

    const today = getDayName(new Date().getDay());
    handleDayPress(today);

    setDaysOfWeek(getDaysOfWeek());
    setDaysOfMonth(getDaysOfMonth());
    fetchProfileData();
    fetchActivities();
  }, []);

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };
  const renderDayItem = ({ item }) => {
    console.log("pipppppe une pipppp",item.dayName); // Add this line to log item.dayName
    const hasEvents = dotEvent.some((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getUTCFullYear() === item.year &&
        eventDate.getUTCMonth() + 1 === item.month &&
        eventDate.getUTCDate() === item.dayNumber
      );
    });

    return (
      <TouchableOpacity
        style={[
          styles.dayItem,
          item.dayName === selectedDay && styles.selectedDayItem,
        ]}
        onPress={() => handleDayPress(item.dayName)}
      >
        <Text
          style={[
            styles.dayNumber,
            item.dayName === selectedDay && styles.dayNumber2,
          ]}
        >
          {item.dayNumber}
        </Text>
        <Text
          style={[
            styles.dayName,
            item.dayName === selectedDay && styles.dayName2,
          ]}
        >
          {item.dayName}
        </Text>
        {hasEvents && <View style={styles.redDot} />}
      </TouchableOpacity>
    );
  };

  const renderAllEvents = () => (
    <View style={styles.allEventsContainer}>
      {
        allEvents
          .map((event) => {
            const [year, month, day] = event.start_date.split("-");
            const [dayOnly] = day.split("T");
            const [datePart, timePart] = event.start_date.split("T");
            const [hoursMinutes] = timePart.split(".");
            const [hours, minutes] = hoursMinutes.split(":");
            let hours2,
              minutes2 = 0;
            if (event.end_date) {
              const [year2, month2, day2] = event.end_date.split("-");
              const [dayOnly2] = day2.split("T");
              const [datePart2, timePart2] = event.end_date.split("T");
              const [hoursMinutes2] = timePart2.split(".");
              [hours2, minutes2] = hoursMinutes2.split(":");
            }
            // Ensure month and day have leading zeros if necessary
            console.log(hours2, minutes2);
            const formattedMonth = month.padStart(2, "0");
            const formattedDayOnly = dayOnly.padStart(2, "0");

            // Iterate through all days of the week
            return daysOfMonth
              .map((dayOfWeek) => {
                const {
                  year: dayYear,
                  month: dayMonth,
                  dayNumber: dayNumber,
                } = dayOfWeek;
                const formattedDayMonth = dayMonth.toString().padStart(2, "0");
                const formattedDayDay = dayNumber.toString().padStart(2, "0");
                if (
                  year === dayYear.toString() &&
                  formattedMonth === formattedDayMonth &&
                  formattedDayOnly === formattedDayDay
                ) {
                  filteredEvents.push({
                    mois:formattedMonth,
                    heuredebut: hours,
                    minutesdebut: minutes,
                    heurefin: hours2,
                    minutesfin: minutes2,
                    category: event.categories,
                    name: event.name,
                    address: event.address,
                    date: formattedDayOnly,
                    id: event._id,
                  });
                  dotEvent.push({
                    date: event.start_date,
                  });
                  return null;
                }
                return null;
              })
              .filter((event) => event !== null); // Filter out null values
          })
          .flat() // Flatten the array to avoid nested arrays
      }
    </View>
  );

  const MonthDaysList = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
  
    const monthEvents = filteredEvents.filter(event => {
      const currentMonth = new Date().getMonth() + 1;
      const eventMonth = parseInt(event.mois, 10);
      return eventMonth === currentMonth;
    });
  
    monthEvents.sort((a, b) => parseInt(a.date, 10) - parseInt(b.date, 10));
  
    const openModal = (event) => {
      setSelectedEvent(event);
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setSelectedEvent(null);
      setModalVisible(false);
    };
  
    return (
      <View style={styles.centeredMonthDaysContainer}>
        <Text style={styles.brutText}>
          Voici une liste des événements auxquels vous pouvez participer ce mois !
        </Text>
  
        {/* Utilisation de ScrollView si le nombre d'événements dépasse 4 */}
        <ScrollView style={{ maxHeight: monthEvents.length > 4 ? 200 : 'auto' }}>
          {monthEvents.map((event, index) => {
            const formattedDate = `${event.date.padStart(2, '0')}/${event.mois.padStart(2, '0')}`;
            return (
              <View key={index}>
                <TouchableOpacity onPress={() => openModal(event)} style={styles.eventButton}>
                  <Text style={styles.eventNameText}>
                    {`${event.name} - ${formattedDate}`}
                  </Text>
                </TouchableOpacity>
                <View style={styles.separator} />
              </View>
            );
          })}
        </ScrollView>
  
        {selectedEvent && (
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <Image source={require('../../assets/logo2.gif')} style={styles.logo} />
              <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
              <Text>Adresse: {selectedEvent.address}</Text>
              <View style={styles.separator2} />
              <Text>Catégorie: {selectedEvent.category.join(', ')}</Text>
              <View style={styles.separator2} />
              <Text>Heure: {`${selectedEvent.heuredebut.padStart(2, '0')}h${selectedEvent.minutesdebut.padStart(2, '0')} - ${selectedEvent.heurefin.padStart(2, '0')}h${selectedEvent.minutesfin.padStart(2, '0')}`}</Text>
              <View style={styles.separator2} />
              <Text>Date: {`${selectedEvent.date.padStart(2, '0')}/${selectedEvent.mois.padStart(2, '0')}`}</Text>
              <View style={styles.separator2} />
              <TouchableOpacity style={styles.loginBtn2} onPress={closeModal}>
                <Text style={styles.loginBtnText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    );
  };
  


  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#E1604D" />
        ) : (
          <>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameLabel}>Bonjour </Text>
              <Text style={styles.username}>{username + " !"}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 120,
                  borderRadius: 10,
                }}
              />
            </View>
          </>
        )}
      </View>
      {renderAllEvents()}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, viewMode === "week" && styles.selectedButton]}
          onPress={() => setViewMode("week")}
        >
          <Text style={styles.buttonText}>Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, viewMode === "month" && styles.selectedButton]}
          onPress={() => setViewMode("month")}
        >
          <Text style={styles.buttonText}>Mois</Text>
        </TouchableOpacity>
      </View>

      {viewMode === "week" ? (
        <FlatList
          data={daysOfWeek}
          horizontal
          scrollEnabled={false}
          renderItem={renderDayItem}
          keyExtractor={(item) => item.dayName}
          style={styles.daysOfWeekContainer}
          extraData={allEvents} // Pass allEvents as extraData to force re-render when allEvents changes
        />
      ) : (null
      )}

<View style={styles.detailsContainer}>
  {selectedDay ? (
    <>
      <Text style={styles.detailsText}>Votre calendrier UnBored !</Text>
      {filteredEvents.length > 0 ? (
        <>
          <FlatList
            data={filteredEvents.filter((event) => {
              const selectedDayNumber = daysOfWeek.find(
                (day) => day.dayName === selectedDay
              )?.dayNumber;
              if (selectedDayNumber) {
                formattedSelectedDayNumber = selectedDayNumber
                  .toString()
                  .padStart(2, "0");
              }
              return (
                formattedSelectedDayNumber &&
                event.date === formattedSelectedDayNumber.toString()
              );
            })}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleEventPress(item)}>
                <View style={styles.hourItem}></View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {viewMode === "week" ? (
            <HoursGrid selectedDay={formattedSelectedDayNumber} />
          ) : null}
        </>
      ) : (
        <Text style={styles.noDetailsText}>
          Pas d'événements disponibles pour {selectedDay}
        </Text>
      )}
    </>
  ) : null}

  {/* Display the MonthDaysList component with brute text when in month view mode */}
  {viewMode === "month" && (
    <MonthDaysList />
  )}
</View>


      <View style={styles.buttonContainer2}>
        <TouchableOpacity style={styles.loginBtn2} onPress={navigatetotamere}>
          <Text style={styles.loginBtnText2}>Ajouter des activités !</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn2} onPress={navigatetodescr}>
          <Text style={styles.loginBtnText2}>Remplir Automatiquement !</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNavbarContainer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    position: "relative", // Ensure the container is relative for absolute positioning
    padding: 16,
  },
  eventBox: {
    width:250,
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
    right:30,
    backgroundColor: "rgba(0, 20, 255, 0.4)",
    padding: 5,
    borderRadius: 5,
  },
  loginBtnText2: {
    color: "#FFF",
    textAlign: "center",
  },
  loginBtnText: {
    color: "#FFF",
    fontSize:18,
    textAlign: "center",
  },
  loginBtn2: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "justify",
    marginBottom: 20,
    backgroundColor: "#E1604D",
    borderColor: "#b3b3b3",
    borderWidth: 1,
  },
  loginBtn3: {
    backgroundColor: "#E1604D",
    borderColor: "#b3b3b3",
  },
  bottomNavbarContainer: {
    position: "center",
    top: 17,
    right: 10,
    width: "105%",
  },
  daysOfWeekContainer: {
    marginTop: 16,
  },
  monthDaysContainer: {
    justifyContent: "space-between",
    marginTop: 16,
  },
  dayItem: {
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedDayItem: {
    backgroundColor: "rgba(225, 96, 77, 0.2)",
  },
  monthDayItem: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  selectedMonthDayItem: {
    backgroundColor: "rgba(225, 96, 77, 0.5)",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dayNumber2: {
    color: "#E1604D",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dayName: {
    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
  dayName2: {
    fontSize: 12,
    textAlign: "center",
    color: "#E1604D",
  },
  monthDayNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  usernameContainer: {
    marginBottom: 30,
    // flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    padding: 5,
    borderWidth: 2,
    borderColor: "#E1604D",
    borderRadius: 12,
    position: "absolute",
    right: 0,
  },
  usernameLabel: {
    fontSize: 25,
    fontWeight: "500",
    // marginRight: 5,
    color: "#E1604D",
  },
  username: {
    fontSize: 25,
    fontWeight: "500",
    color: "#E1604D",
  },
  detailsContainer: {
    flex: 100,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 30,
  },
  detailsText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  redDot: {
    position: "absolute",
    bottom: 2,
    left: "68%",
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#E1604D",
  },
  hourItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
    padding: 8,
  },
  hourText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "200",
  },
  eventText: {
    fontSize: 16,
    color: "#333",
  },
  noDetailsText: {
    fontSize: 16,
    color: "#888",
    marginTop: 8,
  },
  button: {
    width: 80,
    backgroundColor: "rgba(225, 96, 77, 0.2)",
    padding: 5,
    borderRadius: 20,
    marginVertical: 15,
    marginRight: 25,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#E1604D",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "rgba(225, 96, 77, 0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginTop: -50,
  },
  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
  },
  brutText: {
    paddingBottom:20,
  },
  centeredMonthDaysContainer: {
    top:-20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(211, 211, 211, 0.2)",
    borderRadius: 20,
    padding: 20,
  },
  eventButton: {
    backgroundColor: '#E1604D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  eventNameText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  separator2: {
    height: 10,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Calendar;
