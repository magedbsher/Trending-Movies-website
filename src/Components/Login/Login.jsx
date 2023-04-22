import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function Login({saveUserData}) {
  const [error, setError] = useState("");
  const [Loading,setLoading] = useState(false);
  let navigate = useNavigate();



  let validate = Yup.object({
    email: Yup.string().required("email is  required").email("invalid email"),
    password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase"),
    
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },validationSchema : validate,
    onSubmit: sendRegisterData,
  });

  async function sendRegisterData(values) {
    setLoading(true);
    console.log(values);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values).catch((err) => {
         console.log(err);
        setError(err.response.data.message);
        setLoading(false);
      });
  console.log(data);

    if (data.message === "success") {
      localStorage.setItem("userToken",data.token)
      saveUserData();
      //console.log(data);
      
      setLoading(false);
      navigate("/home");
    }
  }
  return (
    <>
      <div className="w-75 mx-auto  py-5">
        <h2>Login NOw</h2>
        <form onSubmit={formik.handleSubmit}>
          {error ? <div className="alert alert-danger ">{error}</div> : ""}

         
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
         

         
          {Loading ? (
            <button className="btn btn-success">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button className="btn btn-success" type="submit">
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}

