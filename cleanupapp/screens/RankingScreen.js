import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const RankingScreen = () => {
  // Datos de ejemplo
  const rankingData = [
    { id: '1', name: 'Usuario 1', points: 1200 },
    { id: '2', name: 'Usuario 2', points: 1100 },
    { id: '3', name: 'Usuario 3', points: 1050 },
    { id: '4', name: 'Usuario 4', points: 950 },
    { id: '5', name: 'Usuario 5', points: 900 },
  ];

  const renderItem = ({ item, index }) => {
    const isTop3 = index < 3;
    return (
      <View style={[styles.card, isTop3 && styles.top3Card]}>
        <Image source={{ uri: 'https://example.com/crown.png' }} style={styles.crown} />
        <Text style={[styles.rank, isTop3 && styles.top3Text]}>{index + 1}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.points}>{item.points} puntos</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rankingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  top3Card: {
    backgroundColor: '#E8B86D',
  },
  crown: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
  },
  top3Text: {
    color: 'white',
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  points: {
    fontSize: 14,
    color: '#555',
  },
});

export default RankingScreen;
