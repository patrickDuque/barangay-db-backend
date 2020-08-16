const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  name          : { type: String, required: [ true, 'Name Required' ] },
  address       : { type: String, required: [ true, 'Address Required' ] },
  age           : { type: Number, required: [ true, 'Age Required' ] },
  sex           : { type: String, required: [ true, 'Sex Required' ] },
  contactNumber : { type: String, required: [ true, 'Contact Number Required' ] },
  picture       : { type: String, required: [ true, 'Picture Required' ] },
  birthday      : { type: String, required: [ true, 'Birthday Required' ] }
});

module.exports = mongoose.model('Profile', profileSchema);
