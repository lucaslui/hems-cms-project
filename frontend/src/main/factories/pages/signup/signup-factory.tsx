import React from 'react'

import SignUp from '@/presentation/pages/signup/signup'

import { makeRemoteAddAccount } from '../../services/auth/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
