const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost:27017/teste-jmv';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
