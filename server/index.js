const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const basicAuth = require('express-basic-auth');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
//dbobject from db.js containg all queries to db
const db = require('./db');
const PORT = process.env.REACT_APP_SERVER_PORT



//connection pooll to db
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
// create sessioStore middleware  allows
// work with SQL relational tables and schema-less JSON collections.
const sessionStore = new mysqlStore({
  connectionLimit: 10,
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST_IP,
  port: 3307,
  createDatabaseTable: false
},
pool)


const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

//app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
})
);



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  name: "test session",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: "secret",
  cookie: {
      maxAge: 60000,
      //sameSite: 'None',
      //secure: "development",
      httpOnly: true
  }
}))


app.get('/test', (req, res) => {
  const { table } = req.query;
  pool.query(`select rufname from ${table}`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});


//Authentication


//register
app.post('/register', (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;
  const verifCode = req.body.verifCode;
  if (username && password && verifCode){
    pool.query(
      "SELECT * FROM verification WHERE verifcode = ?;",
      [verifCode],
      (err,result) => {
          if (err) {
            //console.log("error")
            res.send({err: err});
          }
          if (result.length > 0) {
            //console.log(result)
            bcrypt.hash(password,saltRound, (err, hash) => {
              if (err) {
                      console.log(err)
                  }
                //insert newly registered user in users table
                  pool.query( 
                      "INSERT INTO users (username, password) VALUES (?,?);",
                      [username, hash], 
                      (err, result)=> {
                        if(err){
                          res.send({message: "User already exists!"})
                          console.log(err);
                        }else{
                          
                          //delete used verification code from verification table
                          pool.query( 
                            "DELETE FROM verification WHERE verifcode = ?;",
                            [verifCode], 
                            (err, result)=> {
                              console.log(err);
                            }
                          );
                          
                          res.send({message: "User Successfully registered!"})

                        }
                      }
                  );
                }
              )
          }else {
              res.send({message: "Falsches Code!"})
            }
        })
    }else{
      res.send({message: "Input is missing!"})
    }
});


//Set a value for saltRounds
// Higher values of “saltRound” take more time to the hashing algorithm. 
const saltRound = 10;

//Indicate login status using session variables
app.get("/login", (req, res) => {
  console.log(req.session.cookie)
});


app.post("/login", (req, res) => {
  //console.log(req.session.id)
  const username = req.body.username;
  const password = req.body.password;
  //console.log(req.session.id)
  pool.query(
    "SELECT * FROM users WHERE username = ?;",
    [username], 
    (err, result)=> {
        if (err) {
            res.send({err: err});
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                  req.session.user = result;
                  console.log(req.session.id)
                  console.log(req.session);
                  res.send(req.session.id);
          
                    
                } else{
                    res.send({message: "Wrong username/ password comination!"}); 
                }
            });
        } else {
            res.send({ message: "User doesn't exists"});
        }
    }
);
});

app.post('/logout', (req, res)=>{
  req.session.destroy(err => {
      if(err){
          console.log(err);
      }
      sessionStore.close()
      res.clearCookie("test session")
      res.send({message: "Loged out succesfully!"})
      //res.redirect('/login')
  })

})



//End of Authentication



app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});