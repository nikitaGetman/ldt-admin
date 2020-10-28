import { LOGOUT } from '@/store/actions/types'

export default function auth({ next, store }) {
  store.dispatch(LOGOUT)
  return next({ name: 'login' })
}
