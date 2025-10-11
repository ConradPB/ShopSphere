"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/cartSlice";
import { shimmer, toBase64 } from "@/lib/blur";
import type { Product } from "@/types/product";
import WishlistButton from "./ui/WishlistButton";

interface ProductCardProps {
  product: Product;
}
