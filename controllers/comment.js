//REQUIRED
const Post = require('../models/post')
const Comment = require('../models/comment')

//CODE


//GET ALL THE COMENTS OF A POST
const getAllByPost = async (req, res) => {
    try {
        const postId = req.params.id
        const comments = await Comment.find({ post: postId })

        if (!comments) {
            res.status(404).json({
                ok: false,
                message: 'No Comment found.'
            })
        }

        res.json({
            ok: true,
            comments
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error Unexpected, check logs'
        })
    }
}

//CREATE COMMENT
const createComment = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.id
        const { text } = req.body

        let comment = new Comment()

        comment.text = text
        comment.post = postId
        comment.user = userId

        await comment.save()

        res.json({
            ok: true,
            comment
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error Unexpected, check logs'
        })
    }
}

//EDIT COMMENT
const editComment = async (req, res) => {
    try {
        const userId = req.id
        const commentId = req.params.id
        const { text } = req.body
        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(404).json({
                ok: false,
                message: 'Message not found'
            });
        }
        if (userId !== comment.user.toString()) {
            return res.status(403).json({
                ok: false,
                message: 'You cant edit this comment!'
            });
        }

        //UPDATE
        const commentUpdate = await Comment.findByIdAndUpdate(commentId, { text }, { new: true })

        res.json({
            ok: true,
            commentUpdate
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error Unexpected, check logs'
        })
    }
}

//DELETE COMMENT
const deleteComment = async (req, res) => {
    try {
        const userId = req.id
        const commentId = req.params.id
        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(404).json({
                ok: false,
                message: 'Message not found'
            });
        }

        if (userId !== comment.user.toString()) {
            return res.status(403).json({
                ok: false,
                message: 'You cant delete this comment!'
            });
        }

        //DELETE
        await Comment.findByIdAndDelete(commentId)

        res.json({
            ok: true,
            message: 'Comment deleted',
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error Unexpected, check logs'
        })
    }
}


module.exports = {
    getAllByPost,
    createComment,
    editComment,
    deleteComment
}