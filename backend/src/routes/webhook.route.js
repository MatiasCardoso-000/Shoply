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

const stripe = new Stripe(process.env.STRIPE_API_KEY);

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
        const session = event.data.object;

        const metadata = JSON.parse(session.metadata.product_info);

        let productListHtml = "";
        metadata.forEach((p) => {
          productListHtml += `
          <div>
            <img src="${`${p.image}`}" alt="${
            p.title
          }" style="max-width: 100px; height: auto" />
            <h3>${p.title}</h3>
            <p>Precio: $${p.price.toFixed(2)}</p>
            <p>Cantidad: ${p.quantity}</p>
          </div>`;
        });

        if (event.type === "checkout.session.completed") {
          // Extrae la información necesaria
          const customerEmail = session.customer_details.email;
          const orderId = session.id;
          // Configura el correo
          const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: customerEmail,
            subject: `Confirmación de tu compra #${orderId}`,
            html: `
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu pedido con ID #${session.id} se ha procesado con éxito. Aquí está el resumen:</p>
          ${productListHtml}  <p>Saludos,</p>
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
        res.status(200).json({ received: true });
        break;

      default:
        console.log("Evento no manejado: ", event.type);
    }
  }
);
