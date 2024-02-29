// Categories.jsx
import axios from "axios";
import React from "react";
import { BaseUrl } from "../../modal";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  function getCategory() {
    return axios.get(`${BaseUrl}api/v1/categories`);
  }
  let { data } = useQuery("category", getCategory);

  return (
    <div className=" container">
      <div className="row gy-4 my-3 ">
        {data?.data?.data.map((ele) => (
          <div className="col-md-3  p-3 rounded-3 " key={ele._id}>
            <Link to={`/subCategories/${ele._id}`}>
              <img
                className="w-100 rounded-4"
                height={400}
                src={ele.image}
                alt={ele.name}
              />
              <p className="text-center fw-bold my-2">{ele.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
