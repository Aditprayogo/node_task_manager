const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// connect
require('./db/mongoose')

// model
const User = require('./models/user')
const Task = require('./models/task')

// express config
app.use(express.json())

// Routing=================
// Users
app.post('/users', (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })

    user.save()
        .then(() => {
            res.send(user)
        })
        .catch((err) => {
            res.status(400).send('Something went wrong')
        })

})

// tasks
app.post('/tasks', (req, res) => {

    const task = new Task(req.body)

    task.save()
        .then(() => {
            res.send(task)
        })
        .catch(() => {
            res.status(400).send('Something went wrong')
        })

})

app.listen(port, () => {
    console.log(`Listening to this ${port}`)
})