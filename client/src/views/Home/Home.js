import React from "react";
// core components
import Header from "../../components/Header/Header.js";
// import Footer from "../../components/Footer/Footer.js";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import LogoImg from "../../components/Header/LogoImg.js";
import SectionCarousel from "./Sections/SectionCarousel.js";

export default function Components(props) {
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand={<LogoImg/>}
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        {...rest}
      >
      </Header>
      <SectionCarousel />
    </div>
  );
}
