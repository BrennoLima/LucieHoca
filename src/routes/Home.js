import React, { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";

import { Menu } from "../components/Menu";
import { lightTheme } from "../theme/light";
import { useScrollDirection } from "../hooks/useScrollDirection";
import Illustrations from "../components/Illustrations/Illustrations";
import SectionDivider from "../components/shared/SectionDivider";
import Hero from "../components/Hero";
import Graphics from "../components/Graphics";
import About from "../components/About";
import Contact from "../components/Contact";

const TABS_COUNT = 5; // Number of tabs (0-4)

const SECTION_IDS = ["hero", "illustrations", "graphics", "about", "contact"];

export const Home = () => {
  const theme = createTheme(lightTheme);
  const [value, setValue] = useState(0);
  const scrollElementRef = useRef(null);
  const [scrollElement, setScrollElement] = useState(null);
  const {
    direction: scrollDirection,
    scrollCount,
    setIgnoreScroll,
  } = useScrollDirection({
    threshold: 50,
    scrollElement: scrollElement,
  });
  const lastScrollCount = useRef(0);
  const lastTabValue = useRef(0);
  const lastDirectionChange = useRef(Date.now());
  const scrollTimeout = useRef(null);
  const isProgrammaticScroll = useRef(false);

  // Update scroll element when ref is available
  useEffect(() => {
    if (scrollElementRef.current) {
      setScrollElement(scrollElementRef.current);
    }
  }, []);

  // Handle scroll direction changes
  useEffect(() => {
    // Don't process scroll if we're in the middle of a programmatic scroll
    if (isProgrammaticScroll.current) return;
    if (!scrollDirection || scrollCount === lastScrollCount.current) return;

    const now = Date.now();
    // Throttle tab changes to avoid rapid switching
    if (now - lastDirectionChange.current < 300) {
      return;
    }

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Add a small delay to make the transition smoother
    scrollTimeout.current = setTimeout(() => {
      setValue((prevValue) => {
        if (scrollDirection === "down") {
          // Scroll down: move to next tab
          const newValue = Math.min(prevValue + 1, TABS_COUNT - 1);
          return newValue;
        } else {
          // Scroll up: move to previous tab
          const newValue = Math.max(prevValue - 1, 0);
          return newValue;
        }
      });
      lastScrollCount.current = scrollCount;
      lastDirectionChange.current = now;
    }, 50);

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [scrollDirection, scrollCount]);

  // Scroll to section when tab changes
  useEffect(() => {
    // Skip if this is the initial render or value hasn't actually changed
    if (value === lastTabValue.current) return;

    lastTabValue.current = value;
    const containerId = SECTION_IDS[value];
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        // Set flag to ignore scroll events during programmatic scroll
        isProgrammaticScroll.current = true;
        setIgnoreScroll(true);

        container.scrollIntoView({ behavior: "smooth", block: "start" });

        // Re-enable scroll detection after smooth scroll completes
        setTimeout(() => {
          isProgrammaticScroll.current = false;
          setIgnoreScroll(false);
        }, 800);
      }
    }
  }, [value, scrollElement, setIgnoreScroll]);

  const onUpdateTabValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        sx={{ height: ["unset", "unset", "100vh"], width: "100%" }}
      >
        <Grid
          item
          size={{ xs: 12, md: 2 }}
          sx={{
            height: ["unset", "unset", "100vh"],
            borderRight: 1,
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <Menu value={value} setValue={setValue} />
        </Grid>
        <Grid
          item
          size={{ xs: 12, md: 10 }}
          ref={scrollElementRef}
          id="scrollable-content"
          sx={{
            height: ["unset", "unset", "100vh"],
            flex: ["unset", "unset", "1"],
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Hero onUpdateTabValue={onUpdateTabValue} />
          <SectionDivider />
          <Illustrations />
          <SectionDivider />
          <Graphics />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Contact />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
