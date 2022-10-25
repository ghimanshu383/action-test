const mongoose = require('mongoose');
const feeDetails = new mongoose.Schema({
  feeContent: {
    type: 'Object',
    required: [true, 'Fee content is required'],
  },
  status: {
    type: 'String',
    default: 'Unpaid',
  },
  dueDate_without_penalty: {
    type: 'Date',
    required: [true, 'A due date with no penality is required'],
  },
  dueDate_penalty: {
    type: 'Object',
    default: null,
  },
  pay_history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentDetails',
    },
  ],
  total_fee: 'Number',
  pending_fee: 'Number',
  transactions: [
    {
      type: 'String',
    },
  ],
}, {
  strict: false,
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
});

feeDetails.pre('save', function(next) {
  if (this.isModified('status') || this.isModified('pay_history')) return next();
  let totalFee = null;
  // eslint-disable-next-line guard-for-in
  for (key in this.feeContent) {
    totalFee += Number(this.feeContent[key]);
  };
  this.total_fee = totalFee;
  this.pending_fee = this.total_fee;
  next();
});

feeDetails.pre(/find/, function(next) {
  this.populate({
    path: 'pay_history',
    select: {
      mobile_no: 1,
      amount: 1,
    },
  });
  next();
});

const FeeDetails = mongoose.model('FeeDetails', feeDetails);

module.exports = FeeDetails;
