interface ProductCardProps {
  title: string;
  image: string;
  price: number;
}

export default function ProductCard({ title, image, price }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
