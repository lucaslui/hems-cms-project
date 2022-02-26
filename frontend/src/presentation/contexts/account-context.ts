import { AccountModel } from '@/domain/entities/account'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

const AccountContext = createContext<Props>(null)

export default AccountContext
