import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../modal";
import Loading from "../Loading";
import { useQuery } from "react-query";
import ProductUi from "../Products/ProductUi";
import img from "../../Assets/no-product.png";

export default function BrandDetails() {
  let { id } = useParams();

  function getBrandDetails(id) {
    return axios.get(`${BaseUrl}api/v1/products?brand=${id}`);
  }

  let { data, isError, isLoading, error, refetch } = useQuery(
    ["branddetails", id], // Pass id as a part of the query key
    () => getBrandDetails(id), // Pass a function that includes the id
    {
      select: (data) => data?.data?.data,
    }
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>; // Return the error message

  // Check if data exists and it is an array and it has at least one item
  if (data && Array.isArray(data) && data.length > 0) {
    return (
      <div className=" container">
        <div className="row gy-4 my-4">
          {data.map((prod) => (
            <ProductUi key={prod._id} prod={prod}></ProductUi>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className=" container d-flex align-items-center justify-content-center  my-5 flex-column">
        <h2 className="text-main fw-bold">No Items in this Brand</h2>
        <img src={img} alt="no items" className="empty-img" />
      </div>
    );
  }
}
