//REQUIRED
const { Router } = require('express')
const { check } = require('express-validator');

//FUNCTIONS
const { getPost, getPostsByUser, createPost, updatePost, deletePost } = require('../controllers/post')
const { checkParams } = require('../middlewares/check-params')
const { checkJWT } = require('../middlewares/check-jwt');

//CODE
const router = Router()


//GET POST
router.get('/:id', checkJWT, getPost);

//GET POSTS BY USER
router.get('/user/:id', checkJWT, getPostsByUser);

//POST POST
router.post('/', [
    checkJWT,
    check('text', 'Text is required').not().isEmpty().trim().escape(),
    checkParams
], createPost)

//PUT POST
router.put('/:id',
    [
        checkJWT,
        check('text', 'Text is required').not().isEmpty().trim().escape(),
        checkParams
    ],
    updatePost);


//DELETE
router.delete('/:id', checkJWT, deletePost);


module.exports = router