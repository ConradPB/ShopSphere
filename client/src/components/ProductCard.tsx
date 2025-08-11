import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    name?: string;
    image_url?: string;
    price?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageSrc =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : "https://placehold.co/600x400?text=No+Image";

  const displayName =
    product.name && product.name.trim() !== ""
      ? product.name
      : "Unnamed Product";

  return (
    <div className="product-card" data-testid="product-card">
      <img src={imageSrc} alt={displayName} />
      <h3>{displayName}</h3>
      <p>${product.price ?? 0}</p>
    </div>
  );
};

export default ProductCard;
