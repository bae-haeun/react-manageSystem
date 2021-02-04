import axios from 'axios'
// import { backend } from '@/config'

const instance = axios.create({
    baseURL: `http://localhost:3001/api`,
    withCredentials: true,
})

export default instance
