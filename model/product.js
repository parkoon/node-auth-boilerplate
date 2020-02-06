const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
},


    // If set timestamps, mongoose assigns createdAt and updatedAt fields to your schema
    // https://mongoosejs.com/docs/guide.html#timestamps
    { timestamps: true }

)

const Product = mongoose.model('Product', productSchema)

module.exports = Product