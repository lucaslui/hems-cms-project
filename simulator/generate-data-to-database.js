const { InfluxDB, Point } = require('@influxdata/influxdb-client')

const url = 'http://localhost:8086'
const token = 'i_OORQe_PBbaPFpCp75QS_EdqAIM77FJ2QrHo4Op25kzEvggITWHim8ab0OaG5zLIyrShQbvTbwrwq0dpADKgg=='
const org = 'hems-org'
const bucket = 'hems-bucket'

const client = new InfluxDB({ url, token })
const writeApi = client.getWriteApi(org, bucket, 'ns')

const SECONDS = 1000;
const MINUTES = 60 * SECONDS

const TOTAL_TIME_RUNNING = 60 * MINUTES
const OUTLET_INTERVAL = 5 * SECONDS
const QTD_OUTLETS = 100


const calculateInterval = (qtdOutlets, outletInterval) => {
  return Math.round(outletInterval / qtdOutlets)
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const writePoint = (deviceNumber) => {
  const point = new Point('energy')
    .tag('hemsId', 'hems_1')
    .tag('deviceId', '0113230320' + deviceNumber)
    .floatField('voltage', getRandomArbitrary(115, 130))
    .floatField('current', getRandomArbitrary(1, 15))
    .floatField('activePower', getRandomArbitrary(100, 2000))
    .floatField('reactivePower', getRandomArbitrary(100, 200))
    .floatField('apparentPower', getRandomArbitrary(200, 3000))
    .floatField('powerFactor', getRandomArbitrary(0, 1))

  writeApi.writePoint(point)

  writeApi.flush()
    .then(() => { })
    .catch(e => console.error(e))
}

// start the sending data
var deviceNumber = 0;
var refreshIntervalId = setInterval(() => {
    if (deviceNumber === QTD_OUTLETS){
    	deviceNumber = 0
    }
    
    writePoint(deviceNumber)
    
    deviceNumber ++
   
}, calculateInterval(QTD_OUTLETS, OUTLET_INTERVAL))

// stop the sending data after some time
setTimeout(() => {
  clearInterval(refreshIntervalId)
  console.log("programa finalizado")
}, TOTAL_TIME_RUNNING)
