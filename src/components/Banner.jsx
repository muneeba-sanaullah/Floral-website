import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SLIDES_DATA = [
  {
    id: 1,
    headline: "Fresh Flowers Delivered Daily",
    subheadline: "Handpicked blooms to brighten your day",
    bgImage: "https://images.unsplash.com/photo-1568035776460-0061fe356adc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",
  },
  {
    id: 2,
    headline: "Elegant Bouquets for Every Occasion",
    subheadline: "From birthdays to weddings, we’ve got you covered",
    bgImage: "https://images.unsplash.com/photo-1447875569765-2b3db822bec9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    headline: "Same-Day Delivery Available",
    freshMessage: "Fresh flowers at your doorstep, right on time",
    bgImage: "https://images.unsplash.com/photo-1536568622990-edaf1f21b76c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
  },
];

export default function Banner() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  
  const sliderRef = useRef(null);
  const startX = useRef(0);
  const currentDragOffset = useRef(0);
  const autoPlayTimer = useRef(null);

  const clonedSlides = [SLIDES_DATA[SLIDES_DATA.length - 1], ...SLIDES_DATA, SLIDES_DATA[0]];

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    autoPlayTimer.current = null;
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayTimer.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);
  }, [stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [current, startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) stopAutoPlay();
      else startAutoPlay();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [startAutoPlay, stopAutoPlay]);

  const handleTransitionEnd = () => {
    if (current === clonedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrent(1);
    } else if (current === 0) {
      setIsTransitioning(false);
      setCurrent(SLIDES_DATA.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const forceReflow = sliderRef.current?.offsetHeight; 
      setIsTransitioning(true);
    }
  }, [isTransitioning]);

  const handlePrev = (e) => {
    e.stopPropagation(); 
    stopAutoPlay();
    setCurrent((prev) => prev - 1);
    startAutoPlay();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    stopAutoPlay();
    setCurrent((prev) => prev + 1);
    startAutoPlay();
  };

  const dragStart = (clientX) => {
    setIsDragging(true);
    startX.current = clientX;
    stopAutoPlay();
  };

  const dragMove = (clientX) => {
    if (!isDragging || !sliderRef.current) return;
    currentDragOffset.current = clientX - startX.current;
    
    const trackWidth = sliderRef.current.clientWidth;
    const boundedOffset = Math.max(Math.min(currentDragOffset.current, trackWidth), -trackWidth);
    
    sliderRef.current.style.transition = "none";
    sliderRef.current.style.transform = `translateX(calc(-${current * 100}% + ${boundedOffset}px))`;
  };

  const dragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    }

    const threshold = window.innerWidth * 0.15;
    
    if (currentDragOffset.current < -threshold) {
      setCurrent((prev) => prev + 1);
    } else if (currentDragOffset.current > threshold) {
      setCurrent((prev) => prev - 1);
    } else {
      setCurrent(current);
    }
    
    currentDragOffset.current = 0;
    startAutoPlay();
  };

  const activeDotIndex = current === 0 ? SLIDES_DATA.length - 1 : current === clonedSlides.length - 1 ? 0 : current - 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 select-none">
      <div
        className="relative w-full overflow-hidden h-72 md:h-[420px] rounded-3xl shadow-sm bg-[#805374]/10 cursor-grab active:cursor-grabbing group/banner"
        onTouchStart={(e) => dragStart(e.touches[0].clientX)}
        onTouchMove={(e) => dragMove(e.touches[0].clientX)}
        onTouchEnd={dragEnd}
        onMouseDown={(e) => dragStart(e.clientX)}
        onMouseMove={(e) => dragMove(e.clientX)}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}
      >
        {/* CAROUSEL TRACK */}
        <div
          ref={sliderRef}
          onTransitionEnd={handleTransitionEnd}
          className="flex h-full"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: isTransitioning ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          }}
        >
          {clonedSlides.map((slide, idx) => (
            <div
              key={`slide-instance-${slide.id}-${idx}`}
              className="flex-shrink-0 w-full h-full flex items-center justify-center relative overflow-hidden"
            >
              <img
                src={slide.bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/30 pointer-events-none" />

              <div className="relative z-10 px-6 text-center max-w-2xl transform transition-all duration-500">
                <h2 className="font-semibold text-3xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-sm">
                  {slide.headline}
                </h2>
                <p className="mt-3 text-white/90 text-sm md:text-lg font-light tracking-wide max-w-md mx-auto">
                  {slide.subheadline || slide.freshMessage}
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="mt-8 bg-white text-[#805374] font-medium py-3 px-8 rounded-full shadow-md hover:bg-white/95 hover:scale-105 active:scale-98 transition-all duration-200 text-sm tracking-wide"
                >
                  Shop Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 💫 MATCHED LEFT ARROW - Softened with bg-white/80 backdrop-blur-sm */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30"
        >
          <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 select-none text-xl leading-none">
            ‹
          </div>
        </button>

        {/* 💫 MATCHED RIGHT ARROW - Softened with bg-white/80 backdrop-blur-sm */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30"
        >
          <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 select-none text-xl leading-none">
            ›
          </div>
        </button>

        {/* DOTS INDICATORS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20 bg-black/10 backdrop-blur-md py-1.5 px-3 rounded-full">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => {
                stopAutoPlay();
                setCurrent(index + 1);
                startAutoPlay();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeDotIndex ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}