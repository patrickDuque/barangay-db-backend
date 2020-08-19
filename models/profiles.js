const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  name          : { type: String, required: [ true, 'Name Required' ] },
  address       : { type: String, required: [ true, 'Address Required' ] },
  sex           : { type: String, required: [ true, 'Sex Required' ] },
  contactNumber : { type: String, default: 'No contact number' },
  picture       : { type: String, required: [ true, 'Picture Required' ] },
  birthday      : { type: String, required: [ true, 'Birthday Required' ] },
  occupation    : { type: String, default: 'None' },
  sector        : { type: String },
  birthplace    : { type: String, default: 'None' },
  transfer      : { type: String, default: new Date().getFullYear() }
});

module.exports = mongoose.model('Profile', profileSchema);
