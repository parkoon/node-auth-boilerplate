const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({

    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    author: {

    },
    done: {
        type: Boolean,
        default: false
    },
},


    // If set timestamps, mongoose assigns createdAt and updatedAt fields to your schema
    // https://mongoosejs.com/docs/guide.html#timestamps
    { timestamps: true }

)

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo