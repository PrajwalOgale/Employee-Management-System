import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";
import Header from "./Header";
const EmployeeAdd = (props) => {

  let [formdetails, setformdetails] = useState({
    empid: "",
    ename: "",
    sal: "",
  });

  let navigate = useNavigate();
  let addEmp = () => {
    console.log("in employee add");

    EmployeeService.addEmployee(formdetails)
      .then(() => {
        navigate("/employees");
      })
      .catch(() => {});
  };

  
  return (
    <div>
      <Header></Header>

      <form>
        <div class="form-group">
          <label for="ename">First Name</label>
          <input
            type="text"
            class="form-control"
            id="ename"
            name="ename"
            value={formdetails.first_name}
            onChange={(event) => {
              setformdetails({ ...formdetails, first_name: event.target.value });
            }}
          />
        </div>
        <div class="form-group">
          <label for="ename">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="ename"
            name="ename"
            value={formdetails.last_name}
            onChange={(event) => {
              setformdetails({ ...formdetails, last_name: event.target.value });
            }}
          />
        </div>
        <div class="form-group">
          <label for="ename">Department</label>
          <input
            type="text"
            class="form-control"
            id="ename"
            name="ename"
            value={formdetails.first_name}
            onChange={(event) => {
              setformdetails({ ...formdetails, first_name: event.target.value });
            }}
          />
        </div>
        <div class="form-group">
          <label for="ename">Salary</label>
          <input
            type="text"
            class="form-control"
            id="sal"
            name="sal"
            value={formdetails.salary}
            onChange={(event) => {
              setformdetails({ ...formdetails, salary: event.target.value });
            }}
          />
        </div>

        <button type="button" class="btn btn-primary" onClick={addEmp}>
          Add new employee
        </button>
      </form>
    </div>
  );
};
export default EmployeeAdd;
