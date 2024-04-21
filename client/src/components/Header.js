import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
const Header = (props) => {
  const [employee, setEmployee] = useState(props.employee);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/");
        }
        const response = await axios.get("http://localhost:3001/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setEmployee(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#00224D" }}>
      <Link
        to="./employee"
        className="navbar-brand"
        style={{ color: "#FFF3C7" }}
      >
        Employee Management System
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link
            to="/employee"
            className="nav-item nav-link"
            style={{ color: "#FFF3C7" }}
          >
            Profile
          </Link>
          <Link
            to="/update"
            className="nav-item nav-link"
            style={{ color: "#FFF3C7" }}
          >
            Update
          </Link>
          {employee?.is_admin === 1 && (
            <Link
              to="/registration"
              className="nav-item nav-link"
              style={{ color: "#FFF3C7" }}
            >
              Add New Employee
            </Link>
          )}
          {employee?.is_admin === 1 && (
            <Link
              to="/employees"
              className="nav-item nav-link"
              style={{ color: "#FFF3C7" }}
            >
              All Employees
            </Link>
          )}
          <Link
            to="/logout"
            className="nav-item nav-link"
            style={{ color: "#FFF3C7" }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
