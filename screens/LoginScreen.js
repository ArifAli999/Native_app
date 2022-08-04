import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import useAuthStore from '../authStore';
import { auth, db, app } from './../util/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Timestamp, query, where, collection, onSnapshot } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';



const LoginScreen = ({ navigation }) => {

    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const passwordInput = useRef();
    const emailInput = useRef(null);


    const handleSignIn = () => {

        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // Signed in
                    alert("signed in");
                    addUser(auth.currentUser)
                    setIsOpen(false)
                    // ...
                })
                .catch((error) => {

                });

        }
        else {
            alert("Please fil all the fields.")
        }
    };




    return (

        <SafeAreaView className="h-full w-full items-center flex-1 bg-[#16151d] ">
            <View className=' max-h-[95%] mb-0 w-full '>

                <View className=' p-4  ml-6 mr-6 mt-10 leading-loose'>
                    <Text className=' font-semibold text-4xl text-white mb-2 '>Let's sign you in.</Text>
                    <Text className='font-thin text-2xl text-white leading-loose ml-1'>Welcome back.</Text>
                    <Text className='font-thin text-2xl text-white leading-loose ml-1'>You have been missed!</Text>
                </View>
                <View className='h-full  p-4 flex-1 mt-0 ml-6 mr-6'>
                    <TextInput
                        className='p-6 border border-gray-700 rounded-3xl mb-4 mt-4 placeholder-white text-white focus:border-purple-500'
                        placeholderTextColor="#383640"
                        placeholder='Email'
                        value={email}
                        returnKeyType={'next'}
                        onSubmitEditing={() => passwordInput.current.focus()}
                        onChangeText={text => setEmail(text)}
                    />


                    <TextInput
                        className='p-6 border border-gray-700 rounded-3xl mb-4 mt-4 placeholder-white text-white focus:border-purple-500'
                        placeholderTextColor="#383640"
                        value={password}
                        ref={passwordInput}
                        returnKeyType={'go'}
                        onSubmitEditing={() => handleSignIn()}
                        placeholder='Password'
                        onChangeText={text => setPassword(text)}

                    />
                </View>
                <View className='items-center w-full  justify-center'>

                    <TouchableOpacity
                        className='px-4 py-4 border flex items-center  font-bold rounded-full w-[80%]  bg-lime-500'
                        onPress={() => handleSignIn()}
                        accessibilityLabel="Learn more about this purple button">
                        <Text className='font-medium text-base text-black ' >Register</Text>
                    </TouchableOpacity>


                </View>

            </View>

        </SafeAreaView>

    )
}

export default LoginScreen