import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import IndexScreen from '../screens/IndexScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BlogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Blog Entries'
        component={IndexScreen}
        options={{
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}

export default function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='BlogStack' component={BlogStack} />
      <Tab.Screen name='Account' component={AccountScreen} />
    </Tab.Navigator>
  );
}
