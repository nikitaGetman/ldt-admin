import { throwError } from '@/store/utils'
import { LOADING, LOADED, SET_MODEL, SET_LIST, UPDATE_PARAMS, SET_PARAMS } from '@/store/mutations/types'
import { LOGOUT } from '@/store/actions/types'

export const FETCH_ANIMALS = 'fetchAnimals'
export const FETCH_ANIMAL = 'fetchAnimal'
export const CREATE_ANIMAL = 'createAnimal'

export const MODULE_NAME = 'animal'

export default {
  state: {
    loading: false,
    model: {},
    list: [],
    params: {
      limit: 10,
      offset: 0,
      count: null
    }
  },
  actions: {
    [FETCH_ANIMALS]: ({ state, commit, getters }, searchParams = {}) => {
      const params = { ...state.params, ...searchParams }
      if (params.offset === 0) {
        commit(SET_LIST, { name: MODULE_NAME, list: [] })
      }

      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .fetchAnimals(params)
        .then(({ list, count }) => {
          commit(SET_LIST, { name: MODULE_NAME, list: [...state.list, ...list] })
          commit(UPDATE_PARAMS, {
            name: MODULE_NAME,
            params: { offset: params.offset + list.length, count }
          })
        })
        .catch(throwError(commit, 'Ошибка получения списка животных (fetchAnimals)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [FETCH_ANIMAL]: ({ commit, getters }, id) => {
      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .fetchAnimal(id)
        .then(model => {
          commit(SET_MODEL, { name: MODULE_NAME, model })
        })
        .catch(throwError(commit, 'Ошибка получения данных животного (fetchAnimal)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [CREATE_ANIMAL]: ({ commit, getters }, params) => {
      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .createAnimal(params)
        .catch(throwError(commit, 'Ошибка создания карточки животного (createAnimal)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_MODEL, { name: MODULE_NAME, model: {} })
      commit(SET_LIST, { name: MODULE_NAME, list: [] })
      commit(SET_PARAMS, { name: MODULE_NAME, params: { limit: 10, offset: 0, count: null } })
    }
  }
}
