import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../modal";
import { useProduct } from "../../useProduct";
import Loading from "../Loading";
import { useQuery } from "react-query";
import ProductUi from "../Products/ProductUi";

export default function SubCategories() {
  let { id } = useParams();

  let { data, error, isError, isLoading } = useProduct("subcategories", () =>
    getSubCategories(id)
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>; // Return the error message

  function getSubCategories(id) {
    return axios.get(`${BaseUrl}api/v1/products?category[in]=${id}`);
  }

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
      <div className=" container">
        <h2 className="d-flex align-items-center justify-content-center text-main fw-bold my-5">
          No Items in this Category
        </h2>
      </div>
    );
  }
}
