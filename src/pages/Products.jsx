import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  // ⭐ PORTFOLIO CLEANUP: Replaced manual search parsers with React Router's native state hook
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  
  const activeCategory = selectedCategory || "All";

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // 🚀 DEPLOYMENT ARCHITECTURE FIX: Fetch pure repository values from backend server context
    const params = {};
    if (selectedCategory && selectedCategory !== "All") params.category = selectedCategory;
    if (searchQuery) params.search = searchQuery;

    getProducts(params)
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Storefront retrieval error:", err);
          setError("Unable to load products. Please try again later.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  // ⭐ PERFORMANCE OPTIMIZATION: Memoize backend array returns to protect downstream renders
  const displayedProducts = useMemo(() => {
    return products;
  }, [products]);

  return (
    <div className="w-full mt-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      
      {/* TITLE CONTAINER HEADINGS */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-medium text-[#805374] tracking-tight">
          {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory === "All" ? "All Creations" : activeCategory}
        </h1>
        <p className="mt-3 text-gray-500 text-sm md:text-base">
          {!loading && `${displayedProducts.length} premium arrangements available`}
        </p>
      </div>

      {/* LOADING STATE PLACEHOLDERS */}
      {loading ? (
        /* 💼 RECRUITER QUALITY FEATURE: Shimmering skeleton grid loader replacing raw text displays */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col space-y-4">
              <div className="bg-gray-200 aspect-[4/5] rounded-2xl w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500 font-medium">{error}</div>
      ) : displayedProducts.length === 0 ? (
        /* EMPTY RESPONSE RETRY LAYOUTS */
        <div className="text-center py-20 max-w-md mx-auto">
          <div className="text-4xl mb-4">🌸</div>
          <h2 className="text-xl font-medium text-[#805374]">No arrangement matches found</h2>
          <p className="mt-2 text-gray-500 text-sm">
            We couldn't locate any bouquets matching your current keyword selection. Try searching for a different creation type.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 px-6 py-2.5 bg-[#805374] text-white rounded-full text-sm font-medium hover:opacity-90 active:scale-95 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* 📱 RESPONSIVE GRID LAYOUT ACCORDANCE FIX */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;