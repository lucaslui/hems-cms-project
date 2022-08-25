import { SidebarRouteModel, Category } from '@/configuration/routes/sidebar-content-routes'
import React, { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Collapse } from 'reactstrap'

type Props = {
  routes: SidebarRouteModel[]
  toggleSidebar: any
}

const Sidebar: React.FC<Props> = (props: Props) => {
  const [routes, setRoutes] = useState(props.routes)

  const activeRoute = useCallback((routeName): string => {
    return location.pathname.includes(routeName) ? 'active' : ''
  }, [])

  const setCollapse = useCallback((key): void => {
    console.log('collapse')
    setRoutes(routes.map((route, k) => k === key ? { ...route, opened: !(route as Category).opened } : route))
  }, [routes])

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <Nav>
          {routes.map((route, key) => {
            if (route.type === 'category') {
              return (
                <div key={key}>
                  <li className="mt-0">
                    <NavLink
                      to="#"
                      className="nav-link"
                      onClick={() => setCollapse(key)}
                    >
                      <i><route.icon className="react-icons"/></i>
                      <p>{route.name}</p>
                      <i className={'collapse-icon ' + (route.opened ? 'fas fa-caret-down' : 'fas fa-caret-right')}></i>
                    </NavLink>
                  </li>
                  <Collapse isOpen={route.opened}>
                    <ul className="sub-nav pl-4">
                      {
                        route.subItems.map((subroute, subkey) => (
                          <li key={subkey} className={activeRoute(subroute.path)}>
                              <NavLink
                                to={`${subroute.layout}${subroute.path}`}
                                className="nav-link"
                              >
                                <i><subroute.icon className="react-icons"/></i>
                                <p>{subroute.name}</p>
                              </NavLink>
                          </li>
                        ))
                      }
                    </ul>
                  </Collapse>
                </div>
              )
            } else {
              return (
                <li className={activeRoute(route.path)} key={key}>
                  <NavLink
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    to={`${route.layout}${route.path}`}
                    className="nav-link"
                    activeClassName="active"
                    onClick={props.toggleSidebar}
                  >
                    <route.icon className="react-icons"/>
                    <p>{route.name}</p>
                  </NavLink>
                </li>
              )
            }
          })}
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar
