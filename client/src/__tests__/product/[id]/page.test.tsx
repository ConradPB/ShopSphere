jest.mock("@/lib/supabase", () => ({
  getProductById: jest.fn(),
  getRecommendations: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import * as supabaseLib from "@/lib/supabase";
import ProductPage from "@/app/product/[id]/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

const mockGetProductById = supabaseLib.getProductById as jest.MockedFunction<
  typeof supabaseLib.getProductById
>;
const mockGetRecommendations =
  supabaseLib.getRecommendations as jest.MockedFunction<
    typeof supabaseLib.getRecommendations
  >;
