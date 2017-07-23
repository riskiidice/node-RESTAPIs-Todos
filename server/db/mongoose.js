const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:noblecooleyy@ds119223.mlab.com:19223/todoapp');

module.exports = {
    mongoose
};