import { useEffect, useRef } from "react";

/**
 * Custom hook to detect which section is currently in view
 * @param {string[]} sectionIds - Array of section IDs to observe
 * @param {Function} onSectionChange - Callback when active section changes
 * @param {Object} options - Intersection Observer options
 */
export const useActiveSection = (sectionIds, onSectionChange, options = {}) => {
  const {
    rootMargin = "-20% 0px -20% 0px", // Trigger when section is 20% from top/bottom
    threshold = 0.3, // Trigger when 30% of section is visible
  } = options;

  const observerRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Don't update if this is a programmatic scroll
        if (isProgrammaticScrollRef.current) return;

        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let activeSection = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeSection = entry.target.id;
          }
        });

        // If we found an active section, update the value
        if (activeSection) {
          const index = sectionIds.indexOf(activeSection);
          if (index !== -1) {
            onSectionChange(index);
          }
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, rootMargin, threshold, onSectionChange]);

  // Return function to temporarily disable detection (for programmatic scrolls)
  return {
    setIgnoreScroll: (ignore) => {
      isProgrammaticScrollRef.current = ignore;
    },
  };
};
