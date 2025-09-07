import { Cart } from "../../models/Cart.js";

const addProductToCart = async (req, res) => {
  const cart = req.body;

  try {
    await Promise.all(
      cart.map(async (p) => {
        await Cart.create({
          productId: p.id,
          price: p.price,
          quantity: p.quantity,
        });
      })
    );
    res.status(200).json({ message: "Products added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

export const CartControllers = { addProductToCart,getCart };
