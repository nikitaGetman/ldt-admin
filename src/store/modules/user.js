import { saveStorageItem, loadStorageItem, removeStorageItem } from '@/utils/common'
import { throwError } from '@/store/utils'
import { LOADING, LOADED, SET_MODEL, UPDATE_MODEL } from '@/store/mutations/types'
import { LOGOUT } from '@/store/actions/types'

export const LOGIN = 'login'
export const FETCH_PROFILE = 'fetchProfile'

export const MODULE_NAME = 'user'

export const TOKEN_KEY = 'auth_token'

export default {
  state: {
    loading: false,
    model: {
      access: loadStorageItem(TOKEN_KEY) || null
    }
  },
  getters: {
    isAuthenticated: state => {
      return !!(state.model || {}).access
    },
    isProfileLoaded: state => {
      return !!(state.model || {}).name
    },
    headers: (state, { isAuthenticated }) => {
      if (!isAuthenticated) return {}

      return {
        Authorization: 'Bearer ' + state.model.access
      }
    },
    isDzhkh: state => {
      return state.model.access === '1'
    },
    isPrefecture: state => {
      return state.model.access === '2'
    },
    isExploiting: state => {
      return state.model.access === '3'
    },
    isShelter: state => {
      return state.model.access === '4'
    }
  },
  actions: {
    [LOGIN]: ({ commit, getters }, { login, password }) => {
      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .auth({ login, password })
        .then(model => {
          commit(SET_MODEL, { name: MODULE_NAME, model })
          saveStorageItem(TOKEN_KEY, login)
        })
        .catch(throwError(commit, 'Ошибка входа (login)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [FETCH_PROFILE]: ({ state, commit, getters }) => {
      commit(LOADING, MODULE_NAME)
      return getters.apiService
        .fetchProfile()
        .then(model => {
          const userNames = ['ДЖКХ', 'Префектура', 'Управляющая компания', 'Приют']
          commit(UPDATE_MODEL, {
            name: MODULE_NAME,
            model: { ...model, name: userNames[parseInt(state.model.access) - 1] }
          })
        })
        .catch(throwError(commit, 'Ошибка получения профиля (fetchProfile)'))
        .finally(() => commit(LOADED, MODULE_NAME))
    },
    [LOGOUT]: ({ commit }) => {
      commit(SET_MODEL, { name: MODULE_NAME, model: {} })
      removeStorageItem(TOKEN_KEY)
    }
  }
}
