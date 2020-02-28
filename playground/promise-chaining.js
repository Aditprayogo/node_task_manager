require('../src/db/mongoose');

const Task = require('../src/models/task')

const removeTaskById = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const countCompleted = await Task.countDocuments({ completed: true })

    return { task, countCompleted }
}

removeTaskById('5e4a2f2f773cd12284f6af1d')
    .then((result) => console.log(result))
    .catch((e) => console.log(e))