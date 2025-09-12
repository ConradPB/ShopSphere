import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white shadow-smooth">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo / Brand */}
            <div className="text-heading-md font-display text-primary">
              Baobab Digital
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-8 text-body-base">
              <a href="#" className="hover:text-primary transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="#"
                className="bg-primary text-white px-4 py-2 rounded-xl shadow-card hover:bg-primary-dark transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main className="flex-1">
        <section className="relative bg-primary-light text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div>
              <h1 className="mb-6">
                Build Smarter <br /> with AI-Powered Tools
              </h1>
              <p className="mb-8 text-body-lg max-w-md">
                We help businesses innovate faster with modern, scalable, and
                intelligent solutions designed for the future.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-secondary text-white px-5 py-3 rounded-xl shadow-card hover:bg-secondary-dark transition-colors"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="bg-white text-primary px-5 py-3 rounded-xl shadow-card hover:bg-neutral-100 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-auto">
              <Image
                src="/fallback-image.jpg"
                alt="AI-powered tools"
                width={600} // set width
                height={400} // set height
                className="rounded-2xl shadow-card object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm">
            © {new Date().getFullYear()} Baobab Digital. All rights reserved.
          </p>
          <div className="flex space-x-6 text-body-sm">
            <a href="#" className="hover:text-primary-light transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-light transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary-light transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
