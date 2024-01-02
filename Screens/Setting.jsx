import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';



const Setting = () => {
const navigation = useNavigation()
const gotoPrivacy =()=>{
navigation.navigate('privacy')
}
const gotoTerms =()=>{
  navigation.navigate('terms')
  }
const gotoAbout =()=>{
    navigation.navigate('about')
    }


  return (
    <View style={styles.container}>
      <View>
      <Image source={require('../Assests/signuplogo.png')} style={styles.logo} />
      </View>
      <TouchableOpacity style={styles.button} onPress={gotoPrivacy}>
        <Text style={styles.buttonText}>Privacy Policies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={gotoTerms}>
        <Text style={styles.buttonText}>Terms and Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={gotoAbout}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:280,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
  width:300,
  height:200
  },
  button: {
    backgroundColor: 'orange',  // Adjust the background color as needed
    padding: 20,
    margin: 10,
    borderRadius: 10,
  
  },
  buttonText: {
    color: '#fff',  // Adjust the text color as needed
    fontSize: 30,
    fontWeight: 'bold',
    color:"#012561"
  },
});

export default Setting;
