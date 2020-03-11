const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {

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
router.get('/users', async (req, res) => {

    try {
        const result = await User.find({})
        res.send(result)

    } catch (error) {

        res.status(400).send(error)

    }
})

// get single user
router.get('/users/:id', async (req, res) => {

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

// update user by id
router.patch('/users/:id', async (req, res) => {

    const _id = req.params.id
    // return array dari object
    const updates = Object.keys(req.body)

    const allowedUpdates = ['name', 'email', 'password', 'age']
    // dicek 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {

        const user = await User.findById(_id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if (!user) {
            return res.status(400).send("Cant find the user")
        }

        res.send(user)


    } catch (error) {

        res.status(400).send(error)

    }
})

//update user
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {

        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(404).send({ error: 'Cant find the user' })
        }

        res.status(200).send(user)

    } catch (error) {

        res.status(400).send(error)

    }
})



module.exports = router