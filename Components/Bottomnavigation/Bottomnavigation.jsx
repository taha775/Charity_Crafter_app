import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
    Text
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/AntDesign';
import Post from '../../Screens/Post';
import Video from '../../Screens/Video';
import Setting from '../../Screens/Setting';
import Profile from '../../Screens/Profile';




export default function BottomNavigation() {
  const _renderIcon = (routeName, selectedTab) => {

    let icon = '';

    switch (routeName) {
      case 'Charity Crafter':
        icon = 'home';
        break;
      case 'video':
        icon = 'videocamera';
        break;
        case "setting":
        icon= "setting";
        break
        case "profile":
        icon = "aliwangwang-o1"
        break

    }

    return (
      <Ionicons
        name={icon}
        size={30}
        color={routeName === selectedTab ? 'orange' : 'white'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
   
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="#002561"
        screenOptions={{
          headerShown: false, // Add this line to hide the header by default
        }}
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('topnavigation')}
            >
              <Ionicons name={'pluscircle'} color="#002561" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen

          name="Charity Crafter"
          position="LEFT"
        
          component={() => <Post />}
        />
        <CurvedBottomBarExpo.Screen
          name="video"
          position="LEFT"
          component={() => <Video />}
        />
         <CurvedBottomBarExpo.Screen
          name="setting"
          component={() => <Setting/>}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="profile"
          component={() => <Profile />}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
  
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
