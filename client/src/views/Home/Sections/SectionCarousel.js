import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import image1 from "../../../assets/img/1.jpg";
import image2 from "../../../assets/img/2.jpg";
import image3 from "../../../assets/img/3.jpg";
import image4 from "../../../assets/img/4.jpg";
import medical from "../../../assets/img/medical.png";
import restoration from "../../../assets/img/restoration.png";
import commercial from "../../../assets/img/commercial.png";
import residential from "../../../assets/img/residential.png";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";
const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  return (
    // <div className={classes.section}>
    <div className={classes.container}>
              <Carousel {...settings}>
                <div>
                  <img src={image1} alt="First slide" className="slick-image"/>
                  <div className="slick-caption">
                  <div className="deco">
                    <img src={medical}/>
                    <div className="deco-icon"></div>
                  </div>
                  <h1 className={classes.homeCaption}>MEDICAL</h1>
                    <h4 className={classes.homeCaption}>
                    Cleaning medical curtains, furniture, and more. OnSite Drapery Cleaning is a 
                    registered vendor for Duke and NC State systems and provides services to hospitals, 
                    clinics, and private practices all over North Carolina.
                    </h4>
                  </div>
                </div>
                <div>
                  <img src={image2} alt="Second slide" className="slick-image"/>

                  <div className="slick-caption">
                  <div className="deco">
                    <img src={restoration} alt='restoration image'/>
                    <div className="deco-icon"></div>
                  </div>
                  <h1 className={classes.homeCaption}>RESTORATION</h1>
                    <h4 className={classes.homeCaption}>
                    Restoring fine draperies, fixtures and more (including silks). OnSite Drapery 
                    Cleaning works with restoration companies to provide fine textile restoration 
                    services for fabrics affected by floods, fire and smoke, abandonment, age, and 
                    any other issues interfering with the enjoyment and preservation of fine textiles. 
                    Request that your restoration service provider or insurance company entrusts your specialty 
                    restoration services to OnSite Drapery Cleaning.
                    </h4>
                  </div>
                </div>
                <div>
                  <img src={image3} alt="Third slide" className="slick-image" />

                  <div className="slick-caption">
                  <div className="deco">
                    <img src={commercial}/>
                    <div className="deco-icon"></div>
                  </div>
                  <h1 className={classes.homeCaption}>COMMERCIAL</h1>
                    <h4 className={classes.homeCaption}>
                    We provide on-site cleaning services for wedding venues, auditoria, shops, cafes, 
                    and any other commercial sites looking for professional on-site dry cleaning services 
                    for hard-to-clean textiles such as draperies, furniture, fixtures, and more.
                    </h4>
                  </div>
                </div>
                <div>
                  <img src={image4} alt="Fourth slide" className="slick-image" />

                  <div className="slick-caption">
                  <div className="deco">
                    <img src={residential}/>
                    <div className="deco-icon"></div>
                  </div>
                    <h1 className={classes.homeCaption}>RESIDENTIAL</h1>
                    <h4 className={classes.homeCaption}>
                    Our residential clients enjoy affordable, premium dry cleaning services for 
                    draperies, sofas, and other fine home textiles 
                    (including silks) with the convenience of in-home services.
                    </h4>
                  </div>
                </div>
              </Carousel>
    </div>
    // </div> */}
  );
}
