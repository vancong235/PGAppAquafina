import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import Quantity from '../screens/Quantity'
import Qrcode from '../screens/Qrcode'
import Report from '../screens/Report'
import Point from '../screens/Point'
// import Start from '../screens/Start'
// import Turtorial from '../screens/Turtorial'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParams } from './Param'

const Stack = createNativeStackNavigator<StackParams>();

export default function Root() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false // Ẩn tiêu đề
    }}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Quantity" component={Quantity}></Stack.Screen>
      <Stack.Screen name="Qrcode" component={Qrcode}></Stack.Screen>
      <Stack.Screen name="Report" component={Report}></Stack.Screen>
      <Stack.Screen name="Point" component={Point}></Stack.Screen>
    </Stack.Navigator>
</NavigationContainer>
  )
}