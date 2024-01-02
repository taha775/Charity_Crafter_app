import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import WebView from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';
import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const Video = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const adminPostsRef = firestore().collection('adminpost');
        const querySnapshot = await adminPostsRef.get();

        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(fetchedPosts);

        console.log('Fetched Posts:', fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Videos Updates</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.videoTitle}>{item.title}</Title>
              
              {/* Use react-native-webview to render YouTube videos */}
              <WebView
                style={styles.videoContainer}
                source={{ uri: `https://www.youtube.com/embed/${item.uploadVideo}` }}
              />
              {/* Add more fields as needed */}
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor:"#002561",
    color:"white",
    padding:10,
    textAlign:'center',
    borderRadius:15
  },
  card: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor:'orange'
  },
  videoTitle: {
    fontSize: 18,
    marginBottom: 10,
    color:"white",
    textAlign:'center',
    backgroundColor:"#002561",
    borderRadius:10,
    borderColor:"black"
  },
  videoContainer: {
    backgroundColor:"orange",
    padding:10,
    height: 200,
  },
});

export default Video;