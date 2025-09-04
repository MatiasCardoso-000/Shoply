import express from "express";
import { Stripe } from "stripe";

export const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY);

router.post("/", async (req, res) => {
  const cart = req.body;

  const productData = Array.isArray(cart)
    ? cart.map((p) => {
        return {
          title: p.title,
          image: `${p.image}`,
          id: p.id,
          price: p.price * 100,
          quantity: p.quantity
        };
      })
    : [];

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:5173/success",
    line_items: productData.map((p) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: p.title,
            images: [`${p.image}`],
          },
          unit_amount: p.price,
        },

        quantity: p.quantity,
      };
    }),
    metadata: { product_info: JSON.stringify(productData) },

    mode: "payment",
  });

  return res.json(session);
});
