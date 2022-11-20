//REQUIRED
const { Schema, model } = require('mongoose');

//CODE
const PostSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        likes: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

module.exports = model('Pin', PostSchema);