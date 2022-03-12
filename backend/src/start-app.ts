import 'module-alias/register'

import { MongoHelper } from './infrastructure/repositories/mongodb/mongo-helper'
import { InfluxHelper } from './infrastructure/repositories/influxdb/influx-helper'

import env from './configuration/env'

(async () => {
  await MongoHelper.connect(env.mongoUrl)
  console.info('Conexão com o mongodb foi um sucesso!')
  await InfluxHelper.connect(env.influxUrl, env.token, env.org)
  console.info('Conexão com o influxdb foi um sucesso!')
  const app = (await import('./configuration/app')).default
  app.set('port', env.port)
  app.listen(app.get('port'), env.host, () => console.info(`Servidor do backend rodando em http://${env.host}:${env.port}`))
})().catch(error => { console.log(error) })
