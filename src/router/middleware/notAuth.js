export default function notAuth({ from, next, store }) {
  const { isAuthenticated } = store.getters

  if (!isAuthenticated) {
    return next()
  }

  return next(from)
}
