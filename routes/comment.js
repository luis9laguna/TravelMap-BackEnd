//REQUIRED
const { Router } = require('express')
const { check } = require('express-validator');

//FUNCTIONS
const { getAllByPost, createComment, editComment, deleteComment } = require('../controllers/comment')
const { checkParams } = require('../middlewares/check-params')
const { checkJWT } = require('../middlewares/check-jwt');


//CODE
const router = Router()


//GET COMMENTS BY POST
router.get('/:id', checkJWT, getAllByPost)

//POST COMMENT
router.post('/:id', [
    checkJWT,
    check('text', 'Text is required').not().isEmpty().trim().escape(),
    checkParams
], createComment)

//PUT
router.put('/:id',
    [
        checkJWT,
        check('text', 'Text is required').not().isEmpty().trim().escape(),
        checkParams
    ],
    editComment);


//DELETE
router.delete('/:id', checkJWT, deleteComment);


module.exports = router