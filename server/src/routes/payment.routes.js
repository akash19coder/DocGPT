import Router from "express";
import { userAuth } from "../middleware/userAuth.js";
import stripe from "stripe";

const router = Router();
const stripe = new stripe(process.env.STRIPE_SECRET_KEY);

router.route("/payment/create-intent").post(userAuth, async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
