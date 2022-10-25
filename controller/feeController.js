const AppErrors = require('../application/appError');
const UserData = require('../schema/userSchema');
const FeeDetails = require('../schema/feeSchema');
const redisClient = require('../utilities/redis');

exports.createPendingFee = async (request, response, next)=>{
  try {
    const feeArray = [];
    const fee = await FeeDetails.create(request.body.feeDetails);
    const testfee = await FeeDetails.create({feeContent: {test: 'test'}, dueDate_without_penalty: '2022-08-2'});
    feeArray.push(fee._id, testfee);
    const newFee = await UserData.create({...request.body, feeDetails: fee._id, feeArray});
    response.json({
      status: 'The fee has been entered successfuly',
      data: newFee,
    });
  } catch (error) {
    next(new AppErrors(`[controller][createPendingFee] ${error.message}`, 506));
  }
};
exports.userPendingFee = async (request, response, next)=>{
  try {
    const {mobileNo} = request.query;
    if (!mobileNo) return next(new AppErrors('Please enter a valid mobile number '));
    const userFee = await UserData.findOne({mobile_no: mobileNo}).select('-__v -_id');
    if (!userFee) return next(new AppErrors('No user found for the reqeusted mobile no'));
    redisClient.set('currentUser', JSON.stringify(userFee));
    response.cookie('test', 'test');
    response.json({
      status: 'Success',
      data: userFee,
    });
  } catch (error) {
    next(new AppErrors(`[controller][userPendingFee] ${error.message}`, 506));
  }
};
