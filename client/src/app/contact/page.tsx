"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-gray-100 py-20 px-6">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed mb-10">
          Whether you want to talk shop, share an idea, or just say hi — we’d
          love to hear from you.
          <span className="block text-cyan-400 mt-1 font-semibold">
            We’re real humans (mostly) who reply faster than you expect.
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <div className="bg-neutral-800/60 rounded-2xl p-6 shadow-lg border border-neutral-700 hover:border-cyan-500 transition">
            <Mail className="w-10 h-10 mx-auto text-cyan-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-400">support@shopsphere.dev</p>
          </div>

          {/* Phone */}
          <div className="bg-neutral-800/60 rounded-2xl p-6 shadow-lg border border-neutral-700 hover:border-cyan-500 transition">
            <Phone className="w-10 h-10 mx-auto text-cyan-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>

          {/* Location */}
          <div className="bg-neutral-800/60 rounded-2xl p-6 shadow-lg border border-neutral-700 hover:border-cyan-500 transition">
            <MapPin className="w-10 h-10 mx-auto text-cyan-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-400">
              404 Innovation Street, Remote City 🌍
            </p>
          </div>
        </div>

        {/* Message Box */}
        <div className="bg-neutral-800/60 rounded-2xl p-8 shadow-lg border border-neutral-700 mb-10">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            Drop Us a Message
          </h2>
          <p className="text-gray-400 mb-6">
            Don’t worry — this form doesn’t actually send emails yet. It’s just
            here to look cool (for now 😄).
          </p>

          <form className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:border-cyan-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:border-cyan-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-[1.03] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <p className="text-gray-500 text-sm">
          Prefer old-school communication? Send us a postcard. We’ll frame it.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-[1.03] transition mt-8"
        >
          <MessageSquare size={18} /> Back to Home
        </Link>
      </section>
    </main>
  );
}
