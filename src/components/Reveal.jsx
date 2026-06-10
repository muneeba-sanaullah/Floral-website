import { motion } from "framer-motion";

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      //  MOBILE & ACCESSIBILITY FIX: Optimized viewport triggers
      viewport={{
        once: true,
        amount: 0.06, // Lowered to 6% so tall sections animate smoothly on small smartphone viewports
        margin: "0px 0px -20px 0px" // Pre-triggers the animation 20px before coming on screen for better performance
      }}
      // Fine-tuned luxury cubic-bezier timing mechanics
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 1.02, 0.43, 1.01], // Fluid cinematic ease-out curves
      }}
      className={className}
      // Keeps hardware layer acceleration locked active to prevent stuttering scroll frames
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;