/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { makeLoginController } from '../../factories/controllers/auth/login-controller-factory'
import { makeSignUpController } from '../../factories/controllers/auth/signup-controller-factory'

const router = Router()

router.post('/login', adaptRoute(makeLoginController()))
router.post('/signup', adaptRoute(makeSignUpController()))

export { router as authRouter }
