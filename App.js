import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import LandingScreen from './components/LandingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Explorer from './components/Explorer';


const Stack = createNativeStackNavigator();
export const StackNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={LandingScreen}/>
      <Stack.Screen name="Explorer" component={Explorer}/>
  </Stack.Navigator>
) 

export default function App() {
  
  return (
    <View style={styles.container}>
      <SafeAreaView/>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
          paddingTop: 30,
          
      } 
  }),
  },
});