"use client";
import { Stack, Button, Menu, MenuItem, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./navlinks.css"; 
import axios from "axios";
import { useRouter } from "next/navigation";
import "../top_bar/TopBar.css";
import { serverUrl } from "@/utils/helper";
import LanguageChanger from "@/components/LanguageChanger";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
}

function Navlinks(props: Props) {
  const { t } = useTranslation();
  const { data } = props;
  const router = useRouter();

  // Dropdown States
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElTwo, setAnchorElTwo] = React.useState<null | HTMLElement>(null);
  const [anchorElThree, setAnchorElThree] = React.useState<null | HTMLElement>(null);
  const [anchorElFour, setAnchorElFour] = React.useState<null | HTMLElement>(null);

  // Data States
  const [drop, setdrop] = useState([]);      // Brands
  const [catDrop, setCatDrop] = useState([]); // Categories
  const [location, setLocation] = useState([]); // Locations

  // Open Helpers
  const open = Boolean(anchorEl);
  const openTwo = Boolean(anchorElTwo);
  const openThree = Boolean(anchorElThree);
  const openFour = Boolean(anchorElFour);

  useEffect(() => {
    // API Calls
    axios.get(serverUrl + "/user/getAllBrands").then((res) => setdrop(res.data.data || [])).catch(console.log);
    axios.get(serverUrl + "/user/getAllCategoryes").then((res) => setCatDrop(res.data.data || [])).catch(console.log);
    axios.get(serverUrl + "/user/getAllcarLoaction").then((res) => setLocation(res.data.data || [])).catch(console.log);
  }, []);

  // Handlers
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClickTwo = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElTwo(event.currentTarget);
  const handleClickThree = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElThree(event.currentTarget);
  const handleClickFour = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElFour(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const handleCloseTwo = () => setAnchorElTwo(null);
  const handleCloseThree = () => setAnchorElThree(null);
  const handleCloseFour = () => setAnchorElFour(null);

  const dailyWeeklyButton = [
    { label: t("landingPage:navbar.subscription.daily") || "Daily", route: "daily=daily", subs: "dailyAndWeekly" },
    { label: t("landingPage:navbar.subscription.weekly") || "Weekly", route: "weekly=weekly", subs: "dailyAndWeekly" },
    { label: t("landingPage:navbar.subscription.monthly") || "Monthly", route: "monthly=monthly", subs: "monthly" },
  ];

  // ** Premium Button Style **
  const navButtonStyle = {
    color: "white",
    cursor: "pointer",
    fontWeight: 600, 
    fontSize: "0.9rem",
    textTransform: "capitalize", // Elegant Look
    minWidth: "auto",
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: "8px",
        textDecoration: "none"
    }
  };

  return (
    <div className="Navlink" style={{ backgroundColor: "#0A2E47", padding: "10px 0px" }}>
      <Box>
        <Stack 
            spacing={{ xs: 1, md: 1, lg: 2 }} 
            direction="row" 
            sx={{ justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
        >
          
          {/* 1. HOME */}
          <Button id="desktop-nav-home" onClick={() => router.push("/")} sx={navButtonStyle}>
            Home
          </Button>

          {/* 2. LOCATIONS */}
          <Box>
            <Button id="desktop-nav-location" onClick={handleClick} sx={navButtonStyle} endIcon={<ArrowDropDownIcon />}>
              {t("landingPage:navbar.location") || "Locations"}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem sx={{ textTransform: "capitalize" }} onClick={() => { router.push(`/pages/carWithLocation`); handleClose(); }}>All</MenuItem>
              {location.map((item: any) => (
                <MenuItem key={item._id} sx={{ textTransform: "capitalize" }} onClick={() => { router.push(`/pages/carWithLocation?locaNametion=${item.Name}`); handleClose(); }}>
                  {item.Name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 3. BRAND */}
          <Box>
            <Button id="desktop-nav-brand" onClick={handleClickTwo} sx={navButtonStyle} endIcon={<ArrowDropDownIcon />}>
              {t("landingPage:navbar.brand") || "Brands"}
            </Button>
            <Menu anchorEl={anchorElTwo} open={openTwo} onClose={handleCloseTwo}>
              <MenuItem sx={{ textTransform: "capitalize" }} onClick={() => { router.push(`/pages/carWithLocation`); handleCloseTwo(); }}>All</MenuItem>
              {drop.length > 0 && drop.map((item: any) => (
                <MenuItem key={item._id} sx={{ textTransform: "capitalize" }} onClick={() => { router.push(`/pages/carWithLocation?brand=${item.name}`); handleCloseTwo(); }}>
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 4. CATEGORY */}
          <Box>
            <Button id="desktop-nav-category" onClick={handleClickThree} sx={navButtonStyle} endIcon={<ArrowDropDownIcon />}>
              {t("landingPage:navbar.category") || "Categories"}
            </Button>
            <Menu anchorEl={anchorElThree} open={openThree} onClose={handleCloseThree}>
              <MenuItem sx={{ textTransform: "capitalize" }} onClick={() => { router.push(`/pages/carWithLocation`); handleCloseThree(); }}>All</MenuItem>
              {catDrop.length > 0 && catDrop.map((item: any) => (
                <MenuItem key={item._id} sx={{ textTransform: "capitalize" }} onClick={() => { router.push(`/pages/carWithLocation?category=${item.name}`); handleCloseThree(); }}>
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 5. SUBSCRIPTION */}
          <Box>
            <Button id="desktop-nav-subscription" onClick={handleClickFour} sx={navButtonStyle} endIcon={<ArrowDropDownIcon />}>
              {t("landingPage:navbar.subscription.heading") || "Subscription"}
            </Button>
            <Menu anchorEl={anchorElFour} open={openFour} onClose={handleCloseFour}>
              {dailyWeeklyButton.map((item: any, index) => (
                <MenuItem key={index} id={`desktop-sub-${item.label}`} sx={{ textTransform: "capitalize" }} onClick={() => {
                    sessionStorage.setItem("subscription", item.subs);
                    router.push(`/pages/carWithLocation?${item.route}`);
                    handleCloseFour();
                  }}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 6. SERVICE */}
          <Button id="desktop-nav-service" onClick={() => router.push("/pages/services")} sx={navButtonStyle}>
            Service
          </Button>

          {/* 7. FAQ */}
          <Button id="desktop-nav-faq" onClick={() => router.push("/pages/newFaq")} sx={navButtonStyle}>
            FAQ
          </Button>

          {/* 8. CONTACT US */}
          <Button id="desktop-nav-contact" onClick={() => router.push("/pages/contactUs")} sx={navButtonStyle}>
            Contact Us
          </Button>

          {/* Language Changer */}
          <Box>
            <LanguageChanger />
          </Box>

        </Stack>
      </Box>
    </div>
  );
}

export default Navlinks;