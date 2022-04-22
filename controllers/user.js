const User = require('../models/user')
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');
const cloudinary = require('cloudinary').v2


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

        res.json({
            ok: true,
            user: {
                name: userDB.name,
                email: userDB.email,
                lastname: userDB.lastname,
                address: userDB.address
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
        const { name, email, password, image } = req.body
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

        //MOVING IMAGE CLOUDINARY
        if (image) {
            const oldNameArray = image.split('/');
            const oldnameId = oldNameArray[oldNameArray.length - 1];
            const [public_id] = oldnameId.split('.');
            const newPublic_id = `user/${public_id}`

            const { secure_url } = await cloudinary.uploader.rename(public_id, newPublic_id)
            user.image = secure_url
        }

        //SAVE USER
        user.name = name.toLowerCase()
        await user.save()

        //GENERATE TOKEN
        const expire = '12h'
        const token = await generatorJWT(user.id, expire);
        res.json({
            ok: true,
            user: user.name,
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

        //MOVING IMAGE CLOUDINARY
        const oldNameArray = image[0].split('/');

        //IF THE OLD PHOTO WAS ORGANIZED BEFORE
        let finishedOldRoute
        if (oldNameArray.length === 10) {
            //GET THE OLD ROUTE ARRAY
            const oldRouteArray = oldNameArray.slice(-3)
            const wholeOldRoute = oldRouteArray.join('/')
            const [oldRoute] = wholeOldRoute.split('.')
            finishedOldRoute = oldRoute.replace(/%20/g, " ")
        } else {
            const wholeOldRoute = oldNameArray[oldNameArray.length - 1];
            [finishedOldRoute] = wholeOldRoute.split('.')
        }

        //GETTING THE LAST PART OF PUBLIC ID
        const oldnameId = oldNameArray[oldNameArray.length - 1]
        const [public_id] = oldnameId.split('.');
        const newPublic_id = `user/${public_id}`

        //JUST IN CASE THE NEXT VALIDATION DOESNT PASS
        let finalImage = images[0]

        //MOVING FOLDER
        if (finishedOldRoute !== newPublic_id) {
            const resp = await cloudinary.uploader.rename(finishedOldRoute, newPublic_id)
            finalImage = resp.secure_url
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