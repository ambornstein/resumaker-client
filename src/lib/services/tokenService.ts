class TokenService {
  dispatchUserEvent() {
    window.dispatchEvent(
      new CustomEvent('user-updated', {
        detail: {
          storage: localStorage.getItem('user'),
        },
      })
    )
  }

  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('user')!)
    return user?.refreshToken
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user')!)
    return user?.accessToken
  }

  updateLocalAccessToken(token: any) {
    let user = JSON.parse(localStorage.getItem('user')!)
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))

    this.dispatchUserEvent();
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user')!)
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user))

    this.dispatchUserEvent();
  }

  removeUser() {
    localStorage.removeItem('user')
    
    this.dispatchUserEvent();
  }
}

export default new TokenService() as TokenService
