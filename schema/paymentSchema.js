const mongoose = require('mongoose');
const validator = require('validator');

const payDetailsSchema = new mongoose.Schema({
  fee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeeDetails',
    required: [true, 'The payment must pertain to a fee '],
  },
  merchant_id: {
    type: 'String',
    required: [true, 'Merchant id is required'],
  },
  date: {
    type: 'Date',
    required: [true, 'Date of transaction is required'],
  },
  amount: {
    type: 'Number',
    requried: [true, 'The amount is requried'],
  },
  mobile_no: {
    type: 'String',
    required: [true, 'The mobile no of the user is required'],
  },
  email_id: {
    type: 'String',
    required: [true, 'The email id of the user is required'],
    validate: {
      validator: function(val) {
        return validator.isEmail(val);
      },
      message: 'The email is not valid ',
    },
  },
  txn_details: {
    pg_txn_id: 'String',
    pg_name: 'String',
  },
});

const paymentDetails = mongoose.model('PaymentDetails', payDetailsSchema);

module.exports = paymentDetails;
