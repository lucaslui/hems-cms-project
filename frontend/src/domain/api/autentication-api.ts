import axios from 'axios'
import { Autentication } from '@/domain/entities/autentication'

export default {
  post: {
    login: async ({ email, password }: Autentication): Promise<Autentication> => await (
      axios.request({
        url: `${process.env.API_URL}/login`,
        method: 'post',
        data: { email, password }
      })
    ),
    signup: async ({ name, email, password, passwordConfirmation }: Autentication): Promise<Autentication> => await (
      axios.request({
        url: `${process.env.API_URL}/signup`,
        method: 'post',
        data: { name, email, password, passwordConfirmation }
      })
    )
  }
}
