"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 md:px-16">
      <section className="max-w-5xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Contact <span className="text-primary">Us</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground">
          Got a question or just want to say hello? We’d love to hear from you!
        </p>
      </section>

      <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Get in Touch
          </h2>
          <div className="flex items-center space-x-4">
            <Mail className="text-primary" />
            <p>support@shopsphere.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-primary" />
            <p>+1 (800) 555-0199</p>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="text-primary" />
            <p>123 Innovation Drive, San Francisco, CA</p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      <div className="text-center mt-16">
        <Link
          href="/"
          className="text-primary font-medium hover:underline transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
