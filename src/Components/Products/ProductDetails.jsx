import React from "react";
import { useParams } from "react-router-dom";
import { featuredOneProduct, useProduct } from "../../useProduct";
import Loading from "../Loading";
import { addToCart, useCartCrud } from "../../useCart";
import Slider from "react-slick";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";
import { addToWishlist, useWishlistCrud } from "../../useWishlist";

export default function ProductDetails() {
  let { mutate } = useCartCrud(addToCart);
  let { id } = useParams();

  let { data, error, isError, isLoading } = useProduct("productdetails", () =>
    featuredOneProduct(id)
  );

  let { data: wishlistData, mutate: wishlistMutate } =
    useWishlistCrud(addToWishlist);

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
    <div className=" container">
      <div className="row d-flex align-items-center my-5 shadow rounded-3 justify-content-center product-details">
        <div className="col-lg-4 col-md-4 col-sm-12 my-5">
          <div className="product-container">
            <Slider {...settings}>
              {data?.images?.map((img, index) => (
                <img
                  className="w-100 rounded-4"
                  key={index}
                  src={img}
                  alt={`Product Image ${index + 1}`}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="col-lg-7 col-md-8 col-sm-12 my-4 px-5">
          <h3 className="fw-bold mb-3">{data?.title}</h3>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="fw-bolder text-main">{data?.price} EGP</span>
            <span className="d-flex gap-3 align-items-center justify-content-center">
              <span className="rating-color d-flex align-items-center justify-content-center">
                <i className="fas fa-star rating-color px-1"></i>
                {data?.ratingsAverage}
              </span>{" "}
              <span style={{ fontSize: "14px" }}>
                {data?.ratingsQuantity} customer reviews
              </span>
            </span>
          </div>
          <p className="mb-1  py-3">{data?.description}</p>
          <div className="d-flex align-items-center justify-content-center gap-4">
            <button
              className="btn bg-main text-white mt-3 w-100 add-btn"
              onClick={() => {
                mutate(data?._id);
              }}
            >
              Add to cart
            </button>
            <button
              className="btn  text-white mt-3 bg-main-light"
              onClick={() => wishlistMutate(data?._id)}
            >
              <i className="fa-regular fa-heart fa-xl  cursor-pointer text-main" />
            </button>
          </div>
          <div className=" border-bottom border-top mt-4 py-3">
            <p className="">
              <span className="fw-bolder text-main">Category:</span>{" "}
              {data?.category?.name}
            </p>
            <p className="">
              <span className="fw-bolder text-main">Brand:</span>{" "}
              {data?.brand?.name}
            </p>
          </div>
          <div className="mt-3">
            <span className="text-main fw-bolder pe-3">Share this product</span>
            <i className=" fa-regular fa-brands fa-facebook-f cursor-pointer  btn   bg-main-light me-2"></i>
            <i className=" fa-regular fa-brands fa-twitter cursor-pointer me-2 btn   bg-main-light"></i>
            <i className=" fa-regular fa-brands fa-google cursor-pointer me-2  btn   bg-main-light"></i>
            <i className=" fa-regular fa-brands fa-linkedin-in cursor-pointer me-2 btn   bg-main-light"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
