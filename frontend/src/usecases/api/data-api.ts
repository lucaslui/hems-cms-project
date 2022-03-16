import axios from 'axios'
import { Data } from '@/entities/data'

export default {
  get: {
    dataByDeviceId: async (
      token: string,
      deviceId: string,
      params: {
        hemsId?: string
        measureId?: string
        granularity?: string
        startTime?: string
        endType?: string
      }
    ): Promise<Data[]> => (
      await axios.request({
        url: `${process.env.API_URL}/data/${deviceId}`,
        method: 'get',
        params: params,
        headers: { 'x-access-token': token }
      })
    ).data
  }
}
