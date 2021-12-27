const cors = require('cors');
const express = require('express');
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
app.use(cors());





//app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use (
  session ({
      //“key” is the name of the cookie 
      key: "user",
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
          expires: 60 * 60 * 24,
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
  bcrypt.hash(password,saltRound, (err, hash) => {
  if (err) {
          console.log(err)
      }
      pool.query( 
          "INSERT INTO users (username, password) VALUES (?,?)",
          [username, hash], 
          (err, result)=> {
              console.log(err);
          }
      );
  })
});


//Indicate login status using session variables
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

//Set a value for saltRounds
// Higher values of “saltRound” take more time to the hashing algorithm. 
const saltRound = 10;

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
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result);
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