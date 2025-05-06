const stripe = require("stripe")(process.env.Stripe_Secret_Key);

if (!process.env.Stripe_Secret_Key) {
  console.error("Stripe Secret Key is not set in environment variables.");
  process.exit(1);
}

const createCheckoutSession = async (req, res) => {
  const { items } = req.body;
  console.log("Creating checkout session for items:", items);

  const line_items = items.map(item => ({
    price_data: {
      currency: 'aud',
      product_data: {
        name: item.name,
        images: [item.image_url],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: line_items,
      mode: 'payment',
      return_url: `${process.env.Hosted_Domain}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Error creating checkout session", error: error.message });
  }
};

const getSessionStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (error) {
    console.error("Error retrieving session status:", error);
    res.status(500).json({ message: "Error retrieving session status", error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
  getSessionStatus
};