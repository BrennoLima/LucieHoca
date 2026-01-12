import React from "react";
import { Typography, Box } from "@mui/material";

const IllustrationCard = ({ image, title }) => {
  return (
    <Box
      className="paper-texture"
      sx={{
        width: "100%",
        height: "500px",
        position: "relative",
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        src={image}
        alt="illustration"
        sx={{
          borderRadius: 1,
          objectFit: "cover",
          height: "100%",
          width: "100%",
          WebkitMaskImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 85%,
            rgba(0, 0, 0, 0.2) 90%
          )`,
          WebkitMaskComposite: "source-in",
        }}
      />
      <Box
        sx={{
          px: 2,
          pb: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography color="primary.dark" variant="h6" fontWeight={500}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default IllustrationCard;
