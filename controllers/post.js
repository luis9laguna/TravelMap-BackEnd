//REQUIRED
const Post = require('../models/post')


//CODE


//GET POST
const getPost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                ok: false,
                message: 'Post not found'
            });
        }

        res.json({
            ok: true,
            post
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}

//GET POSTS BY USER
const getPostsByUser = async (req, res) => {
    try {
        const userid = req.params.id
        const posts = await Post.find({ user: userid })

        if (!posts) {
            return res.status(404).json({
                ok: false,
                message: 'Posts not found'
            });
        }

        res.json({
            ok: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}

//CREATE A POST
const createPost = async (req, res) => {
    try {

        const { images, text } = req.body
        const userId = req.id

        //CREATING POST
        let post = new Post()

        if (images) {
            post.type = 'image'
            //MOVING IMAGE CLOUDINARY
            let newImages = new Array
            for (const image of images) {
                const oldNameArray = image.split('/');
                const oldnameId = oldNameArray[oldNameArray.length - 1];
                const [public_id] = oldnameId.split('.');
                const newPublic_id = `post/${public_id}`
                const { secure_url } = await cloudinary.uploader.rename(public_id, newPublic_id)
                newImages.push(secure_url)
            }
            post.images = newImages
        } else {
            post.type = 'text'
        }

        post.text = text
        post.user = userId
        await post.save()

        res.json({
            ok: true,
            post
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}


//UPDATE POST
const updatePost = async (req, res) => {
    try {

        const userId = req.id
        const { text } = req.body
        const postId = req.params.id
        const postDB = await Post.findById(postId);

        if (!postDB) {
            return res.status(404).json({
                ok: false,
                message: 'Post not found'
            });
        }

        if (userId !== postDB.user.toString()) {
            return res.status(403).json({
                ok: false,
                message: 'You cant edit this comment!'
            });
        }

        //UPDATE
        const postUpdate = await Post.findByIdAndUpdate(postId, { text }, { new: true })

        res.json({
            ok: true,
            postUpdate
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}

//DELETE POST
const deletePost = async (req, res) => {
    try {

        const userId = req.id
        const postId = req.params.id
        const postDB = await Post.findById(postId);

        if (!postDB) {
            return res.status(404).json({
                ok: false,
                message: 'Post not found'
            });
        }

        if (userId !== postDB.user.toString()) {
            return res.status(403).json({
                ok: false,
                message: 'You cant delete this comment!'
            });
        }

        //DELETE
        await Post.findByIdAndDelete(postId)

        res.json({
            ok: true,
            message: 'Post deleted'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}


module.exports = {
    getPost,
    getPostsByUser,
    createPost,
    updatePost,
    deletePost
}