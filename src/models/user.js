const mongoose = require('mongoose')
const validator = require('validator')


// user schema validation
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(val) {
            if (val.toLowerCase().includes('password')) {

                throw new Error('Please set password to another')

            }
        }
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User