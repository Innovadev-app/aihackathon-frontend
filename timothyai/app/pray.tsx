import * as React from 'react';
import { Text, View } from 'react-native';
import { Theme, NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Record from './prayrecord';
import Recommend from './prayrecommend';
import MyPrayers from './praymy';

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(9, 9, 9)',
    card: 'rgb(9, 9, 9)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

const Tab = createMaterialTopTabNavigator();

export default function Pray() {
  return (
    <NavigationContainer independent theme={DarkTheme}>
      <Tab.Navigator initialRouteName="Pray2"
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black' },
          tabBarActiveTintColor: '#00aba9',
          tabBarInactiveTintColor: '#BEC3C9',
          
        }}
        >
        <Tab.Screen name="Record" component={Record} />
        <Tab.Screen name="Recommend" component={Recommend} />
        <Tab.Screen name="My Prayers" component={MyPrayers} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}