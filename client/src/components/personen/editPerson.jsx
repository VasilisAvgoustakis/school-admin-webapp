import React from 'react';
import axios from 'axios';
import '../stylesheets/globalstyles.css'
import '../stylesheets/edits.css';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'
import { TouchableNativeFeedbackBase } from 'react-native';
import { v4 as uuidv4 } from 'uuid';



export class EditPerson extends React.Component{
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.fetchProbableBezugspersonen = this.fetchProbable.bind(this);
        this.fetchProbableHaushalte = this.fetchProbable.bind(this);
        this.fetchProbableLerngruppen = this.fetchProbable.bind(this);
        this.fetchPersonsRecords = this.fetchPersonsRecords.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editData = this.editData.bind(this);
        this.deleteQueryPerson = this.deleteQueryPerson.bind(this);
        this.deleteQueryKind = this.deleteQueryKind.bind(this);
        this.deletePersonData = this.deletePersonData.bind(this);
        this.deleteKindData = this.deleteKindData.bind(this);

        
        this.state = {
            //Kerndaten
            person_id: this.props.person_id,
            rufname: this.props.rufname ? (this.props.rufname):(''),
            amtlicher_vorname: this.props.amtlicher_vorname ? (this.props.amtlicher_vorname):(''),
            nachname: this.props.nachname ? (this.props.nachname):(''),
            geburtsdatum: this.props.geburtsdatum ? (this.props.geburtsdatum):(''),
            einschulungsdatum: this.props.einschulungsdatum ?(this.props.einschulungsdatum):(''),
            nicht_auf_listen: this.props.nicht_auf_listen ? (this.props.nicht_auf_listen):(''),

            //Kontaktdata
            email_1: this.props.email_1 ? (this.props.email_1):(''),
            email_2: this.props.email_2 ? (this.props.email_2):(''),
            email_fsx: this.props.email_fsx ? (this.props.email_fsx):(''),
            mobil_telefon_1: this.props.mobil_telefon_1 ? (this.props.mobil_telefon_1):(''),
            mobil_telefon_2: this.props.mobil_telefon_2 ? (this.props.mobil_telefon_2):(''),
            mobil_telefon_fsx: this.props.mobil_telefon_fsx ? (this.props.mobil_telefon_fsx):(''),
            telefon_1: this.props.telefon_1 ? (this.props.telefon_1):(''),
            telefon_2: this.props.telefon_2 ? (this.props.telefon_2):(''),
            telefon_fsx: this.props.telefon_fsx ? (this.props.telefon_fsx):(''),

            //kind_daten
            staatsangehoerigkeit: this.props.staatsangehoerigkeit ? (this.props.staatsangehoerigkeit):(''),
            geburtsort: this.props.geburtsort ? (this.props.geburtsort):(''),
            geschlecht: this.props.geschlecht ? (this.props.geschlecht):(''),
            nichtdeutsche_herkunftssprache: this.props.nichtdeutsche_herkunftssprache ? (this.props.nichtdeutsche_herkunftssprache):(''),

            //kind_schule
            zugangsdatum_zur_fsx: this.props.zugangsdatum_zur_fsx ? (this.props.zugangsdatum_zur_fsx ):(''),
            abgangsdatum_von_fsx: this.props.abgangsdatum_von_fsx ? (this.props.abgangsdatum_von_fsx):(''),
            abgangsgrund:this.props.abgangsgrund ? (this.props.abgangsgrund):(''),
            mittag: this.props.mittag ? (this.props.mittag):(''),

            //kind_betreuung
            betreuung_beginn:this.props.betreuung_beginn ? (this.props.betreuung_beginn):(''),
            betreuung_ende:this.props.betreuung_ende ? (this.props.betreuung_ende):(''),
            betreuung_umfang:this.props.betreuung_umfang ? (this.props.betreuung_umfang):(''),
            betreuung_ferien:this.props.betreuung_ferien ? (this.props.betreuung_ferien):(''),

            //bezugsperson_kind
            bezugspersonen:(this.props.bezugspersonen ? (this.props.bezugspersonen):([])),
            probableBezugspersonen: [],
            bezugsPersonToBeAdded: '',
            bezugsPersonToBeDeleted: '',
            beziehung_zu_person2: '',
            recht_gegenueber_person2: '',

            //haushalte
            haushalte: (this.props.haushalte ? (this.props.haushalte):([])),
            probableHaushalte: [],
            haushalteToBeAdded: '',
            haushaltToBeDeleted: '',
            meldeanschrift:null,
            datum_einzug:this.defaultDateValue,

            //lerngruppen
            lerngruppen:[],
            probableLerngruppen:[],
            lerngruppeToBeAdded: '',
            eintrittsdatum:this.defaultDateValue,
            lerngruppeToBeDeleted:'',

            //jahrgangswechsel
            jahrgangswechselRecords: [],
            datum: this.defaultDateValue,
            wert: '',
            grund:'',
            jahrgangToBeDeleted:'',

            //BuT
            but_beginn: this.defaultDateValue,
            but_ende: this.defaultDateValue,
            berlinpass_but: '',
            butToBeDeleted: '',
            butRecords: [],

            //AGs
            ags: [],
            probableAgs: [],
            agToBeAdded: '',
            koordination_der_ag: '',
            datum_mitgliedschaftsbeginn: this.defaultDateValue,
            datum_mitgliedschaftsende: '',
            agToBeDeleted: '',

            //tätigkeit
            taetigkeit_beginn: this.defaultDateValue,
            taetigkeit_ende:'',
            typ:'',
            taetigkeit:'',
            taetigkeitToBeDeleted: '',
            taetigkeitRecords: [],

            //Vereinsmitgliedschaft
            mitgliedschaftsbeginn: this.props.typ === "aktiv" ? (dateToENFormat(new Date(this.props.mitgliedschaftsbeginn))):(''),
            typ_m: this.props.typ === "aktiv" ? (this.props.typ):(''),
            mitgliedschaftsende: (this.props.typ === "aktiv" && this.props.mitgliedschaftsende !== null) ? 
                (dateToENFormat(new Date(this.props.mitgliedschaftsende))):(''),
            grund_fuer_mitgliedschaftsende: this.props.typ === "aktiv" ? (this.props.grund_fuer_mitgliedschaftsende):(''),
            mitgliedschaftToBeDeleted: '',
            mitgliedschaftsRecords: [],




        }
    }

    handleChange(e){
        if((e.target.id).includes('datum')){
            this.setState({ [e.target.id]: e.target.value})
        }else{
            this.setState({ [e.target.id]: e.target.value })
        }
        console.log(e.target.id + ":" + e.target.value)
    }


    async fetchProbable(queryName){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/${queryName}`, {
            
            }))
    }
    //general query to fetch records of given table to populate options in selects
    async fetchPersonsDataMultitable(table1, table2, sortByColumn){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/dataMultitablePerson`, {
            params: {
                table1: table1,
                table2: table2,
                person_id: this.state.person_id,
                sortByColumn: sortByColumn
                },
            }))
    }

    //general query to fetch records of given table to populate options in selects
    async fetchPersonsRecords(table, sortByColumn){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsRecords`, {
            params: {
                table: table,
                person_id: this.state.person_id,
                sortByColumn: sortByColumn
                },
            }))
    }


    async updateQuery(){
        var stateObj = this.state;
        var dataArr = Object.values(stateObj);
        console.log(dataArr)
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/editPerson`, {
           params: {
               state: dataArr
           } 
      })
       )
    }

    //deletes all records from a table with the given id
    async deleteQueryPerson(table){
        console.log(table)
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/deletePersonData`, {
           params: {
               table: table,
               person_id: this.state.person_id
           } 
      })
       )
    }

    //the 2nd parameter is an array containing all values which are part of the primary key
    //of the given table in the 1st parameter
    //the 3rd parameter contains an array with names of the columns part of the PM except that of perso_id
    // which always the same for each table
    async deleteQueryKind(table, id, columnNames){
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/deleteKindData`, {
           params: {
               table: table,
               id: id,
               columnNames: columnNames 
           } 
      })
       )
    }

    // populates optios for selects when component mounts
    componentDidMount() {
        this.fetchProbable('personsList').then(res => {
          
          let erwachsene = [];
          res.data.forEach(person => {
              //console.log(person.rufname)
              if(!person.einschulungsdatum){ erwachsene.push(
                  Object.create({person_id:person.person_id, rufname:person.rufname, nachname:person.nachname}))
              }
          });
          this.setState({
            probableBezugspersonen: erwachsene
          })
        });

        this.fetchProbable('hausList').then(res => {
          
            let haushalte = [];
            res.data.forEach(haus => {
                //console.log(person.rufname)
                haushalte.push(
                    Object.create({haushalt_id:haus.haushalt_id, 
                                strasse:haus.strasse,
                                plz:haus.postleitzahl}))
                
            });
            this.setState({
              probableHaushalte: haushalte
            })
          });

        this.fetchProbable('lerngruppenList').then(res => {
          
            let lerngruppen = [];
            res.data.forEach(gruppe => {
                //console.log(gruppe.bezeichnung)
                lerngruppen.push(
                    Object.create({lerngruppe_id:gruppe.lerngruppe_id, 
                                bezeichnung:gruppe.bezeichnung,
                                }))
                
            });
            this.setState({
              probableLerngruppen: lerngruppen
            })
          });

        this.fetchProbable('agList').then(res => {
        
        let arbeitsgruppen = [];
        res.data.forEach(gruppe => {
            //console.log(gruppe.bezeichnung)
            arbeitsgruppen.push(
                Object.create({arbeitsgruppe_id:gruppe.arbeitsgruppe_id, 
                            bezeichnung:gruppe.bezeichnung,
                            }))
            
        });
        this.setState({
            probableAgs: arbeitsgruppen
        })
        //console.log(this.state.ags)
        });

        this.fetchPersonsDataMultitable("kind_lerngruppe", "lerngruppen", "eintrittsdatum").then(res => {
        
            let lerngruppen = [];
            res.data.forEach(gruppe => {
                lerngruppen.push(
                    Object.create({ 
                                lerngruppe_id: gruppe.lerngruppe_id,
                                bezeichnung:gruppe.bezeichnung,
                                eintrittsdatum: gruppe.eintrittsdatum
                                }))
                
            });
            this.setState({
                lerngruppen: lerngruppen
            })
        });

        this.fetchPersonsDataMultitable("person_arbeitsgruppe", "arbeitsgruppen", "bezeichnung").then(res => {
        
            let arbeitsgruppen = [];
            res.data.forEach(gruppe => {
                arbeitsgruppen.push(
                    Object.create({ 
                                arbeitsgruppe_id: gruppe.arbeitsgruppe_id,
                                bezeichnung:gruppe.bezeichnung,
                                datum_mitgliedschaftsbeginn: gruppe.datum_mitgliedschaftsbeginn
                                }))
                
            });
            this.setState({
                ags: arbeitsgruppen
            })
        });

        this.fetchPersonsRecords('jahrgangswechsel', 'datum').then(res => {
        
            let jahrgangswechseln = [];
            res.data.forEach(record => {
                jahrgangswechseln.push(
                    Object.create({ 
                                datum: record.datum,
                                wert:record.wert,
                                grund: record.grund
                                }))
                
            });
            this.setState({
                jahrgangswechselRecords: jahrgangswechseln
            })
        });

        this.fetchPersonsRecords('kind_but', 'but_ende').then(res => {
        
            let but = [];
            res.data.forEach(record => {
                but.push(
                    Object.create({ 
                                but_beginn: record.but_beginn,
                                but_ende:record.but_ende,
                                berlinpass_but: record.berlinpass_but
                                }))
                
            });
            this.setState({
                butRecords: but
            })
        });

        this.fetchPersonsRecords('taetigkeit', 'taetigkeit_beginn').then(res => {
        
            let taetigkeiten = [];
            res.data.forEach(record => {
                taetigkeiten.push(
                    Object.create({ 
                                taetigkeit_beginn: record.taetigkeit_beginn,
                                taetigkeit_ende:record.taetigkeit_ende,
                                typ: record.typ,
                                taetigkeit: record.taetigkeit
                                }))
                
            });
            this.setState({
                taetigkeitRecords: taetigkeiten
            })
        });

        this.fetchPersonsRecords('vereinsmitgliedschaft', 'mitgliedschaftsbeginn').then(res => {
        
            let mitgliedschaften = [];
            res.data.forEach(record => {
                mitgliedschaften.push(
                    Object.create({ 
                                mitgliedschaftsbeginn: record.mitgliedschaftsbeginn,
                                typ: record.typ,
                                mitgliedschaftsende: record.mitgliedschaftsende,
                                grund_fuer_mitgliedschaftsende: record.grund_fuer_mitgliedschaftsende
                                }))
                
            });
            this.setState({
                mitgliedschaftsRecords: mitgliedschaften
            })
        });

        


      }

    
    // edits DB for changed data in the form
    editData(){
        //input validation
        let validationSuccess = false;
        //get all invalid inputs
        let invalidInputFields = document.querySelectorAll(':invalid');
        //console.log(invalidInputFields)

        if(invalidInputFields.length > 0){
            window.alert('Bitte kontrollieren Sie alle rot gekennzeichnete Input Felder und versuchen Sie es erneut!')
        }else if(invalidInputFields.length === 0) validationSuccess = true;

        if(validationSuccess){
            var confirm = window.confirm('Diese Aktion wird die Daten direkt in der Datenbank bearbeiten!!! Bist du sicher dass diese Korrekt sind?')
            if(confirm){
            this.updateQuery().then(res =>{
                if(typeof(res.data) == 'string'){
                    //console.log("This is the Err: ")
                    console.log(res.data)
                    window.alert(res.data);
                }else{
                    //console.log("confirm")
                    confirm = false;
                    if(!confirm)window.location.reload();
                    //console.log(res);
                }
            }).catch(err =>{console.log(err)})
            }
        }
    }

    //delete Kindbezogenen Daten
    deleteKindData(){
        var confirm = window.confirm("ACHTUNG!!! Diese Aktion wird alle Kind bezogene Daten für dieses Kind löschen!")
        
        if(confirm){

            this.deleteQueryKind(
                'kind_schule',
                [this.state.person_id, this.state.zugangsdatum_zur_fsx],
                ['zugangsdatum_zur_fsx']
                );

            this.deleteQueryPerson('kind_daten')

            this.deleteQueryKind(
                'kind_betreuung',
                [this.state.person_id, this.state.betreuung_beginn, this.state.betreuung_ende],
                ['betreuung_beginn', 'betreuung_ende']
                )
            
            .then(result=>{
                console.log("confirm")
                confirm = false;
                //last delete query refreshes the page
                if(!confirm)window.location.reload()
                console.log(result)
            });
        }
    }

    // delete general Person Data by given table
    deletePersonData(e){
        //console.log(e.target.id)
        let table = e.target.id;
        console.log(table);

        var confirm = window.confirm(
                    `ACHTUNG!!! Diese Aktion wird ${table === 'personen' ? 
                    ('dieser Person und alle seine Daten von allen Tabellen komplett vom DB')
                    :("alle " + table + " Einträge dieser Person")} löschen!`
            )
        
        if(confirm){
            this.deleteQueryPerson(table)
            .then(result=>{
                console.log("confirm")
                confirm = false;
                //last delete query refreshes the page
                if(!confirm)window.location.reload()
                console.log(result)
            });
    }
    }
   

    render(){
        
        return(
            <div>
                <button type='button' onClick={this.editData}>Speichern</button>
                <div className='edit-person-cont'>
                    {/* allgemeine Personrelevante Daten */}  
                    <div className='bg-cont' style={({backgroundColor: "#74a3ed"})}>
                        <h3 style={({textAlign: "center"})}>Personrelevanten Daten</h3>
                        {/* Kerndaten */}
                        <div className='edit-person-data-cont'>
                            <h4>Edit Kerndaten</h4>
                            
                        
                            <label >Person ID:</label>
                            <input type='text' className='text-input' name='person_id' value={this.state.person_id}readOnly></input>
                            <br></br>

                            <label >Rufname:</label>
                            <input type='text' className='text-input' id='rufname' value={this.state.rufname} 
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]*$' ></input>
                            <br></br>

                            <label >Amtlicher Vorname:</label>
                            <input type='text' className='text-input' id='amtlicher_vorname' value={this.state.amtlicher_vorname} 
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]*$' ></input>
                            <br></br>

                            <label >Nachname:</label>
                            <input type='text' className='text-input' id='nachname' value={this.state.nachname} 
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]*$' ></input>
                            <br></br>

                            <label >Geburtsdatum:</label>
                            <input type='date' id='geburtsdatum' value={
                                this.state.geburtsdatum ?
                                (dateToENFormat(new Date(this.state.geburtsdatum))):('')} 
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label >Einschulungsdatum:</label>
                            <input type='date' id='einschulungsdatum' 
                            value={
                                this.state.einschulungsdatum ? 
                                (dateToENFormat(new Date(this.state.einschulungsdatum))):('')
                            }
                            min={
                                this.state.geburtsdatum ?
                                (dateToENFormat(new Date(this.state.geburtsdatum))):('')
                            } 
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label >Nicht auf Listen:</label>
                            <select id='nicht_auf_listen' value={this.state.nicht_auf_listen} 
                            onChange= {this.handleChange} >
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                            </select>
                            <br></br>

                            <div className='delete-section'>
                            <button 
                                className='delete-buttons' 
                                id='personen' type='button'
                                onClick={this.deletePersonData}
                            >Person löschen</button>
                            </div>
                        </div>

                        {/* Contact Data */}
                        <div className='edit-person-data-cont'>
                            <h4>Kontaktdaten</h4>

                            <label>E-Mail 1: </label>
                            <input type='email' id='email_1' value={this.state.email_1} 
                            onChange= {this.handleChange}  ></input>
                            <br></br>

                            <label>E-Mail 2: </label>
                            <input type='email' id='email_2' value={this.state.email_2} 
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label>E-Mail FSX: </label>
                            <input type='email' id='email_fsx' value={this.state.email_fsx} 
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label>Mobil 1: </label>
                            <input type='tel' id='mobil_telefon_1' value={this.state.mobil_telefon_1}
                            pattern='^[0-9+][0-9-()]*$' 
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label>Mobil 2: </label>
                            <input type='tel' id='mobil_telefon_2' value={this.state.mobil_telefon_2} 
                            pattern='^[0-9+][0-9-()]*$'
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label>Mobil FSX: </label>
                            <input type='tel' id='mobil_telefon_fsx' value={this.state.mobil_telefon_fsx} 
                            pattern='^[0-9+][0-9-()]*$'
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label>Tel 1: </label>
                            <input type='tel' id='telefon_1' value={this.state.telefon_1} 
                            pattern='^[0-9+][0-9-()]*$'
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label>Tel 2: </label>
                            <input type='tel' id='telefon_2' value={this.state.telefon_2} 
                            pattern='^[0-9+][0-9-()]*$'
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label>Tel FSX: </label>
                            <input type='tel' id='telefon_fsx' value={this.state.telefon_fsx} 
                            pattern='^[0-9+][0-9-()]*$'
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <div className='delete-section'>
                            <button 
                                className='delete-buttons' 
                                id='kontakt_daten' type='button'
                                onClick={this.deletePersonData}
                            >Kontaktdaten löschen</button>
                            </div>

                        </div>

                        {/* Haushalte */}
                        <div className='edit-person-data-cont'>
                            <h4>Haushalte</h4>
                                

                                <label>Neues Haushalt für diese Person hinzufügen: </label>
                                <select id='haushalteToBeAdded' onChange= {this.handleChange}>
                                    <option selected value=''>-</option>

                                    {this.state.probableHaushalte.map((haus) => 
                                    <option key={uuidv4()} value={haus.haushalt_id}>{haus.strasse +' ' + haus.plz}</option>)}
                                    
                                </select>
                                <label>Meldeanschrift: </label>
                                <select id='meldeanschrift' onChange= {this.handleChange}>
                                    <option defaultValue="true" value={null}>-</option>
                                    <option value='0'>False</option>
                                    <option value='1'>True</option>
                                </select>

                                <label>Einzugsdatum: </label>
                                <input type="date" id="datum_einzug" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.geburtsdatum ?
                                        (dateToENFormat(new Date(this.state.geburtsdatum))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>
                                
                                <div className='delete-section'>
                                    <label>Existierende Haushalt dieser Person entfernen: </label>
                                    <select id='haushaltToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue="true" value=''>-</option>

                                        {this.state.haushalte.map((haus) => 
                                        <option key={uuidv4()} value={haus.haushalt_id}>{haus.strasse + " " + haus.postleitzahl}</option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='person_haushalt' type='button'
                                        onClick={this.deletePersonData}
                                    >Haushalte löschen</button>
                                </div>
                        </div>
                    </div>
                    
                    {/* Kinderrelevante Daten */}
                    <div className='bg-cont' style={({backgroundColor: "#96ebdd"})}>
                        <h3 style={({textAlign: "center"})}>Kindrelevante Daten</h3>
                        {/* Kind bezogene Daten */}
                        <div className='edit-person-data-cont'>
                            <h4>Kindsdaten</h4>

                            <label>Staatsangehörigkeit: </label>
                            <input type='text' id='staatsangehoerigkeit' value={this.state.staatsangehoerigkeit} 
                            onChange= {this.handleChange} pattern='[A-Z]{0,3}'></input>
                            <br></br>

                            <label>Geburtsort: </label>
                            <input type='text' id='geburtsort' value={this.state.geburtsort} 
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]*$' ></input>
                            <br></br>

                            <label>Geschlecht: </label>
                            <select id='geschlecht' value={this.state.geschlecht} 
                            onChange= {this.handleChange} >
                                <option value='' defaultValue="true" disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                <option value='m'>m</option>
                                <option value='f'>f</option>
                                <option value='n'>n</option>
                            </select>
                            <br></br>

                            <label>nicht deutsche Herkunftssprache: </label>
                            <select id='nichtdeutsche_herkunftssprache' value={this.state.nichtdeutsche_herkunftssprache} 
                            onChange= {this.handleChange} >
                                <option value='' defaultValue disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                            </select>
                            <br></br>

                            <label >Zugang zu FSX:</label>
                            <input type='date' id='zugangsdatum_zur_fsx' 
                            value={
                                this.state.zugangsdatum_zur_fsx ? 
                                (dateToENFormat(new Date(this.state.zugangsdatum_zur_fsx))):('')
                            } 
                            min={
                                this.state.einschulungsdatum ?
                                (dateToENFormat(new Date(this.state.einschulungsdatum))):('')
                            }
                            onChange= {this.handleChange} >
                                
                            </input>
                            <br></br>

                            <label >Abgang vom FSX:</label>
                            <input type='date' id='abgangsdatum_von_fsx' 
                            value={
                                this.state.abgangsdatum_von_fsx ? 
                                (dateToENFormat(new Date(this.state.abgangsdatum_von_fsx))):('')
                            } 
                            onChange= {this.handleChange} 
                                min= {
                                this.state.zugangsdatum_zur_fsx ? 
                                (dateToENFormat(new Date(this.state.zugangsdatum_zur_fsx))):('')
                                } >
                                </input>
                            <br></br>

                            <label>Abgangsgrund: </label>
                            <select id='abgangsgrund' value={this.state.abgangsgrund} 
                            onChange= {this.handleChange} >
                                <option defaultValue value=''>-</option> {/*default option when no data from database for selected person*/}
                                <option value='Elternwunsch'>Elternwunsch</option>
                                <option value='Wegzug'>Wegzug</option>
                                <option value='Umzug'>Umzug</option>
                                <option value='Uebergang Sekundarstufe'>Übergang Sekundarstufe</option>
                                <option value='Sonstiges'>Sonstiges</option>
                            </select>
                            <br></br>

                            <label >Mittag:</label>
                            <select id='mittag' value={this.state.mittag} 
                            onChange= {this.handleChange} >
                                <option value='' defaultValue>-</option> {/*default option when no data from database for selected person*/}
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                            </select>
                            <br></br>

                            <label >Betreuung Beginn:</label>
                            <input type='date' id='betreuung_beginn' 
                            value={
                                this.state.betreuung_beginn ? 
                                (dateToENFormat(new Date(this.state.betreuung_beginn))):('')
                            }
                            min={
                                this.state.zugangsdatum_zur_fsx ?
                                (dateToENFormat(new Date(this.state.zugangsdatum_zur_fsx))):('')
                            } 
                            onChange= {this.handleChange} ></input>
                            <br></br>

                            <label >Betreuung Ende:</label>
                            <input type='date' id='betreuung_ende' 
                            value={
                                this.state.betreuung_ende ? 
                                (dateToENFormat(new Date(this.state.betreuung_ende))):('')
                            } 
                            onChange= {this.handleChange} 
                            min={
                                this.state.betreuung_beginn ? 
                                (dateToENFormat(new Date(this.state.betreuung_beginn))):('')
                            }>

                            </input>
                            <br></br>

                            <label >Betreuung Umfang:</label>
                            <select id='betreuung_umfang' value={this.state.betreuung_umfang} 
                            onChange= {this.handleChange} >
                                <option defaultValue disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                <option value='16:00'>16:00</option>
                                <option value='18:00'>18:00</option>
                            </select>
                            <br></br>

                            <label >Betreuung Ferien:</label>
                            <select id='betreuung_ferien' value={this.state.betreuung_ferien} 
                            onChange= {this.handleChange} >
                                <option value='' defaultValue disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                            </select>
                            <br></br>
                            
                            <div className='delete-section'>
                                <button className='delete-buttons' type='button' onClick={this.deleteKindData}>
                                    Kindsdaten löschen</button>
                            </div>


                        </div>
                        
                        {/* Lerngruppen */}
                        <div className='edit-person-data-cont'>
                            <h4>Lerngruppen</h4>
                                

                                <label>Neuer Lerngruppe Eintrag für diese Person hinzufügen: </label>
                                <select id='lerngruppeToBeAdded' onChange= {this.handleChange}>
                                    <option defaultValue value=''>-</option>

                                    {this.state.probableLerngruppen.map((gruppe) => 
                                    <option key={uuidv4()} value={gruppe.lerngruppe_id}>{gruppe.bezeichnung}</option>)}
                                    
                                </select>

                                <label>Eintrittsdatum: </label>
                                <input type="date" id="eintrittsdatum" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.zugangsdatum_zur_fsx ? 
                                        (dateToENFormat(new Date(this.state.zugangsdatum_zur_fsx))):('')
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>
                                
                                <div className='delete-section'>
                                    <label>Existierende Lerngruppe Einträge dieser Person entfernen: </label>
                                    <select id='lerngruppeToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue value=''>-</option>

                                        {this.state.lerngruppen.map((gruppe) => 
                                        <option key={uuidv4()} value={gruppe.lerngruppe_id}>{gruppe.bezeichnung 
                                        + " Eintritt am: " + dateToDEFormat(new Date(gruppe.eintrittsdatum))}</option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='kind_lerngruppe' type='button'
                                        onClick={this.deletePersonData}
                                        
                                    >Alle Lerngruppen löschen</button>
                                </div>
                        </div>

                        {/* Bezugspersonen */}
                        <div className='edit-person-data-cont'>
                            <h4>Bezugspersonen</h4>
                                

                                <label>Neue Person für dieses Kind addieren: </label>
                                <select id='bezugsPersonToBeAdded' onChange= {this.handleChange}>
                                    <option defaultValue value=''>-</option>

                                    {this.state.probableBezugspersonen.map((person) => 
                                    <option key={uuidv4()} value={person.person_id}>{person.rufname + " " + person.nachname}</option>)}
                                    
                                </select>
                                <label>Beziehung zum Kind: </label>
                                <select id='beziehung_zu_person2' onChange= {this.handleChange}>
                                    <option defaultValue value={null}>-</option>
                                    <option value='Elternteil'>Elternteil</option>
                                    <option value='Andere'>Andere</option>
                                </select>

                                <label>Recht gegenüber Kind: </label>
                                <select id='recht_gegenueber_person2' onChange= {this.handleChange}>
                                    <option defaultValue value={null}>-</option>
                                    <option value='Sorgerecht'>Sorgerecht</option>
                                    <option value='Umgangsrecht/Abholen'>Umgangsrecht/Abholen</option>
                                    <option value='Keine'>Keine</option>
                                </select>
                                <br></br>
                                
                                <div className='delete-section'>
                                    <label>Existierende Bezugspersonen fürs Kind entfernen: </label>
                                    <select id='bezugsPersonToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue value=''>-</option>

                                        {this.state.bezugspersonen.map((person) => 
                                        <option key={uuidv4()} value={person.person_id}>{person.rufname + " " + person.nachname}</option>)}
                                        
                                    </select>
                                    <br></br>


                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='bezugsperson_kind' type='button'
                                        onClick={this.deletePersonData}
                                    >Alle Bezugspersonen löschen</button>
                                </div>
                        </div>

                        {/* Jahrgangswechsel */}
                        <div className='edit-person-data-cont'>
                            <h4>Jahrgangswechsel</h4>
                                

                                <label>Neuer Jahrgangswechsel Eintrag für diese Person hinzufügen: </label>
                                <label>Datum: </label>
                                <input type="date" id="datum" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.einschulungsdatum ? 
                                        (dateToENFormat(new Date(this.state.einschulungsdatum))):('')
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label >Wert:</label>
                                <select id='wert'  
                                onChange= {this.handleChange} >
                                    <option defaultValue disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                    <option value='-1'>-1</option>
                                    <option value='1'>1</option>
                                </select>
                                <br></br>

                                <label>Grund: </label>
                                <select id='grund' 
                                onChange= {this.handleChange} >
                                    <option defaultValue value=''>-</option> {/*default option when no data from database for selected person*/}
                                    <option value='Verkuerzung Schulanfangsphase (Klasse 1 und 2)'>Verkürzung Schulanfangsphase (Klasse 1 und 2)</option>
                                    <option value='Verlaengerung Schulanfangsphase (Klasse 1 und2)'>Verlängerung Schulanfangsphase (Klasse 1 und2)</option>
                                    <option value='Ueberspringen (Klasse 3 bis 6)'>Überspringen (Klasse 3 bis 6)</option>
                                    <option value='Wiederholung (Klasse 3 bis 6)'>Wiederholung (Klasse 3 bis 6)</option>
                                    <option value='Freiwillige Wiederholung (Klasse 3 bis 6)'>Freiwillige Wiederholung (Klasse 3 bis 6)</option>
                                    <option value='Ruecktritt (Klasse 3 bis 6)'>'Rücktritt (Klasse 3 bis 6)</option>
                                </select>
                                <br></br>
                                
                                <div className='delete-section'>
                                    <label>Existierende Jahrgangswechsel Einträge dieser Person entfernen: </label>
                                    <select id='jahrgangToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue >-</option>

                                        {this.state.jahrgangswechselRecords.map((record) => 
                                        <option key={uuidv4()} value={dateToENFormat(new Date(record.datum))}>{"Wert: "+record.wert + " Grund: " + record.grund 
                                        + "  von: " + dateToDEFormat(new Date(record.datum))}</option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='jahrgangswechsel' type='button'
                                        onClick={this.deletePersonData}
                                    >Alle Jahrgangswechsel löschen</button>
                                </div>
                        </div>

                        {/* BuT */}
                        <div className='edit-person-data-cont'>
                            <h4>BuT</h4>
                                

                                <label>Neuer BuT Eintrag für diese Person hinzufügen: </label>
                                <label>BuT Beginn: </label>
                                <input type="date" id="but_beginn" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.einschulungsdatum ? 
                                        (dateToENFormat(new Date(this.state.einschulungsdatum))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label>BuT Ende: </label>
                                <input type="date" id="but_ende" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.but_beginn ? 
                                        (dateToENFormat(new Date(this.state.but_beginn))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label >Berlinpass BuT:</label>
                                <select id='berlinpass_but'  
                                onChange= {this.handleChange} >
                                    <option defaultValue disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                </select>
                                <br></br>

                                <div className='delete-section'>      
                                    <label>Existierende BuT Einträge dieser Person entfernen: </label>
                                    <select id='butToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue >-</option>

                                        {this.state.butRecords.map((record) => 
                                        <option key={uuidv4()} value={dateToENFormat(new Date(record.but_beginn))}>{"Beginn: "+ dateToDEFormat(new Date(record.but_beginn)) 
                                                                                                    + " Ende: " + dateToDEFormat(new Date(record.but_ende))
                                                                                                    + " Ber.Pass: " + (record.berlinpass_but ? ("True"):("False"))
                                                                                                    }
                                                                                                    </option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>                                                   
                                    <button 
                                        className='delete-buttons' 
                                        id='kind_but' type='button'
                                        onClick={this.deletePersonData}
                                    >Alle BuT löschen</button>
                                </div>  
                        </div>
                    </div>

                    <div className='bg-cont' style={({backgroundColor: "#e6ebae"})}>
                        <h3 style={({textAlign: "center"})}>Erwachsenenrelevante Daten</h3>

                        {/* Arbeitsgruppen */}
                        <div className='edit-person-data-cont'>
                            <h4>Arbeitsgruppen</h4>
                                

                                <label>Neuer Arbeitsgruppe hinzufügen: </label>
                                <select id='agToBeAdded' onChange= {this.handleChange}>
                                    <option defaultValue value=''>-</option>

                                    {this.state.probableAgs.map((ag) => 
                                    <option key={uuidv4()} value={ag.arbeitsgruppe_id}>{ag.bezeichnung}</option>)}
                                    
                                </select>

                                <label >Koordination:</label>
                                <select id='koordination_der_ag'  
                                onChange= {this.handleChange} >
                                    <option defaultValue disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                </select>
                                <br></br>

                                <label>Mitgliedschaftsbeginn: </label>
                                <input type="date" id="datum_mitgliedschaftsbeginn" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.geburtsdatum ? 
                                        (dateToENFormat(new Date(this.state.geburtsdatum))):('')
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label>Mitgliedschaftsende: </label>
                                <input type="date" id="datum_mitgliedschaftsende" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.mitgliedschaftsbeginn ?
                                        (dateToENFormat(new Date(this.state.mitgliedschaftsbeginn))):('')
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>
                                
                                <div className='delete-section'>
                                    <label>Existierende AG Mitgliedschaften dieser Person entfernen: </label>
                                    <select id='agToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue value=''>-</option>

                                        {this.state.ags.map((ag) => 
                                        <option key={uuidv4()} value={ag.arbeitsgruppe_id}>{ag.bezeichnung 
                                        + " Eintritt am: " + dateToDEFormat(new Date(ag.datum_mitgliedschaftsbeginn))}</option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='person_arbeitsgruppe' type='button'
                                        onClick={this.deletePersonData}
                                        
                                    >Alle Arbeitsgruppen löschen</button>
                                </div>
                        </div>

                        {/* Tätigkeit */}
                        <div className='edit-person-data-cont'>
                            <h4>Tätigkeit</h4>
                                

                                <label>Neuer Tätigkeit für diese Person hinzufügen: </label>
                                <label>Tätigkeitsbeginn: </label>
                                <input type="date" id="taetigkeit_beginn" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.geburtsdatum ?
                                        (dateToENFormat(new Date(this.state.geburtsdatum))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label>Tätigkeitsende: </label>
                                <input type="date" id="taetigkeit_ende" name="sl-date"
                                    defaultValue={null}
                                    min={
                                        this.state.taetigkeit_beginn ?
                                        (dateToENFormat(new Date(this.state.taetigkeit_beginn))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label>Typ: </label>
                                <select id='typ' 
                                onChange= {this.handleChange} >
                                    <option defaultValue value=''>-</option> {/*default option when no data from database for selected person*/}
                                    <option value='Freiwilligendienst'>Freiwilligendienst</option>
                                    <option value='Ehrenamt'>Ehrenamt</option>
                                    <option value='Praktikum'>Praktikum</option>
                                    <option value='Honorartaetigkeit'>Honorartaetigkeit</option>
                                    <option value='extern'>extern</option>
                                    <option value='Kollektiv'>Kollektiv</option>
                                    <option value='Arbeitsverhaeltniss'>Arbeitsverhaeltniss</option>
                                </select>
                                <br></br>

                                <label>Tätigkeit: </label>
                                <select id='taetigkeit' 
                                onChange= {this.handleChange} >
                                    <option defaultValue value=''>-</option> {/*default option when no data from database for selected person*/}
                                    <option value='Lehrkraefte mit Unterrichtsbefaehigung'>Lehrkräfte mit Unterrichtsbefähigung</option>
                                    <option value='Lehrkraefte ohne Unterrichtsbefaehigung'>Lehrkräfte ohne Unterrichtsbefähigung</option>
                                    <option value='Sonstige Lehrkraft'>Sonstige Lehrkraft</option>
                                    <option value='Paedagogische Fachkraefte eFoeB'>Pädagogische Fachkräfte eFoeB</option>
                                    <option value='Sonstige paedagogische Kraft Ganztag'>Sonstige pädagogische Kraft Ganztag</option>
                                    <option value='Verwaltungskraft'>Verwaltungskraft</option>
                                    <option value='Kuechenkraft'>Küchenkraft</option>
                                    <option value='Kuechenhilfe'>Küchenhilfe</option>
                                    <option value='Reinigungskraft'>Reinigungskraft</option>
                                    <option value='Hausmeister*in'>Hausmeister*in</option>
                                    <option value='Schulhilfe'>Schulhilfe</option>
                                </select>
                                <br></br>

                                
                                <div className='delete-section'>      
                                    <label>Existierende Tätigkeit dieser Person entfernen: </label>
                                    <select id='taetigkeitToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue >-</option>

                                        {this.state.taetigkeitRecords.map((record) => 
                                        <option key={uuidv4()} value={dateToENFormat(new Date(record.taetigkeit_beginn)) + "_" + record.taetigkeit}>
                                            {"Beginn: "+dateToDEFormat(new Date(record.taetigkeit_beginn)) + " Ende: " + (record.taetigkeit_ende ? (dateToDEFormat(new Date(record.taetigkeit_ende))):("null"))
                                            + " Tätigkeit: " + record.taetigkeit}</option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='taetigkeit' type='button'
                                        onClick={this.deletePersonData}
                                    >Alle Tätigkeiten löschen</button>
                                </div>  
                        </div>

                        {/* Vereinsmitgliedschaft */}
                        <div className='edit-person-data-cont'>
                            <h4>Vereinsmitgliedschaft</h4>
                                

                                <label>Neuer Vereinsmitgliedschaft für diese Person hinzufügen: </label>
                                <label>Mitgliedschaftsbeginn: </label>
                                <input type="date" id="mitgliedschaftsbeginn" name="sl-date"
                                    defaultValue={this.state.defaultDateValue}
                                    min={
                                        this.state.geburtsdatum ?
                                        (dateToENFormat(new Date(this.state.geburtsdatum))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label>Mitgliedschaftsende: </label>
                                <input type="date" id="mitgliedschaftsende" name="sl-date"
                                    defaultValue={this.state.defaultDateValue}
                                    min={
                                        this.state.taetigkeit_beginn ?
                                        (dateToENFormat(new Date(this.state.taetigkeit_beginn))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label>Typ: </label>
                                <select id='typ_m' 
                                // defaultValue={this.state.typ_m ? (this.state.typ_m):(null)}
                                onChange= {this.handleChange} >
                                    <option defaultValue value=''>-</option> default option when no data from database for selected person
                                    <option value='aktiv'>Aktiv</option>
                                    <option value='foerdernd'>Fördernd</option>
                                </select>
                                <br></br>


                                <label>Grund für Mitgliedschaftsende: </label>
                                <select id='grund_fuer_mitgliedschaftsende' 
                                onChange= {this.handleChange} >
                                    <option defaultValue value=''>-</option> {/*default option when no data from database for selected person*/}
                                    <option value='Austritt'>Austritt</option>
                                    <option value='Ausschluss'>Ausschluss</option>
                                    <option value='Tod'>Tod</option>
                                    <option value='Streichung'>Streichung</option>
                                    <option value='Ende des Schulbesuchs'>Ende des Schulbesuchs</option>
                                    <option value='Ende des Arbeitsverhaeltnisses'>Ende des Arbeitsverhältnisses</option>
                                    <option value='Sonstiges'>Sonstiges</option>
                                </select>
                                <br></br>

                                <div className='delete-section'>
                                    <label>Existierende Vereinsmitgliedschaft dieser Person entfernen: </label>
                                    <select id='mitgliedschaftToBeDeleted' onChange= {this.handleChange}>
                                        <option defaultValue >-</option>
                                        {this.state.mitgliedschaftsRecords.map((record) => 
                                        <option key={uuidv4()} value={this.state.person_id + "_" + dateToENFormat(new Date(record.mitgliedschaftsbeginn))}>
                                            {"Beginn: "+dateToDEFormat(new Date(record.mitgliedschaftsbeginn)) + " Ende: " + (record.mitgliedschaftsende ? (dateToDEFormat(new Date(record.mitgliedschaftsende))):("null"))
                                            + " Typ: " + record.typ}</option>)}
                                        
                                    </select>
                                    <br></br>
                                    
                                    <label>Oder: </label>
                                    <button 
                                    className='delete-buttons' 
                                    id='vereinsmitgliedschaft' type='button'
                                    onClick={this.deletePersonData}
                                >Alle Vereinmitgliedschaften löschen</button>
                                </div>
                        </div>
                       
                    </div>
                    
                </div>
            </div>
        )
    }
}


