import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    userId: currentUser.id,
    anonymous_name: currentUser.anonymous_name,
    email: currentUser.email,
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    console.log(inputs);

    try {
      //update the db
      const response = await axios.post(
        "http://localhost:8800/api/users/update-profile",
        {
          inputs,
        }
      );

      setSuccess(true);
      console.log(response);
    } catch (error) {
      console.log(error.message);
      if (error.response?.status === 409) {
        setErrMsg("Anonymous name or email already taken");
      } else {
        setErrMsg("Update Failed");
      }
      //show error
    }
    // mutation.mutate({ description });
  };
  return (
    <>
      {success ? (
        <section>
          <h1 className="centered">Success!</h1>
          <p className="centered">
            <Link to="/login" className="login-button">
              Login
            </Link>
          </p>
        </section>
      ) : (
        <div className="profile-tab">
          <h1>My Profile</h1>
          <form onSubmit={updateProfile}>
            <label htmlFor="">Anonymous Id</label>
            <input
              type="text"
              name="anonymous_name"
              placeholder={currentUser.anonymous_name}
              onChange={handleChange}
              className="input"
              required
            />

            <label htmlFor="">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder={currentUser.email}
              onChange={handleChange}
              className="input"
              required
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="input"
              required
            />
            <button className="update">Update Profile</button>
            <p className="errmsg">{errMsg}</p>
          </form>
        </div>
      )}
    </>
  );
};

export default MyProfile;
