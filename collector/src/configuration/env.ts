export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://user:user1234@localhost:27017/software-nuvem-db',
    influxUrl: process.env.INFLUX_URL || 'http://localhost:8086',
    token: process.env.TOKEN || 'i_OORQe_PBbaPFpCp75QS_EdqAIM77FJ2QrHo4Op25kzEvggITWHim8ab0OaG5zLIyrShQbvTbwrwq0dpADKgg==',
    org: process.env.ORG || 'hems-org',
    bucket: process.env.BUCKET || 'hems-bucket',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '3030',
    jwtSecret: process.env.JWT_SECRET || 'lucas1234',
}