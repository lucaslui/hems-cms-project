import { Express } from 'express'

import { makeHemsAuthenticateController } from '../factories/hems-authenticate-controller-factory'
import { makeHemsSaveDataController } from '../factories/hems-save-data-controller-factory'
import { makeHemsTopicAuthorizeController } from '../factories/hems-topic-authorize-controller-factory'

import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'

export default (app: Express): void => {
    app.post('/auth', adaptRoute(makeHemsAuthenticateController()))
    app.post('/auth-publish', adaptRoute(makeHemsTopicAuthorizeController()))
    app.post('/publish', adaptRoute(makeHemsSaveDataController()))
    app.get('/_health', (req, res) => { res.json({ result: 'ok' })})
}
