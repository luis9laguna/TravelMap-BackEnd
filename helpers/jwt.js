const jwt = require('jsonwebtoken');

const generatorJWT = (id, expire) => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expire
        }, (error, token) => {
            if (error) {
                reject('Sorry')
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generatorJWT
}