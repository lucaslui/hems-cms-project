export interface IHttpRequest {
  headers?: any
  body?: any
  params?: any
  query?: any
  userId?: string
}

export interface IHttpResponse {
  statusCode: number
  body: any
}
