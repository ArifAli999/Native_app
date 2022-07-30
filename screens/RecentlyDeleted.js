import { View, Text, useWindowDimensions, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import useAuthStore from '../authStore';
import { signOut } from "firebase/auth";
import { auth, db, app } from './../util/firebase'
import { AntDesign } from '@expo/vector-icons';
import {
    collection, addDoc, Timestamp, limit,
    QuerySnapshot, where,
    DocumentData, query, doc, getDocs, orderBy, deleteDoc, setDoc
} from "firebase/firestore";
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQueryClient, useQuery } from '@tanstack/react-query';


const RecentlyDeleted = ({ navigation }) => {

    const queryClient = useQueryClient()



    const { isLoading, isError, data, error } = useQuery(['todos'], () => fetchProduct())
    const isFocused = useIsFocused();
    const [notes, setNotes] = useState([])
    const { userProfile, userDetails } = useAuthStore();

    async function fetchProduct() {
        const querySnapshot = await getDocs(collection(db, "users", userProfile.uid, 'recently_deleted'));
        return querySnapshot.docs.map((doc) => doc.data());
    }



    async function deleteNote(postid) {
        try {

            await deleteDoc(doc(db, "users", userProfile.uid, 'recently_deleted', postid))
            alert('deleted')
            //fetchProduct()
            queryClient.invalidateQueries(['todos']);
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async function RestoreNote(postid, content, title, createdAt, user, useruid) {
        try {
            console.log(postid, content, title, createdAt, user, useruid)
            await setDoc(doc(db, `notes`, postid), {
                title: title,
                content: content,
                useruid: useruid,
                createdAt: createdAt,
                user: userDetails.username,
                postid: postid,
            })
            await deleteDoc(doc(db, "users", userProfile.uid, 'recently_deleted', postid))
            queryClient.invalidateQueries(['todos']);
            alert('restored')
        }
        catch (err) {
            console.log(err.message)
        }

    }





    return (
        <SafeAreaView className='bg-[#16151d] h-full w-full  '>
            <View className=' mb-20 mr-6 ml-6 h-[90%] '>

                <View className=' relative  mt-6  mb-4  flex  justify-between w-full  ' >
                    <View className="  w-full  h-fit z-50   p-2  justify-between  flex-row items-center  ">
                        <Text className='text-white font-black   text-2xl z-[9999] '>Recently Deleted</Text>


                    </View>
                </View>
                <ScrollView className='mt-10'>
                    {data && data.map((n) => (
                        <View className='w-full mb-6 bg-black rounded-md border border-gray-800 shadow-lg shadow-white ' key={n.postid}>
                            <View className='border-b w-full p-0 border-gray-800 flex-row items-center justify-between'>
                                <Text className='text-purple-600 font-black p-4  text-xl'>
                                    {n.title}
                                </Text>

                            </View>
                            <Text className='text-white p-6 text-xs '

                            >{n.content}</Text>

                            <View className='p-4 flex-row gap-4 border-t border-gray-800 justify-between '>

                                <MaterialCommunityIcons name="delete-alert" size={20} color="white" onPress={() => deleteNote(n.postid)} />

                                <MaterialCommunityIcons name="restore" size={24} color="white" onPress={() => RestoreNote(n.postid, n.content, n.title, n.createdAt, n.user, n.useruid)} />

                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default RecentlyDeleted