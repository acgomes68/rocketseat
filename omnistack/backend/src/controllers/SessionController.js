const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    },
    async show(req, res) {
        const { id } = req.params;
        const user = await User.findById(id);

        if (user) {
            return res.json(user);
        }
        else {
            return res.status(400).json({ error: 'User does not exist' });
        }
    },
    async store(req, res) {
        const { email } = req.body;
        const has_user = await User.findOne({ email });
        let user, msg, status;

        if (has_user) {
            status = 400;
            msg = 'User already exists';
        }
        else {
            user = await User.create({ email });
            if (user) {
                status = 200;
                msg = 'User added successfully';
                return res.json(user);
            }
            else {
                status = 400;
                msg = 'Errors founded during adding user';
            }
        }
        return res.status(status).json({ error: msg });
    },
    async update(req, res) {
        const { id } = req.params;
        const { email } = req.body;
        const has_user = await User.findById(id);
        let user, msg, status;

        if (has_user) {
            user = await User.findByIdAndUpdate(id, { email });
            if (user) {
                status = 200;
                msg = 'User updated successfully';
                return res.json(user);
            }
            else {
                status = 400;
                msg = 'Errors founded during updating user';
            }
        }
        else {
            status = 400;
            msg = 'User does not exist';
        }
        return res.status(status).json({ error: msg });
    },
    async destroy(req, res) {
        const { id } = req.params;
        const has_user = await User.findById(id);
        const spot_has_user = await Spot.findOne({ user: id });
        let user, msg, status;

        if (!has_user) {
            status = 400;
            msg = 'User does not exist';
        }
        else if (spot_has_user) { 
            status = 400;
            msg = 'User is registered to spot(s)';
        }
        else {
            user = await User.findByIdAndDelete(id);
            if (user) {
                status = 200;
                msg = 'User deleted successfully';
                return res.json(user);
            }
            else {
                status = 400;
                msg = 'Errors founded during deleting user';
            }
        }
        return res.status(status).json({ error: msg });
    },
};