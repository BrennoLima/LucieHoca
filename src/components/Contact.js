import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Alert,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { SocialMedias } from "./shared/SocialMedias";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.subject || !formData.message) {
      setAlert({
        show: true,
        message: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    // Create email body with form data
    const emailBody = `Hello,

My name is ${formData.name}.

${formData.message}

Best regards,
${formData.name}`;

    // Create mailto link
    const mailtoLink = `mailto:luciehoca98@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setAlert({
      show: true,
      message: "Opening your email client...",
      type: "success",
    });

    // Clear form after a short delay
    setTimeout(() => {
      setFormData({
        name: "",
        subject: "",
        message: "",
      });
      setAlert({ show: false, message: "", type: "" });
    }, 2000);
  };

  return (
    <Box id="contact" sx={{ height: "100vh", p: { xs: 4, md: 8 } }}>
      <Box sx={{ width: "100%" }}>
        <Typography textAlign="center" variant="h2">
          <i>Get In Touch</i>
        </Typography>
        {!isMobile && (
          <Typography textAlign="center">
            I'd love to hear from you! Whether you have a project in mind or
            just want to say hi, I'll get back to you as soon as possible.
            <br /> Feel free to reach out via email or social media.
          </Typography>
        )}
      </Box>
      <Grid container spacing={4} sx={{ mt: "10%" }}>
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert
                severity={alert.type}
                onClose={() => setAlert({ show: false, message: "", type: "" })}
              >
                {alert.message}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid
                item
                size={{ xs: 12 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  sx={{ px: 6 }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 4,
              backgroundColor: "#FFFFFF80",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img
                src="/assets/images/lucie-hoca.png"
                alt="LH-logo"
                style={{ width: isMobile ? "70%" : "40%", height: "auto" }}
              />
            </Box>
            <Grid
              container
              spacing={{ xs: 2, md: 0 }}
              sx={{
                alignItems: "center",
              }}
            >
              <Grid
                item
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <EmailOutlinedIcon color="primary" />
                  <Link href="mailto:hocalucie98@gmail.com">
                    hocalucie98@gmail.com
                  </Link>
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocalPhoneOutlinedIcon color="primary" />
                  <Link href="tel:+33666666666">+1 437-982-2579</Link>
                </Typography>
                <Typography
                  color="primary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocationOnOutlinedIcon color="primary" />
                  Alberta, Canada
                </Typography>
              </Grid>
              <Grid
                item
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SocialMedias />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
