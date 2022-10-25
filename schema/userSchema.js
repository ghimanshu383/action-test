const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  merchant_id: {
    type: 'String',
    required: [true, 'Merchant id is required'],
  },
  unique_id: {
    type: 'String',
    required: [true, 'Unique id is required'],
  },
  mobile_no: {
    type: 'String',
    required: [true, 'A user must register a mobile no'],
  },
  email: {
    type: 'String',
    required: [true, 'Email id is required'],
    validate: {
      validator: function(val) {
        return validator.isEmail(val);
      },
      message: ['Email is no valid'],
    },
  },
  feeDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeeDetails',
    requried: [true, 'Fee details for each entry is required'],
    select: false,
  },
  feeArray: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeeDetails',
    },
  ],

}, {strict: false});

userSchema.index({merchant_id: 1, unique_id: 1}, {unique: true});

userSchema.pre(/find/, function(next) {
  this.populate({
    path: 'feeArray',
    select: {
      '_id': 1,
      'feeContent': 1,
      'status': 1,
      'total_fee': 1,
      'pending_fee': 1,
    },

  });
  next();
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
