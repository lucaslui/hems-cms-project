var mqtt = require('mqtt')
var client = mqtt.connect('http://localhost:1883', { 
    clientId: "hems_1",
    username: "hems_1",
    password: "hems1020304050"
})

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const generateData = () => {
  return {
    voltage: getRandomArbitrary(115, 130),
    current: getRandomArbitrary(1, 15),
    activePower: getRandomArbitrary(100, 2000),
    reactivePower: getRandomArbitrary(100, 200),
    apparentPower: getRandomArbitrary(200, 3000),
    powerFactor: getRandomArbitrary(0, 1)
  }
}

const publishData = () => {
  const deviceId = '001D129100035E75'
  const timeStamp = new Date().toISOString()
  const measures = generateData()

  const message = [timeStamp, measures.voltage, measures.current, measures.activePower, measures.reactivePower, measures.apparentPower, measures.powerFactor, deviceId]
  const messageString = JSON.stringify([message.map(String)])
  const messageFormated = messageString.replace(/["]/g, '\'')

  if (client.connected==true){
    client.publish('hems/data', messageFormated)
    console.log('Dado enviado para a nuvem:', messageFormated)
  }
}

client.on('connect', () => {
  setInterval(publishData, 1000)
})
