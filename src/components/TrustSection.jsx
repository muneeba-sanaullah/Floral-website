import React from "react";
import { motion } from "framer-motion";

export default function TrustSection() {
  return (
    <section className="py-24 bg-[#FFF8F5] border-y border-[#eadede]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Editorial Heading */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-serif text-[#805374] leading-tight">
              Crafted with <br />intention, delivered <br />with care.
            </h2>
            <div className="w-20 h-[2px] bg-[#805374] mt-8 mb-6" />
            <p className="text-gray-600 text-lg">
              We believe every arrangement should be a narrative. Our process combines sustainable sourcing with artisan mastery to ensure your floral experience is nothing short of exceptional.
            </p>
          </div>

          {/* Right: Feature + Testimonial Grid */}
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f1e7e7]">
              <h4 className="font-medium text-[#805374] mb-2">Artisan Philosophy</h4>
              <p className="text-sm text-gray-500">Every stem is hand-selected and styled to capture the unique essence of the season.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f1e7e7]">
              <h4 className="font-medium text-[#805374] mb-2">Sustainable Heart</h4>
              <p className="text-sm text-gray-500">We partner exclusively with ethical growers who prioritize the environment as much as we do.</p>
            </div>

            <div className="md:col-span-2 bg-[#805374] p-10 rounded-2xl text-white">
              <p className="text-lg italic font-light mb-6">
                "Bloom & Blossom transformed our event into a garden oasis. Their eye for detail and color harmony is simply unmatched."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center font-medium">AM</div>
                <div>
                  <p className="text-sm font-medium">Alexandra M.</p>
                  <p className="text-xs text-white/70">Creative Director</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}