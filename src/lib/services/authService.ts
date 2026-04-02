import api from "./api"
import tokenService from "./tokenService"

class AuthService {
  async login(userData: any) {
    return api
      .post('/api/auth/login', userData)
      .then((response) => {
        if (response.data.accessToken) {
          tokenService.setUser(response.data)
        }

        return response
      })
      .catch((error) => {
        if (error.response) return error.response
      })
  }

  logout() {
    tokenService.removeUser()
  }

  async register(userData: any) {
    return api.post('/api/auth/sign-up', userData)
  }
}

export default new AuthService();
