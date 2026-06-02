import React, { useContext, useState, useEffect, memo } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);
  const navigate = useNavigate();

  // Safely fallback to prevent runtime deployment crashes if fields are missing
  const { id, name = "Unnamed Arrangement", price = 0, image = "", category = "" } = product || {};

  // ⚡ PERFORMANCE FIX: Evaluates inclusion accurately without breaking render frames
  const isInCart = cart?.some((item) => item.id === id) ?? false;

  // 🐛 LIFECYCLE BUG FIX: Properly clear the timer when the component unmounts to prevent memory leaks
  useEffect(() => {
    let timer;
    if (justAdded) {
      timer = setTimeout(() => setJustAdded(false), 900);
    }
    return () => clearTimeout(timer); // Clean up automatically on route or component changes!
  }, [justAdded]);

  const handleAdd = (e) => {
    e.stopPropagation(); // Stop parent click navigation event from firing

    if (!isInCart) {
      addToCart(product);
      setJustAdded(true);
    }
  };

  // 💼 PORTFOLIO CONFIG: Internationalized currency layout string formatting
  const formattedPrice = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0
  }).format(price);

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="group cursor-pointer flex flex-col w-full"
    >
      {/* Visual Image Layer Container Card */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-gray-50 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1" 
        style={{ willChange: "transform" }}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          // 🔒 SECURITY/CLS FIX: Replaced explicit staggered height variables with fixed aspect container mapping bounds
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Price Tag Overlay */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#805374] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">
          {formattedPrice}
        </div>

        {/* Hover Button panel (Optimized strictly for Desktop Hover Environments) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center backdrop-blur-[2px]">
          <button
            type="button"
            onClick={handleAdd}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all duration-300 transform active:scale-95 ${
              isInCart || justAdded
                ? "bg-green-600 text-white cursor-default"
                : "bg-white text-[#805374] hover:bg-[#805374] hover:text-white"
            }`}
            aria-label={`Add ${name} to shopping cart`}
            disabled={isInCart || justAdded}
          >
            {isInCart || justAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Info Header Bottom Section row */}
      <div className="mt-3 flex items-start justify-between gap-2 px-1">
        <div className="truncate">
          <h3 className="text-sm font-medium text-gray-800 group-hover:text-[#805374] transition-colors duration-200 truncate">
            {name}
          </h3>
          {category && (
            <p className="text-[11px] text-gray-400 mt-0.5">{category}</p>
          )}
        </div>

        {/* 📱 MOBILE FIX: Clear touch targets that change style dynamically for responsive click support */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Quick add ${name} to cart`}
          disabled={isInCart || justAdded}
          className={`md:hidden shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-medium transition-all duration-200 active:scale-90 shadow-sm ${
            isInCart || justAdded
              ? "bg-green-500 text-white"
              : "bg-[#805374] text-white"
          }`}
        >
          {isInCart || justAdded ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}

// ⚡ PERFORMANCE FIX: Wrap the component in React.memo to prevent unnecessary catalog grid item re-renders
export default memo(ProductCard);