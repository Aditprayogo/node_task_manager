const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// task schema validation
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

const Task = mongoose.model('Task', taskSchema)


// work.save()
//     .then(work => console.log(work))
//     .catch(err => console.log(err))

// person.save()
//     .then(person => console.log(person))
//     .catch(err => console.log(err))