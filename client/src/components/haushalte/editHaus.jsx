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
        this.editData = this.editData.bind(this);

        
        this.state = {
            //Kerndaten
            haushalt_id: this.props.haushalt_id,
            strasse: this.props.strasse,
            plz: this.props.plz,
            ort: this.props.ort,
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

                            <label >Straße:</label>
                            <input type='text' className='text-input' id='strasse' value={this.state.strasse} 
                            onChange= {this.handleChange} pattern='[a-zA-ZöäüßÖÄÜ]+.{1}[0-9-]{1,4}$' ></input>
                            <br></br>

                            <label >Zusatz:</label>
                            <input type='text' className='text-input' name='zusatz' value={this.state.zusatz}
                            onChange= {this.handleChange} pattern='[a-zA-ZöäüßÖÄÜ]+.{1}[0-9-]{1,4}$'></input>
                            <br></br>

                            <label >PLZ:</label>
                            <input type='text' className='text-input' id='plz' value={this.state.plz} 
                            onChange= {this.handleChange} pattern='[0-9]*$' ></input>
                            <br></br>

                            <label >Ort:</label>
                            <input type='text' className='text-input' id='ort' value={this.state.ort} 
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]*$' ></input>
                            <br></br>

                            <label >Ort-Berlin:</label>
                            <input type='text' id='ort_berlin' value={this.state.ort_berlin}
                            onChange= {this.handleChange} pattern='[a-zA-ZäöüÄÖÜ\s]*$' ></input>
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


