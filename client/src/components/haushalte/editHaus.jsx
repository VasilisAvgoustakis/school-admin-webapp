import { SERVER_IP } from '../../globalFunctions';
import React from 'react';
import axios from 'axios';
import '../../stylesheets/globalstyles.css'
import '../../stylesheets/edits.css';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'
import { TouchableNativeFeedbackBase } from 'react-native';
import { v4 as uuidv4 } from 'uuid';



export class EditHaus extends React.Component{
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.handleChange = this.handleChange.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.deleteQueryHaus = this.deleteQueryHaus.bind(this);
        this.editData = this.editData.bind(this);
        this.deleteHausData = this.deleteHausData.bind(this);
        this.fetchProbable = this.fetchProbable.bind(this);
        this.fetchHausDataMultitable = this.fetchHausDataMultitable.bind(this);

        
        this.state = {
            //Kerndaten
            haushalt_id: this.props.haushalt_id ? (this.props.haushalt_id):(''),
            bezeichnung: this.props.bezeichnung ? (this.props.bezeichnung):(''),
            strasse: this.props.strasse ? (this.props.strasse):(''),
            plz: this.props.plz ? (this.props.plz):(''),
            ort: this.props.ort ? (this.props.ort):(''),
            region: this.props.region ? (this.props.region):(''),
            ort_berlin: this.props.ort_berlin ? (this.props.ort_berlin):(''),
            quart_mgmt: this.props.quart_mgmt ? (this.props.quart_mgmt):(0),
            festnetz: this.props.festnetz ? (this.props.festnetz):(''),
            zusatz: this.props.zusatz ? (this.props.plz):(''),
            land: this.props.land ? (this.props.land):(''),

            //Anwohner
            anwohnerToBeAdded: '',
            probableAnwohner: [],
            meldeanschrift:'',
            datum_einzug: this.defaultDateValue,
            anwohnerToBeDeleted: '',
            anwohner: [],

        
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
        console.log(dataArr)
        return(
        await axios.get(`http://${SERVER_IP}:3000/editHaus`, {
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
    async fetchHausDataMultitable(){
        return (
        await axios.get(`http://${SERVER_IP}:3000/dataMultitableHaus`, {
            params: {
                haushalt_id: this.state.haushalt_id,
                },
            }))
    }

    //deletes all records from a table with the given id
    async deleteQueryHaus(table){
        //console.log(table)
        return(
        await axios.get(`http://${SERVER_IP}:3000/deleteHausData`, {
           params: {
               table: table,
               haushalt_id: this.state.haushalt_id
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
                        sessionStorage.setItem("lastLocation", "Haushalte")
                        sessionStorage.setItem("lastId", this.state.haushalt_id+this.state.plz)
                        window.location.reload();
                    }
                }
            }).catch(err =>{console.log(err)})
            }
        }
    }

    // delete general Haushalt Data by given table
    deleteHausData(e){
        //console.log(e.target.id)
        let table = e.target.id;
        console.log(table);

        var confirm = window.confirm(
                    `ACHTUNG!!! Diese Aktion wird ${table === 'haushalte' ? 
                    ('dieser Haushalt und alle seine Daten von allen Tabellen komplett vom DB')
                    :("alle " + table + " Einträge dieses Hauses")} löschen!`
            )
        
        if(confirm){
            this.deleteQueryHaus(table)
            .then(result=>{
                console.log("confirm")
                confirm = false;
                //last delete query refreshes the page
                if(!confirm){
                    sessionStorage.setItem("lastLocation", "Haushalte")
                    sessionStorage.setItem("lastId", this.state.haushalt_id+this.state.plz)
                    window.location.reload()
                    //console.log(result)
                }
            });
    }
    }

    componentDidMount() {
        this.fetchProbable('personsList').then(res => {
          
            let anwohner = [];
            res.data.forEach(person => {
                //console.log(person.rufname)
                anwohner.push(
                    Object.create({person_id:person.person_id, rufname:person.rufname, nachname:person.nachname})) 
            });
            this.setState({
              probableAnwohner: anwohner
            })
          });

        this.fetchHausDataMultitable().then(res => {
    
        let anwohner = [];
        res.data.forEach(person => {
            anwohner.push(
                Object.create({ 
                            person_id: person.person_id,
                            rufname: person.rufname,
                            nachname: person.nachname
                            }))
            
        });
        this.setState({
            anwohner: anwohner
        })
    });
    }


    render(){
        return(
     <div>
        <div>
            <button type='button' onClick={this.editData}>Speichern</button>
            <div className='edit-person-cont'>
                {/* allgemeine Haushalt Daten */}
                <div className='bg-cont' style={({backgroundColor: "#74a3ed"})}>
                    <h3 style={({textAlign: "center"})}>Haushaltrelevanten Daten</h3>
                    {/* Kerndaten */}
                    <div className='edit-person-data-cont'>
                            <h4>Edit Kerndaten</h4>
                            
                            <label >Haushalt ID:</label>
                            <input type='text' className='text-input' name='haushalt_id' value={this.state.haushalt_id}readOnly></input>
                            <br></br>

                            <label >Bezeichnung:</label>
                            <input type='text' className='text-input' id='bezeichnung' value={this.state.bezeichnung} 
                            onChange= {this.handleChange} pattern="([\w\d\sßöäüÖÄÜ' \.,-?!]){0,100}" ></input>
                            <br></br>

                            <label >Straße:</label>
                            <input type='text' className='text-input' id='strasse' value={this.state.strasse} 
                            onChange= {this.handleChange} pattern='^([\wöäüßÖÄÜ\s]{3,43})(\.\s|\s)([\d-]{0,5})\b$' ></input>
                            <br></br>

                            <label >Zusatz:</label>
                            <input type='text' className='text-input' id='zusatz' value={this.state.zusatz} 
                            onChange= {this.handleChange} pattern="([\w\d\sßöäüÖÄÜ' \.,-?!]){0,100}" ></input>
                            <br></br>

                            <label >PLZ:</label>
                            <input type='text' className='text-input' id='plz' value={this.state.plz} 
                            onChange= {this.handleChange} pattern='[0-9]{5}$' ></input>
                            <br></br>

                            <label >Ort:</label>
                            <input type='text' className='text-input' id='ort' value={this.state.ort} 
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]{0,50}$' ></input>
                            <br></br>

                            <label >Region:</label>
                            <input type='text' className='text-input' id='region' value={this.state.region} 
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]{0,5}$' ></input>
                            <br></br>

                            <label >Ort-Berlin:</label>
                            <input type='text' id='ort_berlin' value={this.state.ort_berlin}
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]{0,50}$' ></input>
                            <br></br>

                            <label>Land: </label>
                            <input type='text' id='land' value={this.state.land} 
                            onChange= {this.handleChange} pattern='[A-Z]{0,3}'></input>
                            <br></br>

                            <label>Tel: </label>
                            <input type='tel' id='festnetz' value={this.state.festnetz} 
                            onChange= {this.handleChange} pattern='[0-9]{0,20}$' ></input>
                            <br></br>

                            <label >Quartiermanagement:</label>
                            <select id='quart_mgmt' value={this.state.quart_mgmt} 
                            onChange= {this.handleChange} >
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                            </select>
                            <br></br>

                        

                            <div className='delete-section'>
                            <button 
                                className='delete-buttons' 
                                id='haushalte' type='button'
                                onClick={this.deleteHausData}
                            >Haushalt löschen</button>
                            </div>
                    </div>
                </div>


                {/* Anwohner */}                                                                                 
                <div className='bg-cont' style={({backgroundColor: "#e6ebae"})}>
                    <h3 style={({textAlign: "center"})}>Anwohner editieren</h3>

                        {/* Anwohner */}
                        <div className='edit-person-data-cont'>
                            <h4>Anwohner</h4>
                                
                                <label>Neuer Anwohner hinzufügen: </label>
                                <select id='anwohnerToBeAdded' onChange= {this.handleChange} value={this.state.anwohnerToBeAdded}>
                                    <option defaultValue value=''>-</option>

                                    {this.state.probableAnwohner.map((anwohner) => 
                                    <option key={uuidv4()} value={anwohner.person_id}>{anwohner.rufname +  " " + anwohner.nachname}</option>)}
                                    
                                </select>

                                <label >Meldeanschrift:</label>
                                <select id='meldeanschrift'  
                                onChange= {this.handleChange} >
                                    <option defaultValue disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                </select>
                                <br></br>

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
                                    <label>Existierende Anwohner dieses Hauses entfernen: </label>
                                    <select id='anwohnerToBeDeleted' onChange= {this.handleChange} value={this.state.anwohnerToBeDeleted}>
                                        <option defaultValue value=''>-</option>

                                        {this.state.anwohner.map((anwohner) => 
                                        <option key={uuidv4()} value={anwohner.person_id}>{anwohner.rufname 
                                        + " " + anwohner.nachname}</option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>
                                    <button 
                                        className='delete-buttons' 
                                        id='person_haushalt' type='button'
                                        onClick={this.deleteHausData}
                                        
                                    >Alle Anwohner löschen</button>
                                </div>
                        </div>
                </div>
            </div>
           
        </div>
     </div>
        )
    }
}


