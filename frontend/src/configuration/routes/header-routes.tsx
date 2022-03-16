import ChangePassword from '@/application/presentation/contents/general/change-password'
import Profile from '@/application/presentation/contents/general/profile'

type RouteModel = {
  path: string
  name: string
  component: any
  icon?: string
  layout?: string
}

const headerRoutes: RouteModel[] = [
  {
    path: '/general/profile',
    layout: '/main',
    component: Profile,
    name: 'Perfil'
  },
  {
    path: '/general/change-password',
    layout: '/main',
    component: ChangePassword,
    name: 'Alterar Senha'
  }
]

export default headerRoutes
