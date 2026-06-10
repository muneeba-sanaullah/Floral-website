import { useEffect, useRef } from "react";

/**
 * Enterprise-Grade Click Outside Detection Hook
 * @param {React.RefObject|React.RefObject[]} ref A single React ref or an array of multiple refs to protect from closing
 * @param {Function} callback The function execution frame to trigger when an outside click occurs
 */
export default function useOutsideClick(ref, callback) {
  // Use a mutable ref to store the latest callback function structure.
  // This prevents the event listener from constantly tearing down and rebuilding
  // if the parent component forgets to wrap their callback function in a React.useCallback()
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;

      // If the target element was unmounted during a click cascade event frame, ignore it
      if (!target || !document.documentElement.contains(target)) return;

      // Normalize our inputs into an iterable array so developers can pass single or multiple refs
      const refsArray = Array.isArray(ref) ? ref : [ref];

      // Check if the user clicked inside ANY of the protected ref container structures
      const clickedInside = refsArray.some((singleRef) => {
        return singleRef.current && singleRef.current.contains(target);
      });

      if (!clickedInside) {
        savedCallback.current();
      }
    };

    // Added touchstart for instant mobile responses and passed passive flag configuration
    document.addEventListener("mousedown", handleClick, { passive: true });
    document.addEventListener("touchstart", handleClick, { passive: true });

    // Absolute, memory-safe garbage collection lifecycle cleanup phase
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref]); // ref object identity is stable, ensuring this effect maps safely to the DOM mount cycle
}