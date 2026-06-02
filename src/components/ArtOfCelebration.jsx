import React from "react";
import { motion } from "framer-motion";

const CELEBRATIONS = [
  {
    id: "large-accent",
    title: "Luxury Events",
    tag: "Curated Design",
    img: "https://plus.unsplash.com/premium_photo-1674235766400-b2642b8ffa43?w=800&auto=format&fit=crop&q=75",
    gridClasses: "col-span-12 md:col-span-5 row-span-2 md:row-span-3 h-64 md:h-auto"
  },
  {
    id: "small-top",
    title: "Cakes & Joy",
    tag: "Sweet Moments",
    img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=75",
    gridClasses: "col-span-6 md:col-span-3 row-span-1 h-36 md:h-auto"
  },
  {
    id: "vertical-accent",
    title: "Birthdays",
    tag: "Memories",
    img: "https://images.unsplash.com/photo-1732495522010-e0db10e3a56c?w=600&auto=format&fit=crop&q=75",
    gridClasses: "col-span-6 md:col-span-4 row-span-2 h-76 md:h-auto"
  },
  {
    id: "bottom-left",
    title: "Anniversaries",
    tag: "Elegant Love",
    img: "https://images.unsplash.com/photo-1774290687229-a725965554c6?w=600&auto=format&fit=crop&q=75",
    gridClasses: "col-span-6 md:col-span-3 row-span-2 h-76 md:h-auto"
  },
  {
    id: "wide-bottom",
    title: "Weddings",
    tag: "Forever",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=75",
    gridClasses: "col-span-6 md:col-span-4 row-span-1 h-36 md:h-auto"
  }
];

export default function ArtOfCelebration() {
  // Framer Motion layout transition variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">

      {/* HEADER SECTION */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-medium text-[#805374] tracking-tight">
          Art of Celebration
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-sm mx-auto font-light">
          Moments beautifully wrapped in custom floral design, rich colors & absolute joy.
        </p>
      </div>

      {/* 📱 RESPONSIVE BENTO GRID FIX: Math-corrected layout tracks with optimized row height maps */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-12 gap-4 md:gap-5 auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px]"
      >
        {CELEBRATIONS.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className={`${item.gridClasses} relative rounded-2xl md:rounded-3xl overflow-hidden group bg-gray-50 border border-gray-100 shadow-sm`}
          >
            {/* Image Layer */}
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* 🍏 PREMIUM GRADIENT & TEXT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 z-10 transform translate-y-2 md:translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out hidden md:block">
              <span className="text-[10px] uppercase tracking-widest text-white/70 font-semibold">
                {item.tag}
              </span>
              <h3 className="text-white text-lg font-medium tracking-wide mt-0.5">
                {item.title}
              </h3>
            </div>

            {/* Always-on Mobile Fallback Text Labels */}
            <div className="absolute bottom-3 left-3 z-10 md:hidden bg-black/40 backdrop-blur-sm py-1 px-2.5 rounded-full">
              <h3 className="text-white text-xs font-medium tracking-wide">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}