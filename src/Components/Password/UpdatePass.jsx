import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { BaseUrl } from "../../modal";
import axios from "axios";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";
import img from "../../Assets/undraw_add_files_re_v09g.svg";
import toast from "react-hot-toast";
export default function UpdatePass() {
  let { setUser, setLogin } = useContext(userContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  async function getLogin(values) {
    try {
      setLoading(true);
      const requestBody = {
        email: values.email,
        newPassword: values.newPassword,
      };

      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        requestBody
      );

      if (data?.token) {
        // Successful login, token received
        navigate("/");
        setMsg("");
        setLoading(false);
        toast.success("Password Updated correctly❤️");
      } else {
        // Handle error or unexpected response
        setMsg(data?.message);
        setLoading(false);
      }
    } catch (error) {
      // Handle network error or API failure
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is not valid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: getLogin,
  });

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100  ">
      <div className="row border rounded-5 p-3 bg-white shadow box-area reverse">
        <div className="col-md-6 left-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Stay protected!</h2>
              <small>Change your password in a few simple steps</small>
            </div>
            <form onSubmit={formik.handleSubmit}>
              {msg ? <p className=" alert alert-danger">{msg}</p> : ""}
              <div className="input-group mb-3">
                {/* <label htmlFor="email">email:</label> */}
                <input
                  type="email"
                  className=" form-control form-control-lg bg-light mb-1 fs-6"
                  id="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <p className=" alert alert-danger">{formik.errors.email}</p>
              ) : (
                ""
              )}
              <div className="input-group mb-1">
                {/* <label htmlFor="password">password:</label> */}
                <input
                  type="password"
                  className=" form-control form-control-lg bg-light mb-1 fs-6"
                  id="newPassword"
                  placeholder="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <p className=" alert alert-danger">
                  {formik.errors.newPassword}
                </p>
              ) : (
                ""
              )}

              <div className="input-group ">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-lg bg-main text-white w-100 fs-6 reg-btn"
                  style={{ color: "white", borderRadius: "10px" }}
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
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 right-box rounded-4 d-flex align-items-center justify-content-center flex-column bg-main">
          <div className="featured-image mb-3 mt-3 update-img">
            <img src={img} alt="Login-Image" className="img-fluid " />
          </div>
          <p className="text-light fs-4 fw-bold mb-3">
            Update your password securely
          </p>
          <small
            className="text-light text-wrap text-center fs-6  mb-3"
            style={{ width: "15rem" }}
          >
            Kepp your account secure with a new password
          </small>
        </div>
      </div>
    </div>
  );
}
