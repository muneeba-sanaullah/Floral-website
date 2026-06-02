import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import products from "./src/data/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:3000",
  process.env.FRONTEND_PRODUCTION_URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by Security Policy (CORS)"));
    }
  }
}));

app.use(express.json());

const databaseFile = process.env.DATABASE_DISK_PATH 
  ? path.join(process.env.DATABASE_DISK_PATH, "database.sqlite") 
  : "./database.sqlite";

let db = null;

/**
 * 🐛 FIXED: Scope the database health gateway check EXCLUSIVELY to /api requests.
 * This guarantees that compiled static HTML/JS frontend assets load instantly.
 */
app.use("/api", (req, res, next) => {
  if (!db) {
    return res.status(503).json({ 
      status: "error",
      message: "Database engine initializing, please refresh in a few moments." 
    });
  }
  next();
});

async function initializeDatabase() {
  db = await open({
    filename: databaseFile,
    driver: sqlite3.Database,
  });

  // Enable Write-Ahead Logging (WAL) mode for superior concurrent read/write optimization performance
  await db.exec("PRAGMA journal_mode = WAL;");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT,
      category TEXT,
      bestSeller INTEGER DEFAULT 0
    );
  `);

  const row = await db.get("SELECT COUNT(*) AS count FROM products;");

  if (!row || row.count === 0) {
    const insert = await db.prepare(
      `INSERT INTO products (id, name, price, image, category, bestSeller)
       VALUES (?, ?, ?, ?, ?, ?);`
    );

    try {
      for (const product of products) {
        await insert.run(
          product.id,
          product.name,
          product.price,
          product.image,
          product.category,
          product.bestSeller ? 1 : 0
        );
      }
      console.log(`Successfully seeded ${products.length} catalog items into SQLite storage.`);
    } catch (seedError) {
      console.error("🛑 CRITICAL: Seeding pipeline execution failure:", seedError);
      throw seedError; // Escalate failure to break the startup cycle defensively
    } finally {
      await insert.finalize();
    }
  }
}

// --- API ENDPOINTS ---

/**
 * Fetches filtered products with built-in protection limits.
 * Handles multi-word search string matching seamlessly.
 */
app.get("/api/products", async (req, res, next) => {
  try {
    const { category, search, limit = 40, offset = 0 } = req.query;
    
    const filters = [];
    const values = [];
    let sql = "SELECT * FROM products";

    // 🐛 FIXED: Protects database from evaluating client queries matching "All" literally
    if (category && category.toLowerCase() !== "all") {
      filters.push("LOWER(category) = LOWER(?)");
      values.push(category.trim());
    }

    /**
     * 📱 FIXED: Multi-word token analyzer.
     * Splits incoming queries into chunks to mirror frontend search capabilities.
     */
    if (search) {
      const tokens = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
      
      if (tokens.length > 0) {
        const tokenClauses = tokens.map(() => "(LOWER(name) LIKE ? OR LOWER(category) LIKE ?)");
        filters.push(`(${tokenClauses.join(" AND ")})`);
        
        tokens.forEach((token) => {
          const wildcard = `%${token}%`;
          values.push(wildcard, wildcard);
        });
      }
    }

    if (filters.length > 0) {
      sql += ` WHERE ${filters.join(" AND ")}`;
    }

    // ⚡ PERFORMANCE FIXED: Enforce system limits and cursor steps to prevent database strain
    sql += " LIMIT ? OFFSET ?";
    values.push(Math.min(parseInt(limit, 10) || 40, 100), parseInt(offset, 10) || 0);

    const productsData = await db.all(sql, values);
    res.json(productsData);
  } catch (error) {
    next(error); // Forward system exceptions directly to centralized error middleware
  }
});

app.get("/api/products/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;

    // 🔒 SECURITY FIXED: Explicit verification guard protecting against non-numeric lookups
    if (!/^\d+$/.test(productId)) {
      return res.status(400).json({ status: "error", message: "Invalid identification code structure format." });
    }

    const product = await db.get("SELECT * FROM products WHERE id = ?", productId);

    if (!product) {
      return res.status(404).json({ status: "error", message: "Requested product profile not found." });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.get("/api/categories", async (req, res, next) => {
  try {
    const categories = await db.all(
      "SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != '' ORDER BY category"
    );
    res.json(categories.map((row) => row.category));
  } catch (error) {
    next(error);
  }
});

// Production client bundle static delivery routes
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Floral API development engine active.");
  });
}

/**
 * 🧹 CLEANUP FIXED: Centralized global error handling middleware layer.
 * Eliminates scattered try/catch boilerplate blocks across your files.
 */
app.use((err, req, res, next) => {
  console.error("❌ Application Runtime Stack Trace Intercepted:", err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: process.env.NODE_ENV === "production" 
      ? "Internal server processing exception execution error." 
      : err.message
  });
});

const port = process.env.PORT || 4000;

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Automated backend cloud ecosystem active on communication port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("🛑 CRITICAL BOOTSTRAP FAILURE: System initialization abandoned:", error);
    process.exit(1);
  });