import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/products.types";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

 const handlePay = async (cart: Product[]) => {
    const res = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: { "Content-type": "application/json" },
    });
    const session = await res.json();

    window.location = session.url;
  };

  return (
    <div className="w-4/5 mx-auto my-8 border border-gray-300 p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-gray-200 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-gray-200 border border-gray-300 px-2 py-1 cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-gray-200 border border-gray-300 px-2 py-1 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

             <div className="mt-4 text-right">
            <h3 className="text-xl font-bold">
              Total: ${getTotal().toFixed(2)}
            </h3>
            <div className="w-full flex justify-end gap-4 ">
              <button
                onClick={()=>handlePay(cart)}
                className="bg-sky-400 text-white px-4 py-2 mt-2 cursor-pointer"
              >
                Pay
              </button>
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 mt-2 cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
          </div>
         
        </>
      )}
    </div>
  );
};
