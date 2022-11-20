//REQUIRED
const { Router } = require('express');
const { check } = require('express-validator');

//FUNCTIONS
const { login,
    googleSignIn,
    changePassword } = require('../controllers/auth');
const { checkParams } = require('../middlewares/check-params');
const { checkJWT } = require('../middlewares/check-jwt');

//CODE
const router = Router();

//STANDARD
router.post('/login',
    [
        check('email', 'Email is required').isEmail().normalizeEmail(),
        check('password', 'Password is required').not().isEmpty().trim().escape(),
        checkParams
    ],
    login);

//GOOGLE
router.post('/google',
    [
        check('token', 'Token is required').not().isEmpty().trim().escape(),
        checkParams
    ],
    googleSignIn);


//CHANGE PASSWORD WITH LOGIN
router.put('/change-password',
    [checkJWT,
        check('oldpassword', 'OldPassword is required').not().isEmpty().trim().escape(),
        check('newpassword', 'NewPassword is required').not().isEmpty().trim().escape().isLength({ min: 6 }),
        checkParams
    ],
    changePassword);


module.exports = router;