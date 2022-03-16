import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { makeLogin } from '../factories/pages/login/login-factory'
import { makeSignUp } from '../factories/pages/signup/signup-factory'

import PrivateRoute from '@/application/presentation/components/private-route/private-route'
import AccountContext from '@/application/presentation/contexts/account-context'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'

import Main from '@/application/presentation/pages/main/main'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }
  return (
    <AccountContext.Provider value={state}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/main" />} />
          <Route path="/login" component={makeLogin} />
          <Route path="/signup" component={makeSignUp} />
          <PrivateRoute path="/main" component={Main} />
        </Switch>
      </BrowserRouter>
    </AccountContext.Provider>
  )
}

export default Router
