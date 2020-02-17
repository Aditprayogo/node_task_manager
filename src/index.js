const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// connect
require('./db/mongoose')

// model
const User = require('./models/user')

// express config
app.use(express.json())

// Routing=================
app.post('/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })
    user.save()
    res.send('The User has been created')
})

app.listen(port, () => {
    console.log(`Listening to this ${port}`)
})