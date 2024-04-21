import React, { useEffect, useState } from "react";
import EmployeeService from "../service/EmployeeService";
import Header from "./Header";
import { Link } from "react-router-dom";


function EmployeeList() {

  const [emparr, setEmparr] = useState([]);
  const [searcharr, setSearcharr] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [flag, setflag] = useState(false);

  useEffect(() => {
    console.log("in componentdidmout");
    EmployeeService.getEmployees()
      .then((result) => {
        console.log(result.data);
        setEmparr(result.data);
        setSearcharr(result.data);
      })
      .catch(() => {});
  }, [flag]);

  function deleteemployee(id) {
    EmployeeService.deleteemployee(id)
      .then((result) => {
        console.log(result);
        setflag(true);
      })
      .catch();
  }
  return (
    <div>
      <Header></Header>
      <br />
      <input
        type="text"
        name="search"
        id="search"
        value={setSearchtext}
        onChange={(event) => {
          setSearchtext(event.target.value);
        }}
      ></input>
      <br />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Email</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Join Date</th>
            <th scope="col">Department Id</th>
            <th scope="col">Salary</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {searcharr.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.email}</td>
              <td>{emp.first_name}</td>
              <td>{emp.last_name}</td>
              <td>{new Date(emp.join_date).toLocaleDateString()}</td>
              <td>{emp.dept_id}</td>
              <td>{emp.salary}</td>
              <td>
                <Link to={`/edit/${emp.id}`} state={{ emp: emp }}>
                  <button
                    type="button"
                    name="btn"
                    id="btn"
                    className="btn btn-info"
                  >
                    edit
                  </button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  name="btn"
                  id="btn"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteemployee(emp.id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
