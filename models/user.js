const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username : { type: String, required: [ true, 'Username Required' ] },
  password : { type: String }
});

module.exports = mongoose.model('User', userSchema);
