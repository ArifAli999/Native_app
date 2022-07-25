import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '../authStore';
import { auth, db, app } from './../util/firebase'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    collection, addDoc, Timestamp, limit,
    QuerySnapshot,
    DocumentData, query, doc, getDocs, orderBy
} from "firebase/firestore";
import uuid from 'react-native-uuid';






const NoteScreen = ({ navigation }) => {
    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();
    const [note, setNote] = useState('')
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState([])














    const addToDb = () => {
        const dtref = Timestamp.now()
        const uid = uuid.v4();
        if (title && note) {
            addDoc(collection(db, `notes`), {
                title: title,
                content: note,
                useruid: `${userProfile.uid}`,
                createdAt: dtref,
                user: `${userDetails.username}`,
                postid: `${uid}`,

            }).then(() => {
                alert("Posted");
                setNote('');
                setTitle('');

            }).catch((err) => {
                alert(err.message);
            })
        } else {
            alert("Please fill both fields")
        }


    };



    return (

        <SafeAreaView className='bg-[#16151d] h-full w-full  '>
            <KeyboardAwareScrollView

                resetScrollToCoords={{ x: 0, y: 0 }}

                scrollEnabled={false}
            >
                <View className='h-fit mb-20 mr-6 ml-6 '>

                    <View className=' relative  mt-6  mb-4  flex  justify-between w-full  ' >
                        <View className="  w-full  h-fit z-50   p-2  justify-between  flex-row items-center  ">
                            <Text className='text-white font-black   text-2xl z-[9999] '>Whats on your mind?

                            </Text>


                        </View>
                    </View>


                    <View className='mt-0  w-full  justify-center p-4  max-h-[95%]  ' >
                        <Text className='text-gray-500 ml-1 -mb-1'>Title</Text>
                        <TextInput
                            multiline={false}
                            numberOfLines={10}
                            blurOnSubmit={true}
                            returnKeyType={'go'}
                            className='p-6 border w-full border-gray-600 rounded-xl mb-4 mt-4 placeholder-white text-white focus:border-purple-500'
                            placeholder="Title"
                            maxLength={40}
                            value={title}
                            onChangeText={text => setTitle(text)}
                            clearButtonMode="while-editing"
                            placeholderTextColor="#ccc"
                        />

                        <Text className='text-gray-500 ml-1 -mb-1'>Whats on your mind?</Text>
                        <TextInput
                            multiline={true}

                            numberOfLines={10}
                            style={{ textAlignVertical: 'top', }}
                            blurOnSubmit={true}
                            returnKeyType={note.length === 40 ? `go` : null}
                            className='p-4 border  h-[200px] w-full border-gray-600 rounded-xl mb-4 mt-4 placeholder-white text-white focus:border-purple-500'
                            placeholder="Your thoughts..."
                            maxLength={400}
                            value={note}
                            onChangeText={text => setNote(text)}
                            clearButtonMode="while-editing"
                            placeholderTextColor="#ccc"
                        />


                        <TouchableOpacity
                            className='px-4 py-4 flex items-center font-bold rounded-full w-full mt-6  border border-purple-600'
                            onPress={() => addToDb()}
                            accessibilityLabel="Learn more about this purple button">
                            <Text className='font-medium text-base text-purple-500 ' >Add</Text>
                        </TouchableOpacity>



                    </View>



                    <View className='text-white font-black   text-2xl z-[9999] '>
                        {notes && notes.map((n) => (
                            <Text key={n.createdAt} className='text-white'>{n.content}</Text>
                        ))}
                    </View>




                </View>






            </KeyboardAwareScrollView>

        </SafeAreaView>

    )
}

export default NoteScreen