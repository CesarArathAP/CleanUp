import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecorridoScreen({ navigation }) {
  const handleFinish = () => {
    navigation.navigate('Resumen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recorrido Activo</Text>
      <Text style={styles.info}>Tu recorrido está en progreso...</Text>
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finalizar Recorrido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 20 },
  button: { 
    backgroundColor: '#E8B86D', 
    padding: 10, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
