import { View, Text, useWindowDimensions, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useReducer } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import useAuthStore from '../authStore';
import {
    signOut
} from "firebase/auth";
import { auth, db, app } from './../util/firebase'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MotiView, MotiText } from 'moti'
import { AnimatePresence } from 'moti'
import { useIsFocused } from '@react-navigation/native';






const HomeScreen = ({ navigation }) => {
    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();
    const [visible, toggle] = useReducer((s) => !s, true)
    const isFocused = useIsFocused();




    function Shape() {
        return (
            <MotiView
                from={{
                    opacity: 0,

                    translateX: 60
                }}
                animate={{
                    opacity: 1,

                    translateX: 0
                }}
                exit={{
                    opacity: 0,
                    translateX: 60
                }}
                transition={{
                    // default settings for all style values
                    type: 'spring',
                    duration: 500,
                    delay: 300
                }}
                style={styles.shape}
                className=" text-center w-full  h-fit z-50   p-2  justify-center  items-center">

                <Text className='text-white font-black   text-7xl z-[9999] '>Welcome {userDetails ? userDetails.username : 'Guest'}
                </Text>
                <Text className='text-purple-500 font-thin  leading-loose text-base z-[9999] '>Lets get you started!</Text>
            </MotiView>
        )
    }

    return (
        <SafeAreaView className='bg-[#16151d] h-full w-full'>
            <View className='  w-full mb-10 h-[95%] justify-between ' >

                <View className=' relative  mt-6 mb-10 flex-1 flex-row '
                >




                    <AnimatePresence>{visible && <Shape />}</AnimatePresence>





                </View>


                <View className='items-center  justify-center gap-3 p-6' >

                    {userProfile ? null : (
                        <>
                            <TouchableOpacity
                                className='px-4 py-3 border flex items-center  font-bold rounded-full w-[80%]  bg-lime-500'
                                onPress={() => navigation.navigate("register")}
                                accessibilityLabel="Learn more about this purple button">
                                <Text className='font-medium text-base text-black ' >Register</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                className='px-4 mb-2 py-3 border-[1.5px] flex items-center  font-bold rounded-full w-[80%] border-white sha'
                                onPress={() => navigation.navigate("login")}
                                accessibilityLabel="Learn more about this purple button">
                                <Text className='font-medium text-base text-white ' >Sign In</Text>
                            </TouchableOpacity>
                        </>
                    )}



                </View>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    shape: {

        justifyContent: 'center',

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#9c1aff',
    },
})

export default HomeScreen