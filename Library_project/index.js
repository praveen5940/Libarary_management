const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");

const add = express();
add.use(cors());
add.use(bodyparser.json());
add.use(express.json());
add.use(bodyparser.urlencoded({ require: true }));
add.use(express.static("public"));

let con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "praveen7200",
  database: "library",
});

con.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Connection Successful");
  }
});

add.post("/signup", (req, res) => {
  try {
    try {
      console.log(req.body);
      let userCount =
        "select count(*) as count from userinfo where email = ? and status = 'A' ";
      con.query(userCount, [req.body.email], (error, result) => {
        console.log(result[0].count);
        console.log(error);
        if (error) {
          res.send(error);
        } else {
          if (result[0].count > 0) {
            let msg = {
              message: "User is already existed!",
            };
            res.send(msg);
          } else {
            let insertData =
              "insert into userinfo(fname,lname,email,pword,status,effective_from,effective_to,created_on,created_by) values(?,?,?,?,'A',current_date(),'9999-12-31',current_timestamp(),0)";
            con.query(
              insertData,
              [
                req.body.username,
                 req.body.email,
                req.body.password,
              ],
              (err, resul) => {
                if (err) {
                  let msg = {
                    message: err,
                    code: 500,
                  };
                  res.send(msg);
                } else {
                  let msg = {
                    message: "User had been registered Successfully!",
                    code: 200,
                  };
                  res.send(msg);
                }
              }
            );
          }
        }
      });
      //   res.send("success");
    } catch (appError) {
      console.log(appError);
    }
  } catch (systemError) {
    console.log(systemError);
  }
});

add.post("/login", (req, res) => {
  try {
    try {
      
      let userCount =
        "select count(*) as count from userinfo where email = ? and status = 'A' and pword = ? ";
      con.query(
        userCount,
        [req.body.email, req.body.password],
        (error, result) => {
          if (error) {
            
            res.send(error);
          } else {
            
            if (result[0].count > 0) {
                
              let userInfo =
                "select user_id,fname,lname,email,status from userinfo where status = 'A' and  effective_to > current_date() and email = ? and pword = ?";
              con.query(
                userInfo,
                [req.body.email, req.body.password],
                (loginErr, loginRes) => {
                  if (loginErr) {
                    
                    res.send(loginErr);
                  } else {
                    
                    let msg = {
                        "code" : 200,
                        "message" : "Successfully logined",
                        "userId" : loginRes[0].user_id,
                        "firstName" : loginRes[0].fname,
                        "lastName" : loginRes[0].lname,
                        "email" : loginRes[0].email,
                        "status" : loginRes[0].status
                    }
                    res.send(msg);
                  }
                }
              );
            } else {
                
              let msg = {
                message: "Invalid User!",
              };
              res.send(msg);
            }
          }
        }
      );
    } catch (appError) {
        console.log(appError)
    }
  } catch (systemError) {
    console.log(systemError);
  }
});




add.post('/login',(req, res) =>{
    try {
       let query="select count(*)as count where email=?and password=?"
       con.query(query,[req.body.email, req.body.password],
       (error, result) => {
        if (error) {
          
          res.send(error);
        
    } catch(error) {
        console.log(error)
    }
}):


add.get('/getDashboardInfo/:', (req, res) => {
    try {
        console.log(req.params);
        res.send("get userInfo");
    } catch(error) {
        console.log(error)
    }
})

add.listen(3013, () => {
  console.log("Running on port 3013");
});