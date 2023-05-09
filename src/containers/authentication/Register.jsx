import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";
import Cookies from "universal-cookie";

import Logo from "../../assets/images/Sebmlogo.png";
import { path } from "../../utils/Variables";

const Register = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  // const handelCallBackResponse = async (response) => {
  //   console.log("encodd jwt id token " + response.credential);
  //   var useObject = jwt_decode(response.credential);
  //   console.log(useObject);
  // };

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "1028646392996-4d487tbr77eub6fen2oi1f3eumtsi03i.apps.googleusercontent.com",
  //     callback: handelCallBackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("SignInID"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  //   google.accounts.id.prompt();
  // }, []);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      if (!/\S+@\S+\.\S+/.test(e.target.value) || e.target.value === "") {
        // errors.email = "Please enter a valid email address";
        setErrors((prevState) => ({
          ...prevState,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: null,
        }));
      }
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      if (e.target.value.length < 3 || e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          password: "Password must be at least 8 characters long",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          password: null,
        }));
      }
    }
    // setErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errors.email != null || errors.password != null) {
      return swal("Error!", "check your Inputs", "error");
    }

    try {
      const response = await fetch(`${path}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      console.log(result);
      if (result.success === true) {
        swal("Success!", result.message, "success");
        const jsonvalue = JSON.stringify(result.data);
        cookies.set("user", jsonvalue);
        return navigate("/");
      } else {
        return swal("Error!", result.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 text-gray-900 flex justify-center items-center">
      <div className="w-1/2 bg-white rounded-md p-6">
        <div className="w-full ">
          <img src={Logo} className="w-32 " alt="" />
        </div>
        <h1 className="text-2xl xl:text-3xl font-extrabold my-4 text-center">Sign up</h1>
        <div className="w-full grid grid-cols-2 gap-4">

          <div className="">
            <label htmlFor="c_email" className="text-gray-700 font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="c_email"
              placeholder="Example@gmail.com.."
              className={`w-full rounded-md outline-none focus:outline-none px-2 py-1 
              border border-gray-500 bg-gray-100`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
