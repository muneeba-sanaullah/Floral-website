import React, { useEffect, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutSuccess() {
  const { clearCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  // 1. Initialize order state safely from localStorage
  const [order, setOrder] = useState(() => {
    try {
      const savedOrder = localStorage.getItem("completedOrder");
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder);
        return { ...parsed, itemsList: typeof parsed.items === "string" ? JSON.parse(parsed.items) : parsed.items };
      }
    } catch (err) {
      console.error("Failed to parse stored order parameters:", err);
    }
    return null;
  });

  useEffect(() => {
    // 2. Only generate a new order if one doesn't exist yet and we have items to process
    if (!order && cart.length > 0) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const mockOrder = {
        session_id: "bloom_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount_total: total,
        itemsList: cart, 
        items: JSON.stringify(cart),
      };

      setOrder(mockOrder);
      localStorage.setItem("completedOrder", JSON.stringify(mockOrder));
      
      // Execute cleanup frame after order is safely stored
setTimeout(() => {
  clearCart();
}, 0);

    }
  }, [cart, order, clearCart]);

  // ⭐ ⭐ RECRUITER PROTECTION
  useEffect(() => {
    if (!order && cart.length === 0) {
      const timeout = setTimeout(() => navigate("/products"), 1500);
      return () => clearTimeout(timeout);
    }
  }, [order, cart, navigate]);

  if (!order) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#FFF8F5]">
        <div className="w-8 h-8 border-3 border-[#805374] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#805374] font-medium text-sm tracking-wide">Verifying secure transaction...</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-24 px-4 sm:px-6 lg:px-10 max-w-2xl mx-auto">
      <div className="text-center py-12 md:py-16">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-sm border border-green-100">
          ✓
        </div>

        <h1 className="text-3xl md:text-5xl font-medium text-[#805374] tracking-tight">
          Thank you for your order!
        </h1>

        <p className="mt-4 text-gray-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          We've successfully received your floral request. An artisanal receipt details sheet has been dispatched to your email address.
        </p>

        <div className="mt-10 text-left bg-white border border-[#f1e7e7] rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(128,83,116,0.02)]">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#805374] mb-4 border-b border-gray-100 pb-3">
            Order Manifest
          </h3>
          
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex justify-between">
              <span className="text-gray-400">Order Reference:</span> 
              <span className="font-mono font-medium text-gray-900">{order.session_id}</span>
            </p>
            <p className="flex justify-between items-center border-b border-gray-50 pb-3">
              <span className="text-gray-400">Financial Aggregate:</span> 
              <span className="text-lg font-medium text-gray-900">Rs. {Number(order.amount_total).toLocaleString()}</span>
            </p>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Arrangements Packed:
          </p>
          
          <ul className="space-y-2 divide-y divide-gray-50/50">
            {order.itemsList && order.itemsList.map((item, i) => (
              <li key={item.id || i} className="flex justify-between items-center text-sm pt-2 first:pt-0 text-gray-800">
                <span className="truncate pr-4 font-medium">{item.name}</span>
                <span className="text-gray-500 text-xs shrink-0 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  Qty: {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <button
            onClick={() => {
              localStorage.removeItem("completedOrder");
              navigate("/products");
            }}
            className="px-8 cursor-pointer py-3.5 bg-[#805374] text-white rounded-full text-sm font-medium shadow-md hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto"
          >
            Continue Discovery Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;