import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate()


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

  console.log(employee);

  return (
    <>
      <Header employee={employee}></Header>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Employee Details</h2>
        <div className="row">
          <div className="col-sm-4 m-5">
            <h5 className="text-secondary fs-5">Id:</h5>
            <p
              className="p-4"
              style={{ background: "#2D9596", fontSize: "20px" }}
            >
              {employee?.id}
            </p>
          </div>
          <div className="col-sm-4 m-5">
            <h5 className="text-secondary fs-5">First Name:</h5>
            <p
              className="p-4"
              style={{ background: "#2D9596", fontSize: "20px" }}
            >
              {employee?.first_name}
            </p>
          </div>
          <div className="col-sm-4 m-5">
            <h5 className="text-secondary fs-5">Last Name:</h5>
            <p
              className="p-4"
              style={{ background: "#2D9596", fontSize: "20px" }}
            >
              {employee?.last_name}
            </p>
          </div>
          <div className="col-sm-4 m-5">
            <h5 className="text-secondary fs-5">Join Date:</h5>
            <p
              className="p-4"
              style={{ background: "#2D9596", fontSize: "20px" }}
            >
              {employee?.join_date.split("T")[0]}
            </p>
          </div>
          <div className="col-sm-4 m-5">
            <h5 className="text-secondary fs-5">Password:</h5>
            <p
              className="p-4"
              style={{ background: "#2D9596", fontSize: "20px" }}
            >
              {employee?.password}
            </p>
          </div>
          <div className="col-sm-4 m-5">
            <h5 className="text-secondary fs-5">Department Id:</h5>
            <p
              className="p-4"
              style={{ background: "#2D9596", fontSize: "20px" }}
            >
              {employee?.dept_id}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetails;
