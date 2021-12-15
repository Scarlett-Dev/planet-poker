const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
  username: {
    type:String,
    required: true
  },
  selectedScore:  {
    type:String,
    required: true
  }

})

module.exports = mongoose.model('Sessions', SessionSchema);
