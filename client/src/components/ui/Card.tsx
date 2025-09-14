"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

interface CardProps {
  title: string;
  price?: string | number;
  imageSrc?: string;
  onAdd?: () => void;
  className?: string;
  href?: string; // internal route, e.g. /products/123
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
      {/* Constrained wrapper for image */}
      <div className="relative w-full h-56 overflow-hidden bg-neutral-100 rounded-t-xl">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>

        {price != null && (
          <p className="text-primary font-bold mb-3">
            ${Number(price).toFixed(2)}
          </p>
        )}

        <div className="flex gap-3">
          <Button variant="primary" onClick={onAdd}>
            Add to cart
          </Button>

          {href ? (
            <Link href={href} legacyBehavior>
              <Button asLink href={href} variant="ghost">
                View
              </Button>
            </Link>
          ) : (
            <Button variant="ghost">View</Button>
          )}
        </div>
      </div>
    </article>
  );
}
