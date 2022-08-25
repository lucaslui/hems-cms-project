import React, { useContext, useState } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import Styles from '../../styles/main.scss'
import { filterRoutesByRole, Item, mapToItemArray, SidebarRouteModel } from '@/configuration/routes/sidebar-content-routes'
import headerRoutes from '@/configuration/routes/header-content-routes'
import AccountContext from '../../../../configuration/contexts/account-context'

import { Footer, Header, Sidebar } from '@/application/presentation/components'

const Main: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)
  const { role } = getCurrentAccount()

  const [sidebarOpen, setSidebarOpen] = useState(
    document.documentElement.className.includes('nav-open')
  )

  const { path, url } = useRouteMatch()

  const toggleSidebar = (): void => {
    document.documentElement.classList.toggle('nav-open')
    setSidebarOpen(!sidebarOpen)
  }

  const filteredRoutes: SidebarRouteModel[] = filterRoutesByRole(role)
  const mapedRoutes: Item [] = mapToItemArray(filteredRoutes)

  const getRoutes = (routes: any): Route => {
    return routes.map((route, key) => {
      if (route.type === 'item') {
        return (
          <Route
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            path={`${path}${route.path}`}
            component={route.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  return (
    <div className={Styles.wrapper}>
      <Sidebar routes={filteredRoutes} toggleSidebar={toggleSidebar} />
      <div className="main-panel">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <Switch>
          <Route path={path} exact component={() => <Redirect to={`${url}/${role}/dashboard`} />} />
          {getRoutes(mapedRoutes)}
          {getRoutes(headerRoutes)}
        </Switch>
        <Footer />
      </div>
    </div>
  )
}

export default Main
