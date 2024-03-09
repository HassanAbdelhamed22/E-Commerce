import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { BaseUrl } from "../../modal";
import axios from "axios";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";
import img from "../../Assets/undraw_secure_login_pdn4.svg";

export default function Login() {
  let { setUser, setLogin } = useContext(userContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  async function getLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(`${BaseUrl}api/v1/auth/signin`, values);
      if (data.message === "success") {
        setUser(data.token);
        localStorage.setItem("userToken", data.token);
        setLogin(data.user.name);
        localStorage.setItem("userName", data.user.name);
        navigate("/home");
        setMsg("");
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  // const validationSchema = Yup.object({
  //   email: Yup.string()
  //     .required("Email is required")
  //     .email("Email is not valid"),
  //   password: Yup.string()
  //     .required("Password is required")
  //     .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is not valid"),
  // });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema,
    onSubmit: getLogin,
  });

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 my-5">
      <div className="row border rounded-5 p-3 bg-white shadow box-area reverse">
        <div className="col-md-6 left-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Welcome back!</h2>
              <small>We are happy to have you back.</small>
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
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.password && formik.touched.password ? (
                <p className=" alert alert-danger">{formik.errors.password}</p>
              ) : (
                ""
              )}
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check 5">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                  />
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Remember Me</small>
                  </label>
                </div>
                <div className="forgot">
                  <Link
                    to="forgetPassword"
                    className="text-decoration-underline text-main"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-lg bg-main text-white w-100 fs-6 reg-btn"
                  style={{ color: "white", borderRadius: "10px" }}
                >
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TailSpin
                        visible={true}
                        height={30}
                        width={40}
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius={1}
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="d-flex align-items-center justify-content-between my-3">
                  <div className="line  text-light bg-black"></div>
                  <small className=" text-black mx-4">Or Login with</small>
                  <div className="line  text-light bg-black"></div>
                </div>
              </div>
              <div className="input-group mb-3 d-flex align-items-center justify-content-center gap-3">
                <button className="btn btn-lg btn-light  fs-6 ">
                  <i className="fa-brands fa-google fa-2xl"></i>
                </button>
                <button className="btn btn-lg btn-light  fs-6 ">
                  <i className="fa-brands fa-facebook fa-2xl"></i>
                </button>
                <button className="btn btn-lg btn-light  fs-6">
                  <i className="fa-brands fa-twitter fa-2xl"></i>
                </button>
              </div>
              <div className="row">
                <small>
                  Don't have account?{" "}
                  <Link
                    to="registration"
                    className="text-decoration-underline text-main"
                  >
                    Sign Up
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 right-box rounded-4 d-flex align-items-center justify-content-center flex-column bg-main">
          <div className="featured-image mb-3 mt-3">
            <img src={img} alt="Login-Image" className="img-fluid " />
          </div>
          <p className="text-light fs-2 fw-bold mb-3">Be Verified</p>
          <small
            className="text-light text-wrap text-center fs-6  mb-3"
            style={{ width: "17rem" }}
          >
            Login to your account to continue shopping
          </small>
        </div>
      </div>
    </div>
  );
}
