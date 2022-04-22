//REQUIRED
const { Router } = require('express');
const { check } = require('express-validator');

//FUNCTIONS
const { createUser, getUser, updateUser } = require('../controllers/user')
const { checkParams } = require('../middlewares/check-params')


//CODE
const router = Router()


//GET USER
router.get('/', getUser);

//POST USER
router.post('/', [
    check('name', 'Name is required').not().isEmpty().trim().escape(),
    check('lastname', 'Lastname is required').not().isEmpty().trim().escape(),
    check('password', 'Password is required').not().isEmpty().trim().escape().isLength({ min: 6 }),
    check('email', 'Email is required').isEmail().normalizeEmail(),
    checkParams
], createUser)

//PUT
router.put('/update',
    [
        check('name', 'Name is required').not().isEmpty().trim().escape(),
        check('lastname', 'Lastname is required').not().isEmpty().trim().escape(),
        checkParams
    ],
    updateUser);


module.exports = router