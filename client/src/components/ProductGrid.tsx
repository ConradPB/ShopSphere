"use client";

import React, { useEffect, useState } from "react";
import { getAllProducts, Product } from "@/lib/products";
import ProductCard from "./ProductCard";

type Props = {
  initialProducts?: Product[];
  title?: string;
};
