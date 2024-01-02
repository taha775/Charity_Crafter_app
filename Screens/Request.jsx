import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Request = () => {
  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('food');
  const [cnic, setCNIC] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [details, setDetails] = useState('');

  const options = ['food', 'education', 'money', 'medical'];

  const handleRequestSubmit = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
  
      if (!uid) {
        console.error('UID not available');
        return;
      }
  
      // Check if any required field is empty
      if (!username || !cnic || !contact || !gender || !details) {
        Alert.alert('Please fill in all required fields');
        return;
      }
  
      const donateCollectionRef = firestore().collection('requests');
      const donateId = donateCollectionRef.doc().id;
      const userDonateRef = donateCollectionRef.doc(donateId);
  
      await userDonateRef.set({
        uid,
        donateId,
        username,
        selectedOption,
        cnic,
        contact,
        gender,
        details,
      });
  
      Alert.alert('Data sent successfully');
  
      // Clear input fields after submission
      setUsername('');
      setSelectedOption('food');
      setCNIC('');
      setContact('');
      setGender('');
      setDetails('');
  
      console.log('Request submitted:', {
        uid,
        donateId,
        username,
        selectedOption,
        cnic,
        contact,
        gender,
        details,
      });
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Enter your username"
      />

      <Text style={styles.label}>Options:</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setSelectedOption(option)}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>CNIC:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCNIC(text)}
        value={cnic}
        placeholder="Enter your CNIC"
      />

      <Text style={styles.label}>Contact:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setContact(text)}
        value={contact}
        placeholder="Enter your contact number"
      />

      <Text style={styles.label}>Gender:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          onPress={() => setGender('Male')}
          style={[
            styles.genderButton,
            gender === 'Male' && styles.selectedGender,
          ]}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGender('Female')}
          style={[
            styles.genderButton,
            gender === 'Female' && styles.selectedGender,
          ]}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Details:</Text>
      <TextInput
        style={styles.detailsInput}
        onChangeText={(text) => setDetails(text)}
        value={details}
        placeholder="Enter additional details"
        multiline
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleRequestSubmit}
      >
        <Text style={styles.submitButtonText}>Request now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color: 'black',
    padding: 10,
    fontSize: 16,
    borderRadius:5
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  optionButton: {
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: 'orange',
    borderColor: 'orange',
    
  },
  optionText: {
    color: 'black',
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  genderButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  genderText: {
    color: 'black',
  },
  detailsInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color: 'black',
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#002561',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,

  },
});

export default Request;
