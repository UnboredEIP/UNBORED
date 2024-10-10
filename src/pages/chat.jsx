import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UbService } from "../services/UbServices";
import { AvatarCard } from "../components/AvatarCard";
import moment from 'moment';

import MyAvatar from "../components/Avatar";
const listHair = [
  "null",
  "calvitie",
  "buzzcut",
  "big",
  "afro",
  "frizzy",
  "curvy",
  "curlyshort",
  "curly",
  "mediumdreads",
  "medium",
  "longstraight",
  "longdreads",
  "shaggymullet",
  "shaggy",
  "minidreads",
  "mediumlong",
  "square",
  "shortwaved",
  "shortflat",
];

const listMouth = [
  "null",
  "grimace",
  "eating",
  "desbelief",
  "default",
  "serious",
  "scream",
  "sad",
  "open",
  "vomit",
  "twinkle",
  "tongue",
  "smile",
];

const listTop = [
  "null",
  "hoodie",
  "crewneck",
  "blazer",
  "shirt",
  "scoopneck",
  "polo",
  "vneck",
  "overall",
];

const listEyebrow = [
  "null",
  "natural",
  "flat",
  "exited",
  "angry",
  "updown",
  "unibrow",
  "sad2",
  "sad",
];

const listBeard = [
  "null",
  "medium",
  "majestic",
  "light",
  "mustachemagnum",
  "mustache",
];

const listEyes = [
  "null",
  "dizzy",
  "default",
  "cry",
  "closed",
  "side",
  "heart",
  "happy",
  "eyeroll",
  "wink",
  "wacky",
  "surprised",
  "squint",
  "angry",
  "updown",
  "unibrow",
  "sad2",
  "sad",
];
const handleProfileFetch = async () => {
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
    console.log("Profile Data:", profileData);
    return profileData;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

const getUserById = async () => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    const response = await fetch(
      `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/get?id=${global.idchat}`,
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
    const responseData = await response.json();
    if (!responseData.user) throw new Error(`User null: ${response.status}`);
    return responseData.user;
  } catch (error) {
    console.error("Error when try to get user:", error);
  }
};
// Fonction pour récupérer les messages
const handleMessagesFetch = async (userId) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");

    const response = await fetch(
      `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/chat/conversation?id1=${userId}&id2=${global.idchat}`,
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

    const messagesData = await response.json();
    console.log("Messages Data:", messagesData); // Affiche toutes les données des messages
    return messagesData; // Retourne les données des messages
  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
};


const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Liste des messages
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [selectedHair, setSelectedHair] = useState("");
  const [selectedBeard, setSelectedBeard] = useState("");
  const [selectedMouth, setSelectedMouth] = useState("");
  const [selectedEyebrow, setSelectedEyebrow] = useState("");
  const [avatarColor, setAvatarColor] = useState("#FFFFFF");
  const [clothColor, setClothColor] = useState("");
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [friend, setFriend] = useState(null); // Correct usage of useState

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await handleProfileFetch();
      if (profile) {
        setUserId(profile.user._id); // Récupère l'ID utilisateur
        setFriend(await getUserById()); // Met à jour l'ami (friend) avec le profil utilisateur récupéré
      }
    };
    fetchProfile();
  }, []); // Appel une fois, lorsque le composant est monté

  useEffect(() => {
    if (friend) {
      setUsername(friend.username);
      setAvatarColor(friend.style.head.color);
      setSelectedBeard(friend.style.beard.id);
      setSelectedEyebrow(friend.style.eyebrows.id);
      setSelectedCloth(friend.style.accessory.id);
      setSelectedGlasses(friend.style.eyes.id);
      setSelectedHair(friend.style.hair.id);
      setSelectedMouth(friend.style.mouth.id);
      setClothColor(friend.style.accessory.color);
    }
  }, [friend]); // Appel à chaque mise à jour de friend

  useEffect(() => {
    if (userId) {
      const interval = setInterval(async () => {
        const messagesData = await handleMessagesFetch(userId);
        if (messagesData) {
          setMessages(messagesData); // Met à jour la liste des messages
        }
      }, 5000); // Répète toutes les 5000ms (5 secondes)

      // Nettoyage de l'intervalle lors du démontage du composant
      return () => clearInterval(interval);
    }
  }, [userId]); // Appel une fois que userId est mis à jour

  // Récupération des messages une fois que l'ID utilisateur est défini
  useEffect(() => {
    if (userId) {
      const fetchMessages = async () => {
        const messagesData = await handleMessagesFetch(userId);
        if (messagesData) {
          setMessages(messagesData); // Met à jour la liste des messages
        }
      };
      fetchMessages();
    }
  }, [userId]); // Appel une fois que userId est mis à jour

  const renderDateBar = (currentDate, previousDate) => {
    if (!previousDate || moment(currentDate).isAfter(previousDate, 'day')) {
      return (
        <View style={styles.dateBar}>
          <Text style={styles.dateBarText}>{moment(currentDate).format('DD/MM')}</Text>
        </View>
      );
    }
    return null;
  };
  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (message.trim().length > 0) {
      try {
        if (!userId || !global.idchat) {
          console.error("userId or global.idchat is missing");
          return;
        }

        const url = `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/chat/message`;
        const authToken = await AsyncStorage.getItem("authToken");

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            content: message,
            receiverId: global.idchat,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Message envoyé:", responseData);

        // Ajoute le message dans l'interface
        setMessages((prevMessages) => [
          ...prevMessages,
          responseData,
        ]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>
      <MyAvatar
                  size={60}
                  colorSkin={avatarColor}
                  eyes={listEyes[selectedGlasses]}
                  clothTop={listTop[selectedCloth]}
                  colorClothingTop={clothColor}
                  hair={listHair[selectedHair]}
                  colorHair={"black"}
                  colorEye={"black"}
                  beard={listBeard[selectedBeard]}
                  mouth={listMouth[selectedMouth]}
                  eyebrow={listEyebrow[selectedEyebrow]}
                />
                </View>
        <Text style = {styles.username}>{username}</Text>
        </View>
        <ScrollView
        style={[styles.chatContainer]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {messages.map((msg, index) => {
          const previousMsg = messages[index - 1];
          const previousDate = previousMsg ? moment(previousMsg.createdAt) : null;

          return (
            <View key={msg._id}>
              {renderDateBar(msg.createdAt, previousDate)}
              <View
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: msg.senderId === userId ? '#007AFF' : '#E5E5EA',
                    alignSelf: msg.senderId === userId ? 'flex-end' : 'flex-start',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    {
                      color: msg.senderId === userId ? '#fff' : '#000',
                    },
                  ]}
                >
                  {msg.content}
                </Text>
                <Text style={styles.messageTime}>
                  {moment(msg.createdAt).format('HH:mm')}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Écrire un message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  username: {
    fontSize:20,
    top:60,
    color:"#000",
    borderWidth:3,
    backgroundColor:"#f2f2f2",
    borderColor:"#E1604D",
    borderRadius:20,
    padding:10
  },
  dateBar: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateBarText: {
    fontSize: 14,
    color: '#888',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
    color: '#E1604D',
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header:{
    zIndex:1000,
    alignItems:"center",
    top:50,
  },
  header2:{
    right:30,
    marginBottom:20,
  },
  chatContainer: {
    paddingHorizontal: 10,
    paddingTop: 100,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#e1604D",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Chat;
