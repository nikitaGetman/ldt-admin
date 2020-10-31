export default function notFound({ to, next }) {
  if (!to.matched.length) {
    return next({ name: 'AnimalsDashboard' })
  }

  return next()
}
