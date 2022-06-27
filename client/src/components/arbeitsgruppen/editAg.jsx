import { SERVER_IP } from '../../globalFunctions';
import React from 'react';
import axios from 'axios';
import '../../stylesheets/globalstyles.css'
import '../../stylesheets/edits.css';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'
import { TouchableNativeFeedbackBase } from 'react-native';
import { v4 as uuidv4 } from 'uuid';



export class EditAg extends React.Component{
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.handleChange = this.handleChange.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.deleteQueryAg = this.deleteQueryAg.bind(this);
        this.editData = this.editData.bind(this);
        this.deleteAgData = this.deleteAgData.bind(this);
        this.fetchProbable = this.fetchProbable.bind(this);
        this.fetchAgDataMultitable = this.fetchAgDataMultitable.bind(this);

        
        this.state = {
            //Kerndaten
            arbeitsgruppe_id: this.props.arbeitsgruppe_id ? (this.props.arbeitsgruppe_id):(''),
            bezeichnung: this.props.bezeichnung ? (this.props.bezeichnung):(''),
            beschreibung: this.props.beschreibung ? (this.props.beschreibung):(''),
            email: this.props.email ? (this.props.email):(''),

            //AG Mitglieder
            mitgliedToBeAdded: '',
            probableMitglieder: [],
            koordination_der_ag:'',
            datum_mitgliedschaftsbeginn: this.defaultDateValue,
            datum_mitgliedschaftsende: this.defaultDateValue,
            mitgliedToBeDeleted: '',
            mitglieder: [],

        
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

    async updateQuery(){
        var stateObj = this.state;
        var dataArr = Object.values(stateObj);
        //console.log(dataArr)
        return(
        await axios.get(`http://${SERVER_IP}:3000/editAg`, {
           params: {
               state: dataArr
           } 
      })
       )
    }

    async fetchProbable(queryName){
        return (
        await axios.get(`http://${SERVER_IP}:3000/${queryName}`, {
            
            }))
    }

    //general query to fetch records of given table to populate options in selects
    async fetchAgDataMultitable(){
        return (
        await axios.get(`http://${SERVER_IP}:3000/dataMultitableAg`, {
            params: {
                arbeitsgruppe_id: this.state.arbeitsgruppe_id,
                },
            }))
    }

    //deletes all records from a table with the given id
    async deleteQueryAg(table){
        //console.log(table)
        return(
        await axios.get(`http://${SERVER_IP}:3000/deleteAgData`, {
           params: {
               table: table,
               arbeitsgruppe_id: this.state.arbeitsgruppe_id
           } 
      })
       )
    }

    // edits DB for changed data in the form
    editData(){
        //input validation
        let validationSuccess = false;
        //get all invalid inputs
        let invalidInputFields = document.querySelectorAll(':invalid');
        

        if(invalidInputFields.length > 0){
            window.alert('Bitte kontrollieren Sie alle rot gekennzeichnete Input Felder und versuchen Sie es erneut!')
        }else if(invalidInputFields.length === 0) validationSuccess = true;

        if(validationSuccess){
            var confirm = window.confirm('Diese Aktion wird die Daten direkt in der Datenbank bearbeiten!!! Bist du sicher dass diese Korrekt sind?')
            if(confirm){
            this.updateQuery().then(res =>{
                if(typeof(res.data) == 'string'){
                    console.log(res.data)
                    window.alert(res.data);
                }else{
                    confirm = false;
                    if(!confirm){
                        sessionStorage.setItem("lastLocation", "Arbeitsgruppen")
                        sessionStorage.setItem("lastId", this.state.arbeitsgruppe_id+this.state.bezeichnung)
                        window.location.reload();
                    }
                }
            }).catch(err =>{console.log(err)})
            }
        }
    }

    // delete general Haushalt Data by given table
    deleteAgData(e){
        //console.log(e.target.id)
        let table = e.target.id;
        console.log(table);

        var confirm = window.confirm(
                    `ACHTUNG!!! Diese Aktion wird ${table === 'arbeitsgruppen' ? 
                    ('dieser AG und alle seine Daten von allen Tabellen komplett vom DB')
                    :("alle " + table + " Einträge dieses AGs")} löschen!`
            )
        
        if(confirm){
            this.deleteQueryAg(table)
            .then(result=>{
                console.log("confirm")
                confirm = false;
                //last delete query refreshes the page
                if(!confirm){
                    sessionStorage.setItem("lastLocation", "Arbeitsgruppen")
                    sessionStorage.setItem("lastId", this.state.arbeitsgruppe_id+this.state.bezeichnung)
                    window.location.reload()
                }
                console.log(result)
            });
    }
    }

    componentDidMount() {
        this.fetchProbable('personsList').then(res => {
          
            let mitglieder = [];
            res.data.forEach(person => {
                //console.log(person.rufname)
                mitglieder.push(
                    Object.create({person_id:person.person_id, rufname:person.rufname, nachname:person.nachname})) 
            });
            this.setState({
              probableMitglieder: mitglieder
            })
          });

        this.fetchAgDataMultitable().then(res => {
    
        let mitglieder = [];
        res.data.forEach(person => {
            mitglieder.push(
                Object.create({ 
                            person_id: person.person_id,
                            rufname: person.rufname,
                            nachname: person.nachname
                            }))
            
        });
        this.setState({
            mitglieder: mitglieder
        })
    });
    }


    render(){
        return(
     <div>
        <div>
            <button type='button' onClick={this.editData}>Speichern</button>
            <div className='edit-person-cont'>
                {/* allgemeine AG Daten */}
                <div className='bg-cont' style={({backgroundColor: "#74a3ed"})}>
                    <h3 style={({textAlign: "center"})}>AG Daten</h3>
                    {/* Kerndaten */}
                    <div className='edit-person-data-cont'>
                            <h4>Edit Kerndaten</h4>
                            
                            <label >AG ID:</label>
                            <input type='text' className='text-input' name='arbeitsgruppe_id' value={this.state.arbeitsgruppe_id}readOnly></input>
                            <br></br>

                            <label >Bezeichnung:</label>
                            <input type='text' className='text-input' id='bezeichnung' value={this.state.bezeichnung} 
                            onChange= {this.handleChange} pattern="([\w\d\sßöäüÖÄÜ' \.,-?!]){0,100}" ></input>
                            <br></br>

                            <label >Beschreibung:</label>
                            <input type='text' className='text-input' id='beschreibung' value={this.state.beschreibung} 
                            onChange= {this.handleChange} pattern="([\w\d\sßöäüÖÄÜ' \.,-?!]){0,100}" ></input>
                            <br></br>


                            <label >E-Mail:</label>
                            <input type='text' className='text-input' id='email' value={this.state.email} 
                            onChange= {this.handleChange}  ></input>
                            <br></br>
                        

                            <div className='delete-section'>
                            <button 
                                className='delete-buttons' 
                                id='arbeitsgruppen' type='button'
                                onClick={this.deleteAgData}
                            >AG löschen</button>
                            </div>
                    </div>
                </div>


                {/* Mitglieder */}                                                                                 
                <div className='bg-cont' style={({backgroundColor: "#e6ebae"})}>
                    <h3 style={({textAlign: "center"})}>Mitglieder editieren</h3>

                        {/* Mitglieder */}
                        <div className='edit-person-data-cont'>
                            <h4>Mitglieder</h4>
                                
                                <label>Neuer Mitglied hinzufügen: </label>
                                <select id='mitgliedToBeAdded' onChange= {this.handleChange} value={this.state.mitgliedToBeAdded}>
                                    <option defaultValue value=''>-</option>

                                    {this.state.probableMitglieder.map((mitglied) => 
                                    <option key={uuidv4()} value={mitglied.person_id}>{mitglied.rufname +  " " + mitglied.nachname}</option>)}  
                                </select>

                                <label >Koordination der AG:</label>
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
                                        this.state.geburtsdatum ? 
                                        (dateToENFormat(new Date(this.state.geburtsdatum))):('')
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <div className='delete-section'>
                                    <label>Existierende Mitglieder dieser AG entfernen: </label>
                                    <select id='mitgliedToBeDeleted' onChange= {this.handleChange} value={this.state.mitgliedToBeDeleted}>
                                        <option defaultValue value=''>-</option>

                                        {this.state.mitglieder.map((mitglied) => 
                                        <option key={uuidv4()} value={mitglied.person_id}>{mitglied.rufname 
                                        + " " + mitglied.nachname}</option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='person_arbeitsgruppe' type='button'
                                        onClick={this.deleteAgData}
                                        
                                    >Alle Mitglieder löschen</button>
                                </div>
                        </div>
                </div>
            </div>
           
        </div>
     </div>
        )
    }
}


