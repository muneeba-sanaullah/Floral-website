import { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
      }
    } catch (err) {
      console.error("Local storage allocation signature corrupted:", err);
    }
    return [];
  });

  useEffect(() => {
    try {
      if (!cart || cart.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (err) {
      console.error("Failed to sync cart data to local storage:", err);
    }
  }, [cart]);

  const addToCart = (product) => {
    const incomingQty = Number(product.quantity) || 1;
    setCart((prev) => {
      const existing = prev.find(item => String(item.id) === String(product.id));
      if (existing) {
        return prev.map(item =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + incomingQty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          quantity: incomingQty
        }
      ];
    });
  };

  const increaseQty = (id) => {
    setCart(prev => prev.map(item => String(item.id) === String(id) ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCart(prev => prev.map(item => String(item.id) === String(id) ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => String(item.id) !== String(id)));
  };

  // FIXED: Now clears both state AND localStorage
  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}