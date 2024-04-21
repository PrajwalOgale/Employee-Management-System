import axios from "axios";

const baseUrl = "http://localhost:3001/";
class EmployeeService {
  
  
  //to get all rows from mysql table
  getEmployees() {
    const token = localStorage.getItem("token");
    if (!token) {
      return this.props.history.push("/");
    }

    return axios.get(baseUrl + "employees", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  
  
  getById(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return this.props.history.push("/");
    }
    return axios.get(baseUrl + "employees/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  
  
  //to add data in the table
  addEmployee(emp) {
    const token = localStorage.getItem("token");
    if (!token) {
      return this.props.history.push("/");
    }
    return axios.post(baseUrl + "employees", emp, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  
  
  //to update data in the table
  updateemployee(emp) {
    const token = localStorage.getItem("token");
    if (!token) {
      return this.props.history.push("/");
    }
    return (
      axios.put(baseUrl + "employees/" + emp.id, emp,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ));
  }
  
  
  //to delete data from the table
  deleteemployee(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      return this.props.history.push("/");
    }
    return axios.delete(baseUrl + "employees/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new EmployeeService();
