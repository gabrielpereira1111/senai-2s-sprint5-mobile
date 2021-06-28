import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tab from './src/screens/tab.js'
import Login from './src/screens/login.js';

const myStack = createStackNavigator()

export default function Stack() {
  return (
      <NavigationContainer>
        <myStack.Navigator
          headerMode = 'none'
        >
          <myStack.Screen name="Login" component={Login}/>
          <myStack.Screen  name='BottomTab' component={tab}/>
        </myStack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
