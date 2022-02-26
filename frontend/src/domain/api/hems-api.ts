import axios from 'axios'
import { Hems } from '@/domain/entities/hems'

export default {
  post: {
    hems: async (token: string, hems: Hems): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/hems`,
        method: 'post',
        headers: { 'x-access-token': token },
        data: hems
      })
    )
  },
  get: {
    hems: async (token: string, regionId?: string, page?: string): Promise<Hems[]> => (
      await axios.request({
        url: `${process.env.API_URL}/hems`,
        method: 'get',
        headers: { 'x-access-token': token },
        params: { regionId, page }
      })
    ).data
  },
  put: {
    hems: async (token: string, hems: Hems): Promise<Hems> => await (
      axios.request({
        url: `${process.env.API_URL}/hems/${hems.id}`,
        method: 'post',
        headers: { 'x-access-token': token },
        data: hems
      })
    )
  },
  delete: {
    hems: async (token: string, hemsId: string): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/hems/${hemsId}`,
        method: 'delete',
        headers: { 'x-access-token': token }
      })
    )
  }
}
