import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const ProductDetailClient: React.FC<{ product: Product }> = ({ product }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext is not available. Wrap in CartProvider.");
  }

  const { dispatch } = cartContext;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailClient;
