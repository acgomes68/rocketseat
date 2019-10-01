const User = require('../models/User');

module.exports = {
    index(req, res) {
        return res.json(req.body);
    },
    show(req, res) {
        return res.json(req.body);
    },
    async store(req, res) {
        const { name } = req.body;
        const { email } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email });
        }

        return res.json(user);
    },
    update(req, res) {
        return res.json(req.body);
    },
    destroy(req, res) {
        return res.json(req.body);
    },
};