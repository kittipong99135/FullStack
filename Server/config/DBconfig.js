const mongoose = require('mongoose');

const DatabaseConnect = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/FullStack');
        console.log('Connect database "FullStack" Success.');
    } catch (error) {
        console.log('Connect database "FullStack" Fail.');
        return;
    }
}

module.exports = DatabaseConnect;