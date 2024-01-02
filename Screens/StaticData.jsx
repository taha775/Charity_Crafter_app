import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,FlatList} from 'react-native';

const StaticData = () => {
  const data = [
    {
      id: '1',
      title: 'Give Emergency aid in Palestine',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBLQIGUlygF4J4rkbb_P4-mTgw__SBJoaj_w&usqp=CAU',
    },
    {
      id: '2',
      title: 'Flood victims lost their homes',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQANjcVpnAJDHQu_7vFV1lVCfmc9UIULiE9eg&usqp=CAU',
    },
    {
      id: '3',
      title: 'Homeless people have no place, help them',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarq68vnuEzdzrMEWBrxaZiOhlxHpQJn-u8Q&usqp=CAU',
    },
    {
        id: '4',
        title: 'medicle treatement free medicine providing',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTG3E6DS-XEIdLx1uJ47wsrPo9qqCwd-bQQ&usqp=CAU',
      },
      {
        id: '5',
        title: 'Homeless people have no place, help them',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarq68vnuEzdzrMEWBrxaZiOhlxHpQJn-u8Q&usqp=CAU',
      },
    // Add more cards as needed
  ];

  const renderCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Donate Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cardContainer: {
    width: 170,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 6,
    backgroundColor: 'orange',
    marginTop:2

  },
  cardImage: {
    marginTop: 10,
    width: '100%',
    height: 80,
    borderRadius: 10,
    borderColor:"white"
  },
  cardTitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 13,
    color: 'white',
    fontFamily: 'serif',
  },
  buttonContainer: {
    backgroundColor: '#002561',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default StaticData;
