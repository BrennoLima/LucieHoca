import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Hero = ({ onUpdateTabValue }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <Grid
      container
      id="hero"
      sx={{
        height: "100vh",
        width: "100%",
        overflow: { xs: "hidden", md: "visible" },
      }}
    >
      <Grid item size={{ xs: 12, md: 6 }} sx={{ mt: ["0", "10%"] }}>
        <Box
          className={`fade-in${isVisible ? " fade-in--visible" : ""}`}
          sx={{
            p: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isMobile ? (
            <Box>
              <img
                src="/assets/images/lucie-hoca-logo2.png"
                alt="LH-logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          ) : (
            <>
              <Typography letterSpacing={2} variant="h1" fontWeight={700}>
                <i>Lucie Hoca</i>
              </Typography>
              <Typography letterSpacing={1.5} variant="h4" sx={{ mb: 4 }}>
                <i>Illustrator & Visual Storyteller</i>
              </Typography>
            </>
          )}

          <Typography
            variant="body1"
            sx={{ mt: [4, 0], mb: 4, letterSpacing: 1 }}
          >
            I create narrative-driven illustrations that bring ideas to life.
            From imaginative worlds inspired by children's books to large-scale
            graphic artwork for high-profile events.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onUpdateTabValue(1)}
            >
              View Works
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onUpdateTabValue(3)}
            >
              Contact
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item size={{ xs: 0, md: 6 }}>
        <Box
          sx={{
            height: "100vh",
            width: { xs: "100%", md: "120%" }, // Make container wider to accommodate extension
            ml: { xs: 0, md: "-20%" }, // Extend image to the left into previous grid
          }}
        >
          <Box
            component="img"
            src="/assets/images/Illustration6.jpg"
            alt="Hero"
            sx={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
              // Fade to transparent on left and bottom edges only
              WebkitMaskImage: `linear-gradient(
                to right,
                transparent 0%,
                rgba(0, 0, 0, 0.1) 10%,
                rgba(0, 0, 0, 0.3) 20%,
                rgba(0, 0, 0, 0.6) 30%,
                rgba(0, 0, 0, 0.9) 50%,
                rgba(0, 0, 0, 1) 60%
              )`,
              WebkitMaskComposite: "source-in",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
export default Hero;
