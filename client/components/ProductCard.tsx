import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
}

interface ProductCardProps {
  product: Product;
}
