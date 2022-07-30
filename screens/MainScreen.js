import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '../authStore';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    signOut
} from "firebase/auth";
import { auth, db, app } from './../util/firebase'
import { LogoutIcon } from "react-native-heroicons/solid";
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import CustomSidebarMenu from '../CustomSidebarMenu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SparklesIcon } from "react-native-heroicons/solid";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen.js/ProfileScreen';
import ProfilePageScreen from './ProfilePageScreen';
import NoteScreen from './NoteScreen';
import { Entypo } from '@expo/vector-icons';






const Tab = createBottomTabNavigator();



const MainScreen = ({ navigation }) => {
    const { userProfile, addUser } = useAuthStore();


    function MyTabBar({ state, descriptors, navigation }) {
        return (
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40, right: 20, left: 20, backgroundColor: '#550080', borderRadius: 200, borderWidth: 2, borderColor: '#', padding: 0 }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };


                    const tabBarIcon = options.tabBarIcon




                    return (
                        <View className='flex-1  flex-row w-full text-center  items-center justify-center  border-[#3c005a]'

                            key={label}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                onPress={onPress}
                                className='w-full h-full  p-0'
                                style={{ flex: 1, alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}
                            >
                                <View className='w-full items-center justify-center p-6'>
                                    {tabBarIcon === 'user' || tabBarIcon === 'logout' ? (



                                        <AntDesign name={tabBarIcon} size={22} color={isFocused ? 'white' : 'black'} />





                                    ) : <Ionicons name={tabBarIcon} size={22} color={isFocused ? 'white' : 'black'} className='text-white bg-black' />}

                                </View>

                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        );
    }





    const handleSignOut = (e) => {
        signOut(auth)
            .then(() => {
                alert("Logged Out");
                addUser(null)

            })
            .catch((error) => {
                alert(error.message);
                // ..
            });
    };


    return (

        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            tabBar={props => <MyTabBar {...props} />}
            shifting="false"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#e91e63',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 40,
                    right: 20,
                    left: 20,
                    height: 80,
                    borderRadius: 200,



                },

            }}
            sceneContainerStyle={{ marginBottom: 2 }}

        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    showIcon: true,
                    tabBarIcon: 'home'
                }}
            />
            <Tab.Screen name="Notes" component={NoteScreen}
                options={{
                    tabBarLabel: 'Notes',
                    showIcon: true,
                    tabBarIcon: 'book'
                }} />
            <Tab.Screen name="Profile" component={ProfilePageScreen}
                options={{
                    tabBarLabel: 'Profille',
                    showIcon: true,
                    tabBarIcon: 'user'
                }} />
            <Tab.Screen name="Logout" component={ProfileScreen}
                options={{
                    tabBarLabel: 'Logout',
                    showIcon: true,
                    tabBarIcon: 'cog',
                    tabBarStyle: {
                        borderColor: 'red',
                        borderRadius: '20px',
                        borderWidth: 2
                    },
                    tabBarBadge: 3,

                }} />
        </Tab.Navigator>




    )
}

export default MainScreen