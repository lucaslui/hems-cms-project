import express from 'express'
import setupMiddlewares from './webserver/middlewares'
import setupRoutes from './webserver/routes'

const app = express()

setupMiddlewares(app)
setupRoutes(app)

export default app
