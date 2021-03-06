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
        const model = { login, password, access: login }
        resolve(model)
      }, 1000)
    })
    // return this.client.post('/api/auth', { login, password })
  },
  fetchDicts() {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(dicts)
    //   }, 0)
    // })
    return this.client.get('/api/dicts')
  },
  fetchShelters() {
    return this.client.get('/api/shelters')
  },
  fetchBreeds() {
    return this.client.get('/api/breeds')
  },

  fetchProfile() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: 'Иван', surname: 'Иванов' })
      }, 0)
    })
  },
  fetchAnimals(params) {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     const list = [{ value: params.offset, id: params.offset }]
    //     const data = { list, count: 10 }
    //     resolve(data)
    //   }, 500)
    // })

    return this.client.get('/api/animals', { params })
  },
  fetchAnimal(id) {
    return this.client.get(`/api/animals/${id}`)
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     const data = {
    //       id,
    //       type: 'Кошка',
    //       shelter: 'Приют 1',
    //       arrivalDate: '12.12.2012',
    //       sex: 'Мальчик',
    //       breed: 'метис',
    //       color: 'синий',
    //       wool: 'нет',
    //       tail: 'длиный',
    //       ears: 'торчком',
    //       cardId: '123123123',
    //       size: 'Крупный',
    //       age: '2014',
    //       specialSigns: '',
    //       nickname: 'Псиныч',
    //       weight: 12,
    //       readyToPickUp: false,
    //       idMarker: '123123213',
    //       character: 'Спокойный',
    //       veterinarian: 'Петров А И',
    //       cell: '20',
    //       sterilized: false
    //     }
    //     resolve(data)
    //   }, 500)
    // })
  },
  createAnimal(params) {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(params)
    //   }, 500)
    // })
    const lParams = { ...params.data }
    // lParams.shelter = 1
    lParams.cardId = '12301-12'
    lParams.size = 'Маленький'
    lParams.animal_breed = 806
    lParams.animal_type = 2
    return this.client.post('/api/animals', lParams)
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
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     const list = [
    //       { date: '2020-01-10', type: 'Акт отлова', link: 'files/act.xls', id: `${id}-1` },
    //       { date: '2020-01-12', type: 'Акт осмотра', link: 'files/act.xls', id: `id-2` },
    //       { date: '2020-03-10', type: 'Акт приема передачи', link: 'files/act.xls', id: `id-3` }
    //     ]
    //     resolve(list)
    //   }, 3000)
    // })
    return this.client.get(`/api/history/${id}`)
  },
  fetchRequests() {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     const list = [
    //       { id: params.offset, status: 'new', phone: '+7(213)1232123', name: 'Петр', animal: { cardId: '123321' } }
    //     ]
    //     const data = { list, count: 10 }
    //     resolve(data)
    //   }, 500)
    // })
    return this.client.get('/api/requests')
  },
  exportAnimalCard(id) {
    return this.client
      .request({
        url: `/api/report/${id}`,
        method: 'GET',
        responseType: 'blob' // important
      })
      .then(response => {
        let filename = 'Карточка_' + id + '.docx'
        let url = window.URL.createObjectURL(
          new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        )
        let link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
      })
  },
  addAnimalDoc(params) {
    return this.client.post('/api/history', params)
  }
}

export default apiService
