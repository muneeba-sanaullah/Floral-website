import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import filterProducts from "../utils/filterProducts";
import useDebounce from "../hooks/useDebounce";

// 📦 FALLBACK SOURCE: Re-import your local product file to prevent empty states
import localProductsMock from "../../server/data/products";

// 🛠️ CUSTOM HOOK IMPORT: Bring in your optimized click-away hook
import useOutsideClick from "../hooks/useOutsideClick";

function Navbar({ liveProducts = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Hook up your pre-optimized cart counter from our Context upgrade
  const { cartCount } = useContext(CartContext);
  
  const navigate = useNavigate();
  const location = useLocation();

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null); // Added ref for mobile clearing focus

  // ⚡ WIRE UP THE OUTSIDE CLICK HOOK:
  useOutsideClick([desktopSearchRef, mobileSearchRef], () => {
    setShowDropdown(false);
    setActiveIndex(-1);
  });

  // Close menus on layout changes
  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  // Keep search inputs matched with URL paths
  useEffect(() => {
    if (location.pathname === "/products") {
      const qp = new URLSearchParams(location.search);
      const s = qp.get("search") || "";
      setSearch(s);
    }
  }, [location.pathname, location.search]);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowDropdown(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const sanitizedQuery = useMemo(() => {
    return search.toLowerCase().trim();
  }, [search]);

  const debouncedQ = useDebounce(sanitizedQuery, 180);

  // 🛠️ SMART FIXED FILTER: Uses live database products if available, otherwise uses local files
  const filteredProducts = useMemo(() => {
    if (!debouncedQ) return [];
    
    const activeProductsSource = liveProducts && liveProducts.length > 0 
      ? liveProducts 
      : localProductsMock;

    return filterProducts(activeProductsSource, debouncedQ, "All", { fuzzy: true, threshold: 0.35 });
  }, [debouncedQ, liveProducts]);

  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    setSearch("");
    setShowDropdown(false);
    setIsOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleanSearch = search.trim();
    if (!cleanSearch) return;

    const qp = new URLSearchParams(location.search);
    const category = qp.get("category");

    if (category) {
      navigate(`/products?category=${category}&search=${cleanSearch}`);
    } else {
      navigate(`/products?search=${cleanSearch}`);
    }
    
    setShowDropdown(false);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || filteredProducts.length === 0) return;

    const list = filteredProducts.slice(0, 5);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && list[activeIndex]) {
        handleSelect(list[activeIndex]);
      } else {
        handleSearchSubmit(e);
      }
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
  }, [filteredProducts.length, showDropdown]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Navigation Bar Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/75 backdrop-blur-md border-b border-gray-100 will-change-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
<Link to="/" className="flex items-center hover:opacity-90 transition">
  <img
    src="/perfectlogo.png"
    alt="Bloom & Blossom Logo"
    className="h-10 md:h-12 lg:h-14 w-auto max-w-[200px] object-contain mr-4"
  />
</Link>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium tracking-wide transition-colors ${
                      location.pathname === link.path || (link.path === "/products" && location.pathname.startsWith("/products"))
                        ? "text-[#805374]"
                        : "text-gray-500 hover:text-[#805374]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Search */}
              <form ref={desktopSearchRef} onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center bg-gray-50 border border-gray-100 focus-within:border-[#805374]/30 focus-within:bg-white rounded-full px-4 py-2 w-64 shadow-inner transition-all duration-300">
                  <FiSearch className="text-gray-400 shrink-0" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    className="bg-transparent outline-none ml-2 w-full text-xs text-gray-800 placeholder-gray-400"
                    placeholder="Search arrangements..."
                  />
                  {search && (
                    <button
                      type="button"
                      aria-label="Clear input"
                      onClick={() => { setSearch(""); setShowDropdown(false); inputRef.current?.focus(); }}
                      className="ml-1 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Dropdown Box */}
                {showDropdown && search && filteredProducts.length > 0 && (
                  <div className="absolute top-12 left-0 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-50">
                    {filteredProducts.slice(0, 5).map((p, index) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(p)}
                        className={`flex items-center gap-3 p-3 cursor-pointer border-b border-gray-50 last:border-0 transition ${
                          index === activeIndex ? "bg-[#FAF5F7]" : "hover:bg-[#FAF5F7]"
                        }`}
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-gray-50" />
                        <div className="truncate">
                          <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
                          <p className="text-[10px] text-[#805374] mt-0.5">{p.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>

              {/* Shopping Bag Button */}
              <Link to="/cart" className="relative p-2.5 hover:bg-[#FAF5F7] rounded-full transition text-gray-700 hover:text-[#805374]">
                <FiShoppingCart className="text-lg" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#805374] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile View Toggles */}
            <div className="md:hidden flex items-center gap-2">
              <Link to="/cart" className="relative p-2.5 text-gray-700 hover:text-[#805374]">
                <FiShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#805374] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-xl text-[#805374] hover:bg-[#FAF5F7] rounded-full transition"
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Container */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 border-t border-gray-50 bg-white" : "max-h-0 opacity-0 pointer-events-none"}`}>
          <div className="px-4 py-4 space-y-4">
            
            {/* Mobile Search Input Form Wrapper */}
            <form ref={mobileSearchRef} onSubmit={handleSearchSubmit} className="relative block w-full">
              {/* 🛠️ DROPDOWN FIX: Added styling focus bounds matching your premium desktop input row */}
              <div className="flex items-center bg-gray-50 border border-gray-100 focus-within:border-[#805374]/30 focus-within:bg-white rounded-xl px-4 py-2.5 transition-all duration-300">
                <FiSearch className="text-gray-400 shrink-0" />
                <input
                  ref={mobileInputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className="bg-transparent outline-none ml-2 w-full text-sm text-gray-800 placeholder-gray-400"
                  placeholder="Search bouquets..."
                />
                {/* ✕ MOBILE CROSS FIX: Render the clear cross directly inside mobile inputs when text exists */}
                {search && (
                  <button
                    type="button"
                    aria-label="Clear mobile input"
                    onClick={() => { setSearch(""); setShowDropdown(false); mobileInputRef.current?.focus(); }}
                    className="ml-2 text-gray-400 hover:text-gray-600 text-sm p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 🛠️ POSITION FIX: Dropdown position properties anchored perfectly below mobile inputs */}
              {showDropdown && search && filteredProducts.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-60 overflow-y-auto">
                  {filteredProducts.slice(0, 5).map((p) => (
                    <div 
                      key={p.id} 
                      onClick={() => handleSelect(p)} 
                      className="flex items-center gap-3 p-3 hover:bg-[#FAF5F7] cursor-pointer border-b border-gray-50 last:border-0 transition"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-50" />
                      <div className="truncate">
                        <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
                        <p className="text-[10px] text-[#805374] mt-0.5">{p.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* Mobile Links */}
            <div className="flex flex-col pb-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 text-sm font-medium tracking-wide border-b border-gray-50/50 last:border-0 ${
                    location.pathname === link.path || (link.path === "/products" && location.pathname.startsWith("/products"))
                      ? "text-[#805374]"
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer Element - matches navbar height */}
      <div className="h-20" />
    </>
  );
}

export default Navbar;