import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ConfiguracionPerfilScreen({ route, navigation }) {
  const { name: initialName, description: initialDescription } = route.params;
  const [name, setName] = useState(initialName || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [avatarUri, setAvatarUri] = useState('https://via.placeholder.com/150');

  const handleSave = () => {
    alert('Perfil actualizado');
    navigation.goBack();
  };

  const handleAvatarPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Selección de imagen cancelada');
        } else if (response.errorCode) {
          console.error('Error:', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setAvatarUri(uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Perfil</Text>
      <TouchableOpacity onPress={handleAvatarPress}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        onChangeText={setDescription}
        value={description}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#A1D6B2',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#A1D6B2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
