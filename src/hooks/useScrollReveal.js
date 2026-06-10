import { useEffect, useRef, useState } from "react";

/**
 * Enterprise-Grade Viewport Scroll Reveal Observer Hook
 * @param {Object} options Configuration properties for customizing visibility animations
 * @param {number} options.threshold Minimum percentage visibility required to trigger state (0.0 to 1.0)
 * @param {string} options.rootMargin Pre-loading boundary extension boxes around your viewport layout
 * @param {boolean} options.triggerOnce Determines if hook disconnects instantly after first reveal pass
 */
export default function useScrollReveal({
  threshold = 0.08,        // MOBILE FIX: Lowered slightly from 0.15 to ensure tall elements animate on thin mobile screens
  rootMargin = "0px 0px -40px 0px", // PERFORMANCE FIX: Pre-loads elements 40px before hitting screen edge to prevent sudden pop-ins
  triggerOnce = true        // PORTFOLIO CONFIG: Let developers choose between single or repeating reveals
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Defend your server-side rendering builds against missing global window execution frames
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    // Capture current DOM element target snapshot to avoid mutable unmounting reference traps
    const currentTargetElement = ref.current;
    if (!currentTargetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (triggerOnce) {
            observer.unobserve(currentTargetElement);
          }
        } else if (!triggerOnce) {
          // Reset visibility status flag state cell if configured to repeat scroll-reveals
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentTargetElement);

    // Precise, memory-safe garbage collection lifecycle cleanup phase frame
    return () => {
      if (currentTargetElement && !triggerOnce) {
        observer.unobserve(currentTargetElement);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]); // Safely track parameters to keep effects updated

  return [ref, isVisible];
}