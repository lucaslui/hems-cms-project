export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/software-nuvem-db',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'local_secret',
  url: process.env.INFLUX_URL || 'http://localhost:8086',
  token: process.env.INFLUX_TOKEN || 'i_OORQe_PBbaPFpCp75QS_EdqAIM77FJ2QrHo4Op25kzEvggITWHim8ab0OaG5zLIyrShQbvTbwrwq0dpADKgg==',
  org: process.env.INFLUX_ORG || 'hems-org',
  bucket: process.env.INFLUX_BUCKET || 'hems-bucket'
}
