var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email1: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name1: {
    type: String,
    // unique: true,
    required: true,
    trim: true
  },
  mobile1:{
    type: String,
    required: true
},
email2: {
  type: String,
  unique: true,
  required: false,
  trim: true
},
name2: {
  type: String,
  // unique: true,
  required: false,
  trim: true
},
mobile2:{
  type: String,
  required: false
},
email3: {
  type: String,
  unique: true,
  required: false,
  trim: true
},
name3: {
  type: String,
  // unique: true,
  required: false,
  trim: true
},
mobile3:{
  type: String,
  required: false
},
email4: {
  type: String,
  unique: true,
  required: false,
  trim: true
},
name4: {
  type: String,
  // unique: true,
  required: false,
  trim: true
},
mobile4:{
  type: String,
  required: false
},
 
 
  college:{
      type: String,
      required:true
  },
  github:{
      type:String,
      required:true
  
  },
  teamname:{
    type:String,
    required: true,
    unique: true
  }


});


//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
var User = mongoose.model('maithacks', UserSchema);
module.exports = User;

