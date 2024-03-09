import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { BaseUrl } from "../../modal";
import axios from "axios";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import img from "../../Assets/undraw_sign_up_n6im.svg";
import { userContext } from "../../UserContext";

export default function Registration() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  async function getRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(`${BaseUrl}api/v1/auth/signup`, values);
      if (data.message === "success") {
        navigate("/");
        setMsg("");
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  // function validate(values) {
  //   let errors = {};
  //   if (!values.name) errors.name = "name is required";
  //   else if (values.name.length < 2) errors.name = "too short min is ";
  //   else if (values.name.length > 5) errors.name = "too long min is ";
  //   if (!values.email) errors.email = "email is required";

  //   return errors;
  // }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Too short min is 2")
      .max(25, "Too long max is 25"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is not valid"),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Must be compatiable with password"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(02)?(01)[0-25][0-9]{8}$/, "Phone is not valid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: getRegister,
  });

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100 my-4">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 left-box rounded-4 d-flex align-items-center justify-content-center flex-column bg-main">
            <div className="featured-image mb-3 mt-3">
              <img src={img} alt="Login-Image" className="img-fluid " />
            </div>
            <p className="text-light fs-2 fw-bold mb-3">Sign Up Now!</p>
            <small
              className="text-light text-wrap text-center fs-6  mb-3"
              style={{ width: "17rem" }}
            >
              Join us today for exclusive deals.
            </small>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h3>Welcome aboard! Join us.</h3>
                <small>Excited to have you join us!</small>
              </div>
              <form onSubmit={formik.handleSubmit}>
                {msg ? <p className=" alert alert-danger">{msg}</p> : ""}
                <div className="input-group mb-2">
                  {/* <label htmlFor="email">email:</label> */}
                  <input
                    type="text"
                    className=" form-control form-control-lg bg-light mb-2 fs-6"
                    id="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.name && formik.touched.name ? (
                  <p className=" alert alert-danger">{formik.errors.name}</p>
                ) : (
                  ""
                )}
                <div className="input-group mb-2">
                  {/* <label htmlFor="password">password:</label> */}
                  <input
                    type="email"
                    className=" form-control form-control-lg bg-light mb-2 fs-6"
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
                <div className="input-group mb-2">
                  {/* <label htmlFor="password">password:</label> */}
                  <input
                    type="password"
                    className=" form-control form-control-lg bg-light mb-2 fs-6"
                    id="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className=" alert alert-danger">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <div className="input-group mb-2">
                  {/* <label htmlFor="password">password:</label> */}
                  <input
                    type="password"
                    className=" form-control form-control-lg bg-light mb-2 fs-6"
                    id="rePassword"
                    placeholder="rePassword"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <p className=" alert alert-danger">
                    {formik.errors.rePassword}
                  </p>
                ) : (
                  ""
                )}
                <div className="input-group mb-1">
                  {/* <label htmlFor="password">password:</label> */}
                  <input
                    type="tel"
                    className=" form-control form-control-lg bg-light mb-1 fs-6"
                    id="phone"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.phone && formik.touched.phone ? (
                  <p className=" alert alert-danger">{formik.errors.phone}</p>
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
                </div>
                <div className="input-group mb-3">
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-lg bg-main text-white w-100 fs-6 reg-btn ms-auto d-block"
                    style={{ color: "white", borderRadius: "10px" }} // Apply white color to the button text
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
                      "Register"
                    )}
                  </button>
                  <div className="d-flex align-items-center justify-content-center my-3">
                    <div className="line me-1 text-light bg-black"></div>
                    <small className=" text-black">Or Signup with</small>
                    <div className="line ms-1 text-light bg-black"></div>
                  </div>
                </div>
                <div className="input-group mb-3 d-flex align-items-center justify-content-center gap-3">
                  <button className="btn btn-lg btn-light fs-6 shadow rounded-3 p-2 ">
                    <i className="fa-brands fa-google fa-2xl"></i>
                  </button>
                  <button className="btn btn-lg btn-light  fs-6  shadow rounded-3 p-2">
                    <i className="fa-brands fa-facebook fa-2xl"></i>
                  </button>
                  <button className="btn btn-lg btn-light  fs-6 shadow rounded-3 p-2">
                    <i className="fa-brands fa-twitter fa-2xl"></i>
                  </button>
                </div>
                <div className="row">
                  <small>
                    Already have account?{" "}
                    <Link
                      to="/"
                      className="text-decoration-underline text-main"
                    >
                      Login
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
