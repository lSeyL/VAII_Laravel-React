//import style from "./Signup.module.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import Nav from "../components/Nav";
function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      });
  };
  return (
    <div>
      <Nav />
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Signup for free</h1>
            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            <input ref={nameRef} type="name" placeholder="Name" />
            <input ref={emailRef} type="email" placeholder="E-mail adress" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input
              ref={passwordConfirmationRef}
              type="password"
              placeholder="Password confirmation"
            />
            <button className="btn btn-block">Signup</button>
            <p className="message">
              Already registered? <Link to="/login">Sign in.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
