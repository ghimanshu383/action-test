const stripe = require('stripe')('sk_test_51LuiqDSIcd212GzlQxuPGv3dML0Qgc9dY0OF5hZgbjp68o7QUXmpEz1uDD9lA969hGPqV5Z0QrArXKoL2WiCShsN000QMfUx3F');
exports.makeStripepayment = async (request, response, next) =>{
  try {
    // creating the stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${request.protocol}://${request.get('host')}`,
      cancel_url: `${request.protocol}://${request.get('host')}`,
      customer_email: 'g.himanshu383@gmail.com',
      client_reference_id: 'test',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: 100,
            product_data: {
              name: 'Test',
              description: 'This is the test purchase',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    });
    response.json({
      status: 'success',
      session,
    });
  } catch (error) {
    console.log(error);
  }
};
