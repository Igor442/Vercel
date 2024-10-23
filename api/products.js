const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const products = await stripe.products.list({
    limit: 10,
  });

  const prices = await stripe.prices.list({
    limit: 10,
  });

  const productData = products.data.map(product => {
    const price = prices.data.find(p => p.product === product.id);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: price.unit_amount,
    };
  });

  res.status(200).json(productData);
};
