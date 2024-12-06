import { renderHook } from "@testing-library/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";

import { AuthContext } from "../context/authContext";

import axios from "axios";

const LOGIN_URL = "/register";

const Login = () => {
  const errRef = useRef();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404) {
        setErrMsg("User not found");
      } else if (err.response?.status === 400) {
        setErrMsg("Wrong password or username");
      } else {
        setErrMsg("Login failed!");
      }
      //   setErrMsg(err.message);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1 className="centered success-text">Success!</h1>
          <p className="centered">
            <a className="login-button" href="/">
              Home
            </a>
          </p>
        </section>
      ) : (
        <section className="auth-section">
          <h1 className="centered">Login</h1>
          <form onSubmit={loginUser} className="auth-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              onChange={handleChange}
              required
            />

            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              onChange={handleChange}
              required
            />

            <button className="auth-form-button">Login Now</button>

            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "hidden"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <p>
              <Link to="/register" className="auth-link">
                I dont have an account yet
              </Link>
            </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
