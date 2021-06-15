const express = require('express')
require('./db/mongoose')
const path = require('path')

const bot = require('./router/bot')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const assets = path.join(__dirname, '../assets')
const views = path.join(__dirname, '../templates')

app.set('view engine', 'ejs')
app.set('views', views)
app.use(express.static(assets))

app.use(require('./router/product'))

bot.launch()
app.listen(PORT, () => console.log(`Application is on port:${PORT}`))