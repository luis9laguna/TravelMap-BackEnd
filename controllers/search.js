//REQUIRED
const Post = require('../models/post');
const User = require('../models/user');

//CODE

//SEARCH
const searchPost = async (req, res) => {

    try {
        //TERM AND REGEX
        const term = req.params.term;
        const regex = new RegExp(term, 'i')

        //POSTS
        const posts = Post.find({ text: regex })
        const users = User.find({ name: regex })


        res.json({
            ok: true,
            posts,
            users
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Unexpected Error"
        });
    }
}

module.exports = {
    searchPost
}