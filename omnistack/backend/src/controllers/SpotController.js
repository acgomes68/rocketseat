const User = require('../models/Spot');

module.exports = {
    index(req, res) {
        return res.json(req.body);
    },
    show(req, res) {
        return res.json(req.body);
    },
    async store(req, res) {
        console.log(req.body);
        console.log(req.file);

        return res.json({ ok: true });

        // const { thumbnail } = req.body;
        // const { company } = req.body;
        // const { price } = req.body;
        // const { techs } = req.body;
        // const { user } = req.body;


        // let spot = await User.findOne({ email });

        // if (!spot) {
        //     spot = await Spot.create({ thumbnail, company, price, techs, user });
        // }

        // return res.json(spot);
    },
    update(req, res) {
        return res.json(req.body);
    },
    destroy(req, res) {
        return res.json(req.body);
    },
};