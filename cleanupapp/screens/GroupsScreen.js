import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function GroupsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [groups, setGroups] = useState([
    { id: '1', name: 'EcoWarriors', description: 'Limpieza de playas', isPublic: true },
    { id: '2', name: 'Green Team', description: 'Reforestación urbana', isPublic: false },
    { id: '3', name: 'River Cleaners', description: 'Limpieza de ríos', isPublic: true },
  ]);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoinGroup = (group) => {
    if (group.isPublic) {
      alert(`Te has unido al grupo: ${group.name}`);
      navigation.navigate('GroupChat', { groupName: group.name }); // Navegar al chat
    } else {
      alert(`Has solicitado unirte al grupo: ${group.name}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar grupos..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('NewGroup')}
      >
        <Text style={styles.createButtonText}>+ Crear Grupo</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => handleJoinGroup(item)}
            >
              <Text style={styles.joinButtonText}>
                {item.isPublic ? 'Unirse' : 'Solicitar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noGroupsText}>No hay grupos disponibles</Text>}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#E8B86D',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  groupInfo: { flex: 1, marginRight: 10 },
  groupName: { fontSize: 18, fontWeight: 'bold' },
  groupDescription: { fontSize: 14, color: '#666' },
  joinButton: {
    backgroundColor: '#A1D6B2',
    padding: 10,
    borderRadius: 8,
  },
  joinButtonText: { color: '#fff', fontSize: 16 },
  noGroupsText: { textAlign: 'center', fontSize: 16, color: '#888', marginTop: 20 },
});
