import React from 'react';
import { View, FlatList, Image, StyleSheet} from 'react-native';

const ImagesHistory = () => {
  const images = [
    { id: '1', src: 'https://via.placeholder.com/150' },
    { id: '2', src: 'https://via.placeholder.com/150' },
  ];

  return (
    <View style={styles.container}>
    <FlatList
    data={images}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <Image source={{ uri: item.src }} style={styles.imageCard} />
    )}
    numColumns={2}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor : '#f5f5f5', padding: 10 },
  imageCard: { width: '45%', height: 100, margin: 5}
});

export default ImagesHistory;