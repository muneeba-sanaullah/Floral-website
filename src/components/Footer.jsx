import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Handles smooth form subscriptions with a confirmation alert
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Alert confirmation
    alert(" Thank you for subscribing! We'll keep you updated with our latest floral news.");
    
    // Simulate API integration pipeline trigger
    setSubscribed(true);
    setEmail("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.215, 0.610, 0.355, 1.000] } 
    }
  };

  return (
    <footer className="mt-28 border-t border-[#eadede] bg-[#FFF8F5] will-change-transform">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12"
        >

          {/* BRAND PANEL */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h2 className="text-2xl font-medium text-[#805374] tracking-tight">
              Bloom & Blossom
            </h2>

            <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-md">
              Elegant floral arrangements crafted to celebrate life’s sweetest
              moments with beauty, softness, and love.
            </p>

            {/* NEWSLETTER FORM */}
            <div className="mt-6">
              <p className="text-sm text-[#805374] font-medium mb-2">
                Get floral updates 🌿
              </p>

              {subscribed ? (
                <p className="text-sm text-green-600 font-medium bg-green-50 py-2 px-4 rounded-xl inline-block">
                  Thank you for joining our garden! ✓
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-full border border-[#eadede] focus:outline-none focus:ring-1 focus:ring-[#805374] text-sm bg-white transition-all placeholder:text-gray-400"
                  />

                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#805374] text-white text-sm font-medium hover:bg-[#6b4260] active:scale-95 transition-all w-full sm:w-auto shrink-0 shadow-sm"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[#805374] font-medium text-sm mb-4 tracking-wide">
              Quick Links
            </h3>

            <nav className="flex flex-col gap-3 text-sm text-gray-600">
              <Link to="/" className="hover:text-[#805374] transition-colors duration-200">Home</Link>
              <Link to="/products" className="hover:text-[#805374] transition-colors duration-200">Products</Link>
              <Link to="/about" className="hover:text-[#805374] transition-colors duration-200">About</Link>
              <Link to="/contact" className="hover:text-[#805374] transition-colors duration-200">Contact</Link>
            </nav>
          </motion.div>

          {/* SOCIAL MEDIA */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[#805374] font-medium text-sm mb-4 tracking-wide">
              Connect
            </h3>

            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-[#805374] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Visit our Instagram page"
              >
                <FaInstagram className="text-lg" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-[#805374] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Visit our Facebook page"
              >
                <FaFacebook className="text-lg" />
              </a>
            </div>

            <p className="mt-5 text-xs text-gray-400 font-mono tracking-wider">
              hello@bloomandblossom.com
            </p>
          </motion.div>

        </motion.div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#eadede] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
          <p>© 2026 Bloom & Blossom. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-[#805374] animate-pulse">♥</span> for floral beauty
          </p>
        </div>

      </div>
    </footer>
  );
}