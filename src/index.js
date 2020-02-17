const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// express config
app.use(express.json())

// Routing=================
app.post('/users', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Listening to this ${port}`)
})