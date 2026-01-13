import React from "react";
import { Box } from "@mui/material";

const SectionDivider = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        my: -1.5,
      }}
    >
      <svg
        width="100%"
        height="24"
        viewBox="0 0 1000 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="12"
          x2="480"
          y2="12"
          stroke="#B39BC8"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Star */}
        <polygon
          points="500,4 503,10 510,12 503,14 500,20 497,14 490,12 497,10"
          fill="#B39BC8"
          filter="drop-shadow(0 0 4px rgba(247, 255, 130, 0.6))"
        />

        <line
          x1="520"
          y1="12"
          x2="1000"
          y2="12"
          stroke="#B39BC8"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </Box>
  );
};

export default SectionDivider;
