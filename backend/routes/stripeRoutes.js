const express = require('express');
const router = express.Router();
const { createCheckoutSession, getSessionStatus } = require('../controllers/stripeController');
const stripe = require("stripe")(process.env.Stripe_Secret_Key);

router.post('/create-checkout-session', createCheckoutSession);
router.get('/session-status', getSessionStatus);

router.get('/return', async (req, res) => {
    const sessionId = req.query.session_id;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.status === 'complete') {
        res.redirect(`${process.env.Hosted_Domain}/return?status=complete&email=${session.customer_details.email}`);
        } else {
        res.redirect(`${process.env.Hosted_Domain}/return?status=open`);
        }
    } catch (error) {
        console.error("Error retrieving session status:", error);
        res.redirect(`${process.env.Hosted_Domain}/return?status=error`);
    }
});

module.exports = router;