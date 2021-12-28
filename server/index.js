const cors = require('cors');
const express = require('express');
const basicAuth = require('express-basic-auth');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});


app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
})
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use (
  session ({
      //genid: function(req){
      //  return genuuid() // use UUIDs for session IDs
      //},
      //“key” is the name of the cookie 
      key: "authorizedUser",
      //“secret” is used to access data from the server-side
      //for real applications use a very strong secret key.
      secret: "sub",
      //resave enables the session to be stored back to the session store, 
      //even if the session was never modified during the request. 
      //It takes a Boolean value.
      resave: false,
      //“saveUninitialized” allows any uninitialized session to be sent to 
      //the store.
      saveUninitialized: false,
      // cookie sets the cookie expiry time. 
      //Let’s set it as a 24 hr (60 x 60 x 24 seconds)
      cookie: {
          expires: 60 * 60 * 24, secure: true, httpOnly: true, signed: true
      },
  })
);


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
  console.log("inthe GET")
  console.log(req.session.user);
  if (req.session.user) {
    console.log("inthe TRUE")
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    console.log("inthe FALSE")
    res.send({ loggedIn: false });
  }
});


app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

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
                    //console.log(req.session)
                    req.session.user = result;
                    
                    req.session.user.loggedIn = true;
                    console.log("Logged In Status: " + req.session.user.loggedIn);
                    //res.send(result);
                    res.send(req.session.user.loggedIn);
                    //res.send({ loggedIn: true, user: req.session.user });
                    
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



//End of Authentication



app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});