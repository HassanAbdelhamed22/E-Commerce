import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, useCartCrud } from "../../useCart";
import {
  deleteWishlist,
  getWishlist,
  useWishlist,
  useWishlistCrud,
} from "../../useWishlist";
import ProductUi from "../Products/ProductUi";
import Loading from "../Loading";

export default function Wishlist() {
  const { data, isError, isLoading, error } = useWishlist(
    "wishlist",
    getWishlist
  );

  const { mutate: addToCartMutate } = useCartCrud(addToCart);

  let { mutate: deleteWishlistMutate } = useWishlistCrud(deleteWishlist);

  if (isLoading) return <Loading />;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container">
      <div className="row gy-4 my-4">
        {data?.data?.data?.map((prod) => (
          <div className="col-md-2" key={prod._id}>
            <div className="card h-100 product cursor-pointer">
              <i
                className="fa-solid fa-trash text-main fa-1x m-2"
                onClick={() => deleteWishlistMutate(prod._id)}
              ></i>
              <Link to={`/productDetails/${prod._id}`}>
                <img
                  className="card-img-top"
                  src={prod.imageCover}
                  alt={prod.title}
                />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5 text-main">
                    {prod.category.name}
                  </h2>
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
                className="btn bg-main text-white mx-3 my-2 add-btn"
                onClick={() => {
                  addToCartMutate(prod._id);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
