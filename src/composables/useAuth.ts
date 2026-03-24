import { ref } from "vue";
import api from "../lib/services/api";
import type { User } from "../lib/types/types";

const user = ref<User | null>(JSON.parse(localStorage.getItem('user')!) as User)
const isLoggedIn = ref<boolean>(localStorage.getItem('user') != null)

export function useAuth() {

    function login(userData: any) {
        return api.post('/api/auth/login', userData).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data))

                user.value = JSON.parse(localStorage.getItem('user')!) as User
                isLoggedIn.value = true
            }

            return response;
        });
    }

    function logout() {
        localStorage.removeItem('user')
        user.value = null
        isLoggedIn.value = false
    }

    function register(userData: any) {
        return api.post('/api/auth/sign-up', userData)
    }

    return { login, logout, register, user, isLoggedIn }
}