import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";
import toast from "react-hot-toast";
import img from "../../Assets/undraw_forgot_password_re_hxwm.svg";

export default function ForgetPassword() {
  let { setUser, setLogin } = useContext(userContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  async function getLogin(values) {
    try {
      setLoading(true);
      const requestBody = {
        email: values.email,
      };

      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        requestBody
      );

      if (data?.statusMsg === "success") {
        navigate("/resetCode");
        setMsg("");
        setLoading(false);
        toast.success(data?.message);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await getLogin(values);
        resetForm(); // Reset form fields after successful submission
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
  });

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area ">
          <div className="col-md-6 left-box rounded-4 d-flex align-items-center justify-content-center flex-column bg-main">
            <div className="featured-image mb-3 mt-3">
              <img src={img} alt="Login-Image" className="img-fluid " />
            </div>
            <p className="text-light fs-2 fw-bold mb-3">Forgot Password</p>
            <small
              className="text-light text-wrap text-center fs-6  mb-3"
              style={{ width: "17rem" }}
            >
              Don't stress. Resetting is easy!
            </small>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Welcome back!</h2>
                <small>Reset your password in a few clicks.</small>
              </div>
              <form onSubmit={formik.handleSubmit}>
                {msg ? <p className=" alert alert-danger">{msg}</p> : ""}
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className=" form-control mb-3"
                    id="email"
                    name="email"
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
                      "Send"
                    )}
                  </button>
                </div>

                <div className="row">
                  <small>
                    Remember Password?{" "}
                    <Link to="/" className="text-decoration-underline text-main">
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
