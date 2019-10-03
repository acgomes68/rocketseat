const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;
        const has_user = await User.findById(user_id);
        let spot;

        if (!has_user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        else {
            spot = await Spot.find({ user: user_id});
            return res.json(spot);
        }
    },
};