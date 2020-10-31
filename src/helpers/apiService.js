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
  fetchDicts() {
    return this.client.get('/api/dicts')
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
  },
  fetchAnimal(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = { id }
        resolve(data)
      }, 500)
    })
  },
  createAnimal(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(params)
      }, 500)
    })
    // return this.client.post('/api/animal', { params })
  },
  updateAnimal(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(params)
      }, 500)
    })
    // return this.client.put('/api/animal', { params })
  },
  fetchAnimalActs(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const list = [
          { date: '2020-01-10', type: 'Акт отлова', link: 'files/act.xls', id: `${id}-1` },
          { date: '2020-01-12', type: 'Акт осмотра', link: 'files/act.xls', id: `id-2` },
          { date: '2020-03-10', type: 'Акт приема передачи', link: 'files/act.xls', id: `id-3` }
        ]
        resolve(list)
      }, 3000)
    })
    // return this.client.get('/api/animal/acts', { params: { id } })
  },
  fetchRequests(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        const list = [{ value: params.offset, id: params.offset, status: 'new' }]
        const data = { list, count: 10 }
        resolve(data)
      }, 500)
    })
    // return this.client.get('/api/animals', { params })
  }
}

export default apiService
