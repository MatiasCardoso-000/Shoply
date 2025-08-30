import Button from "../Button/Button";

interface ProductCardProps {
  product: { imageUrl: string; title: string; price: number,id:number };
}

const ProductCard = (product: ProductCardProps) => {
  const handlePay = async (product: ProductCardProps) => {
    const res = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        id:product.product.id,
        title: product.product.title,
        price: Number(product.product.price),
        imageUrl: product.product.imageUrl
      }),
      headers: { "Content-type": "application/json" },
    });
    const session = await res.json();

    window.location = session.url;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
      <img
        src={product.product.imageUrl}
        alt={product.product.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.product.title}
        </h3>
        <p className="text-gray-600 font-bold mb-4">
          ${product.product.price / 100}
        </p>
        <Button onClick={() => handlePay(product)}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
