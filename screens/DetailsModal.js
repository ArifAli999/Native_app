import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, auth, app } from './../util/firebase'
import {
    collection, addDoc, Timestamp, limit, QuerySnapshot, where,
    DocumentData, query, doc, getDocs, orderBy
} from "firebase/firestore";
import useAuthStore from '../authStore';

const DetailsModal = ({ route, navigation }) => {

    const { postid, content, title, createdAt } = route.params;
    const [post, setPosts] = useState([])

    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();
    return (
        <View className='bg-[#16151d] h-full w-full'>

            <View className='w-[90%] mr-6 ml-6  h-full' key={postid}>
                <View className='p-4 mt-4 mb-4 border-b border-gray-700/80'>
                    <Text className='text-white text-2xl mb-2 w-full  font-bold '>
                        {title}
                    </Text>
                </View>

                <View className='p-4 mr-2 ml-2 mt-6 mb-6 border border-gray-700/80 rounded w-fit'>
                    <Text className='text-gray-400 leading-tight p-2 text-base font-light '>
                        {content}

                    </Text>
                </View>

                <View className='p-4  mt-6 mb-14 flex-row w-full rounded absolute bottom-0 '>
                    <View className='flex-1 mr-6'>
                        <TouchableOpacity
                            className='px-4 py-4 flex items-center font-bold rounded-full w-full mt-6  border border-red-400'
                            onPress={() => addToDb()}
                            accessibilityLabel="Learn more about this purple button">
                            <Text className='font-medium text-base text-red-400 ' >Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-1'>
                        <TouchableOpacity
                            className='px-4 py-4 flex items-center font-bold rounded-full w-full mt-6  bg-purple-600 border border-purple-600'
                            style={{ elevation: 2 }}
                            onPress={() => addToDb()}
                            accessibilityLabel="Learn more about this purple button">
                            <Text className='font-medium text-base text-white ' >Edit</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>


        </View>
    )
}

export default DetailsModal