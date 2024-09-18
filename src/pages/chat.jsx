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

// Fonction pour récupérer le profil utilisateur
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

  // Récupération du profil utilisateur lors du premier rendu
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await handleProfileFetch();
      if (profile) {
        setUserId(profile.user._id); // Récupère l'ID utilisateur
      }
    };
    fetchProfile();
  }, []); // Appel une fois, lorsque le composant est monté

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
        <ScrollView
          style={[styles.chatContainer]}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {messages.map((msg) => (
            <View
              key={msg._id}
              style={[
                styles.messageBubble,
                {
                  backgroundColor:
                    msg.senderId === userId ? "#007AFF" : "#E5E5EA", // Couleur différente selon l'expéditeur
                  alignSelf:
                    msg.senderId === userId ? "flex-end" : "flex-start", // Alignement selon l'expéditeur
                },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  {
                    color: msg.senderId === userId ? "#fff" : "#000", // Couleur du texte
                  },
                ]}
              >
                {msg.content}
              </Text>
            </View>
          ))}
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
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  chatContainer: {
    paddingHorizontal: 10,
    paddingTop: 80,
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
    backgroundColor: "#007AFF",
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
