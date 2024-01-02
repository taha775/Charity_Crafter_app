import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../Components/Users/Signup';
import Login from '../Components/Users/Login';
import Splash_Screen from '../Components/Spalshscreen/Splashscreen';
import Appintro from '../Components/AppintroSlider/AppIntro'
import Home from '../Screens/Home';

import BottomNavigation from '../Components/Bottomnavigation/Bottomnavigation';
import Request from '../Screens/Request';
import Donate from '../Screens/Donate';
import TopNavigation from '../Components/TopNavigation/TopNavigation';
import About from '../Screens/About';
import Terms from '../Screens/Terms';
import Privacy from '../Screens/Privacy';
import Setting from '../Screens/Setting';


const Stack= createNativeStackNavigator()

const Navigation=()=>{
    return(
        <NavigationContainer>
             <Stack.Navigator>
            <Stack.Screen name='splash'
            options={{headerShown:false}} component={Splash_Screen} >

            </Stack.Screen>


        
            <Stack.Screen name='appintro'
            options={{headerShown:false}} component={Appintro} >

            </Stack.Screen>
            <Stack.Screen name='signup'
            options={{headerShown:false}} component={SignUp} >

            </Stack.Screen>
            <Stack.Screen name='login'
            options={{headerShown:false}} component={Login} >

            </Stack.Screen>
            <Stack.Screen name='home'
            options={{headerShown:false}} component={Home} >

            </Stack.Screen>
            <Stack.Screen name='bottomnavigation'
            options={{headerShown:false}} component={BottomNavigation} >

            </Stack.Screen>
            <Stack.Screen name='topnavigation'
            options={{headerShown:false}} component={TopNavigation} >

            </Stack.Screen>
            
         
            <Stack.Screen name='request'
            options={{headerShown:false}} component={Request} >

            </Stack.Screen>
            <Stack.Screen name='donate'
            options={{headerShown:false}} component={Donate} >

            </Stack.Screen>
            <Stack.Screen name='about'
            options={{headerShown:false}} component={About} >

            </Stack.Screen>
            <Stack.Screen name='terms'
            options={{headerShown:false}} component={Terms} >

            </Stack.Screen>
             <Stack.Screen name='privacy'
            options={{headerShown:false}} component={Privacy} >

            </Stack.Screen>
            <Stack.Screen name='setting'
            options={{headerShown:false}} component={Setting} >

            </Stack.Screen>
        </Stack.Navigator>
            
        </NavigationContainer>
       
    )
}

export default Navigation