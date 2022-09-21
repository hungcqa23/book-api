const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
=======
const crypto = require('crypto');
>>>>>>> remotes/origin/master

const userSchema = new mongoose.Schema({
  name: {
    type: String,
<<<<<<< HEAD
    required: [true, 'Please enter your name 🐸'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email 🐸'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please enter your password 🙂'],
    minlength: 8,
=======
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
    select: false,
>>>>>>> remotes/origin/master
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
<<<<<<< HEAD
  },
=======
    validate: {
      // This is only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
>>>>>>> remotes/origin/master
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

<<<<<<< HEAD
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

=======
  // Hash
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  // Delete password confirm before save it to DB
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) next();
  // -1s because the token is issued after the password had changed
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

>>>>>>> remotes/origin/master
const User = mongoose.model('User', userSchema);

module.exports = User;
