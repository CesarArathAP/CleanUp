import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const samplePosts = [
  {
    id: "1",
    user: "Juan Pérez",
    description: "Recolectando basura en el parque central 🌱",
    image: "https://via.placeholder.com/150",
    likes: 12,
  },
  {
    id: "2",
    user: "Ana López",
    description: "¡Gran trabajo en equipo!",
    image: "https://via.placeholder.com/150",
    likes: 20,
  },
];

const FeedScreen = () => {
  const navigation = useNavigation(); //Hook para la navegacion

  // Función para renderizar publicaciones
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.user}>{item.user}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={20} color="red" />
          <Text style={styles.likes}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con la imagen del perfil */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile")} // Navega al perfil del usuario
        >
          <Image
            source={{
              uri: "https://via.placeholder.com/50", // URL de la imagen de perfil
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Espacio para el mapa */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>
          Aquí irá el mapa interactivo
        </Text>
      </View>

      {/* Feed de publicaciones */}
      <FlatList
        data={samplePosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
   header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "right",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Hace la imagen circular
  },
  mapPlaceholder: {
    width: "100%",
    height: "50%",
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: "#888",
  },
  feed: {
    padding: 10,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  user: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  description: {
    padding: 10,
    fontSize: 14,
    color: "#555",
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
});

export default FeedScreen;
