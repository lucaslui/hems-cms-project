import axios from 'axios'
import { Region } from '@/entities/region'

export default {
  post: {
    regions: async (token: string, region: Region): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/regions`,
        method: 'post',
        headers: { 'x-access-token': token },
        data: region
      })
    )
  },
  get: {
    regions: async (token: string, page?: string): Promise<Region[]> => (
      await axios.request({
        url: `${process.env.API_URL}/regions`,
        method: 'get',
        headers: { 'x-access-token': token },
        params: { page }
      })
    ).data
  },
  put: {
    regions: async (token: string, region: Region): Promise<Region> => await (
      axios.request({
        url: `${process.env.API_URL}/regions/${region.id}`,
        method: 'post',
        headers: { 'x-access-token': token },
        data: region
      })
    )
  },
  delete: {
    regions: async (token: string, regionId: string): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/regions/${regionId}`,
        method: 'delete',
        headers: { 'x-access-token': token }
      })
    )
  }
}
