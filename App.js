import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native'
import React, { Component, useState, useEffect } from 'react';
import { Keyboard } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import useAuthStore from './authStore';
import MainScreen from './screens/MainScreen';
import { auth, db, app } from './util/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import NoteScreen from './screens/NoteScreen';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import ProfilePageScreen from './screens/ProfilePageScreen';
import DetailsModal from './screens/DetailsModal';





const Stack = createNativeStackNavigator()



export default function App() {


  useEffect(() => {
    if (userProfile) {
      const dbRef = collection(db, "users")
      const q = query(dbRef, where("useruid", "==", `${userProfile.uid}`))


      onSnapshot(q, snap => {
        if (!snap.empty) {
          const data = snap.docs[0].data();
          addUserDets(data)
        } else {
          console.log("No user found with given id")
        }
      })
    }
  }, [userProfile])




  const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();




  return (

    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>



          {userProfile ? (<>


            <Stack.Screen name="main" component={MainScreen} />
            <Stack.Screen name="Notes" component={NoteScreen} />

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Details" component={DetailsModal} />
            </Stack.Group>
          </>
          ) :

            <>
              <Stack.Screen name="home" component={HomeScreen} />

              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="login" component={LoginScreen} />
              </Stack.Group><Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="register" component={RegisterScreen} />
              </Stack.Group></>

          }


        </Stack.Navigator>
        <StatusBar hidden />
      </TailwindProvider>
    </NavigationContainer>


  );
}


