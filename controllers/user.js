const User = require('../models/user')
const Pin = require('../models/pin')
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');


//GET
const getUser = async (req, res) => {

    try {
        const id = req.id
        const userDB = await User.findById(id);

        //VERIFY USER
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            });
        }

        const pins = await Pin.find({ user: userDB._id }).populate('user', 'name -_id');
        const favs = await Pin.find({ likes: userDB._id.toString() }).populate('user', 'name -_id');

        favs.forEach(pin => pin.likes = pin.likes.length)
        pins.forEach(pin => pin.likes = pin.likes.length)

        res.json({
            ok: true,
            user: {
                name: userDB.name,
                email: userDB.email,
                pins,
                favs
            },
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Unexpected Error"
        });
    }
}


//CREATE
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existUser = await User.findOne({ email })

        //VERIFY EMAIL
        if (existUser) {
            return res.status(400).json({
                ok: false,
                message: "This email has an account already"
            })
        }
        const user = new User(req.body)

        //ENCRYPT
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        //SAVE USER
        user.name = name.toLowerCase()
        await user.save()

        //GENERATE TOKEN
        const expire = '12h'
        const token = await generatorJWT(user.id, expire);
        res.json({
            ok: true,
            user: { name: user.name, email: user.email },
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error Unexpected, check logs'
        })
    }
}

//UPDATE    
const updateUser = async (req, res) => {

    try {
        const id = req.id
        const userDB = await User.findById(id);

        //VERIFY USER
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            });
        }

        //UPDATE USER
        const { password, google, ...field } = req.body;
        const userUpdate = await User.findByIdAndUpdate(id, field, { new: true });

        res.json({
            ok: true,
            user: userUpdate
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error Unexpected, check logs"
        });
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
}