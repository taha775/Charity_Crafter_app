import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;

        if (user) {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          const userData = userDoc.data();
          setUserData(userData);
        } else {
          console.warn('No authenticated user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../Assests/signuplogo.png')}
          style={styles.iconImage}
        />
      </View>

      <View style={styles.profileContainer}>
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{userData.username}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>

            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{userData.gender}</Text>

            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{userData.location}</Text>

            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{userData.mobile}</Text>

            {/* Add more fields as needed */}
          </View>
        )}
      </View>
    </View>
  );
};

// ... (Previous code)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange', // Set the background color to orange
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  userInfo: {
    marginTop: 10,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#002561', // Set the label text color to #002561
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#002561', // Set the value text color to #002561
  },
});

// ... (Rest of the code)


export default Profile;
