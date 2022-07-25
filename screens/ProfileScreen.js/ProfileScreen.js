import { View, Text, useWindowDimensions, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import useAuthStore from '../../authStore';
import { signOut } from "firebase/auth";
import { auth, db, app } from './../../util/firebase'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';





const ProfileScreen = ({ navigation }) => {
    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();

    const handleSignOut = (e) => {
        signOut(auth)
            .then(() => {
                alert("Logged Out");
                addUser(null)
                addUserDets(null);
            })
            .catch((error) => {
                alert(error.message);
                // ..
            });
    };

    return (
        <SafeAreaView className='bg-[#16151d] h-full w-full  '>
            <View className='h-fit mb-20 mr-6 ml-6 '>

                <View className=' relative  mt-6  mb-4  flex  justify-between w-full  ' >
                    <View className="  w-full  h-fit z-50   p-2  justify-between  flex-row items-center  ">
                        <Text className='text-white font-black   text-2xl z-[9999] '>Profile Settings
                        </Text>
                        <AntDesign name='logout' size={22} color='#673ab7' onPress={handleSignOut} />

                    </View>
                </View>


                <View className='   w-full  justify-center rounded-md bg-black/20 border border-gray-600 items-center max-h-[95%] ' >

                    <View className=' border-b p-4 border-gray-600 w-full flex-row justify-between'>
                        <Text className='text-white font-light'>Change Username</Text>
                        <AntDesign name='arrowright' size={22} color='#673ab7' />
                    </View>
                    <View className='  p-4 border-gray-600 w-full flex-row justify-between'>
                        <Text className='text-white font-light'>Change Email</Text>
                        <AntDesign name='arrowright' size={22} color='#673ab7' />
                    </View>



                </View>

                <View className='mt-6 w-full justify-center rounded-md bg-black/20 border border-gray-600 items-center max-h-[95%] ' >

                    <View className=' border-b p-4 border-gray-600 w-full flex-row justify-between'>
                        <Text className='text-white font-light'>Profile Picture</Text>
                        <AntDesign name='arrowright' size={22} color='#673ab7' />
                    </View>
                    <View className=' p-4 border-gray-600 w-full flex-row justify-between'>
                        <Text className='text-white font-light'>Profile Bio</Text>
                        <AntDesign name='arrowright' size={22} color='#673ab7' />
                    </View>



                </View>

                <View className='   mt-6 w-full justify-center  bg-black/20 border border-gray-600 items-center max-h-[95%] ' >

                    <View className=' border-b p-4 border-gray-600 w-full flex-row justify-between'>
                        <Text className='text-white font-light'>Delete Data</Text>
                        <AntDesign name='delete' size={22} color='red' />
                    </View>
                    <View className='  p-4 border-gray-600 w-full flex-row justify-between'>
                        <Text className='text-white font-light'>Delete Profile</Text>
                        <AntDesign name='deleteuser' size={22} color='red' />
                    </View>



                </View>


            </View>







        </SafeAreaView>
    )
}

export default ProfileScreen