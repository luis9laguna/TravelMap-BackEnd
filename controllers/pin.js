//REQUIRED
const Pin = require('../models/pin')
const User = require('../models/user')

//CODE


//GET ALL PINS
const getAllPins = async (req, res) => {
    try {
        const pins = await Pin.find().populate('user', 'name -_id')


        pins.forEach(pin => {
            pin.likes = pin.likes.length
        })


        res.json({
            ok: true,
            pins
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}


//GET PIN
const getPin = async (req, res) => {
    try {
        const pinId = req.params.id
        const pin = await Pin.findById(pinId)
        pin.likes = pin.likes.length

        if (!pin) {
            return res.status(404).json({
                ok: false,
                message: 'Pin not found'
            });
        }

        res.json({
            ok: true,
            pin
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}

//GET PINS BY USER
const getPinsByUser = async (req, res) => {
    try {
        const userid = req.params.id
        const pins = await Pin.find({ user: userid })

        if (!pins) {
            return res.status(404).json({
                ok: false,
                message: 'Pins not found'
            });
        }

        res.json({
            ok: true,
            pins
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}

//CREATE A PIN
const createPin = async (req, res) => {
    try {

        req.body.user = req.id;

        //CREATING PIN
        const pin = new Pin(req.body)
        await pin.save()
        await pin.populate('user', 'name -_id')

        res.json({
            ok: true,
            pin
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}


//UPDATE PIN
const updatePin = async (req, res) => {
    try {

        const userId = req.id
        const pindId = req.params.id
        const pinDB = await Pin.findById(pindId);

        if (!pinDB) {
            return res.status(404).json({
                ok: false,
                message: 'Pin not found'
            });
        }

        if (userId !== pinDB.user.toString()) {
            return res.status(403).json({
                ok: false,
                message: 'You cant edit this comment!'
            });
        }

        //UPDATE
        const pinUpdate = await Pin.findByIdAndUpdate(pindId, req.body, { new: true }).populate('user', 'name -_id')
        pinUpdate.likes = pinUpdate.likes.length
        res.json({
            ok: true,
            pin: pinUpdate
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}

//DELETE PIN
const deletePin = async (req, res) => {
    try {

        const userId = req.id
        const pinId = req.params.id
        const pinDB = await Pin.findById(pinId);

        if (!pinDB) {
            return res.status(404).json({
                ok: false,
                message: 'Pin not found'
            });
        }

        if (userId !== pinDB.user.toString()) {
            return res.status(403).json({
                ok: false,
                message: 'You cant delete this comment!'
            });
        }

        //DELETE
        await Pin.findByIdAndDelete(pinId)

        res.json({
            ok: true,
            message: 'Pin deleted'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        })
    }
}


module.exports = {
    getAllPins,
    getPin,
    getPinsByUser,
    createPin,
    updatePin,
    deletePin
}