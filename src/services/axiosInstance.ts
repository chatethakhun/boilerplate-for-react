import axios from 'axios'
import { getAccessToken } from '@/utils/auth'

const instance = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  },
})

export default instance
