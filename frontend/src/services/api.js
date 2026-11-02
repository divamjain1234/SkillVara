import axios from 'axios'

// One axios instance for the whole app: base URL + cookies (the JWT lives in an httpOnly cookie).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export default api
