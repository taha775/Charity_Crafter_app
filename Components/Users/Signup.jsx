import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';



import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Loader from '../../Common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // its a loader

  const [gender, setGender] = useState(''); // Updated state for gender
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');

  const signUpWithEmailAndPassword = async () => {
    try {
      if (!email || !password || !username || !gender) {
        Snackbar.show({
          text: 'Please fill in all fields',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#002561',
          textColor: 'white',
        });
      } else {
        setModalVisible(!modalVisible);
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        await firestore().collection('users').doc(user.uid).set({
          username,
          email,
          gender,
          location,
          mobile,
        });

        await Snackbar.show({
          text: 'Sign-up successful',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#002561',
          textColor: 'white',
        });
        await AsyncStorage.setItem('username', username);

        setModalVisible(modalVisible);
        navigation.navigate('login');
      }
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Sign-up failed. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#002561',
        textColor: 'white',
      });
    }
  };

  const gotoLogin = () => {
    navigation.navigate('login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../Assests/signuplogo.png')} style={styles.logo} />
      </View>
      <Text style={styles.heading}>Create Your Account</Text>
      <Text style={styles.subHeading}>Be a part of charity crafter</Text>

      <TextInput
        label="Enter Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Enter Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        keyboardType={'number-pad'}
        label="Your Mobile"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        mode="outlined"
        style={styles.input}
      />
      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton value="male" status={gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setGender('male')} />
          <Text style={styles.genderText}>Male</Text>
          <RadioButton
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
          />
          <Text style={styles.genderText}>Female</Text>
        </View>
      </View>

      <TouchableOpacity onPress={signUpWithEmailAndPassword} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account{' '}
        <TouchableOpacity onPress={gotoLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </Text>

      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 100,
  },
  heading: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'serif',
    textAlign: 'center',
    marginTop: 20,
  },
  subHeading: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    width: 350,
    color: '#002561',
    marginLeft: 20,
    borderColor: '#002561',
    borderRadius: 10,
    paddingLeft: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  genderLabel: {
    color: 'black',
    fontSize: 15,
    marginRight: 18,
    fontFamily: 'serif',
    marginTop: 0,
    textAlign: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderText: {
    color: 'black',
  },
  signupButton: {
    backgroundColor: '#002561',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    height: 50,
    borderRadius: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    padding:10,
    width:150,
    textAlign:'center'
  },
  loginText: {
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
  loginLink: {
    color: '#002561',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
