import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const GroupsHistory = () => {
  const groups = [
    { id: '1', name: 'Grupo 1', description: 'Descripción del grupo 1' },
    { id: '2', name: 'Grupo 2', description: 'Descripción del grupo 2' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupCard}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity style={styles.leaveButton}>
              <Text style={styles.leaveText}>Salir del grupo</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  groupCard: { backgroundColor: '#ffffff', padding: 15, marginVertical: 5, borderRadius: 5 },
  groupName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  leaveButton: { marginTop: 10, padding: 10, backgroundColor: '#E8B86D', borderRadius: 5 },
  leaveText: { color: '#ffffff', textAlign: 'center', fontSize: 14 },
});

export default GroupsHistory;
