import React, { useMemo } from "react";
import { motion } from "framer-motion";
import products from "../../server/data/products"; 
import ProductCard from "./ProductCard";

export default function Bouquets() {
  // ⚡ PERFORMANCE FIX: useMemo caches array filtering, preventing recalculations on unrelated renders
  // 🔒 SECURITY FIX: Added safe optional chaining to prevent undefined array crashes
  const bouquetProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((item) => item?.category === "Bouquets");
  }, []);

  // Framer Motion staggered orchestration layout configuration setup
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-medium text-[#805374] tracking-tight">
          Our Signature Bouquets
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base max-w-md mx-auto">
          Handcrafted arrangements made with love, care, and elegant aesthetic detail
        </p>
      </div>

      {/* EMPTY CATALOG DATA VIEW FALLBACK */}
      {bouquetProducts.length === 0 ? (
        <div className="text-center py-12 bg-white/30 backdrop-blur-md rounded-2xl border border-dashed border-gray-200 p-6 max-w-sm mx-auto">
          <p className="text-gray-500 text-sm font-medium">No bouquets available right now.</p>
          <p className="text-gray-400 text-xs mt-1">Check back soon for fresh seasonal arrivals!</p>
        </div>
      ) : (
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {bouquetProducts.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <ProductCard product={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
      
    </div>
  );
}