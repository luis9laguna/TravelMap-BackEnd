//REQUIRED
const Pin = require('../models/pin');

//CODE

//GIVE PIN A LIKE OR DISLIKE
const pinLikeAndDislike = async (req, res) => {
    try {

        //GET USER CODE
        const userId = req.id;

        //GET PIN
        const id = req.params.id;
        const pin = await Pin.findById(id).populate('user', 'name -_id');

        //LOOKING FOR LIKE
        const like = pin.likes.includes(userId)
        let added;
        if (like) {
            pin.likes.remove(userId)
            added = false
        } else {
            added = true;
            pin.likes.push(userId)
        }

        //SAVE
        await pin.save()
        pin.likes = pin.likes.length

        res.json({
            ok: true,
            pin,
            added
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Unexpected Error'
        });
    }
}



module.exports = {
    pinLikeAndDislike
}