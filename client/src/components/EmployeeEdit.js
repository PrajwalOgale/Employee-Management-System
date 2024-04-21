import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, json } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";
import Header from "./Header";

const EmployeeEdit = (props) => {
  let location = useLocation();

  let [formdetails, setformdetails] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    dept_id: "",
    salary: "",
  });


  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    console.log(params.eid);
    EmployeeService.getById(params.eid)
      .then((result) => {
        console.log(result.data);
        setformdetails(result.data);
      })
      .catch(() => {});
  }, []);

  let updateEmp = () => {
    console.log(formdetails);
    EmployeeService.updateemployee(formdetails)
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
          <label for="empid">Employee id</label>
          <input
            type="text"
            class="form-control"
            id="id"
            name="id"
            value={formdetails.id}
            readOnly
          />
        </div>
        <div class="form-group">
          <label for="ename">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            name="email"
            value={formdetails.email}
            onChange={(event) => {
              setformdetails({
                ...formdetails,
                email: event.target.value,
              });
            }}
            readOnly  
          />
        </div>
        <div class="form-group">
          <label for="ename">First Name</label>
          <input
            type="text"
            class="form-control"
            id="first_name"
            name="first_name"
            value={formdetails.first_name}
            onChange={(event) => {
              setformdetails({
                ...formdetails,
                first_name: event.target.value,
              });
            }}
          />
        </div>
        <div class="form-group">
          <label for="ename">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="last_name"
            name="last_name"
            value={formdetails.last_name}
            onChange={(event) => {
              setformdetails({ ...formdetails, last_name: event.target.value });
            }}
          />
        </div>
        <div class="form-group">
          <label for="ename">Department Id</label>
          <input
            type="text"
            class="form-control"
            id="dept_id"
            name="dept_id"
            value={formdetails.dept_id}
            onChange={(event) => {
              setformdetails({ ...formdetails, dept_id: event.target.value });
            }}
            readOnly
          />
        </div>

        <div class="form-group">
          <label for="ename">Salary</label>
          <input
            type="text"
            class="form-control"
            id="salary"
            name="salary"
            value={formdetails.salary}
            onChange={(event) => {
              setformdetails({ ...formdetails, salary: event.target.value });
            }}
          />
        </div>

        <button type="button" class="btn btn-primary" onClick={updateEmp}>
          Update employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
