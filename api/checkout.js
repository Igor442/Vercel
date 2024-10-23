const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { productId } = req.body;

  const price = await stripe.prices.list({
    product: productId,
    limit: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: price.data[0].id,
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://sualoja.com/success',
    cancel_url: 'https://sualoja.com/cancel',
  });

  res.status(200).json({ sessionId: session.id });
};