import localProducts from "../../server/data/products";

const API_BASE = import.meta.env.VITE_API_BASE || "";

/**
 * Pre-compiles tokenized parameters 
 * out of the core map loop to optimize memory allocation.
 */
function filterLocal(params = {}) {
  const { category, search } = params;
  const q = (search || "").toLowerCase().trim();
  
  // Guard clause against empty structural data arrays
  if (!Array.isArray(localProducts)) return [];

  // Split tokens ONCE outside the main array loop pass
  const searchTokens = q ? q.split(/\s+/).filter(Boolean) : [];

  return localProducts.filter((product) => {
    if (!product) return false;
    
    // Category filtration guard
    if (category && category !== "All" && product.category !== category) {
      return false;
    }
    
    if (searchTokens.length === 0) return true;

    const name = (product.name || "").toLowerCase();
    const catName = (product.category || "").toLowerCase();
    
    // Match token conditions across items
    return searchTokens.every((token) => name.includes(token) || catName.includes(token));
  });
}

/**
 * Normalizes query parameter objects safely, converting arrays 
 * into clean, multiple duplicate URL parameters instead of single commas.
 */
function buildQueryString(params) {
  const urlParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    
    if (Array.isArray(value)) {
      value.forEach((val) => urlParams.append(key, val));
    } else {
      urlParams.append(key, String(value));
    }
  });
  
  const queryString = urlParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Fetches all products based on parameters.
 * Supports native timeout abort limits to protect mobile users.
 */
export const getProducts = async (params = {}, options = {}) => {
  // Clean up promise resolution wraps—async handlers convert this values automatically
  if (!API_BASE) {
    return filterLocal(params);
  }

  const query = buildQueryString(params);
  const { timeout = 6000 } = options; // Default 6 second timeout limit before fallback kicks in

  // Set up an abort control signal trap
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE}/api/products${query}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    
    // explicitly logs errors so they are trackable in staging
    console.warn(`[API Layer Fallback] Using offline mock data store. Reason: ${err.message}`);
    
    return filterLocal(params);
  }
};

/**
 * Resolves singular targeted lookup indexes precisely
 */
export const getProductById = async (id) => {
  if (!id) throw new Error("Product Identification parameters required");

  // Helper utility to safely execute a clean local array search matching
  const findLocalProduct = (productId) => {
    const targetId = String(productId).trim();
    const item = localProducts.find((p) => p && String(p.id).trim() === targetId);
    if (!item) throw new Error(`Product ID [${targetId}] not found in database registry`);
    return item;
  };

  if (!API_BASE) {
    return findLocalProduct(id);
  }

  try {
    const response = await fetch(`${API_BASE}/api/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status} for product fetch.`);
    }
    
    return await response.json();
  } catch (err) {
    console.warn(`[API Layer Fallback] Using local registry lookup for Product ID [${id}]. Reason: ${err.message}`);
    return findLocalProduct(id);
  }
};