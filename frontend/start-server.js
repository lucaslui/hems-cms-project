const fallback = require('express-history-api-fallback')
const express = require('express')
const path = require('path')

const app = express()
const root = path.join(__dirname, 'dist')

app.use(express.static(root))
app.use(fallback('index.html', { root }))

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3030

app.listen(port, host,
  () => console.log(`Servidor de arquivos estátiscos rodando em http://${host}:${port}!`)
)
