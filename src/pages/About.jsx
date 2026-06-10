import Reveal from "../components/Reveal";

function About() {
  return (
    <div className="w-full mt-20">

      {/* HERO */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center px-6 overflow-hidden bg-[#FFF8F5]">
        <div className="absolute w-[500px] h-[500px] bg-[#805374]/10 rounded-full blur-3xl -top-24 -left-24 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-pink-200/20 rounded-full blur-3xl -bottom-24 -right-24 pointer-events-none" />

        <div className="relative max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-medium text-[#805374] tracking-tight">
            Flowers that tell stories
          </h1>

          <p className="mt-6 text-gray-500 text-base md:text-lg leading-relaxed">
            Bloom & Blossom is a floral studio crafting emotion-driven
            arrangements that transform everyday moments into timeless memories.
          </p>
        </div>
      </div>

      {/* STORY SECTION 1 */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl text-[#805374] font-medium">
            Designed with emotion
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed text-sm md:text-base">
            Every bouquet begins with a feeling — joy, love, celebration, or
            memory. We don’t just arrange flowers, we translate emotion into form.
          </p>
        </section>
      </Reveal>

      {/* IMAGE SHOWCASE SECTION */}
      <Reveal>
        <section className="px-6">
          <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-sm">
            <img
  src="https://plus.unsplash.com/premium_photo-1676997843315-f5b433883c7d?auto=format&fit=crop&q=80&w=2400"
  alt="Artisanal floral arrangement"
  loading="lazy" 
  className="w-full h-64 sm:h-96 md:h-[500px] object-cover hover:scale-102 transition-transform duration-700 ease-out"
/>
          </div>
        </section>
      </Reveal>

      {/* STORY SECTION 2 */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl text-[#805374] font-medium">
            Crafted by hand, not machines
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed text-sm md:text-base">
            Each arrangement is carefully built by floral artisans who focus on
            balance, texture, and natural harmony — ensuring every piece feels
            alive, not manufactured.
          </p>
        </section>
      </Reveal>

      {/* VALUES */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

            {[
              {
                title: "Elegance",
                desc: "Minimal, timeless floral design language.",
              },
              {
                title: "Emotion",
                desc: "Every arrangement carries meaning and memory.",
              },
              {
                title: "Craftsmanship",
                desc: "Hand-built with precision and care.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300 border border-gray-100/50"
              >
                <h3 className="text-[#805374] font-medium mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </section>
      </Reveal>

    </div>
  );
}

export default About;