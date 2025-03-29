import Router from "express";
import { userAuth } from "../middleware/userAuth.js";
import Stripe from "stripe";

const router = Router();
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

router.route("/payment/create-intent").post(userAuth, async (req, res) => {
  const { amount, currency } = req.body;
  console.log(amount, currency);
  try {
    console.log("i am inside try block");
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency,
    });
    console.log(payment);
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
