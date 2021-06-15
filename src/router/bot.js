const {Telegraf, Extra, Markup} = require('telegraf')
const Product = require('../model/Product')

const bot = new Telegraf("1830575792:AAH67uPufaVYqUYTzM0QAus6ZxmMdvTe408")
const MANAGER = "537232926"

bot.start(async ctx => {
        // SEARCH according to what user clicked
        const product = await Product.findOne({_id: ctx.startPayload})
        
        // sending to user choosen product
        const message = `Name:\t\t${product.title}\nDescription:\t\t${product.description}\nPrice:\t\t$${product.price}`

        await ctx.replyWithPhoto(`https://wtt-informer-tg-bot.herokuapp.com/${product.image}`, {
            caption: message,
            reply_markup: {}
        })

        ctx.reply('Leave your name and contacts (in 1 message) in order to our manager can contact you soon! (E.g.: Sardor Aliyev, +998 98 998 98 98)')

        // after user entering data, bot replies
        bot.on('text', async ctx => {
            if (ctx.update.message.from.first_name) {
                ctx.reply(`${ctx.update.message.from.first_name}!\nYour data is saved! Soon out manager will contact you!`)
                await ctx.telegram.sendPhoto(MANAGER, `https://wtt-informer-tg-bot.herokuapp.com/${product.image}`, {caption: message})
                ctx.telegram.sendMessage(MANAGER, 'Client: ' + ctx.update.message.text + '\n----- ----- ----- ----- ----- ----- ----- -----')
            } else {
                ctx.reply(`Your data is saved! Soon out manager will contact you!`)
                await ctx.telegram.sendPhoto(MANAGER, `https://wtt-informer-tg-bot.herokuapp.com/${product.image}`, {caption: message})
                ctx.telegram.sendMessage(MANAGER, 'Client: ' + ctx.update.message.text + '\n----- ----- ----- ----- ----- ----- ----- -----')
            }
        })
})
    .catch(e => console.log(e))





module.exports = bot