import React from "react";
import Slider from "react-slick";
import slide1 from "../Assets/slider-image-1.jpeg";
import slide2 from "../Assets/slider-image-2.jpeg";
import slide3 from "../Assets/slider-image-3.jpeg";
import blog1 from "../Assets/blog-img-1.jpeg";
import blog2 from "../Assets/blog-img-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <header className="slider-container">
      <div className="row gx-0 py-2">
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={slide1} height={400} alt="imgSlider1" className="w-100" />
            <img src={slide2} height={400} alt="imgSlider2" className="w-100" />
            <img src={slide3} height={400} alt="imgSlider3" className="w-100" />
          </Slider>
        </div>
        <div className="col-md-3 d-flex flex-column ">
          <img src={blog1} className="w-100" height={200} alt="blogImg1" />
          <img src={blog2} className="w-100" height={200} alt="blogImg2" />
        </div>
      </div>
      
    </header>
  );
}
