const mongoose = require('mongoose');

const tricycleSchema = mongoose.Schema({
  name          : { type: String, required: [ true, 'Name Required' ] },
  address       : { type: String, required: [ true, 'Address Required' ] },
  contactNumber : { type: String, default: 'No contact number' },
  picture       : { type: String, required: [ true, 'Picture Required' ] },
  birthday      : { type: String, required: [ true, 'Birthday Required' ] },
  status        : { type: String, required: [ true, 'status Required' ] },
  brand         : String,
  model         : Number,
  plateNumber   : String,
  motorNumber   : String,
  color         : String,
  bodyNumber    : Number,
  affiliation   : String
});

module.exports = mongoose.model('Tricycle', tricycleSchema);
