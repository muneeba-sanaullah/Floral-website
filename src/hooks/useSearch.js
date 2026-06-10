import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//  Hook now accepts a dynamic inventory collection array 
// instead of remaining locked to a hardcoded local static mockup data file
export default function useSearch(liveProductsCollection = []) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRecent, setShowRecent] = useState(false);

  const [recent, setRecent] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("recentSearches");
        return raw ? JSON.parse(raw) : [];
      }
    } catch (err) {
      console.error("Failed to parse historical search logs:", err);
    }
    return [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Clean strings safely without crashing downstream match operations
  const sanitizedQuery = useMemo(() => {
    return search.toLowerCase().trim();
  }, [search]);

  // Memoize result calculations to minimize computation loops
  const filteredProducts = useMemo(() => {
    if (!sanitizedQuery || liveProductsCollection.length === 0) return [];

    // Safe spacing string separator safely ignoring malicious symbols
    const tokens = sanitizedQuery.split(/\s+/).filter(Boolean);
    
    return liveProductsCollection.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      
      return tokens.every((token) => name.includes(token) || category.includes(token));
    });
  }, [sanitizedQuery, liveProductsCollection]);

  // Stabilized tracking effect to avoid infinite field resetting cascades
  useEffect(() => {
    if (location.pathname === "/products") {
      const qp = new URLSearchParams(location.search);
      const urlSearchValue = qp.get("search") || "";
      
      // Only set state if the values are functionally out of parity sync
      setSearch((currentSearch) => 
        currentSearch.trim() !== urlSearchValue.trim() ? urlSearchValue : currentSearch
      );
    }
  }, [location.search, location.pathname]);

  const addRecent = (queryText) => {
    const targetQuery = queryText?.trim();
    if (!targetQuery) return;

    setRecent((prev) => {
      const deduped = [targetQuery, ...prev.filter((r) => r !== targetQuery)].slice(0, 5);
      try {
        localStorage.setItem("recentSearches", JSON.stringify(deduped));
      } catch (err) {
        console.error("Local storage sync blocked:", err);
      }
      return deduped;
    });
  };

  const clearRecent = () => {
    try {
      localStorage.removeItem("recentSearches");
    } catch (err) {
      console.error("Failed to clear local storage logs:", err);
    }
    setRecent([]);
  };

  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    setSearch("");
    setShowDropdown(false);
    setShowRecent(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const cleanSearch = search.trim();
    const qp = new URLSearchParams(location.search);

    // If query is empty, remove search parameter from line entirely
    if (!cleanSearch) {
      qp.delete("search");
      const currentCategory = qp.get("category");
      if (currentCategory) {
        navigate(`/products?category=${currentCategory}`);
      } else {
        navigate(`/products`);
      }
      setShowDropdown(false);
      return;
    }

    addRecent(cleanSearch);

    if (qp.get("category")) {
      navigate(`/products?category=${qp.get("category")}&search=${encodeURIComponent(cleanSearch)}`);
    } else {
      navigate(`/products?search=${encodeURIComponent(cleanSearch)}`);
    }

    setShowDropdown(false);
    setShowRecent(false);
  };

  return {
    search,
    setSearch,
    showDropdown,
    setShowDropdown,
    recent,
    showRecent,
    setShowRecent,
    filteredProducts,
    handleSelect,
    handleSearchSubmit,
    clearRecent,
  };
}