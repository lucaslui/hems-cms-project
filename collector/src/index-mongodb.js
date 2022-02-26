const express = require('express')
const mongodb = require('mongodb')

const { MongoClient } = mongodb
const mongoUrl = process.env.MONGO_URL

async function run() {
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = client.db('software-nuvem-db')
  const historyCollection = db.collection('data')

  const app = express()
  const port = parseInt(process.env.PORT, 10)

  app.use(express.json())

  app.get('/_health', (req, res) => {
    res.json({ result: 'ok' })
  })

  app.post('/webhook', async (req, res) => {
    try {
      const { client_id, topic, payload } = req.body
      const decoded = Buffer.from(payload, 'base64').toString('utf8')
      console.log(`Dado recebido no tópico ${topic}: ${decoded}`)
      if (topic == 'hems/data') {
        const devices = JSON.parse(decoded.replace(/[']/g, '"'))
        const devicesMaped = devices.map(measure => {
          return ({
            deviceId: measure[7],
            measures: [{
              timeStamp: new Date(measure[0]),
              voltage: parseFloat(measure[1]),
              current: parseFloat(measure[2]),
              activePower: parseFloat(measure[3]),
              reactivePower: parseFloat(measure[4]),
              apparentPower: parseFloat(measure[6]),
              powerFactor: parseFloat(measure[5])
            }]
          })
        })
        const devicesReduced = devicesMaped.reduce((accumulator, currentValue) => {
          accumulator[currentValue.deviceId]
            ? accumulator[currentValue.deviceId].measures.push(...currentValue.measures)
            : (accumulator[currentValue.deviceId] = { ...currentValue })
          return accumulator;
        }, {});
        const devicesMerged = Object.values(devicesReduced)
        await historyCollection.insertOne({ devices: devicesMerged, hemsId: client_id, time: new Date() })
      }      
      res.json({ result: 'ok' })
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ message: err.message })
    }
  })

  app.listen(port, () => console.info(`Servidor do coletor rodando na porta http://${process.env.HOST}:${port}!`))
}

run()
