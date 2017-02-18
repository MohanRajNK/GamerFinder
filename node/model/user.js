// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  gamerType: String,
  gamertag: {
    type: String,
    required: true,
    unique: true
  },
  imageuri: String,
  location: {
    lat: Number,
    long: Number
  },
  games: {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    level: Number
  },
  created_at: Date,
  updated_at: Date
});


// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// we need to create a model using it
var gamingUser = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = gamingUser;