const readline = require('readline');
const mqtt = require('mqtt')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const HEMS_ID = 'hems_1'
const INTERVAL_PER_OUTLET_MS = 5000;

rl.question('Quantidade de tomadas desejada? ', function (userInput) {

    qtdOutlets = parseInt(userInput)

    const INTERVAL_PER_REQUEST_MS = INTERVAL_PER_OUTLET_MS / qtdOutlets

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

    const publishData = (outletNumber) => {
        const outletId = '001D129100035E0' + outletNumber
        const timeStamp = new Date().toISOString()
        const measures = generateData()

        const message = [timeStamp, measures.voltage, measures.current, measures.activePower, measures.reactivePower, measures.apparentPower, measures.powerFactor, outletId]
        const messageString = JSON.stringify([message.map(String)])
        const messageFormated = messageString.replace(/["]/g, '\'')

        if (client.connected == true) {
            client.publish('hems/data', messageFormated)
            console.log(`Controladora: ${HEMS_ID}, Tomada: ${outletId}, Mensagem:', ${messageFormated}`)
        }
    }

    const sendData = (outlet) => {
        let outletToSend = outlet

        if (outlet == qtdOutlets) {
            outletToSend = 0
        }

        publishData(outletToSend)

        setTimeout(() => {
            sendData(outletToSend + 1)
        }, INTERVAL_PER_REQUEST_MS)
    }

    const client = mqtt.connect('http://localhost:1883', {
        clientId: HEMS_ID,
        username: "hems_1",
        password: "hems1234"
    })

    client.on('connect', () => {
        const initialOutlet = 0
        sendData(initialOutlet)
    })
});


