import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Privacy = () => {
  const [privacyData, setPrivacyData] = useState(null);

  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        const privacyRef = firestore().collection('privacyPolicies');
        const privacySnapshot = await privacyRef.get();

        const fetchedPrivacyData = privacySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPrivacyData(fetchedPrivacyData);
        console.log('Fetched Privacy Data:', fetchedPrivacyData);
      } catch (error) {
        console.error('Error fetching privacy data:', error);
      }
    };

    fetchPrivacyData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy</Text>
      {privacyData && (
        <View style={styles.privacyInfo}>
          {privacyData.map((privacyItem) => (
            <Text key={privacyItem.id} style={styles.privacyItem}>
              {privacyItem.name.split('\n').map((paragraph, index) => (
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
  privacyInfo: {
    marginTop: 10,
  },
  privacyItem: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

export default Privacy;
