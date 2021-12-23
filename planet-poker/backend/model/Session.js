const mongoose = require('mongoose');

// Works for one entry
// const SessionSchema = mongoose.Schema({
//   username: {
//     type:String,
//     required: true
//   },
//   selectedScore:  {
//     type:String,
//     required: true
//   }
//
// })

const SessionSchema = mongoose.Schema({
  users: [{
    username: {type: String, required: false},
    selectedScore: {type: String, required: false}
  }]
})

module.exports = mongoose.model('Sessions', SessionSchema);




