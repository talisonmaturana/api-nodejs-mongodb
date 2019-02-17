const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var client = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    rg: {
        type: String, 
        required: true,
    },
    cpf: {
        type: String,
        required: false,
    },
    dateBorn: {
        type: Date,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true
    }
}, { collection: 'clients' });

module.exports = mongoose.model('Client', client)