import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function NewGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleCreateGroup = () => {
    if (groupName.trim() === '') {
      alert('Por favor, ingresa un nombre para el grupo.');
      return;
    }

    // Simular creación de grupo
    alert(`Grupo "${groupName}" creado exitosamente.`);
    navigation.navigate('ChatScreen', { groupName }); // Navegar al chat del nuevo grupo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del grupo"
        value={groupName}
        onChangeText={setGroupName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del grupo"
        value={groupDescription}
        onChangeText={setGroupDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
        <Text style={styles.buttonText}>Crear Grupo</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos (igual que antes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#CEDF9F',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});