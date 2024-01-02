import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Request from '../../Screens/Request';
import Donate from '../../Screens/Donate';

const Tab = createMaterialTopTabNavigator();

const TopNavigation =()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Request" options={{ tabBarStyle: { backgroundColor: 'orange' } }} component={Request} />
      <Tab.Screen name="Donate" options={{ tabBarStyle: { backgroundColor: 'orange' } }} component={Donate} />
    </Tab.Navigator>
  );
}

export default TopNavigation