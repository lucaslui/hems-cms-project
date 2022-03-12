import { InfluxDB } from '@influxdata/influxdb-client'

export const InfluxHelper = {
  client: null as InfluxDB,
  queryApi: null as any,
  writeApi: null as any,
  url: null as string,
  token: null as string,
  org: null as string,


  async connect (url: string, token: string, org: string): Promise<void> {
    this.url = url
    this.token = token
    this.org = org
    this.client = new InfluxDB({ url, token })
    this.queryApi = this.client.getQueryApi(org)
    this.writeApi = this.client.getWriteApi(org)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }
}
