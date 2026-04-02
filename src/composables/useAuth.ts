import { ref } from "vue";
import api from "../lib/services/api";
import type { User } from "../lib/types/types";
import TokenService from "../lib/services/tokenService";

const user = ref<User | null>(
  JSON.parse(localStorage.getItem("user")!) as User,
);
const isLoggedIn = ref<boolean>(localStorage.getItem("user") != null);

export function useAuth() {
  async function login(userData: any) {
    return api.post("/api/auth/login", userData).then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);

        user.value = TokenService.getUser();
        isLoggedIn.value = true;
      }

      return response;
    }).catch((error) => {
      if (error.response) return error.response;
    });
  }

  function logout() {
    TokenService.removeUser();
    user.value = null;
    isLoggedIn.value = false;
  }

  async function register(userData: any) {
    return api.post("/api/auth/sign-up", userData);
  }

  return { login, logout, register, user, isLoggedIn };
}
