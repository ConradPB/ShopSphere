export default function HomePage() {
  return (
    <main>
      <section className="test-hero text-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="hero-title">Tailwind Baseline — Test Hero</h1>
          <p className="mt-3">
            If you see a gradient + white text, Tailwind is compiling.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">Card 1</div>
            <div className="bg-white p-6 rounded-lg shadow">Card 2</div>
          </div>
        </div>
      </section>
    </main>
  );
}
