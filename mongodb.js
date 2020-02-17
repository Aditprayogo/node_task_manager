const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'task-manager';


// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

    assert.equal(null, err);

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // insertUsers(db).then((result) => {
    //     console.log(result)
    // })

    updateUser(db)
        .then((result) => {

            client.close()

        })
        .catch(error => console.log(error))

    // findTasks(db)

    // insertTasks(db).then((result) => {
    //     console.log(result)
    // })

    // deleteUser(db, () => {
    //     client.close()
    // })

});

const updateUser = async (db) => {
    const collection = db.collection('task')

    try {
        const result = await collection.updateMany(
            {
                completed: false,
            },
            {
                $set: {
                    completed: true
                }
            }
        );

        return result;

    } catch (error) {
        console.log(error)
    }

}



const insertUsers = async (db) => {
    // Get the documents collection
    const collection = db.collection('users');
    // Insert some documents

    try {
        const result = collection.insertMany([
            {
                name: 'admin',
                age: 21
            },
            {
                name: 'galer',
                age: 22
            }
        ])

        return result;

    } catch (error) {
        console.log(error)
    }

}

const insertTasks = async (db) => {
    const collection = db.collection('task')

    try {
        const result = collection.insertMany([
            {
                task: 'Beli Wortel',
                completed: false
            },
            {
                task: 'Beli naget',
                completed: false
            },
            {
                task: 'Beli sayur',
                completed: true
            },
            {
                task: 'Beli mie',
                completed: false
            }
        ])

        return result

    } catch (error) {

        console.log(error)

    }

}

const deleteUser = (db, callback) => {

    const collection = db.collection('users');

    collection.deleteMany({

        name: 'juan'

    }, (err, result) => {

        callback(result)
    })

}

const findTasks = (db) => {

    const collection = db.collection('task');

    collection.find({ completed: false }).toArray((err, task) => {
        if (err) {
            return console.log(err)
        }

        console.log(task)
    })
}