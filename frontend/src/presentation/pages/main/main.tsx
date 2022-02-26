import React, { useContext, useState } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import Styles from '../../styles/main.scss'
import { filterRoutesByRole, Item, mapToItemArray, RouteModel } from '@/main/routes/sidebar-routes'
import headerRoutes from '@/main/routes/header-routes'
import AccountContext from '../../contexts/account-context'

import { Footer, Header, Sidebar } from '@/presentation/components'

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

  const filteredRoutes: RouteModel[] = filterRoutesByRole(role)
  const mapedRoutes: Item [] = mapToItemArray(filteredRoutes)

  const getRoutes = (routes: any): Route => {
    return routes.map((route, key) => {
      if (route.layout === '/main') {
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
