import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function ChatScreen({ route }) {
  const { chatTitle, isGroup, messages = [] } = route.params || {};
  const [newMessage, setNewMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState(messages);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Simular el envío de un mensaje
    const newChatMessage = {
      id: String(chatMessages.length + 1),
      sender: "Tú",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      self: true,
    };
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.chatTitle}>{chatTitle || "Chat"}</Text>
        {isGroup && <TouchableOpacity><Text style={styles.manageMembers}>Gestionar Miembros</Text></TouchableOpacity>}
      </View>

      {/* Mensajes */}
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.self ? styles.messageBubbleSelf : styles.messageBubbleOther,
            ]}
          >
            {isGroup && !item.self && <Text style={styles.sender}>{item.sender}</Text>}
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Barra de entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 15,
    backgroundColor: "#A1D6B2",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  manageMembers: {
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
  },
  messagesContainer: {
    padding: 10,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    maxWidth: "75%",
  },
  messageBubbleSelf: {
    alignSelf: "flex-end",
    backgroundColor: "#A1D6B2",
  },
  messageBubbleOther: {
    alignSelf: "flex-start",
    backgroundColor: "#CEDF9F",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  messageText: {
    fontSize: 14,
    color: "#000",
  },
  time: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#A1D6B2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
