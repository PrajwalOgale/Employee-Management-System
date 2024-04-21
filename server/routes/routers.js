//import libraries
const express = require("express");
const router = express.Router();
const connection = require("../db/dbconnect");

const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "Prajwal";



router.post("/login", (req, res) => {
  try {
    connection.query(
      "select * from employee where email=? and password=?",
      [req.body.email, req.body.password],
      (err, data) => {
        if (data.length === 0)
          return res.status(400).json({ message: "wrong credentials." });

        const email = data[0].email;
        const id = data[0].id;
        const token = jwt.sign({ email, id }, JWT_SECRET_KEY);
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});



router.post("/register", (req, res) => {
  connection.query(
    "select id from department where name=?",
    [req.body.selectedDepartment],
    (err, data) => {
      let dept_id = data[0].id;
      console.log(req.body)
      connection.query(
        "insert into employee values(default,?,?,?,?,?,?,?)",
        [
          req.body.email,
          req.body.firstName,
          req.body.lastName,
          new Date().toISOString().split("T")[0],
          req.body.password,
          dept_id,  
          req.body.isAdmin
        ],
        (err, data) => {
          if(err){
            console.log(err);
          }else{
            res.json({message:"registration successful."})
          }
        }
      );
    }
  );
});



router.get("/isAdmin", authenticate, (req, resp) => {
  connection.query("select * from department", (err, data, fields) => {
    if (!err) {
      resp.status(200).send(data);
    } else {
      resp.status(500).send({ message: "request failed." });
    }
  });
});



router.post("/add_department", authenticate, (req, res) => {
  connection.query(
    "insert into department value (default, ?)",
    [req.body.dept_name],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "failed to add department" });
      }
      res.status(200).json({ message: "department added successfully" });
    }
  );
});



router.get("/departments", authenticate, (req, resp) => {
  connection.query("select * from department", (err, data, fields) => {
    if (!err) {
      resp.status(200).send(data);
    } else {
      resp.status(500).send({ message: "request failed." });
    }
  });
});



router.get("/employees", authenticate, (req, resp) => {
  connection.query("select * from employee", (err, data, fields) => {
    if (!err) {

      
      console.log(data)
      console.log(req.user.id)
      resp.send(data.filter((e)=>e.id!=req.user.id));
    }
  });
});


router.get("/employee", authenticate, (req, resp) => {
  connection.query(
    "select * from employee where email=?",
    [req.user.email],
    (err, data, fields) => {
      if (!err) {
        resp.status(200).send(data[0]);
      } else {
        resp.status(500).json(err);
      }
    }
  );
});

router.get("/employees/:eid", authenticate, (req, resp) => {
  connection.query(
    "select * from employee where id=?",
    [req.params.eid],
    (err, data, fields) => {
      if (!err) {
        resp.send(data[0]);
      }
    }
  );
});


// update emplyee details by ID
router.put("/employees/:eid", authenticate, (req, resp) => {
  connection.query(
    "update employee set salary=? where id=?",
    [
      req.body.salary,
      req.params.eid
    ],
    (err, data) => {
      resp.send("{mesg:data updated successfully");
    }
  );
});


// update emplyee details
router.put("/update", authenticate, (req, resp) => {
  connection.query(
    "update employee set first_name=?, last_name=?, password=? where id=?",
    [req.body.first_name, req.body.last_name, req.body.password, req.user.id],
    (err, data) => {
      if (err) return resp.status(500).json({ mesg: "Internal server error." });
      resp.json({ mesg: "data updated successfully" });
    }
  );
});


router.delete("/employee", authenticate, (req, resp) => {
  connection.query(
    "delete from employee where email=?",
    [req.user.email],
    (err, data) => {
      resp.send("{mesg:data deleted successfully");
    }
  );
});


router.delete("/employees/:eid", authenticate, (req, resp) => {
  connection.query(
    "delete from employee where id=?",
    [req.params.eid],
    (err, data) => {
      resp.send("{mesg:data deleted successfully");
    }
  );
});


function authenticate(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing." });
  }
  jwt.verify(token, JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
