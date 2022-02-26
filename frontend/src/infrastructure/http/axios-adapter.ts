
import { HttpClient, HttpRequest, HttpResponse } from '@/application/boundaries/output/http/http-client'

import axios, { AxiosResponse } from 'axios'

export class AxiosAdapter implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
