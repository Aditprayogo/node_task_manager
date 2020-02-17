const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})




// work.save()
//     .then(work => console.log(work))
//     .catch(err => console.log(err))

// person.save()
//     .then(person => console.log(person))
//     .catch(err => console.log(err))