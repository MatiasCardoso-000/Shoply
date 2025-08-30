import express from "express";
import { Stripe } from "stripe";

export const router = express.Router();

const stripe = new Stripe(
 process.env.STRIPE_API_KEY
);

router.post("/", async (req, res) => {
  const {title,imageUrl,price,id} =  req.body;

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:5173/success",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${title}`,
            images: [`https://9js0wz42-5173.brs.devtunnels.ms/${imageUrl}`],
          },
          unit_amount: `${price}`,
        },
        
        quantity: 1,
      },
    ],
    metadata: {
      product_name: title,
      product_image: `https://9js0wz42-5173.brs.devtunnels.ms/${imageUrl}`,
      productId: id,
      product_price: price
    },
    mode: "payment",
  });

  return res.json(session);
});
