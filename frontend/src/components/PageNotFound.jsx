import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const PageNotFound = () => {
  return (
    <div class="error">
      <Navbar />

      <div className="centered">
        <h1>404 Error</h1>
        <h2>Page Not Found</h2>
        <Link to="/" className="button">
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
