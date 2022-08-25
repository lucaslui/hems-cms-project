import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from '@/application/presentation/components/private-route/private-route'
import AccountContext from '@/configuration/contexts/account-context'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './adapters/current-account-adapter'

import pageRoutes from './routes/pages-routes'

const App: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  const getPageRoutes = (routes: any): Route => {
    return routes.map((route, key) => {
      if (route.type === 'public') {
        return (
          <Route
            path={route.path}
            component={route.component}
            key={key}
          />
        )
      } else {
        return (  
          <PrivateRoute 
            path={route.path}
            component={route.component}
            key={key} 
          />
        )
      }
    })
  }

  return (
    <AccountContext.Provider value={state}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/main" />} />
          {getPageRoutes(pageRoutes)}
        </Switch>
      </BrowserRouter>
    </AccountContext.Provider>
  )
}

export default App
