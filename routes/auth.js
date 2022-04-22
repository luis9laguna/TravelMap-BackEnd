//REQUIRED
const { Router } = require('express');
const { check } = require('express-validator');

//FUNCTIONS
const { login,
    googleSignIn,
    changePassword,
    forgetEmail,
    resetPassword } = require('../controllers/auth');
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
        check('oldPassword', 'OldPassword is required').not().isEmpty().trim().escape(),
        check('newPassword', 'NewPassword is required').not().isEmpty().trim().escape().isLength({ min: 6 }),
        checkParams
    ],
    changePassword);

//PETITION RESET PASSWORD
router.post('/password-reset',
    [
        check('email', 'Email is required').not().isEmpty().trim().escape(),
        checkParams
    ],
    forgetEmail);


//RESET PASSWORD
router.put('/password-reset/:token',
    [
        check('password', 'Password is required').not().isEmpty().trim().escape().isLength({ min: 6 }),
        checkParams
    ],
    resetPassword);

module.exports = router;