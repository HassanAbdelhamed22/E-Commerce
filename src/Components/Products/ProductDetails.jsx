import React from "react";
import { useParams } from "react-router-dom";
import { featuredOneProduct, useProduct } from "../../useProduct";
import Loading from "../Loading";
import { addToCart, useCartCrud } from "../../useCart";
import Slider from "react-slick";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

export default function ProductDetails() {
  let { mutate } = useCartCrud(addToCart);
  let { id } = useParams();

  let { data, error, isError, isLoading } = useProduct("productdetails", () =>
    featuredOneProduct(id)
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Adjusted speed for smoother transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjusted autoplay speed
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: false,
    fade: true,
    focusOnSelect: true,
    customPaging: function (i) {
      return (
        <a>
          <img
            src={data?.images[i]}
            className="w-100 img-fluid rounded-2 my-3"
          />
        </a>
      );
    },
    dotsClass: "slick-dots slick-thumb",
  };

  return (
    <div className="row align-items-center my-5 w-100  shadow rounded-3 justify-content-center product-details">
      <div className="col-lg-3 col-md-4 col-sm-12 my-5">
        <div className="slider-container">
          <Slider {...settings}>
            {data?.images?.map((img, index) => (
              <img
                className="w-100    rounded-4"
                key={index}
                src={img}
                alt={`Product Image ${index + 1}`}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="col-lg-8 col-md-8 col-sm-12 mx-3 my-5">
        <h3 className="fw-bold mb-3">{data?.title}</h3>
        <p className="mb-4">{data?.description}</p>
        <p className="text-main fs-5 mb-2">{data?.category?.name}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bolder">{data?.price} EGP</span>
          <span>
            {data?.ratingsAverage} <i className="fas fa-star rating-color"></i>
          </span>
        </div>
        <button
          className="btn bg-main text-white w-100 mt-3 add-btn"
          onClick={() => {
            mutate(data?._id);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
