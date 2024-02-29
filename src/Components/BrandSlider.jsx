import axios from "axios";
import React from "react";
import Slider from "react-slick";
import { BaseUrl } from "../modal";
import { useQuery } from "react-query";

export default function BrandSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  function getCategory() {
    return axios.get(`${BaseUrl}api/v1/brands`);
  }
  let { data } = useQuery("brands", getCategory);
  return (
    <div className="row w-100 ">
      {data?.data?.data ? (
        <div className="slider-container mb-3">
          <Slider {...settings}>
            {data?.data?.data.map((ele) => (
              <>
                <img
                  className="w-100"
                  height={130}
                  key={ele._id}
                  src={ele.image}
                  alt={ele.name}
                />
              </>
            ))}
          </Slider>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
