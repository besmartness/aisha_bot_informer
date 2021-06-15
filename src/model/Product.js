const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // default: 0
    },
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const Product = mongoose.model('products', prodSchema)

module.exports = Product