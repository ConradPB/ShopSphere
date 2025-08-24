import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetailClient from "@/components/ProductDetailClient";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Product } from "@/types/product";
