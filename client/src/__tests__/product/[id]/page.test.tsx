import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// ✅ Mock Supabase + recommendations
const mockGetProductById = jest.fn();
jest.mock("@/lib/supabase", () => ({
  getProductById: (...args: any[]) => mockGetProductById(...args),
}));

const mockGetRecommendations = jest.fn();
jest.mock("@/lib/recommendations", () => ({
  getRecommendations: (...args: any[]) => mockGetRecommendations(...args),
}));
