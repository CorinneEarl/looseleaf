var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: { type: String, required: true}, 
  lastName: { type: String, required: true},
  email: {type: String, required: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports ='User';

/*
Alternate syntax:

module.exports = mongoose.model('User', new Schema ({
  firstName: { type: String, required: true}, 
  lastName: { type: String, required: true},
  email: {type: String, required: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
}))

*/