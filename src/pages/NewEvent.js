import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
} from "react-native";
import Navbar from "../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";


const NewEvent = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [activityName, setActivityName] = useState("");
  const [address, setAddress] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [startMinutes, setStartMinutes] = useState("");
  const [endMinutes, setEndMinutes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to hold the selected category
  const [suggestions, setSuggestions] = useState([]);
  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };
  const [displayedDays, setDisplayedDays] = useState([0, 1, 2, 3]); // Initial display of current day and next three days
  const categories = [
    { name: "Sport", color: "#FF5733" },
    { name: "Art", color: "#33FF57" },
    { name: "Musique", color: "#5733FF" },
    { name: "Cinema", color: "#FF33E6" },
    { name: "Travail", color: "#33E6FF" },
    { name: "Autre", color: "#E62933" },
  ];
  const fetchAddressSuggestions = async (text) => {
    if (text.length > 2) { // Commence à chercher après 3 caractères
      try {
        const response = await fetch(
          `https://us1.locationiq.com/v1/autocomplete.php?key=pk.7de32014388395165add149132f2b239&q=${text}&limit=1&countrycodes=fr&format=json`
        );
        const data = await response.json();
        
        // Vérifie si la réponse contient un tableau valide
        if (Array.isArray(data)) {
          // Filtrer les doublons en utilisant un Set pour les adresses uniques
          const uniqueSuggestions = data.filter((item, index, self) =>
            index === self.findIndex((t) => t.display_name === item.display_name)
          );
          
          setSuggestions(uniqueSuggestions);
        } else {
          // Si la donnée n'est pas un tableau, on vide les suggestions
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]); // Vide les suggestions en cas d'erreur
      }
    } else {
      setSuggestions([]); // Vide les suggestions si l'input est trop court
    }
  };
  
  const handleSelectAddress = (selectedAddress) => {
    setAddress(selectedAddress);
    Keyboard.dismiss(); // Ferme le clavier pour éviter que l'input ne reste en focus
    setSuggestions([]); // Vide les suggestions après avoir sélectionné une adresse
  };
  const navigatetocalendar = async () => {
    navigation.navigate("Accueil3");
  };
  const handleCategorySelection = (categoryName) => {
    setSelectedCategory(categoryName); // Update the selected category state
    console.log("Selected Category:", categoryName);
  };
  const goToPreviousDays = () => {
    setDisplayedDays((prevDays) => prevDays.map((day) => day - 1));
  };

  const goToNextDays = () => {
    setDisplayedDays((prevDays) => prevDays.map((day) => day + 1));
  };

  const getDayName = (date) => {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const dayNumber = date.getDay();
    return days[dayNumber];
  };

  const today = new Date().getDay();

  const handleHistory = async (name) => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
    
        const response = await fetch(
          "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/history/set",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              history: [`Vous avez créé l'activité : ${name} dans votre calendrier !`],
            }),
          }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        else{
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
      }
    };

  const handleSubmit = async () => {
    if (!selectedDay) {
      alert("Sélectionnez d'abord un jour");
      return;
    }

    const currentDate = new Date();
    let displayedDate = new Date(currentDate);
    const selectedDayIndex = displayedDays.findIndex((dayOffset) => {
      const tempDate = new Date(currentDate);
      tempDate.setDate(tempDate.getDate() + dayOffset);
      return getDayName(tempDate) === selectedDay;
    });
    displayedDate.setDate(
      displayedDate.getDate() + displayedDays[selectedDayIndex]
    );
    const formattedDate = displayedDate.toISOString().split("T")[0];
    console.log(formattedDate);
    const selectedCategories = selectedCategory ? [selectedCategory] : [];

    const eventData = {
      start_date: formattedDate,
      name: activityName,
      address: address,
      categories: selectedCategories,
    };

    try {
      const authToken = await AsyncStorage.getItem("authToken");
      let startDate = new Date(formattedDate);
      let endDate = new Date(formattedDate);
      startDate.setUTCHours(startDate.getUTCHours() + startHour);
      startDate.setUTCMinutes(startDate.getUTCMinutes() + startMinutes);
      endDate.setUTCHours(endDate.getUTCHours() + endHour);
      endDate.setUTCMinutes(endDate.getUTCMinutes() + endMinutes);
      // Convert the date back to the desired format
      const formattedEndDate = endDate.toISOString();
      const formattedStartDate = startDate.toISOString();
      console.log("zizi", formattedStartDate + "pipi:", formattedEndDate);

      const response = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/create/private",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            ...eventData,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
          }),
        }
      );

      if (response.ok) {
        console.log("Event created successfully");
        handleHistory(eventData.name);
        navigatetocalendar();
      } else {
        console.error("Failed to create event", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.inner}>
            <Text style={styles.title}>
              Ajoute une activité dans ton calendrier !
            </Text>
            <Text style={styles.username}>Titre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'activité"
              value={activityName}
              onChangeText={setActivityName}
            />
            <View style={styles.daySelectionContainer}>
              <Text style={styles.daySelectionText}>
                Sélectionnez le jour :
              </Text>
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={goToPreviousDays}
                >
                  <Text style={styles.navigationButtonText}>‹</Text>
                </TouchableOpacity>
                <View style={styles.daysOfWeek}>
                  {displayedDays.map((dayOffset) => {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + dayOffset);
                    const dayName = getDayName(currentDate);
                    return (
                      <TouchableOpacity
                        key={dayOffset}
                        style={[
                          styles.dayButton,
                          selectedDay === dayName && styles.selectedDayButton,
                        ]}
                        onPress={() => handleDaySelection(dayName)}
                      >
                        <Text
                          style={[
                            styles.dayButtonText,
                            selectedDay === dayName && { color: "white" },
                          ]}
                        >
                          <Text style={styles.dayButtonNumber}>
                            {currentDate.getDate()}
                          </Text>
                          {"\n"}
                          <Text style={styles.dayButtonName}>{dayName}</Text>
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={goToNextDays}
                >
                  <Text style={styles.navigationButtonText}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.username}>Adresse</Text>
            <View>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              placeholder="Adresse"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                fetchAddressSuggestions(text);
              }}
              multiline={true}
            />
            {/* Afficher uniquement si les suggestions existent */}
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectAddress(item.display_name)}>
                    <Text style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
                      {item.display_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
            <View style={styles.categoryContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    {
                      width: 100,
                      height: 50,
                      borderColor: category.color,
                      backgroundColor:
                        selectedCategory === category.name
                          ? `${category.color}80`
                          : "#fff",
                    },
                  ]}
                  onPress={() => handleCategorySelection(category.name)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      {
                        color:
                          selectedCategory === category.name
                            ? "#fff"
                            : category.color,
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.hourSelectionContainer}>
              <Text style={styles.username}>
                Sélectionnez l'heure de début et de fin
              </Text>
              <View style={styles.hoursContainer}>
                <TextInput
                  style={styles.hourInput}
                  placeholder="Heures"
                  value={startHour}
                  onChangeText={setStartHour}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.hourSeparator}>-</Text>
                </View>
                <TextInput
                  style={styles.hourInput}
                  placeholder="Minutes"
                  value={startMinutes}
                  onChangeText={setStartMinutes}
                />
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text style={styles.hourSeparator}>|</Text>
                </View>
                <TextInput
                  style={styles.hourInput}
                  placeholder="Heures"
                  value={endHour}
                  onChangeText={setEndHour}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.hourSeparator}>-</Text>
                </View>
                <TextInput
                  style={styles.hourInput}
                  placeholder="Minutes"
                  value={endMinutes}
                  onChangeText={setEndMinutes}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Soumettre</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 16,
  },
  categoryButtonText: {
    textAlign: "center",
    top: 4,
  },
  categoryButton: {
    borderRadius: 25, // Adjust the border radius for a round shape
    borderWidth: 2, // Add border width
    padding: 10,
    marginBottom: 10, // Add margin bottom for spacing between buttons
  },
  bottomNavbarContainer: {
    position: "absolute",
    top: 720,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    textAlign: "left",
    marginBottom: 10,
    color: "#E1604D",
  },
  daySelectionContainer: {
    // marginBottom: 20,
  },
  daySelectionText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 5,
    width: 60,
    height: 60,
    alignItems: "center",
    marginLeft: 5,
    marginRight: 6, // Ajouter une marge horizontale
  },
  dayButtonName: {
    fontSize: 11,
  },
  selectedDayButton: {
    backgroundColor: "#E1604D",
  },
  dayButtonText: {
    color: "black",
    paddingTop: 5,
    textAlign: "center", // Center the text horizontally
  },
  dayButtonNumber: {
    fontSize: 15,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#E1604D",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    width: "100%",
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
  },
  username: {
    position: "relative",
    marginTop: 0,
    color: "black",
  },
  addressInput: {
    height: 100,
  },
  hourSelectionContainer: {
    marginBottom: 20,
  },
  hoursContainer: {
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
  },
  hourInput: {
    borderRadius: 10,
    width: 82,
    height: 45,
    paddingLeft: 10,
    textAlign: "center", // Center the text horizontally
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20, // Adjust the margin as needed
  },
  hourInput2: {
    borderRadius: 10,
    width: 100,
    height: 45,
    paddingLeft: 10,
    marginRight: 10,
    textAlign: "center", // Center the text horizontally
  },

  hourSeparator: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  navigationButton: {
    backgroundColor: "#E1604D",
    padding: 10,
    borderRadius: 30,
  },
  navigationButtonText: {
    paddingTop: 9,
    color: "white",
  },
});

export default NewEvent;
