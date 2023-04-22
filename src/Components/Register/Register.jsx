import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function Register() {


  const [error, setError] = useState("");
  const [Loading,setLoading] = useState(false);
  let navigate = useNavigate();


  let validate = Yup.object({
    name: Yup.string().min(3, "at least 3 characters").required("name is  required").max(15, "max 15 characters"),
    email: Yup.string().required("email is  required").email("invalid email"),
    password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase"),
    rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")], "rePassword must matches password"),
    phone: Yup.string().required("phone number is required").matches(/^01[0125][0-9]{8}$/, "invalid phone number "),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },validationSchema : validate,
    onSubmit: sendRegisterData,
  });

  async function sendRegisterData(values) {
    setLoading(true);
    console.log(values);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setLoading(false);
      });
  

    if (data.message === "success") {
      console.log(data);
      navigate("/login");
      setLoading(false);
    }
  }
  return (
    <>
      <div className="w-75 mx-auto  py-5">
        <h2>Register NOw</h2>
        <form onSubmit={formik.handleSubmit} className="py-5">
          {error ? <div className="alert alert-danger ">{error}</div> : ""}

          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2 "
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger ">{formik.errors.name}</div>
          ) : (
            ""
          )}
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger ">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger ">{formik.errors.password}</div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword">rePassword</label>

          <input
            type="password"
            name="rePassword"
            id="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            value={formik.values.rePassword}
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger ">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger ">{formik.errors.phone}</div>
          ) : (
            ""
          )}
          {Loading ? (
            <button className="btn btn-success">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button className="btn btn-success" type="submit">
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}

