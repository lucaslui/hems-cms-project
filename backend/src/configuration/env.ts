export default {
  mongoUrl: process.env.MONGO_URL,
  host: process.env.HOST,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  influxUrl: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN,
  org: process.env.INFLUX_ORG,
  bucket: process.env.INFLUX_BUCKET
}
