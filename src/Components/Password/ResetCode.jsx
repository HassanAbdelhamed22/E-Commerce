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

  async function getCode(values) {
    try {
      setLoading(true);
      const requestBody = {
        resetCode: values.resetCode,
      };

      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        requestBody
      );

      if (data?.status === "Success") {
        navigate("/updatePass");
        setMsg("");
        setLoading(false);
        toast.success("The verification code is correct");
       } //else if (data?.statusMsg === "fail") {
      //   toast.success(data?.message);
      // }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await getCode(values);
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
  });

  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="border rounded-5 p-3 bg-white shadow box-area-code ">
          <div className=" right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Verfiy Reset Code</h2>
              </div>
              <form onSubmit={formik.handleSubmit}>
                {msg ? <p className=" alert alert-danger">{msg}</p> : ""}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className=" form-control mb-3"
                    id="resetCode"
                    name="resetCode"
                    placeholder="resetCode"
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.resetCode && formik.touched.resetCode ? (
                  <p className="alert alert-danger">
                    {formik.errors.resetCode}
                  </p>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
