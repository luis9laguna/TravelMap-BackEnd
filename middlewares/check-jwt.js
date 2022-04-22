//REQUIRED
const jwt = require('jsonwebtoken');

//CODE

//VERIFY JWT USER
const checkJWT = (req, res, next) => {

    try {

        const token = req.header('Authorization');

        //VERIFY TOKEN
        if (!token) {
            return res.status(401).send({
                ok: false,
                message: 'Needed token'
            });
        }

        //GET ID AND ROLE
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;

        next();

    } catch (error) {
        return res.status(401).send({
            ok: false,
            message: 'Token Invalid'
        });
    }
}


module.exports = {
    checkJWT
}