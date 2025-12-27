"use client";
import React, { useState, useEffect } from "react";
import EnquiryForm from "../enquiry-form/EnquiryForm";
import { useRouter } from "next/navigation";
import Navlinks from "../navlinks/NavLinks";
import axios from "axios";
import { serverUrl } from "@/utils/helper";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// ** MUI Imports **
import {
  AppBar, Box, Button, CssBaseline, Toolbar, Typography, IconButton,
  Drawer, List, ListItemText, Collapse, Divider, ListItemButton,
} from "@mui/material";

// ** Icons **
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

interface Props {
  data: any;
}

function Navbar(props: Props) {
  const { t } = useTranslation();
  const { data } = props;
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [openLoc, setOpenLoc] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openSub, setOpenSub] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    axios.get(serverUrl + "/user/getAllcarLoaction").then((res) => setLocation(res.data.data || [])).catch(console.error);
    axios.get(serverUrl + "/user/getAllBrands").then((res) => setBrands(res.data.data || [])).catch(console.error);
    axios.get(serverUrl + "/user/getAllCategoryes").then((res) => setCategories(res.data.data || [])).catch(console.error);
  }, []);

  const dailyWeeklyButton = [
    { label: t("landingPage:navbar.subscription.daily") || "Daily", route: "daily=daily", subs: "dailyAndWeekly" },
    { label: t("landingPage:navbar.subscription.weekly") || "Weekly", route: "weekly=weekly", subs: "dailyAndWeekly" },
    { label: t("landingPage:navbar.subscription.monthly") || "Monthly", route: "monthly=monthly", subs: "monthly" },
  ];

  // ** Styles to force remove underline **
  const mainTextStyle = {
      fontSize: "1.1rem", 
      color: "white", 
      fontWeight: "bold", 
      textDecoration: "none"
  };
  
  const subTextStyle = {
      fontSize: "0.95rem", 
      color: "white", 
      opacity: 0.9,
      textDecoration: "none"
  };

  const drawer = (
    <Box sx={{ width: 280, backgroundColor: "#0A2E47", height: "100%", color: "#ffffff", display: "flex", flexDirection: "column" }}>
      
      {/* Header with Logo and Close Button */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "none", flexShrink: 0 }}>
        <Box onClick={() => router.push("/")} sx={{ cursor: "pointer" }}>
            <Image src="/final_logo.png" alt="logo" height={40} width={130} priority style={{ objectFit: 'contain' }} />
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
            <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List component="nav">
          
          {/* HOME - Border removed */}
          <ListItemButton id="nav-home" onClick={() => { router.push("/"); setMobileOpen(false); }} sx={{ py: 1.5 }}>
            <HomeIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary="Home" primaryTypographyProps={{ style: mainTextStyle }} />
          </ListItemButton>

          {/* SUBSCRIPTION - Border removed */}
          <ListItemButton id="nav-subscription" onClick={() => setOpenSub(!openSub)} sx={{ py: 1.5 }}>
            <SubscriptionsIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary={t("landingPage:navbar.subscription.heading") || "Subscription"} primaryTypographyProps={{ style: mainTextStyle }} />
            {openSub ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
          </ListItemButton>
          <Collapse in={openSub} timeout="auto" unmountOnExit>
             <List component="div" disablePadding sx={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                {dailyWeeklyButton.map((item, index) => (
                   <ListItemButton key={index} id={`nav-sub-${item.label}`} sx={{ pl: 4, py: 1 }} onClick={() => { sessionStorage.setItem("subscription", item.subs); router.push(`/pages/carWithLocation?${item.route}`); setMobileOpen(false); }}>
                      <ListItemText primary={item.label} primaryTypographyProps={{ style: subTextStyle }} />
                   </ListItemButton>
                ))}
             </List>
          </Collapse>

          {/* LOCATIONS - Border removed */}
          <ListItemButton id="nav-locations" onClick={() => setOpenLoc(!openLoc)} sx={{ py: 1.5 }}>
            <LocationOnIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary={t("landingPage:navbar.location") || "Locations"} primaryTypographyProps={{ style: mainTextStyle }} />
            {openLoc ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
          </ListItemButton>
          <Collapse in={openLoc} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
               <ListItemButton sx={{ pl: 4, py: 1 }} onClick={() => { router.push(`/pages/carWithLocation`); setMobileOpen(false); }}>
                  <ListItemText primary="All" primaryTypographyProps={{ style: subTextStyle }} />
               </ListItemButton>
               {location && location.map((item: any, index: number) => (
                  <ListItemButton key={item._id || index} sx={{ pl: 4, py: 1 }} onClick={() => { router.push(`/pages/carWithLocation?locaNametion=${item.Name}`); setMobileOpen(false); }}>
                    <ListItemText primary={item.Name} primaryTypographyProps={{ style: subTextStyle }} />
                  </ListItemButton>
               ))}
            </List>
          </Collapse>

          {/* BRANDS - Border removed */}
          <ListItemButton id="nav-brands" onClick={() => setOpenBrand(!openBrand)} sx={{ py: 1.5 }}>
            <DashboardIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary={t("landingPage:navbar.brand") || "Brands"} primaryTypographyProps={{ style: mainTextStyle }} />
            {openBrand ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
          </ListItemButton>
          <Collapse in={openBrand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <ListItemButton sx={{ pl: 4, py: 1 }} onClick={() => { router.push(`/pages/carWithLocation`); setMobileOpen(false); }}>
                  <ListItemText primary="All" primaryTypographyProps={{ style: subTextStyle }} />
               </ListItemButton>
              {brands && brands.map((item: any, index: number) => (
                <ListItemButton key={item._id || index} sx={{ pl: 4, py: 1 }} onClick={() => { router.push(`/pages/carWithLocation?brand=${item.name}`); setMobileOpen(false); }}>
                  <ListItemText primary={item.name} primaryTypographyProps={{ style: subTextStyle }} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          {/* CATEGORIES - Border removed */}
          <ListItemButton id="nav-categories" onClick={() => setOpenCat(!openCat)} sx={{ py: 1.5 }}>
            <CategoryIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary={t("landingPage:navbar.category") || "Categories"} primaryTypographyProps={{ style: mainTextStyle }} />
            {openCat ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
          </ListItemButton>
          <Collapse in={openCat} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <ListItemButton sx={{ pl: 4, py: 1 }} onClick={() => { router.push(`/pages/carWithLocation`); setMobileOpen(false); }}>
                  <ListItemText primary="All" primaryTypographyProps={{ style: subTextStyle }} />
               </ListItemButton>
              {categories && categories.map((item: any, index: number) => (
                <ListItemButton key={item._id || index} sx={{ pl: 4, py: 1 }} onClick={() => { router.push(`/pages/carWithLocation?category=${item.name}`); setMobileOpen(false); }}>
                  <ListItemText primary={item.name} primaryTypographyProps={{ style: subTextStyle }} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          {/* <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} /> */}

          {/* SERVICES - Border removed */}
          <ListItemButton id="nav-services" onClick={() => { router.push("/pages/services"); setMobileOpen(false); }} sx={{ py: 1.5 }}>
            <MiscellaneousServicesIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary="Service" primaryTypographyProps={{ style: { ...mainTextStyle, fontSize: "1.05rem" } }} />
          </ListItemButton>

          {/* FAQ - Border removed */}
          <ListItemButton id="nav-faq" onClick={() => { router.push("/pages/newFaq"); setMobileOpen(false); }} sx={{ py: 1.5 }}>
            <HelpOutlineIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary="FAQ" primaryTypographyProps={{ style: { ...mainTextStyle, fontSize: "1.05rem" } }} />
          </ListItemButton>

          {/* CONTACT - Border removed */}
          <ListItemButton id="nav-contact" onClick={() => { router.push("/pages/contactUs"); setMobileOpen(false); }} sx={{ py: 1.5 }}>
            <ContactSupportIcon sx={{ mr: 2, color: "white" }} />
            <ListItemText primary="Contact Us" primaryTypographyProps={{ style: { ...mainTextStyle, fontSize: "1.05rem" } }} />
          </ListItemButton>

        </List>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />

      <Box sx={{ px: 2, pb: 4, flexShrink: 0 }}>
        <Typography id="nav-phone-1" component="a" href="tel:+971509960498" sx={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <PhoneIcon /> +971 50 996 0498
        </Typography>
        <Typography id="nav-phone-2" component="a" href="tel:+971509961569" sx={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
          <PhoneIcon /> +971 50 996 1569
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Box id="mainNavbar" sx={{ display: "flex", backgroundColor: "#0A2E47" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: "#0A2E47", position: "fixed" }}>
          {/* Changed minHeight and py to make it vertically bigger (Choda) */}
          <Toolbar sx={{ 
              justifyContent: "space-between", 
              px: { xs: 1, sm: 2 },
              minHeight: { xs: "75px", md: "90px" }, // Height increased here
              py: 1.5 // Added padding top/bottom
            }}>
            
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 1, display: { md: "none" } }}>
                <MenuIcon />
              </IconButton>
              <Box sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
                {/* Logo size slightly increased to match new header height */}
                <Image src="/final_logo.png" alt="logo" height={50} width={135} style={{ objectFit: 'contain' }} />
              </Box>
            </Box>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Navlinks data={data} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: "8px", sm: "15px" } }}>
              <Button id="nav-btn-login" onClick={() => router.push("/pages/login")} sx={{ backgroundColor: "white", color: "black", fontWeight: "bold", textTransform: "uppercase", borderRadius: "20px", height: "40px", minWidth: { xs: "75px", sm: "100px" }, fontSize: { xs: "0.75rem", md: "0.9rem" }, "&:hover": { backgroundColor: "#f0f0f0" } }}>
                {t("landingPage:navbar.login")}
              </Button>
              <Box sx={{ "& button": { height: "40px !important", minWidth: { xs: "85px !important", sm: "110px !important" }, textTransform: "uppercase", fontSize: { xs: "0.75rem !important", md: "0.9rem !important" } }}}>
                <EnquiryForm />
              </Box>
              <Box sx={{ display: { xs: "none", lg: "flex" }, flexDirection: "column" }}>
                <Typography component="a" href="tel:+971509960498" sx={{ color: "white", fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                  <PhoneIcon sx={{ fontSize: "16px" }} /> +971 50 996 0498
                </Typography>
                <Typography component="a" href="tel:+971509961569" sx={{ color: "white", fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                  <PhoneIcon sx={{ fontSize: "16px" }} /> +971 50 996 1569
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: 280, backgroundColor: "#0A2E47" } }}>
          {drawer}
        </Drawer>
        <Box component="main"><Toolbar sx={{ minHeight: { xs: "75px", md: "90px" }, py: 1.5 }} /></Box>
      </Box>
    </>
  );
}

export default Navbar;