import React from 'react'
import { StyleSheet, Text,View } from 'react-native'
import Navigation from './Config/Navigation'
import Home from './Screens/Home'



const App = () => {
  return (
 
    <Navigation/>
    

    
    
  )
}

styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        color:"black"
    },
    text1:{
        fontSize:30,
        color:"white"
    }
})

export default App