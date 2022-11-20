const { Schema, model } = require('mongoose')


//CODE
const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        google: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = model('User', UserSchema)
