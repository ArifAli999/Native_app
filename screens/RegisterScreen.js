import { View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import useAuthStore from '../authStore';
import { auth, db, app } from './../util/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Timestamp, query, where, collection, onSnapshot } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { getDocs } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { userProfile, addUser, userDetails, addUserDets } = useAuthStore();

    const passwordInput = useRef();
    const emailInput = useRef();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // registered and signed in
                alert("registered");
                const dtref = Timestamp.now()
                setDoc(doc(db, `users`, `${auth.currentUser.uid}`), {
                    username: username,
                    useruid: auth.currentUser.uid,
                    Joined: dtref,
                    email: email,
                }).then(() => {
                    // get user data and add it to state.
                    addUser(auth.currentUser)


                    const dbRef = collection(db, "users")
                    const q = query(dbRef, where("useruid", "==", `${auth.currentUser.uid}`))


                    onSnapshot(q, snap => {
                        if (!snap.empty) {
                            const data = snap.docs[0].data();
                            addUserDets(data)

                        } else {
                            console.log("No user found with given id")
                        }
                    })



                    setEmail('');
                    setPassword('')

                }).catch((err) => {
                    alert(err.message);
                })




            })
            .catch((error) => {
                console.log(error.message)
                // ..
            });
    };


    return (

        <SafeAreaView className="h-full w-full items-center flex-1 bg-[#16151d] ">


            <View className='h-full w-full  '>

                <View className=' p-4  mt-6 ml-6 mr-6 leading-loose'>
                    <Text className=' font-semibold text-4xl text-white mb-2 '>Lets sign up!</Text>
                    <Text className='font-light text-lg text-gray-400 leading-loose ml-1'>Register to start creating your notes </Text>
                </View>

                <View className='h-full  p-4 flex-1 mt-0 ml-6 mr-6'>

                    <TextInput
                        className='p-6 border border-gray-700 rounded-3xl mb-4 mt-4 placeholder-white text-white focus:border-purple-500'
                        placeholderTextColor="#383640"
                        value={username}
                        placeholder='Username'
                        returnKeyType={'next'}
                        onSubmitEditing={() => emailInput.current.focus()}
                        onChangeText={text => setUsername(text)}

                    />



                    <TextInput
                        className='p-6 border border-gray-700 rounded-3xl mb-4 mt-4 placeholder-white text-white focus:border-purple-500'
                        placeholderTextColor="#383640"
                        value={email}
                        ref={emailInput}
                        returnKeyType={'next'}
                        onSubmitEditing={() => passwordInput.current.focus()}
                        placeholder='Email'
                        onChangeText={text => setEmail(text)}

                    />

                    <TextInput
                        className='p-6 border border-gray-700 rounded-3xl mb-4 mt-4 placeholder-white text-white focus:border-purple-500'
                        placeholderTextColor="#383640"
                        value={password}
                        ref={passwordInput}
                        placeholder='Password'
                        onChangeText={text => setPassword(text)}

                    />
                </View>





                <View className='items-center w-full mb-10 mt-10 justify-center'>

                    <TouchableOpacity
                        className='px-4 py-4 border flex items-center  font-bold rounded-full w-[80%]  bg-lime-500'
                        onPress={() => handleSignUp()}
                        accessibilityLabel="Learn more about this purple button">
                        <Text className='font-medium text-base text-black ' >Register</Text>
                    </TouchableOpacity>


                </View>


            </View>

        </SafeAreaView >

    )
}

export default RegisterScreen