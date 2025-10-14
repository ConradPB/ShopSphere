import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndFilterClient from "@/components/SearchAndFilterClient";
import "@testing-library/jest-dom";

const mockProducts = [
  {
    id: "1",
    title: "Apple",
    price: 1.5,
    image: "/apple.jpg",
    description: "Fresh apple",
    category: "fruits",
  },
  {
    id: "2",
    title: "Banana",
    price: 1.0,
    image: "/banana.jpg",
    description: "Sweet banana",
    category: "fruits",
  },
  {
    id: "3",
    title: "Carrot",
    price: 0.8,
    image: "/carrot.jpg",
    description: "Healthy carrot",
    category: "vegetables",
  },
  {
    id: "4",
    title: "Detergent",
    price: 3.2,
    image: "/detergent.jpg",
    description: "Powerful cleaner",
    category: "household",
  },
];
