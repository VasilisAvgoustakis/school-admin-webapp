const mysql = require('mysql');


//connection pooll to db
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
 
 
let db = {};
 
 
 
db.getUser = (username) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM users WHERE username= ?', [id], (error, user)=>{
            if(error){
                return reject(error);
            }
            return resolve(user);
        });
    });
};
 
 
 
 
 
// db.getUserByEmail = (email) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT * FROM User WHERE email = ?', [email], (error, users)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(users[0]);
//         });
//     });
// };
 
 
 
// db.insertUser = (firstName, lastName, email, password) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result.insertId);
//         });
//     });
// };
 
 
 
 
 
 
 
 
module.exports = db;