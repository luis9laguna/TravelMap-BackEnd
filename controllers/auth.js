//REQUIRED
const User = require('../models/user');
const Pin = require('../models/pin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generatorJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


//CODE
const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const userDB = await User.findOne({ email });

        const errorMessage = () => {
            res.status(401).json({
                ok: false,
                message: 'Invalid Email or Password'
            });
        }

        if (!userDB) return errorMessage()

        //VERIFY PASSWORD
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) return errorMessage()

        //GENERATE TOKEN
        const token = await generatorJWT(userDB.id, '12h');

        const pins = await Pin.find({ user: userDB._id }).populate('user', 'name -_id');
        const favs = await Pin.find({ likes: userDB._id.toString() }).populate('user', 'name -_id');

        favs.forEach(pin => pin.likes = pin.likes.length)
        pins.forEach(pin => pin.likes = pin.likes.length)

        res.json({
            ok: true,
            token,
            user: {
                name: userDB.name,
                email: userDB.email,
                pins,
                favs
            },

        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error Unexpected, check logs"
        });
    }
}

const googleSignIn = async (req, res) => {

    const tokenGoogle = req.body.token;

    try {
        const { given_name, email } = await googleVerify(tokenGoogle);
        let user = await User.findOne({ email });

        if (!user) {
            // CREATE USER
            const data = {
                name: given_name.toLowerCase(),
                email: email.toLowerCase(),
                password: 'none',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        const token = await generatorJWT(user.id, '12h');

        const pins = await Pin.find({ user: user._id }).populate('user', 'name -_id');
        const favs = await Pin.find({ likes: user._id.toString() }).populate('user', 'name -_id');

        favs.forEach(pin => pin.likes = pin.likes.length)
        pins.forEach(pin => pin.likes = pin.likes.length)


        res.json({
            ok: true,
            token,
            user: {
                name: user.name,
                email: user.email,
                pins,
                favs
            },
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "Error Unexpected, check logs"
        });
    }

}


//CHANGE PASSWORD WITH LOGIN
const changePassword = async (req, res) => {

    try {
        const id = req.id
        const oldPassword = req.body.oldpassword;
        const newPassword = req.body.newpassword;
        const userDB = await User.findById(id);

        //VERIFY PASSWORD
        const validPassword = bcrypt.compareSync(oldPassword, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid Password'
            });
        }

        //ENCRYPT
        const salt = bcrypt.genSaltSync();
        const newPasswordHash = bcrypt.hashSync(newPassword, salt);

        //UPDATE PASSWORD
        await User.findByIdAndUpdate(id, { password: newPasswordHash });

        res.json({
            ok: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "Error Unexpected, check logs"
        });
    }
}

module.exports = {
    login,
    googleSignIn,
    changePassword
}
