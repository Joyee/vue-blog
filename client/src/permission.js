import router from './router'
import store from './store'
import { getPageTitle } from './utils/util'
import Cookies from 'js-cookie'

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)

  const hasToken = Cookies.get('Token')

  if (hasToken) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('getInfo')
          const accessRoutes = await store.dispatch('generateRoutes', roles)

          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (e) {
          // 重新登录
          // 重置token
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {

})