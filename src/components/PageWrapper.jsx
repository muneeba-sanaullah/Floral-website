import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Enterprise-Grade Global View Transitions Wrapper
 * @param {React.ReactNode} children Core page element rows
 * @param {string} className Supplemental Tailwind layout classes
 * @param {string} as Allows overriding the semantic HTML tag (defaults to "main")
 */
export default function PageWrapper({ 
  children, 
  className = "", 
  as = "main" 
}) {
  // 🔒 ACCESSIBILITY/SECURITY FIX: Check if user has requested reduced motion at system levels
  const shouldReduceMotion = useReducedMotion();

  // Dynamic semantic tag mapping configuration choice
  const MotionComponent = motion[as] || motion.main;

  // ⚡ PERFORMANCE FIX: Instantly strip animation distances if reduced motion is requested
  const initialVariants = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 };
  const animateVariants = { opacity: 1, y: 0 };
  const exitVariants = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 };

  return (
    <MotionComponent
      initial={initialVariants}
      animate={animateVariants}
      exit={exitVariants}
      transition={{ 
        duration: 0.4, 
        ease: [0.21, 1.02, 0.43, 1.01] // Refined luxury ease-out curves
      }}
      // added min-h-screen to stabilize layout heights and prevent footer shifting
      // Combined your default container constraints with any passed className arguments
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] w-full ${className}`.trim()}
      // Locks hardware acceleration layers active to stop text blurring during movement frames
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionComponent>
  );
}