import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Global layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Bouquets from "./components/Bouquets";
import BestSellers from "./components/BestSellers";
import ArtOfCelebration from "./components/ArtOfCelebration";
import PageWrapper from "./components/PageWrapper";
import Reveal from "./components/Reveal";
import "./index.css";
import TrustSection from "./components/TrustSection";

// Lazy-loaded page components for maximum loading performance
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./components/Cart")); 
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));

// Automated utility component to reset window scroll position on path updates
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Minimal loading spinner used for inside page shells, keeping the Navbar visible
const SectionLoader = () => (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3 bg-[#FFF8F5]">
    <div className="w-10 h-10 border-4 border-[#805374] border-t-transparent rounded-full animate-spin"></div>
    <p className="text-[#805374] text-xs tracking-wider font-medium">Gathering fresh blossoms...</p>
  </div>
);

/* HOME PAGE WORKFLOW */
function Home() {
  return (
    <>
      {/* HERO BANNER */}
      <section className="pt-2">
        <Banner />
      </section>

      {/* CATEGORIES GRID */}
      <section className="mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Categories />
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <Reveal>
        <section className="mt-20 md:mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BestSellers />
          </div>
        </section>
      </Reveal>

      {/* ART OF CELEBRATION EDITORIAL */}
      <Reveal>
        <section className="mt-20 md:mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArtOfCelebration />
          </div>
        </section>
      </Reveal>

      {/* BRAND STORY */}
      <Reveal>
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl text-[#805374] tracking-tight font-medium">
              Bloom & Blossom
            </h1>
            <p className="mt-8 text-gray-600 text-base md:text-xl leading-relaxed">
              Discover beautifully crafted floral arrangements made with care.
              Elegant, minimal, and designed to bring natural beauty into your
              everyday life.
            </p>
          </div>
        </section>
      </Reveal>

      {/* BOUQUETS DISCOVERY */}
      <Reveal>
        <section className="mt-8 md:mt-12 mb-16 md:mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Bouquets />
          </div>
        </section>
      </Reveal>

      <Reveal>
  <TrustSection />
</Reveal>

    </>
  );
}

/* CENTRAL APPLICATION ROUTING */
function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-gray-800 antialiased selection:bg-[#805374]/10 flex flex-col justify-between">
      {/* Injects the automated window tracker utility */}
      <ScrollToTop />
      
      <div>
        <Navbar />

        {/* AnimatePresence wraps Suspense to preserve page exit transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />

            <Route
              path="/cart"
              element={
                <PageWrapper>
                  <Suspense fallback={<SectionLoader />}>
                    <Cart />
                  </Suspense>
                </PageWrapper>
              }
            />

            <Route
              path="/products"
              element={
                <PageWrapper>
                  <Suspense fallback={<SectionLoader />}>
                    <Products />
                  </Suspense>
                </PageWrapper>
              }
            />

            <Route
              path="/product/:id"
              element={
                <PageWrapper>
                  <Suspense fallback={<SectionLoader />}>
                    <ProductDetail />
                  </Suspense>
                </PageWrapper>
              }
            />

            <Route
              path="/about"
              element={
                <PageWrapper>
                  <Suspense fallback={<SectionLoader />}>
                    <About />
                  </Suspense>
                </PageWrapper>
              }
            />

            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Suspense fallback={<SectionLoader />}>
                    <Contact />
                  </Suspense>
                </PageWrapper>
              }
            />

            <Route
              path="/checkout/success"
              element={
                <PageWrapper>
                  <Suspense fallback={<SectionLoader />}>
                    <CheckoutSuccess />
                  </Suspense>
                </PageWrapper>
              }
            />

          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default App;