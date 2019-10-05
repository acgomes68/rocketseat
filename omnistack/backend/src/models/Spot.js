require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});
const mongoose = require('mongoose');

const { API_URL, API_PORT } = process.env;

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `${API_URL}:${API_PORT}/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Spot', SpotSchema);