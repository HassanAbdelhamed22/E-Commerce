import axios from "axios";
import React from "react";
import { BaseUrl } from "../../modal";
import { useQuery } from "react-query";
import Loading from "../Loading";
import { Link } from "react-router-dom";

export default function Brands() {
  function getBrands() {
    return axios.get(`${BaseUrl}api/v1/brands`);
  }

  let { data, isError, isLoading, error, refetch } = useQuery(
    "brands",
    getBrands,
    {
      select: (data) => data?.data?.data,
    }
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className=" container">
      <div className=" row text-center">
        {data?.map((ele) => (
          <div className="col-md-3" key={ele._id}>
            <Link to={`/brandDetails/${ele._id}`}>
              <div className="item ">
                <img className="cursor-pointer" src={ele.image} alt="" />
                <p>{ele.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
