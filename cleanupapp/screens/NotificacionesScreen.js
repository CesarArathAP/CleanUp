import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function NotificacionesScreen() {
  // Lista de notificaciones
  const [notifications, setNotifications] = useState([
    { id: '1', text: 'Usuario 1 solicitó unirse a tu grupo', accepted: false },
    { id: '2', text: 'Usuario 2 solicitó unirse a tu grupo', accepted: false },
  ]);

  // Función para aceptar un miembro
  const acceptMember = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.notificationText}>{item.text}</Text>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => acceptMember(item.id)}
              >
                <Text style={styles.acceptButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes nuevas solicitudes</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  notificationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationText: { fontSize: 16, flex: 1 },
  acceptButton: {
    backgroundColor: '#E8B86D',
    padding: 8,
    borderRadius: 5,
  },
  acceptButtonText: { color: '#fff', fontSize: 14 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
});
