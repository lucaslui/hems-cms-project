import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  Nav,
  Container,
  Label,
  NavLink
} from 'reactstrap'

import DefaultAvatar from '@/application/presentation/assets/imgs/default-avatar.png'
import AccountContext from '@/application/presentation/contexts/account-context'

import headerRoutes from '@/configuration/routes/header-routes'
import MainLogo from '../main-logo/logo'

type Props = {
  sidebarOpen: boolean
  toggleSidebar: any
}

const Header: React.FC<Props> = (props: Props) => {
  const { setCurrentAccount, getCurrentAccount } = useContext(AccountContext)
  const [collapseOpen, setCollapseOpen] = useState(false)
  const history = useHistory()

  const toggleCollapse = (): void => setCollapseOpen(!collapseOpen)

  const logout = (): void => {
    setCurrentAccount(null)
    history.replace('/')
  }

  const { name, email } = getCurrentAccount()

  return (
    <>
      <Navbar className="navbar-absolute" expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div className={'navbar-toggle d-inline'}>
              <button className="navbar-toggler" type="button" onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <MainLogo></MainLogo>
          </div>

          <button
            className="navbar-toggler"
            aria-expanded={false}
            aria-label="Toggle navigation"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>

          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <div className="d-none d-sm-block text-right">
                <Label className="text-white mt-1" tag="h4"> {name} </Label>
                <Label className="text-white" tag="h5"> {email} </Label>
              </div>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <div className="photo">
                    <img className="w-100 border border-secondary rounded" alt="..." src={DefaultAvatar} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  {headerRoutes?.map((route, key) => {
                    return (
                      <NavLink tag="li" key={key}>
                        <DropdownItem to={`${route.layout}${route.path}`} tag={Link} className="nav-item"> {route.name} </DropdownItem>
                      </NavLink>
                    )
                  })}
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={logout}>
                      Sair
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
