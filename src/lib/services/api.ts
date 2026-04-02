import axios from 'axios'
import TokenService from './tokenService'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken()
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url != '/auth/sign-in' && err.response) {
      if (err.response.status === 401) {
        TokenService.removeUser()
      }
    }
    return Promise.reject(err)
  }
)

export default api
