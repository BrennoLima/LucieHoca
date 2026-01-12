import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#7A5C8E", // Soft Lavender
      light: "#D6B1B8", // Dusty Rose
      dark: "#3F2A4D", // Deep Plum
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#C2A46D", // Antique Gold
    },

    text: {
      primary: "#3F2A4D", // Deep Plum (headings)
      secondary: "#3A3A3A", // Charcoal Ink (body)
      disabled: "#9A948F",
    },

    background: {
      default: "#F4EFEA", // Parchment White
      paper: "#FFFFFF",
    },

    divider: "#CFC8C2", // Muted Stone Gray

    action: {
      hover: "rgba(63, 42, 77, 0.06)",
      selected: "rgba(122, 92, 142, 0.12)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.08)",
    },
  },

  typography: {
    fontSize: 16,

    fontFamily: "'Inter', sans-serif",

    h1: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      color: "#5A3865",
    },
    h2: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 600,
      color: "#5A3865",
    },
    h3: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 500,
      color: "#5A3865",
    },
    h4: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 500,
      color: "#5A3865",
    },
    body1: {
      color: "#3A3A3A",
      lineHeight: 1.6,
    },
    body2: {
      color: "#555555",
      lineHeight: 1.6,
    },

    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-paper": {
            backgroundColor: "#f8f4fe",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#CFC8C2",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#7A5C8E",
          textDecorationColor: "rgba(122, 92, 142, 0.4)",
          "&:hover": {
            textDecorationColor: "#7A5C8E",
          },
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter', sans-serif",
          color: "#5A3865",
        },
      },
    },
  },
});

// Apply responsive font sizes - automatically scales fonts down on smaller screens
export const lightTheme = responsiveFontSizes(baseTheme, {
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
  factor: 4, // Responsiveness factor (higher = more scaling on mobile)
  variants: ["h1", "h2", "h3", "h4", "h5", "h6"],
});
