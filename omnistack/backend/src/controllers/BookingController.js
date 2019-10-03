const Booking = require('../models/Booking');
const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { spot_id, user_id } = req.query;
        let booking, has_spot, has_user;

        if (user_id) {
            has_user = await User.findById(user_id);
            if (!has_user) {
                return res.status(400).json({ error: 'User does not exist' });
            }
            else if (spot_id) {
                has_spot = await Spot.findById(spot_id);
                if (!has_spot) {
                    return res.status(400).json({ error: 'Spot does not exist' });
                }
                // Search by user and spot
                else {
                    booking = await Booking.find({ user: user_id, spot: spot_id,});
                }
            }
            // Search only by user
            else {
                booking = await Booking.find({ user: user_id});
            }
        }
        else if (spot_id) {
            has_spot = await Spot.findById(spot_id);
            if (!has_spot) {
                return res.status(400).json({ error: 'Spot does not exist' });
            }
            // Search only by spot
            else {
                booking = await Booking.find({ spot: spot_id});
            }
        }
        // Show all bookings
        else {
            booking = await Booking.find();
        }
        return res.json(booking);
    },
    async store(req, res) {
        const { spot_id } = req.params;
        const { user_id } = req.headers;
        const { date } = req.body;
        const has_spot = await Spot.findById(spot_id);
        const has_user = await User.findById(user_id);
        let booking, msg, status;

        if (!has_user) {
            status = 400;
            msg = 'User does not exist';
        }
        else if (!has_spot) {
            status = 400;
            msg = 'Spot does not exist';
        }
        else {
            booking = await Booking.create({ 
                user: user_id,
                spot: spot_id,
                date,
            });
            if (booking) {
                status = 200;
                msg = 'Booking added successfully';
            }
            else {
                status = 400;
                msg = 'Errors founded during adding booking';
            }
        }
        return res.status(status).json({ error: msg });
    },
};