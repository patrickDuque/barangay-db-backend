const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
  name             : { type: String, required: [ true, 'Name Required' ] },
  address          : { type: String, required: [ true, 'Address Required' ] },
  nature           : { type: String, required: [ true, 'Nature of Business Required' ] },
  existence        : { type: String, default: new Date().toISOString },
  picture          : { type: String, required: [ true, 'Picture Required' ] },
  owner            : { type: String, required: [ true, 'Owner Name Required' ] },
  requestingPerson : { type: String, required: true }
});

module.exports = mongoose.model('Business', businessSchema);
