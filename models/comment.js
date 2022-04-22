//REQUIRED
const { Schema, model } = require('mongoose');

//CODE
const CommentSchema = Schema(
    {
        text: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        likes: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

module.exports = model('Comment', CommentSchema);