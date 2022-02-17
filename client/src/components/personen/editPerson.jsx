import React from 'react';
import axios from 'axios';
import '../stylesheets/edits.css';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'



export class EditPerson extends React.Component{
    constructor(props){
        super(props);
        this.updateQuery = this.updateQuery.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editData = this.editData.bind(this);
        
        this.state = {
            //Kerndaten
            personId: this.props.person_id,
            rufname: this.props.rufname,
            amtlicher_vorname: this.props.amtlicher_vorname,
            nachname: this.props.nachname,
            geburtsdatum: this.props.geburtsdatum,
            einschulungsdatum: this.props.einschulungsdatum,
            nicht_auf_listen: this.props.nicht_auf_listen,

            //Kontaktdata
            email_1: this.props.email_1,
            email_2: this.props.email_2,
            email_fsx: this.props.email_fsx,
            mobil_telefon_1: this.props.mobil_telefon_1,
            mobil_telefon_2: this.props.mobil_telefon_2,
            mobil_telefon_fsx: this.props.mobil_telefon_fsx,
            telefon_1: this.props.telefon_1,
            telefon_2: this.props.telefon_2,
            telefon_fsx: this.props.telefon_fsx,


        }
    }

    handleChange(e){
        if((e.target.id).includes('datum')){
            this.setState({ [e.target.id]: e.target.value})
        }else{
            this.setState({ [e.target.id]: e.target.value })
        }
        console.log(e.target.value)
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

    editData(){
        var confirm = window.confirm('Diese Aktion wird die Daten direkt in der Datenbank bearbeiten!!! Bist du sicher dass diese Korrekt sind?')
        if(confirm){
        this.updateQuery().then(result=>{
            console.log(result)
        }).catch(err =>{console.error(err)})
        .then(() => {

            confirm = false;
            if(!confirm)window.location.reload()
        
        })
    }
    }

   


    render(){
        console.log(this.state)
        //console.log(dateToENFormat(new Date(this.state.geburtsdatum)))
        return(
            //Kerndaten
            <div>
                <div className='editInputs'>
                    <h4>Edit Kerndaten</h4>
                
                    <label >Person ID:</label>
                    <input type='text' name='person_id' value={this.state.personId}readOnly></input>
                    <br></br>

                    <label >Rufname:</label>
                    <input type='text' id='rufname' value={this.state.rufname} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Amtlicher Vorname:</label>
                    <input type='text' id='amtlicher_vorname' value={this.state.amtlicher_vorname} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Nachname:</label>
                    <input type='text' id='nachname' value={this.state.nachname} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Geburtsdatum:</label>
                    <input type='date' id='geburtsdatum' value={
                        this.state.geburtsdatum ?
                        (dateToENFormat(new Date(this.state.geburtsdatum))):('')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Einschulungsdatum:</label>
                    <input type='date' id='einschulungsdatum' value={
                        this.state.einschulungsdatum ? 
                        (dateToENFormat(new Date(this.state.einschulungsdatum))):('')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Nicht auf Listen:</label>
                    <select id='nicht_auf_listen' value={this.state.nicht_auf_listen} 
                    onChange= {this.handleChange} >
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                    <br></br>
                </div>

                {/* Contact Data */}

                <div className='editInputs'>
                    <h4>Kontaktdaten</h4>

                    <label>E-Mail 1: </label>
                    <input type='email' id='email_1' value={this.state.email_1} 
                    onChange= {this.handleChange} ></input>
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
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Mobil 2: </label>
                    <input type='tel' id='mobil_telefon_2' value={this.state.mobil_telefon_2} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Mobil FSX: </label>
                    <input type='tel' id='mobil_telefon_fsx' value={this.state.mobil_telefon_fsx} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Tel 1: </label>
                    <input type='tel' id='telefon_1' value={this.state.telefon_1} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Tel 2: </label>
                    <input type='tel' id='telefon_2' value={this.state.telefon_2} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Tel FSX: </label>
                    <input type='tel' id='telefon_fsx' value={this.state.telefon_fsx} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                </div>

                <button type='button' onClick={this.editData}>Speichern</button>
            </div>
        )
    }
}