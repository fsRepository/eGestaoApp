import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/router/router';
import ContextProvider from './src/contexts/context';


export default function App() {


  return (

    <NavigationContainer>
      <ContextProvider>

        <Router />
      </ContextProvider>

    </NavigationContainer>

  )
}