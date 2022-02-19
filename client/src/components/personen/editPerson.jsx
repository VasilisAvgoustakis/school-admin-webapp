import React from 'react';
import axios from 'axios';
import '../stylesheets/globalstyles.css'
import '../stylesheets/edits.css';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'



export class EditPerson extends React.Component{
    constructor(props){
        super(props);
        this.updateQuery = this.updateQuery.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editData = this.editData.bind(this);
        this.deleteQuery = this.deleteQuery.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        
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

            //kind_daten
            staatsangehoerigkeit: this.props.staatsangehoerigkeit,
            geburtsort: this.props.geburtsort,
            geschlecht: this.props.geschlecht,
            nichtdeutsche_herkunftssprache: this.props.nichtdeutsche_herkunftssprache,

            //kind_schule
            zugangsdatum_zur_fsx: this.props.zugangsdatum_zur_fsx,
            abgangsdatum_von_fsx: this.props.abgangsdatum_von_fsx,
            abgangsgrund:this.props.abgangsgrund,
            mittag: this.props.mittag,

            //kind_betreuung
            betreuung_beginn:this.props.betreuung_beginn,
            betreuung_ende:this.props.betreuung_ende,
            betreuung_umfang:this.props.betreuung_umfang,
            betreuung_ferien:this.props.betreuung_ferien,


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

    async deleteQuery(table){
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/deleteKindsdaten`, {
           params: {
               table: table,
               person_id: this.state.personId
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

    deleteRow(){

    }

   


    render(){
        console.log(this.state)
        //console.log(dateToENFormat(new Date(this.state.geburtsdatum)))
        return(
            //Kerndaten
            <div>
                <button type='button' onClick={this.editData}>Speichern</button>
                <div  id='editInputs-left'>
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

                <div  id='editInputs-left'>
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

                <div className='entity-data-right' id='editInputs-right'>
                    <h4>Kindsdaten</h4>
                    <button type='button' onClick={this.deleteRow}>Entfernen</button>

                    <label>Staatsangehörigkeit: </label>
                    <input type='text' id='staatsangehoerigkeit' value={this.state.staatsangehoerigkeit} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Geburtsort: </label>
                    <input type='text' id='geburtsort' value={this.state.geburtsort} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Geschlecht: </label>
                    <select id='geschlecht' value={this.state.geschlecht} 
                    onChange= {this.handleChange} >
                        <option selected="true" disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                        <option value='m'>m</option>
                        <option value='f'>f</option>
                        <option value='n'>n</option>
                    </select>
                    <br></br>

                    <label>nicht deutsche Herkunftssprache: </label>
                    <select id='nichtdeutsche_herkunftssprache' value={this.state.nichtdeutsche_herkunftssprache} 
                    onChange= {this.handleChange} >
                        <option selected="true" disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                    <br></br>

                    <label >Zugang zu FSX:</label>
                    <input type='date' id='zugangsdatum_zur_fsx' value={
                        this.state.zugangsdatum_zur_fsx ? 
                        (dateToENFormat(new Date(this.state.zugangsdatum_zur_fsx))):('')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Abgang vom FSX:</label>
                    <input type='date' id='abgangsdatum_von_fsx' value={
                        this.state.abgangsdatum_von_fsx ? 
                        (dateToENFormat(new Date(this.state.abgangsdatum_von_fsx))):('')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label>Abgangsgrund: </label>
                    <select id='abgangsgrund' value={this.state.abgangsgrund} 
                    onChange= {this.handleChange} >
                        <option selected="true" disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
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
                        <option selected="true" disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                    <br></br>

                    <label >Betreuung Beginn:</label>
                    <input type='date' id='betreuung_beginn' value={
                        this.state.betreuung_beginn ? 
                        (dateToENFormat(new Date(this.state.betreuung_beginn))):('')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Betreuung Ende:</label>
                    <input type='date' id='betreuung_ende' value={
                        this.state.betreuung_ende ? 
                        (dateToENFormat(new Date(this.state.betreuung_ende))):('')} 
                    onChange= {this.handleChange} ></input>
                    <br></br>

                    <label >Betreuung Umfang:</label>
                    <select id='betreuung_umfang' value={this.state.betreuung_umfang} 
                    onChange= {this.handleChange} >
                        <option selected="true" disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                        <option value='16:00'>16:00</option>
                        <option value='18:00'>18:00</option>
                    </select>
                    <br></br>

                    <label >Betreuung Ferien:</label>
                    <select id='betreuung_ferien' value={this.state.betreuung_ferien} 
                    onChange= {this.handleChange} >
                        <option selected="true" disabled="disabled">-</option> {/*default option when no data from database for selected person*/}
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                    </select>
                    <br></br>


                </div>

                
            </div>
        )
    }
}