const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://ds119223.mlab.com:19223/todoapp -u admin -p noblecooleyy');

module.exports = {
    mongoose
};