import tokenService from "./tokenService"

export default function authHeader() {
  let user = tokenService.getUser()

  if (user && user.accessToken) {
    return {
      Authorization: 'Bearer ' + user.accessToken,
      "Content-Type": "application/json",
    }
  } else {
    return {}
  }
}
