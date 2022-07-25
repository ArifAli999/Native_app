import { View, Text, useWindowDimensions, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import useAuthStore from '../authStore';
import { signOut } from "firebase/auth";
import { auth, db, app } from './../util/firebase'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
    collection, addDoc, Timestamp, limit,
    QuerySnapshot, where,
    DocumentData, query, doc, getDocs, orderBy
} from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}



const ProfilePageScreen = ({ navigation }) => {

    const [notes, setNotes] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);



    async function fetchProduct() {
        let collectionRef = collection(db, "notes");
        const q = query(collectionRef, where("useruid", "==", `${userProfile.uid}`), orderBy('createdAt', 'desc'));
        getDocs(q)
            .then((response) => {
                const x = response.docs.map((item) => {
                    return item.data();
                })
                setNotes(x)
            }).catch((err) => {
                console.log(err.message);
            })
        return notes
    }



    useEffect(() => {
        fetchProduct()
    }, [])

    console.log(notes)



    return (
        <SafeAreaView className='bg-[#16151d] h-full w-full  '>
            <View className=' mb-20 mr-6 ml-6 h-[90%] '>

                <View className=' relative  mt-6  mb-4  flex  justify-between w-full  ' >
                    <View className="  w-full  h-fit z-50   p-2  justify-between  flex-row items-center  ">
                        <Text className='text-white font-black   text-2xl z-[9999] '>Hey, {userDetails ? userDetails.username : 'Guest'}
                        </Text>


                    </View>
                </View>


                <View className='mt-0  w-full  justify-center rounded-md bg-black/20 border border-gray-600 items-center max-h-[95%]  ' >

                    <View className=' p-4 border-gray-600 w-full flex-row  items-center'>
                        <Entypo name="news" size={24} color="#673ab7" />
                        <Text className='ml-2 text-white font-light flex items-center justify-center'> Recent Notes</Text>

                    </View>





                </View>


                <ScrollView className='mt-10'
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={'#fff'}
                            colors={['#D50000']}
                        />
                    }
                >
                    {notes && notes.map((n) => (
                        <View className='w-full mb-6 bg-black rounded-md border border-gray-800 shadow-lg shadow-white ' key={n.postid}>
                            <View className='border-b w-full p-0 border-gray-800 flex-row items-center justify-between'>
                                <Text className='text-purple-600 font-black p-4  text-xl' onPress={() => {
                                    /* 1. Navigate to the Details route with params */
                                    navigation.navigate('Details', {
                                        postid: n.postid,
                                        title: n.title,
                                        content: n.content,
                                        createdAt: n.createdAt,

                                    });
                                }}>
                                    {n.title}
                                </Text>
                                <View className='p-4 flex-row gap-4'>


                                    <AntDesign name="arrowsalt" size={18} color="white" />

                                </View>
                            </View>
                            <Text className='text-white p-6 text-xs '

                            >{n.content}</Text>
                        </View>
                    ))}
                </ScrollView>





            </View>







        </SafeAreaView >
    )
}

export default ProfilePageScreen