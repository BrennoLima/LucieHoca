import React, { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";

import { Menu } from "../components/Menu";
import { lightTheme } from "../theme/light";
import Illustrations from "../components/Illustrations/Illustrations";
import SectionDivider from "../components/shared/SectionDivider";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";

const SECTION_IDS = ["hero", "illustrations", "about", "contact"];

export const Home = () => {
  const theme = createTheme(lightTheme);
  const [value, setValue] = useState(0);
  const scrollElementRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const rootEl = scrollElementRef.current || null;
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    if (sections.length === 0) return;

    if (prefersReducedMotion) {
      sections.forEach((el) => el.classList.add("reveal", "reveal--visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      {
        root: rootEl,
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    sections.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
          <About onUpdateTabValue={onUpdateTabValue} />
          <SectionDivider />
          <Contact />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
