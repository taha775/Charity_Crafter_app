import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutRef = firestore().collection('about');
        const aboutSnapshot = await aboutRef.get();

        const fetchedAboutData = aboutSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAboutData(fetchedAboutData);
        console.log('Fetched About Data:', fetchedAboutData);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About</Text>
      {aboutData && (
        <View style={styles.aboutInfo}>
          {aboutData.map((aboutItem) => (
            <Text key={aboutItem.id} style={styles.aboutItem}>
              {aboutItem.content.split('\n').map((paragraph, index) => (
                <Text key={index}>
                  {paragraph}
                  {'\n\n'} {/* Add extra newline between paragraphs */}
                </Text>
              ))}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  aboutInfo: {
    marginTop: 10,
  },
  aboutItem: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

export default About;
