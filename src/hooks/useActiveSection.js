import { useEffect, useMemo, useRef } from "react";

/**
 * Detect the most-visible section within a scroll container and report its index.
 *
 * Designed for "desktop inner scroller" setups (root = a scrollable element).
 */
export function useActiveSection({
  sectionIds,
  rootRef,
  enabled = true,
  rootMargin = "-35% 0px -35% 0px",
  threshold = [0.15, 0.3, 0.5, 0.7],
  onChange,
} = {}) {
  const ignoreRef = useRef(false);
  const lastIndexRef = useRef(-1);

  // Keep threshold stable for deps if caller passes an array literal
  const thresholdKey = useMemo(
    () => (Array.isArray(threshold) ? threshold.join(",") : String(threshold)),
    [threshold]
  );

  useEffect(() => {
    if (!enabled) return;
    const rootEl = rootRef?.current || null;
    if (!rootEl) return;
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) return;
    if (typeof onChange !== "function") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreRef.current) return;

        let bestId = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestId = entry.target.id;
          }
        }
        if (!bestId) return;

        const nextIndex = sectionIds.indexOf(bestId);
        if (nextIndex === -1) return;
        if (nextIndex === lastIndexRef.current) return;

        lastIndexRef.current = nextIndex;
        onChange(nextIndex);
      },
      {
        root: rootEl,
        rootMargin,
        threshold,
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, rootMargin, thresholdKey, onChange, rootRef, sectionIds]);

  return {
    /** Temporarily pause updates (during programmatic scroll). */
    setIgnore: (ignore) => {
      ignoreRef.current = !!ignore;
    },
    /** Keep hook's internal last-index in sync when you programmatically navigate. */
    setLastActiveIndex: (index) => {
      lastIndexRef.current = typeof index === "number" ? index : -1;
    },
  };
}

