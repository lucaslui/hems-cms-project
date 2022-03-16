import React from 'react'

import Login from '@/application/presentation/pages/login/login'

import { makeRemoteAuthentication } from '../../usecases/auth/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
