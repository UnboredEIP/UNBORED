import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyAvatar from "../components/Avatar";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const avatareyes = ({ navigation }) => {
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [selectedHair, setSelectedHair] = useState("");
  const [selectedBeard, setSelectedBeard] = useState("");
  const [selectedMouth, setSelectedMouth] = useState("");
  const [selectedHat, setSelectedHat] = useState("");
  const [selectedEyebrow, setSelectedEyebrow] = useState("");
  const [avatarColor, setAvatarColor] = useState("#FFFFFF");
  const [clothColor, setClothColor] = useState("");
  const [HairColor, setHairColor] = useState("black");
  const [EyeColor, setEyeColor] = useState("");
  const [HatColor, setHatColor] = useState("");
  const [selectedHairId, setSelectedHairId] = useState(null);
  const [selectedGlassesId, setSelectedGlassesId] = useState(null);
  const [selectedClothId, setSelectedClothId] = useState(null);
  const [selectedBeardId, setSelectedBeardId] = useState(null);
  const [selectedMouthId, setSelectedMouthId] = useState(null);
  const [selectedHatId, setSelectedHatId] = useState(null);
  const [selectedEyebrowId, setSelectedEyebrowId] = useState(null);
  const [squintUnlocked, setSquintUnlocked] = useState(false);
  const [surprisedUnlocked, setSurprisedUnlocked] = useState(false);
  const [wackyUnlocked, setWackyUnlocked] = useState(false);
  const [winkUnlocked, setWinkUnlocked] = useState(false);
  const [sideUnlocked, setSideUnlocked] = useState(false);
  const [heartUnlocked, setHeartUnlocked] = useState(false);  
  const [continuePressed, setContinuePressed] = useState(0);
  const [reward, setReward] = useState(null);

  const saveAvatarData = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      // Step 2: Save selected face and accessories in the database
      const avatarDataResponse = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/avatar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            eyebrows: {
              id: selectedEyebrowId.toString(),
            },
            hair: {
              id: selectedHairId.toString(),
              color: HairColor.toString(),
            },
            eyes: {
              id: selectedGlassesId.toString(),
              color: EyeColor.toString(),
            },
            accessory: {
              id: selectedClothId.toString(),
              color: clothColor.toString(),
            },
            beard: { id: selectedBeardId.toString() },
            mouth: { id: selectedMouthId.toString() },
          }),
        }
      );

      const avatarDataResult = await avatarDataResponse.json();
      console.log("Avatar data saved:", avatarDataResult);
    } catch (error) {
      console.error("Error saving avatar data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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
      console.log(profileData);
  
      if (profileData.user.reservations && profileData.user.reservations.length > 0) {
        for (const reservationId of profileData.user.reservations) {
          const reservationResponse = await fetch(
            `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${reservationId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
  
          if (!reservationResponse.ok) {
            throw new Error(`HTTP error! Status: ${reservationResponse.status}`);
          }
  
          const reservationData = await reservationResponse.json();
          console.log("Reservation Data:", reservationData);
  
          if (reservationData.event.rewards[0]) {
            setReward(true);
            console.log("This reservation has a reward!");
          }
        }
      }
  
      if (profileData.user.unlockedStyle) {
        setSquintUnlocked(profileData.user.unlockedStyle.includes("squint"));
        setSurprisedUnlocked(profileData.user.unlockedStyle.includes("surprised"));
        setWackyUnlocked(profileData.user.unlockedStyle.includes("wacky"));
        setWinkUnlocked(profileData.user.unlockedStyle.includes("wink"));
        setSideUnlocked(profileData.user.unlockedStyle.includes("side"));
        setHeartUnlocked(profileData.user.unlockedStyle.includes("heart"));
      }
  
      setAvatarColor(profileData.user.style.head.color);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const onPressImage = (eyes, id) => {
    setSelectedGlasses(eyes);
    setSelectedGlassesId(id);
  };

  const onPressImageHair = (hair, id) => {
    setSelectedHair(hair);
    setSelectedHairId(id);
  };

  const onPressImageCloth = (cloth, id) => {
    setSelectedCloth(cloth);
    setSelectedClothId(id);
  };
  const onPressImageBeard = (beard, id) => {
    setSelectedBeard(beard);
    setSelectedBeardId(id);
  };
  const onPressImageMouth = (mouth, id) => {
    setSelectedMouth(mouth);
    setSelectedMouthId(id);
  };
  const onPressImageEyebrow = (eyebrow, id) => {
    setSelectedEyebrow(eyebrow);
    setSelectedEyebrowId(id);
  };
  const onPressImageHat = (hat, id) => {
    setSelectedHat(hat);
    setSelectedHatId(id);
  };
  const onPressContinue = () => {
    setContinuePressed((prevIndex) => prevIndex + 1); // Increment the index
  };

  const onPressBack = () => {
    setContinuePressed((prevIndex) => prevIndex - 1); // Decrement the index
  };

  const onPressFinish = () => {
    console.log("Selected Hair ID:", selectedHairId);
    console.log("Selected Glasses ID:", selectedGlassesId);
    console.log("Selected Cloth ID:", selectedClothId);
    console.log("Selected Beard ID:", selectedBeardId);
    console.log("Selected Mouth ID:", selectedMouthId);
    saveAvatarData();
    navigation.navigate("Settings");
  };

 
  const renderGlassesImages = () => {
    if (!continuePressed) {
      return (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPressImage("closed", 4)}
            >
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"closed"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => onPressImage("cry", 3)}
            >
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"cry"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => onPressImage("default", 2)}
            >
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"default"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button4}
              onPress={() => onPressImage("dizzy", 1)}
            >
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"dizzy"} />
            </TouchableOpacity>
          </View>
          <View style={styles.row2}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPressImage("eyeroll", 8)}
            >
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"eyeroll"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => onPressImage("happy", 7)}
            >
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"happy"} />
            </TouchableOpacity>
            {heartUnlocked ? (
              <TouchableOpacity
                style={styles.button3}
                onPress={() => onPressImage("heart", 6)}
              >
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"heart"} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.button3, styles.lockedButton]}>
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"heart"} />
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockText}>🔒</Text>
                </View>
              </View>
            )}
            {sideUnlocked ? (
              <TouchableOpacity
                style={styles.button4}
                onPress={() => onPressImage("side", 5)}
              >
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"side"} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.button4, styles.lockedButton]}>
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"side"} />
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockText}>🔒</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.row3}>
            {squintUnlocked ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => onPressImage("squint", 12)}
              >
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"squint"} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.button, styles.lockedButton]}>
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"squint"} />
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockText}>🔒</Text>
                </View>
              </View>
            )}
            {surprisedUnlocked ? (
              <TouchableOpacity
                style={styles.button2}
                onPress={() => onPressImage("surprised", 11)}
              >
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"surprised"} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.button2, styles.lockedButton]}>
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"surprised"} />
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockText}>🔒</Text>
                </View>
              </View>
            )}
            {wackyUnlocked ? (
              <TouchableOpacity
                style={styles.button3}
                onPress={() => onPressImage("wacky", 10)}
              >
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"wacky"} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.button3, styles.lockedButton]}>
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"wacky"} />
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockText}>🔒</Text>
                </View>
              </View>
            )}
            {winkUnlocked ? (
              <TouchableOpacity
                style={styles.button4}
                onPress={() => onPressImage("wink", 9)}
              >
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"wink"} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.button4, styles.lockedButton]}>
                <MyAvatar size={90} colorSkin={avatarColor} eyes={"wink"} />
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockText}>🔒</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      );
    }
    return null;
  };
  


  const renderClothImages = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonZ}
            onPress={() => onPressImageCloth("blazer", 3)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} clothTop={"blazer"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ2}
            onPress={() => onPressImageCloth("crewneck", 2)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} clothTop={"crewneck"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ3}
            onPress={() => onPressImageCloth("hoodie", 1)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} clothTop={"hoodie"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.buttonZ}
            onPress={() => onPressImageCloth("polo", 6)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} clothTop={"polo"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ2}
            onPress={() => onPressImageCloth("scoopneck", 5)}
          >
            <MyAvatar
              size={90}
              colorSkin={avatarColor}
              clothTop={"scoopneck"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ3}
            onPress={() => onPressImageCloth("shirt", 4)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} clothTop={"shirt"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row3}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageCloth("overall", 8)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} clothTop={"overall"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageCloth("vneck", 7)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} clothTop={"vneck"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHairImages = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageHair("afro", 4)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"afro"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageHair("big", 3)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"big"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageHair("buzzcut", 2)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"buzzcut"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageHair("calvitie", 1)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"calvitie"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageHair("curly", 8)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"curly"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageHair("curlyshort", 7)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"curlyshort"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageHair("curvy", 6)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"curvy"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageHair("frizzy", 5)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"frizzy"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row3}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageHair("longdreads", 12)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"longdreads"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageHair("longstraight", 11)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"longstraight"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageHair("medium", 10)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"medium"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageHair("mediumdreads", 9)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"mediumdreads"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderHairImages2 = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageHair("mediumlong", 16)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"mediumlong"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageHair("minidreads", 15)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"minidreads"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageHair("shaggy", 14)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shaggy"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageHair("shaggymullet", 13)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shaggymullet"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.buttonZ}
            onPress={() => onPressImageHair("shortflat", 19)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shortflat"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ2}
            onPress={() => onPressImageHair("shortwaved", 18)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shortwaved"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ3}
            onPress={() => onPressImageHair("square", 17)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} hair={"square"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBeardImages = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonZ}
            onPress={() => onPressImageBeard("light", 3)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} beard={"light"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ2}
            onPress={() => onPressImageBeard("majestic", 2)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} beard={"majestic"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonZ3}
            onPress={() => onPressImageBeard("medium", 1)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} beard={"medium"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageBeard("mustache", 5)}
          >
            <MyAvatar size={90} colorSkin={avatarColor} beard={"mustache"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageBeard("mustachemagnum", 4)}
          >
            <MyAvatar
              size={90}
              colorSkin={avatarColor}
              beard={"mustachemagnum"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMouthImages = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageMouth("default", 4)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"default"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageMouth("desbelief", 3)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"desbelief"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageMouth("eating", 2)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"eating"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageMouth("grimace", 1)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"grimace"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageMouth("open", 8)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"open"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageMouth("sad", 7)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"sad"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageMouth("scream", 6)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"scream"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageMouth("serious", 5)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"serious"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row3}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageMouth("smile", 12)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"smile"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageMouth("tongue", 11)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"tongue"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageMouth("twinkle", 10)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"twinkle"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageMouth("vomit", 9)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} mouth={"vomit"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEyebrowImages = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageEyebrow("angry", 4)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"angry"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageEyebrow("exited", 3)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"exited"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageEyebrow("flat", 2)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"flat"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageEyebrow("natural", 1)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"natural"} />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressImageEyebrow("sad", 8)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"sad"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => onPressImageEyebrow("sad2", 7)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"sad2"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => onPressImageEyebrow("unibrow", 6)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"unibrow"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button4}
            onPress={() => onPressImageEyebrow("updown", 5)}
          >
            <MyAvatar size={70} colorSkin={avatarColor} eyebrow={"updown"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // const renderHatImages = () => {
  //   return (
  //     <View style={styles.imagesContainer}>
  //     <View style={styles.row}>
  //       <TouchableOpacity style={styles.buttonZ} onPress={() => onPressImageHat("fedora",1)}>
  //         <MyAvatar size={90} colorSkin={avatarColor} hat={"fedora"}/>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.buttonZ2} onPress={() => onPressImageHat("hijab",2)}>
  //         <MyAvatar size={90} colorSkin={avatarColor} hat={"hijab"}/>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.buttonZ3} onPress={() => onPressImageHat("turban",3)}>
  //         <MyAvatar size={90} colorSkin={avatarColor} hat={"turban"}/>
  //       </TouchableOpacity>
  //     </View>
  //     <View style={styles.row2}>
  //       <TouchableOpacity style={styles.buttonZ} onPress={() => onPressImageHat("winter",4)}>
  //         <MyAvatar size={90} colorSkin={avatarColor} hat={"winter"}/>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.buttonZ2} onPress={() => onPressImageHat("winter2",5)}>
  //         <MyAvatar size={90} colorSkin={avatarColor} hat={"winter2"}/>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.buttonZ3} onPress={() => onPressImageHat("wintercraft",6)}>
  //         <MyAvatar size={90} colorSkin={avatarColor} hat={"wintercraft"}/>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  //   );
  // };

  const chooseColor = () => {
    const colors = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#8A2BE2",
      "#32CD32",
      "#4682B4",
      "#FF69B4",
      "#7FFF00", // Additional colors
      "#FF6347",
      "#00CED1",
      "#FFA07A",
      "#9400D3",
      "#ADFF2F", // More colors
      "#40E0D0",
      "#8B008B",
      "#FF4500",
      "#1E90FF",
      "#00FF7F", // Even more colors
    ];

    // Calculate the number of buttons per row
    const buttonsPerRow = 5;
    const rows = Math.ceil(colors.length / buttonsPerRow);

    return (
      <View style={styles.colorContainer}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {colors
              .slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow)
              .map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorBox, { backgroundColor: color }]}
                  onPress={() => setClothColor(color)}
                />
              ))}
          </View>
        ))}
      </View>
    );
  };
  // const chooseColorHat = () => {
  //   const colors = [
  //     '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
  //     '#8A2BE2', '#32CD32', '#4682B4', '#FF69B4', '#7FFF00', // Additional colors
  //     '#FF6347', '#00CED1', '#FFA07A', '#9400D3', '#ADFF2F', // More colors
  //     '#40E0D0', '#8B008B', '#FF4500', '#1E90FF', '#00FF7F', // Even more colors
  //   ];

  //   // Calculate the number of buttons per row
  //   const buttonsPerRow = 5;
  //   const rows = Math.ceil(colors.length / buttonsPerRow);

  //   return (
  //     <View style={styles.colorContainer}>
  //       {[...Array(rows)].map((_, rowIndex) => (
  //         <View key={rowIndex} style={styles.row}>
  //           {colors.slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow).map((color, index) => (
  //             <TouchableOpacity
  //               key={index}
  //               style={[styles.colorBox, { backgroundColor: color }]}
  //               onPress={() => setHatColor(color)}
  //             />
  //           ))}
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };
  const chooseColorEye = () => {
    const colors = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#8A2BE2",
      "#32CD32",
      "#4682B4",
      "#FF69B4",
      "#7FFF00", // Additional colors
      "#FF6347",
      "#00CED1",
      "#FFA07A",
      "#9400D3",
      "#ADFF2F", // More colors
      "#40E0D0",
      "#8B008B",
      "#FF4500",
      "#1E90FF",
      "#00FF7F", // Even more colors
    ];

    // Calculate the number of buttons per row
    const buttonsPerRow = 5;
    const rows = Math.ceil(colors.length / buttonsPerRow);

    return (
      <View style={styles.colorContainer}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {colors
              .slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow)
              .map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorBox, { backgroundColor: color }]}
                  onPress={() => setEyeColor(color)}
                />
              ))}
          </View>
        ))}
      </View>
    );
  };

  const chooseColorHair = () => {
    const colors = [
      "#F5D0A9",
      "#E0AC69",
      "#C68642",
      "#A0522D",
      "#8B4513",
      "#6F4E37",
      "#DEB887",
      "#D2B48C",
      "#CD853F",
      "#8B5A2B",
      "#FFDAB9",
      "#F4A460",
      "#FFA07A",
      "#FA8072",
      "#FF6347",
      "#FF4500",
      "#FF7F50",
      "#FF8C00",
      "#D2691E",
      "#8B0000",
    ];

    // Calculate the number of buttons per row
    const buttonsPerRow = 5;
    const rows = Math.ceil(colors.length / buttonsPerRow);

    return (
      <View style={styles.colorContainer}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {colors
              .slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow)
              .map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorBox, { backgroundColor: color }]}
                  onPress={() => setHairColor(color)}
                />
              ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créez votre Avatar !</Text>
      <View style={styles.avatarContainer}>
        <MyAvatar
          size={190}
          colorSkin={avatarColor}
          eyes={selectedGlasses}
          clothTop={selectedCloth}
          colorClothingTop={clothColor}
          hair={selectedHair}
          colorHair={HairColor}
          colorEye={EyeColor}
          beard={selectedBeard}
          mouth={selectedMouth}
          eyebrow={selectedEyebrow}
          hat={selectedHat}
          colorHat={HatColor}
        />
      </View>
      {!continuePressed && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderGlassesImages()}</View>
        </View>
      )}
      {continuePressed == 1 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderEyebrowImages()}</View>
        </View>
      )}
      {/* {continuePressed == 1 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{chooseColorEye()}</View>
        </View>
      )} */}
      {continuePressed == 2 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderClothImages()}</View>
        </View>
      )}
      {continuePressed == 3 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{chooseColor()}</View>
        </View>
      )}
      {continuePressed == 4 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderHairImages()}</View>
        </View>
      )}
      {continuePressed == 5 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderHairImages2()}</View>
        </View>
      )}
      {continuePressed == 6 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{chooseColorHair()}</View>
        </View>
      )}
      {continuePressed == 7 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderMouthImages()}</View>
        </View>
      )}
      {continuePressed == 8 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderBeardImages()}</View>
        </View>
      )}
      {/* {continuePressed == 9 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{renderHatImages()}</View>
        </View>
      )}
      {continuePressed == 10 && (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>{chooseColorHat()}</View>
        </View>
      )} */}
      {continuePressed == 9 && (
        <TouchableOpacity style={styles.bigButton} onPress={onPressFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bigButton} onPress={onPressBack}>
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        {continuePressed !== 9 && (
          <TouchableOpacity style={styles.bigButton} onPress={onPressContinue}>
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efefef",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  colorContainer: {
    flexDirection: "row",
    // marginTop: 20,
    marginBottom: -300,
  },
  lockedButton: {
    opacity: 0.1,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  lockText: {
    fontSize: 24,
    color: 'white',
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  title: {
    marginTop: screenHeight / 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatarContainer: {
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
  imagesContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  row: {
    top: -180,
    marginTop: 180,
  },
  row2: {
    top: -60,
  },
  row3: {
    top: 70,
  },
  button: {
    right: -105,
  },
  button2: {
    right: -5,
  },
  button3: {
    right: 95,
  },
  button4: {
    right: 195,
  },
  buttonZ: {
    right: -50,
  },
  buttonZ2: {
    right: 45,
  },
  buttonZ3: {
    right: 140,
  },
  bigImage: {
    marginHorizontal: 10,
  },
  lockedImage: {
    opacity: 0.1,
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
  buttonContainer: {
    flexDirection: "row", // This will make the buttons display side by side
    justifyContent: "space-between", // Adjust this according to your layout preference
    alignItems: "center", // Align items vertically if needed
    // You may need to adjust other styles like margin, padding, etc. based on your layout requirements
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default avatareyes;
