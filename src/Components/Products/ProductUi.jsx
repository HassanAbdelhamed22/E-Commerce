import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, useCartCrud } from "../../useCart";
import {
  addToWishlist,
  deleteWishlist,
  useWishlistCrud,
} from "../../useWishlist";

export default function ProductUi({ prod }) {
  let [heart, setHeart] = useState(false);

  let { data, error, isError, mutate } = useCartCrud(addToCart);
  let { data: wishlistData, mutate: wishlistMutate } =
    useWishlistCrud(addToWishlist);
  let { mutate: deleteWishlistMutate } = useWishlistCrud(deleteWishlist);

  if (isError) return <h2>{error.message}</h2>;

  function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(heart)); // Save wishlist data
  }

  function handleHeartClick(prodId) {
    if (!heart) {
      wishlistMutate(prodId); // Add to wishlist
      setHeart(true);
    } else {
      deleteWishlistMutate(prodId); // Remove from wishlist
      setHeart(false);
    }
    saveWishlist(); // Save wishlist state to localStorage
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 product-parent">
      <div className="card h-100 product">
        <i
          className="fa-solid fa-heart fa-1x m-2"
          style={heart ? { color: "#0aad0a" } : { color: "black" }}
          onClick={() => handleHeartClick(prod._id)}
        />
        <Link to={`/productDetails/${prod._id}`}>
          <img
            className="card-img-top"
            src={prod.imageCover}
            alt={prod.title}
          />
          <div className="card-body d-flex flex-column">
            <h2 className="card-title h5 text-main">{prod.category.name}</h2>
            <p className="card-text">{prod.title}</p>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <span className="fw-bolder">{prod.price} EGP</span>
              <span>
                {prod.ratingsAverage}{" "}
                <i className="fas fa-star rating-color"></i>
              </span>
            </div>
          </div>
        </Link>
        <button
          className="btn bg-main text-white mx-3 my-2 add-btn d-block "
          onClick={() => {
            mutate(prod._id);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
