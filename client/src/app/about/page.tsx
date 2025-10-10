"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-16">
      <section className="max-w-5xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          About <span className="text-primary">ShopSphere</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Where technology meets style — your one-stop destination for smart,
          seamless shopping.
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-primary">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2025, ShopSphere began as a small idea to make online
            shopping fun again. Built by dreamers, coders, and caffeine addicts,
            we wanted to create a platform where every shopper feels connected —
            not just to products, but to possibilities.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We blend powerful tech, user-first design, and just a touch of AI
            magic to bring you the next evolution of e-commerce — smarter,
            faster, and more personal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1556742043-3c52d6e88c62"
            alt="ShopSphere team at work"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          Our Mission
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          To empower every shopper to discover products they love — faster,
          smarter, and with joy. We believe shopping should be more than a
          transaction — it’s an experience that connects people, cultures, and
          creativity.
        </p>
      </section>
    </main>
  );
}
