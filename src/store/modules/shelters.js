import { throwError } from '@/store/utils'
import { LOADING, LOADED, SET_LIST } from '@/store/mutations/types'
import { LOGOUT } from '@/store/actions/types'

export const FETCH_SHELTERS = 'fetchShelters'

export const MODULE_NAME = 'shelters'

export default {
  state: {
    loading: false,
    list: []
  },
  actions: {
    [FETCH_SHELTERS]: ({ state, commit, getters }) => {
      if (state.list.length > 0) return

      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .fetchShelters()
        .then(list => {
          commit(SET_LIST, { name: MODULE_NAME, list })
        })
        .catch(throwError(commit, 'Ошибка получения списка приютов (fetchShelters)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_LIST, { name: MODULE_NAME, list: [] })
    }
  }
}
