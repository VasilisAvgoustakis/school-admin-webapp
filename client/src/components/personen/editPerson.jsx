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
            personId: this.props.person_id,
            rufname: this.props.rufname,
            amtlicher_vorname: this.props.amtlicher_vorname,
            nachname: this.props.nachname,
            geburtsdatum: this.props.geburtsdatum,
            einschulungsdatum: this.props.einschulungsdatum,
            nicht_auf_listen: this.props.nicht_auf_listen
        }
    }

    handleChange(e){
        this.setState({ [e.target.id]: e.target.value })
        console.log(this.state.rufname)
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
    }
    }

   


    render(){
        console.log(this.state.geburtsdatum)
        return(
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
                        (dateToENFormat(new Date(this.state.geburtsdatum))):('NULL')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Einschulungsdatum:</label>
                    <input type='date' id='einschulungsdatum' value={
                        this.state.einschulungsdatum ? 
                        (dateToENFormat(new Date(this.state.einschulungsdatum))):('NULL')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Nicht auf Listen:</label>
                    <select id='nicht_auf_listen' value={this.state.nicht_auf_listen} 
                    onChange= {this.handleChange} >
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                    <br></br>

                    <button type='button' onClick={this.editData}>Speichern</button>
                
                </div>
            </div>
        )
    }
}