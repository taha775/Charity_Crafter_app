import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 1,
        image: require('../../Assests/1.jpg'),
    },
    {
        key: 2,
        image: require('../../Assests/2.jpg'),
    },
    {
        key: 3,
        image: require('../../Assests/3.jpg'),
    }
];

const App = ({ navigation }) => {
    const [showRealApp, setShowRealApp] = useState(false);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        );
    }

    const onDone = () => {
        navigation.navigate("signup");
    }

    if (showRealApp) {
        return <YourRealAppComponent />;
    } else {
        return <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            onDone={onDone}
            showSkipButton={true}
            dotStyle={{
                backgroundColor: "blue"
            }}
            activeDotStyle={{
                backgroundColor: "white"
            }}
            renderSkipButton={() =>
                <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                    <View style={styles.skipButton} >
                        <Text style={styles.skipButtonText}>Skip</Text>
                    </View>
                </TouchableOpacity>
            }
            renderNextButton={() =>
                <View style={styles.skipButton}>
                    <Text style={styles.skipButtonText}>Next</Text>
                </View>
            }
        />;
    }
}



const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: 16,
        fontWeight: "bold"
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    skipButton: {
        paddingLeft: 10,
        paddingRight: 10,
       

    
    },
    skipButtonText: {
        fontSize: 18,
        fontFamily: 'Agbalumo-Regular',
        color: '#e3fffe',
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover', // Use 'cover' to maintain the image's aspect ratio and fill the container
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    },
});

export default App;
