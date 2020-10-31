import { throwError } from '@/store/utils'
import { LOADING, LOADED, SET_MODEL } from '@/store/mutations/types'
import { LOGOUT } from '@/store/actions/types'

export const FETCH_DICTS = 'fetchDicts'

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
          commit(SET_MODEL, { name: MODULE_NAME, model })
        })
        .catch(throwError(commit, 'Ошибка получения словарей (fetchDicts)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_MODEL, { name: MODULE_NAME, model: {} })
    }
  }
}
