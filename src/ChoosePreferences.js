import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles2";

const ChoosePreferences = ({ navigation }) => {
  const [data, setData] = useState([
    {
      name: "Art",
      pr: 1,
      photo: "https://i.postimg.cc/d1RQyTb0/artwhite.png",
      photo2:
        "https://media1.giphy.com/media/RHK19LIfY81NbpnpjZ/giphy.gif?cid=6c09b952itomdphrvcuu1t899apyyjuwj4g7ta7rwik3wd8j&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s",
    },
    {
      name: "Musique",
      pr: 1,
      photo: "https://i.postimg.cc/15MtBTvr/musical-note.png",
      photo2:
        "https://media1.giphy.com/media/sUAyWJTEB1XJsOg0hs/200w.gif?cid=6c09b952q8s2yksrum2mizvlipw96j9fwd8m6sp1l3m4b6pb&ep=v1_gifs_search&rid=200w.gif&ct=s",
    },
    {
      name: "Sport",
      pr: 1,
      photo: "https://i.postimg.cc/g2FWvKWH/sports.png",
      photo2:
        "https://media1.giphy.com/media/TdRLRrC6z0601YYTf4/giphy.gif?cid=6c09b952udjgesnhes3c9c4dmq4uyfyjhooye1vysgltsjvv&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s",
    },
    {
      name: "Food",
      pr: 1,
      photo: "https://i.postimg.cc/2j1yGTPs/restaurant.png",
      photo2: "https://media1.giphy.com/media/qMntr6DEZ8E4o/giphy.gif",
    },
    {
      name: "Soirée",
      pr: 1,
      photo: "https://i.postimg.cc/vHRYzy7n/multiple-users-silhouette.png",
      photo2:
        "https://i.pinimg.com/originals/6e/7b/6b/6e7b6bc29c2f1cb94511a9d4697fe5fe.gif",
    },
    {
      name: "Technologie",
      pr: 1,
      photo: "https://i.postimg.cc/6QH6LGz6/smartphone.png",
      photo2:
        "https://media1.giphy.com/media/h1QmJxwoCr19BtTkGt/giphy.gif?cid=6c09b9522demlz98401uu4xrkvc39ovsxkiws9pi116ihq6a&ep=v1_gifs_search&rid=giphy.gif&ct=s",
    },
    {
      name: "Photographie",
      pr: 1,
      photo:
        "https://i.postimg.cc/nrbyvF8c/photo-camera-interface-symbol-for-button.png",
      photo2:
        "https://media3.giphy.com/media/xcFJX6T9z2iqiB9Ud9/giphy.gif?cid=6c09b952ag8kx7eu66j2uh1pmdanloxcntq9uv54u39bbmq2&ep=v1_gifs_search&rid=giphy.gif&ct=s",
    },
    {
      name: "Football",
      pr: 1,
      photo:
        "https://img.freepik.com/premium-vector/soccer-ball-flying-sketch-hand-drawn-sports-football-vector-illustration_666729-600.jpg",
      photo2: "https://i.postimg.cc/VLJwSZTr/giphy.gif",
    },
    {
      name: "Automoblie",
      pr: 1,
      photo: "https://i.postimg.cc/gjHT83qN/sedan.png",
      photo2: "https://i.gifer.com/4jwo.gif",
    },
    {
      name: "LoL",
      pr: 1,
      photo: "https://i.postimg.cc/8z50fJFm/game-control.png",
      photo2:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/15ba3c52-fae3-4469-b761-ff782a879bf8/dcsah9d-f016441e-99ae-4592-9954-0e6430587de7.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE1YmEzYzUyLWZhZTMtNDQ2OS1iNzYxLWZmNzgyYTg3OWJmOFwvZGNzYWg5ZC1mMDE2NDQxZS05OWFlLTQ1OTItOTk1NC0wZTY0MzA1ODdkZTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Ub2oK_D7tY7vK4yBv0ADbef5vq3SGDI1aL4lpclIuko",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [fadeInAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleProfileUpdate = async () => {
    const selectedPreferences = data.filter((item) => item.selected);

    try {
      const authToken = await AsyncStorage.getItem("authToken");

      const response = await fetch(
        "https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            preferences: selectedPreferences.map((item) => item.name),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigation.replace("Accueil3");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const renderModalContent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/logo2.gif")}
        style={{ width: 300, height: 300 }}
      />
      <Text>
        Félicitation, vous avez terminé la création de votre compte UnBored
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: "#E1604D",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
        onPress={() => navigation.replace("Accueil3")}
      >
        <Text style={{ color: "white" }}>Commencer l'aventure UnBored !</Text>
      </TouchableOpacity>
    </View>
  );

  const handlePreferenceSelection = (name, selected) => {
    const updatedData = data.map((item) =>
      item.name === name ? { ...item, selected } : item
    );

    setData(updatedData);
  };

  const renderItem = ({ item }) => (
    <Animated.View
      style={[
        {
          opacity: fadeInAnim,
          transform: [
            {
              translateY: fadeInAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
        },
        {
          flex: 1,
          alignItems: "center",
          margin: 10,
          paddingLeft: 120,
        },
      ]}
    >
      <Item item={item} onSelect={handlePreferenceSelection} />
    </Animated.View>
  );

  return (
    <View style={styles.container4}>
      <Text style={styles.headerText}>Selectionner vos intérêts</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        style={styles.flatList}
      />
      <TouchableOpacity
        style={{
          width: "80%",
          right: -31,
          borderRadius: 25,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: "#E1604D",
          borderColor: "#b3b3b3",
          borderWidth: 1,
        }}
        onPress={handleProfileUpdate}
      >
        <Text style={{ fontSize: 20 }}>Suivant</Text>
      </TouchableOpacity>
      <Modal visible={showModal} transparent={false}>
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const Item = ({ item, onSelect }) => {
  const [click, setClick] = useState(false);

  const togglePhoto = () => {
    setClick(!click);
    onSelect(item.name, !click);
  };

  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={togglePhoto}
        style={{
          paddingBottom: -100,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: "#F5F5F5",
          height: click ? 170 : 150,
          width: click ? 150 : 130,
          left: -60,
          backgroundColor: click ? "#E1604D" : "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: click ? item.photo2 : item.photo }}
          style={{ width: 100, height: 100, bottom: -10 }}
        />
        <Text
          style={{
            paddingBottom: -100,
            color: click ? "white" : "#E1604D",
            alignItems: "center",
            width: 100,
            bottom: -15,
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChoosePreferences;
