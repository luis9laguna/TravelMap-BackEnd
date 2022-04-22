//REQUIRED
const Post = require('../models/post');
const Comment = require('../models/comment');

//CODE

//GIVE POST A LIKE OR DISLIKE
const postLikeAndDislike = async (req, res) => {
    try {

        //GET USER CODE
        const userId = req.id;

        //GET POST
        const id = req.params.id;
        const post = await Post.findById(id);

        //LOOKING FOR LIKE
        const like = post.likes.includes(userId)
        if (like) post.likes.remove(userId)
        else post.likes.push(userId)

        //SAVE
        post.save()

        res.json({
            ok: true,
            post
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        });
    }
}

//GIVE COMMENT LIKE OR DISLIKE
const commentLikeAndDislike = async (req, res) => {
    try {

        //GET USER CODE
        const userId = req.id;

        //GET POST
        const id = req.params.id;
        const comment = await Comment.findById(id);

        //LOOKING FOR LIKE
        const like = comment.likes.includes(userId)
        if (like) comment.likes.remove(userId)
        else comment.likes.push(userId)

        //SAVE
        comment.save()

        res.json({
            ok: true,
            comment
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        });
    }
}



module.exports = {
    postLikeAndDislike,
    commentLikeAndDislike
}