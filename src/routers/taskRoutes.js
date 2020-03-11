const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {

    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)

    } catch (error) {

        res.status(400).send(error)

    }

})


// update tasks
router.patch('/tasks/:id', async (req, res) => {

    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']

    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidOperation) {

        return res.status(400).send({ error: 'Invalid operation' })
    }

    try {

        const task = await Task.findById(_id)

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        if (!task) {

            return res.status(404).send({ error: 'Cant find the task' })

        } else {

            res.status(200).send(task)
        }



    } catch (e) {

        res.status(404).send(e)

    }
})

// get multiple tasks
router.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find({})
        res.status(201).send(task)

    } catch (error) {

        res.status(400).send(error)

    }



})

//get single task
router.get('/task/:id', async (req, res) => {
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

// deleting the task
router.delete('/tasks/:id', async (req, res) => {

    const _id = req.params.id

    try {

        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            return res.status(404).send({ error: 'Cant find the user' })
        }

        res.status(200).send(task)

    } catch (error) {

        res.status(400).send(error)

    }

})

module.exports = router