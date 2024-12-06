import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    userId: currentUser.id,
    anonymous_name: "",
    email: "",
    password: "",
  });

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
      console.log(response);
    } catch (error) {
      console.log(error.message);
      //show error
    }
    // mutation.mutate({ description });
  };
  return (
    <div>
      <h1>My Profile</h1>
      <form onSubmit={updateProfile}>
        <label htmlFor="">Anonymous Id</label>
        <input
          type="text"
          name="anonymous_name"
          placeholder="anonymous123"
          onChange={handleChange}
          required
        />

        <label htmlFor="">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={handleChange}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="example@example.com"
          onChange={handleChange}
          required
        />
        <button>Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;
