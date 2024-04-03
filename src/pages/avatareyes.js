import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const avatareyes = ({ navigation }) => {
  const [avatarIndex, setAvatarIndex] = useState(0); // Default avatar index
  const [selectedGlassesIndex, setSelectedGlassesIndex] = useState(null); // Index of selected glasses
  const [selectedMouthIndex, setSelectedMouthIndex] = useState(null); // Index of selected mouth
  const [selectedeyebroweIndex, setSelectedeyebroweIndex] = useState(null); // Index of selected mouth
  const [selectedHair, setSelectedHair] = useState(null);
  const [continuePressed, setContinuePressed] = useState(0); // Changed to 0 to represent the index
  const [avatarColor, setAvatarColor] = useState("#FFFFFF"); // Default avatar color
  const [reward, setReward] = useState(null);
  const faces = [
    require("./avatar/avatars/body/body.png"),
  ];
  const glasses = [
    require("./avatar/avatars/eyes/eyeroll.png"),
     require("./avatar/avatars/eyes/closed.png"),
     require("./avatar/avatars/eyes/cry.png"),
     require("./avatar/avatars/eyes/default.png"),
     require("./avatar/avatars/eyes/dizzy.png"),
     require("./avatar/avatars/eyes/happy.png"),
     require("./avatar/avatars/eyes/heart.png"),
     require("./avatar/avatars/eyes/side.png"),
     require("./avatar/avatars/eyes/squint.png"),
     require("./avatar/avatars/eyes/surprised.png"),
     require("./avatar/avatars/eyes/wacky.png"),
     require("./avatar/avatars/eyes/wink.png"),
  ];
  const hat = [
    require("./avatar/avatars/hat/fedora.png"),
    require("./avatar/avatars/hat/hijab.png"),
    require("./avatar/avatars/hat/turban.png"),
    require("./avatar/avatars/hat/winter.png"),
    require("./avatar/avatars/hat/winter2.png"),
    require("./avatar/avatars/hat/wintercat.png"),
  ]
  const hair = [
    require("./avatar/avatars/hair1/afro.png"),
    require("./avatar/avatars/hair1/big.png"),
    require("./avatar/avatars/hair1/bun.png"),
    require("./avatar/avatars/hair1/buzzcut.png"),
    require("./avatar/avatars/hair1/calvitie.png"),
    require("./avatar/avatars/hair1/curly.png"),
    require("./avatar/avatars/hair1/curlyshort.png"),
    require("./avatar/avatars/hair1/curvy.png"),
    require("./avatar/avatars/hair1/frizzy.png"),
    require("./avatar/avatars/hair1/longdreads.png"),
    require("./avatar/avatars/hair1/longstraight.png"),
    require("./avatar/avatars/hair1/medium.png"),
    require("./avatar/avatars/hair1/mediumdreads.png"),
    require("./avatar/avatars/hair1/mediumlong.png"),
    require("./avatar/avatars/hair1/minidreads.png"),
    require("./avatar/avatars/hair1/shaggy.png"),
    require("./avatar/avatars/hair1/shaggymulet.png"),
    require("./avatar/avatars/hair1/shortflat.png"),
    require("./avatar/avatars/hair1/shortwaved.png"),
    require("./avatar/avatars/hair1/square.png"),
  ]
  const mouths = [
    require("./avatar/avatars/mouth/default.png"),
    require("./avatar/avatars/mouth/desbelief.png"),
    require("./avatar/avatars/mouth/eating.png"),
    require("./avatar/avatars/mouth/grimace.png"),
    require("./avatar/avatars/mouth/open.png"),
    require("./avatar/avatars/mouth/sad.png"),
    require("./avatar/avatars/mouth/scream.png"),
    require("./avatar/avatars/mouth/serious.png"),
    require("./avatar/avatars/mouth/smile.png"),
    require("./avatar/avatars/mouth/tongue.png"),
    require("./avatar/avatars/mouth/twinkle.png"),
    require("./avatar/avatars/mouth/vomit.png"),
  ];
  const eyebrowes = [
    require("./avatar/avatars/eyebrowes/angry.png"),
    require("./avatar/avatars/eyebrowes/exited.png"),
    require("./avatar/avatars/eyebrowes/flat.png"),
    require("./avatar/avatars/eyebrowes/natural.png"),
    require("./avatar/avatars/eyebrowes/sad.png"),
    require("./avatar/avatars/eyebrowes/sad2.png"),
    require("./avatar/avatars/eyebrowes/unibrow.png"),
    require("./avatar/avatars/eyebrowes/updown.png"),

  ];

  useEffect(() => {
    fetchProfileData();
  }, []);

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
      console.log(profileData);
      
    if (profileData.user.reservations && profileData.user.reservations.length > 0) {
      // Iterate through each reservation
      for (const reservationId of profileData.user.reservations) {
        // Make a call to fetch reservation details
        const reservationResponse = await fetch(`http://20.216.143.86/events/show?id=${reservationId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!reservationResponse.ok) {
          throw new Error(`HTTP error! Stattus: ${reservationResponse.status}`);
        }

        const reservationData = await reservationResponse.json();
        console.log("prouuuuut",reservationData);
        // Check if the reservation contains a reward
        if (reservationData.event.rewards[0]) {
          // Set state or perform any action accordingly
          // For example, you can set a state variable indicating the presence of a reward
          setReward(true);
          console.log("This reservation has a reward!");
        }
      }
    }

      setAvatarColor(profileData.user.style.head);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const onPressImage = (index) => {
    setSelectedGlassesIndex(index);
  };

  const onPressContinue = () => {
    setContinuePressed(prevIndex => prevIndex + 1); // Increment the index
 };

  const onPressFinish = () => {
    // Navigate to Settings screen
    navigation.navigate("Settings");
  };

  const renderGlassesImages = () => {
    if (!continuePressed) {
      // Divide glasses array into four arrays with 3 elements each
      const glassesRow1 = glasses.slice(0, 3);
      const glassesRow2 = glasses.slice(3, 6);
      const glassesRow3 = glasses.slice(6, 9);
      const glassesRow4 = glasses.slice(9, 12);
  
      return (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>
            {glassesRow1.map((glass, index) => (
              <TouchableOpacity key={index} onPress={() => onPressImage(index)}>
                <Image source={glass} style={[styles.bigImage]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {glassesRow2.map((glass, index) => (
              <TouchableOpacity key={index + 3} onPress={() => onPressImage(index + 3)}>
                <Image source={glass} style={[styles.bigImage]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {glassesRow3.map((glass, index) => (
              <TouchableOpacity 
                key={index + 6} 
                onPress={() => {
                  if (reward) { // Check if it's not the first eye of the 3rd row or if setReward is true
                    onPressImage(index + 6);
                  }
                }}
              >
                <Image source={glass} style={[styles.bigImage, reward ? null : styles.lockedImage]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {glassesRow4.map((glass, index) => (
              <TouchableOpacity key={index + 9} onPress={() => onPressImage(index + 9)}>
                <Image source={glass} style={[styles.bigImage]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };
  
  

  const renderMouthImages = () => {
    // Divide mouths array into two arrays with 3 elements each
    const mouthsRow1 = mouths.slice(0, 3);
    const mouthsRow2 = mouths.slice(3, 6);
    const mouthsRow3 = mouths.slice(6, 9);
    const mouthsRow4 = mouths.slice(9, 12);
  
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          {mouthsRow1.map((mouth, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedMouthIndex(index)}>
              <Image source={mouth} style={[styles.bigImage]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {mouthsRow2.map((mouth, index) => (
            <TouchableOpacity key={index + 3} onPress={() => setSelectedMouthIndex(index + 3)}>
              <Image source={mouth} style={[styles.bigImage]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {mouthsRow3.map((mouth, index) => (
            <TouchableOpacity key={index + 6} onPress={() => setSelectedMouthIndex(index + 6)}>
              <Image source={mouth} style={[styles.bigImage]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {mouthsRow4.map((mouth, index) => (
            <TouchableOpacity key={index + 9} onPress={() => setSelectedMouthIndex(index + 9)}>
              <Image source={mouth} style={[styles.bigImage]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  const renderEyebrowesImages = () => {
    // Divide mouths array into two arrays with 3 elements each
    const eyebrowesRow1 = eyebrowes.slice(0, 3);
    const eyebrowesRow2 = eyebrowes.slice(3, 6);
    const eyebrowesRow3 = eyebrowes.slice(6, 9);
  
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          {eyebrowesRow1.map((eyebrowe, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedeyebroweIndex(index)}>
              <Image source={eyebrowe} style={[styles.bigImage]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {eyebrowesRow2.map((eyebrowe, index) => (
            <TouchableOpacity key={index + 3} onPress={() => setSelectedeyebroweIndex(index + 3)}>
              <Image source={eyebrowe} style={[styles.bigImage]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {eyebrowesRow3.map((eyebrowe, index) => (
            <TouchableOpacity key={index + 6} onPress={() => setSelectedeyebroweIndex(index + 6)}>
              <Image source={eyebrowe} style={[styles.bigImage]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderHairImages = () => {
    const hairRow1 = hair.slice(0, 3);
    const hairRow2 = hair.slice(3, 6);
    const hairRow3 = hair.slice(6, 9);
    const hairRow4 = hair.slice(9, 12);
    const hairRow5 = hair.slice(12, 15);
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          {hairRow1.map((hair, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedHair(index)}>
              <Image source={hair} style={[styles.BigImageHair]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {hairRow2.map((hair, index) => (
            <TouchableOpacity key={index + 3} onPress={() => setSelectedHair(index + 3)}>
              <Image source={hair} style={[styles.BigImageHair]} />
            </TouchableOpacity>
          ))}
        </View>
        {/* <View style={styles.row}>
          {hairRow3.map((hair, index) => (
            <TouchableOpacity key={index + 6} onPress={() => setSelectedHair(index + 6)}>
              <Image source={hair} style={[styles.BigImageHair]} />
            </TouchableOpacity>
          ))}
        </View> */}
        {/* <View style={styles.row}>
          {hairRow4.map((hair, index) => (
            <TouchableOpacity key={index + 9} onPress={() => setSelectedHair(index + 9)}>
              <Image source={hair} style={[styles.BigImageHair]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {hairRow5.map((hair, index) => (
            <TouchableOpacity key={index + 12} onPress={() => setSelectedHair(index + 12)}>
              <Image source={hair} style={[styles.BigImageHair]} />
            </TouchableOpacity>
          ))}
        </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créez votre Avatar !</Text>
      <View style={styles.avatarContainer}>
        <Image source={faces[avatarIndex]} style={[styles.image, { tintColor: avatarColor }]} />
        {selectedGlassesIndex !== null && (
          <Image source={glasses[selectedGlassesIndex]} style={[styles.glasses]} />
        )}
        {selectedMouthIndex !== null && continuePressed >= 1 && (
          <Image source={mouths[selectedMouthIndex]} style={[styles.mouth]} />
        )}
        {selectedeyebroweIndex !== null && continuePressed >= 1 && (
          <Image source={eyebrowes[selectedeyebroweIndex]} style={[styles.eyebrowes, { tintColor: "#000000" }]} />
        )}
        {selectedHair !== null && continuePressed >= 1 && (
          <Image source={hair[selectedHair]} style={[styles.hair]} />
        )}
      </View>
      <TouchableOpacity style={styles.bigButton} onPress={onPressContinue}>
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
      {!continuePressed && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderGlassesImages()}</View>
        </View>
      )}
      {continuePressed == 1 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderMouthImages()}</View>
        </View>
      )}
      {continuePressed == 2 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderEyebrowesImages()}</View>
        </View>
      )}
      {continuePressed == 3 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderHairImages()}</View>
        </View>
      )}
      {continuePressed == 4 && (
        <TouchableOpacity style={styles.bigButton} onPress={onPressFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      )}
    </View>
 );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor:"#efefef",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatarContainer: {
    position: "relative",
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  glasses: {
    position: "absolute",
    top: "22%", // Adjust the position as needed
    left: "32%", // Adjust the position as needed
  },
  mouth: {
    position: "absolute",
    top: "40%", // Adjust the position as needed
    left: "38%", // Adjust the position as needed
  },
  eyebrowes: {
    position: "absolute",
    top: "13%", // Adjust the position as needed
    left: "33%", // Adjust the position as needed
  },
  hair: {
    resizeMode: "contain",
    width:190,
    height:170,
    position: "absolute",
    top: "-13%", // Adjust the position as needed
    left: "3.5%", // Adjust the position as needed
  },
  imagesContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom:30,
  },
  bigImage: {
    marginHorizontal: 10,
  },
  lockedImage: {
    opacity:0.1,
  },
  BigImageHair: {
    marginHorizontal: 10,
  },
  bigButton: {
    marginTop: 20,
    backgroundColor: "#e1604D",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default avatareyes;
