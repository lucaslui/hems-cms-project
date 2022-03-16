import Role from '@/application/presentation/enums/role-type'
// admin imports
import AdminControllers from '@/application/presentation/contents/admin/controllers'
import AdminDashboard from '@/application/presentation/contents/admin/dashboard'
import AdminDevices from '@/application/presentation/contents/admin/devices'
import AdminRegions from '@/application/presentation/contents/admin/regions'
import AdminReports from '@/application/presentation/contents/admin/reports'
import AdminSystem from '@/application/presentation/contents/admin/system'
import AdminUsers from '@/application/presentation/contents/admin/users'
import AdminSetUserController from '@/application/presentation/contents/admin/set-user-controller'
// customer imports
import CustomerAlerts from '@/application/presentation/contents/customer/alerts'
import CustomerRooms from '@/application/presentation/contents/customer/rooms'
import CustomerDashboard from '@/application/presentation/contents/customer/dashboard'
import CustomerDevices from '@/application/presentation/contents/customer/devices'
// general imports
import GeneralEmptyFeature from '@/application/presentation/contents/general/empty-feature'
import { IconType } from 'react-icons'
import Icons from '@/application/presentation/components/icons/Icons'
import Tariffs from '@/application/presentation/contents/admin/tariffs'

type Item = {
  type: 'item'
  path: string
  name: string
  icon: IconType
  component: any
  layout?: string
  permissions: Role[]
}

type MyNav = {
  type: 'nav'
  name: string
  icon: IconType
  opened: boolean
  subItems: Item[]
  permissions: Role[]
}

const INITIAL_OPENED = true

type RouteModel = Item | MyNav

const customerSidebarRoutes: RouteModel[] = [
  {
    type: 'item',
    path: '/customer/dashboard',
    layout: '/main',
    component: CustomerDashboard,
    name: 'Dashboard',
    icon: Icons.ChartBar,
    permissions: ['customer']
  },
  {
    type: 'nav',
    name: 'Management',
    icon: Icons.Desktop,
    opened: INITIAL_OPENED,
    subItems: [
      {
        type: 'item',
        path: '/customer/management/devices',
        layout: '/main',
        component: CustomerDevices,
        name: 'Outlets',
        icon: Icons.Outlet,
        permissions: ['customer']
      },
      {
        type: 'item',
        path: '/customer/management/rooms',
        layout: '/main',
        component: CustomerRooms,
        name: 'Rooms',
        icon: Icons.Bed,
        permissions: ['customer']
      }
    ],
    permissions: ['customer']
  },
  {
    type: 'nav',
    name: 'Statistics',
    icon: Icons.ChartArea,
    opened: INITIAL_OPENED,
    subItems: [
      {
        type: 'item',
        path: '/customer/statistics/devices',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'By Outlet',
        icon: Icons.Outlet,
        permissions: ['customer']
      },
      {
        type: 'item',
        path: '/customer/statistics/rooms',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'By Room',
        icon: Icons.Bed,
        permissions: ['customer']
      },
      {
        type: 'item',
        path: '/customer/statistics/tariff-post',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'By Tariff Post',
        icon: Icons.Tariff,
        permissions: ['customer']
      },
      {
        type: 'item',
        path: '/customer/statistics/power-generation',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'Of Generation',
        icon: Icons.SolarPanel,
        permissions: ['customer']
      }
    ],
    permissions: ['customer']
  },
  {
    type: 'item',
    path: '/customer/alerts',
    layout: '/main',
    component: CustomerAlerts,
    name: 'Alerts',
    icon: Icons.Bell,
    permissions: ['customer']
  },
  {
    type: 'item',
    path: '/customer/reports',
    layout: '/main',
    component: GeneralEmptyFeature,
    name: 'Reports',
    icon: Icons.Report,
    permissions: ['customer']
  },
  {
    type: 'item',
    path: '/customer/settings',
    layout: '/main',
    component: GeneralEmptyFeature,
    name: 'Settings',
    icon: Icons.Setting,
    permissions: ['customer']
  }
]

const adminSidebarRoutes: RouteModel[] = [
  {
    type: 'item',
    path: '/admin/dashboard',
    layout: '/main',
    component: AdminDashboard,
    name: 'Dashboard',
    icon: Icons.ChartBar,
    permissions: ['admin']
  },
  {
    type: 'nav',
    name: 'Management',
    icon: Icons.Desktop,
    opened: INITIAL_OPENED,
    subItems: [
      {
        type: 'item',
        path: '/admin/regions',
        layout: '/main',
        component: AdminRegions,
        name: 'Regions',
        icon: Icons.Regions,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/controllers',
        layout: '/main',
        component: AdminControllers,
        name: 'Controllers',
        icon: Icons.Controller,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/management/devices',
        layout: '/main',
        component: AdminDevices,
        name: 'Outlets',
        icon: Icons.Outlet,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/users',
        layout: '/main',
        component: AdminUsers,
        name: 'Users',
        icon: Icons.Users,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/set-user-controller',
        layout: '/main',
        component: AdminSetUserController,
        name: 'User / Controller',
        icon: Icons.UserController,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/notifications',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'Notifications',
        icon: Icons.Notification,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/tariffs',
        layout: '/main',
        component: Tariffs,
        name: 'Tarifas',
        icon: Icons.Money,
        permissions: ['admin']
      }
    ],
    permissions: ['admin']
  },
  {
    type: 'nav',
    name: 'System Management',
    icon: Icons.System,
    opened: INITIAL_OPENED,
    subItems: [
      {
        type: 'item',
        path: '/admin/system/communication',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'Communication',
        icon: Icons.Communication,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/system/storage',
        layout: '/main',
        component: AdminSystem,
        name: 'Storage',
        icon: Icons.Database,
        permissions: ['admin']
      }
    ],
    permissions: ['admin']
  },
  {
    type: 'nav',
    name: 'Statistics',
    icon: Icons.ChartArea,
    opened: INITIAL_OPENED,
    subItems: [
      {
        type: 'item',
        path: '/admin/statisics/consumption-region',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'By region',
        icon: Icons.Regions,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/statisics/consumption-equipment-type',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'By equipment type',
        icon: Icons.EquipmentType,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/statisics/consumption-room-type',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'By room type',
        icon: Icons.Bed,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/statisics/consumption-tariff-post',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'Per tariff post',
        icon: Icons.Tariff,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/statisics/power-factor-equipment-type',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'Of power factor',
        icon: Icons.PowerFactor,
        permissions: ['admin']
      },
      {
        type: 'item',
        path: '/admin/statisics/generation-provided',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'of generation',
        icon: Icons.SolarPanel,
        permissions: ['admin']
      }
    ],
    permissions: ['admin']
  },
  {
    type: 'nav',
    name: 'Alerts',
    icon: Icons.ChartArea,
    opened: INITIAL_OPENED,
    subItems: [
      {
        type: 'item',
        path: '/admin/alerts/power-factor-region',
        layout: '/main',
        component: GeneralEmptyFeature,
        name: 'Power factor',
        icon: Icons.PowerFactor,
        permissions: ['admin']
      }
    ],
    permissions: ['admin']
  },
  {
    type: 'item',
    path: '/admin/geolocation',
    layout: '/main',
    component: GeneralEmptyFeature,
    name: 'Geolocation',
    icon: Icons.Geolocation,
    permissions: ['admin']
  },
  {
    type: 'item',
    path: '/admin/reports',
    layout: '/main',
    component: AdminReports,
    name: 'Reports',
    icon: Icons.Report,
    permissions: ['admin']
  },
  {
    type: 'item',
    path: '/admin/settings',
    layout: '/main',
    component: GeneralEmptyFeature,
    name: 'Settings',
    icon: Icons.Setting,
    permissions: ['admin']
  }
]

const sidebarRoutes: RouteModel[] =
  customerSidebarRoutes.concat(adminSidebarRoutes)

const filterRoutesByRole = (permission: Role): RouteModel[] => {
  const filteredOneLevel = sidebarRoutes.filter(
    routeModel => routeModel.permissions.some(
      p => p === permission
    )
  )

  const filteredTwoLevels = filteredOneLevel.map(routeModel => {
    if (routeModel.type === 'item') {
      return routeModel
    } else {
      return {
        ...routeModel,
        subItems: routeModel.subItems.filter(item =>
          item.permissions.some(p => p === permission))
      }
    }
  })

  return filteredTwoLevels
}

const mapToItemArray = (routes: RouteModel[]): Item[] => {
  const rootItems: Item[] = []
  sidebarRoutes.forEach(routeModel => {
    if (routeModel.type === 'item') rootItems.push(routeModel)
  })

  const rootNavs: MyNav[] = []
  sidebarRoutes.forEach(routeModel => {
    if (routeModel.type === 'nav') rootNavs.push(routeModel)
  })

  const subItems: Item[] = []
  rootNavs.forEach(nav => nav.subItems
    .forEach(item => subItems.push(item)))

  return rootItems.concat(subItems)
}

export { mapToItemArray, sidebarRoutes, filterRoutesByRole, RouteModel, MyNav, Item }
