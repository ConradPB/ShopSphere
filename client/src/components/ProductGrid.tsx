"use client";

import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/products";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  initialProducts?: Product[];
  title?: string;
};
