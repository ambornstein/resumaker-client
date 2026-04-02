import type { User } from "../types/types";

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?.accessToken;
  }

  updateLocalAccessToken(token: any) {
    let user = JSON.parse(localStorage.getItem("user")!);
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem("user")!) as User;
  }

  setUser(user: any) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
