import React from "react";
import {
  Grid,
  Box,
  Typography,
  useTheme,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";

const About = ({ onUpdateTabValue }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid container id="about" sx={{ height: "100vh", width: "100%" }}>
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            p: { xs: 4, md: 8 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <Typography textAlign="center" variant="h2" sx={{ my: [0, 2] }}>
            <i>About</i>
          </Typography>
          {!isLargeScreen && (
            <Box
              component="img"
              src="/assets/images/lucie-about.png"
              alt="Hero"
              sx={{
                objectFit: "cover",
                height: "40%",
                width: "100%",
                borderRadius: 1,
              }}
            />
          )}

          <Stack spacing={[2, 4]}>
            {isExtraLargeScreen ? (
              <>
                <Typography sx={{ letterSpacing: 1 }}>
                  I create illustrations and visual artwork that tell stories,
                  evoke emotion, and invite curiosity. My work is inspired by
                  narrative, texture, and the small details that turn an image
                  into a world of its own.
                </Typography>
                <Typography sx={{ letterSpacing: 1 }}>
                  Alongside illustration, I've worked closely with event
                  designers and planners, creating visual pieces that shape
                  atmosphere and enhance experiences — from illustrated concepts
                  and layouts to decorative elements for both private and
                  corporate events.
                </Typography>
                <Typography sx={{ letterSpacing: 1 }}>
                  Whether working independently or collaboratively, I value
                  thoughtful communication and creative exploration. I'm
                  motivated by the happiness my work brings to others and
                  continually seek opportunities to grow, experiment, and
                  contribute to meaningful projects across Canada.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                  I'm an illustrator and graphic designer drawn to storytelling,
                  atmosphere, and detail. My work brings imagined worlds and
                  visual narratives to life — from intimate illustrations to
                  large-scale designs created for meaningful moments and shared
                  experiences.
                </Typography>
                <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                  Inspired by the joy art brings to others, I approach each
                  project with curiosity, care, and a love for visual
                  storytelling.
                </Typography>
              </>
            )}
          </Stack>
          <Box
            sx={{ display: "flex", justifyContent: "center", pb: [0, 0, 8] }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onUpdateTabValue(3)}
              size="small"
              sx={{ px: 4 }}
            >
              Let's Work Together
            </Button>
          </Box>
        </Stack>
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
            src="/assets/images/lucie-about.png"
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
export default About;
