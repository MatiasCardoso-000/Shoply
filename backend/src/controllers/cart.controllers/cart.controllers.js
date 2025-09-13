import { Cart } from "../../models/Cart.js";
import { CartItems } from "../../models/CartItems.js";
import { Product } from "../../models/Product.js";

const addProductToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const id = req.user;

  try {
    const [cart, created] = await Cart.findOrCreate({
      where: {
        user_id: id,
      },
      defaults: { user_id: id },
    });

    const existingCartItem = await CartItems.findOne({
      where: { cart_id: cart.cart_id, product_id: product_id },
    });

    if (!existingCartItem) {
      await CartItems.create({
        cart_id: cart.cart_id,
        product_id: product_id,
        quantity: quantity,
        user_id: id,
      });
    } 

    return res
      .status(200)
      .json({ message: "Products added to cart successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const id = req.user;

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const products = await Product.findAll();

    const productId = products.map((p) => p.product_id);

    const cartItems = await CartItems.findAll({
      where: { product_id: productId },
    });

    const productInCart = products.filter((product) =>
      cartItems.some((item) => item.product_id === product.product_id)
    );

    const cartWithQuantity = productInCart.map((product) => {
      const cartItem = cartItems.find(
        (item) => item.product_id === product.product_id
      );
      return {
        ...product.dataValues,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });

    res.status(200).json(cartWithQuantity);
  } catch (error) {
    console.log(error);
  }
};

const updateCart = async (req, res) => {
  const id = req.user;
  const { product_id, quantity } = req.body;

  try {

    const userCart = await Cart.findOne({where: {
      user_id: id
    }})


    const existingCartItem = await CartItems.findOne({
      where: { cart_id: userCart.cart_id, product_id: product_id },
    });

    if(existingCartItem){
      await CartItems.update({
        quantity: quantity
      }, {
        where: { cart_id: userCart.cart_id, product_id: product_id }
      }) 
    }

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const id = req.user;

    const userCart = await Cart.findOne({
      where: {
        user_id: id,
      },
    });

    const userCartItems = CartItems.findOne({
      where: {
        user_id: id,
      },
    });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!userCartItems) {
      return res.status(404).json({ message: "Cart items not found" });
    }

    await CartItems.destroy({ where: { user_id: id } });
    await Cart.destroy({ where: { user_id: id } });
    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CartControllers = {
  addProductToCart,
  getUserCart,
  updateCart,
  clearCart,
};
