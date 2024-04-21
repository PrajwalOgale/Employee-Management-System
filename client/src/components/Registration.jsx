import React, { useEffect, useState } from "react";
import Header from "./Header";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Registration.css";

function Registration() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (event) => {
    setSelectedDepartment(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/");
      }
      const credentials = {
        firstName,
        lastName,
        email,
        password,
        repeatPassword,
        selectedDepartment,
        isAdmin,
      };
      console.log(credentials)
      const response = await axios.post(
        "http://localhost:3001/register",
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(err.response.data.message);
    }
  };


  useEffect(() => {
    try {
      async function getDept() {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/");
        }
        const depts = await axios.get("http://localhost:3001/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDepartment(depts.data);
      }
      getDept()
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <>
      <Header></Header>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label>
            <b>First Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            name="first_name"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required=""
          />
          <label>
            <b>Last Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            name="last_name"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required=""
          />
          <label>Choose a department:</label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleChange}
          >
            {department.map((dept, index) => (
              <option key={index} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <hr />

          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required=""
          />
          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required=""
          />
          <label>
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            id="psw-repeat"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required=""
          />
          <hr />
          <label>
            <b>Are you admin</b>
          </label>
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            value={isAdmin}
            onChange={(e) => {
              //   console.log(isAdmin);
              setIsAdmin(e.target.checked);
            }}
          />
          <hr />
          <p>{error}</p>
          <hr />
          <p>
            By creating an account you agree to our{" "}
            <a href="#">Terms &amp; Privacy</a>.
          </p>
          <button type="submit" className="registerbtn">
            Register
          </button>
        </div>
        <div className="container signin">
          <p>
            Already have an account? <a href="#">Sign in</a>.
          </p>
        </div>
      </form>
    </>
  );
}

export default Registration;
