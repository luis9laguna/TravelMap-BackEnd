//REQUIRED
const { Router } = require('express')
const { check } = require('express-validator');

//FUNCTIONS
const { getAllPins, getPin, getPinsByUser, createPin, updatePin, deletePin } = require('../controllers/pin')
const { checkParams } = require('../middlewares/check-params')
const { checkJWT } = require('../middlewares/check-jwt');

//CODE
const router = Router()

//GET ALL PIN
router.get('/all', getAllPins);

//GET PIN
router.get('/:id', checkJWT, getPin);

//GET PINS BY USER
router.get('/user/:id', checkJWT, getPinsByUser);

//POST PIN
router.post('/', [
    checkJWT,
    check('title', 'Title is required').not().isEmpty().trim().escape(),
    check('description', 'Description is required').not().isEmpty().trim().escape(),
    check('rating', 'Rating is required').not().isEmpty().trim().escape(),
    check('lat', 'Latitude is required').not().isEmpty().trim().escape(),
    check('long', 'Longitude is required').not().isEmpty().trim().escape(),
    checkParams
], createPin)

//PUT PIN
router.put('/:id',
    [
        checkJWT,
        check('title', 'Title is required').not().isEmpty().trim().escape(),
        check('description', 'Description is required').not().isEmpty().trim().escape(),
        check('rating', 'Rating is required').not().isEmpty().trim().escape(),
        checkParams
    ],
    updatePin);


//DELETE
router.delete('/:id', checkJWT, deletePin);


module.exports = router