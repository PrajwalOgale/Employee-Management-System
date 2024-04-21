import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateEmployee() {

  
  const [employee, setEmployee] = useState({
    id: "",
    first_name: "",
    last_name: "",
    password: "",
    dept_id: "",
  });


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


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/");
      }
      console.log("employee+++++++++");
      console.log(employee);
      const emp = {
        id: employee.id,
        email: employee.email,
        first_name: employee.first_name,
        last_name: employee.last_name,
        password: employee.password,
      };
      // console.log(employee)
      const response = await axios.put(
        "http://localhost:3001/update",
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data++++++++++");
      console.log(response);
      navigate("/employee");
    } catch (err) {
      navigate("/employee");
      console.log(err.message);
    }
  }


  console.log(employee);

  return (
    <>
      <Header></Header>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h2 className="text-center mb-4">Employee Details</h2>
          <div className="row justify-content-center">
            <div className="col-sm-4 m-5">
              <div className="text-secondary fs-5">Id:</div>
              <input
                className="p-4"
                style={{
                  background: "#A0153E",
                  fontSize: "20px",
                  color: "white",
                }}
                value={employee?.id}
                readOnly
              ></input>
            </div>
            <div className="col-sm-4 m-5">
              <div className="text-secondary fs-5">First Name:</div>
              <input
                className="p-4"
                style={{
                  background: "#A0153E",
                  fontSize: "20px",
                  color: "white",
                }}
                value={employee?.first_name}
                onChange={(e) => {
                  setEmployee({ ...employee, first_name: e.target.value });
                }}
              ></input>
            </div>
            <div className="col-sm-4 m-5">
              <div className="text-secondary fs-5">Last Name:</div>
              <input
                className="p-4"
                style={{
                  background: "#A0153E",
                  fontSize: "20px",
                  color: "white",
                }}
                value={employee?.last_name}
                onChange={(e) => {
                  setEmployee({ ...employee, last_name: e.target.value });
                }}
              ></input>
            </div>

            <div className="col-sm-4 m-5">
              <div className="text-secondary fs-5">Password:</div>
              <input
                className="p-4"
                style={{
                  background: "#A0153E",
                  fontSize: "20px",
                  color: "white",
                }}
                value={employee?.password}
                onChange={(e) => {
                  setEmployee({ ...employee, password: e.target.value });
                }}
              ></input>
            </div>
            <div className="col-sm-4 m-5">
              <div className="text-secondary fs-5">Department Id:</div>
              <input
                className="p-4"
                style={{
                  background: "#A0153E",
                  fontSize: "20px",
                  color: "white",
                }}
                value={employee?.dept_id}
                readOnly
              ></input>
            </div>
          </div>
        </div>
        <div>
          <button
            style={{
              padding: "10px 20px",
              background: "#008DDA  ",
              fontSize: "20px",
              color: "white",
            }}
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateEmployee;
