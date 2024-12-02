import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import RouteHistory from './RouteHistory';
import ImagesHistory from './ImagesHistory';
import GroupsHistory from './GroupsHistory';

const UserProfile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('routes'); // Estado para la pestaña activa

  // Renderiza el contenido dinámico basado en la pestaña activa(Menu)
  const renderContent = () => {
    switch (activeTab) {
      case 'routes':
        return <RouteHistory />;
      case 'images':
        return <ImagesHistory />;
      case 'groups':
        return <GroupsHistory />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado del perfil */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Nombre del Usuario</Text>
        <Text style={styles.profileDescription}>Descripción breve</Text>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => navigation.navigate('ConfiguracionPerfil', {
            name: 'Nombre del Usuario',
            description: 'Descripcion breve'
          })}
        >
          <Ionicons name="pencil-outline" size={20} />
        </TouchableOpacity>
      </View>

      {/* Botón iniciar recorrido */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('RecorridoScreen')} >
        <Text style={styles.buttonText}>Iniciar recorrido</Text>
      </TouchableOpacity>


      {/* Menú de pestañas */}
      <View style={styles.tabMenu}>
        <TouchableOpacity onPress={() => setActiveTab('routes')}>
          <Text style={[styles.tabItem, activeTab === 'routes' && styles.activeTab]}>
            Mis Rutas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('images')}>
          <Text style={[styles.tabItem, activeTab === 'images' && styles.activeTab]}>
            Mis Imágenes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('groups')}>
          <Text style={[styles.tabItem, activeTab === 'groups' && styles.activeTab]}>
            Mis Grupos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido dinámico */}
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  profileHeader: { alignItems: 'center', padding: 20, backgroundColor: '#ffffff' },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profileName: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  profileDescription: { fontSize: 14, color: '#666' },
  startButton: { margin: 20, backgroundColor: '#CEDF9F', padding: 10, borderRadius: 5 },
  buttonText: { textAlign: 'center', color: '#fff', fontSize: 16 },
  tabMenu: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ffffff', paddingVertical: 10 },
  tabItem: { fontSize: 16, color: '#333' },
  activeTab: { fontWeight: 'bold', color: '#CEDF9F', borderBottomWidth: 2, borderBottomColor: '#CEDF9F' },
  content: { flex: 1, padding: 10 },
});

export default UserProfile;
