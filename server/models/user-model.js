const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 12

const Users = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  admin: {
    Type: Boolean,
    default: false
  }
})

Users.pre('save', function (next) {
  if(!this.isModified('password')) return next()

  let salt = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if(err) return next(err)

    bcrypt.hash(this.password, salt, (err, password) => {
      if(err) return next(err)
      this.password = password
      next()
    })
  })
})

Users.methods.comparePassword = function(passwordToTest, callback) {
  bcrypt.compare(passwordToTest, this.password, function (err, isMatch) {
    if(err) return callback(err)
    callback(null, isMatch)
  })
}

module.exports = mongoose.model('users', Users)