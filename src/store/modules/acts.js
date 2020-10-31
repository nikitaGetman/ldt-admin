import { throwError } from '@/store/utils'
import { LOADING, LOADED, SET_MODEL, SET_LIST, UPDATE_MODEL } from '@/store/mutations/types'
import { LOGOUT } from '@/store/actions/types'

export const FETCH_ANIMAL_ACTS = 'fetchAnimalActs'
export const ADD_ANIMAL_ACTS = 'addAnimalActs'

export const MODULE_NAME = 'acts'

export default {
  state: {
    loading: false,
    model: {},
    list: []
  },
  actions: {
    [FETCH_ANIMAL_ACTS]: ({ commit, getters }, id) => {
      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .fetchAnimalActs(id)
        .then(list => {
          commit(UPDATE_MODEL, { name: MODULE_NAME, model: { id, acts: list } })
        })
        .catch(throwError(commit, 'Ошибка получения списка документов животного (fetchAnimalActs)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_MODEL, { name: MODULE_NAME, model: {} })
      commit(SET_LIST, { name: MODULE_NAME, list: [] })
    }
  }
}
