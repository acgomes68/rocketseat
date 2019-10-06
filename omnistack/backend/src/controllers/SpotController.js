const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { tech, user } = req.query;
        let spot;

        if (tech) {
            if (user) {
                spot = await Spot.find({ techs: tech, user: user});
            }
            else {
                spot = await Spot.find({ techs: tech});
            }
        }
        else if (user) {
            spot = await Spot.find({ user: user});
        }
        else {
            spot = await Spot.find();
        }
        return res.json(spot);
    },
    async show(req, res) {
        const { id } = req.params;
        const spot = await Spot.findById(id);

        if (spot) {
            return res.json(spot);
        }
        else {
            return res.status(400).json({ error: 'Spot does not exist' });
        }
    },
    async store(req, res) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;
        const has_user = await User.findById(user_id);
        let spot, msg, status;
        
        if (!has_user) {
            status = 400;
            msg = 'User does not exist';
        }
        else {
            spot = await Spot.create({ 
                user: user_id,
                thumbnail: filename, 
                company, 
                techs: techs.split(',').map(tech => tech.trim()), 
                price,
            });
            await spot.populate('user').execPopulate();
            if (spot) {
                status = 200;
                msg = 'Spot added successfully';
                return res.json(spot);
            }
            else {
                status = 400;
                msg = 'Errors founded during adding spot';
            }
        }
        return res.status(status).json({ error: msg });
    },
    async update(req, res) {
        const { id } = req.params;
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;
        const has_user = await User.findById(user_id);
        const has_spot = await Spot.findById(id);
        let spot, msg, status;

        if (!has_spot) {
            status = 400;
            msg = 'Spot does not exist';
        }
        else if (!has_user) {
            status = 400;
            msg = 'User does not exist';
        }
        else {
            spot = await Spot.findByIdAndUpdate(id, { 
            user: user_id,
            thumbnail: filename, 
            company, 
            techs: techs.split(',').map(tech => tech.trim()), 
            price,
            });
            if (spot) {
                status = 200;
                msg = 'Spot updated successfully';
                return res.json(spot);
            }
            else {
                status = 400;
                msg = 'Errors founded during updating spot';
            }
        }
        return res.status(status).json({ error: msg });
    },
    async destroy(req, res) {
        const { id } = req.params;
        const has_spot = await Spot.findById(id);
        let spot, msg, status;

        if (has_spot) {
            spot = await Spot.findByIdAndDelete(id);
            if (spot) {
                status = 200;
                msg = 'Spot deleted successfully';
                return res.json(spot);
            }
            else {
                status = 400;
                msg = 'Errors founded during deleting spot';
            }
        }
        else {
            status = 400;
            msg = 'Spot does not exist';
        }
        return res.status(status).json({ error: msg });
    },
};