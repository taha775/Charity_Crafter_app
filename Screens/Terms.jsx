import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Terms = () => {
  const [termsData, setTermsData] = useState(null);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const termsRef = firestore().collection('terms');
        const termsSnapshot = await termsRef.get();

        const fetchedTermsData = termsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTermsData(fetchedTermsData);
        console.log('Fetched Terms Data:', fetchedTermsData);
      } catch (error) {
        console.error('Error fetching terms data:', error);
      }
    };

    fetchTermsData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Terms</Text>
      {termsData && (
        <View style={styles.termsInfo}>
          {termsData.map((termsItem) => (
            <Text key={termsItem.id} style={styles.termsItem}>
              {termsItem.content.split('\n').map((paragraph, index) => (
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
  termsInfo: {
    marginTop: 10,
  },
  termsItem: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

export default Terms;
