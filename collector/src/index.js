const express = require('express')
const { InfluxDB, Point } = require('@influxdata/influxdb-client')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')

const { mongo_url, influx_url, token, org, bucket } = require('./env')

const { MongoClient } = mongodb

async function run() {
    const influxClient = new InfluxDB({ url: influx_url, token })
    const writeApi = influxClient.getWriteApi(org, bucket, 'ns')

    const mongoClient = await MongoClient.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const db = mongoClient.db('software-nuvem-db')
    const hemsCollection = db.collection('hems')

    const app = express()
    const port = parseInt(process.env.PORT, 10)

    app.use(express.json())

    app.get('/_health', (req, res) => {
        res.json({ result: 'ok' })
    })

    app.post('/auth', async (req, res) => {
        try {
            const { peer_addr, peer_port, client_id, username, password } = req.body
            console.log(`Pedido de conexão do "${client_id}" através do endereço "${peer_addr}:${peer_port}"`)
            const hems = await hemsCollection.findOne({_id: client_id})
            const isValid = await bcrypt.compare(password, hems.mqttPassword)
            if ((username === hems.mqttUsername) && (isValid)) {
                console.log('Pedido de conexão aprovado!')
                res.json({ result: 'ok' })
            }
            else {
                console.log('Pedido de conexão rejeitado, valores de usuário e senha errados!')
                res.json({ result: { error: "not_allowed" } })
            }
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message })
        }
    })

    app.post('/auth-publish', async (req, res) => {
        try {
            const { client_id, topic } = req.body
            console.log(`Pedido de publicação do "${client_id}" no tópico "${topic}"`)
            const hems = await hemsCollection.findOne({"_id": client_id})
            if (hems.publishACL.some(r => r === topic)) {
                console.log('Pedido de publicação aprovado!')
                res.json({ result: 'ok' })
            }
            else {
                console.log('Pedido de publicação rejeitado, tópico inválido ou não autorizado!')
                res.json({ result: { error: "some error message" } })
            }
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: err.message })
        }
    })

    app.post('/publish', async (req, res) => {
        try {
            const { client_id, topic, payload } = req.body
            const decoded = Buffer.from(payload, 'base64').toString('utf8')
            console.log(`Dados recebidos: ${decoded}`)
            if (topic == 'hems/data') {
                const measures = JSON.parse(decoded.replace(/[']/g, '"'))
                measures.forEach(measure => {
                    const point = new Point('energy')
                    point.tag('hemsId', client_id)
                    point.tag('deviceId', measure[7])
                    point.floatField('voltage', parseFloat(measure[1]))
                    point.floatField('current', parseFloat(measure[2]))
                    point.floatField('activePower', parseFloat(measure[3]))
                    point.floatField('reactivePower', parseFloat(measure[4]))
                    point.floatField('apparentPower', parseFloat(measure[6]))
                    point.floatField('powerFactor', parseFloat(measure[5]))
                    const date = new Date(measure[0])
                    const dateConverted = date.getTime() + (3 * 60 * 60 * 1000);
                    point.timestamp(new Date(dateConverted));
                    writeApi.writePoint(point)
                });
                await writeApi.flush()
                console.log('Dados salvos no banco de dados!')
            } else {
                console.log('Tópico não implementado!')
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
