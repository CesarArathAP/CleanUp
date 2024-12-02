import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ConfiguracionPerfilScreen({ route, navigation }) {
  const { name: initialName, description: initialDescription } = route.params;
  const [name, setName] = useState(initialName || '');
  const [description, setDescription] = useState(initialDescription || '');

  const handleSave = () => {
    alert('Perfil actualizado');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Perfil</Text>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
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
    backgroundColor: '#f8f9fa'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' 
  },
  avatar: { 
    height: 150, 
    width: 150, 
    borderRadius: 75, 
    marginBottom: 20, 
    borderWidth: 2, 
    borderColor: '#A1D6B2' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    width: '100%', 
    borderRadius: 10, 
    backgroundColor: '#fff' 
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
    marginTop: 20
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
});
