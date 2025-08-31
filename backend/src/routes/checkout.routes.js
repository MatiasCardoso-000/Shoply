import express from "express";
import { Stripe } from "stripe";

export const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY);

router.post("/", async (req, res) => {
  const cart = req.body;

  const productData = Array.isArray(cart)
    ? cart.map((p) => ({
        name: p.title,
        image: p.imageUrl,
        price: p.price,
        quantity: p.quantity,
        id: p.id,
      }))
    : [];

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:5173/success",
    line_items: productData.map((p) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: p.name,
            images: [`https://9js0wz42-5173.brs.devtunnels.ms/${p.image}`],
          },
          unit_amount: p.price,
        },

        quantity: p.quantity,
      };
    }),
    metadata: productData.map(({ name, id, price,image }) =>
      JSON.stringify({
        name,
        product_image: `https://9js0wz42-5173.brs.devtunnels.ms/${image}`,
        id,
        price,
      })
    ),
    mode: "payment",
  });

  return res.json(session);
});
