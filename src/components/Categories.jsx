import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Bouquets", image: "https://media.istockphoto.com/id/1733373251/photo/bouquet.webp?a=1&b=1&s=612x612&w=0&k=20&c=eYjG54U-uxAMuF6HnJURdclLyp0l8hhnWNyr3AWaCfo=" },
  { name: "Cakes", image: "https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FrZXN8ZW58MHx8MHx8fDA%3D" },
  // { name: "Flowers", image: "https://plus.unsplash.com/premium_photo-1676475964992-6404b8db0b53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Gift Boxes & Baskets", image: "https://images.unsplash.com/photo-1769286145156-70a40fff80ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEdpZnQlMjBCb3hlcyUyMCUyNiUyMEJhc2tldHN8ZW58MHx8MHx8fDA%3D" },
  { name: "Chocolate Gifts", image: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlfGVufDB8fDB8fHww" },
  { name: "Birthday Flowers", image: "https://images.unsplash.com/photo-1649738308588-07716edfa020?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" },
  { name: "Bundles", image: "https://images.unsplash.com/photo-1769738149814-4ae97be26b85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QnVuZGxlcyUyMGluJTIwZmxvd2VyJTIwc2hvcCUyMGNob2NsYXRlcyUyMGZsb3dlcnMlMjBtb25leSUyMGJvdXF1ZXR0c3xlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Birthday Decoration", image: "https://images.unsplash.com/photo-1636256373111-cddaa1470363?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fEJpcnRoZGF5JTIwRGVjb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Wedding Decoration", image: "https://images.unsplash.com/photo-1613128517587-08dc18819ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D" },
  { name: "Custom Orders", image: "https://images.unsplash.com/photo-1615488913817-095134dfeb54?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

function Categories() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -180 : 180,
      behavior: "smooth",
    });
  };

  const ticking = useRef(false);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setShowLeft(el.scrollLeft > 10);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
      ticking.current = false;
    });
  };

  useEffect(() => {
    checkScroll();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 mt-16 relative">
      <h2 className="text-xl md:text-3xl font-medium text-[#805374] mb-8 text-center tracking-wide px-4">
        Shop by Category
      </h2>

      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-sm p-2 rounded-full hover:scale-105 transition"
        >
          ‹
        </button>
      )}

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-sm p-2 rounded-full hover:scale-105 transition"
        >
          ›
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-4 sm:px-2 py-1"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => {
              // Redirect 'Flowers' to the same destination as 'Bouquets'
              const targetCategory = cat.name === "Flowers" ? "Bouquets" : cat.name;
              navigate(`/products?category=${encodeURIComponent(targetCategory)}`);
            }}
            className="min-w-[140px] md:min-w-[160px] flex-shrink-0 snap-start cursor-pointer group"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={cat.image}
                loading="lazy"
                alt={cat.name}
                className="w-full h-24 md:h-28 object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>

            <p className="mt-3 text-center text-xs md:text-sm font-medium text-gray-600 group-hover:text-[#805374] transition truncate px-1">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;