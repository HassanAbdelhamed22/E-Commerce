import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { BaseUrl } from "../../modal";
import { userContext } from "../../UserContext";
import img from "../../Assets/user (1).png";
import Loading from "./../Loading";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import ChangePassword from "./ChangePassword";

export default function Profile() {
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);

  let token = localStorage.getItem("userToken");

  function getUserInformation(id) {
    return axios.get(`${BaseUrl}api/v1/orders/user/${id}`);
  }

  async function handleUpdateProfile(values) {
    try {
      setLoading(true);
      const requestBody = {
        email: values.email,
        name: values.name,
        phone: values.phone,
      };
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        requestBody,
        {
          headers: {
            token,
          },
        }
      );
      if (data.message === "success") {
        setMsg("");
        setLoading(false);
        // Show toast message for success
        toast.success("Your Profile is updated correctly");
        // Refetch user information to reflect changes
        QueryClient.refetchQueries("userInformation"); // Assuming you're using React Query's queryClient
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Too short min is 2")
      .max(25, "Too long max is 25"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(02)?(01)[0-25][0-9]{8}$/, "Phone is not valid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  let { data, error, isError, isLoading } = useQuery("userInformation", () =>
    getUserInformation(decodedToken.id)
  );

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className=" container">
      <div className="d-flex align-items-center justify-content-center min-vh-100 mx-2 my-5">
        <div className="row border rounded-5 p-3 bg-white shadow">
          <div className="d-flex align-items-center border-bottom mb-4 pb-3 gap-3">
            <img src={img} alt="profileImage" />
            <span className="d-flex">
              <span className=" fw-bolder">
                Hi
                <br />
              </span>
              <span className="mx-1 capitalize-first-letter text-main">
                {data?.data[0]?.user.name}
              </span>
            </span>
          </div>
          <div>
            <label htmlFor="id" className="fw-bold text-main">
              ID:
            </label>
            <input
              disabled
              type="text"
              id="id"
              className="form-control form-control-lg mb-2 fs-6"
              value={decodedToken.id}
            />
          </div>
          <form onSubmit={formik.handleSubmit} className="border-bottom">
            <div className="form-area row">
              <div className="">
                <label htmlFor="email" className="fw-bold text-main">
                  Email:
                </label>
                <input
                  type="email"
                  className=" form-control form-control-lg bg-light mb-2 fs-6"
                  id="email"
                  placeholder={data?.data[0]?.user.email}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className=" alert alert-danger">{formik.errors.email}</p>
                ) : (
                  ""
                )}

                <label htmlFor="name" className="fw-bold text-main">
                  Name:
                </label>
                <input
                  type="text"
                  className=" form-control form-control-lg bg-light mb-2 fs-6"
                  id="name"
                  placeholder={data?.data[0]?.user.name}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className=" alert alert-danger">{formik.errors.name}</p>
                ) : (
                  ""
                )}

                <label htmlFor="phone" className="fw-bold text-main">
                  Phone:
                </label>
                <input
                  type="tel"
                  className=" form-control form-control-lg bg-light mb-1 fs-6"
                  id="phone"
                  placeholder={data?.data[0]?.user.phone}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <p className=" alert alert-danger">{formik.errors.phone}</p>
                ) : (
                  ""
                )}
              </div>
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-lg bg-main text-white w-100 fs-6 reg-btn ms-auto d-block my-3"
                style={{ color: "white", borderRadius: "10px" }} // Apply white color to the button text
              >
                {loading ? (
                  <TailSpin
                    visible={true}
                    height="30"
                    width="40"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
          <ChangePassword></ChangePassword>
        </div>
      </div>
    </div>
  );
}
