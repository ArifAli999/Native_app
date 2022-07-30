import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { db, auth, app } from './../util/firebase'
import {
    collection, addDoc, Timestamp, limit, where,
    DocumentData, query, doc, getDocs, orderBy, deleteDoc, updateDoc, setDoc
} from "firebase/firestore";
import useAuthStore from '../authStore';
import uuid from 'react-native-uuid';
import { TabRouter } from '@react-navigation/native';

const DetailsModal = ({ route, navigation }) => {

    const { postid, content, title, createdAt } = route.params;
    const [post, setPosts] = useState([])
    const [editable, setEditable] = useState(false)
    const [note, setNote] = useState(content)

    const mainInput = useRef(null)
    console.log(note)



    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();


    async function deleteNote() {
        const uid = uuid.v4();
        try {
            await setDoc(
                doc(db, "users", userProfile.uid, 'recently_deleted', uid),
                {
                    content: content,
                    title: title,
                    postid: uid,
                    createdAt: createdAt,
                    useruid: userProfile.uid,
                    username: `${userDetails && userDetails.username}`
                }
            )
            await deleteDoc(doc(db, "notes", postid));

            navigation.goBack()
            return console.log('deleted')
        }

        catch (error) {
            console.log(error.message);
        }
    }



    useEffect(() => {

        if (editable) {
            mainInput.current.focus()
        }

    }, [editable])


    async function EditPost() {
        try {
            const dbRef = doc(db, "notes", postid)
            await updateDoc(dbRef, {
                content: note
            });
            alert('Saved')
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Delete Message",
            "Once deleted the note can only be recovered within 15 days from recently deleted",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: { color: 'red' }
                },
                { text: "Proceed", onPress: () => deleteNote() }
            ]
        );


    return (
        <View className='bg-[#16151d] h-full w-full'>

            <View className='w-[90%] mr-6 ml-6  h-full' key={postid}>

                <View className='p-4 mt-4 mb-4 border-b border-gray-700/80'>
                    <Text className='text-white text-2xl mb-2 w-full  font-bold '>
                        {title}
                    </Text>
                </View>


                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "height" : "padding"}
                    contentContainerStyle={{ height: '100%' }}
                    keyboardVerticalOffset={100}
                    style={{ flex: 1, alignItems: 'center', height: '100%' }}
                >

                    <View className='p-4 mr-2 ml-0 mt-2 mb-6 border border-gray-700/80 rounded w-full max-h-[100%] items-start bg-black justify-start flex-1'>
                        <TextInput value={note} editable={editable} className='text-gray-400 w-full  flex-1     text-base font-light '
                            onChangeText={text => setNote(text)}
                            multiline={true}
                            ref={mainInput}

                            autoFocus={true} />


                    </View>

                    <View className='p-4  mt-6 mb-14 flex-row w-full rounded  bottom-0 '>
                        <View className='flex-1 mr-6'>
                            <TouchableOpacity
                                className='px-4 py-4 flex items-center font-bold rounded-full w-full mt-6  border border-red-400'
                                onPress={() => createTwoButtonAlert()}
                                accessibilityLabel="Learn more about this purple button">
                                <Text className='font-medium text-base text-red-400 ' >Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='flex-1'>


                            {editable ? (

                                <TouchableOpacity
                                    className='px-4 py-4 flex items-center font-bold rounded-full w-full mt-6  bg-purple-600 border border-purple-600'
                                    style={{ elevation: 2 }}
                                    onPress={() => {
                                        EditPost()

                                    }}
                                    accessibilityLabel="Learn more about this purple button">
                                    <Text className='font-medium text-base text-white ' >
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    className='px-4 py-4 flex items-center font-bold rounded-full w-full mt-6  bg-purple-600 border border-purple-600'
                                    style={{ elevation: 2 }}
                                    onPress={() => {
                                        setEditable(true)

                                    }}

                                    accessibilityLabel="Learn more about this purple button">
                                    <Text className='font-medium text-base text-white ' >
                                        Edit
                                    </Text>
                                </TouchableOpacity>

                            )}
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </View>


        </View>
    )
}

export default DetailsModal