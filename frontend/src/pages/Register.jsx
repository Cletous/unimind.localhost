import { renderHook } from "@testing-library/react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const EMAIL_REGEX =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{4,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const errRef = useRef();

  const [inputs, setInputs] = useState({
    anonymous_name: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        {
          inputs,
        }
      );
      setSuccess(true);
      //then clear input field;
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Email/Username already taken");
      } else {
        setErrMsg("Registration failed!");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1 className="centered success-text">Success!</h1>
          <p className="centered">
            <Link to="/login" className="login-button">
              Login
            </Link>
          </p>
        </section>
      ) : (
        <section className="auth-section">
          <h1 className="centered">Register</h1>
          <form onSubmit={registerUser} className="auth-form">
            <label htmlFor="anonymous_name">Anonymous name</label>
            <input
              id="anonymous_name"
              type="text"
              placeholder="anonymous123"
              name="anonymous_name"
              onChange={handleChange}
              required
            />
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

            <button>Register Now</button>

            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "hidden"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <p>
              <Link to="/login" className="auth-link">
                Login instead
              </Link>
            </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
