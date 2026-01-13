import React, { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";

import { Menu } from "../components/Menu";
import { lightTheme } from "../theme/light";
import { useActiveSection } from "../hooks/useActiveSection";
import Illustrations from "../components/Illustrations/Illustrations";
import SectionDivider from "../components/shared/SectionDivider";
import Hero from "../components/Hero";
import Graphics from "../components/Graphics";
import About from "../components/About";
import Contact from "../components/Contact";

const SECTION_IDS = ["hero", "illustrations", "graphics", "about", "contact"];

export const Home = () => {
  const theme = createTheme(lightTheme);
  const [value, setValue] = useState(0);
  const scrollElementRef = useRef(null);
  const lastTabValue = useRef(0);

  // Detect which section is in view and update value
  const { setIgnoreScroll } = useActiveSection(
    SECTION_IDS,
    (index) => {
      setValue(index);
    },
    {
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.3,
    }
  );

  // Scroll to section when tab changes (menu click)
  useEffect(() => {
    // Skip if this is the initial render or value hasn't actually changed
    if (value === lastTabValue.current) return;

    lastTabValue.current = value;
    const containerId = SECTION_IDS[value];
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        // Temporarily ignore scroll detection during programmatic scroll
        setIgnoreScroll(true);

        container.scrollIntoView({ behavior: "smooth", block: "start" });

        // Re-enable scroll detection after smooth scroll completes
        setTimeout(() => {
          setIgnoreScroll(false);
        }, 1000);
      }
    }
  }, [value, setIgnoreScroll]);

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
          <About onUpdateTabValue={onUpdateTabValue} />
          <SectionDivider />
          <Contact />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
