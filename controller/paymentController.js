const AppErrors = require('../application/appError');
const FeeDetails = require('../schema/feeSchema');
const Users = require('../schema/userSchema');
const paymentDetails = require('../schema/paymentSchema');

exports.makePayment =async (request, response, next)=>{
  try {
    const {merchantId, uniqueId, transactionAmount, feeId} = request.body;
    const user = await Users.findOne({merchant_id: merchantId, unique_id: uniqueId});
    if (!user) return next(new AppErrors('No user found for the requested details', 500));
    const userFeeDetails = await FeeDetails.findById(feeId);
    if (userFeeDetails.pending_fee===transactionAmount) {
      userFeeDetails.pending_fee = 0;
      userFeeDetails.status= 'paid';
      userFeeDetails.transactions.push(transactionAmount);
      await paymentDetails.create({fee_id: feeId, merchant_id: merchantId, date: Date.now(), mobile_no: user.mobile_no, email_id: user.email, amount: transactionAmount});
      userFeeDetails.save({validateBeforeSave: false});
      response.json({
        status: 'Success',
        message: 'The fee is fully paid',
        pendingPayment: userFeeDetails.pending_fee,
      });
    } else if (userFeeDetails.pending_fee>transactionAmount) {
      userFeeDetails.pending_fee -= transactionAmount;
      userFeeDetails.status = 'partialPaid';
      const payment = await paymentDetails.create({fee_id: feeId, merchant_id: merchantId, date: Date.now(), mobile_no: user.mobile_no, email_id: user.email, amount: transactionAmount});
      userFeeDetails.pay_history.push(payment._id);
      userFeeDetails.save({validateBeforeSave: false});
      response.json({
        status: 'Success',
        message: 'The fee is partially paid',
        pendingPayment: userFeeDetails.pending_fee,
        userFeeDetails,
      });
    } else {
      next(new AppErrors('The amount entered is invalid or exceeds the pending fee payment ', 500));
    }
  } catch (error) {
    console.log(error.message);
    next(new AppErrors(`[paymentController][makePayment] ${error.message}`, 500));
  }
};
