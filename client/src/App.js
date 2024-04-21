import './App.css';
import { Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeList from './components/EmployeeList';
import EmployeeAdd from './components/EmployeeAdd'
import EmployeeEdit from './components/EmployeeEdit';
import Login from './components/Login';
import EmployeeDetails from './components/EmployeeDetails';
import UpdateEmployee from './components/UpdateEmployee';
import Logout from './components/Logout';
import Registration from './components/Registration';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/employee" element={<EmployeeDetails/>} ></Route>
        <Route path="/update" element={<UpdateEmployee/>} ></Route>
        <Route path="/logout" element={<Logout/>} ></Route>
        <Route path="/employees" element={<EmployeeList/>} ></Route>
        <Route path="/empadd" element={<EmployeeAdd/>} ></Route>
        <Route path="/edit/:eid" element={<EmployeeEdit/>} ></Route>
        
      </Routes>
    </div>
  );
}

export default App;
