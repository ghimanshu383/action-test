const hasher = require('./payu_hasher');
const fetch = require('node-fetch');
const {URLSearchParams} = require('url');
const fs = require('fs');

exports.createOrder = async (request, response) => {
  // // // return fetch(`${CASHFREE.BASE_URL}/orders`, {
  // // //   method: 'POST',
  // // //   body: JSON.stringify(data),
  // // //   headers: {
  // // //     'Content-Type': 'application/json',
  // // //     'x-api-version': CASHFREE.API_VERSION,
  // // //     'x-client-id': CASHFREE.APP_ID,
  // // //     'x-client-secret': CASHFREE.APP_SECRET,
  // // //   },
  // // // }).then((response) => {
  // // //   return response.json();
  // // // }).catch((err) => {
  // // //   return err;
  // // // });
  const hash = hasher.generateHash({
    key: 'zXMACE',
    amount: '10',
    productinfo: 'iPhone',
    txnid: 'fIR9Ks8cMdWVE',
    firstname: 'PayU User',
    email: 'test@gmail.com',
    salt: 'gBylLSLc2ueqOJBUkqsRuggmJTQ7qqBo',
  });
  console.log(hash);
  // const encodedParams = new URLSearchParams();
  // encodedParams.set('key', 'zXMACE');
  // encodedParams.set('amount', '10.00');
  // encodedParams.set('txnid', 'fIR9Ks8cMdWVE');
  // encodedParams.set('firstname', 'PayU User');
  // encodedParams.set('email', 'test@gmail.com');
  // encodedParams.set('phone', '9876543210');
  // encodedParams.set('productinfo', 'iPhone');
  // encodedParams.set('surl', 'https://apiplayground-response.herokuapp.com/');
  // encodedParams.set('furl', 'https://apiplayground-response.herokuapp.com/');
  // encodedParams.set('pg', '');
  // encodedParams.set('bankcode', '');
  // encodedParams.set('ccnum', '');
  // encodedParams.set('ccexpmon', '');
  // encodedParams.set('ccexpyr', '');
  // encodedParams.set('ccvv', '');
  // encodedParams.set('ccname', '');
  // encodedParams.set('txn_s2s_flow', '');
  // encodedParams.set('hash', hash);
  // const url = 'https://secure.payu.in/_payment';
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: encodedParams,
  // };

  // const reply = await fetch(url, options);
  // const body = await reply.text();
  // fs.writeFileSync('./application/views/payment.html', body, {encoding: 'utf-8'});

  response.render('payuTest.html');
  // response.render('./payment.txt');
};
