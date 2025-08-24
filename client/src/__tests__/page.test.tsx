// Mock supabase BEFORE importing the page so the module that creates a client
// (which uses env vars) never runs in tests.
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import * as supabaseLib from "@/lib/supabase";
import HomePage from "@/app/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";

// typed reference to mocked function (no `any`)
const mockGetProducts = supabaseLib.getProducts as jest.MockedFunction<
  typeof supabaseLib.getProducts
>;
