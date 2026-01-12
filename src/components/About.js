import React from "react";
import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box id="about" sx={{ height: "100vh", width: "100%", py: 2 }}>
      <Typography textAlign="center" variant="h2" sx={{ my: 2 }}>
        <i>About</i>
      </Typography>
    </Box>
  );
};
export default About;
