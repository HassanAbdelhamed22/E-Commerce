import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { BaseUrl } from "../../modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function ChangePassword() {
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);

  let token = localStorage.getItem("userToken");

  async function updatePassword(values) {
    try {
      setLoading(true);
      const requestBody = {
        currentPassword: values.currentPassword,
        password: values.password,
        rePassword: values.rePassword,
      };

      let { data } = await axios.put(
        `${BaseUrl}api/v1/users/changeMyPassword`,
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
        toast.success("Your Password is updated correctly");
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is not valid"),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Must be compatiable with password"),
    currentPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is not valid"),
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: updatePassword,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-5">
      <input
        type="password"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="form-control form-control-lg bg-light mb-3 fs-6"
        placeholder="Current Password"
      />
      <div className="d-flex align-items-center justify-content-center gap-3">
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control form-control-lg bg-light mb-1 fs-6"
          placeholder="Password"
        />
        <input
          type="password"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control form-control-lg bg-light mb-1 fs-6"
          placeholder="Re-enter Password"
        />
      </div>
      {formik.errors.currentPassword && formik.touched.currentPassword && (
        <p className="alert alert-danger">{formik.errors.currentPassword}</p>
      )}
      {formik.errors.password && formik.touched.password && (
        <p className="alert alert-danger">{formik.errors.password}</p>
      )}
      {formik.errors.rePassword && formik.touched.rePassword && (
        <p className="alert alert-danger">{formik.errors.rePassword}</p>
      )}
      <button
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
        className="btn btn-lg bg-main text-white w-100 fs-6 reg-btn ms-auto d-block my-3"
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
          "Change Password"
        )}
      </button>
    </form>
  );
}
