import { makeLogin } from '../factories/pages/login/login-factory'
import { makeMain } from '../factories/pages/main/main-factory'
import { makeSignUp } from '../factories/pages/signup/signup-factory'

export type PageRouteModel = {
  path: string
  type: 'public' | 'private'
  component: React.FC
}

const pageRoutes: PageRouteModel[] = [
  {
    path: '/login',
    type: 'public',
    component: makeLogin
  },
  {
    path: '/signup',
    type: 'public',
    component: makeSignUp
  },
  {
    path: '/main',
    type: 'private',
    component: makeMain
  }
]

export default pageRoutes
