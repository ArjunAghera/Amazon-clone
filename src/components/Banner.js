import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Banner() {
  return (
    <div className="relative">
      <div className=" absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20 " />
      <Carousel
        autoPlay
        infiniteLoop
        interval="4000"
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        <div>
          <img loading="lazy" src="/banner1.jpg" alt="banner 3" />
        </div>
        <div>
          <img loading="lazy" src="/banner2.jpg" alt="banner 2" />
        </div>
        <div>
          <img loading="lazy" src="/banner3.jpg" alt="banner 3" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
