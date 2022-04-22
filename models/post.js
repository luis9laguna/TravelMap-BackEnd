//REQUIRED
const { Schema, model } = require('mongoose');

//CODE
const PostSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        images: {
            type: Array,
            default: []
        },
        text: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['text', 'image']
        },
        likes: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

module.exports = model('Post', PostSchema);