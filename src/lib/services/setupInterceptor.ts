import { useRouter } from "vue-router";
import api from "./api"
import TokenService from "./tokenService";

const router = useRouter();

api.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            config.headers["x-access-token"] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url != "/auth/sign-in" && !originalConfig._retry) {
            originalConfig._retry = true;

            TokenService.removeUser();

            router.push("/login")
        } 
        return Promise.reject(err);
    }
)