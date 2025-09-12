"use client";
import Image from "next/image";
import React from "react";
import Button from "./Button";

interface CardProps {
  title: string;
  price?: string | number;
  imageSrc?: string;
  onAdd?: () => void;
  className?: string;
  href?: string;
}

export default function Card({
  title,
  price,
  imageSrc,
  onAdd,
  className = "",
  href,
}: CardProps) {
  const img = imageSrc ?? "/fallback-image.jpg";
  return (
    <article className={`card overflow-hidden ${className}`}>
      <div className="w-full h-56 relative bg-neutral-100">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        {price != null && (
          <p className="text-primary font-bold mb-3">${price}</p>
        )}

        <div className="flex gap-3">
          <Button variant="primary" onClick={onAdd}>
            Add to cart
          </Button>
          <Button variant="ghost" asLink href={href ?? "#"}>
            View
          </Button>
        </div>
      </div>
    </article>
  );
}
