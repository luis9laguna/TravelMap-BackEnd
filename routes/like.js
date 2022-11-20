//REQUIRED
const { Router } = require('express')

//FUNCTIONS
const { pinLikeAndDislike } = require('../controllers/like')
const { checkJWT } = require('../middlewares/check-jwt')

//CODE
const router = Router();

//GIVE PIN LIKE OR DISLIKE
router.get('/:id', checkJWT, pinLikeAndDislike);

module.exports = router;