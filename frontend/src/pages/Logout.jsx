import { renderHook } from "@testing-library/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const LOGOUT_URL = "/auth/logout";

const Logout = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err.message);
      //   setErrMsg(err.message);
    }
  };

  // const logoutUser = async (e) => {
  //   e.preventDefault();

  //   const res = await axios.post("http://localhost:8800/api/auth/logout", {
  //     withCredentials: true,
  //   });

  //   setCurrentUser(res.data);

  //   // await axios
  //   //   .post("http://localhost:8800/api/auth/logout")
  //   //   .then((response) => console.log(response))
  //   //   .catch((err) => console.log(err.message));

  //   // navigate("/login");
  // };

  return (
    <section className="auth-section">
      <h1 className="">Are you sure you want to logout?</h1>

      <button onClick={logoutUser} className="button">
        Yes, Logout!
      </button>
    </section>
  );
};

export default Logout;
