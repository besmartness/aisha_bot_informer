const {Router} = require('express')
const router = Router()
const Product = require('../model/Product')
const request = require('request')
const bot = require('./bot')
const {Markup} = require('telegraf')
const fs = require('fs')
const upload = require('../middleware/productImg')

const CHANNEL_ID = "-1001412369700"
const MANAGER = "537232926"

router.get('/', (req, res) => {
    try {

        res.render('index')
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})


router.post('/add-product', upload.single('pic'), async (req, res) => {
    try {
        const product = await new Product({
            ...req.body,
            image: `image/${req.file.filename}`
        })

        await product.save()
        
        // --------------------------- BOT SEND MESSAGE TO CHANNEL

        // BUTTON TO REDIRECT USER TO BOT
        const urlButton = Markup.inlineKeyboard([
            Markup.button.url(`Order ${product.title}`, `https://t.me/product_informer_bot?start=${product._id}`)
        ])
        console.log(product._id)
        // MESSAGE TEMPLATE and IMAGE URL
        const message = `Name:\t\t${product.title}\nDescription:\t\t${product.description}\nPrice:\t\t$${product.price}`
        const devImageUrl = `https://wtt-informer-tg-bot.herokuapp.com/${product.image}`
        
        const devurl = `https://api.telegram.org/bot1830575792:AAH67uPufaVYqUYTzM0QAus6ZxmMdvTe408/sendPhoto?chat_id=${CHANNEL_ID}&photo=${devImageUrl}&caption=${message}&reply_markup=${JSON.stringify(urlButton.reply_markup)}`;
        
        // SENDING TEMPLATED MESSAGE
        await request({url: devurl, json: true}, (error, res, body) => {
            if (error) {
                return console.log(error)
            }
            console.log('req sent!')
        })

        res.status(201).json({executed: "Done"})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})


module.exports = router