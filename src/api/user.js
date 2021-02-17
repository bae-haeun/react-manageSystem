import axios from './index'

export function login(data) {
    return axios.post('/login', data)
}

export function logout() {
    return axios.get('/logout')
}
