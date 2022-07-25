import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
const Stack = createNativeStackNavigator()


const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="login" component={LoginScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator