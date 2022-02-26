
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/software-nuvem-db'
const influx_url = process.env.INFLUX_URL || 'http://localhost:8086'
const token = process.env.TOKEN || 'i_OORQe_PBbaPFpCp75QS_EdqAIM77FJ2QrHo4Op25kzEvggITWHim8ab0OaG5zLIyrShQbvTbwrwq0dpADKgg=='
const org = process.env.ORG || 'hems-org'
const bucket = process.env.BUCKET || 'hems-bucket'

module.exports = {
  mongo_url,
  influx_url,
  token,
  org,
  bucket
}