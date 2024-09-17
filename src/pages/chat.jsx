import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Navbar from "../components/NavigationBar";

const Chat = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Salut, comment ça va ?" },
    { id: 2, text: "Bien, et toi ?" },
  ]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      setMessages([...messages, { id: messages.length + 1, text: message }]);
      setMessage("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.chatContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {messages.map((msg) => (
              <View key={msg.id} style={styles.messageBubble}>
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>

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
          <Navbar navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    alignSelf: "flex-start",
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
