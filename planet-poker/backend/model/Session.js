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
  gamemode: {
    type: String,
    required: true
  },
  users: [{
    username: {type: String, required: true},
    selectedScore: {type: String, required: false}
  }]
},
  {
  collection: 'SessionSchema',
  versionKey: false
})

module.exports = mongoose.model('Sessions', SessionSchema);




