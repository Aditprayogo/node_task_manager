const mongoose = require('mongoose')
const validator = require('validator')


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

const User = mongoose.model('User', userSchema)
const Task = mongoose.model('Task', taskSchema)

const person = new User({
    name: '    aditiya prayogo     ',
    email: 'ADIT@GMAIL.COM',
    age: 19,
    password: 'acipahoy123'
})

const work = new Task({
    description: 'Membeli beras',
    completed: true
})

work.save()
    .then(work => console.log(work))
    .catch(err => console.log(err))

// person.save()
//     .then(person => console.log(person))
//     .catch(err => console.log(err))