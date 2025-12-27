"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  InputAdornment,
  Divider,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";

import NavFooter from "@/utils/Na_Fo";
import { googleMapKey } from "./data";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        alert("Mail not sent");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavFooter footer={true}>
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: 6,
          background: "linear-gradient(180deg,#f5f7fb,#ffffff)",
        }}
      >
        {/* ===== HEADER ===== */}
        <Box textAlign="center" mb={7}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={600}
            letterSpacing={1}
          >
            CONTACT US
          </Typography>
          <Typography variant="h3" fontWeight={800} mt={1}>
            Let’s talk about your needs
          </Typography>
          <Typography color="text.secondary" mt={1}>
            We’re here to help you. Reach out anytime.
          </Typography>
        </Box>

        {/* ===== MAIN SECTION ===== */}
        <Grid container spacing={5} alignItems="stretch">
          {/* ===== FORM ===== */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                height: "100%",
                borderRadius: "24px",
                background: "#ffffff",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={3}>
                Send us a message
              </Typography>

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Message sent successfully!
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      multiline
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MessageIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 4,
                    py: 1.6,
                    borderRadius: "40px",
                    fontWeight: 700,
                    color: "white",
                    background: loading
                      ? "linear-gradient(90deg,#9e9e9e,#bdbdbd)"
                      : "linear-gradient(90deg,#1976d2,#42a5f5)",
                    boxShadow: loading
                      ? "none"
                      : "0 10px 30px rgba(25,118,210,0.4)",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>

              </form>
            </Paper>
          </Grid>

          {/* ===== ADDRESS ===== */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                height: "100%",
                borderRadius: "24px",
                background: "#ffffff",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={1}>
                Our Offices
              </Typography>
              <Typography color="text.secondary" mb={4}>
                Visit or contact us at our locations
              </Typography>

              {/* Dubai */}
              <Box mb={4}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 1.5,
                    borderRadius: "50%",
                    background: "#1976d2",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon />
                </Box>

                <Typography fontWeight={700}>Dubai Office</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  Office No # 554, Tamani Arts Building
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Business Bay, Dubai, UAE
                </Typography>
                <Typography variant="body2" mt={1}>
                  📞 +971 50 996 0498
                </Typography>
                <Typography variant="body2">
                  📞 +971 50 996 1569
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Abu Dhabi */}
              <Box>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 1.5,
                    borderRadius: "50%",
                    background: "#2e7d32",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon />
                </Box>

                <Typography fontWeight={700}>Abu Dhabi Office</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  Office No # 3, Musaffah Shabiya ME12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  C246, UAE
                </Typography>
                <Typography variant="body2" mt={1}>
                  📞 +971 52 948 7046
                </Typography>
                <Typography variant="body2">
                  ✉️ info@logicrent.ae
                </Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>

        {/* ===== MAP ===== */}
        <Box sx={{ height: "420px", mt: 8 }}>
          <Paper
            sx={{
              height: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.825177630775!2d55.26233197538757!3d25.185403877716417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69a4f8c1e4c1%3A0x7b64b16c0f6f9a3c!2sTamani%20Arts%20Building!5e0!3m2!1sen!2sae!4v1735140000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>
        </Box>

      </Box>
    </NavFooter>
  );
};

export default ContactUs;
