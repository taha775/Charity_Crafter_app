import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Request = () => {
  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('food');
  const [cnic, setCNIC] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [details,setDetails] = useState('')

  const options = ['food', 'education', 'money', 'medical'];


  const handleRequestSubmit = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');

      if (!uid) {
        console.error('UID not available');
        return;
      }

      // Create a reference to the 'requests' collection
      const donateCollectionRef = firestore().collection('donates');

      // Generate a new ID for the request
      const donateId = donateCollectionRef.doc().id;

      // Create a reference for the specific request using the generated ID
      const userDonateRef = donateCollectionRef.doc(donateId);

      // Set the data for the request
      await userDonateRef.set({
        uid,
        donateId, // Include the requestId in the document
        username,
        selectedOption,
        cnic,
        contact,
        gender,
        details
      });
      Alert.alert("data send successfully")

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
        details
      });
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };


  return (
    <View style={{ padding: 16 }}>
      <Text style={{ color: 'black' }}>Username:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, color: 'black' }}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <Text style={{ color: 'black' }}>Options:</Text>
      {options.map((option) => (
        <View key={option} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setSelectedOption(option)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {selectedOption === option && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'black',
                }}
              />
            )}
          </TouchableOpacity>
          <Text style={{ color: 'black' }}>{option}</Text>
        </View>
      ))}

      <Text style={{ color: 'black' }}>CNIC:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, color: 'black' }}
        onChangeText={(text) => setCNIC(text)}
        value={cnic}
      />

      <Text style={{ color: 'black' }}>Contact:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, color: 'black' }}
        onChangeText={(text) => setContact(text)}
        value={contact}
      />

      <Text style={{ color: 'black' }}>Gender:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => setGender('Male')}
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {gender === 'Male' && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'black',
              }}
            />
          )}
        </TouchableOpacity>
        <Text style={{ color: 'black' }}>Male</Text>

        <TouchableOpacity
          onPress={() => setGender('Female')}
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {gender === 'Female' && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'black',
              }}
            />
          )}
        </TouchableOpacity>
        <Text style={{ color: 'black' }}>Female</Text>
      </View>
        
             <Text style={{color:"black"}}>Details</Text> 
      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, color: 'black' }}
        onChangeText={(text) => setDetails(text)}
        value={details}
        placeholder="Enter additional details"
      />
  

     
     

      <TouchableOpacity
        style={{
          backgroundColor: '#002561',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          alignItems: 'center',
        }}
        onPress={handleRequestSubmit}
      >
        
        <Text style={{ color: 'white' }}>Donate now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Request;
