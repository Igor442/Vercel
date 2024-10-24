const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { productId } = req.body;

  try {
    // Criar uma sessão de checkout na Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product: productId,
            unit_amount: 1000, // Defina o preço em centavos (ajuste de acordo com o produto)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://seusite.com/success',
      cancel_url: 'https://seusite.com/cancel',
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    res.status(500).json({ error: 'Não foi possível iniciar o checkout' });
  }
};
