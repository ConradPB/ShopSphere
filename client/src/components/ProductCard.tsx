// src/components/ProductCard.tsx
import React from "react";

type Props = {
  id: string;
  name?: string;
  image: string;
  price: number;
};

const ProductCard: React.FC<Props> = ({
  id,
  name = "Unnamed Product",
  image,
  price,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <h2 className="mt-2 text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
