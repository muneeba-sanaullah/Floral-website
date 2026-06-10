import React from "react";
import products from "../../server/data/products";
import ProductCard from "./ProductCard";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

function BestSellers() {
  const bestSellers = products.filter((p) => p.bestSeller);

  const {
    scrollRef,
    scroll,
    showLeft,
    showRight,
    checkScroll,
  } = useHorizontalScroll(300);

  return (
    // Zero edge padding on mobile so cards bleed off the screen, showing it can swipe
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 mt-20 relative">

      {/* Heading */}
      <h2 className="text-1xl md:text-3xl font-medium text-[#805374] mb-8 text-center tracking-wide px-4">
        Best Sellers
      </h2>

      {/* Left Arrow - KEPT ORIGINAL AS REQUESTED */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-30"
        >
          <div
            className="p-3 rounded-full bg-white shadow-sm transition-all duration-300 hover:scale-110"
          >
            ‹
          </div>
        </button>
      )}

      {/* Right Arrow - KEPT ORIGINAL AS REQUESTED */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-30"
        >
          <div
            className="p-3 rounded-full bg-white shadow-sm transition-all duration-300 hover:scale-110"
          >
            ›
          </div>
        </button>
      )}

      {/* Scroll Row */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        // added native 'snap-x' to lock cards neatly in place on mobile touch swipes
        className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-4 sm:px-2 py-4"
      >
        {bestSellers.map((product) => (
          <div
            key={product.id}
            // Card scale matches screen widths perfectly instead of hardcoding min-w-[250px]
            className="w-[72vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] flex-shrink-0 snap-start relative z-10 transition-all duration-300 hover:z-40 hover:-translate-y-1"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default BestSellers;