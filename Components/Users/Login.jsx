
import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import Snackbar from "react-native-snackbar";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Common/Loader';

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // It's a loader

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithEmailAndPassword = async () => {
    try {
      if (!email || !password) {
        Snackbar.show({
          text: 'Please fill in all fields',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#002561',
          textColor: 'white',
        });
      } else {
        setModalVisible(!modalVisible);
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Check if user exists in Firestore
        const userRef = firestore().collection('users').doc(user.uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          console.log('User exists in Firestore. Login Successful.');
          Snackbar.show({
            text: 'Login Successful',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#002561',
            textColor: 'white',
          });

          await AsyncStorage.setItem('uid', user.uid);
          setModalVisible(modalVisible);
          navigation.navigate('home');
        } else {
          console.log('User not found in Firestore. Login failed.');
          Snackbar.show({
            text: 'Login failed. User not found.',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#002561',
            textColor: 'white',
          });
        }
      }
    } catch (error) {
      console.error(error, 'a');
      Snackbar.show({
        text: 'Login failed. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#002561',
        textColor: 'white',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../Assests/signuplogo.png')} style={styles.logo} />
      </View>
      <Text style={styles.text}>Login to your Account</Text>
      <TextInput label="Email" value={email} onChangeText={(text) => setEmail(text)} mode="outlined" style={styles.input} />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={loginWithEmailAndPassword} style={styles.loginButton}>
        Login
      </Button>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't Have An Account!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signupLink}>Signup</Text>
        </TouchableOpacity>
      </View>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  text: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    fontFamily:"serif",
    color:"#002561"
  },
  input: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#002561',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: 'black',
    marginTop:3,
    fontSize:25
  },
  signupLink: {
    color: '#002561',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});

export default Login;
