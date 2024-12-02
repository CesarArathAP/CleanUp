import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const RouteHistory = () => {
  const routes = [
    { id: '1', name: 'Ruta 1', date: '2024-11-20', time: '35 mins', points: 50 },
    { id: '2', name: 'Ruta 2', date: '2024-11-22', time: '50 mins', points: 80 },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.routeCard}>
            <Text style={styles.routeName}>{item.name}</Text>
            <Text style={styles.routeDetails}>Fecha: {item.date}</Text>
            <Text style={styles.routeDetails}>Duración: {item.time}</Text>
            <Text style={styles.routeDetails}>Puntos: {item.points}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  routeCard: { backgroundColor: '#ffffff', padding: 15, marginVertical: 5, borderRadius: 5 },
  routeName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  routeDetails: { fontSize: 14, color: '#555' },
});

export default RouteHistory;
