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
app.post('/users', async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })

    try {
        await user.save()
        res.status(201).send(user)

    } catch (error) {
        res.status(400).send(error)
    }

})

// get all user
app.get('/users', async (req, res) => {

    try {
        const result = await User.find({})
        res.status(201).send(result)

    } catch (error) {

        res.status(400).send(error)

    }
    //user fetching all



})

// get single user
app.get('/users/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            res.status(404).send('Cant send the user')
        } else {
            res.status(201).send(user)
        }

    } catch (error) {
        res.status(400).send(error)
    }



})

// Create tasks
app.post('/tasks', async (req, res) => {

    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)

    } catch (error) {

        res.status(400).send(error)

    }



})

// get multiple tasks
app.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find({})
        res.status(201).send(task)

    } catch (error) {

        res.status(400).send(error)

    }



})

//get single task
app.get('/task/:id', async (req, res) => {
    const _id = req.params.id

    try {

        const task = await Task.findById(_id)
        if (!task) {
            res.status(404).send('Cant find the user')
        } else {
            res.status(201).send(task)
        }


    } catch (error) {

        res.status(400).send(error)

    }

})

app.listen(port, () => {
    console.log(`Listening to this ${port}`)
})