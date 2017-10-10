const mongoose = require('mongoose');
const moment = require('moment');

const DungBeetleSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 20 },
    hexcolor: { type: String, required: true, maxlength: 7 },
    birthday: { type: Date, default: moment() },
    updated_at: { type: Date, default: moment() },
    dungsphereradius: { type: Number, default: 1 },
});
const DungBeetle = mongoose.model('DungBeetle', DungBeetleSchema);