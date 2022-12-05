const express = require('express');
const router = express.Router();
const feeController = require('../controller/feeController');
const paymentController = require('../controller/paymentController');
const stripeController = require('../controller/stripeController');
const payUController = require('../controller/payuController');

router.get('/pendingFee', feeController.userPendingFee );
router.post('/addFee', feeController.createPendingFee);
router.post('/payFee', paymentController.makePayment);
router.get('/stripeTest', stripeController.makeStripepayment );
router.get('/payuTest', payUController.createOrder);

module.exports = router;
