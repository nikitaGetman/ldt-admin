import { throwError } from '@/store/utils'
import { LOADING, LOADED, SET_MODEL, UPDATE_MODEL } from '@/store/mutations/types'
import { LOGOUT } from '@/store/actions/types'

export const FETCH_DICTS = 'fetchDicts'
export const FETCH_SHELTERS = 'fetchShelters'
export const FETCH_BREEDS = 'fetchBreeds'

export const MODULE_NAME = 'dicts'

export default {
  state: {
    loading: false,
    model: {}
  },
  actions: {
    [FETCH_DICTS]: ({ state, commit, getters }) => {
      if (Object.entries(state.model).length > 0) return

      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .fetchDicts()
        .then(model => {
          commit(UPDATE_MODEL, { name: MODULE_NAME, model })
        })
        .catch(throwError(commit, 'Ошибка получения словарей (fetchDicts)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [FETCH_SHELTERS]: ({ commit, getters }) => {
      return getters.apiService.fetchShelters().then(list => {
        console.log('update shelters')
        commit(UPDATE_MODEL, { name: MODULE_NAME, model: { shelters: list } })
      })
    },
    [FETCH_BREEDS]: ({ commit, getters }) => {
      return getters.apiService.fetchBreeds().then(list => {
        console.log('update shelters')
        commit(UPDATE_MODEL, { name: MODULE_NAME, model: { _animalBreeds: list } })
      })
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_MODEL, { name: MODULE_NAME, model: {} })
    }
  }
}
