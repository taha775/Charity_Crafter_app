import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StaticData from './StaticData';

const Post = () => {

  const [posts, setPosts] = useState([]);
  const user = AsyncStorage.getItem("uid")
  console.log(user, "user");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Reference to the 'adminposts' collection
        const adminPostsRef = firestore().collection('adminpost');

        // Fetch posts
        const querySnapshot = await adminPostsRef.get();

        // Extract data from querySnapshot and update state
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);

        console.log('Fetched Posts:', fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts



  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'black', fontSize: 20, fontFamily: 'serif', backgroundColor: "#002561", color: "white", padding: 12, textAlign: 'center', borderRadius: 5 }}>Donate or Share the meal</Text>


      <StaticData/>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uploadImage }} style={styles.image} />
              <Title style={styles.title}>{item.title}</Title>
            </View>
            <Card.Content>
              <Paragraph>{item.description}</Paragraph>
              <Text style={styles.amountButton}>Amount Needed: {item.amountNeed}</Text>
              <TouchableOpacity style={styles.amountButton}>
                <Text style={styles.buttonText}>Donate Now</Text>
              </TouchableOpacity>
              {/* Add more fields as needed */}
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default Post
const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  amountButton: {
    color: '#002561',
    backgroundColor: '#002561', // Specify your desired button color
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 2,
    margin: 10,
  },
  cardContainer: {
    width: 150, // Adjust the width as needed
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100, // Adjust the height as needed
    borderRadius: 10,
  },
  cardTitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  amountButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    color:"#002561",
    textAlign:"center",
    fontSize:15,
    fontWeight:"bold"
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    color:"#002561"
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});