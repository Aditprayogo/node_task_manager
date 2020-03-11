const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// connect
require('./db/mongoose')

// express config
app.use(express.json())

//router file for user
const userRoutes = require('./routers/userRoutes')
const taskRoutes = require('./routers/taskRoutes')

app.use(userRoutes)
app.use(taskRoutes)

app.listen(port, () => {
    console.log(`Listening to this ${port}`)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {

}

myFunction()