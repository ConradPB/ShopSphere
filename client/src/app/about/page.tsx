"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-gray-100 py-20 px-6">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          About ShopSphere
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          Once upon a caffeine-fueled afternoon, a few overambitious devs asked
          the question no one dared to:{" "}
          <span className="text-cyan-400 font-semibold">
            “What if online shopping actually felt... fun?”
          </span>
          <br />
          Thus, <strong>ShopSphere</strong> was born — part marketplace, part
          adventure, all powered by good code and bad jokes.
        </p>

        <div className="bg-neutral-800/60 rounded-2xl p-6 shadow-lg border border-neutral-700 mb-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We’re on a mission to make discovering products feel like opening a
            gift — every single time. Whether you’re shopping for sneakers,
            gadgets, or that weirdly specific kitchen tool you saw on TikTok,
            we’ve got you covered.
          </p>
        </div>

        <div className="bg-neutral-800/60 rounded-2xl p-6 shadow-lg border border-neutral-700 mb-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            The ShopSphere Code
          </h2>
          <ul className="text-gray-300 leading-relaxed space-y-3 text-left md:text-center list-none">
            <li>
              🛍️ <strong>Shop smart.</strong> Never settle for boring deals.
            </li>
            <li>
              🤖 <strong>Build cool stuff.</strong> Tech should make life
              smoother.
            </li>
            <li>
              💬 <strong>Keep it real.</strong> Humans &gt; algorithms (most
              days).
            </li>
            <li>
              🌍 <strong>Stay kind.</strong> We’re all in one big digital
              bazaar.
            </li>
          </ul>
        </div>

        <p className="text-gray-400 italic mb-10">
          ShopSphere — the only shopping platform where your cart is as smart as
          your style.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-[1.03] transition"
        >
          Get in Touch
        </Link>
      </section>
    </main>
  );
}
