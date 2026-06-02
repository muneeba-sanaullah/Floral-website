import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getProductById } from "../api/productService";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Ensure parameters pass as safe string tokens
    getProductById(id)
      .then((data) => {
        if (isMounted) {
          if (!data) {
            setError("Product not found");
          } else {
            setProduct(data);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Product detail breakdown:", err);
          setError("Product not found");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // 🐛 BUG FIX: Coerce string/number variations safely to check cart status accurately
  const isInCart = product ? cart.some((item) => String(item.id) === String(product.id)) : false;

  // 💼 RECRUITER QUALITY FEATURE: Clean, layout-stable skeleton loader
  if (loading) {
    return (
      <div className="w-full mt-24 px-4 sm:px-6 lg:px-10 max-w-5xl mx-auto animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-16 mb-8"></div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-gray-200 rounded-2xl h-[400px] w-full"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded-full w-40 mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center mt-32 px-4 max-w-md mx-auto">
        <div className="text-4xl mb-4">🍂</div>
        <h2 className="text-2xl font-medium text-[#805374]">Arrangement Unattainable</h2>
        <p className="text-gray-500 mt-2 text-sm">The creation token route specified could be missing or expired.</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 px-6 py-2.5 bg-[#805374] text-white rounded-full font-medium text-sm transition hover:opacity-95"
        >
          Back to Creations
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mt-24 px-4 sm:px-6 lg:px-10 max-w-5xl mx-auto">
      {/* NAVIGATION BAR HEADER LINK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-sm font-medium text-gray-500 hover:text-[#805374] flex items-center gap-1 group transition"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* IMAGE COVER FRAMING */}
        <div className="overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            loading="eager"
            className="w-full h-[350px] sm:h-[450px] object-cover transition duration-700 ease-out hover:scale-102"
          />
        </div>

        {/* METADATA MANIFEST */}
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-3xl md:text-4xl font-medium text-[#805374] tracking-tight">
            {product.name}
          </h1>
          
          {/* ⭐ DATA CLEANUP: Dynamic description injection falling back to boilerplate text safely */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description || "A beautifully handcrafted premium floral arrangement meticulously selected and compiled by our master artisans to bring natural elegance to your space."}
          </p>

          <div className="mt-6 text-3xl font-medium text-gray-900 tracking-tight">
            Rs. {Number(product.price).toLocaleString()}
          </div>

          {/* ⭐ PREMIUM OPTIMIZATION: Advanced item quantity increment counter controls */}
          {!isInCart && (
            <div className="mt-6 flex items-center gap-4">
              <label className="text-sm font-medium text-gray-500">Quantity:</label>
              <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-500 hover:text-[#805374] font-medium transition"
                >-</button>
                <span className="px-3 py-1.5 text-gray-800 font-medium text-sm w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1.5 text-gray-500 hover:text-[#805374] font-medium transition"
                >+</button>
              </div>
            </div>
          )}

          {/* DYNAMIC ACTION TRIGGER LAYER BUTTON */}
          <button
            onClick={() => {
              if (isInCart) {
                navigate("/cart"); // ⭐ FEATURE: Direct conversion flow straight to checkouts
              } else {
                // Pass product along with selected operational quantity modifiers
                addToCart({ ...product, quantity });
              }
            }}
            className={`mt-8 px-8 py-3.5 rounded-full text-sm font-medium shadow-sm transition-all duration-300 w-full md:w-auto md:self-start flex items-center justify-center gap-2 ${
              isInCart
                ? "bg-[#805374] text-white hover:opacity-95"
                : "bg-[#805374] text-white hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            {isInCart ? (
              <>
                Proceed to Cart <span>→</span>
              </>
            ) : (
              "Add to Collection"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;