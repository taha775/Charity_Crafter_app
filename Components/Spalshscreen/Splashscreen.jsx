import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

function Splash_Screen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('appintro');
    }, 3000);
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
   
     
      <Image
        source={require('../../Assests/splash.jpg')}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <ActivityIndicator color="white" size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  }

    
  
});

export default Splash_Screen;
