
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

taskSchema.pre('save', async function (next) {

    const task = this

    next()

})

const Task = mongoose.model('Task', taskSchema)


module.exports = Task