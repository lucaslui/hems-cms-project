import axios from 'axios'
import { Tariffs } from '../entities/tariffs'

export default {
  get: {
    tariffs: async (token: string): Promise<Tariffs> => (
      await axios.request({
        url: `${process.env.API_URL}/tariff/`,
        method: 'get',
        headers: { 'x-access-token': token }
      })
    ).data
  },
  put: {
    tariffs: async (token: string, tariff: Tariffs): Promise<any> => (
      await axios.request({
        url: `${process.env.API_URL}/tariff/`,
        method: 'put',
        data: tariff,
        headers: { 'x-access-token': token }
      })
    ).data
  }
}
