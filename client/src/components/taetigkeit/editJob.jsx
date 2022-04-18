import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../stylesheets/globalstyles.css'
import '../stylesheets/edits.css';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'
import { TouchableNativeFeedbackBase } from 'react-native';
import { v4 as uuidv4 } from 'uuid';



export class EditJob extends React.Component{
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.handleChange = this.handleChange.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.deleteQueryJob = this.deleteQueryJob.bind(this);
        this.editData = this.editData.bind(this);
        this.deleteJobData = this.deleteJobData.bind(this);
        this.fetchProbable = this.fetchProbable.bind(this);
        this.fetchJobDataMultitable = this.fetchJobDataMultitable.bind(this);

        
        this.state = {
            //Kerndaten
            lerngruppe_id: this.props.lerngruppe_id ? (this.props.lerngruppe_id):(''),
            email_eltern: this.props.email_eltern ? (this.props.email_eltern):(''),
            email_team: this.props.email_team ? (this.props.email_team):(''),
            telefon_team: this.props.telefon_team ? (this.props.telefon_team):(''),
            bezeichnung: this.props.bezeichnung ? (this.props.bezeichnung):(''),

            //LG Mitglieder
            mitgliedToBeAdded: '',
            probableMitglieder: [],
            eintrittsdatum: this.defaultDateValue,
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
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/editLg`, {
           params: {
               state: dataArr
           } 
      })
       )
    }

    async fetchProbable(queryName){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/${queryName}`, {
            
            }))
    }

    //general query to fetch records of given table to populate options in selects
    async fetchJobDataMultitable(){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/dataMultitableLg`, {
            params: {
                lerngruppe_id: this.state.lerngruppe_id,
                },
            }))
    }

    //deletes all records from a table with the given id
    async deleteQueryJob(table){
        //console.log(table)
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/deleteJobData`, {
           params: {
               table: table,
               lerngruppe_id: this.state.lerngruppe_id
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
                    if(!confirm)window.location.reload();
                }
            }).catch(err =>{console.log(err)})
            }
        }
    }

    // delete general Haushalt Data by given table
    deleteJobData(e){
        //console.log(e.target.id)
        let table = e.target.id;
        console.log(table);

        var confirm = window.confirm(
                    `ACHTUNG!!! Diese Aktion wird ${table === 'lerngruppen' ? 
                    ('dieser LG und alle seine Daten von allen Tabellen komplett vom DB')
                    :("alle " + table + " Einträge dieses LGs")} löschen!`
            )
        
        if(confirm){
            this.deleteQueryJob(table)
            .then(result=>{
                console.log("confirm")
                confirm = false;
                //last delete query refreshes the page
                if(!confirm)window.location.reload()
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

        this.fetchJobDataMultitable().then(res => {
    
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
        console.log(this.state.mitgliedToBeDeleted)
        return(
     <div>
        <div>
            <button type='button' onClick={this.editData}>Speichern</button>
            <div className='edit-person-cont'>
                {/* allgemeine LG Daten */}
                <div className='bg-cont' style={({backgroundColor: "#74a3ed"})}>
                    <h3 style={({textAlign: "center"})}>LG Daten</h3>
                    {/* Kerndaten */}
                    <div className='edit-person-data-cont'>
                            <h4>Edit Kerndaten</h4>
                            
                            <label >LG ID:</label>
                            <input type='text' className='text-input' name='lerngruppe_id' value={this.state.lerngruppe_id}readOnly></input>
                            <br></br>

                            <label >Bezeichnung:</label>
                            <input type='text' className='text-input' id='bezeichnung' value={this.state.bezeichnung} 
                            onChange= {this.handleChange} pattern="([\w\d\sßöäüÖÄÜ' \.,-?!]){0,100}" ></input>
                            <br></br>

                            <label >telefon_team:</label>
                            <input type='text' className='text-input' id='telefon_team' value={this.state.telefon_team} 
                            onChange= {this.handleChange} pattern="([\w\d\sßöäüÖÄÜ' \.,-?!]){0,100}" ></input>
                            <br></br>

                            <label >E-Mail Eltern:</label>
                            <input type='text' className='text-input' id='email_eltern' value={this.state.email_eltern} 
                            onChange= {this.handleChange}  ></input>
                            <br></br>

                            <label >E-Mail Team:</label>
                            <input type='text' className='text-input' id='email_team' value={this.state.email_team} 
                            onChange= {this.handleChange}  ></input>
                            <br></br>
                        

                            <div className='delete-section'>
                            <button 
                                className='delete-buttons' 
                                id='lerngruppen' type='button'
                                onClick={this.deleteJobData}
                            >LG löschen</button>
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


                                <label>Eintrittsdatum: </label>
                                <input type="date" id="eintrittsdatum" name="sl-date"
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
                                        id='kind_lerngruppe' type='button'
                                        onClick={this.deleteJobData}
                                        
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


