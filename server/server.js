const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);

//db object from db.js containg all queries to db
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
},pool)

//express app object
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});


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





/**
 * Authentication
 */

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

/**
 * End of Authentication
*/

//Person relevant Queries

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

app.get('/lastPersonsId', (req, res) => {
  const { table } = req.query;
  pool.query(`SELECT MAX(person_id) AS id FROM personen;`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});

app.get('/lastHausId', (req, res) => {
  const { table } = req.query;
  pool.query(`SELECT MAX(haushalt_id) AS id FROM haushalte;`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});

app.get('/lastAgId', (req, res) => {
  const { table } = req.query;
  pool.query(`SELECT MAX(arbeitsgruppe_id) AS id FROM arbeitsgruppen;`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      //console.log(results)
      return res.send(results);
    }
  });
});

app.get('/lastLgId', (req, res) => {
  const { table } = req.query;
  pool.query(`SELECT MAX(lerngruppe_id) AS id FROM lerngruppen;`, (err, results) => {
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
  taetigkeit.*,
  vereinsmitgliedschaft.*
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
        vereinsmitgliedschaft  ON personen.person_id = vereinsmitgliedschaft.person_id
        AND mitgliedschaftsbeginn = (SELECT
                MAX(mitgliedschaftsbeginn)
            FROM 
              vereinsmitgliedschaft 
            WHERE
                personen.person_id = vereinsmitgliedschaft.person_id
                            )
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

app.get('/contactDataCompliment', (req, res) => {
  const ids = req.query;
  console.log(ids)
  pool.query(`SELECT
  kontakt_daten.email_1,
  kontakt_daten.email_2,
  kontakt_daten.email_fsx,
  personen.rufname
FROM
  kontakt_daten
INNER JOIN 
  personen ON personen.person_id = kontakt_daten.person_id
WHERE
  kontakt_daten.person_id NOT IN ? ;`, [Object.values(ids)],
  
  (err, results) => {
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
  arbeitsgruppen.email,
  arbeitsgruppen.arbeitsgruppe_id
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

app.get('/bezugskinder', (req, res) => {
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
  personen ON personen.person_id = bezugsperson_kind.person_id_2
WHERE
  bezugsperson_kind.person_id_1 =${ person_id } 
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

//EDIT PERSON
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
      taetigkeit_beginn, taetigkeit_ende, typ, taetigkeit, taetigkeitToBeDeleted, taetigkeitRecords,
      mitgliedschaftsbeginn, typ_m, mitgliedschaftsende, grund_fuer_mitgliedschaftsende, mitgliedschaftToBeDeleted, mitgliedschaftsRecords,
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

  //add or edit a person as promised based function
  async function addPerson(){
    await new Promise( (resolve,reject) =>  {   
        pool.query(`INSERT INTO personen(person_id, rufname, amtlicher_vorname, nachname, 
          geburtsdatum, einschulungsdatum, nicht_auf_listen) 
          VALUES (${person_id}, 
            ${rufname ? ("'"+rufname+"'"):(null)}, 
            ${amtlicher_vorname ? ("'"+amtlicher_vorname+"'"):(null)}, 
            ${nachname ? ("'"+nachname+"'"):(null)}, 
                  ${geburtsdatum ? ("'" + geburtsdatum.toString() + "'"):(null)},
                  ${einschulungsdatum ? ("'" + einschulungsdatum.toString() + "'"):(null)},
                  ${nicht_auf_listen ? ("'"+nicht_auf_listen+"'"):(null)}) 
          ON DUPLICATE KEY UPDATE 
          rufname=${rufname ? ("'"+rufname+"'"):(null)},
          amtlicher_vorname = ${amtlicher_vorname ? ("'"+amtlicher_vorname+"'"):(null)},
          nachname = ${nachname ? ("'"+nachname+"'"):(null)},
          geburtsdatum = ${geburtsdatum ? ("'" + geburtsdatum.toString() + "'"):(null)},
          einschulungsdatum = ${einschulungsdatum ? ("'" + einschulungsdatum.toString() + "'"):(null)},
          nicht_auf_listen = ${nicht_auf_listen ? ("'"+nicht_auf_listen+"'"):(null)};`
          ,(err, results) =>{

            if(err){ //Query Error 
              freeOfErrors = false;
              console.log(err)
              return reject(err);
            }else {
              //console.log(results)
              sumResults.push(results);
              resolve (res);
            }})
        })
  }

  //Person as an Entity takes a central role in the database!
  // The 1st query to add/edit a person is happening as a promise based function in order to make sure
  // that the person has been added and exists before the next queries which usually use the person as foreign key are executed
  if(validCoreData > 1 && person_id && rufname && nachname){
    addPerson().then( (resolve) => {
      
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
          // I dont understand why but if I remove this empty console.log statement the query below fails because of 
          // the missing foreign key, meaning that probably the insert a new person query above is not yet complete when this query below begins
          console.log("")
          pool.query(
          `INSERT INTO kontakt_daten(person_id, email_1, email_2, email_fsx, mobil_telefon_1, mobil_telefon_2,
                            mobil_telefon_fsx, telefon_1, telefon_2, telefon_fsx)
            VALUES(${person_id}, 
              ${email_1 ? ("'"+email_1+"'"):(null)}, 
              ${email_2 ? ("'"+email_2+"'"):(null)}, 
              ${email_fsx ? ("'"+email_fsx+"'"):(null)}, 
              ${mobil_telefon_1 ? ("'"+mobil_telefon_1+"'"):(null)}, 
              ${mobil_telefon_2 ? ("'"+mobil_telefon_2+"'"):(null)}, 
              ${mobil_telefon_fsx ? ("'"+mobil_telefon_fsx+"'"):(null)}, 
              ${telefon_1 ? ("'"+telefon_1+"'"):(null)}, 
              ${telefon_2 ? ("'"+telefon_2+"'"):(null)}, 
              ${telefon_fsx ?("'"+telefon_fsx+"'"):(null)})
            ON DUPLICATE KEY UPDATE
            email_1 = ${email_1 ? ("'"+email_1+"'"):(null)},
            email_2 = ${email_2 ? ("'"+email_2+"'"):(null)},
            email_fsx = ${email_fsx ? ("'"+email_fsx+"'"):(null)},
            mobil_telefon_1 = ${mobil_telefon_1 ? ("'"+mobil_telefon_1+"'"):(null)},
            mobil_telefon_2 = ${mobil_telefon_2 ? ("'"+mobil_telefon_2+"'"):(null)},
            mobil_telefon_fsx = ${mobil_telefon_fsx ? ("'"+mobil_telefon_fsx+"'"):(null)},
            telefon_1 = ${telefon_1 ? ("'"+telefon_1+"'"):(null)},
            telefon_2 = ${telefon_2 ? ("'"+telefon_2+"'"):(null)},
            telefon_fsx = ${telefon_fsx ?("'"+telefon_fsx+"'"):(null)};`

            ,(err, results) =>{
              if(err){ //Query Error (Rollback and release connection)
                freeOfErrors = false;
                console.log(err)
                //return res.send(err);
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
        
        if(validCoreData > 1){
          pool.query(
            `INSERT INTO kind_schule(person_id, zugangsdatum_zur_fsx, abgangsdatum_von_fsx, abgangsgrund, mittag)
              VALUES(${person_id},
                  ${zugangsdatum_zur_fsx ? ("'" + zugangsdatum_zur_fsx.toString() + "'"):(null)}, 
                  ${abgangsdatum_von_fsx ? ("'" + abgangsdatum_von_fsx.toString() + "'"):(null)},
                  ${abgangsgrund !== '' ? ("'"+abgangsgrund+"'"):(null)}, 
                  ${mittag !== '' ? ("'"+mittag+"'"):(null)})
              ON DUPLICATE KEY UPDATE
              zugangsdatum_zur_fsx = ${zugangsdatum_zur_fsx ? ("'" + zugangsdatum_zur_fsx.toString() + "'"):(null)},
              abgangsdatum_von_fsx = ${abgangsdatum_von_fsx ? ("'" + abgangsdatum_von_fsx.toString() + "'"):(null)},
              abgangsgrund = ${abgangsgrund !== '' ? ("'"+abgangsgrund+"'"):(null)},
              mittag = ${mittag ? ("'"+mittag+"'"):(null)};`

              ,(err, results) =>{
                if(err){ //Query Error (Rollback and release connection)
                  freeOfErrors = false;
                  console.log(err)
                  //return res.send(err);
                }else{
                  sumResults.push(results);
                }})
        }

          //make array only with the relevant data of coming query
          let kind_data = [staatsangehoerigkeit, geburtsort, geschlecht, nichtdeutsche_herkunftssprache]
          //console.log(kind_data)
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
              VALUES(${person_id}, 
                ${staatsangehoerigkeit ? ("'"+staatsangehoerigkeit+"'"):(null)}, 
                ${geburtsort ? ("'"+geburtsort+"'"):(null)}, 
                ${geschlecht ? ("'"+geschlecht+"'"):(null)}, 
                ${nichtdeutsche_herkunftssprache ? ("'"+nichtdeutsche_herkunftssprache+"'"):(null)})
              ON DUPLICATE KEY UPDATE
              staatsangehoerigkeit = ${staatsangehoerigkeit ? ("'"+staatsangehoerigkeit+"'"):(null)},
              geburtsort = ${geburtsort ? ("'"+geburtsort+"'"):(null)},
              geschlecht = ${geschlecht ? ("'"+geschlecht+"'"):(null)},
              nichtdeutsche_herkunftssprache = ${nichtdeutsche_herkunftssprache ? ("'"+nichtdeutsche_herkunftssprache+"'"):(null)};`

              ,(err, results) =>{
                if(err){ //Query Error (Rollback and release connection)
                  freeOfErrors = false;
                  console.log(err)
                  //return res.send(err);
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

        if(validCoreData > 1 && betreuung_beginn && betreuung_ende){
          pool.query(
          `INSERT INTO kind_betreuung(person_id, betreuung_beginn, betreuung_ende, betreuung_umfang, betreuung_ferien)
            VALUES(${person_id}, 
              ${betreuung_beginn ? ("'" + betreuung_beginn.toString() + "'"):(null)}, 
                  ${betreuung_ende ? ("'" + betreuung_ende.toString() + "'"):(null)}, 
                  ${betreuung_umfang ?("'"+betreuung_umfang+"'"):(null)}, 
                  ${betreuung_ferien ? ("'"+betreuung_ferien+"'"):('0')})
            ON DUPLICATE KEY UPDATE
            betreuung_beginn = ${betreuung_beginn ? ("'" + betreuung_beginn.toString() + "'"):(null)},
            betreuung_ende = ${betreuung_ende ? ("'" + betreuung_ende.toString() + "'"):(null)},
            betreuung_umfang = ${betreuung_umfang ?("'"+betreuung_umfang+"'"):(null)},
            betreuung_ferien = ${betreuung_ferien ? ("'"+betreuung_ferien+"'"):('0')};`

            ,(err, results) =>{
              if(err){ //Query Error (Rollback and release connection)
                console.log("Sending err!!!!")
                freeOfErrors = false;
                console.log(err)
                //return res.send(err);
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
                  console.log(err)
                  //return res.send(err);
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
                  console.log(err)
                  //return res.send(err);
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
                  //return res.send(err);
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
                  console.log(err)
                  //return res.send(err);
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
                  console.log(err)
                  //return res.send(err);
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
                  ${wert ? (wert):(0)}, 
                  '${grund}');`

            ,(err, results) =>{
              if(err){
                console.log("Sending err!!!!")
                freeOfErrors = false;
                console.log(err)
                //return res.send(err);
              }else {
                sumResults.push(results)
              }})
        }

        //removes selected Jahrgangswechsel Record for this Kid
        if(jahrgangToBeDeleted){
          //console.log("BZPADD: "+jahrgangToBeDeleted)
          pool.query(
            `DELETE FROM jahrgangswechsel 
                WHERE person_id=${person_id}
                AND datum=${jahrgangToBeDeleted ? ("'" + jahrgangToBeDeleted.toString() + "'"):(null)}
              ;`
              ,(err,results) => {
                if(err){
                  console.log(err)
                  freeOfErrors = false;
                  //return res.send(err);
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
          `INSERT INTO kind_but(person_id, but_beginn, but_ende, berlinpass_but)
            VALUES(${person_id}, ${but_beginn ? ("'" + but_beginn.toString() + "'"):(null)},
                  ${but_ende ? ("'" + but_ende.toString() + "'"):(null)},
                  ${berlinpass_but ? (berlinpass_but):(null)}
                  )
            ON DUPLICATE KEY UPDATE
              person_id= ${person_id},
              but_beginn= ${but_beginn ? ("'" + but_beginn.toString() + "'"):(null)},
              but_ende= ${but_ende ? ("'" + but_ende.toString() + "'"):(null)},
              berlinpass_but= ${berlinpass_but ? (berlinpass_but):(null)}
                  ;`

            ,(err, results) =>{
              if(err){
                console.log(err)
                freeOfErrors = false;
                //return res.send(err);
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
              //return res.send(err);
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
              //return res.send(err);
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
            //return res.send(err);
          }else {
            sumResults.push(results)
          }})
      }


      //make array only with the relevant data of coming query
      let taetigkeitData = [taetigkeit_beginn, taetigkeit_ende, typ, taetigkeit]

      // check that at least one of the values is relevant for saving (not null or '')
      validCoreData = 0;
      taetigkeitData.forEach(element=> {
        if(element === '' || element === null || element === 'null'){
          return;
        }else{
          validCoreData++;
        }
        })

      // adds Tätigkeit record
      if(validCoreData > 1 && (!einschulungsdatum || abgangsdatum_von_fsx)){
        
        pool.query(
        `INSERT IGNORE INTO taetigkeit(person_id, taetigkeit_beginn, taetigkeit_ende, typ, taetigkeit)
          VALUES(${person_id},
                ${taetigkeit_beginn ? ("'" + taetigkeit_beginn.toString() + "'"):(null)},
                ${taetigkeit_ende ? ("'" + taetigkeit_ende.toString() + "'"):(null)},
                ${typ ? ("'"+typ+"'"):(null)},
                ${taetigkeit ? ("'"+taetigkeit+"'"):(null)})
                ;`

          ,(err, results) =>{
            if(err){
              console.log(err)
              freeOfErrors = false;
              //return res.send(err);
            }else {
              sumResults.push(results)
            }})
      }

      // deletes Taetigkeit record
      if(taetigkeitToBeDeleted){
      let splitValues = taetigkeitToBeDeleted.split("_");
      let beginn = splitValues[0];
      let taetigkeit = splitValues[1];
      console.log(taetigkeit)

      pool.query(
      `DELETE FROM taetigkeit
        WHERE 
        person_id = ${person_id}
        AND
        taetigkeit_beginn = ${"'"+beginn.toString()+"'"}
        
      ;`

        ,(err, results) =>{
          if(err){
            console.log(err)
            freeOfErrors = false;
            //return res.send(err);
          }else {
            console.log(results)
            sumResults.push(results)
          }})
      }


      //make array only with the relevant data of coming query
      let mitgliedschaftsData = [mitgliedschaftsbeginn, typ_m, mitgliedschaftsende, grund_fuer_mitgliedschaftsende]

      // check that at least one of the values is relevant for saving (not null or '')
      validCoreData = 0;
      mitgliedschaftsData.forEach(element=> {
        if(element === '' || element === null || element === 'null'){
          return;
        }else{
          validCoreData++;
        }
        })

      // adds Vereinmitgliedschaft record
      if(validCoreData > 1 && (!einschulungsdatum || abgangsdatum_von_fsx)){
        //console.log(mitgliedschaftsData)
        pool.query(
        `INSERT INTO vereinsmitgliedschaft(person_id, mitgliedschaftsbeginn, typ, mitgliedschaftsende, grund_fuer_mitgliedschaftsende)
          VALUES(${person_id},
                ${mitgliedschaftsbeginn ? ("'" + mitgliedschaftsbeginn.toString() + "'"):(null)},
                ${typ_m ? ("'"+typ_m+"'"):(null)},
                ${mitgliedschaftsende ? ("'" + mitgliedschaftsende.toString() + "'"):(null)},
                ${grund_fuer_mitgliedschaftsende ? ("'"+grund_fuer_mitgliedschaftsende+"'"):(null)})
                ON DUPLICATE KEY UPDATE
                  typ = ${typ_m ? ("'"+typ_m+"'"):(null)},
                  mitgliedschaftsende = ${mitgliedschaftsende ? ("'" + mitgliedschaftsende.toString() + "'"):(null)},
                  grund_fuer_mitgliedschaftsende = ${grund_fuer_mitgliedschaftsende ? ("'"+grund_fuer_mitgliedschaftsende+"'"):(null)}
                ;`

          ,(err, results) =>{
            if(err){
              console.log(err)
              freeOfErrors = false;
              //return res.send(err);
            }else {
              sumResults.push(results)
            }})
      }

      // deletes vereinmitgliedschaft record
      if(mitgliedschaftToBeDeleted){
        let splitValues = mitgliedschaftToBeDeleted.split("_");
        let person_id = splitValues[0];
        let beginn = splitValues[1];
        console.log(taetigkeit)
        
        pool.query(
        `DELETE FROM vereinsmitgliedschaft
          WHERE 
          person_id = ${person_id}
          AND
          mitgliedschaftsbeginn = ${"'"+beginn.toString()+"'"}
        ;`

          ,(err, results) =>{
            if(err){
              console.log(err)
              freeOfErrors = false;
              //return res.send(err);
            }else {
              console.log(results)
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
              return res.send(results);
            }
          }}) 
          
        },
      (reject) => {
        console.log(res.send(reject))
      }
)

}else {
  console.log("Es fehlen wichtige Persondaten wie z.B. Rufname und/oder Nachname!!!\nBitte fühlen Sie diese aus und versuchen Sie es erneut!!!")
  res.send("Es fehlen wichtige Persondaten wie z.B. Rufname und/oder Nachname!!!\nBitte fühlen Sie diese aus und versuchen Sie es erneut!!!")
}
    
    }); 


//EDIT HAUS
app.get('/editHaus', async (req,res) => {
  //array containg all variables passed in with the request
  let [haushalt_id, bezeichnung, strasse, plz, ort, region, ortsteil_berlin, quart_mgmt, festnetz,
    zusatz, land, anwohnerToBeAdded, probableAnwohner, meldeanschrift, datum_einzug, anwohnerToBeDeleted, anwohner,
  ] = req.query.state

  //console.log(req.query.state)
  // this variable will be true if the error case in one of the queries has already send headers
  let freeOfErrors = true;

  //array to put all results and return them at the end of the querry
  let sumResults = [];

  // see that no empty '' values are send in with the data, instead values that should remain empty or null are handled by the query 
  // here in the server and their value is turned into null
  //console.log(req.query.state)
  //make array only with the relevant data of coming query
  let coreData = [haushalt_id, bezeichnung, strasse, plz, ort, region, ortsteil_berlin, quart_mgmt, festnetz,
    zusatz, land];

    console.log(coreData)

  // check that at least on of the values is relevant for saving (not null or '')
  let validCoreData = 0;
  coreData.forEach(element=> {
    if(element === '' || element === null || element === 'null'){
      return;
      
    }else{
      validCoreData++;
    }
    })


  //add or edits a Haus as promised based function
  async function addHaus(){
    await new Promise( (resolve,reject) =>  {   
        pool.query(`INSERT INTO haushalte(haushalt_id, bezeichnung, strasse, postleitzahl, ort, region, ortsteil_berlin,
          quartiersmanagement_gebiet, telefon, adress_zusatz, land) 
          VALUES (${haushalt_id}, 
            ${bezeichnung ? ("'"+bezeichnung+"'"):(null)}, 
            ${strasse ? ("'"+strasse+"'"):(null)}, 
            ${plz ? ("'"+plz+"'"):(null)}, 
            ${ort ? ("'" + ort + "'"):(null)},
            ${region ? ("'" + region + "'"):(null)},
            ${ortsteil_berlin ? ("'" + ortsteil_berlin + "'"):(null)},
            ${quart_mgmt ? ("'" + quart_mgmt + "'"):(null)},
            ${festnetz ? ("'"+festnetz+"'"):(null)},
            ${zusatz ? ("'"+zusatz+"'"):(null)},
            ${land ? ("'"+land+"'"):(null)})
          ON DUPLICATE KEY UPDATE 
          bezeichnung=${bezeichnung ? ("'"+bezeichnung+"'"):(null)},
          strasse = ${strasse ? ("'"+strasse+"'"):(null)},
          postleitzahl = ${plz ? ("'"+plz+"'"):(null)},
          ort = ${ort ? ("'" + ort + "'"):(null)},
          region = ${region ? ("'" + region + "'"):(null)},
          ortsteil_berlin = ${ortsteil_berlin ? ("'"+ortsteil_berlin+"'"):(null)},
          quartiersmanagement_gebiet = ${quart_mgmt ? ("'"+quart_mgmt+"'"):(null)},
          telefon = ${festnetz ? ("'"+festnetz+"'"):(null)},
          adress_zusatz = ${zusatz ? ("'"+zusatz+"'"):(null)},
          land = ${land ? ("'"+land+"'"):(null)}
          ;`
          ,(err, results) =>{

            if(err){ //Query Error 
              freeOfErrors = false;
              console.log(err)
              return reject(err);
            }else {
              //console.log(results)
              sumResults.push(results);
              
              resolve (res);
            }})
        })
  }


  // The 1st query to add/edit a Haus is happening as a promise based function in order to make sure
  // that the Haus has been added and exists before the next queries which usually use the haus as foreign key are executed
  if(validCoreData > 1 && haushalt_id){
    addHaus()
    .then((resolve) => {


       //make array only with the relevant data of coming query
       let agData = [anwohnerToBeAdded, meldeanschrift, datum_einzug]

       // check that at least on of the values is relevant for saving (not null or '')
       validCoreData = 0;
       agData.forEach(element=> {
         if(element === '' || element === null || element === 'null'){
           return;
         }else{
           validCoreData++;
         }
         })
 
       // adds Anwohner record
       if(validCoreData > 0 && anwohnerToBeAdded){
         
         pool.query(
         `INSERT IGNORE INTO person_haushalt(haushalt_id, person_id, meldeanschrift, datum_einzug)
           VALUES(${haushalt_id}, ${anwohnerToBeAdded},
                 ${meldeanschrift ? (meldeanschrift):(null)},
                 ${datum_einzug ? ("'" + datum_einzug.toString() + "'"):(null)}
                 );`
 
           ,(err, results) =>{
             if(err){
               console.log(err)
               freeOfErrors = false;
               //return res.send(err);
             }else {
               sumResults.push(results)
             }})
       }
 
       // deletes Anwohner record
       if(anwohnerToBeDeleted){
         
       pool.query(
       `DELETE FROM person_haushalt
         WHERE 
         haushalt_id = ${haushalt_id}
         AND
         person_id = ${anwohnerToBeDeleted} 
       ;`
 
         ,(err, results) =>{
           if(err){
             console.log(err)
             freeOfErrors = false;
             //return res.send(err);
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
          sumResults.push(results)
          //console.log("sending...")
          //console.log(results)
          return res.send(results);
        }
      }}) 
          
        },
        (reject) => {
          console.log(res.send(reject))
        }
    )
  }

});

//EDIT AG
app.get('/editAg', async (req,res) => {
  //array containg all variables passed in with the request
  let [arbeitsgruppe_id, bezeichnung, beschreibung, email, mitgliedToBeAdded, probableMitglieder,
  koordination_der_ag, datum_mitgliedschaftsbeginn, datum_mitgliedschaftsende, mitgliedToBeDeleted, mitglieder,
  ] = req.query.state

  //console.log(req.query.state)
  // this variable will be true if the error case in one of the queries has already send headers
  let freeOfErrors = true;

  //array to put all results and return them at the end of the querry
  let sumResults = [];

  // see that no empty '' values are send in with the data, instead values that should remain empty or null are handled by the query 
  // here in the server and their value is turned into null
  //console.log(req.query.state)
  //make array only with the relevant data of coming query
  let coreData = [arbeitsgruppe_id, bezeichnung, beschreibung, email];

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


  //add or edits a AG as promised based function
  async function addAg(){
    await new Promise( (resolve,reject) =>  {   
        pool.query(`INSERT INTO arbeitsgruppen(arbeitsgruppe_id, bezeichnung, beschreibung, email) 
          VALUES (${arbeitsgruppe_id}, 
            ${bezeichnung ? ("'"+bezeichnung+"'"):(null)}, 
            ${beschreibung ? ("'"+beschreibung+"'"):(null)}, 
            ${email ? ("'"+email+"'"):(null)})
          ON DUPLICATE KEY UPDATE 
          bezeichnung=${bezeichnung ? ("'"+bezeichnung+"'"):(null)},
          beschreibung = ${beschreibung ? ("'"+beschreibung+"'"):(null)},
          email = ${email ? ("'"+email+"'"):(null)} 
          ;`
          ,(err, results) =>{

            if(err){ //Query Error 
              freeOfErrors = false;
              console.log(err)
              return reject(err);
            }else {
              //console.log(results)
              sumResults.push(results);
              
              resolve (res);
            }})
        })
  }


  // The 1st query to add/edit a Haus is happening as a promise based function in order to make sure
  // that the Haus has been added and exists before the next queries which usually use the haus as foreign key are executed
  if(validCoreData > 1 && arbeitsgruppe_id){
    addAg()
    .then((resolve) => {
       //make array only with the relevant data of coming query
       let agData = [mitgliedToBeAdded, koordination_der_ag, datum_mitgliedschaftsbeginn, datum_mitgliedschaftsende]

       // check that at least on of the values is relevant for saving (not null or '')
       validCoreData = 0;
       agData.forEach(element=> {
         if(element === '' || element === null || element === 'null'){
           return;
         }else{
           validCoreData++;
         }
         })
 
       // adds Mitglied record
       if(validCoreData > 0 && mitgliedToBeAdded){
         
         pool.query(
         `INSERT IGNORE INTO person_arbeitsgruppe(arbeitsgruppe_id, person_id, koordination_der_ag, datum_mitgliedschaftsbeginn, datum_mitgliedschaftsende)
           VALUES(${arbeitsgruppe_id}, ${mitgliedToBeAdded},
                 ${koordination_der_ag ? (koordination_der_ag):(null)},
                 ${datum_mitgliedschaftsbeginn ? ("'" + datum_mitgliedschaftsbeginn.toString() + "'"):(null)},
                 ${datum_mitgliedschaftsende ? ("'" + datum_mitgliedschaftsende.toString() + "'"):(null)}
                 );`
 
           ,(err, results) =>{
             if(err){
               console.log(err)
               freeOfErrors = false;
               //return res.send(err);
             }else {
               sumResults.push(results)
             }})
       }
 
       // deletes Mitglied record
       if(mitgliedToBeDeleted){
         
       pool.query(
       `DELETE FROM person_arbeitsgruppe
         WHERE 
         arbeitsgruppe_id = ${arbeitsgruppe_id}
         AND
         person_id = ${mitgliedToBeDeleted} 
       ;`
 
         ,(err, results) =>{
           if(err){
             console.log(err)
             freeOfErrors = false;
             //return res.send(err);
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
          sumResults.push(results)
          //console.log("sending...")
          //console.log(results)
          return res.send(results);
        }
      }}) 
          
        },
        (reject) => {
          console.log(res.send(reject))
        }
    )
  }

});

//EDIT Lerngruppe
app.get('/editLg', async (req,res) => {
  //array containg all variables passed in with the request
  let [lerngruppe_id, email_eltern, email_team, telefon_team, bezeichnung, mitgliedToBeAdded, probableMitglieder, eintrittsdatum,
  mitgliedToBeDeleted, mitglieder
] = req.query.state

  //console.log(req.query.state)
  // this variable will be true if the error case in one of the queries has already send headers
  let freeOfErrors = true;

  //array to put all results and return them at the end of the querry
  let sumResults = [];

  // see that no empty '' values are send in with the data, instead values that should remain empty or null are handled by the query 
  // here in the server and their value is turned into null
  //console.log(req.query.state)
  //make array only with the relevant data of coming query
  let coreData = [lerngruppe_id, email_eltern, email_team, telefon_team, bezeichnung];


  // check that at least on of the values is relevant for saving (not null or '')
  let validCoreData = 0;
  coreData.forEach(element=> {
    if(element === '' || element === null || element === 'null'){
      return;
      
    }else{
      validCoreData++;
    }
    })


  //add or edits a AG as promised based function
  async function addLg(){
    await new Promise( (resolve,reject) =>  {   
        pool.query(`INSERT INTO lerngruppen(lerngruppe_id, email_eltern, email_team, telefon_team, bezeichnung) 
          VALUES (${lerngruppe_id},
            ${email_eltern ? ("'"+email_eltern+"'"):(null)},
            ${email_team ? ("'"+email_team+"'"):(null)},
            ${telefon_team ? ("'"+telefon_team+"'"):(null)}, 
            ${bezeichnung ? ("'"+bezeichnung+"'"):(null)}  
            )
          ON DUPLICATE KEY UPDATE 
          email_eltern=${email_eltern ? ("'"+email_eltern+"'"):(null)},
          email_team=${email_team ? ("'"+email_team+"'"):(null)},
          telefon_team=${telefon_team ? ("'"+telefon_team+"'"):(null)},
          bezeichnung=${bezeichnung ? ("'"+bezeichnung+"'"):(null)} 
          ;`
          ,(err, results) =>{

            if(err){ //Query Error 
              freeOfErrors = false;
              console.log(err)
              return reject(err);
            }else {
              //console.log(results)
              sumResults.push(results);
              resolve (res);
            }})
        })
  }


  // The 1st query to add/edit a Haus is happening as a promise based function in order to make sure
  // that the Haus has been added and exists before the next queries which usually use the haus as foreign key are executed
  if(validCoreData > 1 && lerngruppe_id){
    addLg()
    .then((resolve) => {
       //make array only with the relevant data of coming query
       let agData = [mitgliedToBeAdded, eintrittsdatum]

       // check that at least on of the values is relevant for saving (not null or '')
       validCoreData = 0;
       agData.forEach(element=> {
         if(element === '' || element === null || element === 'null'){
           return;
         }else{
           validCoreData++;
         }
         })
 
       // adds Mitglied record
       if(validCoreData > 0 && mitgliedToBeAdded){
         
         pool.query(
         `INSERT IGNORE INTO kind_lerngruppe(lerngruppe_id, person_id, eintrittsdatum)
           VALUES(${lerngruppe_id}, ${mitgliedToBeAdded},
                 ${eintrittsdatum ? ("'" + eintrittsdatum.toString() + "'"):(null)}
                 );`
 
           ,(err, results) =>{
             if(err){
               console.log(err)
               freeOfErrors = false;
               //return res.send(err);
             }else {
               sumResults.push(results)
             }})
       }
 
       // deletes Mitglied record
       if(mitgliedToBeDeleted){
         
       pool.query(
       `DELETE FROM kind_lerngruppe
         WHERE 
         lerngruppe_id = ${lerngruppe_id}
         AND
         person_id = ${mitgliedToBeDeleted} 
       ;`
 
         ,(err, results) =>{
           if(err){
             console.log(err)
             freeOfErrors = false;
             //return res.send(err);
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
          sumResults.push(results)
          //console.log("sending...")
          //console.log(results)
          return res.send(results);
        }
      }}) 
          
        },
        (reject) => {
          console.log(res.send(reject))
        }
    )
  }

});


//EDIT Lerngruppe
app.get('/editJob', async (req,res) => {
  //array containg all variables passed in with the request
  let [
    filter, taetigkeit_beginn, taetigkeit_ende, typ, taetigkeit, mitgliedToBeAdded,
    probableMitglieder, eintrittsdatum, mitgliedToBeDeleted, mitglieder,
  ] = req.query.state

  let dataToBeDeleted = mitgliedToBeDeleted.split(',')
  console.log(dataToBeDeleted[0])
  // this variable will be true if the error case in one of the queries has already send headers
  let freeOfErrors = true;

  //array to put all results and return them at the end of the querry
  let sumResults = [];

  // see that no empty '' values are send in with the data, instead values that should remain empty or null are handled by the query 
  // here in the server and their value is turned into null
  //console.log(req.query.state)
  //make array only with the relevant data of coming query
  let coreData = [mitgliedToBeAdded, mitgliedToBeDeleted, taetigkeit_beginn, taetigkeit_ende, typ, taetigkeit];


  // check that at least on of the values is relevant for saving (not null or '')
  let validCoreData = 0;
  coreData.forEach(element=> {
    if(element === '' || element === null || element === 'null'){
      return;
      
    }else{
      validCoreData++;
    }
    })


  //adds or edits a Job as promised based function
  async function addJob(){
    await new Promise( (resolve,reject) =>  {   
        pool.query(`INSERT INTO taetigkeit(person_id, taetigkeit_beginn, taetigkeit_ende, typ, taetigkeit ) 
          VALUES (${mitgliedToBeAdded},
            ${taetigkeit_beginn ? ("'" + taetigkeit_beginn.toString() + "'"):(null)},
            ${taetigkeit_ende ? ("'" + taetigkeit_ende.toString() + "'"):(null)},
            ${typ ? ("'"+typ+"'"):(null)}, 
            ${taetigkeit ? ("'"+taetigkeit+"'"):(null)}  
            )
          ON DUPLICATE KEY UPDATE 
          taetigkeit_beginn=${taetigkeit_beginn ? ("'" + taetigkeit_beginn.toString() + "'"):(null)},
          taetigkeit_ende=${taetigkeit_ende ? ("'" + taetigkeit_ende.toString() + "'"):(null)},
          typ=${typ ? ("'"+typ+"'"):(null)},
          taetigkeit=${taetigkeit ? ("'"+taetigkeit+"'"):(null)} 
          ;`
          ,(err, results) =>{

            if(err){ //Query Error
              if(mitgliedToBeAdded){
                freeOfErrors = false;
                console.log(err)
                return reject(err);
                }else resolve();
            }else {
              console.log(results)
              sumResults.push(results);
              resolve (res);
            }})
        })
  }


  // The 1st query to add/edit a Haus is happening as a promise based function in order to make sure
  // that the Haus has been added and exists before the next queries which usually use the haus as foreign key are executed
  if(validCoreData > 0 ){
    addJob()
    .then((resolve) => {
 
       // deletes Mitglied record
       if(dataToBeDeleted.length == 5){
         
       pool.query(
       `DELETE FROM taetigkeit
         WHERE 
         person_id = ${dataToBeDeleted[0]}
         AND
         typ = '${dataToBeDeleted[3]}' AND taetigkeit = '${dataToBeDeleted[4]}' 
       ;`
 
         ,(err, results) =>{
           if(err){
             console.log(err)
             freeOfErrors = false;
             //return res.send(err);
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
          sumResults.push(results)
          //console.log("sending...")
          console.log(results)
          return res.send(results);
        }
      }}) 
          
        },
        (reject) => {
          console.log(res.send(reject))
        }
    )
  }

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

app.get('/deleteHausData', (req, res) => {
  let table = req.query.table;
  let haushalt_id = req.query.haushalt_id;
  pool.query(`DELETE FROM ${table} WHERE haushalt_id = ${haushalt_id};`,
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

app.get('/deleteAgData', (req, res) => {
  let table = req.query.table;
  let arbeitsgruppe_id = req.query.arbeitsgruppe_id;
  pool.query(`DELETE FROM ${table} WHERE arbeitsgruppe_id = ${arbeitsgruppe_id};`,
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

app.get('/deleteLgData', (req, res) => {
  let table = req.query.table;
  let lerngruppe_id = req.query.lerngruppe_id;
  pool.query(`DELETE FROM ${table} WHERE lerngruppe_id = ${lerngruppe_id};`,
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

app.get('/deleteJobData', (req, res) => {
  let filter = req.query.filter;
  let taetigkeit = req.query.taetigkeit;
  let typ = req.query.typ;

  pool.query(`DELETE FROM taetigkeit 
                WHERE 
                  ${filter == 'job' ? ('taetigkeit='+ "'"+taetigkeit+"'"):('typ='+"'"+typ+"'")} 
                ;`,
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
    personen.nachname,
    person_arbeitsgruppe.koordination_der_ag
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

app.get('/dataMultitableHaus', (req, res) => {
  const haushalt_id = req.query.haushalt_id;
  
  pool.query(
  `SELECT
      *
  FROM
      person_haushalt
      INNER JOIN
      personen ON personen.person_id = person_haushalt.person_id
  WHERE
    person_haushalt.haushalt_id = ${haushalt_id}
  ORDER BY 
      personen.rufname ASC
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

app.get('/dataMultitableAg', (req, res) => {
  const arbeitsgruppe_id = req.query.arbeitsgruppe_id;
  
  pool.query(
  `SELECT
      *
  FROM
      person_arbeitsgruppe
      INNER JOIN
      personen ON personen.person_id = person_arbeitsgruppe.person_id
  WHERE
    person_arbeitsgruppe.arbeitsgruppe_id = ${arbeitsgruppe_id}
  ORDER BY 
      personen.rufname ASC
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

app.get('/dataMultitableLg', (req, res) => {
  const lerngruppe_id = req.query.lerngruppe_id;
  
  pool.query(
  `SELECT
      *
  FROM
      kind_lerngruppe
      INNER JOIN
      personen ON personen.person_id = kind_lerngruppe.person_id
  WHERE
    kind_lerngruppe.lerngruppe_id = ${lerngruppe_id}
  ORDER BY 
      personen.rufname ASC
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

app.get('/dataMultitableJob', (req, res) => {
  const lerngruppe_id = req.query.lerngruppe_id;
  
  pool.query(
  `SELECT
      *
  FROM
      taetigkeit
      INNER JOIN
      personen ON personen.person_id = taetigkeit.person_id
  ORDER BY 
      personen.rufname ASC
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
  let table = req.query.table;
  let column = req.query.column;
  console.log(table, column)
  pool.query(
  `SELECT distinct
      ${column}
  FROM
      ${table}
  ORDER BY 
      ${column} ASC
      
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
  const { column } = req.query;
  pool.query(
  `SELECT
    personen.person_id,
    personen.rufname,
    personen.nachname,
    taetigkeit.taetigkeit_beginn,
    taetigkeit_ende,
    taetigkeit.taetigkeit,
    taetigkeit.typ
  FROM
    personen
  INNER JOIN
    taetigkeit on personen.person_id = taetigkeit.person_id
  where taetigkeit.taetigkeit = "${column}" or taetigkeit.typ = "${column}"
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
  
  console.log(group + " " + date)
  pool.query(
  `SELECT DISTINCT
  *
  FROM 
  (SELECT 
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
      console.log(results)
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