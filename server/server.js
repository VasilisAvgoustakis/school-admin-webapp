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

//Personen
app.get('/personsList', (req, res) => {
  const { table } = req.query;
  pool.query(`SELECT person_id, rufname, amtlicher_vorname, nachname, geburtsdatum, einschulungsdatum FROM ${table} ORDER BY rufname, nachname`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(results)
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
      console.log(results)
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
      console.log(results)
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
      console.log(results)
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
      console.log(results)
      return res.send(results);
    }
  });
});

app.get('/bezugspersonen', (req, res) => {
  const { person_id } = req.query;
  pool.query(`SELECT
  personen.rufname,
  personen.nachname
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
      console.log(results)
      return res.send(results);
    }
  });
});
//end of Personen queries


//haushalte
app.get('/hausList', (req, res) => {
  // const { person_id } = req.query;
  const { table } = req.query;
  pool.query(
  `SELECT
      *
  FROM
      ${table}
  ORDER BY 
      strasse ASC,
      postleitzahl ASC,
      ortsteil_berlin ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      console.log(results)
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
      console.log(results)
      return res.send(results);
    }
  });
});

//end of haushalte

//Arbeitsgruppen
app.get('/agList', (req, res) => {
  // const { person_id } = req.query;
  const { table } = req.query;
  pool.query(
  `SELECT
      *
  FROM
      ${table}
  ORDER BY 
      bezeichnung ASC,
      email ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      console.log(results)
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
      console.log(results)
      return res.send(results);
    }
  });
});

//end of arbeitsgruppen


//Lerngruppen
app.get('/lerngruppenList', (req, res) => {
  // const { person_id } = req.query;
  const { table } = req.query;
  pool.query(
  `SELECT
      *
  FROM
      ${table}
  ORDER BY 
      lerngruppe_id ASC
  ;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // console.log(results)
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
      // console.log(results)
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
      // console.log(results)
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
      // console.log(results)
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
  FROM (
select 
  personen.rufname AS Rufname,
  @jahrgang:=FLOOR(DATEDIFF('${date}', personen.einschulungsdatum) / 365) + 1 + COALESCE((SELECT 
                  SUM(jahrgangswechsel.wert)
              FROM
                  jahrgangswechsel
              WHERE
                  jahrgangswechsel.person_id = personen.person_id
                  AND
                  jahrgangswechsel.datum <= '${date}'
                  
                  ),0) AS Jahrgangsstufe,
  CASE
      WHEN @jahrgang <= 2 THEN '1/2'
      WHEN (@jahrgang > 2 AND @jahrgang < 5) THEN '3/4'
      WHEN @jahrgang > 4 THEN '5/6'
  END AS Lerngruppe,
  IF(@jahrgang <= 3, 'Unten', 'Oben') AS Etage,
  kind_daten.*
  FROM
  personen
      INNER JOIN
  kind_schule ON personen.person_id = kind_schule.person_id
      INNER JOIN
  kind_lerngruppe ON personen.person_id = kind_lerngruppe.person_id
      INNER JOIN
  lerngruppen ON kind_lerngruppe.lerngruppe_id = lerngruppen.lerngruppe_id
      INNER JOIN
  kind_daten ON personen.person_id = kind_daten.person_id
  WHERE
      kind_schule.zugangsdatum_zur_fsx <= '${date}'
      AND (kind_schule.abgangsdatum_von_fsx IS NULL
      OR kind_schule.abgangsdatum_von_fsx > '${date}')
      ) as simpleList
WHERE
      Jahrgangsstufe < 7
      AND (((Jahrgangsstufe = ${isNaN(group) ? (0):(group) }
      XOR Lerngruppe= '${group}') XOR Etage = '${group}' XOR ${group == 'alle' ? (true):(false)}
      ))
ORDER BY Jahrgangsstufe ASC , Rufname ASC;`, (err, results) => {
    if (err) {
      console.log(err)
      return res.send(err);
    } else {
      // console.log(results)
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
      // console.log(results)
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
      // console.log(results)
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
      
      //console.log(results)
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
      
      console.log(results)
      return res.send(results);
    }
  });
});


//End of Queries



app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});