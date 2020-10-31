import { throwError } from '@/store/utils'
import { LOADING, LOADED, SET_LIST, UPDATE_PARAMS } from '@/store/mutations/types'
import { LOGOUT } from '@/store/actions/types'

export const FETCH_REQUESTS = 'fetchRequests'

export const MODULE_NAME = 'requests'

export default {
  state: {
    loading: false,
    list: [],
    params: {
      limit: 10,
      offset: 0,
      count: null
    }
  },
  actions: {
    [FETCH_REQUESTS]: ({ state, commit, getters }, searchParams = {}) => {
      const params = { ...state.params, ...searchParams }
      if (params.offset === 0) {
        commit(SET_LIST, { name: MODULE_NAME, list: [] })
      }

      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .fetchRequests(params)
        .then(({ list, count }) => {
          commit(SET_LIST, { name: MODULE_NAME, list: [...state.list, ...list] })
          commit(UPDATE_PARAMS, {
            name: MODULE_NAME,
            params: { offset: params.offset + list.length, count }
          })
        })
        .catch(throwError(commit, 'Ошибка получения списка заявок (fetchRequests)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_LIST, { name: MODULE_NAME, list: [] })
    }
  }
}
