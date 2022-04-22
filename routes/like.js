//REQUIRED
const { Router } = require('express')

//FUNCTIONS
const { postLikeAndDislike, commentLikeAndDislike } = require('../controllers/like')
const { checkJWT } = require('../middlewares/check-jwt')

//CODE
const router = Router();

//GIVE POST LIKE OR DISLIKE
router.post('/post/:id', checkJWT, postLikeAndDislike);

//GIVE COMMENT LIKE OR DISLIKE
router.post('/comment/:id', checkJWT, commentLikeAndDislike)


module.exports = router;