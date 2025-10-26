"use client";
import React from "react";
import { Box, CardActionArea, Container, Grid } from "@mui/material";
import "../footer/footer.css";
import {
  dailyWeeklyButton,
  legal,
  menuItems,
  scrollToSection,
  socialMediaLinks,
} from "./data";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface FooterProps {
  data: any;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const router = useRouter();


  return (
    <section id="footer" className="footer">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
            <CardActionArea>
              <Image
                src="/final_logo.png"
                alt="footer logo"
                height={65}
                width={235}
                loading="lazy"
              />
            </CardActionArea>
            <p className="foot_text">
              We are a premium car rental company based in Abu Dhabi, United
              Arab Emirates, offering a diverse fleet of vehicles to suit every
              need. Whether you are looking for an economy car, a luxury sedan,
              or a spacious SUV, we have the perfect vehicle for you at the best
              rates in the market.
            </p>
            <div className="foot_icons">
              <Grid container>
                <Box className="footer_social_media_images">
                  {socialMediaLinks.map((item, index) => (
                    <img
                      key={index}
                      src={item.src}
                      alt={item.alt}
                      onClick={item.onClick}
                    />
                  ))}
                </Box>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
            <div className="link_two">
              <h4>QUICK LINKS</h4>
              <ul>
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (item.label === "About Us") {
                        router.push("/pages/aboutUs");
                      }
                      if (item.label === "Contact Us") {
                        router.push("/pages/contactUs");
                      }
                      if (item.label === "FAQs") {
                        router.push("/pages/newFaq");
                      } else if (item.sectionId) {
                        scrollToSection(item.sectionId);
                      }
                    }}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
            <div className="link_two">
              <h4>SUBSCRIPTION</h4>
              <ul>
                {dailyWeeklyButton.map((item: any, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      sessionStorage.setItem("subscription", item.subs);
                      router.push(`/pages/carWithLocation?${item.route}`);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
            <div className="link_two">
              <h4>LEGAL</h4>
              <ul>
                {legal.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (item === "Terms & Conditions") {
                        router.push("/pages/termsAndcondition");
                      }
                      if (item === "Privacy Policy") {
                        router.push("/pages/privacyPolicy");
                      }
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
            <div className="link_two">
              <h4>CONTACT</h4>
              <ul>
                <li>
                  Al Mihad St, Mohamed Bin Zayed City, ME-10, Abu Dhabi, UAE
                </li>
                <li onClick={() => window.open('mailto:Info@logicrent.ae', '_blank')}>Info@logicrent.ae</li>
                <li onClick={() => window.open('tel:+971509960498', '_blank')}>+971 50 996 0498</li>
              </ul>
            </div>
          </Grid>
        </Grid>
        <div className="footerCopyRight">
          <p>
            © Copyright 2023 All Rights Reserved Designed Trackers Solution
            Dubai.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
