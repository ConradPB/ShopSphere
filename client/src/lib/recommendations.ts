import type { Product } from "@/types/product";

export function getRecommendedProducts(): Product[] {
  return [
    {
      id: "1",
      title: "Stylish Leather Bag",
      price: 89.99,
      image: "/products/bag.jpg",
      description: "A premium leather bag with elegant design.",
      category: "Accessories",
    },
    {
      id: "2",
      title: "Noise Cancelling Headphones",
      price: 199.99,
      image: "/products/headphones.jpg",
      description: "Experience crystal clear sound with noise cancellation.",
      category: "Electronics",
    },
    {
      id: "3",
      title: "Sports Running Shoes",
      price: 59.99,
      image: "/products/shoes.jpg",
      description: "Lightweight and comfortable running shoes.",
      category: "Footwear",
    },
  ];
}
