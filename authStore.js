import create from 'zustand'
import { persist } from 'zustand/middleware';
import { AsyncStorage } from 'react-native';
const authStore = (set) => ({
    userProfile: null,
    userDetails: null,
    addUserDets: (user) => set({ userDetails: user }),
    addUser: (user) => set({ userProfile: user }),
})




const useAuthStore = create(
    persist(authStore, {
        name: 'auth',
        getStorage: () => AsyncStorage,
    })
)

export default useAuthStore;
