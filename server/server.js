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



//connection pool to db
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
      
  })

})
//End of Authentication


//Personen
  //GETS
app.get('/personsList', (req, res) => {
  const { table } = req.query;
  pool.query(`SELECT * FROM personen ORDER BY rufname, nachname`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});


app.get('/personsData', (req, res) => {
  const { person_id } = req.query;
  pool.query(`SELECT distinct
  personen.*,
  FLOOR(DATEDIFF(CURDATE(), personen.einschulungsdatum) / 365) + 1 + COALESCE((SELECT 
                  SUM(jahrgangswechsel.wert)
              FROM
                  jahrgangswechsel
              WHERE
                  jahrgangswechsel.person_id = personen.person_id),
          0) AS Jahrgangsstufe,
  COALESCE((SELECT 
                  lerngruppen.bezeichnung
              FROM
                  lerngruppen
                      LEFT OUTER JOIN
                  kind_lerngruppe ON kind_lerngruppe.lerngruppe_id = lerngruppen.lerngruppe_id
                      AND kind_lerngruppe.eintrittsdatum = (SELECT 
                          MAX(kind_lerngruppe.eintrittsdatum)
                      FROM
                          kind_lerngruppe
                              LEFT OUTER JOIN
                          personen ON personen.person_id = kind_lerngruppe.person_id)
              WHERE
                  personen.person_id = kind_lerngruppe.person_id),
          0) AS Lerngruppe,
  COALESCE((SELECT 
            kind_lerngruppe.eintrittsdatum
        FROM
            lerngruppen
                LEFT OUTER JOIN
            kind_lerngruppe ON kind_lerngruppe.lerngruppe_id = lerngruppen.lerngruppe_id
                AND kind_lerngruppe.eintrittsdatum = (SELECT 
                    MAX(kind_lerngruppe.eintrittsdatum)
                FROM
                    kind_lerngruppe
                        LEFT OUTER JOIN
                    personen ON personen.person_id = kind_lerngruppe.person_id)
        WHERE
            personen.person_id = kind_lerngruppe.person_id),
    0) AS Lerngruppe_eintrittsdatum,
COALESCE((SELECT 
  MAX(kind_but.but_ende)
FROM
  kind_but
WHERE
  personen.person_id = kind_but.person_id),
0) AS but_ende,
  kind_daten.*,
  kind_schule.*,
  kind_betreuung.*,
  taetigkeit
FROM
  personen
      LEFT OUTER JOIN
  kind_daten ON personen.person_id = kind_daten.person_id
      LEFT OUTER JOIN
  kind_schule ON personen.person_id = kind_schule.person_id
              AND zugangsdatum_zur_fsx = (SELECT 
                MAX(zugangsdatum_zur_fsx)
            FROM
                kind_schule
            WHERE
                personen.person_id = kind_schule.person_id)
      LEFT OUTER JOIN
  kind_betreuung ON personen.person_id = kind_betreuung.person_id
      AND betreuung_ende = (SELECT 
          MAX(betreuung_ende)
      FROM
          kind_betreuung
      WHERE
          personen.person_id = kind_betreuung.person_id)
      LEFT OUTER JOIN
  vereinsmitgliedschaft ON personen.person_id = vereinsmitgliedschaft.person_id
    LEFT OUTER JOIN
  taetigkeit ON personen.person_id = taetigkeit.person_id
  
WHERE 
personen.person_id = ${ person_id }`, 
    (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results[0]);
      //return res.json(results[0]);
    }
  });
});


app.get('/contactData', (req, res) => {
  const { person_id } = req.query;
  pool.query(`SELECT
  *
FROM
  kontakt_daten
WHERE
  person_id =${ person_id } ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});


app.get('/addresses', (req, res) => {
  const { person_id } = req.query;
  pool.query(`SELECT 
  personen.person_id,
  person_haushalt.meldeanschrift,
  person_haushalt.datum_einzug,
  haushalte.*
FROM
  personen
      INNER JOIN
  person_haushalt ON personen.person_id = person_haushalt.person_id
      INNER JOIN
  haushalte ON person_haushalt.haushalt_id = haushalte.haushalt_id
  where personen.person_id = ${ person_id } 
  ORDER BY 
  person_haushalt.meldeanschrift DESC,
  haushalte.strasse ASC;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});


app.get('/arb_grp', (req, res) => {
  const { person_id } = req.query;
  pool.query(`SELECT 
  personen.person_id,
  person_arbeitsgruppe.koordination_der_ag,
  person_arbeitsgruppe.datum_mitgliedschaftsbeginn,
  person_arbeitsgruppe.datum_mitgliedschaftsende,
  arbeitsgruppen.bezeichnung,
  arbeitsgruppen.email
FROM
  personen
      INNER JOIN
  person_arbeitsgruppe ON personen.person_id = person_arbeitsgruppe.person_id
      INNER JOIN
  arbeitsgruppen ON person_arbeitsgruppe.arbeitsgruppe_id = arbeitsgruppen.arbeitsgruppe_id
WHERE
  personen.person_id =${ person_id } 
  ORDER BY 
  person_arbeitsgruppe.koordination_der_ag DESC,
  arbeitsgruppen.bezeichnung ASC;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});

app.get('/bezugspersonen', (req, res) => {
  const { person_id } = req.query;
  pool.query(`SELECT
  personen.person_id,
  personen.rufname,
  personen.nachname,
  bezugsperson_kind.beziehung_zu_person2,
  bezugsperson_kind.recht_gegenueber_person_2
FROM
  bezugsperson_kind
      INNER JOIN
  personen ON personen.person_id = bezugsperson_kind.person_id_1
WHERE
  bezugsperson_kind.person_id_2 =${ person_id } 
  ORDER BY 
  personen.rufname ASC;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});
  //END OF GETS

 


  app.get('/editPerson', async (req, res) => {
    //array containg all variables passed in with the request
    let [person_id, rufname, amtlicher_vorname, nachname, geburtsdatum, einschulungsdatum, nicht_auf_listen,
        email_1, email_2, email_fsx, mobil_telefon_1, mobil_telefon_2, mobil_telefon_fsx, telefon_1, telefon_2, telefon_fsx,
        staatsangehoerigkeit, geburtsort, geschlecht, nichtdeutsche_herkunftssprache,
        zugangsdatum_zur_fsx, abgangsdatum_von_fsx, abgangsgrund, mittag,
        betreuung_beginn, betreuung_ende, betreuung_umfang, betreuung_ferien,
        bezugspersonen, probableBezugspersonen, bezugsPersonToBeAdded, bezugsPersonToBeDeleted, beziehung_zu_person2, recht_gegenueber_person2,
        haushalte, probableHaushalte, haushalteToBeAdded, haushaltToBeDeleted, meldeanschrift, datum_einzug,
        lerngruppen, probableLerngruppen, lerngruppeToBeAdded, eintrittsdatum, lerngruppeToBeDeleted,
        jahrgangswechselRecords, datum, wert, grund, jahrgangToBeDeleted,
        but_beginn, but_ende, berlinpass_but, butToBeDeleted, butRecords,
        ags, probableAgs, agToBeAdded, koordination_der_ag, datum_mitgliedschaftsbeginn, datum_mitgliedschaftsende, agToBeDeleted,

        ] = req.query.state

    // this variable will be true if the error case in one of the queries has already send headers
    let freeOfErrors = true;
   
    //array to put all results and return them at the end of the querry
    let sumResults = [];
    
    // see that no empty '' values are send in with the data, instead values that should remain empty or null are handled by the query 
    // here in the server and their value is turned into null
    //console.log(req.query.state)
    //make array only with the relevant data of coming query
    let coreData = [person_id, rufname, amtlicher_vorname, nachname, geburtsdatum, einschulungsdatum];
    //console.log(coreData)

    // check that at least on of the values is relevant for saving (not null or '')
    let validCoreData = 0;
    coreData.forEach(element=> {
      if(element === '' || element === null || element === 'null'){
        return;
        
      }else{
        validCoreData++;
      }
      })

    //execute query    
    if(validCoreData > 0){    
      pool.query(`INSERT INTO personen(person_id, rufname, amtlicher_vorname, nachname, 
        geburtsdatum, einschulungsdatum, nicht_auf_listen) 
        VALUES (${person_id}, '${rufname}', '${amtlicher_vorname}', '${nachname}', 
        ${geburtsdatum ? ("'" + geburtsdatum.toString() + "'"):(null)},
        ${einschulungsdatum ? ("'" + einschulungsdatum.toString() + "'"):(null)},
        ${nicht_auf_listen}) 
        ON DUPLICATE KEY UPDATE 
        rufname='${rufname}',
        amtlicher_vorname = '${amtlicher_vorname}',
        nachname = '${nachname}',
        geburtsdatum = ${geburtsdatum ? ("'" + geburtsdatum.toString() + "'"):(null)},
        einschulungsdatum = ${einschulungsdatum ? ("'" + einschulungsdatum.toString() + "'"):(null)},
        nicht_auf_listen = '${nicht_auf_listen}';`
        ,(err, results) =>{

          if(err){ //Query Error 
            freeOfErrors = false;
            return res.send(err);
          }else {
            sumResults.push(results);
          }})
      }
    
    //make array only with the relevant data of coming query
    let contactData = [email_1, email_2, email_fsx, mobil_telefon_1, mobil_telefon_2, mobil_telefon_fsx, telefon_1, telefon_2, telefon_fsx];
    //console.log(contactData)

    // check that at least on of the values is relevant for saving (not null or '')
    validCoreData = 0;
    contactData.forEach(element=> {
      if(element === '' || element === null || element === 'null'){
        return;
         
      }else{
        validCoreData++;
      }
      })
    
    //execute query 
    if(validCoreData > 0){
      pool.query(
      `INSERT INTO kontakt_daten(person_id, email_1, email_2, email_fsx, mobil_telefon_1, mobil_telefon_2,
                        mobil_telefon_fsx, telefon_1, telefon_2, telefon_fsx)
        VALUES(${person_id}, '${email_1}', '${email_2}', '${email_fsx}', '${mobil_telefon_1}', 
        '${mobil_telefon_2}', '${mobil_telefon_fsx}', '${telefon_1}', '${telefon_2}', '${telefon_fsx}')
        ON DUPLICATE KEY UPDATE
        email_1 = '${email_1}',
        email_2 = '${email_2}',
        email_fsx = '${email_fsx}',
        mobil_telefon_1 = '${mobil_telefon_1}',
        mobil_telefon_2 = '${mobil_telefon_2}',
        mobil_telefon_fsx = '${mobil_telefon_fsx}',
        telefon_1 = '${telefon_1}',
        telefon_2 = '${telefon_2}',
        telefon_fsx = '${telefon_fsx}';`

        ,(err, results) =>{
          if(err){ //Query Error (Rollback and release connection)
            freeOfErrors = false;
            return res.send(err);
          }else{
            sumResults.push(results);
          }})
      }
    //make array only with the relevant data of coming query
    let kind_schule_data = [zugangsdatum_zur_fsx, abgangsdatum_von_fsx, abgangsgrund, mittag]
    
    // check that at least on of the values is relevant for saving (not null or '')
    validCoreData = 0;
    //console.log('validCoreData before iteration: '+ validCoreData);
    kind_schule_data.forEach(element=> {
      if(element === '' || element === null || element === 'null'){
        return;
      }else{
        validCoreData++; 
        //console.log(validCoreData);
      }
    })
    
    
    //console.log(kind_schule_data, 'validCoreData after iteration: '+ validCoreData)
    
    if(validCoreData > 0){
      pool.query(
        `INSERT INTO kind_schule(person_id, zugangsdatum_zur_fsx, abgangsdatum_von_fsx, abgangsgrund, mittag)
          VALUES(${person_id}, ${zugangsdatum_zur_fsx ? ("'" + zugangsdatum_zur_fsx.toString() + "'"):(null)}, ${abgangsdatum_von_fsx ? ("'" + abgangsdatum_von_fsx.toString() + "'"):(null)},
                  ${abgangsgrund !== '' ? ("'"+abgangsgrund+"'"):(null)}, ${mittag !== '' ? ("'"+mittag+"'"):(null)})
          ON DUPLICATE KEY UPDATE
          zugangsdatum_zur_fsx = ${zugangsdatum_zur_fsx ? ("'" + zugangsdatum_zur_fsx.toString() + "'"):(null)},
          abgangsdatum_von_fsx = ${abgangsdatum_von_fsx ? ("'" + abgangsdatum_von_fsx.toString() + "'"):(null)},
          abgangsgrund = ${abgangsgrund !== '' ? ("'"+abgangsgrund+"'"):(null)},
          mittag = ${mittag !== '' ? ("'"+mittag+"'"):(null)};`

          ,(err, results) =>{
            if(err){ //Query Error (Rollback and release connection)
              freeOfErrors = false;
              return res.send(err);
            }else{
              sumResults.push(results);
            }})
    }

     //make array only with the relevant data of coming query
     let kind_data = [staatsangehoerigkeit, geburtsort, geschlecht, nichtdeutsche_herkunftssprache]
    
     // check that at least on of the values is relevant for saving (not null or '')
     validCoreData = 0;
     kind_data.forEach(element=> {
       if(element === '' || element === null || element === 'null'){
          return;
      }else{
        validCoreData++;
      }
      });
  

    if(validCoreData > 0){
      pool.query(
        `INSERT INTO kind_daten(person_id, staatsangehoerigkeit, geburtsort, geschlecht, nichtdeutsche_herkunftssprache)
          VALUES(${person_id}, '${staatsangehoerigkeit}', '${geburtsort}', '${geschlecht}', '${nichtdeutsche_herkunftssprache}')
          ON DUPLICATE KEY UPDATE
          staatsangehoerigkeit = '${staatsangehoerigkeit}',
          geburtsort = '${geburtsort}',
          geschlecht = '${geschlecht}',
          nichtdeutsche_herkunftssprache = '${nichtdeutsche_herkunftssprache}';`

          ,(err, results) =>{
            if(err){ //Query Error (Rollback and release connection)
              freeOfErrors = false;
              return res.send(err);
            }else{
              sumResults.push(results);
            }})
    }

    //make array only with the relevant data of coming query
    let kind_betreuung = [betreuung_beginn, betreuung_ende, betreuung_umfang, betreuung_ferien]
    
    // check that at least on of the values is relevant for saving (not null or '')
    validCoreData = 0;
    kind_betreuung.forEach(element=> {
      if(element === '' || element === null || element === 'null'){
        return;
      }else{
        validCoreData++;
      }
      })
 
    if(validCoreData > 0){
      pool.query(
      `INSERT INTO kind_betreuung(person_id, betreuung_beginn, betreuung_ende, betreuung_umfang, betreuung_ferien)
        VALUES(${person_id}, ${betreuung_beginn ? ("'" + betreuung_beginn.toString() + "'"):(null)}, 
              ${betreuung_ende ? ("'" + betreuung_ende.toString() + "'"):(null)}, 
              '${betreuung_umfang}', '${betreuung_ferien}')
        ON DUPLICATE KEY UPDATE
        betreuung_beginn = ${betreuung_beginn ? ("'" + betreuung_beginn.toString() + "'"):(null)},
        betreuung_ende = ${betreuung_ende ? ("'" + betreuung_ende.toString() + "'"):(null)},
        betreuung_umfang = '${betreuung_umfang}',
        betreuung_ferien = '${betreuung_ferien}';`

        ,(err, results) =>{
          if(err){ //Query Error (Rollback and release connection)
            console.log("Sending err!!!!")
            freeOfErrors = false;
            return res.send(err);
          }else {
            sumResults.push(results)
          }})
    }

    //adds selected person as Bezugsperson for this Pupil
    if(bezugsPersonToBeAdded){
      //console.log("BZPADD: "+bezugsPersonToBeAdded)
      pool.query(
        `INSERT IGNORE INTO bezugsperson_kind (person_id_1, person_id_2, beziehung_zu_person2, recht_gegenueber_person_2) 
          VALUES(${bezugsPersonToBeAdded}, 
                  ${person_id}, 
                  ${beziehung_zu_person2 ? ("'"+beziehung_zu_person2+"'"):(null)}, 
                  ${recht_gegenueber_person2 ? ("'"+recht_gegenueber_person2+"'"):(null)})
          ;`
          ,(err,results) => {
            if(err){ //Query Error (Rollback and release connection)
              console.log(err)
              freeOfErrors = false;
              return res.send(err);
            }else {
              sumResults.push(results)
            }
          }
      )
    }

    //removes selected person as Bezugsperson for this Pupil
    if(bezugsPersonToBeDeleted){
      //console.log("BZPADD: "+bezugsPersonToBeDeleted)
      pool.query(
        `DELETE FROM bezugsperson_kind 
            WHERE person_id_1=${bezugsPersonToBeDeleted}
            AND person_id_2=${person_id}
          ;`
          ,(err,results) => {
            if(err){ //Query Error (Rollback and release connection)
              console.log(err)
              freeOfErrors = false;
              return res.send(err);
            }else {
              sumResults.push(results)
            }
          }
      )
    }


    //adds selected Haushalt as address for this person
    if(haushalteToBeAdded){
      //console.log("BZPADD: "+haushalteToBeAdded)
      pool.query(
        `INSERT IGNORE INTO person_haushalt (haushalt_id, person_id, meldeanschrift, datum_einzug) 
          VALUES(${haushalteToBeAdded}, 
                  ${person_id}, 
                  ${meldeanschrift}, 
                  ${datum_einzug ? ("'"+datum_einzug.toString()+"'"):(null)})
          ;`
          ,(err,results) => {
            if(err){ //Query Error (Rollback and release connection)
              console.log(err)
              freeOfErrors = false;
              return res.send(err);
            }else {
              sumResults.push(results)
            }
          }
      )
    }

    //removes selected Haushalt for this person
    if(haushaltToBeDeleted){
      console.log("BZPADD: "+haushaltToBeDeleted)
      pool.query(
        `DELETE FROM person_haushalt 
            WHERE haushalt_id=${haushaltToBeDeleted}
            AND person_id=${person_id}
          ;`
          ,(err,results) => {
            if(err){ //Query Error (Rollback and release connection)
              console.log(err)
              freeOfErrors = false;
              return res.send(err);
            }else {
              sumResults.push(results)
            }
          }
      )
    }

    //adds a new lerngruppe record for this person
    if(lerngruppeToBeAdded){
      console.log("BZPADD: "+lerngruppeToBeAdded)
      pool.query(
        `INSERT IGNORE INTO kind_lerngruppe (person_id, lerngruppe_id, eintrittsdatum) 
          VALUES(${person_id}, 
                  ${lerngruppeToBeAdded},  
                  ${eintrittsdatum ? ("'"+eintrittsdatum.toString()+"'"):(null)})
          ;`
          ,(err,results) => {
            if(err){
              console.log(err)
              freeOfErrors = false;
              return res.send(err);
            }else {
              sumResults.push(results)
            }
          }
      )
    }


    //removes selected Lerngruppe Record for this Kid
    if(lerngruppeToBeDeleted){
      console.log("BZPADD: "+lerngruppeToBeDeleted)
      pool.query(
        `DELETE FROM kind_lerngruppe 
            WHERE lerngruppe_id=${lerngruppeToBeDeleted}
            AND person_id=${person_id}
          ;`
          ,(err,results) => {
            if(err){
              console.log(err)
              freeOfErrors = false;
              return res.send(err);
            }else {
              sumResults.push(results)
            }
          }
      )
    }

    //make array only with the relevant data of coming query
    let jahrgangswechsel = [datum, wert, grund]
    
    // check that at least on of the values is relevant for saving (not null or '')
    validCoreData = 0;
    jahrgangswechsel.forEach(element=> {
      if(element === '' || element === null || element === 'null'){
        return;
      }else{
        validCoreData++;
      }
      })
 
    // adds jahrgangswechsel record
    if(validCoreData == 3){
      pool.query(
      `INSERT IGNORE INTO jahrgangswechsel(person_id, datum, wert, grund)
        VALUES(${person_id}, ${datum ? ("'" + datum.toString() + "'"):(null)}, 
              ${wert}, 
              '${grund}');`

        ,(err, results) =>{
          if(err){
            console.log("Sending err!!!!")
            freeOfErrors = false;
            return res.send(err);
          }else {
            sumResults.push(results)
          }})
    }

    //removes selected Jahrgangswechsel Record for this Kid
    if(jahrgangToBeDeleted){
      console.log("BZPADD: "+jahrgangToBeDeleted)
      pool.query(
        `DELETE FROM jahrgangswechsel 
            WHERE person_id=${person_id}
            AND datum=${jahrgangToBeDeleted ? ("'" + jahrgangToBeDeleted.toString() + "'"):(null)}
          ;`
          ,(err,results) => {
            if(err){
              console.log(err)
              freeOfErrors = false;
              return res.send(err);
            }else {
              sumResults.push(results)
            }
          }
      )
    }

    //make array only with the relevant data of coming query
    let but = [but_beginn, but_ende, berlinpass_but]
  
    // check that at least on of the values is relevant for saving (not null or '')
    validCoreData = 0;
    but.forEach(element=> {
      if(element === '' || element === null || element === 'null'){
        return;
      }else{
        validCoreData++;
      }
      })

    // adds but record
    if(validCoreData == 3){
      
      pool.query(
      `INSERT IGNORE INTO kind_but(person_id, but_beginn, but_ende, berlinpass_but)
        VALUES(${person_id}, ${but_beginn ? ("'" + but_beginn.toString() + "'"):(null)},
              ${but_ende ? ("'" + but_ende.toString() + "'"):(null)},
              ${berlinpass_but}
              );`

        ,(err, results) =>{
          if(err){
            console.log(err)
            freeOfErrors = false;
            return res.send(err);
          }else {
            sumResults.push(results)
          }})
    }

    // deletes but record
    if(butToBeDeleted){
      console.log(butToBeDeleted)
    pool.query(
    `DELETE FROM kind_but
      WHERE 
      person_id = ${person_id}
      AND
      but_beginn = ${butToBeDeleted ? ("'" + butToBeDeleted.toString() + "'"):(null)} 
    ;`

      ,(err, results) =>{
        if(err){
          console.log(err)
          freeOfErrors = false;
          return res.send(err);
        }else {
          sumResults.push(results)
        }})
  }


  //make array only with the relevant data of coming query
  let agData = [agToBeAdded, koordination_der_ag, datum_mitgliedschaftsbeginn, datum_mitgliedschaftsende]
  
  // check that at least on of the values is relevant for saving (not null or '')
  validCoreData = 0;
  agData.forEach(element=> {
    if(element === '' || element === null || element === 'null'){
      return;
    }else{
      validCoreData++;
    }
    })

  // adds AG record
  if(validCoreData > 0 && agToBeAdded){
    
    pool.query(
    `INSERT IGNORE INTO person_arbeitsgruppe(person_id, arbeitsgruppe_id, koordination_der_ag, datum_mitgliedschaftsbeginn, datum_mitgliedschaftsende)
      VALUES(${person_id}, ${agToBeAdded},
            ${koordination_der_ag ? (koordination_der_ag):(null)},
            ${datum_mitgliedschaftsbeginn ? ("'" + datum_mitgliedschaftsbeginn.toString() + "'"):(null)},
            ${datum_mitgliedschaftsende ? ("'" + datum_mitgliedschaftsende.toString() + "'"):(null)}
            );`

      ,(err, results) =>{
        if(err){
          console.log(err)
          freeOfErrors = false;
          return res.send(err);
        }else {
          sumResults.push(results)
        }})
  }

  // deletes AG record
  if(agToBeDeleted){
    
  pool.query(
  `DELETE FROM person_arbeitsgruppe
    WHERE 
    person_id = ${person_id}
    AND
    arbeitsgruppe_id = ${agToBeDeleted} 
  ;`

    ,(err, results) =>{
      if(err){
        console.log(err)
        freeOfErrors = false;
        return res.send(err);
      }else {
        sumResults.push(results)
      }})
}


    // this query's role is just as workaround soolution to send a valid response 
    //that makes client refresh the page
    pool.query("SELECT * from personen;",(err, results) =>{
      if(err){ //Query Error (Rollback and release connection)
        console.log("Sending err!!!!")
        return res.send(err);
      }else {

        // only send results headers to client if none of the queries above has returned an error
        // which would mean that freeOfErrors == false
        while(freeOfErrors){
          //sumResults.push(results)
          //console.log("sending...")
          //console.log(results)
          return res.send("Results");
        }
      }})   
      }); 

  // END of EDIT Query
  // ------------------------------------------------------------------------------------  


  app.get('/deletePersonData', (req, res) => {
    let table = req.query.table;
    let person_id = req.query.person_id;
    pool.query(`DELETE FROM ${table} WHERE ${table === "bezugsperson_kind" ? ("person_id_2 = " + person_id):("person_id = " + person_id)};`,
    (err, result)=>{
      if(err){
        console.log(err);
        return res.send(err);
      }else{
        console.log(result)
        return res.send("Results");
      }
    })

  });

  app.get('/deleteKindData', (req, res) => {
    let table = req.query.table;
    let id = req.query.id;
    let columnNames = req.query.columnNames;
    let numIdColumns = id.length;

    //console.log(table, id, numIdColumns, columnNames)
    
    if(numIdColumns === 2){
      pool.query(`DELETE FROM ${table} 
                    WHERE 
                      person_id = ${id[0]}
                      AND
                      ${columnNames[0]} = '${id[1].toString()}'
                      ;`,
    (err, result)=>{
      if(err){
        console.log(err);
        return res.send(err);
      }else{
        console.log(result)
        return res.send(result);
      }
    })
    }

    if(numIdColumns === 3){
      pool.query(`DELETE FROM ${table} 
                    WHERE 
                      person_id = ${id[0]}
                      AND
                      ${columnNames[0]} = '${id[1].toString()}'
                      AND
                      ${columnNames[1]} = '${id[2].toString()}'
                      ;`,
    (err, result)=>{
      if(err){
        console.log(err);
        return res.send(err);
      }else{
        console.log(result)
        return res.send(result);
      }
    })
    }
  });

  //END OF POSTS
//end of Personen queries

//return all records for a person from the given table
app.get('/personsRecords', (req, res) => {

  const { table, person_id, sortByColumn } = req.query;
  
  pool.query(
  `SELECT
      *
  FROM
      ${table}
  WHERE person_id = ${person_id}
  ORDER BY 
      ${sortByColumn} DESC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});


//haushalte
app.get('/hausList', (req, res) => {
  // const { person_id } = req.query;
  //const { table } = req.query;
  pool.query(
  `SELECT
      *
  FROM
      haushalte
  ORDER BY 
      strasse ASC,
      postleitzahl ASC,
      ortsteil_berlin ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});


app.get('/anwohner', (req, res) => {
  const { haushalt_id } = req.query;
  pool.query(
  `SELECT
    personen.person_id,
    personen.rufname,
    personen.nachname
  FROM
    personen
  INNER JOIN
    person_haushalt on personen.person_id = person_haushalt.person_id
  INNER JOIN
    haushalte on person_haushalt.haushalt_id = haushalte.haushalt_id
  where haushalte.haushalt_id = ${haushalt_id}
  ORDER BY
    personen.rufname ASC,
    personen.nachname ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});

//end of haushalte

//Arbeitsgruppen
app.get('/agList', (req, res) => {
  // const { person_id } = req.query;
  //const { table } = req.query;
  pool.query(
  `SELECT
      *
  FROM
      arbeitsgruppen
  ORDER BY 
      bezeichnung ASC,
      email ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});


app.get('/ag_mitglieder', (req, res) => {
  const { arbeitsgruppe_id } = req.query;
  pool.query(
  `SELECT
    personen.person_id,
    personen.rufname,
    personen.nachname
  FROM
    personen
  INNER JOIN
    person_arbeitsgruppe on personen.person_id = person_arbeitsgruppe.person_id
  INNER JOIN
    arbeitsgruppen on person_arbeitsgruppe.arbeitsgruppe_id = arbeitsgruppen.arbeitsgruppe_id
  where arbeitsgruppen.arbeitsgruppe_id = ${arbeitsgruppe_id}
  ORDER BY
    personen.rufname ASC,
    personen.nachname ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});

//end of arbeitsgruppen


//Lerngruppen
app.get('/lerngruppenList', (req, res) => {
  // const { person_id } = req.query;
  // const { table } = req.query;
  pool.query(
  `SELECT
      *
  FROM
      lerngruppen
  ORDER BY 
      lerngruppe_id ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // //console.log(results)
      return res.send(results);
    }
  });
});


app.get('/dataMultitablePerson', (req, res) => {
  const { table1, table2, person_id, sortByColumn } = req.query;
  
  pool.query(
  `SELECT
      *
  FROM
      ${table1}
      INNER JOIN
      ${table2} ON ${table2}.${table2.substring(0, table2.length-1)}_id = ${table1}.${table2.substring(0, table2.length-1)}_id
  WHERE
    ${table1}.person_id = ${person_id}
  ORDER BY 
      ${sortByColumn} ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // //console.log(results)
      return res.send(results);
    }
  });
});



app.get('/lerngruppe_mitglieder', (req, res) => {
  const { lerngruppe_id } = req.query;
  pool.query(
  `SELECT
    personen.person_id,
    personen.rufname,
    personen.nachname,
    kind_lerngruppe.eintrittsdatum
  FROM
    personen
  INNER JOIN
    kind_lerngruppe on personen.person_id = kind_lerngruppe.person_id
  INNER JOIN
    lerngruppen on kind_lerngruppe.lerngruppe_id = lerngruppen.lerngruppe_id
  where lerngruppen.lerngruppe_id = ${lerngruppe_id}
  ORDER BY
    personen.rufname ASC,
    personen.nachname ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // //console.log(results)
      return res.send(results);
    }
  });
});

//end of Lerngruppen

//Tätigkeiten
app.get('/jobsList', (req, res) => {
  // const { person_id } = req.query;
  const { table } = req.query;
  pool.query(
  `SELECT distinct
      taetigkeit
  FROM
      ${table}
  ORDER BY 
      taetigkeit ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // //console.log(results)
      return res.send(results);
    }
  });
});


app.get('/job_roles', (req, res) => {
  const { taetigkeit } = req.query;
  pool.query(
  `SELECT
    personen.person_id,
    personen.rufname,
    personen.nachname,
    taetigkeit.taetigkeit_beginn,
    taetigkeit_ende,
    taetigkeit.typ
  FROM
    personen
  INNER JOIN
    taetigkeit on personen.person_id = taetigkeit.person_id
  where taetigkeit.taetigkeit = "${taetigkeit}"
  ORDER BY
    personen.rufname ASC,
    personen.nachname ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // //console.log(results)
      return res.send(results);
    }
  });
});

//end of Tätigkeiten

//simple List
app.get('/simpleList', (req, res) => {
  const { group, date } = req.query;
  
  console.log(group + date)
  pool.query(
  `SELECT DISTINCT
  *
  FROM (SELECT 
    personen.rufname AS Rufname,
        @jahrgang:=FLOOR(DATEDIFF('${date}', personen.einschulungsdatum) / 365) + 1 + COALESCE((SELECT 
                SUM(jahrgangswechsel.wert)
            FROM
                jahrgangswechsel
            WHERE
                jahrgangswechsel.person_id = personen.person_id
                    AND jahrgangswechsel.datum <= '${date}'), 0) AS Jahrgangsstufe,
        lerngruppen.bezeichnung AS Lerngruppe,
        kind_lerngruppe.eintrittsdatum,
        kind_daten.*
FROM
    personen
INNER JOIN kind_schule ON personen.person_id = kind_schule.person_id
INNER JOIN kind_lerngruppe ON personen.person_id = kind_lerngruppe.person_id
INNER JOIN lerngruppen ON kind_lerngruppe.lerngruppe_id = lerngruppen.lerngruppe_id
INNER JOIN kind_daten ON personen.person_id = kind_daten.person_id
WHERE
    kind_schule.zugangsdatum_zur_fsx <= '${date}'
        AND kind_lerngruppe.eintrittsdatum = (SELECT 
            MAX(kind_lerngruppe.eintrittsdatum)
        FROM
            kind_lerngruppe
        WHERE
            kind_lerngruppe.person_id = kind_daten.person_id
            AND kind_lerngruppe.eintrittsdatum <= '${date}')
        AND (kind_schule.abgangsdatum_von_fsx IS NULL
        OR kind_schule.abgangsdatum_von_fsx > '${date}')) AS simpleList
WHERE
      Jahrgangsstufe < 7
      AND (((Jahrgangsstufe = ${isNaN(group) ? (0):(group) }
      XOR Lerngruppe= '${group}') XOR ${group == 'alle' ? (true):(false)}
      ))
      
ORDER BY Jahrgangsstufe ASC , Rufname ASC;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});

// Schülerbewegung an allgemein bildenden Schulen:

//1.1 - 1.3
app.get('/schullerBewegung', (req, res) => {
  // thirdVal should either be = 'geschlecht' or 'herkunftssprache'
  // if we are searching after gender then genderVal = 'm' or 'f'
  var { date, thirdVar, yearSum, genderVal } = req.query;
  // if we are searching after herkunftssprache then 
  var spracheValue = '1';
  var year = new Date(date).getFullYear();
  var month = new Date(date).getMonth();
  var day = new Date(date).getDay();
  pool.query(
  `SELECT 
  COUNT(*) AS Count
FROM
  (SELECT 
personen.person_id as id,
  kind_daten.geschlecht as geschlecht,
  kind_daten.nichtdeutsche_herkunftssprache as herkunftssprache,
  @seitEinschullung := FLOOR(DATEDIFF('${date}', personen.einschulungsdatum) / 365)+1 as seitEinschullung,
@jahreInklJahrgangswechseln := (COALESCE((SELECT 
    SUM(jahrgangswechsel.wert)
   FROM
    jahrgangswechsel
  WHERE
    jahrgangswechsel.person_id = personen.person_id
    AND jahrgangswechsel.datum <= (SELECT 
      MAX(jahrgangswechsel.datum) AS Datum
  FROM
      jahrgangswechsel
  WHERE
      Datum <= '${date}'
      )),
0) + @seitEinschullung) as jahreInklWechsel
FROM
  jahrgangswechsel
      INNER JOIN
  personen ON jahrgangswechsel.person_id = personen.person_id
  inner join
kind_daten on personen.person_id = kind_daten.person_id
WHERE
    Datum = (SELECT 
            MAX(jahrgangswechsel.datum)
        FROM
            jahrgangswechsel
        WHERE
            Datum <= '${date}'
            AND
            Datum  > '${year-1}-7-31'
            )) as Ueberspringen
WHERE
  jahreInklWechsel = ${yearSum}
  AND
  ${thirdVar} = '${thirdVar == 'geschlecht' ? (genderVal):(spracheValue)}'
;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // console.log(date, thirdVar, yearSum, genderVal)
      // //console.log(results)
      return res.send(results);
    }
  });
});


//2.1 - 2.5
app.get('/schullerBewegung2', (req, res) => {
  // thirdVal should either be = 'geschlecht' or 'herkunftssprache'
  // if we are searching after gender then genderVal = 'm' or 'f'
  var { date, thirdVar, yearSum, genderVal } = req.query;
  // if we are searching after herkunftssprache then 
  var spracheValue = '1';
  // console.log(date)
  var year = new Date(date).getFullYear();
  // console.log(year-1 + '-7'+ '-31')
  pool.query(
  `SELECT 
  COUNT(*) AS Count
FROM
  (SELECT 
personen.person_id as id,
  kind_daten.geschlecht as geschlecht,
  kind_daten.nichtdeutsche_herkunftssprache as herkunftssprache,
  @seitEinschullung := FLOOR(DATEDIFF('${date}', personen.einschulungsdatum) / 365)+1 as seitEinschullung,
@jahreInklJahrgangswechseln := (COALESCE((SELECT 
    SUM(jahrgangswechsel.wert)
   FROM
    jahrgangswechsel
  WHERE
    jahrgangswechsel.person_id = personen.person_id
    AND jahrgangswechsel.datum = (SELECT 
      MAX(jahrgangswechsel.datum) AS Datum
  FROM
      jahrgangswechsel
  WHERE
      Datum <= '${date}'
      
      )),
0) + @seitEinschullung) as jahreInklWechsel
FROM
  jahrgangswechsel
      INNER JOIN
  personen ON jahrgangswechsel.person_id = personen.person_id
  inner join
kind_daten on personen.person_id = kind_daten.person_id
WHERE
    Datum = (SELECT 
            MAX(jahrgangswechsel.datum)
        FROM
            jahrgangswechsel
        WHERE
            Datum <= '${date}'
            AND
            Datum  > '${year-1}-7-31'
            )) as Ueberspringen
WHERE
  jahreInklWechsel = ${yearSum}
  AND
  ${thirdVar} = '${thirdVar == 'geschlecht' ? (genderVal):(spracheValue)}'
;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // console.log(date, thirdVar, yearSum, genderVal)
      // //console.log(results)
      return res.send(results);
    }
  });
});

//4.
app.get('/sekundarvon4', (req, res) => {
  // thirdVal should either be = 'geschlecht' or 'herkunftssprache'
  // if we are searching after gender then genderVal = 'm' or 'f'
  var { date, thirdVar, genderVal } = req.query;
  // if we are searching after herkunftssprache then 
  var spracheValue = '1';
  pool.query(
  `SELECT 
    COUNT(*) AS Count
  FROM
  (SELECT 
      SekundarStufe.person_id,
      kind_daten.geschlecht AS geschlecht,
      kind_daten.nichtdeutsche_herkunftssprache AS herkunftssprache
    FROM
      (SELECT 
      personen.einschulungsdatum AS einschullungsdatum,
      kind_schule.*
      FROM
      personen
      INNER JOIN kind_schule ON personen.person_id = kind_schule.person_id
      WHERE
      kind_schule.abgangsgrund = 'Uebergang Sekundarstufe'
      ) AS SekundarStufe
    INNER JOIN personen ON SekundarStufe.person_id = personen.person_id
    INNER JOIN kind_daten ON SekundarStufe.person_id = kind_daten.person_id
    WHERE
      COALESCE((SELECT 
              SUM(jahrgangswechsel.wert)
          FROM
              jahrgangswechsel
          WHERE
              jahrgangswechsel.person_id = personen.person_id
                  AND jahrgangswechsel.datum = (SELECT 
                      MAX(jahrgangswechsel.datum) AS Datum
                  FROM
                      jahrgangswechsel
                  WHERE
                      Datum <= '${date}')), 0) 
                      + 
                      (FLOOR(DATEDIFF('${date}', personen.einschulungsdatum) / 365) + 1) = 5
           
          
          ) AS SekundarVon4
          WHERE
          ${thirdVar} = '${thirdVar == 'geschlecht' ? (genderVal):(spracheValue)}'

;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      
      ////console.log(results)
      return res.send(results);
    }
  });
});

//5.3
app.get('/absolventen', (req, res) => {
  // thirdVal should either be = 'geschlecht' or 'herkunftssprache'
  // if we are searching after gender then genderVal = 'm' or 'f'
  var { date, thirdVar, genderVal } = req.query;
  // if we are searching after herkunftssprache then 
  var spracheValue = '1';
  var year = new Date(date).getFullYear();
  pool.query(
  `SELECT 
  COUNT(*) AS Count
FROM
  (SELECT 
      SekundarStufe.person_id,
  kind_daten.geschlecht AS geschlecht,
  kind_daten.nichtdeutsche_herkunftssprache AS herkunftssprache
  FROM
      (SELECT 
      personen.einschulungsdatum AS einschullungsdatum,
  kind_schule.*
  FROM
      personen
  INNER JOIN 
  kind_schule ON personen.person_id = kind_schule.person_id
  WHERE
      kind_schule.abgangsgrund = 'Uebergang Sekundarstufe'
      AND
      kind_schule.abgangsdatum_von_fsx <= '${date}'
      
      )
      AS SekundarStufe
  INNER JOIN personen ON SekundarStufe.person_id = personen.person_id
  INNER JOIN kind_daten ON SekundarStufe.person_id = kind_daten.person_id
   WHERE
       COALESCE((SELECT 
               SUM(jahrgangswechsel.wert)
           FROM
             jahrgangswechsel
           WHERE
               jahrgangswechsel.person_id = personen.person_id
                   AND jahrgangswechsel.datum = (SELECT 
                       MAX(jahrgangswechsel.datum) AS Datum
                   FROM
                       jahrgangswechsel
                   WHERE
                       Datum <= '${date}')), 0)
                       + (FLOOR(DATEDIFF('${date}', personen.einschulungsdatum) / 365) + 1) = 7
          ) AS SekundarVon4
          WHERE
           ${thirdVar} = '${thirdVar == 'geschlecht' ? (genderVal):(spracheValue)}';`,
    (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      console.log(thirdVar)
      
      //console.log(results)
      return res.send(results);
    }
  });
});


//End of Queries



app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});