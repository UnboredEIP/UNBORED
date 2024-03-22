import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Navbar from '../components/NavigationBar';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Calendar = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [username, setUsername] = useState("");
  const [defaultImageUri] = useState("https://..."); // URL d'une image par défaut
  const [image, setImage] = useState(defaultImageUri);
  const [dayDetails, setDayDetails] = useState([]);
  const [viewMode, setViewMode] = useState('week'); // Ajout du mode d'affichage
  const [loading, setLoading] = useState(true);

  const navigatetotamere = async () => {
    navigation.navigate("NewEvent");
  }
  const navigatetodescr = async () => {
    navigation.navigate("Description");
  }
  useEffect(() => {
    const getDaysOfWeek = () => {
      const today = new Date();
      const currentDay = today.getDay();

      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = (currentDay + i) % 7;

        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() + i);

        days.push({
          dayNumber: dayDate.getDate(),
          dayName: getDayName(day),
        });
      }

      return days;
    };

    const getDayName = (dayNumber) => {
      const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      return days[dayNumber];
    };

    const fetchProfileData = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");

        const response = await fetch("http://20.216.143.86/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const profileData = await response.json();
        setUsername(profileData.user.username.trim());
        setImage(`http://20.216.143.86/getimage?imageName=${profileData.user.profilPhoto}`);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching profile info:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    const today = getDayName(new Date().getDay());
    handleDayPress(today);

    setDaysOfWeek(getDaysOfWeek());
    fetchProfileData();
  }, []);

  const handleDayPress = (day) => {
    let dummyDayDetails = [];

    if (viewMode === 'week') {
      dummyDayDetails = [
        { hour: '09:00 AM ', event: 'Meeting' },
        { hour: '02:00 PM ', event: 'Lunch' },
      ];
    } else if (viewMode === 'month') {
      for (let i = 1; i <= 2; i++) {
        dummyDayDetails.push({
          hour: `10:00 AM - ${i % 2 === 0 ? 'Meeting' : 'Event'}`,
        });
      }
    }

    setDayDetails(dummyDayDetails);
    setSelectedDay(day);
  };

  const renderDayItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.dayItem, item.dayName === selectedDay && styles.selectedDayItem]}
      onPress={() => handleDayPress(item.dayName)}
    >
      <Text style={styles.dayNumber}>{item.dayNumber}</Text>
      <Text style={styles.dayName}>{item.dayName}</Text>
    </TouchableOpacity>
  );

  const MonthDaysList = () => (
    <FlatList
      data={Array.from({ length: 30 }, (_, index) => index + 1)}
      numColumns={6}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.monthDayItem, item === selectedDay && styles.selectedMonthDayItem]}
          onPress={() => handleDayPress(item)}
        >
          <Text style={styles.monthDayNumber}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.centeredMonthDaysContainer}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#E1604D" />
        ) : (
          <>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameLabel}>Bonjour </Text>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.usernameLabel}> !</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, viewMode === 'week' && styles.selectedButton]}
          onPress={() => setViewMode('week')}
        >
          <Text style={styles.buttonText}>Semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, viewMode === 'month' && styles.selectedButton]}
          onPress={() => setViewMode('month')}
        >
          <Text style={styles.buttonText}>Mois</Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'week' ? (
        <FlatList
          data={daysOfWeek}
          horizontal
          scrollEnabled={false}
          renderItem={renderDayItem}
          keyExtractor={(item) => item.dayName}
          style={styles.daysOfWeekContainer}
        />
      ) : (
        <MonthDaysList />
      )}

      <View style={styles.detailsContainer}>
        {selectedDay ? (
          <>
            <Text style={styles.detailsText}>Détail pour la journée de  {selectedDay}</Text>
            {dayDetails.length > 0 ? (
              <FlatList
                data={dayDetails}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.hourItem}>
                    <Text style={styles.hourText}>{item.hour}</Text>
                    <Text style={styles.eventText}>{item.event}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Text style={styles.noDetailsText}>Pas de détails disponibles pour {selectedDay}</Text>
            )}
          </>
        ) : (
          <Text style={styles.detailsText}>Sélectionnez un jour pour voir les détails</Text>
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
    padding: 16,
  },
  loginBtnText2: {
    color: "#FFF",
    textAlign: "center",
  },
  loginBtn2: {
    marginTop: 20,
    marginLeft:5,
    marginRight:5,
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
  bottomNavbarContainer: {
    position: 'center',
    top: 17,
    right: 10,
    width: '105%',
  },
  daysOfWeekContainer: {
    marginTop: 16,
  },
  monthDaysContainer: {
    justifyContent: 'space-between',
    marginTop: 16,
  },
  dayItem: {
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedDayItem: {
    backgroundColor: 'rgba(225, 96, 77, 0.2)',
  },
  monthDayItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  selectedMonthDayItem: {
    backgroundColor: 'rgba(225, 96, 77, 0.5)',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dayName: {
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
  monthDayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 5,
    marginLeft: 30,
    borderWidth: 2,
    borderColor: '#E1604D',
    borderRadius: 12,
  },
  usernameLabel: {
    fontSize: 25,
    fontWeight: '500',
    marginRight: 5,
    color: '#E1604D',
  },
  username: {
    fontSize: 25,
    fontWeight: '500',
    color: '#E1604D',
  },
  detailsContainer: {
    flex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  detailsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  hourText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventText: {
    fontSize: 16,
    color: '#333',
  },
  noDetailsText: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  button: {
    width: 80,
    backgroundColor: 'rgba(225, 96, 77, 0.2)',
    padding: 5,
    borderRadius: 20,
    marginVertical: 15,
    marginRight: 25,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#E1604D',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'rgba(225, 96, 77, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: -50,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
  },
  centeredMonthDaysContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    borderRadius: 20,
  },
});

export default Calendar;
