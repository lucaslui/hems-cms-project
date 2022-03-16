import React from 'react'

import SignUp from '@/application/presentation/pages/signup/signup'

import { makeRemoteAddAccount } from '../../usecases/auth/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
