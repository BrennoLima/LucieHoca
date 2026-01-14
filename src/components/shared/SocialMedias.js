import React from "react";
import { Link, IconButton, Stack, Tooltip } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export const SocialMedias = ({ direction = "row", size = "small" }) => {
  const btnClass = {
    transition: "0.2s color ease-in",
    "&:hover": {
      color: (theme) => theme.palette.text.primary,
    },
  };

  return (
    <Stack direction={direction} gap={1} id="social-medias">
      <Tooltip title="Instagram">
        <IconButton
          size={size}
          sx={btnClass}
          href="https://www.instagram.com/luciehoca_illustration/"
          target="_blank"
        >
          <InstagramIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="LinkedIn">
        <IconButton
          className="social-btn"
          size={size}
          sx={btnClass}
          href="https://www.linkedin.com/in/luciehoca"
          target="_blank"
        >
          <LinkedInIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Email">
        <IconButton
          component={Link}
          className="social-btn"
          size={size}
          sx={btnClass}
          href="mailto:hocalucie98@gmail.com"
        >
          <EmailIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
