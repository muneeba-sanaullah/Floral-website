import Fuse from "fuse.js";

export function isSynonymMatch(token, productString, synonyms = {}) {
  const groups = Object.values(synonyms).flat();
  if (groups.includes(token)) {
    return Object.values(synonyms).some((arr) => arr.includes(token) && arr.some((syn) => productString.includes(syn)));
  }
  return productString.includes(token);
}

export default function filterProducts(products = [], search = "", category = "All", options = {}) {
  const normalizedSearch = search ? search.toLowerCase().trim() : "";
  const activeCategory = category || "All";

  const synonyms = options.synonyms || {
    flower: ["flower", "flowers", "floral"],
    bouquet: ["bouquet", "bouquets"],
  };

  if (!normalizedSearch) {
    return products.filter((p) => activeCategory === "All" || (p.category || "").toLowerCase() === activeCategory.toLowerCase());
  }

  if (options.fuzzy) {
    // Use Fuse.js for fuzzy matching, then apply category filter
    const fuse = new Fuse(products, {
      keys: ["name", "category"],
      threshold: options.threshold ?? 0.3,
      ignoreLocation: true,
      useExtendedSearch: false,
    });

    const fuseResults = fuse.search(normalizedSearch);
    const idSet = new Set(fuseResults.map((r) => r.item.id));
    return products.filter((product) => {
      const productCategory = (product.category || "").toLowerCase();
      const matchesCategory = activeCategory === "All" || productCategory === activeCategory.toLowerCase();
      return matchesCategory && idSet.has(product.id);
    });
  }

  const tokens = normalizedSearch.split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    const productName = (product.name || "").toLowerCase();
    const productCategory = (product.category || "").toLowerCase();
    const matchesCategory = activeCategory === "All" || productCategory === activeCategory.toLowerCase();
    const matchesSearch = tokens.every((token) => isSynonymMatch(token, productName, synonyms) || isSynonymMatch(token, productCategory, synonyms));
    return matchesCategory && matchesSearch;
  });
}
