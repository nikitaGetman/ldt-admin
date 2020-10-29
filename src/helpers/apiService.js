import axios from 'axios'
import { BASE_URL } from '@/config'
import { LOGOUT } from '@/store/actions/types'
import store from '@/store'

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

client.interceptors.request.use(
  config => ({
    ...config,
    headers: {
      ...config.headers,
      ...store.getters.headers
    }
  }),
  error => error
)

client.interceptors.response.use(
  response => (response && response.data ? response.data : response) || {},
  error => {
    const status = error.response ? error.response.status : 408

    if (status === 401) {
      store.dispatch(LOGOUT)
    }

    console.warn('interceptors error', status, error.response, error)
    return Promise.reject(error)
  }
)

const apiService = {
  client,

  auth({ login, password }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const model = { login, password, access: 'access' }
        resolve(model)
      }, 1000)
    })
    // return this.client.post('/api/auth', { login, password })
  },
  fetchProfile() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: 'Иван', surname: 'Иванов' })
      }, 0)
    })
  },
  fetchAnimals(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        const list = [{ value: params.offset, id: params.offset }]
        const data = { list, count: 10 }
        resolve(data)
      }, 500)
    })
    // return this.client.get('/api/animals', { params })
  }
}

export default apiService
