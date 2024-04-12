import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyAvatar from "../components/Avatar";
const avatareyes = ({ navigation }) => {
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [continuePressed, setContinuePressed] = useState(0);
  const [avatarColor, setAvatarColor] = useState("#FFFFFF");
  const [clothColor, setClothColor] = useState("");
  const [HairColor, setHairColor] = useState("");
  const [EyeColor, setEyeColor] = useState("");
  const [selectedHair, setSelectedHair] = useState("");
  const [reward, setReward] = useState(null);

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
    console.log("CACAAAAAAA:",profileData.user.style.head.color)
      setAvatarColor(profileData.user.style.head.color);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const onPressImage = (eyes) => {
    setSelectedGlasses(eyes);
  };
  const onPressImageHair = (hair) => {
    setSelectedHair(hair);
  };
  const onPressImageCloth = (cloth) => {
    setSelectedCloth(cloth);
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
      return (
        <View style={styles.imagesContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => onPressImage("closed")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"closed"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => onPressImage("cry")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"cry"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={() => onPressImage("default")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"default"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button4} onPress={() => onPressImage("dizzy")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"dizzy"}/>
            </TouchableOpacity>
          </View>
          <View style={styles.row2}>
            <TouchableOpacity style={styles.button} onPress={() => onPressImage("eyeroll")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"eyeroll"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => onPressImage("happy")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"happy"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={() => onPressImage("heart")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"heart"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button4} onPress={() => onPressImage("side")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"side"}/>
            </TouchableOpacity>
          </View>
          <View style={styles.row3}>
            <TouchableOpacity style={styles.button} onPress={() => onPressImage("squint")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"squint"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => onPressImage("surprised")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"surprised"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={() => onPressImage("wacky")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"wacky"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button4} onPress={() => onPressImage("wink")}>
              <MyAvatar size={90} colorSkin={avatarColor} eyes={"wink"}/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };
  
  

  const chooseColor = () => {
    const colors = [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
      '#8A2BE2', '#32CD32', '#4682B4', '#FF69B4', '#7FFF00', // Additional colors
      '#FF6347', '#00CED1', '#FFA07A', '#9400D3', '#ADFF2F', // More colors
      '#40E0D0', '#8B008B', '#FF4500', '#1E90FF', '#00FF7F', // Even more colors
    ];
    
    // Calculate the number of buttons per row
    const buttonsPerRow = 5;
    const rows = Math.ceil(colors.length / buttonsPerRow);
  
    return (
      <View style={styles.colorContainer}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {colors.slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow).map((color, index) => (
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

  const chooseColorEye = () => {
    const colors = [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
      '#8A2BE2', '#32CD32', '#4682B4', '#FF69B4', '#7FFF00', // Additional colors
      '#FF6347', '#00CED1', '#FFA07A', '#9400D3', '#ADFF2F', // More colors
      '#40E0D0', '#8B008B', '#FF4500', '#1E90FF', '#00FF7F', // Even more colors
    ];
    
    // Calculate the number of buttons per row
    const buttonsPerRow = 5;
    const rows = Math.ceil(colors.length / buttonsPerRow);
  
    return (
      <View style={styles.colorContainer}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {colors.slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow).map((color, index) => (
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
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
      '#8A2BE2', '#32CD32', '#4682B4', '#FF69B4', '#7FFF00', // Additional colors
      '#FF6347', '#00CED1', '#FFA07A', '#9400D3', '#ADFF2F', // More colors
      '#40E0D0', '#8B008B', '#FF4500', '#1E90FF', '#00FF7F', // Even more colors
    ];
    
    // Calculate the number of buttons per row
    const buttonsPerRow = 5;
    const rows = Math.ceil(colors.length / buttonsPerRow);
  
    return (
      <View style={styles.colorContainer}>
        {[...Array(rows)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {colors.slice(rowIndex * buttonsPerRow, (rowIndex + 1) * buttonsPerRow).map((color, index) => (
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


  const renderClothImages = () => {
    return (
      <View style={styles.imagesContainer}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonZ} onPress={() => onPressImageCloth("blazer")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"blazer"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonZ2} onPress={() => onPressImageCloth("crewneck")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"crewneck"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonZ3} onPress={() => onPressImageCloth("hoodie")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"hoodie"}/>
        </TouchableOpacity>
      </View>
      <View style={styles.row2}>
        <TouchableOpacity style={styles.buttonZ} onPress={() => onPressImageCloth("polo")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"polo"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonZ2} onPress={() => onPressImageCloth("scoopneck")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"scoopneck"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonZ3} onPress={() => onPressImageCloth("shirt")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"shirt"}/>
        </TouchableOpacity>
      </View>
      <View style={styles.row3}>
      <TouchableOpacity style={styles.button2} onPress={() => onPressImageCloth("overall")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"overall"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3} onPress={() => onPressImageCloth("vneck")}>
          <MyAvatar size={90} colorSkin={avatarColor} clothTop={"vneck"}/>
        </TouchableOpacity>
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
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => onPressImageHair("afro")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"afro"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => onPressImageHair("big")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"big"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3} onPress={() => onPressImageHair("buzzcut")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"buzzcut"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button4} onPress={() => onPressImageHair("calvitie")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"calvitie"}/>
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity style={styles.button} onPress={() => onPressImageHair("curly")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"curly"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => onPressImageHair("curlyshort")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"curlyshort"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3} onPress={() => onPressImageHair("curvy")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"curvy"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button4} onPress={() => onPressImageHair("frizzy")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"frizzy"}/>
          </TouchableOpacity>
        </View>
        <View style={styles.row3}>
          <TouchableOpacity style={styles.button} onPress={() => onPressImageHair("longdreads")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"longdreads"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => onPressImageHair("longstraight")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"longstraight"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3} onPress={() => onPressImageHair("medium")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"medium"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button4} onPress={() => onPressImageHair("mediumdreads")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"mediumdreads"}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderHairImages2 = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => onPressImageHair("mediumlong")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"mediumlong"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => onPressImageHair("minidreads")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"minidreads"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3} onPress={() => onPressImageHair("shaggy")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shaggy"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button4} onPress={() => onPressImageHair("shaggymullet")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shaggymullet"}/>
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity style={styles.buttonZ} onPress={() => onPressImageHair("shortflat")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shortflat"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonZ2} onPress={() => onPressImageHair("shortwaved")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"shortwaved"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonZ3} onPress={() => onPressImageHair("square")}>
            <MyAvatar size={70} colorSkin={avatarColor} hair={"square"}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créez votre Avatar !</Text>
      <View style={styles.avatarContainer}>
      <MyAvatar size={190} colorSkin={avatarColor} eyes={selectedGlasses} clothTop={selectedCloth} colorClothingTop={clothColor} hair={selectedHair} colorHair={HairColor} colorEye={EyeColor}/>
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
          <View style={styles.row}>{chooseColorEye()}</View>
        </View>
      )}
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
  colorContainer: {
    flexDirection: 'row',
    // marginTop: 20,
    marginBottom:-300,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  title: {
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
    top:-180,
    marginTop:180,
  },
  row2:{
    top:-60
  },
  row3:{
    top:70
  },
  button: {
    right:-105,
  },
  button2: {
    right:-5,
  },
  button3: {
    right:95,
  },
  button4: {
    right:195,
  },
  buttonZ: {
    right:-50
  },
  buttonZ2: {
    right:45
  },
  buttonZ3: {
    right:140
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
