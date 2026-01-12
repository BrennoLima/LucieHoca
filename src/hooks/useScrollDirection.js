import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to detect scroll direction (up or down)
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Minimum scroll distance to trigger direction change (default: 10)
 * @param {Element} options.scrollElement - Element to listen for scroll events (default: window)
 * @returns {Object} - { direction: 'up' | 'down', scrollCount: number } - direction and a counter that increments on each threshold
 */
export const useScrollDirection = (options = {}) => {
  const { threshold = 10, scrollElement = null } = options;
  const [scrollData, setScrollData] = useState({
    direction: null,
    scrollCount: 0,
  });
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const accumulatedScroll = useRef(0);
  const ignoreScrollRef = useRef(false);

  useEffect(() => {
    const element = scrollElement || window;
    const isWindow = element === window;

    // Initialize lastScrollY with current scroll position
    if (element) {
      lastScrollY.current = isWindow ? window.scrollY : element.scrollTop;
    }

    const updateScrollDirection = () => {
      if (!element || ignoreScrollRef.current) {
        ticking.current = false;
        // Update lastScrollY even when ignoring to prevent false triggers later
        if (element) {
          const scrollY = isWindow ? window.scrollY : element.scrollTop;
          lastScrollY.current = scrollY;
        }
        return;
      }

      const scrollY = isWindow ? window.scrollY : element.scrollTop;
      const scrollDifference = scrollY - lastScrollY.current;

      // Accumulate scroll distance
      accumulatedScroll.current += Math.abs(scrollDifference);

      // Only trigger if accumulated scroll exceeds threshold
      if (accumulatedScroll.current < threshold) {
        ticking.current = false;
        return;
      }

      const direction = scrollDifference > 0 ? "down" : "up";

      // Update state with new direction and increment counter
      // This ensures the state changes on each threshold, even if direction is the same
      setScrollData((prev) => ({
        direction,
        scrollCount: prev.scrollCount + 1,
      }));

      // Reset accumulated scroll and update last position
      accumulatedScroll.current = 0;
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    if (element) {
      element.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", onScroll);
      }
    };
  }, [threshold, scrollElement]);

  // Return both the scroll data and a function to temporarily ignore scroll
  return {
    ...scrollData,
    setIgnoreScroll: (ignore) => {
      ignoreScrollRef.current = ignore;
      // Update lastScrollY when starting to ignore to prevent false triggers
      if (ignore && scrollElement) {
        const isWindow = scrollElement === window;
        lastScrollY.current = isWindow
          ? window.scrollY
          : scrollElement.scrollTop;
      }
    },
  };
};
