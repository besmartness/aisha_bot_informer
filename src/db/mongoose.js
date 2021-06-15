const mongoose = require('mongoose')

mongoose
    .connect("mongodb+srv://user:wtt-product@cluster0.005to.mongodb.net/informer-bot", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(data => console.log('Database is working...'))
    .catch(e => console.log(e))