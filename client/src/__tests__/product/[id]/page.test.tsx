import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import * as productsLib from "@/lib/products";

jest.mock("@/lib/products");

const mockProduct = {
  id: "1",
  title: "Laptop",
  description: "High performance laptop",
  price: 1200,
  image: "/laptop.png",
};
