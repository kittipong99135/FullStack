const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    Username:String,
    Password:String,
    Role:String,
    Approve:Boolean
}, {timestamps: true});

module.exports = mongoose.model('users', usersSchema);