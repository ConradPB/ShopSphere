import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <header className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 py-16 bg-gradient-to-r from-primary-light to-primary text-white">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-heading-xl font-display font-bold">
            Discover the Future of Shopping
          </h1>
          <p className="text-body-lg max-w-md">
            Shopsphere brings you an AI-powered shopping experience — curated
            recommendations, seamless browsing, and exclusive deals.
          </p>

          <div className="space-x-4">
            <Link
              href="/shop"
              className="px-6 py-3 bg-white text-primary font-semibold rounded-xl shadow-md hover:bg-neutral-100 transition"
            >
              Start Shopping
            </Link>
            <Link
              href="/learn"
              className="px-6 py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-primary transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image
            src="/fallback-image.jpg"
            alt="Shopping showcase"
            width={500}
            height={400}
            className="rounded-2xl shadow-card object-cover w-full h-auto max-w-md"
            priority
          />
        </div>
      </header>

      {/* FOOTER */}
      <footer className="px-8 py-6 bg-neutral-100 text-neutral-600 text-sm">
        <div className="flex justify-between items-center">
          <span>
            © {new Date().getFullYear()} Shopsphere. All rights reserved.
          </span>
          <div className="space-x-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
