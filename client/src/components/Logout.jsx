import React, { useState } from "react";
import { Link } from "react-router-dom";

function Logout() {
    localStorage.removeItem("token")
  return (
    <>
      {/* {flag?} */}
      <h5>You are Logged out.</h5>
      <Link to="/">Go to Login page.</Link>
    </>
  );
}

export default Logout;
