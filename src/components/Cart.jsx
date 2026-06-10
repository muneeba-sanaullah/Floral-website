import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";

// Utility function to safely normalize prices into real numbers anywhere
const normalizePrice = (price) => {
  if (typeof price === "number") return price;
  if (!price || typeof price !== "string") return 0;
  
  // Handles floats/decimals gracefully while stripping characters
  const parsed = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
};

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useContext(CartContext);
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);

  // ⚡ PERFORMANCE FIX: useMemo caches cart value sums to prevent calculation jank
  const { totalAmount, totalItems } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const clearPrice = normalizePrice(item.price);
        acc.totalAmount += clearPrice * item.quantity;
        acc.totalItems += item.quantity;
        return acc;
      },
      { totalAmount: 0, totalItems: 0 }
    );
  }, [cart]);

  // 🚀 CLEANUP: Extracted checkout controller handler out of the layout JSX
  const handleCheckout = async (e) => {
    e.preventDefault(); // Safety stop
    if (cart.length === 0 || checkoutLoading) return;

    setCheckoutLoading(true);

    try {
      const sanitizedItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: normalizePrice(item.price),
        quantity: item.quantity,
      }));

      // 💼 PORTFOLIO FIX: Uses environmental fallback mapping to prevent deployment checkout crashes
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4242";
      
      const resp = await fetch(`${API_URL}/mock-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: sanitizedItems,
          successUrl: `${window.location.origin}/checkout/success`,
        }),
      });

      const data = await resp.json().catch(() => ({}));

      // Create a completedOrder snapshot so the success page can render reliably
      try {
        const mockOrder = {
          session_id: "bloom_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          amount_total: totalAmount,
          itemsList: cart,
          items: JSON.stringify(cart),
        };
        localStorage.setItem("completedOrder", JSON.stringify(mockOrder));
        try {
          localStorage.setItem("lastOrder", JSON.stringify(cart));
        } catch (err) {}
      } catch (err) {
        // ignore
      }

      // clear cart both in state and storage so full-page navigations won't resurrect it
      try {
        clearCart();
      } catch (err) {
        // ignore
      }
      try {
        localStorage.removeItem("cart");
      } catch (err) {
        // ignore
      }

      // Programmatic routing redirects
      window.location.href = data?.url ? data.url : "/checkout/success";
    } catch (err) {
      console.error("Checkout process failed:", err);
      try {
        const mockOrder = {
          session_id: "bloom_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          amount_total: totalAmount,
          itemsList: cart,
          items: JSON.stringify(cart),
        };
        localStorage.setItem("completedOrder", JSON.stringify(mockOrder));
      } catch (e) {}
      try {
        clearCart();
      } catch (e) {}
      try {
        localStorage.removeItem("cart");
      } catch (e) {}
      window.location.href = "/checkout/success";
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 min-h-[70vh]">
      <h2 className="text-2xl md:text-3xl font-medium text-[#805374] mb-10 text-center tracking-tight">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-gray-100 max-w-md mx-auto">
          <p className="text-gray-500 font-medium">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-1">Add some beautiful blossoms to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ITEMS LIST COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const currentPrice = normalizePrice(item.price);
              
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/40 backdrop-blur-lg p-4 rounded-2xl border border-white/40 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {/* 📱 MOBILE RESPONSIVE ADAPTIONS */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-xl bg-gray-50"
                  />

                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-medium text-gray-800 text-base md:text-lg tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">
                        Rs. {currentPrice.toLocaleString()}
                      </p>
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          // 🔒 ZERO QUANTITY SAFETY PROTECTION
                          if (item.quantity <= 1) {
                            removeFromCart(item.id);
                          } else {
                            decreaseQty(item.id);
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition font-medium text-lg"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span className="min-w-[24px] text-center text-sm font-semibold text-gray-700">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition font-medium text-lg"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 text-xs font-medium hover:text-red-500 transition self-end sm:self-center bg-red-50/50 hover:bg-red-50 px-3 py-1.5 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY SIDEBAR CARD */}
          <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl border border-white/50 shadow-sm sticky top-24">
            <h3 className="text-lg font-medium mb-4 text-[#805374] tracking-wide">
              Order Summary
            </h3>

            <div className="space-y-3 border-b border-gray-100 pb-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-medium text-gray-800">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-lg pt-4 text-gray-800">
              <span>Total Amount</span>
              <span className="text-[#805374]">Rs. {totalAmount.toLocaleString()}</span>
            </div>

            {/* DOUBLE-CLICK LOCKOUT BUTTON CONTROL */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutLoading || cart.length === 0}
              className="w-full mt-6 bg-[#805374] text-white py-3 rounded-full font-medium hover:bg-[#6e4360] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-sm tracking-wide text-sm"
            >
              {checkoutLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}