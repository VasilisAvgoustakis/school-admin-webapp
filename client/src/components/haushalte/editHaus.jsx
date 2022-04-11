import React from 'react';
import axios from 'axios';
import '../stylesheets/globalstyles.css'
import '../stylesheets/edits.css';
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
        this.editData = this.editData.bind(this);

        
        this.state = {
            //Kerndaten
            haushalt_id: this.props.haushalt_id,
            bezeichnung: this.props.bezeichnung,
            strasse: this.props.strasse,
            plz: this.props.plz,
            ort: this.props.ort,
            region: this.props.region,
            ort_berlin: this.props.ort_berlin,
            quart_mgmt: this.props.quart_mgmt,
            festnetz: this.props.festnetz,
            zusatz: this.props.zusatz,
            land: this.props.land,
        
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
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/editHaus`, {
           params: {
               state: dataArr
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
                            <input type='text' className='text-input' name='zusatz' value={this.state.zusatz}
                            onChange= {this.handleChange} pattern='([\w\d\sßöäüÖÄÜ \.,-?!]){0,50}'></input>
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
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]{0,50}$' ></input>
                            <br></br>

                            <label >Ort-Berlin:</label>
                            <input type='text' id='ort_berlin' value={this.state.ort_berlin}
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]{0,50}$' ></input>
                            <br></br>

                            <label>Land: </label>
                            <input type='text' id='land' value={this.state.land} 
                            onChange= {this.handleChange} pattern='[A-Z]{0,3}'></input>
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
                                id='personen' type='button'
                                
                            >Person löschen</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
     </div>
        )
    }
}


