const { Schema, model } = require('mongoose')


//CODE
const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
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
        image: {
            type: String,
            default: 'https://res.cloudinary.com/bestecommerce/image/upload/v1646973658/default/default_vzrr7n.jpg'
        },
        saved: {
            type: Array,
            default: []
        },
        following: {
            type: Array,
            default: []
        },
        google: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = model('User', UserSchema)
