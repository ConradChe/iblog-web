export function getToken() {
  return localStorage.token
}

export function setToken(param) {
  localStorage.token = param.loginToken
  localStorage.user = JSON.stringify(param.user)
}

export function removeToken() {
  return localStorage.removeItem('token')
}

export function setUser(param) {
  localStorage.user = JSON.stringify(param)
}

export function getUser() {
  if (localStorage.user) {
    return JSON.parse(localStorage.user)
  }
}

export function removeUser() {
  return localStorage.removeItem('user')
}
