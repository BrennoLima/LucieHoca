import React, { useEffect, useState } from "react";
import {
  Toolbar,
  AppBar,
  Box,
  Tab,
  Typography,
  Tabs,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Dialog,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { SocialMedias } from "./shared/SocialMedias";

const TABS = [
  { label: "Home", value: 0 },
  { label: "Illustrations", value: 1 },
  { label: "About", value: 2 },
  { label: "Contact", value: 3 },
];

const MobileMenu = ({ value, setValue }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(t);
  }, []);

  const handleTabChange = (_, newValue) => {
    setIsMenuOpen(false);
    setValue(newValue);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        className={`fade-in${isVisible ? " fade-in--visible" : ""}`}
        sx={{ backgroundColor: "#ffffff33" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <i>Lucie Hoca</i>
          </Typography>
          <IconButton
            color="primary"
            edge="end"
            aria-label="menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog fullScreen open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <img
            src="/assets/images/lucie-hoca.png"
            alt="LH-logo"
            style={{ width: "75%", height: "auto" }}
          />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="column" spacing={2} sx={{ mt: "10%" }}>
          <Tabs
            variant="fullWidth"
            orientation="vertical"
            value={value}
            onChange={handleTabChange}
            aria-label="Menu"
            sx={{
              "& .MuiTab-root": {
                width: "100%",
                fontWeight: 400,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              },
              "& .Mui-selected": {
                fontWeight: 800,
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SocialMedias />
          </Box>
        </Stack>

        <IconButton
          size="large"
          color="primary"
          aria-label="menu"
          onClick={() => setIsMenuOpen(false)}
          sx={{
            position: "absolute",
            bottom: "5%",
            right: "50%",
            transform: "translateX(50%)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </>
  );
};

const DesktopMenu = ({ value, setValue }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box className={`fade-in${isVisible ? " fade-in--visible" : ""}`}>
      <Box
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "center",
          pt: "5vh",
        }}
      >
        <img
          src="/assets/images/lucie-hoca-logo2.png"
          alt="LH-logo"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box sx={{ flex: 1, py: "5vh" }}>
        <Tabs
          variant="fullWidth"
          orientation="vertical"
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          aria-label="Menu"
          sx={{
            "& .MuiTab-root": {
              width: "100%",
              fontWeight: 400,
              alignItems: "flex-start",
              px: 5,
              position: "relative",
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
              },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .Mui-selected": {
              fontWeight: 700,
              "&::before": {
                content: '""',
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: (theme) => theme.palette.primary.main,
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ ml: 4 }}>
        <SocialMedias />
      </Box>
    </Box>
  );
};

export const Menu = ({ value, setValue }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // below 900px

  return isMobile ? (
    <MobileMenu value={value} setValue={setValue} />
  ) : (
    <DesktopMenu value={value} setValue={setValue} />
  );
};
