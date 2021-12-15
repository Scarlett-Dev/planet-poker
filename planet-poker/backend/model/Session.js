const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({

    // users: {
        username: {type:String},
        selectedScore: {type:String}
    // }
})

module.exports = mongoose.model('Sessions', SessionSchema);