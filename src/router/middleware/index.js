import notFound from './notFound'
import auth from './auth'
import notAuth from './notAuth'
import logout from './logout'

function createMiddlewarePipeline(context, middleware) {
  if (!middleware.length) {
    return context.next
  }

  const nextMiddleware = middleware[0]
  const restMiddleware = middleware.slice(1)

  return redirectRoute => {
    if (redirectRoute !== undefined) {
      context.next(redirectRoute)
    } else {
      const nextPipeline = createMiddlewarePipeline(context, restMiddleware)
      nextMiddleware({ ...context, next: nextPipeline })
    }
  }
}

export { notFound, auth, notAuth, logout, createMiddlewarePipeline }
