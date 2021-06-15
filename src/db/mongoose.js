const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(data => console.log('Database is working...'))
    .catch(e => console.log(e))