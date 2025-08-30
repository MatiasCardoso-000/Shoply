import express from "express";
import { Stripe } from "stripe";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

export const router = express.Router();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const stripe = new Stripe(
process.env.STRIPE_API_KEY
);

const endpointSecret = process.env.ENDPOINT_SECRET;

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        String(req.body),
        sig,
        endpointSecret
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }

    switch (event.type) {
      case "checkout.session.completed":
        const checkOutSessionCompleted = event.data.object;
        // console.log({checkOutSessionCompleted});

        console.log(
          "Consultando producto con id: ",
          checkOutSessionCompleted.metadata.productId
        );

        if (event.type === "checkout.session.completed") {
          const session = event.data.object;

          // Extrae la información necesaria
          const customerEmail = session.customer_details.email;
          const orderId = session.id;
          const product_name = checkOutSessionCompleted.metadata.product_name;
          const product_image = checkOutSessionCompleted.metadata.product_image;
          const product_price = checkOutSessionCompleted.metadata.product_price;
          // Configura el correo
          const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: customerEmail,
            subject: `Confirmación de tu compra #${product_name}`,
            html: `
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu pedido con ID # <strong>${orderId} </strong> se ha procesado con éxito. </p>
          <img src="${product_image}" alt="${product_name}" style="max-width: 200px; height: auto;"/>
          <p >Total: <span style="font-size: 20px; font-weight:bold"> $${product_price} </span></p>
          <p>El producto <strong> ${product_name}</strong>  lo enviaremos pronto.
          <p>Saludos,</p>
          <p>El equipo de la tienda</p>
        `,
          };

          // Envía el correo
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error al enviar el correo:", error);
            } else {
              console.log("Correo enviado:", info.response);
            }
          });
        }

        break;

      default:
        console.log("Evento no manejado: ", event.type);
    }

    return res.status(200);
  }
);
