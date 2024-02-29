import React, { useState } from "react";
import Loading from "../Loading";
import {
  useProduct,
  featuredProducts,
  featuredProducts2,
} from "../../useProduct";
import ProductUi from "./ProductUi";
import { Link, useParams } from "react-router-dom";

export default function Products() {
  let { data, isFetching, isError, isLoading, error } = useProduct(
    "product",
    featuredProducts
  );

  let [searchArr, setSearchArr] = useState([]);

  function search(e) {
    let term = e.target.value;
    let newArr = data?.filter((ele) =>
      ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchArr(newArr);
  }

  if (isLoading) return <Loading />;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <div className="container my-4">
        <div className="w-75 mx-auto bg-main-light p-3 mb-4 rounded-3">
          <input
            type="text"
            className="form-control"
            onChange={search}
            placeholder="Find your Item here..."
          />
        </div>
        {/* <div className="dropdown mb-4">
          <a
            className="btn bg-main text-white dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort by Price
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a className="dropdown-item" href="#">
                High To Low
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Low To High
              </a>
            </li>
          </ul>
        </div> */}
        <div className="row gy-4">
          {searchArr.length
            ? searchArr.map((prod) => <ProductUi key={prod._id} prod={prod} />)
            : data.map((prod) => <ProductUi key={prod._id} prod={prod} />)}
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mb-3">
          <li className="page-item">
            <Link className="page-link" to="/products">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/productsPageTwo">
              2
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
